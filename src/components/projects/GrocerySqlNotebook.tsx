import type { ReactNode } from 'react';
import { ArrowLeft, Download, FileCode2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export interface NotebookCell {
  cell_type: 'markdown' | 'code';
  source: string | string[];
  outputs?: readonly {
    data?: Record<string, unknown>;
  }[];
}

interface GrocerySqlNotebookProps {
  locale: 'fr' | 'en';
  cells: readonly NotebookCell[];
}

function getSource(source: string | string[]): string {
  return Array.isArray(source) ? source.join('') : source;
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, index) => {
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-slate-200 px-1 py-0.5 font-mono text-[0.9em] dark:bg-slate-700">
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }

    return token;
  });
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim().replace(/<\/?br\s*\/?>/gi, ' '));
}

function NotebookMarkdown({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      const Heading = heading[1].length <= 2 ? 'h2' : 'h3';
      blocks.push(
        <Heading key={index} className="font-heading text-lg font-bold text-slate-900 dark:text-white">
          {renderInline(heading[2])}
        </Heading>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('|') && line.includes('|')) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      const header = rows[0] ?? [];
      const body = rows.filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));
      blocks.push(
        <div key={`table-${index}`} className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex} className="border border-slate-300 bg-slate-100 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-slate-300 px-3 py-2 align-top dark:border-slate-700">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`list-${index}`} className="list-disc space-y-1 pl-6">
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length
      && lines[index].trim()
      && !/^#{1,6}\s+/.test(lines[index].trim())
      && !lines[index].trim().startsWith('|')
      && !/^[-*]\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`} className="leading-relaxed text-slate-700 dark:text-slate-300">
        {renderInline(paragraph.join(' ').replace(/<\/?br\s*\/?>/gi, ' '))}
      </p>,
    );
  }

  return <div className="space-y-4">{blocks}</div>;
}

function getPlainOutput(output: NonNullable<NotebookCell['outputs']>[number]): string | undefined {
  const plainText = output.data?.['text/plain'];
  if (typeof plainText === 'string') return plainText;
  if (Array.isArray(plainText) && plainText.every((line) => typeof line === 'string')) {
    return plainText.join('');
  }
  return undefined;
}

export function GrocerySqlNotebook({ locale, cells }: GrocerySqlNotebookProps) {
  const isEnglish = locale === 'en';

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8" data-sql-notebook>
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug: 'grocery-store-sales' } }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {isEnglish ? 'Back to the project' : 'Retour au projet'}
      </Link>

      <header className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="flex items-center gap-3 text-primary-700 dark:text-primary-300">
          <FileCode2 className="h-6 w-6" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.16em]">
            {isEnglish ? 'SQL notebook · PostgreSQL' : 'Notebook SQL · PostgreSQL'}
          </p>
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          {isEnglish ? 'FoodYum grocery store sales' : 'Ventes du supermarché FoodYum'}
        </h1>
        <p className="max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">
          {isEnglish
            ? 'Interactive view of the official Jupyter notebook submitted and verified for the DataCamp Data Analyst Associate practical exam. It presents the complete four SQL tasks (2022 integrity bug audit, CTE cleaning pipeline with PERCENTILE_CONT median imputation, category price spread analysis, and high-velocity product targeting) alongside verified execution outputs.'
            : 'Rendu interactif du notebook Jupyter officiel validé lors de l’examen pratique certifiant DataCamp Data Analyst Associate. Il présente l’intégralité des 4 tâches SQL (audit du bug 2022, pipeline CTE avec calculs de médianes via PERCENTILE_CONT, analyse des fourchettes de prix et ciblage commercial des produits phares), accompagnées de leurs résultats d’exécution.'}
        </p>
        <a
          href="/documents/projects/grocery-sales-notebook.ipynb"
          download
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {isEnglish ? 'Download the original .ipynb' : 'Télécharger le fichier .ipynb original'}
        </a>
      </header>

      <div className="space-y-5">
        {cells.map((cell, index) => {
          const source = getSource(cell.source);
          const outputs = cell.outputs?.map(getPlainOutput).filter((output): output is string => Boolean(output)) ?? [];

          return (
            <section
              key={index}
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-700 dark:bg-slate-900 sm:p-7"
              data-notebook-cell
              data-cell-type={cell.cell_type}
            >
              {cell.cell_type === 'markdown' ? (
                <NotebookMarkdown source={source} />
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {isEnglish ? 'Code cell' : 'Cellule de code'}
                  </p>
                  <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-100">
                    <code>{source}</code>
                  </pre>
                  {outputs.map((output, outputIndex) => (
                    <div key={outputIndex} className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {isEnglish ? 'SQL query execution output' : 'Résultat d’exécution de la requête SQL'}
                      </p>
                      <pre className="max-h-96 overflow-auto rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        <code>{output}</code>
                      </pre>
                    </div>
                  ))}
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
