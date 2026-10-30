import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
        404
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Page introuvable / Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600 dark:text-slate-300">
        La ressource demandée n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </div>
  );
}
