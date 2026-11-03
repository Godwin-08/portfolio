import { EvidenceMatchResponse, GrowingFieldMatch, MatchLevel, ProjectEvidenceMatch, RelatedKnowledgeItem } from './types';
import { GROWING_FIELDS_INFO, PROJECT_CORPUS } from './corpus';
import { CERTIFICATIONS } from '@/data/certifications';
import { documentToRelatedItem, getKnowledgeDocumentById, getKnowledgeDocumentsByCategory } from './knowledge-corpus';

interface KeywordRule {
  keywords: string[];
  projectWeights: Record<string, number>; // projectId -> weight (1 to 10)
  reasons: { fr: string; en: string };
}

const DOMAIN_RULES: KeywordRule[] = [
  // SQL, Relational DB, ORM
  {
    keywords: [
      'sql', 'mysql', 'sqlalchemy', 'bdd', 'base de donnees', 'bases de donnees',
      'database', 'databases', 'relationnel', 'relationnelle', 'mcd', 'mld', '3nf',
      'jointure', 'jointures', 'requete sql', 'requetes sql', 'tables relationnelles', 'schema relationnel'
    ],
    projectWeights: {
      gtm: 10,
      'sante-scolaire': 8,
      'goodthought-sql-analysis': 7,
      'motorcycle-parts-sales': 7,
      'students-mental-health': 7,
    },
    reasons: {
      fr: 'Requêtes SQL et analyse de données relationnelles documentées dans le projet.',
      en: 'SQL queries and relational data analysis documented in the project.',
    },
  },
  {
    keywords: [
      'goodthought', 'good thought', 'ngo donations', 'ngo impact',
      'donation impact', 'donation amounts', 'donations', 'donation',
      'donateurs', 'donor types', 'impact score', 'scores d impact',
      'mission impact', 'missions ong', 'assignment_316',
    ],
    projectWeights: { 'goodthought-sql-analysis': 10 },
    reasons: {
      fr: 'Requêtes SQL sur les missions, les dons et les scores d’impact du cas d’exercice GoodThought.',
      en: 'SQL queries on assignments, donations, and impact scores in the GoodThought practice case.',
    },
  },
  {
    keywords: [
      'motorcycle', 'motorbike', 'motorcycle parts', 'motorbike parts',
      'motorcycle sales', 'parts sales', 'pieces de moto', 'piece de moto',
      'ventes de pieces', 'ventes moto', 'motorcycle warehouse',
      'payment_fee',
    ],
    projectWeights: { 'motorcycle-parts-sales': 10 },
    reasons: {
      fr: 'Projet guidé DataCamp d’agrégation SQL des ventes de pièces par produit, mois et entrepôt.',
      en: 'Guided DataCamp project using SQL to aggregate parts sales by product, month, and warehouse.',
    },
  },
  {
    keywords: [
      'students mental health', 'student mental health',
      'mental health survey', 'sante mentale des etudiants',
      'sante mentale etudiants', 'phq-9', 'phq 9', 'todep',
      'asiss', 'toas', 'tosc', 'acculturative stress',
      'stress d acculturation', 'international students',
      'etudiants internationaux',
    ],
    projectWeights: { 'students-mental-health': 10 },
    reasons: {
      fr: 'Projet guidé DataCamp comparant des scores PHQ-9, SCS et ASISS selon le statut étudiant et la durée du séjour.',
      en: 'Guided DataCamp project comparing PHQ-9, SCS, and ASISS scores by student status and length of stay.',
    },
  },

  // Data Preparation, Cleaning, EDA, Pandas, NumPy
  {
    keywords: [
      'pandas', 'numpy', 'nettoyage', 'preparation', 'data cleaning', 'eda',
      'analyse exploratoire', 'preprocessing', 'manipulation', 'csv', 'donnees manquantes',
      'imputation', 'dataset', 'datasets', 'data analysis', 'analyse de donnees'
    ],
    projectWeights: {
      olist: 10,
      afc: 9,
      gtm: 7,
    },
    reasons: {
      fr: 'Traitement, nettoyage, jointures multi-tables et analyse exploratoire avec Pandas et NumPy.',
      en: 'Data processing, cleaning, multi-table joins, and exploratory analysis with Pandas and NumPy.',
    },
  },

  // Visualization, BI, Dashboards, Reporting, KPIs
  {
    keywords: [
      'visualisation', 'visualisations', 'dataviz', 'dashboard', 'dashboards',
      'tableau de bord', 'tableaux de bord', 'kpi', 'indicateurs', 'chart.js',
      'matplotlib', 'seaborn', 'bi', 'business intelligence', 'reporting',
      'export', 'pdf', 'excel', 'openpyxl', 'reportlab'
    ],
    projectWeights: {
      gtm: 10,
      olist: 8,
      'sante-scolaire': 6,
      afc: 6,
    },
    reasons: {
      fr: 'Conception d’indicateurs décisionnels, graphiques dynamiques et exports PDF/Excel automatisés.',
      en: 'Design of operational KPIs, interactive charts, and automated PDF/Excel exports.',
    },
  },

  // Flask, Backend, Web Development, Jinja, REST
  {
    keywords: [
      'flask', 'python backend', 'application web', 'web application', 'web app',
      'api rest', 'jinja', 'jinja2', 'mvc'
    ],
    projectWeights: {
      gtm: 10,
      'sante-scolaire': 8,
      novastore: 8,
    },
    reasons: {
      fr: 'Architecture serveur Flask, organisation modulaire et services métier isolés.',
      en: 'Flask server architecture, modular structure, and isolated business services.',
    },
  },

  // Roles, Permissions, Auth, Access Control
  {
    keywords: [
      'role', 'roles', 'permission', 'permissions', 'authentification', 'auth',
      'securite', 'login', 'acces', 'controle d\'acces', 'administrateur', 'admin',
      'medecin', 'infirmier', 'multi-profil', 'profils', 'session', 'sessions'
    ],
    projectWeights: {
      'sante-scolaire': 10,
      gtm: 9,
    },
    reasons: {
      fr: 'Gestion des rôles utilisateurs avec parcours, vues et contrôles d’accès différenciés.',
      en: 'Role-based access control with dedicated user views and access checks.',
    },
  },

  // Modular Architecture & Clean Code
  {
    keywords: [
      'architecture modulaire', 'modular architecture', 'blueprints', 'blueprint',
      'couches', 'separation des responsabilites', 'clean code', 'mvc'
    ],
    projectWeights: {
      gtm: 10,
      'sante-scolaire': 8,
      'revision-flow': 7,
    },
    reasons: {
      fr: 'Découpage en couches étanches : présentation, contrôleurs, services métier et persistance.',
      en: 'Separation of concerns: presentation layer, controllers, business services, and persistence.',
    },
  },

  // Statistics, Contingency tables, Chi-square, Correspondence Analysis
  {
    keywords: [
      'statistique', 'statistiques', 'statistics', 'contingence', 'tableau de contingence',
      'chi-deux', 'chi2', 'chi-square', 'inertie', 'inertie totale', 'afc', 'acp',
      'statistical', 'statistical methods', 'statistiques appliquees',
      'correspondance', 'correspondance analysis', 'contingency tables', 'contingency table',
      'valeurs singulieres', 'svd', 'biplot', 'scipy'
    ],
    projectWeights: {
      afc: 12,
      olist: 7,
      gtm: 6,
    },
    reasons: {
      fr: 'Mise en œuvre mathématique de l’AFC et de l’ACP : diagonalisation, profils et projections.',
      en: 'Mathematical implementation of CA and PCA: diagonalization, profiles, and projections.',
    },
  },

  // Planning, Scheduling, Algorithms, Pomodoro
  {
    keywords: [
      'planning', 'planification', 'ordonnancement', 'revision', 'revisions',
      'pomodoro', 'score de priorite', 'backlog', 'store', 'reactif', 'reactivite'
    ],
    projectWeights: {
      'revision-flow': 10,
    },
    reasons: {
      fr: 'Algorithme glouton d’ordonnancement et Store réactif avec persistance locale.',
      en: 'Greedy scheduling algorithm and reactive Store with local persistence.',
    },
  },

  // E-commerce, Cart, Catalog
  {
    keywords: [
      'e-commerce', 'commerce', 'boutique', 'panier', 'catalogue', 'novastore',
      'commande', 'facture', 'facturation', 'produits'
    ],
    projectWeights: {
      novastore: 10,
      olist: 8,
    },
    reasons: {
      fr: 'Prototype de boutique en ligne avec gestion de catalogue, panier et facturation.',
      en: 'Online store prototype with catalog, cart management, and invoice generation.',
    },
  },

  // School Healthcare, Medical Records
  {
    keywords: [
      'sante', 'sante scolaire', 'medical', 'infirmerie', 'eleves', 'consultations',
      'visites medicales', 'agenda', 'vaccination'
    ],
    projectWeights: {
      'sante-scolaire': 10,
    },
    reasons: {
      fr: 'Suivi de la santé scolaire, gestion des dossiers médicaux et agenda des consultations.',
      en: 'School health monitoring, medical records management, and consultation scheduling.',
    },
  },
];

const GROWING_KEYWORD_MAP: Record<string, string[]> = {
  'data-engineering': [
    'data engineering', 'data engineer', 'pipeline', 'pipelines', 'etl', 'elt',
    'airflow', 'kafka', 'spark', 'lakehouse', 'data warehouse', 'big data'
  ],
  'machine-learning': [
    'machine learning', 'ml', 'deep learning', 'ia generative', 'reseaux de neurones',
    'neural network', 'classification', 'regression', 'modele predictif', 'predictif',
    'prediction', 'apprentissage automatique', 'supervised learning', 'unsupervised learning'
  ],
  'data-science': [
    'data science', 'data scientist', 'ia', 'intelligence artificielle', 'artificial intelligence'
  ],
};

function normalizeString(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isUndocumentedEmploymentDetailQuery(query: string): boolean {
  const normalized = normalizeString(query);
  const asksForMissingDetail = textContainsAny(normalized, [
    'salaire', 'salary', 'remuneration', 'compensation', 'gratification',
    'stipend', 'wage', 'pay', 'horaires', 'working hours', 'work hours',
    'working schedule', 'contract terms', 'contractual terms',
    'conditions contractuelles', 'avantages contractuels',
  ]);
  const hasPersonalOrWorkContext = textContainsAny(normalized, [
    'mon', 'ma', 'mes', 'moi', 'my', 'mine', 'galaxy', 'stage',
    'internship', 'intern', 'experience', 'employment', 'job', 'contract',
    'entreprise', 'professional',
  ]);

  return asksForMissingDetail && hasPersonalOrWorkContext;
}

function textContainsKeyword(text: string, keyword: string): boolean {
  const normKw = normalizeString(keyword);
  if (!normKw) return false;

  if (normKw.includes(' ')) {
    return text.includes(normKw);
  }

  const escaped = normKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
  return regex.test(text);
}

function textContainsAny(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => textContainsKeyword(text, kw));
}

function findGuidedProjectId(query: string): string | undefined {
  const projectKeywords: Record<string, string[]> = {
    'goodthought-sql-analysis': [
      'goodthought',
      'good thought',
      'ngo donations',
      'donation impact',
      'dons goodthought',
      'donateurs goodthought',
      'assignment_316',
    ],
    'motorcycle-parts-sales': [
      'motorcycle parts',
      'motorbike parts',
      'motorcycle sales',
      'parts sales',
      'pieces de moto',
      'piece de moto',
      'ventes de pieces de moto',
      'analyse des ventes de pieces',
      'motorcycle warehouse sales',
      'payment_fee',
    ],
    'students-mental-health': [
      'students mental health',
      'student mental health',
      'mental health survey',
      'mental health',
      'sante mentale des etudiants',
      'sante mentale etudiants',
      'sante mentale',
      'phq-9',
      'phq 9',
      'asiss',
      'acculturative stress',
      'stress d acculturation',
      'international students',
      'etudiants internationaux',
    ],
  };

  return Object.entries(projectKeywords).find(([, keywords]) =>
    textContainsAny(query, keywords)
  )?.[0];
}

/**
 * Deterministic matching engine (Option A) used as immediate local fallback.
 * Strictly honest, transparent, and auditable across all portfolio knowledge categories.
 */
export function runLocalMatcher(query: string, locale: 'fr' | 'en' = 'fr'): EvidenceMatchResponse {
  const normQuery = normalizeString(query);
  const isDocumentRequest = textContainsAny(normQuery, [
    'documents', 'document public', 'public document', 'rapport pdf', 'rapport',
    'report', 'cv', 'resume', 'download', 'telecharger', 'non-public', 'non public',
    'private document', 'confidential document', 'unverified', 'not verified',
    'non verifie', 'non publie',
  ]);

  if (!normQuery || normQuery.length < 2) {
    return {
      status: 'no_match',
      mode: 'keyword',
      query,
      locale,
      matches: [],
      message:
        locale === 'fr'
          ? 'Veuillez saisir au moins deux caractères pour lancer la recherche.'
          : 'Please enter at least two characters to search.',
    };
  }

  if (isUndocumentedEmploymentDetailQuery(query)) {
    return {
      status: 'no_match',
      mode: 'keyword',
      query,
      locale,
      intent: 'general',
      matches: [],
      message:
        locale === 'fr'
          ? 'Cette information personnelle ou contractuelle (rémunération, horaires ou conditions de stage) n’est pas documentée dans le portfolio.'
          : 'This personal or employment detail (pay, working hours, or internship terms) is not documented in the portfolio.',
    };
  }

  // 0. UNSUPPORTED OUT-OF-SCOPE TECH CHECK
  const UNSUPPORTED_TECH_KEYWORDS = [
    'kubernetes', 'k8s', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud',
    'terraform', 'ansible', 'solidity', 'blockchain', 'rust', 'flutter', 'react native',
    'ios', 'swift', 'android', 'kotlin', 'c++', 'c#', '.net', 'cobol', 'angular', 'vue'
  ];

  if (
    textContainsAny(normQuery, UNSUPPORTED_TECH_KEYWORDS) &&
    !textContainsAny(normQuery, ['python', 'sql', 'pandas', 'numpy', 'flask', 'gtm', 'olist', 'afc'])
  ) {
    return {
      status: 'no_match',
      mode: 'keyword',
      query,
      locale,
      intent: 'general',
      matches: [],
      message:
        locale === 'fr'
          ? 'Aucun projet documenté ne démontre actuellement cette compétence spécifique.'
          : 'No documented project currently demonstrates this specific skill.',
    };
  }

  // 1. COMPARISON INTENT (GTM vs SantéScolaire, etc.)
  if (
    (textContainsKeyword(normQuery, 'difference') || textContainsKeyword(normQuery, 'comparer') || textContainsKeyword(normQuery, 'compare') || textContainsKeyword(normQuery, 'comparaison')) &&
    textContainsKeyword(normQuery, 'gtm') &&
    (normQuery.includes('sante') || normQuery.includes('scolaire'))
  ) {
    const gtmProj = PROJECT_CORPUS['gtm'];
    const ssProj = PROJECT_CORPUS['sante-scolaire'];
    const matches: ProjectEvidenceMatch[] = [
      {
        projectId: 'gtm',
        projectSlug: 'gtm',
        projectTitle: gtmProj.title,
        category: gtmProj.category,
        level: 'strong',
        reason:
          locale === 'fr'
            ? 'Application issue d’un stage professionnel chez Galaxy Solutions, axée sur la Business Intelligence (15+ KPIs, ACP, exports PDF/Excel automatisés).'
            : 'Developed during a professional internship at Galaxy Solutions, centered on Business Intelligence (15+ KPIs, PCA, automated PDF/Excel exports).',
        verifiedProofs: gtmProj[locale].verifiedProofs.slice(0, 3),
        limitations: gtmProj[locale].limitations.slice(0, 3),
        href: `/${locale === 'fr' ? 'projets' : 'projects'}/gtm`,
      },
      {
        projectId: 'sante-scolaire',
        projectSlug: 'sante-scolaire',
        projectTitle: ssProj.title,
        category: ssProj.category,
        level: 'strong',
        reason:
          locale === 'fr'
            ? 'Application développée individuellement, centrée sur le contrôle d’accès strict par rôles (RBAC pour Administrateur, Médecin et Infirmier).'
            : 'Individually developed application focused on strict Role-Based Access Control (RBAC for Administrator, Doctor, and Nurse).',
        verifiedProofs: ssProj[locale].verifiedProofs.slice(0, 3),
        limitations: ssProj[locale].limitations.slice(0, 3),
        href: `/${locale === 'fr' ? 'projets' : 'projects'}/sante-scolaire`,
      },
    ];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'comparison',
      directAnswer:
        locale === 'fr'
          ? 'GTM et SantéScolaire partagent un socle Python Flask et MySQL avec SQLAlchemy, mais leurs finalités diffèrent : GTM est issu d’un stage chez Galaxy Solutions, axé sur le pilotage d’activité et la BI (15+ KPIs, ACP, exports PDF/Excel), tandis que SantéScolaire est un projet individuel centré sur le cloisonnement strict des accès par rôles (RBAC pour Administrateur, Médecin, Infirmier).'
          : 'GTM and SantéScolaire share a Python Flask and MySQL stack with SQLAlchemy, but differ in context and purpose: GTM was built during an internship at Galaxy Solutions, focused on BI dashboards and operational reporting (15+ KPIs, PCA, PDF/Excel exports), whereas SantéScolaire is an individual project centered on strict Role-Based Access Control (RBAC for Administrator, Doctor, and Nurse).',
      matches,
    };
  }

  const pneumoniaProjectSignals = [
    'pneumonia',
    'pneumonie',
    'x ray',
    'x rays',
    'xray',
    'radiographie',
    'radiographies',
    'radiograph',
    'radiographs',
    'densenet121',
    'cnn',
  ];
  const hasPneumoniaProjectSignal = textContainsAny(
    normQuery,
    pneumoniaProjectSignals
  );
  const asksToPresentProject = textContainsAny(normQuery, [
    'projet',
    'project',
    'projets',
    'projects',
    'presenter',
    'presente',
    'decrire',
    'describe',
    'tell me about',
    'worked on',
  ]);
  const asksModelComparison =
    textContainsAny(normQuery, [
      'compare',
      'compared',
      'compares',
      'comparee',
      'comparees',
      'comparer',
      'comparaison',
    ]) &&
    textContainsAny(normQuery, [
      'modele',
      'modeles',
      'model',
      'models',
      'approche',
      'approches',
      'approach',
      'approaches',
    ]);
  const asksForResults = textContainsAny(normQuery, [
    'resultat',
    'resultats',
    'results',
    'finding',
    'findings',
    'score',
    'scores',
    'moyenne',
    'moyennes',
    'average',
    'averages',
    'metrique',
    'metrics',
    'accuracy',
    'recall',
    'rappel',
    'precision',
    'f1',
    'auc',
    'seuil',
    'threshold',
  ]);
  const asksForInterpretation = textContainsAny(normQuery, [
    'interprete',
    'interpreter',
    'interpretes',
    'interpret',
    'interpreted',
    'interpreting',
    'interpretation',
    'signifie',
    'mean',
  ]);
  const asksForLimitations = textContainsAny(normQuery, [
    'limite',
    'limites',
    'limitation',
    'limitations',
  ]);
  const refersToSingleProject = textContainsAny(normQuery, [
    'ce projet',
    'this project',
    'the project',
    'mon projet',
    'my project',
  ]);
  const asksForProjectPresentation =
    asksToPresentProject &&
    (hasPneumoniaProjectSignal ||
      textContainsAny(normQuery, ['deep learning', 'deep-learning']));
  const shouldMatchPneumonia =
    hasPneumoniaProjectSignal ||
    asksForProjectPresentation ||
    asksModelComparison ||
    (asksForResults && asksForInterpretation) ||
    (asksForLimitations && refersToSingleProject);

  if (shouldMatchPneumonia) {
    const project = PROJECT_CORPUS['pneumonia-detection'];
    const knowledge = getKnowledgeDocumentById('proj-pneumonia-detection');
    if (!project || !knowledge) {
      throw new Error('Pneumonia Detection knowledge is missing from the AI corpus.');
    }

    const asksOnlyForLimitations = asksForLimitations;
    const evidence = asksOnlyForLimitations
      ? knowledge.facts[locale].filter((fact) =>
          textContainsAny(normalizeString(fact), [
            'evaluation',
            'test set',
            'jeu de test',
            'validation',
            'comparison',
            'comparaison',
          ])
        )
      : asksForResults
        ? knowledge.proofs?.[locale] ?? []
        : knowledge.facts[locale].filter((fact) =>
            textContainsAny(normalizeString(fact), [
              'contexte',
              'context',
              'donnees',
              'data and preparation',
              'dataset',
              'cnn',
              'densenet121',
              'transfer learning',
              'feature extraction',
              'fine-tuning',
            ])
          );

    const isLimitationsIntent = asksForLimitations;
    const isComparisonIntent = asksModelComparison;
    const directAnswer = isLimitationsIntent
      ? locale === 'fr'
        ? 'C’est un projet académique, pas un outil de diagnostic. Les résultats portent sur des radiographies pédiatriques et le jeu de test du projet, sans validation externe; les seuils diffèrent entre les expériences, ce qui empêche une comparaison concluante.'
        : 'This is an academic project, not a diagnostic tool. Results use pediatric X-rays and the project test set, without external validation; thresholds differ between experiments, so they do not support a conclusive comparison.'
      : isComparisonIntent
        ? locale === 'fr'
          ? 'Le projet compare un CNN entraîné à partir de zéro avec DenseNet121 pré-entraîné sur ImageNet, d’abord en Feature Extraction puis en fine-tuning. Les seuils employés diffèrent entre les expériences; les résultats ne permettent donc pas d’isoler un gagnant dans une comparaison à protocole identique.'
          : 'The project compares a CNN trained from scratch with DenseNet121, pre-trained on ImageNet, first using Feature Extraction and then fine-tuning. The experiments use different thresholds, so the results do not establish a winner in a like-for-like comparison.'
        : asksForResults
          ? locale === 'fr'
            ? 'Les sorties enregistrées indiquent sur le jeu de test une accuracy de 0,809295 pour le CNN au seuil 0,7 et de 0,887821 pour DenseNet121 en Feature Extraction au seuil 0,8. Les seuils et les expériences diffèrent; ces chiffres ne suffisent pas à conclure que DenseNet121 est généralement supérieur.'
            : 'Saved test outputs report accuracy of 0.809295 for the CNN at threshold 0.7 and 0.887821 for DenseNet121 Feature Extraction at threshold 0.8. The experiments use different thresholds, so these figures do not show that DenseNet121 is generally better.'
          : locale === 'fr'
            ? 'Pneumonia Detection est un projet académique mené en équipe à l’ENSA Khouribga pour classer des radiographies thoraciques en NORMAL ou PNEUMONIA. Il compare un CNN construit pour le projet à DenseNet121 pré-entraîné, sur le jeu pédiatrique Chest X-Ray de Kaggle.'
            : 'Pneumonia Detection is an academic team project at ENSA Khouribga to classify chest X-rays as NORMAL or PNEUMONIA. It compares a project-built CNN with pre-trained DenseNet121 on the pediatric Chest X-Ray dataset from Kaggle.';

    return {
      status: 'success',
      mode: 'keyword',
      query,
      locale,
      intent: isComparisonIntent ? 'comparison' : 'projects',
      directAnswer,
      matches: [
        {
          projectId: project.id,
          projectSlug: project.slug,
          projectTitle: project.title,
          category: project.category,
          level: 'strong',
          reason:
            locale === 'fr'
              ? 'Projet académique de classification de radiographies comparant un CNN personnalisé et DenseNet121.'
              : 'Academic X-ray classification project comparing a custom CNN with DenseNet121.',
          verifiedProofs: evidence,
          limitations: project[locale].limitations,
          href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
        },
      ],
    };
  }

  const guidedProjectId = findGuidedProjectId(normQuery);
  if (guidedProjectId) {
    const project = PROJECT_CORPUS[guidedProjectId];
    const knowledge = getKnowledgeDocumentById(`proj-${guidedProjectId}`);
    if (!project || !knowledge) {
      throw new Error(`Guided project knowledge is missing for ${guidedProjectId}.`);
    }

    const proofs = knowledge.proofs?.[locale] ?? project[locale].verifiedProofs;
    const limitations = knowledge.limitations?.[locale] ?? project[locale].limitations;
    const directAnswer = asksForLimitations
      ? limitations.length > 0
        ? locale === 'fr'
          ? `Limites documentées pour ${project.title} : ${limitations.join(' ')}`
          : `Documented limitations for ${project.title}: ${limitations.join(' ')}`
        : locale === 'fr'
          ? `Aucune limite spécifique n’est documentée pour ${project.title} dans le portfolio.`
          : `No specific limitations for ${project.title} are documented in the portfolio.`
      : asksForResults && proofs.length > 0
        ? proofs.join(' ')
        : `${knowledge.summary[locale]} ${knowledge.facts[locale].slice(0, 3).join(' ')}`;

    return {
      status: 'success',
      mode: 'keyword',
      query,
      locale,
      intent: 'projects',
      directAnswer,
      matches: [
        {
          projectId: project.id,
          projectSlug: project.slug,
          projectTitle: project.title,
          category: project.category,
          level: 'strong',
          reason:
            locale === 'fr'
              ? `Correspondance directe avec le projet ${project.title}.`
              : `Direct match for the ${project.title} project.`,
          verifiedProofs: proofs,
          limitations,
          href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
        },
      ],
      relatedItems: [documentToRelatedItem(knowledge, locale)],
    };
  }

  // 2. PROJECT-SPECIFIC LIMITATIONS INTENT
  if (
    asksForLimitations &&
    textContainsAny(normQuery, [
      'olist', 'gtm', 'sante scolaire', 'santescolaire', 'afc', 'acp',
      'revisionflow', 'revision flow', 'novastore', 'pneumonia detection',
    ])
  ) {
    const project = Object.values(PROJECT_CORPUS).find((candidate) =>
      [
        candidate.id,
        candidate.id.replace(/-/g, ' '),
        candidate.id.replace(/-/g, ''),
        candidate.title,
        candidate.slug.replace(/-/g, ' '),
      ].some((alias) => textContainsKeyword(normQuery, alias))
    );

    if (project) {
      const limitations = project[locale].limitations;
      return {
        status: 'answer',
        mode: 'keyword',
        query,
        locale,
        intent: 'projects',
        directAnswer:
          limitations.length > 0
            ? locale === 'fr'
              ? `Limites documentées pour ${project.title} : ${limitations.join(' ')}`
              : `Documented limitations for ${project.title}: ${limitations.join(' ')}`
            : locale === 'fr'
              ? `Aucune limite spécifique n’est documentée pour ${project.title} dans le portfolio.`
              : `No specific limitations for ${project.title} are documented in the portfolio.`,
        matches: [
          {
            projectId: project.id,
            projectSlug: project.slug,
            projectTitle: project.title,
            category: project.category,
            level: 'strong',
            reason:
              locale === 'fr'
                ? `Limites documentées pour ${project.title}.`
                : `Documented limitations for ${project.title}.`,
            verifiedProofs: project[locale].verifiedProofs.slice(0, 3),
            limitations,
            href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
          },
        ],
      };
    }
  }

  // 3. PROJECT LIMITATIONS INTENT
  if (
    textContainsAny(normQuery, ['limites', 'limite', 'limitations', 'limitation']) &&
    textContainsAny(normQuery, ['projet', 'projets', 'portfolio', 'principales', 'connues'])
  ) {
    const allMatches: ProjectEvidenceMatch[] = Object.values(PROJECT_CORPUS).map((p) => ({
      projectId: p.id,
      projectSlug: p.slug,
      projectTitle: p.title,
      category: p.category,
      level: 'strong',
      reason:
        locale === 'fr'
          ? `Limites documentées de manière transparente pour ${p.title}.`
          : `Transparently documented limitations for ${p.title}.`,
      verifiedProofs: p[locale].verifiedProofs.slice(0, 2),
      limitations: p[locale].limitations.slice(0, 3),
      href: `/${locale === 'fr' ? 'projets' : 'projects'}/${p.slug}`,
    }));

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'projects',
      directAnswer:
        locale === 'fr'
          ? 'Les limites documentées avec transparence sur le portfolio sont : 1. Les données affichées dans GTM et SantéScolaire sont des données de démonstration fictives. 2. Les analyses Olist et AFC utilisent des méthodes exploratoires et descriptives, et non des modèles prédictifs déployés en production. 3. Le module de paiement de NovaStore est simulé. 4. RevisionFlow fonctionne uniquement avec le stockage local du navigateur.'
          : 'Transparently documented project limitations include: 1. GTM and SantéScolaire display synthetic demo data. 2. Olist and CA use exploratory and descriptive statistics, not production predictive models. 3. NovaStore payment is simulated. 4. RevisionFlow operates strictly via browser local storage.',
      matches: allMatches.slice(0, 4),
    };
  }

  // 3. EDUCATION / ACADEMIC BACKGROUND INTENT
  if (
    textContainsAny(normQuery, [
      'parcours academique', 'parcours scolaire', 'cursus', 'diplome', 'diplomes',
      'cycle ingenieur', 'ensa', 'khouribga', 'deug', 'baccalaureat', 'ibn tofail',
      'academic background', 'academic degree', 'degrees'
    ]) ||
    textContainsAny(normQuery, [
      'formation actuelle', 'actuellement en formation', 'dans quelle formation',
      'formation suis-je', 'currently enrolled', 'degree program', 'study program',
      'what am i studying', 'current studies', 'what are my studies',
    ]) ||
    (textContainsKeyword(normQuery, 'etudes') && !textContainsKeyword(normQuery, 'cas')) ||
    (textContainsKeyword(normQuery, 'formation') && textContainsAny(normQuery, ['academique', 'scolaire', 'actuelle', 'initiale', 'cycle'])) ||
    (textContainsKeyword(normQuery, 'studies') && !textContainsKeyword(normQuery, 'case') && !textContainsKeyword(normQuery, 'planner'))
  ) {
    const eduDocs = getKnowledgeDocumentsByCategory('education');
    const relatedItems: RelatedKnowledgeItem[] = eduDocs.map((d) => documentToRelatedItem(d, locale));

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'education',
      directAnswer:
        locale === 'fr'
          ? 'Godwin est actuellement en 2e année du cycle ingénieur en Informatique et Ingénierie des Données (IID) à l’ENSA Khouribga (depuis 2025). Il est titulaire d’un DEUG en Informatique Fondamentale de l’Université Ibn Tofaïl de Kénitra (mention Assez Bien, 13/20, 2023–2025) et d’un Baccalauréat scientifique obtenu au Togo avec mention Très Bien (2022–2023).'
          : 'Godwin is currently in his 2nd year of the state engineering program in Computer Science & Data Engineering (IID) at ENSA Khouribga (since 2025). He holds an Associate Degree (DEUG) in Fundamental Computer Science from Ibn Tofaïl University (Fairly good honors / 13/20, 2023–2025) and a scientific Baccalaureate completed in Togo with Highest Honors (2022–2023).',
      matches: [],
      relatedItems,
    };
  }

  // 4. INTERNSHIP SEARCH & AVAILABILITY INTENT
  if (
    !isDocumentRequest &&
    textContainsAny(normQuery, [
      'stage', 'recherche de stage', 'disponibilite', 'disponible', 'quand commence',
      'periode de stage', 'date de stage', 'internship', 'availability', 'available'
    ])
  ) {
    const internDoc = getKnowledgeDocumentById('profile-internship');
    const relatedItems: RelatedKnowledgeItem[] = internDoc ? [documentToRelatedItem(internDoc, locale)] : [];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'internship',
      directAnswer:
        locale === 'fr'
          ? 'Godwin recherche activement un stage à partir de juillet 2027 dans les domaines du Data Engineering, de la Data Analysis / Business Intelligence, ou du développement logiciel orienté données. Il est joignable via godwinelienougbolo@gmail.com.'
          : 'Godwin is actively seeking an internship starting from July 2027 in Data Engineering, Data Analysis / Business Intelligence, or data-focused software development. He can be contacted at godwinelienougbolo@gmail.com.',
      matches: [],
      relatedItems,
    };
  }

  // 5. CAREER GOALS & METHODOLOGY INTENT
  if (
    textContainsAny(normQuery, [
      'objectifs professionnels', 'objectifs', 'axes de progression', 'progression',
      'methode de travail', 'methode', 'philosophie', 'tagline', 'career goals', 'methodology'
    ])
  ) {
    const methodDoc = getKnowledgeDocumentById('profile-method');
    const identityDoc = getKnowledgeDocumentById('profile-identity');
    const relatedItems: RelatedKnowledgeItem[] = [
      ...(methodDoc ? [documentToRelatedItem(methodDoc, locale)] : []),
      ...(identityDoc ? [documentToRelatedItem(identityDoc, locale)] : []),
    ];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'profile',
      directAnswer:
        locale === 'fr'
          ? 'Godwin oriente son profil vers le Data Engineering et l’analyse de données. Sa démarche d’ingénierie repose sur trois étapes : 1. Comprendre le problème et les contraintes, 2. Analyser et vérifier la qualité des données, 3. Construire un livrable modulaire et testé, sous le principe « Preuve > Affirmation ».'
          : 'Godwin focuses on Data Engineering and Data Analysis. His engineering approach follows three steps: 1. Understand the problem and constraints, 2. Analyze and verify data quality, 3. Build a modular, tested deliverable under the core rule "Proof > Claim".',
      matches: [],
      relatedItems,
    };
  }

  // 6. PROFESSIONAL EXPERIENCE (Galaxy Solutions) INTENT
  if (
    textContainsAny(normQuery, [
      'experience professionnelle', 'experiences professionnelles',
      'stage d\'initiation', 'galaxy solutions', 'galaxy', 'work experience',
      'professional experience', 'responsabilites documentees', 'responsabilites',
      'documented responsibilities', 'responsibilities', 'this experience',
      'cette experience',
    ])
  ) {
    const expDoc = getKnowledgeDocumentById('exp-galaxy-solutions');
    const gtmProj = PROJECT_CORPUS['gtm'];
    const relatedItems: RelatedKnowledgeItem[] = expDoc ? [documentToRelatedItem(expDoc, locale)] : [];
    const matches: ProjectEvidenceMatch[] = [
      {
        projectId: 'gtm',
        projectSlug: 'gtm',
        projectTitle: gtmProj.title,
        category: gtmProj.category,
        level: 'strong',
        reason:
          locale === 'fr'
            ? 'Application web professionnelle de suivi des formations conçue et développée pendant le stage d’initiation chez Galaxy Solutions.'
            : 'Professional web application for training tracking designed and implemented during initiation internship at Galaxy Solutions.',
        verifiedProofs: gtmProj[locale].verifiedProofs.slice(0, 3),
        limitations: gtmProj[locale].limitations.slice(0, 3),
        href: `/${locale === 'fr' ? 'projets' : 'projects'}/gtm`,
      },
    ];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'experience',
      directAnswer:
        expDoc?.facts[locale].join(' ') ??
        (locale === 'fr'
          ? 'Le portfolio documente un stage d’initiation terminé chez Galaxy Solutions et la réalisation de Galaxy Training Manager (GTM).'
          : 'The portfolio documents a completed initiation internship at Galaxy Solutions and the development of Galaxy Training Manager (GTM).'),
      matches,
      relatedItems,
    };
  }

  // 7. ASSOCIATIVE ENGAGEMENT (CESTOM) INTENT
  if (
    textContainsAny(normQuery, [
      'cestom', 'associatif', 'association', 'secretaire general', 'engagement associatif',
      'associatives', 'activites associatives', 'benevolat', 'benevole', 'tresorier',
      'community', 'leadership', 'association activities', 'community involvement',
      'volunteering activities'
    ])
  ) {
    const assocDoc = getKnowledgeDocumentById('assoc-cestom');
    const relatedItems: RelatedKnowledgeItem[] = assocDoc ? [documentToRelatedItem(assocDoc, locale)] : [];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'association',
      directAnswer:
        locale === 'fr'
          ? 'Godwin est actuellement Secrétaire général de la section locale de la CESTOM à Khouribga (accueil et orientation des nouveaux étudiants togolais, relais d’information avec le bureau national, organisation d’activités culturelles et coordination). Il a auparavant été trésorier local à Kénitra et bénévole à Ben Guerir.'
          : 'Godwin currently serves as General Secretary of the CESTOM chapter in Khouribga (welcoming new Togolese students, communication relay to national board, cultural coordination). He was previously local treasurer in Kénitra and a volunteer in Ben Guerir.',
      matches: [],
      relatedItems,
    };
  }

  // 8. CERTIFICATIONS & TRAINING INTENT
  if (
    textContainsAny(normQuery, [
      'certification', 'certifications', 'certificat', 'certificats', 'datacamp',
      'formation sql', 'cours sql', 'joining data in sql', 'summary stats', 'window functions',
      'certificate', 'certificates', 'issuer', 'issuing organization', 'issued by',
      'organisme formateur', 'organisme certificateur', 'qui a delivre',
      'contenu de formation', 'contenus de formation', 'course content',
      'documented course content', 'topics documented', 'chapitres', 'chapters',
      'syllabus', 'programme detaille', 'detailed syllabus'
    ]) ||
    CERTIFICATIONS.some((certification) =>
      normQuery.includes(normalizeString(certification.title))
    )
  ) {
    const certDocs = getKnowledgeDocumentsByCategory('certification');
    const requestedCertification = CERTIFICATIONS.find((certification) =>
      normQuery.includes(normalizeString(certification.title))
    );
    const relevantCertDocs = requestedCertification
      ? certDocs.filter((doc) => doc.id === `cert-${requestedCertification.id}`)
      : certDocs;
    const relatedItems: RelatedKnowledgeItem[] = relevantCertDocs.map((d) => documentToRelatedItem(d, locale));

    // Check if the query specifically asks for syllabus / detailed chapters
    const asksSyllabus = textContainsAny(normQuery, [
      'sujets etudies', 'sujets', 'programme detaille', 'chapitres', 'syllabus',
      'contenu detaille', 'notions abordees', 'topics studied', 'course content',
      'chapters',
      'domaines evalues', 'domaines de competences', 'competency domains assessed',
      'competency domains', 'assessed domains', 'domains assessed',
      'contenu de formation', 'contenus de formation', 'documented course content',
      'topics documented'
    ]);
    const asksIssuer = textContainsAny(normQuery, [
      'issuer', 'issuing organization', 'issued by', 'organisme formateur',
      'organisme certificateur', 'qui a delivre', 'who issued'
    ]);
    const asksValidity = textContainsAny(normQuery, [
      'expire', 'expiration', 'valid until', 'valid through', 'validity',
      'valide jusqu', 'date d expiration'
    ]);
    const asksDetailedSyllabus = textContainsAny(normQuery, [
      'programme detaille', 'chapitres', 'chapters', 'syllabus', 'detailed syllabus'
    ]);

    let directAnswer: string;
    if (asksValidity && requestedCertification?.expiresOn) {
      const expiry = new Intl.DateTimeFormat(
        locale === 'fr' ? 'fr-FR' : 'en-US',
        { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' }
      ).format(new Date(`${requestedCertification.expiresOn}T00:00:00Z`));
      directAnswer =
        locale === 'fr'
          ? `La certification « ${requestedCertification.title} » est valable jusqu’au ${expiry}.`
          : `The “${requestedCertification.title}” certification is valid through ${expiry}.`;
    } else if (asksIssuer && requestedCertification) {
      directAnswer =
        locale === 'fr'
          ? `L’organisme qui a délivré « ${requestedCertification.title} » est ${requestedCertification.issuer}.`
          : `“${requestedCertification.title}” was issued by ${requestedCertification.issuer}.`;
    } else if (asksSyllabus) {
      if (requestedCertification) {
        const course = requestedCertification.content[locale];
        directAnswer =
          locale === 'fr'
            ? `La fiche de « ${requestedCertification.title} » recense notamment ${course.topics.join(', ')}. Mise en pratique décrite : ${course.practice}${asksDetailedSyllabus ? ' La source ne fournit pas de programme détaillé organisé par chapitres.' : ''}`
            : `The record for “${requestedCertification.title}” lists ${course.topics.join(', ')}. Practice described: ${course.practice}${asksDetailedSyllabus ? ' The source does not provide a chapter-by-chapter syllabus.' : ''}`;
      } else {
        const courseCount = CERTIFICATIONS.filter(
          (certification) => certification.credentialType === 'course'
        ).length;
        const trackCount = CERTIFICATIONS.filter(
          (certification) => certification.credentialType === 'track'
        ).length;
        const certificationCount = CERTIFICATIONS.filter(
          (certification) => certification.credentialType === 'certification'
        ).length;
        const trackLabel = trackCount === 1 ? 'track' : 'tracks';
        directAnswer =
          locale === 'fr'
            ? `Le portfolio documente ${CERTIFICATIONS.length} preuves DataCamp, dont ${certificationCount} certification d’examen, ${trackCount} parcours et ${courseCount} cours terminés. Chaque fiche résume les notions documentées et la mise en pratique ; les programmes détaillés par chapitres ne sont pas fournis.`
            : `The portfolio documents ${CERTIFICATIONS.length} pieces of DataCamp evidence, including ${certificationCount} exam certification, ${trackCount} completed ${trackLabel}, and ${courseCount} courses. Each record summarises documented topics and practice; detailed chapter-by-chapter syllabi are not provided.`;
      }
    } else {
      const courseCount = CERTIFICATIONS.filter(
        (certification) => certification.credentialType === 'course'
      ).length;
      const trackCount = CERTIFICATIONS.filter(
        (certification) => certification.credentialType === 'track'
      ).length;
      const certificationCount = CERTIFICATIONS.filter(
        (certification) => certification.credentialType === 'certification'
      ).length;
      const courseLabelFr =
        courseCount === 1 ? 'attestation de cours' : 'attestations de cours';
      const trackLabelFr =
        trackCount === 1
          ? 'attestation de parcours'
          : 'attestations de parcours';
      const courseLabelEn =
        courseCount === 1
          ? 'course completion certificate'
          : 'course completion certificates';
      const trackLabelEn =
        trackCount === 1
          ? 'track completion certificate'
          : 'track completion certificates';
      directAnswer =
        locale === 'fr'
          ? `Le portfolio présente ${CERTIFICATIONS.length} preuves DataCamp : ${certificationCount} certification d’examen, ${courseCount} ${courseLabelFr} et ${trackCount} ${trackLabelFr} en statistiques, SQL, PostgreSQL, analyse et communication des données. Chaque fiche résume les apprentissages et indique où consulter la preuve disponible.`
          : `The portfolio presents ${CERTIFICATIONS.length} pieces of DataCamp evidence: ${certificationCount} exam certification, ${courseCount} ${courseLabelEn}, and ${trackCount} ${trackLabelEn} in statistics, SQL, PostgreSQL, data analysis, and communication. Each page summarizes the learning and links to the available evidence.`;
    }

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'certifications',
      directAnswer,
      matches: [],
      relatedItems,
    };
  }

  // 9. PUBLIC DOCUMENTS & DOWNLOADS INTENT
  if (
    isDocumentRequest ||
    textContainsAny(normQuery, [
      'documents publics', 'document public', 'rapports pdf', 'rapport de stage',
      'telecharger mon cv', 'cv pdf', 'presentation pdf', 'public documents', 'download cv', 'download resume'
    ]) ||
    (textContainsKeyword(normQuery, 'documents') && !textContainsKeyword(normQuery, 'export') && !textContainsKeyword(normQuery, 'automated'))
  ) {
    const docItems = getKnowledgeDocumentsByCategory('document');
    const relatedItems: RelatedKnowledgeItem[] = docItems.map((d) => documentToRelatedItem(d, locale));
    const asksForOlistReport =
      textContainsKeyword(normQuery, 'olist') &&
      textContainsAny(normQuery, ['rapport', 'report', 'pdf', 'document']);
    const asksForUnverifiedDocument = textContainsAny(normQuery, [
      'non-public', 'non public', 'private', 'confidential', 'unverified',
      'not verified', 'non verifie', 'non publie', 'not publicly available',
    ]);
    const asksForResume = textContainsAny(normQuery, ['cv', 'resume', 'curriculum vitae']);
    const olistProject = PROJECT_CORPUS.olist;

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'documents',
      directAnswer:
        asksForUnverifiedDocument
          ? locale === 'fr'
            ? 'Cette ressource n’est pas identifiée parmi les documents publics vérifiés du portfolio. Je ne peux pas confirmer sa disponibilité ni en fournir le contenu.'
            : 'This resource is not identified among the portfolio’s verified public documents. I cannot confirm its availability or provide its contents.'
          : asksForOlistReport
          ? locale === 'fr'
            ? `Le rapport Olist n’est pas inclus dans les sources documentaires que l’assistant peut consulter. Je ne peux donc pas en confirmer le lien ni en résumer le contenu.${asksForResume ? ' Le CV est disponible au téléchargement : /cv/CV_Godwin_Nougbolo.pdf.' : ''} La fiche publique du projet Olist reste consultable sur le portfolio.`
            : `The Olist report is not included in the documentary sources available to this assistant. I therefore cannot verify its link or summarize its contents.${asksForResume ? ' The resume is available to download: /cv/CV_Godwin_Nougbolo.pdf.' : ''} The public Olist project page remains available on the portfolio.`
          : locale === 'fr'
          ? 'Le CV est disponible au téléchargement : /cv/CV_Godwin_Nougbolo.pdf. Les autres documents publics comprennent le rapport de stage GTM (/documents/projects/gtm-internship-report-fr.pdf), la présentation méthodologique AFC, le rapport RevisionFlow et la présentation SantéScolaire.'
          : 'The resume is available to download: /cv/CV_Godwin_Nougbolo.pdf. Other public documents include the GTM internship report (/documents/projects/gtm-internship-report-fr.pdf), the CA methodology presentation, the RevisionFlow technical report, and the SantéScolaire presentation.',
      matches: asksForOlistReport && !asksForUnverifiedDocument
        ? [
            {
              projectId: olistProject.id,
              projectSlug: olistProject.slug,
              projectTitle: olistProject.title,
              category: olistProject.category,
              level: 'strong',
              reason:
                locale === 'fr'
                  ? 'Fiche du projet Olist; le rapport PDF n’est pas indexé par l’assistant.'
                  : 'Olist project page; the PDF report is not indexed by the assistant.',
              verifiedProofs: olistProject[locale].verifiedProofs.slice(0, 3),
              limitations: olistProject[locale].limitations.slice(0, 3),
              href: `/${locale === 'fr' ? 'projets' : 'projects'}/${olistProject.slug}`,
            },
          ]
        : [],
      relatedItems:
        asksForOlistReport || asksForUnverifiedDocument ? undefined : relatedItems,
    };
  }

  // 10. FLASK TECHNOLOGIES INTENT
  const asksWhichFlaskProjects =
    textContainsKeyword(normQuery, 'flask') &&
    textContainsAny(normQuery, ['projet', 'projets', 'project', 'projects']);
  if (
    textContainsKeyword(normQuery, 'flask') &&
    (asksWhichFlaskProjects ||
      textContainsAny(normQuery, [
        'technologies', 'outils', 'stack', 'utilise', 'utilisees', 'used', 'use'
      ]))
  ) {
    const gtmProj = PROJECT_CORPUS['gtm'];
    const ssProj = PROJECT_CORPUS['sante-scolaire'];
    const novaProj = PROJECT_CORPUS['novastore'];
    const flaskProjects = [gtmProj, ssProj, novaProj];

    return {
      status: 'answer',
      mode: 'keyword',
      query,
      locale,
      intent: 'skills',
      directAnswer:
        asksWhichFlaskProjects
          ? locale === 'fr'
            ? 'Les projets répertoriés avec Flask sont GTM, SantéScolaire et NovaStore.'
            : 'The projects documented as using Flask are GTM, SantéScolaire, and NovaStore.'
          : locale === 'fr'
          ? 'Dans ses projets web Flask (GTM et SantéScolaire), Godwin a mobilisé : SQLAlchemy (ORM et intégrité référentielle), MySQL (base relationnelle 3NF), Jinja2 (moteur de templates), Chart.js (tableaux de bord interactifs), Tailwind CSS / Bootstrap 5, ReportLab (génération PDF), openpyxl (tableurs Excel) et pytest (tests unitaires).'
          : 'In his Flask web projects (GTM and SantéScolaire), Godwin leveraged: SQLAlchemy (ORM and referential integrity), MySQL (3NF relational database), Jinja2 (templates), Chart.js (interactive dashboards), Tailwind CSS / Bootstrap 5, ReportLab (PDF generation), openpyxl (Excel workbooks), and pytest (unit testing).',
      matches: flaskProjects.map((project) => ({
        projectId: project.id,
        projectSlug: project.slug,
        projectTitle: project.title,
        category: project.category,
        level: 'strong' as const,
        reason:
          locale === 'fr'
            ? `Projet documenté utilisant Flask : ${project.title}.`
            : `Documented Flask project: ${project.title}.`,
        verifiedProofs: project[locale].verifiedProofs.slice(0, 3),
        limitations: project[locale].limitations.slice(0, 2),
        href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
      })),
    };
  }

  // 11. GROWING FIELDS (General & specific in-progress competencies)
  if (
    textContainsAny(normQuery, [
      'en cours d acquisition', 'en cours d apprentissage', 'axes d apprentissage',
      'competences en cours', 'learning in progress', 'skills in progress',
      'still developing', 'currently developing', 'still learning',
      'currently learning', 'skills am i developing', 'which skills am i developing'
    ])
  ) {
    return {
      status: 'learning_match',
      mode: 'keyword',
      query,
      locale,
      intent: 'skills',
      matches: [],
      growingFieldMatches: Object.values(GROWING_FIELDS_INFO).map((g) => g[locale]),
      message:
        locale === 'fr'
          ? 'Ces compétences font partie des axes d’apprentissage prioritaires de Godwin (ENSA Khouribga et DataCamp), mais ne font pas encore l’objet d’un projet de production documenté sur ce portfolio.'
          : 'These skills are Godwin’s active learning areas (ENSA Khouribga and DataCamp), but are not yet featured in a documented production project on this portfolio.',
    };
  }

  const growingMatches: GrowingFieldMatch[] = [];
  for (const [key, keywords] of Object.entries(GROWING_KEYWORD_MAP)) {
    if (keywords.some((kw) => textContainsKeyword(normQuery, kw))) {
      const info = GROWING_FIELDS_INFO[key]?.[locale];
      if (info) {
        growingMatches.push(info);
      }
    }
  }

  // 12. TECHNICAL DOMAIN RULES (Project scoring)
  const scores: Record<string, { weight: number; reasons: string[] }> = {};
  for (const rule of DOMAIN_RULES) {
    const matched = rule.keywords.some((kw) => textContainsKeyword(normQuery, kw));
    if (matched) {
      for (const [projId, weight] of Object.entries(rule.projectWeights)) {
        if (!scores[projId]) {
          scores[projId] = { weight: 0, reasons: [] };
        }
        scores[projId].weight += weight;
        scores[projId].reasons.push(rule.reasons[locale]);
      }
    }
  }

  if (
    textContainsAny(normQuery, ['projet', 'projets', 'project', 'projects']) &&
    textContainsAny(normQuery, [
      'machine learning', 'deep learning', 'apprentissage automatique',
      'modele predictif', 'predictive model'
    ])
  ) {
    const projectId = 'pneumonia-detection';
    const reason =
      locale === 'fr'
        ? 'Projet académique de classification d’images avec un CNN et DenseNet121, sans déploiement médical.'
        : 'Academic image-classification project using a CNN and DenseNet121, not a deployed medical system.';
    scores[projectId] ??= { weight: 0, reasons: [] };
    scores[projectId].weight += 10;
    scores[projectId].reasons.push(reason);
  }

  const asksWhichProjects = textContainsAny(normQuery, [
    'projet',
    'projets',
    'project',
    'projects',
  ]);
  const asksAboutSqlProjects =
    asksWhichProjects &&
    textContainsAny(normQuery, [
      'sql',
      'mysql',
      'requete sql',
      'requetes sql',
      'sql queries',
    ]);

  const sortedProjects = Object.entries(scores)
    .sort((a, b) => b[1].weight - a[1].weight)
    .filter(
      ([projectId, data]) =>
        data.weight >= 6 &&
        !(projectId === 'novastore' && textContainsAny(normQuery, [
          'sql', 'mysql', 'sqlalchemy', 'database', 'relational', 'relationnel',
          'mcd', 'mld',
        ]))
    );

  if (sortedProjects.length > 0) {
    const maxScore = sortedProjects[0][1].weight;
    const matches: ProjectEvidenceMatch[] = [];

    for (const [projectId, data] of sortedProjects.slice(0, asksAboutSqlProjects ? 5 : 3)) {
      const project = PROJECT_CORPUS[projectId];
      if (!project) continue;

      const loc = project[locale];
      let level: MatchLevel = 'indirect';
      if (data.weight >= maxScore * 0.8 && data.weight >= 8) {
        level = 'strong';
      } else if (data.weight >= 6) {
        level = 'moderate';
      }

      matches.push({
        projectId: project.id,
        projectSlug: project.slug,
        projectTitle: project.title,
        category: project.category,
        level,
        reason: data.reasons[0] || (locale === 'fr' ? 'Compétence technique validée.' : 'Validated technical match.'),
        verifiedProofs: loc.verifiedProofs.slice(0, 3),
        limitations: loc.limitations.slice(0, 3),
        href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
      });
    }

    return {
      status: 'success',
      mode: 'keyword',
      query,
      locale,
      intent: 'projects',
      matches,
      growingFieldMatches: growingMatches.length > 0 ? growingMatches : undefined,
    };
  }

  // 13. If only growing fields matched (e.g., pure Data Engineering / ML / Deep Learning query)
  if (growingMatches.length > 0) {
    return {
      status: 'learning_match',
      mode: 'keyword',
      query,
      locale,
      intent: 'skills',
      matches: [],
      growingFieldMatches: growingMatches,
      message:
        locale === 'fr'
          ? 'Cette compétence fait partie des axes d’apprentissage prioritaires de Godwin (ENSA Khouribga et DataCamp), mais ne fait pas encore l’objet d’un projet de production documenté sur ce portfolio.'
          : 'This skill is one of Godwin’s active learning areas (ENSA Khouribga and DataCamp), but is not yet featured in a documented production project on this portfolio.',
    };
  }

  // 14. NO MATCH
  return {
    status: 'no_match',
    mode: 'keyword',
    query,
    locale,
    intent: 'general',
    matches: [],
    message:
      locale === 'fr'
        ? 'Aucun projet documenté ne démontre actuellement cette compétence spécifique.'
        : 'No documented project currently demonstrates this specific skill.',
  };
}
