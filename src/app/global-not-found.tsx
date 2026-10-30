import { headers } from 'next/headers';
import NotFound from './not-found';
import './globals.css';

export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('X-NEXT-INTL-LOCALE') === 'en' ? 'en' : 'fr';

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <NotFound />
      </body>
    </html>
  );
}
