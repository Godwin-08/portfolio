import { NextResponse } from 'next/server';
import type { MatchRequestBody } from '@/lib/ai/types';
import { queryCloudflareAI } from '@/lib/ai/cloudflare-client';
import { runLocalMatcher } from '@/lib/ai/local-matcher';

const MAX_REQUEST_BODY_BYTES = 4_096;
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60 * 1_000;
const MAX_TRACKED_CLIENTS = 5_000;
const ipRequestWindow = new Map<string, number[]>();
let requestsSinceCleanup = 0;

class RequestBodyError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415
  ) {
    super(message);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  requestsSinceCleanup += 1;

  if (requestsSinceCleanup >= 100) {
    requestsSinceCleanup = 0;
    for (const [clientIp, timestamps] of ipRequestWindow) {
      const activeTimestamps = timestamps.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
      );
      if (activeTimestamps.length === 0) {
        ipRequestWindow.delete(clientIp);
      } else {
        ipRequestWindow.set(clientIp, activeTimestamps);
      }
    }
  }

  const timestamps = (ipRequestWindow.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipRequestWindow.set(ip, timestamps);
    return true;
  }

  if (timestamps.length === 0 && ipRequestWindow.size >= MAX_TRACKED_CLIENTS) {
    return true;
  }

  timestamps.push(now);
  ipRequestWindow.set(ip, timestamps);
  return false;
}

async function readJsonBody(request: Request): Promise<unknown> {
  const mediaType = request.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();

  if (mediaType !== 'application/json') {
    throw new RequestBodyError('Le type de contenu doit être application/json.', 415);
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength !== null) {
    if (!/^\d+$/.test(contentLength)) {
      throw new RequestBodyError('La taille de la requête est invalide.', 400);
    }

    const declaredLength = Number(contentLength);
    if (!Number.isSafeInteger(declaredLength)) {
      throw new RequestBodyError('La taille de la requête est invalide.', 400);
    }
    if (declaredLength > MAX_REQUEST_BODY_BYTES) {
      throw new RequestBodyError('La requête est trop volumineuse.', 413);
    }
  }

  if (!request.body) {
    throw new RequestBodyError('Le corps JSON est invalide ou incomplet.', 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BODY_BYTES) {
        void reader.cancel('Request body exceeds the allowed size').catch(() => undefined);
        throw new RequestBodyError('La requête est trop volumineuse.', 413);
      }
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof RequestBodyError) throw error;
    throw new RequestBodyError('Le corps JSON est invalide ou incomplet.', 400);
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new RequestBodyError('Le corps JSON est invalide ou incomplet.', 400);
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new RequestBodyError('Le corps JSON est invalide ou incomplet.', 400);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateRequestBody(value: unknown): MatchRequestBody & { locale: 'fr' | 'en' } {
  if (!isRecord(value)) {
    throw new RequestBodyError('Le format de requête est invalide.', 400);
  }

  const body = value;
  if (Object.keys(body).some((key) => key !== 'query' && key !== 'locale')) {
    throw new RequestBodyError('Le format de requête est invalide.', 400);
  }

  if (typeof body.query !== 'string') {
    throw new RequestBodyError('La requête doit contenir une question valide.', 400);
  }

  const locale = body.locale === undefined ? 'fr' : body.locale;
  if (locale !== 'fr' && locale !== 'en') {
    throw new RequestBodyError('La langue doit être fr ou en.', 400);
  }

  const query = body.query.trim();
  if (query.length < 2) {
    throw new RequestBodyError('La requête doit contenir au moins 2 caractères.', 400);
  }
  if (query.length > 250) {
    throw new RequestBodyError('La requête ne peut pas dépasser 250 caractères.', 400);
  }

  return { query, locale };
}

function jsonResponse(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

export async function POST(request: Request) {
  const forwardedIp =
    process.env.VERCEL === '1'
      ? request.headers.get('x-vercel-forwarded-for')
      : request.headers.get('x-forwarded-for');
  const ip = forwardedIp?.split(',')[0].trim() || 'anonymous-client';

  if (isRateLimited(ip)) {
    return jsonResponse(
      { error: 'Trop de requêtes. Veuillez patienter une minute avant de réessayer.' },
      429
    );
  }

  try {
    const body = validateRequestBody(await readJsonBody(request));
    const aiResult = await queryCloudflareAI(body.query, body.locale);

    if (aiResult) {
      const local = runLocalMatcher(body.query, body.locale);
      if (aiResult.matches.length === 0 && local.matches.length > 0) {
        aiResult.matches = local.matches;
        if (aiResult.status === 'no_match') {
          aiResult.status = 'success';
        }
      }
      return jsonResponse(aiResult);
    }

    return jsonResponse(runLocalMatcher(body.query, body.locale));
  } catch (error) {
    if (error instanceof RequestBodyError) {
      return jsonResponse({ error: error.message }, error.status);
    }

    return jsonResponse(
      {
        status: 'no_match',
        mode: 'keyword',
        query: '',
        locale: 'fr',
        matches: [],
        message: 'Une erreur technique temporaire est survenue.',
      },
      500
    );
  }
}
