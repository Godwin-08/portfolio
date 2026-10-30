import { PROJECTS } from '@/data/projects';
import { PROJECT_DETAIL_COPY } from '@/data/project-details';
import { PROFILE } from '@/data/profile';
import { GrowingFieldMatch } from './types';

export const PNEUMONIA_NOTEBOOK_PROOFS = {
  fr: [
    'Sortie enregistrée de notebooks/CNN_Pneumonia.ipynb, jeu de test de 624 images, seuil 0,7 : accuracy 0,809295, précision PNEUMONIA 0,875346, rappel PNEUMONIA 0,810256, F1 PNEUMONIA 0,841545 et AUC 0,8938.',
    'Sortie enregistrée de notebooks/DenseNet121_Pneumonia.ipynb, Feature Extraction, jeu de test de 624 images, seuil 0,8 : accuracy 0,887821, précision PNEUMONIA 0,904040, rappel PNEUMONIA 0,917949 et F1 PNEUMONIA 0,910941.',
    'Sortie enregistrée de notebooks/DenseNet121_Pneumonia.ipynb, fine-tuning, jeu de test de 624 images, seuil 0,9 : accuracy 0,879808, précision PNEUMONIA 0,933884, rappel PNEUMONIA 0,869231 et F1 PNEUMONIA 0,900398. Les seuils diffèrent entre les expériences : ces chiffres ne constituent pas une comparaison à protocole identique.',
  ],
  en: [
    'Saved output from notebooks/CNN_Pneumonia.ipynb, 624-image test set, threshold 0.7: accuracy 0.809295, PNEUMONIA precision 0.875346, PNEUMONIA recall 0.810256, PNEUMONIA F1 0.841545, and AUC 0.8938.',
    'Saved output from notebooks/DenseNet121_Pneumonia.ipynb, Feature Extraction, 624-image test set, threshold 0.8: accuracy 0.887821, PNEUMONIA precision 0.904040, PNEUMONIA recall 0.917949, and PNEUMONIA F1 0.910941.',
    'Saved output from notebooks/DenseNet121_Pneumonia.ipynb, fine-tuning, 624-image test set, threshold 0.9: accuracy 0.879808, PNEUMONIA precision 0.933884, PNEUMONIA recall 0.869231, and PNEUMONIA F1 0.900398. The experiments use different thresholds, so these figures are not a like-for-like comparison.',
  ],
} as const;

export interface ProjectFactCorpus {
  id: string;
  slug: string;
  title: string;
  category: string;
  skills: string[];
  fr: {
    title: string;
    summary: string;
    context: string;
    verifiedProofs: string[];
    limitations: string[];
  };
  en: {
    title: string;
    summary: string;
    context: string;
    verifiedProofs: string[];
    limitations: string[];
  };
}

/**
 * Extracts and anchors verified facts and limitations from portfolio data and saved notebook outputs.
 * No facts or metrics are invented.
 */
function buildProjectFactCorpus(): Record<string, ProjectFactCorpus> {
  const corpus: Record<string, ProjectFactCorpus> = {};

  for (const project of PROJECTS) {
    const detail = PROJECT_DETAIL_COPY[project.id as keyof typeof PROJECT_DETAIL_COPY];
    const frDetail = detail?.fr;
    const enDetail = detail?.en;

    const frProofs: string[] = [];
    const enProofs: string[] = [];

    // Extract verified proofs from results & method steps
    if (frDetail) {
      if (frDetail.results) {
        for (const res of frDetail.results) {
          frProofs.push(`${res.label} : ${res.value} (${res.detail})`);
        }
      }
      if (frDetail.methodSteps) {
        for (const step of frDetail.methodSteps.slice(0, 3)) {
          frProofs.push(`${step.title} : ${step.description}`);
        }
      }
      if ('architecture' in frDetail && frDetail.architecture && 'layers' in frDetail.architecture) {
        for (const layer of frDetail.architecture.layers.slice(0, 2)) {
          frProofs.push(`${layer.title} : ${layer.description}`);
        }
      }
    }

    if (enDetail) {
      if (enDetail.results) {
        for (const res of enDetail.results) {
          enProofs.push(`${res.label}: ${res.value} (${res.detail})`);
        }
      }
      if (enDetail.methodSteps) {
        for (const step of enDetail.methodSteps.slice(0, 3)) {
          enProofs.push(`${step.title}: ${step.description}`);
        }
      }
      if ('architecture' in enDetail && enDetail.architecture && 'layers' in enDetail.architecture) {
        for (const layer of enDetail.architecture.layers.slice(0, 2)) {
          enProofs.push(`${layer.title}: ${layer.description}`);
        }
      }
    }

    if (project.id === 'pneumonia-detection') {
      frProofs.push(...PNEUMONIA_NOTEBOOK_PROOFS.fr);
      enProofs.push(...PNEUMONIA_NOTEBOOK_PROOFS.en);
    }

    corpus[project.id] = {
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      skills: project.skills,
      fr: {
        title: project.title,
        summary: project.summary,
        context: frDetail?.context || project.context,
        verifiedProofs: frProofs,
        limitations: frDetail?.limitations ? [...frDetail.limitations] : [],
      },
      en: {
        title: project.title,
        summary: project.tagline,
        context: enDetail?.context || project.context,
        verifiedProofs: enProofs,
        limitations: enDetail?.limitations ? [...enDetail.limitations] : [],
      },
    };
  }

  return corpus;
}

export const PROJECT_CORPUS = buildProjectFactCorpus();

export const GROWING_FIELDS_INFO: Record<string, { fr: GrowingFieldMatch; en: GrowingFieldMatch }> = {
  'data-engineering': {
    fr: {
      field: 'Data Engineering',
      label: 'Axe prioritaire en développement',
      description:
        'Le Data Engineering est le principal axe de progression de Godwin. Actuellement en 2e année à l’ENSA Khouribga et bénéficiaire d’une bourse annuelle DataCamp, il approfondit les pipelines, SQL et Python appliqués aux données avant de livrer un projet dédié.',
    },
    en: {
      field: 'Data Engineering',
      label: 'Core Focus in Progress',
      description:
        'Data Engineering is Godwin’s primary growth area. Currently in his 2nd year of engineering at ENSA Khouribga with a one-year DataCamp scholarship, he is actively structuring pipelines, SQL, and data processing practices prior to publishing a production project.',
    },
  },
  'machine-learning': {
    fr: {
      field: 'Machine Learning & Deep Learning',
      label: 'Axe théorique & pratique en cours d’acquisition',
      description:
        'Le Machine Learning et le Deep Learning font partie de son parcours académique à l’ENSA Khouribga et de ses cours DataCamp. Les projets ACP, AFC et le module d’ACP de GTM utilisent des méthodes factorielles exploratoires et statistiques descriptives, et non des modèles prédictifs déployés.',
    },
    en: {
      field: 'Machine Learning & Deep Learning',
      label: 'Academic & Applied Skills in Progress',
      description:
        'Machine Learning and Deep Learning are part of his active curriculum at ENSA Khouribga and DataCamp courses. The ACP project, the PCA module in GTM, and the CA project are exploratory factorial analyses, not predictive production models.',
    },
  },
  'data-science': {
    fr: {
      field: 'Data Science',
      label: 'Compétences analytiques et modélisation en cours',
      description:
        'Les projets Olist, ACP et AFC démontrent la manipulation des données (Pandas, NumPy, Matplotlib, SciPy) et les statistiques appliquées. Les modèles prédictifs avancés de Data Science sont en cours d’apprentissage.',
    },
    en: {
      field: 'Data Science',
      label: 'Analytical & Modeling Skills in Progress',
      description:
        'The Olist, ACP, and AFC projects demonstrate data manipulation (Pandas, NumPy, Matplotlib, SciPy) and applied statistics. Advanced predictive Data Science models are actively being studied.',
    },
  },
};

/**
 * Returns a compact prompt context strictly grounded in authoritative facts.
 */
export function getPromptCorpusContext(locale: 'fr' | 'en'): string {
  const lines: string[] = [
    `PORTFOLIO AUTHORITATIVE CORPUS (${locale.toUpperCase()}):`,
    `Owner: ${PROFILE.name} (${PROFILE.title}, ${PROFILE.badge})`,
    `Philosophy: ${PROFILE.corePhilosophy} (Evidence > Claim)`,
    '',
    'PROJECTS REPOSITORY:',
  ];

  for (const [id, item] of Object.entries(PROJECT_CORPUS)) {
    const loc = item[locale];
    lines.push(`- ID: ${id}`);
    lines.push(`  Title: ${item.title}`);
    lines.push(`  Category: ${item.category}`);
    lines.push(`  Skills: ${item.skills.join(', ')}`);
    lines.push(`  Summary: ${loc.summary}`);
    lines.push(`  Verified Proofs:`);
    for (const proof of loc.verifiedProofs.slice(0, 3)) {
      lines.push(`    * ${proof}`);
    }
    lines.push(`  Documented Limitations:`);
    for (const lim of loc.limitations.slice(0, 3)) {
      lines.push(`    ! ${lim}`);
    }
  }

  lines.push('');
  lines.push('GROWING FIELDS (IN PROGRESS, NOT PRODUCTION-READY):');
  for (const grow of Object.values(GROWING_FIELDS_INFO)) {
    const g = grow[locale];
    lines.push(`- ${g.field}: ${g.description}`);
  }

  return lines.join('\n');
}
