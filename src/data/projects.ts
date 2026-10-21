import { Project } from '@/types';
import { SKILLS } from '@/data/skills';

export interface ProjectCategoryDefinition {
  name: Project['category'];
  slug: string;
}

// URL identifiers are deliberately independent from the labels displayed to visitors.
export const PROJECT_CATEGORIES = [
  { name: 'Data Analysis', slug: 'data-analysis' },
  { name: 'Web / SI', slug: 'web-si' },
  { name: 'Statistiques', slug: 'statistiques' },
] as const satisfies readonly ProjectCategoryDefinition[];

export const ALL_PROJECT_CATEGORIES = [
  ...PROJECT_CATEGORIES,
  { name: 'Machine Learning', slug: 'machine-learning' },
  { name: 'Data Engineering', slug: 'data-engineering' },
] as const satisfies readonly ProjectCategoryDefinition[];

export function getCategorySlug(categoryName: Project['category']): string {
  return ALL_PROJECT_CATEGORIES.find((category) => category.name === categoryName)?.slug ?? categoryName;
}

export function filterProjects(
  projects: readonly Project[],
  categorySlug: string | null,
  skillId: string | null
): Project[] {
  const category = getCategoryBySlug(categorySlug);
  const skill = skillId ? SKILLS.find((entry) => entry.id === skillId) : undefined;

  return [...projects]
    .filter((project) => !category || project.category === category.name)
    .filter((project) => !skill || project.skills.some(
      (projectSkill) => projectSkill.toLowerCase() === skill.name.toLowerCase()
    ))
    .sort((a, b) => a.order - b.order);
}

export const PROJECTS: Project[] = [
  {
    id: 'gtm',
    slug: 'gtm',
    title: 'GTM — Galaxy Training Manager',
    tagline: 'Application web professionnelle de gestion, d\'évaluation et d\'analyse décisionnelle des formations',
    category: 'Web / SI',
    isFeatured: true,
    isFlagship: true,
    order: 1,
    context: 'Professionnel (Individuel)',
    period: '2024 (PFA Individuel)',
    summary:
      'Application de gestion et d’analyse des formations développée dans un contexte professionnel.',
    skills: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Pandas', 'NumPy', 'JavaScript', 'HTML/CSS', 'Chart.js', 'Git', 'pytest', 'openpyxl', 'ReportLab'],
    accentColor: '#059669', // Emerald Green
    image: '/images/projects/gtm-dashboard.png',
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
      githubUrl: 'https://github.com/Godwin-08/GTM',
    },
  },
  {
    id: 'olist',
    slug: 'olist',
    title: 'Audit de Données Commerciales — Olist',
    tagline: 'Analyse exploratoire et audit de qualité sur 96 252 commandes e-commerce',
    category: 'Data Analysis',
    isFeatured: true,
    isFlagship: false,
    order: 2,
    context: 'Académique (Binôme)',
    period: '2025–2026',
    summary:
      'Audit complet d\'une marketplace : qualité des données, délais logistiques, performance des vendeurs et rentabilité des catégories sur 96 252 commandes.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    accentColor: '#0284c7', // Sky Blue
    image: '/images/projects/olist-delais-livraison.png',
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
        'Absence de vision consolidée sur la performance des vendeurs (délais, volumes, dispersion géographique).',
        'Rentabilité des catégories de produits non mesurée, empêchant d\'arbitrer le catalogue.',
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
      githubUrl: 'https://github.com/Godwin-08/Projet-Traitement-des-donn-es-',
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
    period: '2025–2026',
    summary:
      'Analyse factorielle des correspondances implémentée from scratch pour cartographier les relations statistiques entre domaines et compétences sur LinkedIn.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SciPy', 'Jupyter', 'Git', 'SVD'],
    accentColor: '#6366f1', // Indigo
    image: '/images/projects/afc-biplot.png',
    keyMetrics: [
      { value: 'From scratch', label: 'Implémentation pure', detail: 'Sans boîte noire type Scikit-Learn' },
      { value: '56,2 %', label: 'Inertie des axes 1 et 2', detail: 'Résultat du biplot final' },
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
        'Projet réalisé en binôme (SADIK Mohammed & NOUGBOLO Godwin Elie). Responsable de la vectorisation des calculs matriciels sous NumPy et de l\'écriture des tests unitaires validant l\'exactitude des valeurs propres obtenues.',
      implementation:
        'Module Python structuré en classe d\'analyse orientée objet réutilisable, accompagné d\'un notebook d\'application sur des jeux de données réels.',
      architectureHighlights: [
        'Classe `CorrespondenceAnalysis` autonome avec interface intuitive inspirée des standards scientifiques.',
        'Tracé automatique des graphes biplots lignes-colonnes avec gestion des chevauchements.',
        'Calcul de l\'inertie totale et de la significativité statistique via le test du Chi-2.',
      ],
      keyDecisions: [
        {
          title: 'Algorithme SVD vectorisé NumPy pur',
          decision: 'Utilisation de `numpy.linalg.svd` sur la matrice des résidus standardisés sans recours à Scikit-Learn ou packages tiers.',
          rationale: 'Garantir une compréhension totale du flux algorithmique et optimiser les temps de calcul sur matrices denses.',
          impact: 'Exécution instantanée du pipeline (< 50ms sur des matrices 50x50) et totale transparence du code.',
        },
      ],
      results: [
        { value: '8 étapes', label: 'Pipeline mathématique', detail: 'De la contingence au biplot final' },
        { value: 'p < 0.001', label: 'Test du Chi-2', detail: 'Rejet de l\'hypothèse d\'indépendance validé' },
        { value: '56,2 %', label: 'Inertie cumulée (F1+F2)', detail: 'F1 (29,2 %) + F2 (27,0 %) · biplot final' },
      ],
      validation:
        'Validation par tests croisés comparant les coordonnées factorielles calculées à celles obtenues via les modules R `FactoMineR` et Python `prince`.',
      validationPoints: [
        'Égalité stricte des valeurs propres à $10^{-6}$ près.',
        'Concordance des orientations des axes et des contributions d\'inertie.',
      ],
      reflection:
        'Ce projet m\'a apporté une maîtrise solide de l\'algèbre linéaire appliquée à la Data Science. Il démontre ma capacité à comprendre la théorie statistique et à la traduire en algorithmes propres et optimisés.',
      technologiesDetailed: [
        { category: 'Calcul Scientifique', items: ['Python', 'NumPy', 'SciPy'] },
        { category: 'Données & Visualisation', items: ['Pandas', 'Matplotlib', 'Seaborn'] },
        { category: 'Outils', items: ['Jupyter Notebook', 'Git', 'pytest'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances',
    },
  },
  {
    id: 'revision-flow',
    slug: 'revision-flow',
    title: 'RevisionFlow',
    tagline: 'Planificateur de révisions intelligent, 100 % navigateur, avec recalcul en temps réel',
    category: 'Web / SI',
    isFeatured: false,
    order: 4,
    context: 'Académique (Individuel)',
    period: '2025–2026',
    summary:
      'Planificateur de révisions 100 % navigateur qui recalcule le planning en temps réel selon l’avancement, avec timer Pomodoro et détection honnête de la surcharge.',
    skills: ['JavaScript', 'HTML/CSS', 'Web Audio API', 'localStorage', 'API REST'],
    accentColor: '#0ea5e9',
    keyMetrics: [
      { value: '100%', label: 'Navigateur pur', detail: 'Aucune inscription, aucun backend' },
      { value: 'Temps réel', label: 'Recalcul du planning', detail: 'À chaque action validée ou reportée' },
      { value: 'P/2^k', label: 'Entrelacement des matières', detail: 'Pénalité anti-répétition par jour' },
    ],
    caseStudy: {
      heroTagline: 'Un planificateur transparent qui recalcule le planning à chaque action et signale honnêtement la surcharge.',
      problem:
        'En période d’examens, la charge de révision est difficile à répartir entre des matières de difficulté et d’urgence variables. Les outils classiques produisent un planning figé qui devient obsolète dès le premier imprévu, sans jamais signaler qu’il est irréaliste.',
      problemPoints: [
        'Charge de révision dispersée entre matières, dates d’examen et disponibilités changeantes.',
        'Absence d’un outil immédiat, sans compte à créer ni installation.',
        'Situations de surcharge jamais détectées ni signalées explicitement à l’étudiant.',
      ],
      approach:
        'Un algorithme glouton de distribution calcule un score de priorité par module, entrelace les matières dans une même journée, puis régénère uniquement les jours futurs à chaque modification.',
      approachSteps: [
        { step: '1. Score de priorité', description: 'P_i = (difficulté × chapitres) × (1 + 1 / ln(Δt + 2)) : la charge brute est pondérée par l’urgence, amortie par un logarithme.' },
        { step: '2. Entrelacement', description: 'P_i_jour = P_i / 2^k pénalise toute matière déjà placée le même jour, forçant une alternance naturelle.' },
        { step: '3. Distribution gloutonne', description: 'Jour après jour, tant que la capacité n’est pas atteinte, la session la plus prioritaire est placée selon un tri déterministe.' },
        { step: '4. Préservation du passé', description: 'Seuls les jours futurs sont régénérés : les statistiques (streak, complétion, vélocité) restent cohérentes.' },
      ],
      roleDescription:
        'Conception et développement individuels à 100 % : algorithme de planification, pattern Store, interface, persistance locale et minuteur Pomodoro.',
      implementation:
        'Application en JavaScript ES6+ pur, sans framework. L’état est centralisé par un pattern Store inspiré de Redux, persisté dans le localStorage et exposé via des composants modulaires.',
      architectureHighlights: [
        'Pattern Store : State.get / update / subscribe, avec sauvegarde automatique à chaque action.',
        'Persistance localStorage avec migration deepMerge pour absorber les nouvelles propriétés.',
        'Modules ES6 séparés (planning, storage, ui, wizard, dashboard, pomodoro, history).',
      ],
      keyDecisions: [
        {
          title: 'Score de priorité logarithmique',
          decision: 'Utiliser (1 + 1 / ln(Δt + 2)) plutôt qu’un simple ratio d’urgence.',
          rationale: 'Éviter qu’un examen très proche ne fasse exploser le score et ne sature la journée au détriment des autres matières.',
          impact: 'Répartition équilibrée même en fin de période, avec plusieurs examens rapprochés.',
        },
        {
          title: 'Source de vérité unique (pattern Store)',
          decision: 'Centraliser l’état dans un objet State unique plutôt que de disperser les données.',
          rationale: 'Garantir un recalcul cohérent et une persistance automatique sans logique dupliquée.',
          impact: 'Toute action déclenche recalcul, sauvegarde et notification des composants abonnés.',
        },
        {
          title: 'Signaler la surcharge au lieu de la masquer',
          decision: 'Placer les sessions impossibles dans un backlog explicite et afficher une alerte.',
          rationale: 'Un planning irréaliste doit être dit clairement à l’étudiant plutôt que présenté comme faisable.',
          impact: 'L’étudiant peut ajuster sa capacité, réduire le volume ou déclarer un jour libre.',
        },
      ],
      results: [
        { value: '0 backend', label: 'Fonctionnement hors ligne', detail: 'Uniquement des APIs natives du navigateur' },
        { value: 'P/2^k', label: 'Entrelacement garanti', detail: 'Alternance des matières sur une même journée' },
        { value: '5 plannings', label: 'Historique conservé', detail: 'Complétion, streak et vélocité par planning' },
      ],
      validation:
        'Tests fonctionnels sur des scénarios de retard, d’anticipation et de surcharge, vérifiant que le backlog est correctement signalé à l’étudiant.',
      validationPoints: [
        'Vérification du recalcul immédiat après validation, report ou anticipation d’une session.',
        'Contrôle de la préservation des statistiques passées après régénération du futur.',
        'Test de l’import/export JSON et de la migration des sauvegardes.',
      ],
      reflection:
        'RevisionFlow m’a permis de concevoir un algorithme de décision et un état réactif sans aucune dépendance externe. C’est aussi un exercice de transparence produit : dire clairement à l’utilisateur quand son planning est irréaliste.',
      technologiesDetailed: [
        { category: 'Frontend', items: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Modules ES6'] },
        { category: 'État & Persistance', items: ['Pattern Store', 'localStorage', 'Import/Export JSON'] },
        { category: 'APIs navigateur', items: ['Web Audio API', 'Nager.Date (jours fériés)'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/RevisionFlow',
    },
  },
  {
    id: 'sante-scolaire',
    slug: 'sante-scolaire',
    title: 'SantéScolaire',
    tagline: 'Système d\'information médical scolaire sécurisé : dossiers élèves, consultations, agenda et statistiques',
    category: 'Web / SI',
    isFeatured: false,
    order: 5,
    context: 'Projet Personnel',
    period: '2025–2026',
    summary:
      'Plateforme Flask de digitalisation de l\'infirmerie scolaire : dossiers élèves, historique médical, consultations, agenda et statistiques, avec accès par rôle (admin, médecin, infirmier).',
    skills: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'JavaScript', 'HTML/CSS', 'Chart.js', 'Bases de données', 'pytest'],
    accentColor: '#10b981',
    keyMetrics: [
      { value: '3 rôles', label: 'Accès différenciés', detail: 'Admin · Médecin · Infirmier' },
      { value: 'Alembic', label: 'Migrations tracées', detail: 'Évolution du schéma sans rupture' },
      { value: 'Chart.js', label: 'Tableau de bord', detail: 'Statistiques de consultations' },
    ],
    caseStudy: {
      heroTagline: 'Digitaliser le suivi de santé scolaire dans un cadre sécurisé et ergonomique.',
      problem:
        'L\'infirmerie d\'un établissement scolaire gère des données sensibles (dossiers médicaux, vaccinations, consultations) souvent réparties sur des supports papiers. La problématique consistait à centraliser ces informations dans une application web respectant la confidentialité et distinguant clairement les responsabilités du personnel soignant.',
      problemPoints: [
        'Dossiers élèves et historique médical dispersés, difficiles à consulter rapidement.',
        'Confidentialité et cloisonnement des données sensibles entre personnel soignant et administration.',
        'Absence de vue consolidée sur l\'activité (consultations, rendez-vous) pour piloter l\'infirmerie.',
      ],
      approach:
        'Conception d\'une application Flask en architecture MVC modulaire (blueprints) avec une gestion stricte des rôles et un tableau de bord statistique, jusqu\'à la gestion des mots de passe par activation.',
      approachSteps: [
        { step: '1. Modélisation relationnelle', description: 'Schéma SQLAlchemy couvrant élèves, dossiers médicaux, consultations et rendez-vous, avec intégrité référentielle.' },
        { step: '2. Architecture par blueprints', description: 'Séparation des responsabilités (auth, élèves, consultations, agenda, statistiques, administration).' },
        { step: '3. Contrôle d\'accès par rôle', description: 'Politiques RBAC distinguant admin, médecin et infirmier, avec accès restreint selon la fonction.' },
        { step: '4. Pilotage & sécurité', description: 'Tableau de bord Chart.js pour l\'activité, changement de mot de passe à la première connexion et activation de compte par /activate.' },
      ],
      roleDescription:
        'Développement complet de la solution en solo : modélisation de la base, backend Flask, interfaces Jinja2/Bootstrap, gestion des rôles et des accès, tableau de bord statistique et écriture des tests.',
      implementation:
        'Backend Flask 3 synchronisé avec MySQL 8 via SQLAlchemy et Flask-Migrate ; interface Jinja2 stylisée avec Bootstrap 5 ; graphiques d\'activité avec Chart.js.',
      architectureHighlights: [
        'Application Flask organisée en blueprints (frontend séparé des templates et assets statiques).',
        'Migrations de schéma versionnées avec Flask-Migrate / Alembic.',
        'Gestion du cycle de vie des comptes : activation par token et mot de passe choisi à la première connexion.',
      ],
      keyDecisions: [
        {
          title: 'Cloisonnement des données par rôle',
          decision: 'Vérifier les privilèges côté serveur selon le rôle (admin, médecin, infirmier).',
          rationale: 'Les données médicales scolaires sont sensibles : l\'accès doit être limité à la fonction, pas seulement masqué dans l\'interface.',
          impact: 'Chaque profil n\'accède qu\'aux informations de son périmètre.',
        },
        {
          title: 'Statistiques natives dans l\'application',
          decision: 'Intégrer un tableau de bord Chart.js plutôt qu\'un reporting externe.',
          rationale: 'Donner au personnel une lecture immédiate de l\'activité de l\'infirmerie.',
          impact: 'Suivi des consultations et rendez-vous directement depuis l\'application.',
        },
      ],
      results: [
        { value: '3 rôles', label: 'Périmètres distincts', detail: 'Admin · Médecin · Infirmier' },
        { value: 'MVC', label: 'Architecture par blueprints', detail: 'Séparation stricte des responsabilités' },
        { value: 'Versionné', label: 'Schéma migré', detail: 'Flask-Migrate / Alembic' },
      ],
      validation:
        'Tests automatisés sous pytest et validation des contraintes d\'intégrité référentielle de la base MySQL, en complément d\'un protocole de démonstration documenté.',
      validationPoints: [
        'Tests unitaires sur la logique applicative et les services.',
        'Vérification des contraintes d\'intégrité de la base MySQL.',
      ],
      reflection:
        'SantéScolaire m\'a fait approfondir la sécurité et le traitement de données sensibles : rôles, activation de compte et migrations. C\'est un projet où la rigueur technique sert directement la confidentialité.',
      technologiesDetailed: [
        { category: 'Backend', items: ['Python', 'Flask 3', 'SQLAlchemy'] },
        { category: 'Base de données', items: ['MySQL 8', 'Flask-Migrate', 'Alembic'] },
        { category: 'Frontend', items: ['Jinja2', 'Bootstrap 5', 'Chart.js'] },
        { category: 'Qualité', items: ['pytest', 'Git'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/SanteScolaire',
    },
  },
  {
    id: 'novastore',
    slug: 'novastore',
    title: 'NovaStore',
    tagline: 'Boutique e-commerce en POO : catalogue, panier dynamique, commandes et facturation',
    category: 'Web / SI',
    isFeatured: false,
    order: 6,
    context: 'Académique (Équipe)',
    period: '2025–2026',
    summary:
      'Application e-commerce Flask construite autour de la programmation orientée objet : catalogue, panier dynamique, gestion des commandes, facturation et back-office admin.',
    skills: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bases de données'],
    accentColor: '#f59e0b',
    keyMetrics: [
      { value: 'POO', label: 'Logique métier objet', detail: 'Encapsulation, abstraction & persistance ORM' },
      { value: 'End-to-end', label: 'Tunnel d\'achat', detail: 'Du panier à la facture' },
      { value: '20+', label: 'Produits au catalogue', detail: 'Filtrage par catégorie et recherche' },
    ],
    caseStudy: {
      heroTagline: 'Mettre en pratique les principes fondamentaux de la POO dans un cas d\'usage e-commerce complet.',
      problem:
        'Un projet e-commerce impose de structurer proprement des entités métier (utilisateur, produit, commande, panier) et d\'y appliquer des règles de gestion (stock, totaux, taxes) sans mélanger la logique métier et la persistance.',
      problemPoints: [
        'Modéliser des entités commerciales avec des règles métier claires (stock, calcul du total de commande).',
        'Découpler la logique métier objet de la persistance en base relationnelle.',
        'Couvrir un tunnel d\'achat complet : catalogue, panier, commande et facture.',
      ],
      approach:
        'Conception orientée objet : les entités du domaine sont des classes dédiées, et l\'ORM SQLAlchemy assure leur persistance sans polluer la logique métier.',
      approachSteps: [
        { step: '1. Modélisation objet', description: 'Classes métier (models.py, poo_classes.py) représentant utilisateurs, produits et commandes.' },
        { step: '2. Persistance ORM', description: 'Mapping des objets métier vers la base relationnelle via SQLAlchemy.' },
        { step: '3. Logique métier', description: 'Méthodes de classe pour la validation du panier, la gestion du stock et le calcul du total.' },
        { step: '4. Interfaces & back-office', description: 'Catalogue, panier via API, tunnel de commande avec facturation et dashboard admin CRUD.' },
      ],
      roleDescription:
        'Projet académique développé en équipe de 5 (filière IID) autour de la POO : contribution au développement de l\'application et au travail de conception en groupe.',
      implementation:
        'Application Flask structurée en blueprints, entités métier en POO persistées par SQLAlchemy, interface Jinja2/HTML5/CSS3, échanges panier côté client en JavaScript.',
      architectureHighlights: [
        'Séparation nette entre classes métier (logique) et modèles ORM (persistance).',
        'Encapsulation des données utilisateur et des attributs produits.',
        'Routes organisées en blueprints (contrôleurs Flask).',
      ],
      keyDecisions: [
        {
          title: 'Logique métier en POO',
          decision: 'Isoler les règles de gestion (stock, total de commande) dans des méthodes de classe.',
          rationale: 'Garder la logique commerciale testable et indépendante du stockage.',
          impact: 'Un code plus lisible où les entités portent leurs propres règles.',
        },
        {
          title: 'Persistance via ORM',
          decision: 'Mapper les objets métier avec SQLAlchemy plutôt qu\'écrire du SQL manuel.',
          rationale: 'Relier le modèle objet à une base relationnelle sans dupliquer la logique.',
          impact: 'Cohérence entre les objets manipulés en Python et les données stockées.',
        },
      ],
      results: [
        { value: '20+', label: 'Produits catalogués', detail: 'Répartis sur plusieurs catégories' },
        { value: 'Complet', label: 'Tunnel d\'achat', detail: 'Du catalogue à la génération de facture' },
        { value: 'CRUD', label: 'Back-office admin', detail: 'Gestion complète des produits et commandes' },
      ],
      validation:
        'Scénarios de tests fonctionnels sur la gestion du panier, la validation des stocks et le calcul des totaux de commande.',
      validationPoints: [
        'Vérification des règles métier (stock, total) via les méthodes de classe.',
        'Tests de bout en bout du parcours panier → commande → facture.',
      ],
      reflection:
        'NovaStore a renforcé mes acquis en conception orientée objet et en séparation des couches. C\'est le projet où les principes POO se traduisent directement en fonctionnalités e-commerce concrètes.',
      technologiesDetailed: [
        { category: 'Langage & Framework', items: ['Python 3', 'Flask', 'Jinja2'] },
        { category: 'POO & Persistance', items: ['SQLAlchemy', 'Classes métier', 'Encapsulation'] },
        { category: 'Base de données', items: ['MySQL', 'SQLite'] },
        { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/Novastore',
    },
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

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'Tous') return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string | null): ProjectCategoryDefinition | undefined {
  return ALL_PROJECT_CATEGORIES.find((category) => category.slug === slug);
}
