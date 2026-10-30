import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center font-sans">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Page introuvable / Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600">
        La ressource demandée n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </div>
  );
}
