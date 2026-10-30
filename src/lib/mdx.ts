import { ComponentType } from 'react';

export interface ProjectMDXContent {
  slug: string;
  Content: ComponentType<Record<string, unknown>>;
}

/**
 * Charge dynamiquement le contenu MDX d'une étude de cas
 * Les fichiers de contenu restent strictement isolés dans src/content/projects/
 */
export async function getProjectMDX(slug: string): Promise<ComponentType<Record<string, unknown>> | null> {
  try {
    const mdxModule = await import(`@/content/projects/${slug}.mdx`);
    return mdxModule.default;
  } catch {
    return null;
  }
}

