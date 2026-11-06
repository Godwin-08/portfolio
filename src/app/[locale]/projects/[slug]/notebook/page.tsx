import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { GrocerySqlNotebook, type NotebookCell } from '@/components/projects/GrocerySqlNotebook';
import { buildLocalizedPageMetadata } from '@/lib/seo';

interface NotebookPageProps {
  params: Promise<{
    locale: 'fr' | 'en';
    slug: string;
  }>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseNotebook(contents: string): NotebookCell[] {
  const parsed: unknown = JSON.parse(contents);
  if (!isRecord(parsed) || !Array.isArray(parsed.cells)) {
    throw new Error('The Grocery Store Sales notebook has an invalid cell list.');
  }

  return parsed.cells.map((candidate, index) => {
    if (!isRecord(candidate)) {
      throw new Error(`The Grocery Store Sales notebook cell ${index} is invalid.`);
    }

    const cellType = candidate.cell_type;
    const source = candidate.source;
    const validSource = typeof source === 'string'
      || (Array.isArray(source) && source.every((line) => typeof line === 'string'));
    if ((cellType !== 'markdown' && cellType !== 'code') || !validSource) {
      throw new Error(`The Grocery Store Sales notebook cell ${index} has an unsupported format.`);
    }

    const outputs = Array.isArray(candidate.outputs)
      ? candidate.outputs.filter(isRecord).map((output) => ({
          data: isRecord(output.data) ? output.data : undefined,
        }))
      : undefined;

    return {
      cell_type: cellType,
      source,
      outputs,
    };
  });
}

export function generateStaticParams() {
  return (['fr', 'en'] as const).map((locale) => ({
    locale,
    slug: 'grocery-store-sales',
  }));
}

export async function generateMetadata({ params }: NotebookPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug !== 'grocery-store-sales') notFound();

  const [project, seo] = await Promise.all([
    getTranslations({ locale, namespace: 'projects.cards' }),
    getTranslations({ locale, namespace: 'seo' }),
  ]);
  const title = locale === 'fr' ? 'Notebook SQL FoodYum' : 'FoodYum SQL notebook';
  const description = locale === 'fr'
    ? 'Lire les requêtes PostgreSQL et les résultats enregistrés du projet FoodYum.'
    : 'Read the PostgreSQL queries and saved outputs from the FoodYum project.';

  return buildLocalizedPageMetadata({
    locale,
    href: { pathname: '/projects/[slug]/notebook', params: { slug } },
    title: `${title} — ${project('grocery-store-sales.title')}`,
    description,
    siteName: seo('siteName'),
  });
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const { locale, slug } = await params;
  if (slug !== 'grocery-store-sales') notFound();

  const notebookPath = join(
    process.cwd(),
    'public',
    'documents',
    'projects',
    'grocery-sales-notebook.ipynb',
  );
  const contents = await readFile(notebookPath, 'utf8');
  const cells = parseNotebook(contents);

  return <GrocerySqlNotebook locale={locale} cells={cells} />;
}
