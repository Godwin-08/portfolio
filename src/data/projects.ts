import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'olist',
    slug: 'olist',
    title: 'Audit de Données Commerciales — Olist',
    tagline: 'Analyse exploratoire et audit de qualité sur 96 252 commandes e-commerce',
    category: 'Data Analysis',
    isFeatured: true,
    isFlagship: false,
    order: 1,
    context: 'Académique (Binôme)',
    period: '2024',
    summary:
      'Audit analytique complet du dataset e-commerce brésilien Olist : traitement de la qualité des données, détection d\'anomalies logistiques, analyse des délais de livraison et modélisation des déterminants de satisfaction client.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'Data Analysis'],
    accentColor: '#0284c7', // Sky Blue
    keyMetrics: [
      { value: '96 252', label: 'Commandes analysées', detail: 'Nettoyage exhaustif multi-tables' },
      { value: '99.4%', label: 'Intégrité des données', detail: 'Après traitement des valeurs aberrantes' },
      { value: '14 jours', label: 'Délai moyen modélisé', detail: 'Identification des goulots logistiques' },
    ],
    caseStudy: {
      heroTagline: 'Transformer des données brutes hétérogènes en leviers de décision logistique et commerciale.',
      problem:
        'Le dataset Olist regroupe des informations fragmentées réparties sur 9 tables relationnelles (clients, commandes, paiements, avis, vendeurs, géolocalisation). La problématique consistait à auditer l\'intégrité des données, identifier les causes des notes de satisfaction négatives (1-2 étoiles) et quantifier l\'impact des retards de livraison sur la fidélisation client.',
      problemPoints: [
        'Multiplicité des sources et désynchronisations d\'horodatage entre validation de commande et expédition.',
        'Présence de valeurs aberrantes sur les délais de livraison estimés vs réels.',
        'Données textuelles d\'avis clients non structurées nécessitant une catégorisation analytique.',
      ],
      approach:
        'Une démarche méthodique en 4 étapes a été mise en œuvre : consolidation du schéma relationnel, audit d\'intégrité, analyses statistiques univariées/bivariées et restitution visuelle des recommandations stratégiques.',
      approachSteps: [
        {
          step: '1. Structuration & Fusion',
          description: 'Jointures relationnelles sécurisées évitant la duplication de lignes et le gonflement artificiel du chiffre d\'affaires.',
        },
        {
          step: '2. Audit de Cohérence',
          description: 'Détection des livraisons antérieures aux paiements, horodatages incohérents et imputations justifiées.',
        },
        {
          step: '3. Analyse d\'Impact',
          description: 'Calcul de corrélations de Spearman et segmentation des délais de transport par région brésilienne.',
        },
        {
          step: '4. Synthèse & Recommandations',
          description: 'Mise en évidence du seuil critique de retard (> 3 jours) entraînant une chute drastique du score de satisfaction.',
        },
      ],
      roleDescription:
        'Projet réalisé en binôme. Responsable de la conception du pipeline de nettoyage sous Pandas, de l\'analyse des délais de livraison et de la formalisation des graphiques statistiques sous Seaborn.',
      implementation:
        'Développement de scripts d\'analyse reproductibles sous Jupyter Notebooks et modules Python. Utilisation intensive de fonctions vectorisées Pandas pour le traitement de volumétries sans latence.',
      architectureHighlights: [
        'Pipeline de transformation modulaire avec gestion explicite des types (datetime64, categorical).',
        'Fonctions d\'agrégation personnalisées pour le calcul des scores de ponctualité par État.',
        'Matrices de corrélation et visualisations de distributions (Boxplots, KDE, Heatmaps).',
      ],
      keyDecisions: [
        {
          title: 'Filtrage strict des commandes annulées',
          decision: 'Exclusion des commandes annulées pour l\'analyse logistique pure et traitement dans un sous-flux dédié.',
          rationale: 'Éviter de biaiser la moyenne des délais de transport par des commandes n\'ayant jamais atteint le destinataire.',
          impact: 'Précision accrue des métriques d\'efficacité logistique.',
        },
        {
          title: 'Calcul du delta d\'estimation',
          decision: 'Création d\'un indicateur de dérive = Date Livraison Réelle - Date Livraison Estimée.',
          rationale: 'Mesurer la promesse client plutôt que le seul temps de trajet brut.',
          impact: 'Démonstration que la déception client provient du non-respect de l\'estimation plus que du délai absolu.',
        },
      ],
      results: [
        { value: '96 252', label: 'Commandes consolidées', detail: 'Couverture 2016 - 2018' },
        { value: '-68%', label: 'Score d\'avis en cas de retard', detail: 'La note moyenne passe de 4.2 à 1.4 sur 5' },
        { value: '3 régions', label: 'Goulots identifiés', detail: 'Nord et Nordeste présentant 2x plus de retards' },
      ],
      validation:
        'Vérification croisée des totaux transactionnels avec les agrégations officielles Olist et validation de la non-altération des distributions après imputation.',
      validationPoints: [
        'Tests d\'assertion sur la conservation de la somme totale des paiements.',
        'Comparaison systématique avant/après nettoyage des distributions statistiques.',
      ],
      reflection:
        'Ce projet a renforcé ma conviction que la rigueur dans la phase exploratoire conditionne 90% de la fiabilité des conclusions d\'une analyse de données. Si c\'était à refaire, j\'intégrerais une modélisation prédictive de classification (Random Forest) pour anticiper le risque de retard dès l\'achat.',
      technologiesDetailed: [
        { category: 'Data Wrangling', items: ['Python 3.10', 'Pandas', 'NumPy'] },
        { category: 'Visualisation', items: ['Matplotlib', 'Seaborn'] },
        { category: 'Environnement', items: ['Jupyter Notebook', 'Git', 'Virtualenv'] },
      ],
      githubUrl: 'https://github.com/GodwinElie',
    },
  },
  {
    id: 'gtm',
    slug: 'gtm',
    title: 'GTM — Galaxy Training Manager',
    tagline: 'Application web professionnelle de gestion, d\'évaluation et d\'analyse décisionnelle des formations',
    category: 'Web / SI',
    isFeatured: true,
    isFlagship: true,
    order: 2,
    context: 'Professionnel (Individuel)',
    period: '2024 (PFA Individuel)',
    summary:
      'Projet professionnel de référence conçu et développé en autonomie : plateforme web complète pour orchestrer les sessions de formation, automatiser les évaluations à chaud/froid, calculer les KPIs d\'assiduité et générer des rapports dynamiques (Excel openpyxl / PDF ReportLab).',
    skills: [
      'Flask',
      'SQLAlchemy',
      'MySQL',
      'Python',
      'Pandas',
      'NumPy',
      'Tailwind CSS',
      'Alpine.js',
      'Chart.js',
      'openpyxl',
      'ReportLab',
      'pytest',
    ],
    accentColor: '#059669', // Emerald Green
    keyMetrics: [
      { value: '100%', label: 'Couverture du workflow', detail: 'De la création à l\'export analytique' },
      { value: '15+', label: 'Indicateurs automatisés', detail: 'Satisfaction, présence, taux d\'abandon' },
      { value: '2 formats', label: 'Génération documentaire', detail: 'PDF vectoriels et tableurs Excel' },
    ],
    caseStudy: {
      heroTagline: 'De la gestion administrative à l\'intelligence opérationnelle : un SI unifié pour les formations professionnelles.',
      problem:
        'Les organismes de formation et services RH souffrent souvent d\'un morcellement de leurs outils : feuilles Excel éparses, formulaires d\'évaluation papier ou isolés, suivi manuel de l\'assiduité, et impossibilité de dégager des métriques consolidées sur l\'impact des formations dispensées.',
      problemPoints: [
        'Absence de centralisation des référentiels (formateurs, apprenants, modules, sessions).',
        'Lourdeur du reporting de fin de session nécessitant des heures de mise en page manuelle.',
        'Manque de visibilité analytique sur les taux de satisfaction par module ou formateur.',
      ],
      approach:
        'Conception d\'un système d\'information web robuste, modulaire et orienté utilisateur selon une architecture MVC claire, complétée par un moteur de calcul analytique et d\'export automatisé.',
      approachSteps: [
        {
          step: '1. Modélisation Relationnelle',
          description: 'Élaboration du MCD/MLD normalisé (3NF) gérant l\'historique des sessions, inscriptions, présences et évaluations.',
        },
        {
          step: '2. Architecture Backend & ORM',
          description: 'Mise en place de Blueprints Flask et de modèles SQLAlchemy assurant l\'intégrité transactionnelle.',
        },
        {
          step: '3. Moteur Analytique & Dashboards',
          description: 'Calcul d\'indicateurs sous NumPy/Pandas et rendu visuel interactif avec Chart.js.',
        },
        {
          step: '4. Pipeline de Génération Documentaire',
          description: 'Génération automatique de feuilles d\'émargement, bilans PDF (ReportLab) et rapports Excel multi-onglets (openpyxl).',
        },
      ],
      roleDescription:
        'Concepteur et développeur unique de la solution (PFA individuel en contexte professionnel). Prise en charge complète du cycle : cadrage du besoin, modélisation de la base, développement backend/frontend, automatisation documentaire et rédaction de la suite de tests.',
      implementation:
        'Application construite avec Flask, SQLAlchemy et Jinja2, stylisée via Tailwind CSS pour un rendu professionnel épuré, avec une interactivité légère via Alpine.js et des graphiques Chart.js.',
      architectureHighlights: [
        'Architecture MVC par Blueprints (Auth, Formations, Sessions, Évaluations, Analytics, Exports).',
        'Couche de services isolée pour les calculs analytiques et la compilation documentaire.',
        'Formulaires dynamiques avec validation serveur rigoureuse et sécurisation CSRF.',
      ],
      keyDecisions: [
        {
          title: 'Génération PDF vectorielle native (ReportLab)',
          decision: 'Utilisation de ReportLab plutôt qu\'une conversion HTML-to-PDF headless.',
          rationale: 'Garantir un contrôle au millimètre du positionnement des tableaux, un poids de fichier réduit (< 150 Ko) et une génération instantanée sans dépendance externe lourde.',
          impact: 'Rapports PDF nets, imprimables sans artefact et générés en moins de 100ms.',
        },
        {
          title: 'Isolation de la couche analytique',
          decision: 'Découplage strict entre les requêtes de base de données et les calculs de KPIs via Pandas/NumPy.',
          rationale: 'Permettre l\'évolution des formules de scoring sans altérer le schéma de la base relationnelle.',
          impact: 'Code maintenable, testable unitairement et réutilisable dans des contextes batch.',
        },
      ],
      results: [
        { value: '100%', label: 'Automatisation du bilan', detail: 'Génération en 1 clic des livrables administratifs' },
        { value: '< 150ms', label: 'Temps de réponse moyen', detail: 'Sur les requêtes de reporting consolidé' },
        { value: '0 perte', label: 'Intégrité référentielle', detail: 'Transactions ACID et contraintes de clés étrangères' },
      ],
      validation:
        'Validation rigoureuse avec une suite de tests unitaires et d\'intégration sous pytest, couvrant les calculs de moyennes pondérées, l\'accès aux routes sécurisées et la cohérence des exports générés.',
      validationPoints: [
        'Tests unitaires sur les fonctions de scoring et d\'agrégation statistique.',
        'Tests d\'intégration simulant le cycle de vie complet d\'une session de formation.',
        'Vérification des structures des fichiers .xlsx et .pdf produits.',
      ],
      reflection:
        'GTM constitue mon projet de référence combinant ingénierie logicielle et traitement de données. Il m\'a appris à anticiper les contraintes métier réelles, à soigner l\'expérience utilisateur et à concevoir un code modulaire prêt pour la mise à l\'échelle.',
      technologiesDetailed: [
        { category: 'Backend & Données', items: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Pandas', 'NumPy'] },
        { category: 'Frontend', items: ['Jinja2', 'Tailwind CSS', 'Alpine.js', 'Chart.js'] },
        { category: 'Rapports & Documents', items: ['openpyxl', 'ReportLab'] },
        { category: 'Qualité & Tests', items: ['pytest', 'Flake8', 'Git'] },
      ],
      githubUrl: 'https://github.com/GodwinElie',
    },
  },
  {
    id: 'afc',
    slug: 'afc',
    title: 'Analyse Factorielle des Correspondances (AFC)',
    tagline: 'Implémentation mathématique et statistique from scratch en Python',
    category: 'Statistiques',
    isFeatured: true,
    isFlagship: false,
    order: 3,
    context: 'Académique (Binôme)',
    period: '2024',
    summary:
      'Conception et implémentation from scratch de la méthode d\'Analyse Factorielle des Correspondances simples : calcul matriciel d\'inertie, diagonalisation des matrices de profils, projection sur les axes factoriels et visualisation bidimensionnelle.',
    skills: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Matplotlib', 'Jupyter', 'pytest'],
    accentColor: '#6366f1', // Indigo
    keyMetrics: [
      { value: 'From scratch', label: 'Implémentation pure', detail: 'Sans boîte noire type Scikit-Learn' },
      { value: '100%', label: 'Concordance statistique', detail: 'Validé contre les packages de référence' },
      { value: '2D / 3D', label: 'Plans factoriels', detail: 'Visualisation simultanée lignes & colonnes' },
    ],
    caseStudy: {
      heroTagline: 'Maîtriser les fondements mathématiques de l\'analyse multivariée par la réimplémentation rigoureuse.',
      problem:
        'Comprendre en profondeur la mécanique sous-jacente des méthodes factorielles de réduction de dimension, souvent appliquées comme de simples « boîtes noires ». Le défi était de construire un moteur complet d\'AFC respectant rigoureusement la métrique du Chi-2 et l\'algèbre linéaire associée.',
      problemPoints: [
        'Calcul exact des profils lignes et colonnes à partir d\'un tableau de contingence brut.',
        'Gestion des pondérations métriques dans l\'espace euclidien généralisé.',
        'Décomposition en valeurs singulières (SVD) et calcul des contributions absolues et relatives (cos²).',
      ],
      approach:
        'Traduction pas à pas des théorèmes mathématiques en code Python vectorisé sous NumPy et SciPy, avec tests de validation comparative.',
      approachSteps: [
        {
          step: '1. Calcul du Tableau des Fréquences',
          description: 'Transformation du tableau de contingence en matrice de probabilités $P$ et vecteurs des marges $r$ et $c$.',
        },
        {
          step: '2. Matrice d\'Inertie & Diagonalisation',
          description: 'Construction de la matrice centrée et normalisée $S = D_r^{-1/2} (P - r c^T) D_c^{-1/2}$ et calcul des valeurs propres.',
        },
        {
          step: '3. Coordonnées Factorielles',
          description: 'Calcul des facteurs principaux pour les modalités lignes et colonnes.',
        },
        {
          step: '4. Aides à l\'Interprétation',
          description: 'Calcul automatique des taux d\'inertie expliquée, des contributions (CTR) et de la qualité de représentation (cos²).',
        },
      ],
      roleDescription:
        'Projet réalisé en binôme. Responsable de la vectorisation des calculs matriciels sous NumPy et de l\'écriture des tests unitaires validant l\'exactitude des valeurs propres obtenues.',
      implementation:
        'Module Python structuré en classe d\'analyse orientée objet réutilisable, accompagné d\'un notebook d\'application sur des jeux de données réels.',
      architectureHighlights: [
        'Classe `CorrespondenceAnalysis` autonome avec interface intuitive inspirée des standards scientifiques.',
        'Tracé automatique des graphes biplots lignes-colonnes avec gestion des chevauchements.',
      ],
      keyDecisions: [
        {
          title: 'Choix de la Décomposition SVD directe',
          decision: 'Utilisation de `scipy.linalg.svd` sur la matrice normalisée plutôt que le calcul direct des vecteurs propres de $S S^T$.',
          rationale: 'Améliorer la stabilité numérique face à des matrices mal conditionnées.',
          impact: 'Calculs plus rapides et insensibles aux erreurs d\'arrondi sur les faibles valeurs propres.',
        },
      ],
      results: [
        { value: '100%', label: 'Exactitude mathématique', detail: 'Résultats identiques à FactoMineR (R)' },
        { value: '< 10ms', label: 'Temps d\'exécution', detail: 'Sur un tableau 50x50' },
        { value: '100%', label: 'Tests passants', detail: 'Suite de validation pytest' },
      ],
      validation:
        'Validation par comparaison exhaustive des valeurs propres, inerties et coordonnées factorielles avec le package de référence FactoMineR et des solutions analytiques connues.',
      validationPoints: [
        'Vérification de l\'égalité de la somme des valeurs propres avec l\'inertie totale $\\phi^2 = \\chi^2 / n$.',
        'Tests automatisés comparant les coordonnées factorielles avec une tolérance numérique de $10^{-7}$.',
      ],
      reflection:
        'Ce projet démontre ma capacité à passer de la théorie mathématique complexe à un code opérationnel, performant et rigoureusement testé.',
      technologiesDetailed: [
        { category: 'Calcul & Algèbre', items: ['Python 3.10', 'NumPy', 'SciPy'] },
        { category: 'Analyse & Visualisation', items: ['Pandas', 'Matplotlib', 'Jupyter'] },
        { category: 'Qualité', items: ['pytest'] },
      ],
      githubUrl: 'https://github.com/GodwinElie',
    },
  },
  {
    id: 'revision-flow',
    slug: 'revision-flow',
    title: 'RevisionFlow',
    tagline: 'Outil intelligent de planification et de suivi des cycles de révision d\'ingénierie',
    category: 'Web / SI',
    isFeatured: false,
    isFlagship: false,
    order: 4,
    context: 'Projet Personnel',
    period: '2024',
    summary:
      'Application web appliquant l\'algorithme de répétition espacée (spaced repetition) pour optimiser les révisions de cours scientifiques, avec calcul automatique des courbes d\'oubli et tableaux de bord de progression.',
    skills: ['Python', 'Flask', 'Chart.js', 'Tailwind CSS', 'TypeScript / React'],
    accentColor: '#3b82f6',
    keyMetrics: [
      { value: 'SM-2', label: 'Algorithme adapté', detail: 'Répétition espacée personnalisée' },
      { value: '100%', label: 'Suivi de rétention', detail: 'Tableaux de bord d\'effort' },
    ],
  },
  {
    id: 'sante-scolaire',
    slug: 'sante-scolaire',
    title: 'SantéScolaire SI',
    tagline: 'Système d\'information médical pour le suivi sanitaire en milieu éducatif',
    category: 'Web / SI',
    isFeatured: false,
    isFlagship: false,
    order: 5,
    context: 'Académique (Binôme)',
    period: '2023',
    summary:
      'Modélisation et développement d\'un système de gestion des dossiers médicaux scolaires, consultations, alertes vaccinales et statistiques de santé publique scolaire.',
    skills: ['SQL & Modélisation', 'MySQL', 'SQLAlchemy', 'Python'],
    accentColor: '#14b8a6',
    keyMetrics: [
      { value: '3NF', label: 'Normalisation MLD', detail: 'Sécurité et confidentialité des données' },
      { value: '100%', label: 'Intégrité des dossiers', detail: 'Contraintes relationnelles strictes' },
    ],
  },
  {
    id: 'novastore',
    slug: 'novastore',
    title: 'NovaStore',
    tagline: 'Architecture de base de données et backend de gestion e-commerce distribué',
    category: 'Web / SI',
    isFeatured: false,
    isFlagship: false,
    order: 6,
    context: 'Académique (Individuel)',
    period: '2023',
    summary:
      'Conception d\'un schéma relationnel e-commerce complet avec gestion des inventaires, paniers multi-devises, transactions sécurisées et requêtes analytiques d\'aide à la décision.',
    skills: ['SQL & Modélisation', 'MySQL', 'Python'],
    accentColor: '#8b5cf6',
    keyMetrics: [
      { value: '15 tables', label: 'Schéma relationnel', detail: 'Optimisé pour les requêtes analytiques' },
      { value: 'ACID', label: 'Transactions', detail: 'Résilience des stocks' },
    ],
  },
  {
    id: 'cestom',
    slug: 'cestom',
    title: 'CESTOM Frontend',
    tagline: 'Interface web moderne et accessible pour l\'écosystème associatif',
    category: 'Web / SI',
    isFeatured: false,
    isFlagship: false,
    order: 7,
    context: 'Projet Personnel',
    period: '2024',
    summary:
      'Développement de modules d\'interface utilisateur réactifs, ergonomiques et accessibles au sein du projet associatif CESTOM, favorisant l\'engagement des membres.',
    skills: ['TypeScript / React', 'Tailwind CSS', 'Git & GitHub'],
    accentColor: '#f59e0b',
    keyMetrics: [
      { value: 'Mobile-first', label: 'Expérience responsive', detail: 'Accessibilité soignée' },
      { value: '100%', label: 'Composants modulaires', detail: 'Design system unifié' },
    ],
  },
  {
    id: 'pneumonie',
    slug: 'pneumonie',
    title: 'Pneumonie Detection (À venir)',
    tagline: 'Classification d\'images radiographiques thoraciques par Deep Learning',
    category: 'Machine Learning',
    isFeatured: false,
    isFlagship: false,
    order: 8,
    context: 'Académique (Binôme)',
    period: 'En cours',
    summary:
      'Projet en cours de développement : pipeline de vision par ordinateur pour la détection automatisée des pneumonies à partir de radiographies thoraciques (CNN, Transfer Learning).',
    skills: ['Python', 'Machine Learning (En essor)', 'NumPy'],
    accentColor: '#ec4899',
    keyMetrics: [
      { value: 'Vision', label: 'Deep Learning', detail: 'Pipeline en cours de finalisation' },
      { value: 'Bientôt', label: 'Étude de cas', detail: 'Intégration prochaine' },
    ],
  },
];

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

