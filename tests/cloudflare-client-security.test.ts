import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { queryCloudflareAI } from '@/lib/ai/cloudflare-client';

describe('Cloudflare AI client failure handling', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
  });

  afterEach(() => {
    vi.useRealTimers();
    delete process.env.CLOUDFLARE_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_API_TOKEN;
  });

  it.each([
    ['HTTP 429 quota response', 429],
    ['HTTP 402 response', 402],
    ['HTTP 503 provider outage', 503],
  ])('returns the local-fallback signal for %s without retrying', async (_label, status) => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ errors: [{ message: 'Workers AI quota exceeded' }] }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    await expect(queryCloudflareAI('A documented project', 'en')).resolves.toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('returns the local-fallback signal after a network error without retrying', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new TypeError('fetch failed')
    );

    await expect(queryCloudflareAI('A documented project', 'en')).resolves.toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('falls back when the provider response is not valid JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('{ invalid JSON', {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    await expect(queryCloudflareAI('A documented project', 'en')).resolves.toBeNull();
  });

  it('aborts the provider request at the timeout and returns the local-fallback signal', async () => {
    vi.useFakeTimers();
    let aborted = false;
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          const signal = init?.signal;
          if (!signal) {
            reject(new Error('Expected an abort signal'));
            return;
          }
          signal.addEventListener(
            'abort',
            () => {
              aborted = true;
              reject(new DOMException('The operation was aborted', 'AbortError'));
            },
            { once: true }
          );
        })
    );

    const pending = queryCloudflareAI('A documented project', 'en');
    await vi.advanceTimersByTimeAsync(6_000);

    await expect(pending).resolves.toBeNull();
    expect(aborted).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('keeps a valid provider no-match distinct from provider failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          result: {
            response: JSON.stringify({
              intent: 'general',
              matchedDocumentIds: [],
              projectMatches: [],
              learningFieldKeys: [],
              noMatch: true,
            }),
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const result = await queryCloudflareAI('A question outside documented projects', 'en');

    expect(result).toMatchObject({
      mode: 'ai',
      status: 'no_match',
      locale: 'en',
      matches: [],
    });
  });
});
