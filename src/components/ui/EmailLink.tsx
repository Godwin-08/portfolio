'use client';

import type { MouseEvent, ReactNode } from 'react';

interface EmailLinkProps {
  email: string;
  className?: string;
  children: ReactNode;
}

export function EmailLink({ email, className, children }: EmailLinkProps) {
  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // `mailto:` can do nothing when the visitor has no mail app configured.
    // Keep it as the HTML fallback, and open Gmail's web composer on normal clicks.
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      const composeUrl = new URL('https://mail.google.com/mail/');
      composeUrl.searchParams.set('view', 'cm');
      composeUrl.searchParams.set('fs', '1');
      composeUrl.searchParams.set('to', email);
      window.open(composeUrl.toString(), '_blank', 'noopener,noreferrer');
    }

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Copying is optional; the email link still opens Gmail.
    }
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={(event) => void handleClick(event)}
      data-email-link
      className={className}
    >
      {children}
    </a>
  );
}
