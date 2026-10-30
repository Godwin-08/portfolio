import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/ai/match/route';
import { queryCloudflareAI } from '@/lib/ai/cloudflare-client';

vi.mock('@/lib/ai/cloudflare-client', () => ({
  queryCloudflareAI: vi.fn(),
}));

const endpoint = 'http://localhost:3000/api/ai/match';
let requestId = 0;

function makeRequest(
  body: string,
  options: {
    contentType?: string | null;
    contentLength?: string;
    ip?: string;
    vercelIp?: string;
  } = {}
): Request {
  const headers = new Headers();
  if (options.contentType !== null) {
    headers.set('content-type', options.contentType ?? 'application/json');
  }
  if (options.contentLength) {
    headers.set('content-length', options.contentLength);
  }
  headers.set('x-forwarded-for', options.ip ?? `192.0.2.${++requestId}`);
  if (options.vercelIp) {
    headers.set('x-vercel-forwarded-for', options.vercelIp);
  }

  return new Request(endpoint, { method: 'POST', headers, body });
}

describe('POST /api/ai/match request security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(queryCloudflareAI).mockResolvedValue(null);
  });

  it('accepts a valid JSON question and falls back to the local matcher', async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ query: 'SQL et indicateurs', locale: 'fr' }))
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store, max-age=0');
    expect(await response.json()).toMatchObject({
      mode: 'keyword',
      status: 'success',
      locale: 'fr',
    });
    expect(queryCloudflareAI).toHaveBeenCalledWith('SQL et indicateurs', 'fr');
  });

  it('rejects a body over the byte limit without a Content-Length header', async () => {
    const request = makeRequest(
      JSON.stringify({ query: 'x'.repeat(4_100), locale: 'en' })
    );

    expect(request.headers.has('content-length')).toBe(false);
    const response = await POST(request);

    expect(response.status).toBe(413);
    expect(queryCloudflareAI).not.toHaveBeenCalled();
  });

  it('rejects an oversized declared Content-Length before reading the body', async () => {
    const response = await POST(
      makeRequest('{}', { contentLength: '4097' })
    );

    expect(response.status).toBe(413);
    expect(queryCloudflareAI).not.toHaveBeenCalled();
  });

  it.each([
    ['missing content type', { contentType: null }],
    ['non-JSON content type', { contentType: 'text/plain' }],
  ])('rejects %s', async (_label, options) => {
    const response = await POST(
      makeRequest(JSON.stringify({ query: 'SQL', locale: 'fr' }), options)
    );

    expect(response.status).toBe(415);
    expect(queryCloudflareAI).not.toHaveBeenCalled();
  });

  it.each(['{', '{"query":"unterminated'])('rejects invalid or incomplete JSON', async (body) => {
    const response = await POST(makeRequest(body));

    expect(response.status).toBe(400);
    expect(queryCloudflareAI).not.toHaveBeenCalled();
  });

  it.each([
    ['empty question', { query: '   ', locale: 'fr' }],
    ['missing question', { locale: 'fr' }],
    ['non-string question', { query: 42, locale: 'fr' }],
    ['question over the character limit', { query: 'x'.repeat(251), locale: 'fr' }],
    ['unsupported locale', { query: 'SQL', locale: 'es' }],
    ['non-string locale', { query: 'SQL', locale: 1 }],
    ['unexpected field', { query: 'SQL', locale: 'fr', projectId: 'gtm' }],
  ])('rejects %s', async (_label, body) => {
    const response = await POST(makeRequest(JSON.stringify(body)));

    expect(response.status).toBe(400);
    expect(queryCloudflareAI).not.toHaveBeenCalled();
  });

  it('returns the local no-match result for an unsupported question', async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ query: 'Kubernetes et Terraform', locale: 'fr' }))
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      mode: 'keyword',
      status: 'no_match',
      matches: [],
    });
  });

  it('retains the per-instance limit as a secondary safeguard', async () => {
    const ip = '198.51.100.42';
    const payload = JSON.stringify({ query: 'SQL et indicateurs', locale: 'fr' });
    const responses = [];

    for (let index = 0; index < 16; index += 1) {
      responses.push(await POST(makeRequest(payload, { ip })));
    }

    expect(responses.slice(0, 15).every((response) => response.status === 200)).toBe(true);
    expect(responses[15].status).toBe(429);
  });

  it('uses the Vercel-provided client IP instead of caller-controlled forwarding headers', async () => {
    const previousVercelValue = process.env.VERCEL;
    process.env.VERCEL = '1';

    try {
      const payload = JSON.stringify({ query: 'SQL et indicateurs', locale: 'fr' });
      const responses = [];

      for (let index = 0; index < 16; index += 1) {
        responses.push(
          await POST(
            makeRequest(payload, {
              ip: `203.0.113.${index + 1}`,
              vercelIp: '198.51.100.27',
            })
          )
        );
      }

      expect(responses.slice(0, 15).every((response) => response.status === 200)).toBe(true);
      expect(responses[15].status).toBe(429);
    } finally {
      if (previousVercelValue === undefined) {
        delete process.env.VERCEL;
      } else {
        process.env.VERCEL = previousVercelValue;
      }
    }
  });
});
