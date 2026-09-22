import { ComponentType } from 'react';

export interface ProjectMDXContent {
  slug: string;
  Content: ComponentType<any>;
}

/**
 * Charge dynamiquement le contenu MDX d'une étude de cas
 * Les fichiers de contenu restent strictement isolés dans src/content/projects/
 */
export async function getProjectMDX(slug: string): Promise<ComponentType<any> | null> {
  try {
    const mdxModule = await import(`@/content/projects/${slug}.mdx`);
    return mdxModule.default;
  } catch (err) {
    return null;
  }
}

