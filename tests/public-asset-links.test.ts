import { describe, expect, it } from 'vitest';
import { isPublicAssetHref } from '@/lib/utils';

describe('public asset links', () => {
  it('recognizes static file paths without confusing localized app routes for assets', () => {
    expect(isPublicAssetHref('/certifications/introduction-to-sql.jpg')).toBe(true);
    expect(isPublicAssetHref('/certifications/introduction-to-sql.jpg?download=1')).toBe(true);
    expect(isPublicAssetHref('/cv/CV_Godwin_Nougbolo.pdf')).toBe(true);
    expect(isPublicAssetHref('/documents/projects/report.pdf')).toBe(true);
    expect(isPublicAssetHref('/certifications/introduction-to-sql')).toBe(false);
    expect(isPublicAssetHref('/projects/gtm')).toBe(false);
    expect(isPublicAssetHref('https://example.com/certificate.jpg')).toBe(false);
  });
});
