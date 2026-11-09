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
  { name: 'Machine Learning', slug: 'machine-learning' },
] as const satisfies readonly ProjectCategoryDefinition[];

export const ALL_PROJECT_CATEGORIES = [
  ...PROJECT_CATEGORIES,
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
    tagline: 'Système d\'information opérationnel & moteur décisionnel (Flask · MySQL 3NF · SQLAlchemy · KPIs temps réel & module d\'ACP)',
    category: 'Web / SI',
    isFeatured: true,
    isFlagship: true,
    order: 1,
    context: 'Professionnel (Individuel)',
    period: '2025–2026',
    summary:
      'Application web et décisionnelle conçue en autonomie chez Galaxy Solutions pour centraliser la gestion des formations B2B, automatiser les KPIs et sécuriser les flux. Validée par 166 tests Pytest (100% de réussite).',
    skills: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Pandas', 'NumPy', 'JavaScript', 'HTML/CSS', 'Chart.js', 'Business Intelligence', 'Git', 'pytest', 'openpyxl', 'ReportLab', 'SQL', 'Data Analysis', 'Backend', 'Bases de données', 'Relational Modeling', 'Statistiques', 'Systèmes d\'information', 'Jinja2', 'Tailwind CSS', 'Exploratory Data Analysis', 'Data Visualization', 'Principal Component Analysis (PCA)'],
    accentColor: '#059669', // Emerald Green
    image: '/images/projects/gtm-dashboard.png',
    keyMetrics: [
      { value: '166', label: 'Tests Pytest (100%)', detail: 'Validation automatisée complète du backend' },
      { value: '9 entités', label: 'Modèle 3NF MySQL', detail: 'Intégrité référentielle et contraintes SQL' },
      { value: '15+ KPIs & ACP', label: 'Moteur décisionnel', detail: 'Pilotage temps réel et clustering client' },
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
        'J’ai conçu et développé GTM pendant mon stage de 1re année chez Galaxy Solutions (en tant que développeur Python & SQL) : modèle relationnel 3NF, architecture modulaire Flask, moteur d’exports vectoriels et validation automatisée.',
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
    title: 'Audit & Pipeline de Données E-Commerce — Olist',
    tagline: 'Nettoyage, jointures multi-tables et analyse logistique sur 96 252 commandes',
    category: 'Data Analysis',
    isFeatured: true,
    isFlagship: false,
    order: 2,
    context: 'Académique (Binôme)',
    period: '2025–2026',
    summary:
      'Audit et pipeline de données Olist : préparation, jointures sans perte et analyse des délais de livraison sur les 96 252 lignes du jeu d’analyse final.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Data Analysis', 'Statistiques', 'Jupyter', 'Git', 'Data Preparation', 'Data Cleaning', 'Exploratory Data Analysis', 'Data Visualization'],
    accentColor: '#0284c7', // Sky Blue
    image: '/images/projects/olist-delais-livraison.png',
    keyMetrics: [
      { value: '96 252', label: 'Jeu d’analyse final', detail: 'Après préparation et contrôles de qualité multi-tables' },
      { value: '12,1 jours', label: 'Délai moyen', detail: '96 244 commandes avec une date de livraison valide' },
      { value: '6,8 %', label: 'En retard', detail: '6 531 commandes sur 96 244 avec date valide' },
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
        'Projet académique mené en binôme. Responsable de la conception et de l\'exécution intégrale du pipeline sous Pandas : audit de cohérence multi-tables, jointures relationnelles sécurisées sans duplication, calcul vectorisé des métriques logistiques et modélisation des graphiques statistiques sous Seaborn.',
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
        { value: '96 252', label: 'Jeu d’analyse final', detail: 'Commandes consolidées sur la période 2016–2018' },
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
    isFeatured: false,
    isFlagship: false,
    order: 5,
    context: 'Académique (Binôme)',
    period: '2025–2026',
    summary:
      'Analyse factorielle des correspondances implémentée from scratch pour cartographier les relations statistiques entre domaines et compétences sur LinkedIn.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'Jupyter', 'Git', 'SVD', 'Data Analysis', 'Statistiques', 'Data Preparation', 'Exploratory Data Analysis', 'Data Visualization', 'Object-Oriented Programming'],
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
        'Projet académique mené en binôme. Responsable de l\'implémentation logicielle et algorithmique complète en Python : vectorisation matricielle des 8 étapes sous NumPy, décomposition SVD, calculs d\'inertie/CTR/cos² et tests unitaires de validation face aux modules scientifiques de référence.',
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
    id: 'acp',
    slug: 'acp',
    title: 'ACP — Analyse en composantes principales',
    tagline: 'Analyse exploratoire de 169 pays à partir de neuf indicateurs socio-économiques et sanitaires',
    category: 'Statistiques',
    isFeatured: false,
    order: 4,
    context: 'Académique (Individuel)',
    period: '2025–2026',
    summary:
      'Application de l’ACP à neuf indicateurs concernant 169 pays. Les deux premiers axes expliquent 63,86 % de l’inertie observée, sans résumer toute l’information.',
    skills: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Jupyter',
      'Statistiques',
      'Data Preparation',
      'Data Visualization',
      'Principal Component Analysis (PCA)',
    ],
    accentColor: '#0f766e',
    image: '/images/projects/acp-plan-factoriel-pays.png',
    keyMetrics: [
      { value: '169', label: 'pays analysés', detail: 'Après retrait des lignes contenant des valeurs manquantes.' },
      { value: '9', label: 'indicateurs', detail: 'Données économiques et sanitaires exprimées dans des unités différentes.' },
      { value: '63,86 %', label: 'inertie sur F1 et F2', detail: '47,25 % sur F1 et 16,61 % sur F2.' },
    ],
    caseStudy: {
      heroTagline: 'Analyse factorielle et exploration multidimensionnelle de 169 profils nationaux.',
      problem:
        'Synthétiser 9 indicateurs macro-économiques et sanitaires aux échelles très hétérogènes (devises, taux pour 1 000, pourcentages) pour caractériser objectivement 169 pays, sans déformer les distances par des effets de variance brute et sans sur-interpréter une projection factorielle partielle.',
      problemPoints: [
        'Harmoniser des métriques aux unités et amplitudes d’ordres de grandeur très disparates.',
        'Identifier les colinéarités majeures et structurer les contrastes socio-économiques entre pays.',
        'Quantifier l’inertie résiduelle (36,14 %) et encadrer la lecture graphique par le contrôle strict des cos².',
      ],
      approach:
        'Chaîne de traitement sous Python (Pandas, NumPy, Matplotlib, Seaborn) : audit de complétude, centrage-réduction Z-score, décomposition spectrale de la matrice des corrélations et projections factorielles couplées à l’analyse des cos² et des contributions relatives.',
      approachSteps: [
        { step: '1. Audit & Intégrité', description: 'Vérification de l’échantillon complet de 169 pays sur les 9 variables quantitatives.' },
        { step: '2. Standardisation Z-score', description: 'Centrage-réduction des indicateurs pour neutraliser les biais d’échelle et d’unités.' },
        { step: '3. Décomposition spectrale', description: 'Calcul de la matrice de corrélation et extraction des valeurs propres (critères de Kaiser et Cattell).' },
        { step: '4. Projection & Validation', description: 'Visualisation F1 × F2, interprétation par le cercle des corrélations et contrôle métrique des cos².' },
      ],
      roleDescription:
        'Projet académique individuel mené en autonomie : formalisation mathématique de l’ACP normée, développement du notebook d’analyse sous Pandas et NumPy, modélisation des visualisations factorielles (éboulis, cercle de corrélation, carte des individus) et validation statistique rigoureuse des projections.',
      implementation:
        'Notebook Python fondé sur Pandas et NumPy pour les opérations d’algèbre linéaire et de statistiques descriptives, avec Matplotlib et Seaborn pour les projections factorielles.',
      keyDecisions: [
        {
          title: 'Standardisation Z-score préalable (ACP normée)',
          decision: 'Centrer et réduire l’ensemble des indicateurs avant décomposition spectrale.',
          rationale: 'Les variables présentent des variances brutes incomparables (PIB par habitant vs taux de mortalité) qui écraseraient les axes en l’absence de réduction.',
          impact: 'Garantit que chaque dimension contribue équitablement à la variance totale (inertie égale à 9).',
        },
        {
          title: 'Encadrement métrique de l’inertie résiduelle',
          decision: 'Documenter systématiquement les 36,14 % d’inertie non captée par le plan F1 × F2.',
          rationale: 'Une projection bidimensionnelle ne restitue pas l’intégralité de l’espace multidimensionnel.',
          impact: 'Évite les conclusions hâtives en imposant la vérification du cos² avant toute analyse de proximité entre pays.',
        },
      ],
      results: [
        { value: '47,25 %', label: 'inertie expliquée par F1', detail: 'Axe structurant majeur opposant richesse et santé à vulnérabilité infantile et natalité.' },
        { value: '16,61 %', label: 'inertie expliquée par F2', detail: 'Axe vertical caractérisant l’intensité des échanges commerciaux extérieurs.' },
        { value: '63,86 %', label: 'inertie cumulée F1 + F2', detail: '36,14 % d’inertie résiduelle portée par les composantes F3 à F9.' },
      ],
      validation:
        'Validation conjointe par analyse spectrale des valeurs propres, examen de l’éboulis, vérification des contributions relatives (CTR) et des qualités de représentation (cos²).',
      validationPoints: [
        'Contrôler les parts d’inertie expliquées par confrontation des critères de Kaiser et de Cattell.',
        'Interpréter les positions des pays en filtrant systématiquement les individus à faible cos².',
      ],
      reflection:
        'Ce projet illustre la puissance et les exigences de l’analyse multivariée en Data Science : au-delà de la synthèse visuelle, la crédibilité de l’exploration repose sur la maîtrise des métriques d’algèbre linéaire (valeurs propres, cos², contributions) et la distinction stricte entre corrélation observée et causalité.',
      technologiesDetailed: [
        { category: 'Analyse & Calcul', items: ['Python', 'Pandas', 'NumPy'] },
        { category: 'Visualisation', items: ['Matplotlib', 'Seaborn'] },
        { category: 'Environnement', items: ['Jupyter Notebook'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/ACP',
    },
  },
  {
    id: 'revision-flow',
    slug: 'revision-flow',
    title: 'RevisionFlow',
    tagline: 'Planificateur de révisions intelligent, 100 % navigateur, avec recalcul en temps réel',
    category: 'Web / SI',
    isFeatured: false,
    order: 12,
    context: 'Académique (Individuel)',
    period: '2025–2026',
    summary:
      'Planificateur de révisions 100 % navigateur qui recalcule le planning en temps réel selon l’avancement, avec timer Pomodoro et détection honnête de la surcharge.',
    skills: ['JavaScript', 'HTML/CSS', 'Web Audio API', 'localStorage', 'API REST'],
    accentColor: '#0ea5e9',
    image: '/images/projects/revisionflow-planning.png',
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
        'RevisionFlow illustre la conception d’un moteur de décision déterministe et d’une gestion d’état réactive sans dépendance externe. Le projet met en œuvre une transparence produit radicale : signaler explicitement la surcharge via un backlog d’arbitrage plutôt que de masquer les conflits capacitaires derrière un planning irréaliste.',
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
    tagline: 'Application de gestion de la santé scolaire : dossiers élèves, consultations, agenda et statistiques',
    category: 'Web / SI',
    isFeatured: false,
    order: 8,
    context: 'Académique (Individuel)',
    period: '2025–2026',
    summary:
      'Application Flask de suivi de la santé scolaire : dossiers élèves, consultations, rendez-vous et statistiques, avec des accès différenciés selon le rôle.',
    skills: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'JavaScript', 'HTML/CSS', 'Chart.js', 'Bases de données', 'Relational Modeling', 'pytest', 'SQL', 'Backend', 'Systèmes d\'information', 'Jinja2', 'Bootstrap', 'Data Visualization'],
    accentColor: '#10b981',
    image: '/images/projects/sante-scolaire-dashboard-admin.png',
    keyMetrics: [
      { value: '3 rôles', label: 'Accès différenciés', detail: 'Admin · Médecin · Infirmier' },
      { value: '13 tables', label: 'Base présentée', detail: 'Dont le référentiel des médicaments' },
      { value: 'Chart.js', label: 'Tableau de bord', detail: 'Statistiques de consultations' },
    ],
    caseStudy: {
      heroTagline: 'Organiser le suivi de santé scolaire dans une application web.',
      problem:
        'L\'infirmerie d\'un établissement scolaire gère des données sensibles (dossiers médicaux, vaccinations, consultations) souvent réparties sur des supports papiers. La problématique consistait à centraliser ces informations dans une application web respectant la confidentialité et distinguant clairement les responsabilités du personnel soignant.',
      problemPoints: [
        'Dossiers élèves et historique médical dispersés, difficiles à consulter rapidement.',
        'Confidentialité et cloisonnement des données sensibles entre personnel soignant et administration.',
        'Absence de vue consolidée sur l\'activité (consultations, rendez-vous) pour piloter l\'infirmerie.',
      ],
      approach:
        'Conception d\'une application Flask organisée en blueprints, avec des accès différenciés selon les rôles et un tableau de bord statistique.',
      approachSteps: [
        { step: '1. Modélisation relationnelle', description: 'Schéma SQLAlchemy couvrant élèves, dossiers médicaux, consultations et rendez-vous, avec intégrité référentielle.' },
        { step: '2. Architecture par blueprints', description: 'Séparation des responsabilités (auth, élèves, consultations, agenda, statistiques, administration).' },
        { step: '3. Accès par rôle', description: 'Différencier les espaces d’administration et de suivi médical selon le rôle du compte.' },
        { step: '4. Suivi d’activité', description: 'Présenter des indicateurs de consultations et de rendez-vous avec Chart.js.' },
      ],
      roleDescription:
        'Projet individuel couvrant la modélisation de la base, le backend Flask, les interfaces Jinja2/Bootstrap, les accès par rôle et le tableau de bord statistique.',
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
          impact: 'Les routes distinguent l’espace d’administration des fonctions de suivi médical.',
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
        { value: '13 tables', label: 'Base présentée', detail: 'Dont le référentiel des médicaments' },
        { value: 'Flask', label: 'Routes modulaires', detail: 'Organisation en blueprints' },
      ],
      validation:
        'Le dépôt contient un test pytest qui vérifie la prise en compte des variables d’environnement dans la configuration de l’application.',
      validationPoints: [
        'Un test vérifie les valeurs de configuration chargées depuis les variables d’environnement.',
      ],
      reflection:
        'SantéScolaire illustre les exigences de conception d’un système d’information gérant des données de santé sensibles : intégrité référentielle stricte en base de données, cloisonnement des privilèges côté serveur et transparence sur la nécessité d’audits de conformité réglementaire avant tout déploiement en milieu réel.',
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
    order: 13,
    context: 'Académique (Équipe)',
    period: '2025–2026',
    summary:
      'Prototype e-commerce réalisé par une équipe de cinq : catalogue, panier et facture imprimable. Le paiement est simulé et les commandes ne sont pas conservées durablement.',
    skills: ['Python', 'Flask', 'Jinja2', 'JavaScript', 'HTML/CSS', 'Backend', 'Object-Oriented Programming'],
    accentColor: '#f59e0b',
    image: '/images/projects/novastore-filtre-prix.png',
    keyMetrics: [
      { value: '20 produits', label: 'Catalogue de démonstration', detail: 'Produits classés par catégorie.' },
      { value: 'Panier → facture', label: 'Parcours prototype', detail: 'Une facture peut être affichée et imprimée.' },
      { value: 'Paiement simulé', label: 'Aucune transaction réelle', detail: 'Les commandes ne sont pas conservées durablement.' },
    ],
    caseStudy: {
      heroTagline: 'Mettre en pratique la programmation orientée objet dans un prototype de boutique en ligne.',
      problem:
        'Le projet porte sur la modélisation des produits, paniers et commandes, ainsi que sur les règles de stock et de calcul des totaux dans une boutique de démonstration.',
      problemPoints: [
        'Modéliser des entités commerciales avec des règles métier claires (stock, calcul du total de commande).',
        'Relier le catalogue à un panier de session et à un parcours de commande.',
        'Générer une facture de démonstration sans traiter un paiement réel.',
      ],
      approach:
        'Conception orientée objet avec des classes métier; le panier est conservé dans la session Flask, tandis que les commandes et alertes restent en mémoire.',
      approachSteps: [
        { step: '1. Modélisation objet', description: 'Classes métier (models.py, poo_classes.py) représentant utilisateurs, produits et commandes.' },
        { step: '2. Gestion de l’état', description: 'Identifiants du panier conservés dans la session Flask; commandes et alertes stockées en mémoire.' },
        { step: '3. Logique métier', description: 'Méthodes de classe pour la validation du panier, la gestion du stock et le calcul du total.' },
        { step: '4. Interfaces', description: 'Catalogue filtrable, actions de panier via API, parcours de commande et facture de démonstration.' },
      ],
      roleDescription:
        'Dans le cadre d’un projet d’équipe de cinq, mon apport principal a porté sur la conception et le développement de l’application. La présentation ne détaille pas la répartition des contributions entre les membres.',
      implementation:
        'Application Flask structurée en blueprints, classes métier Python, interface Jinja2/HTML5/CSS3 et échanges de panier en JavaScript. Le panier est en session; les commandes restent en mémoire.',
      architectureHighlights: [
        'Classes Python pour représenter produits, paniers, commandes et clients.',
        'Encapsulation des données utilisateur et des attributs produits.',
        'Routes organisées en blueprints Flask; pas de persistance ORM configurée dans l’application.',
      ],
      keyDecisions: [
        {
          title: 'Logique métier en POO',
          decision: 'Isoler les règles de gestion (stock, total de commande) dans des méthodes de classe.',
          rationale: 'Regrouper les règles de stock et de calcul dans les objets métier.',
          impact: 'Un code plus lisible où les entités portent leurs propres règles.',
        },
        {
          title: 'État du prototype',
          decision: 'Conserver le panier dans la session et les commandes en mémoire.',
          rationale: 'Le prototype illustre le parcours sans mettre en place de stockage durable des commandes.',
          impact: 'Le panier peut être reconstitué depuis la session; les commandes disparaissent au redémarrage.',
        },
      ],
      results: [
        { value: '20', label: 'Produits de démonstration', detail: 'Catalogue réparti dans plusieurs catégories.' },
        { value: 'Panier → facture', label: 'Parcours de démonstration', detail: 'La commande et la facture sont simulées.' },
        { value: 'Paiement simulé', label: 'Aucun service bancaire', detail: 'Aucune transaction réelle n’est effectuée.' },
      ],
      validation:
        'Le dépôt ne contient pas de suite de tests automatisés; les fonctionnalités sont décrites à partir du code de l’application.',
      validationPoints: [
        'Aucun fichier de tests automatisés n’est présent dans le dépôt.',
      ],
      reflection:
        'NovaStore illustre la modélisation objet de règles transactionnelles et le découpage modulaire en Flask. L’expérience démontre l’intérêt d’isoler la logique de domaine des contrôleurs HTTP, tout en soulignant la nécessité d’une couche de persistance relationnelle active (ORM/SGBD) pour pérenniser l’état au-delà du cycle de vie mémoire.',
      technologiesDetailed: [
        { category: 'Langage & Framework', items: ['Python 3', 'Flask', 'Jinja2'] },
        { category: 'POO', items: ['Classes métier', 'Encapsulation'] },
        { category: 'État de l’application', items: ['Session Flask', 'Données en mémoire'] },
        { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/Novastore',
    },
  },
  {
    id: 'pneumonia-detection',
    slug: 'pneumonia-detection',
    title: 'Détection de Pneumonie par Radiographie — Deep Learning',
    tagline: 'Classification binaire d’images médicales par CNN personnalisé et Transfer Learning DenseNet121',
    category: 'Machine Learning',
    isFeatured: false,
    isFlagship: false,
    order: 9,
    context: 'Académique (Équipe)',
    period: '2025–2026',
    summary:
      'Étude comparative de CNN et DenseNet121 sur 5 856 radiographies pédiatriques. Le rapport du dépôt indique environ 89 % d’accuracy et 92 % de recall PNEUMONIA pour DenseNet121.',
    skills: ['Python', 'TensorFlow', 'Keras', 'DenseNet121', 'Deep Learning', 'Computer Vision', 'Data Visualization', 'NumPy', 'Matplotlib', 'Streamlit', 'Jupyter', 'Git', 'Scikit-learn'],
    accentColor: '#0284c7',
    image: '/images/projects/pneumonia-xray.png',
    keyMetrics: [
      { value: '≈89 %', label: 'Accuracy test (DenseNet121)', detail: 'Sur 624 images, au seuil 0,8' },
      { value: '92 %', label: 'Recall PNEUMONIA', detail: '358/390 selon le tableau de seuils du notebook' },
      { value: '5 856', label: 'Images médicales', detail: 'Dataset Chest X-Ray (Kaggle)' },
    ],
    caseStudy: {
      heroTagline: 'Classification d’images médicales : comparer un CNN sur mesure et DenseNet121 avec une priorité clinique sur le rappel.',
      problem:
        'La pneumonie est une infection respiratoire aiguë nécessitant un diagnostic rapide et fiable. Dans les zones à ressources médicales limitées, l’accès à un radiologue expert est restreint. L’objectif algorithmique est de concevoir un système capable d’orienter le diagnostic avec un taux de faux négatifs minimal, car un cas infectieux manqué met en danger la vie du patient.',
      problemPoints: [
        'Déséquilibre de classe marqué : ~74 % d’images de pneumonie contre ~26 % d’images saines dans le jeu d’entraînement.',
        'Forte disparité dimensionnelle : résolutions brutes variant de 384 × 127 px à 2 916 × 2 663 px.',
        'Asymétrie des coûts cliniques : un faux négatif (pneumonie non détectée) est critique, alors qu’un faux positif déclenche simplement un examen de contrôle.',
      ],
      approach:
        'Mise en œuvre d’un protocole expérimental rigoureux sous TensorFlow/Keras comparant deux approches : un CNN convolutionnel from scratch et un modèle DenseNet121 pré-entraîné sur ImageNet, avec optimisation du seuil de décision et interface de démonstration Streamlit.',
      approachSteps: [
        { step: '1. Pipeline de données & Normalisation', description: 'Redimensionnement uniforme à 224 × 224 px, normalisation [0, 1] et data augmentation ciblée (flips horizontaux, légères rotations et zooms).' },
        { step: '2. CNN from scratch', description: 'Architecture séquentielle à blocs Conv2D, MaxPooling2D, Dropout et GlobalAveragePooling2D, régularisée par EarlyStopping (convergence à 13 epochs).' },
        { step: '3. Transfer Learning DenseNet121', description: 'Phase d’extraction de features avec base ImageNet gelée, suivie de l’évaluation de la phase de fine-tuning.' },
        { step: '4. Calibrage du seuil & Déploiement', description: 'Ajustement des seuils de décision (0.7 pour CNN, 0.8 pour DenseNet121) et intégration dans une interface web Streamlit.' },
      ],
      roleDescription:
        'Projet académique réalisé en équipe de quatre étudiants à l’ENSA Khouribga sous l’encadrement des Pr. Safiny Yazid et Pr. Siham Ahmam. J’ai pris en charge la rédaction intégrale du rapport technique (formalisation du protocole expérimental, comparaison des architectures et analyse d’impact du seuil clinique) et contribué aux expérimentations de modélisation.',
      implementation:
        'Développement des pipelines de deep learning sous TensorFlow/Keras (CNN pyramidal 4 blocs et DenseNet121 pré-entraîné avec régularisation Dropout/EarlyStopping), évaluation statistique via Scikit-learn, et déploiement d’un prototype d’inférence temps réel sous Streamlit.',
      architectureHighlights: [
        'CNN from scratch : 4 blocs convolutionnels pyramidaux (32 à 256 filtres 3×3), MaxPooling2D, Dropout régularisateur et GlobalAveragePooling2D.',
        'DenseNet121 Transfer Learning : backbone dense pré-entraîné sur ImageNet couplé à une tête dense personnalisée avec BatchNormalization et sortie Sigmoïde.',
        'Streamlit UI : inférence temps réel permettant le chargement dynamique des modèles sérialisés (.keras) et la restitution probabiliste de la classification.',
      ],
      keyDecisions: [
        {
          title: 'Priorité métrique au rappel clinique (Sensibilité) sur l’exactitude globale',
          decision: 'Calibrer le seuil de décision opérationnel à 0,8 pour DenseNet121 afin de maximiser le rappel de la classe PNEUMONIA.',
          rationale: 'En imagerie médicale pédiatrique d’orientation, le coût d’un faux négatif (pathologie infectieuse non détectée) est critique comparé à un faux positif déclenchant un contrôle.',
          impact: 'Atteinte d’une sensibilité clinique de 91,79 % (358 cas détectés sur 390 au seuil 0,8) avec un score F1 équilibré à 0,91.',
        },
        {
          title: 'Rigueur d’évaluation méthodologique du Fine-Tuning',
          decision: 'Documenter avec transparence la sensibilité aux hyperparamètres sans surinterpréter les gains marginaux.',
          rationale: 'Les expérimentations utilisent un seuil de 0,8 en extraction de caractéristiques et de 0,9 après fine-tuning, introduisant un biais de protocole qui empêche d’isoler la contribution des poids de celle de la coupure.',
          impact: 'Formulation de conclusions scientifiques intègres et identification des étapes de standardisation requises avant toute validation externe.',
        },
      ],
      results: [
        { value: '≈89 %', label: 'Accuracy test (DenseNet121)', detail: 'Sur 624 radiographies, au seuil 0,8' },
        { value: '0,92', label: 'Recall PNEUMONIA', detail: '358 cas détectés sur 390 selon le tableau de seuils' },
        { value: '0,91', label: 'F1-score PNEUMONIA', detail: 'F1 de la classe positive, pas F1 macro' },
      ],
      validation:
        'Évaluation menée sur le jeu de test officiel Kaggle de 624 radiographies (234 NORMAL, 390 PNEUMONIA) non vues pendant l’entraînement, avec calcul des matrices de confusion, courbes ROC et rapports de classification complets.',
      validationPoints: [
        'Évaluation comparative standardisée sur le jeu de test indépendant Kaggle (624 radiographies : 234 NORMAL, 390 PNEUMONIA).',
        'Contrôle de la convergence et prévention du surapprentissage par suivi des courbes de binary cross-entropy et d’accuracy avec EarlyStopping.',
        'Validation fonctionnelle du prototype d’inférence Streamlit pour l’ingestion et la prédiction dynamique de clichés radiographiques.',
      ],
      reflection:
        'Ce projet démontre l’importance critique d’aligner les métriques d’évaluation sur l’objectif clinique : en imagerie médicale d’orientation, l’exactitude globale est insuffisante et potentiellement trompeuse en présence de classes asymétriques. L’optimisation du seuil de décision sur le rappel (sensibilité) est déterminante pour minimiser les faux négatifs critiques, tout en exigeant une stricte transparence sur la variabilité des métriques et la nécessité d’une validation externe multicentrique avant tout déploiement clinique.',
      technologiesDetailed: [
        { category: 'Deep Learning & Vision', items: ['TensorFlow', 'Keras', 'DenseNet121', 'CNN', 'Transfer Learning', 'Image Augmentation'] },
        { category: 'Traitement & Métriques', items: ['Python', 'NumPy', 'Scikit-learn', 'Pillow (PIL)', 'Matplotlib', 'Plotly'] },
        { category: 'Déploiement & Environnement', items: ['Streamlit', 'Google Colab', 'Git', 'Jupyter Notebook'] },
      ],
      githubUrl: 'https://github.com/Godwin-08/Pneumonia-Detection-from-X-rays',
      reportUrl: '/documents/projects/pneumonia-report-fr.pdf',
    },
  },
  {
    id: 'goodthought-sql-analysis',
    slug: 'goodthought-sql-analysis',
    title: 'Analyse SQL des dons et de l’impact — GoodThought',
    tagline: 'Modélisation relationnelle et requêtes analytiques sur les dons et scores d’impact par mission et région.',
    category: 'Data Analysis',
    isFeatured: false,
    order: 6,
    context: 'Projet guidé DataCamp',
    period: 'SQL Data Analyst',
    summary:
      'Requêtes SQL avancées sur PostgreSQL : jointures 3NF, agrégations multidimensionnelles par typologie de donateur, CTEs modulaires et fenêtrage déterministe ROW_NUMBER().',
    skills: ['SQL', 'Jupyter'],
    accentColor: '#168A72',
    image: '/images/projects/goodthought-data-model.png',
    keyMetrics: [
      { value: '4 régions', label: 'Scores d’impact comparés', detail: 'Maximums enregistrés entre 9,99 et 10,00' },
      { value: '5 000', label: 'Missions dans la table', detail: 'Table Assignments du jeu de formation' },
      { value: '3 tables', label: 'Sources reliées', detail: 'Assignments · Donations · Donors' },
    ],
    caseStudy: {
      heroTagline: 'Modéliser les flux de financement et isoler les missions d’excellence via des requêtes analytiques PostgreSQL.',
      problem: 'Analyser la répartition des flux financiers entre donateurs individuels et institutionnels sur 5 000 missions, et identifier de manière univoque les initiatives pilotes maximisant le score d’impact dans chacune des 4 régions.',
      approach: 'Construction d’un pipeline SQL articulé en trois temps : jointures relationnelles normalisées, agrégations groupées pour cartographier les volumes par segment de donateur, et fenêtrage partitionné au sein d’une CTE pour classer les missions.',
      roleDescription: 'Projet d’analyse SQL avancée réalisé dans le cadre du parcours certifiant SQL Data Analyst de DataCamp.',
      implementation: 'Développement sous PostgreSQL dans l’environnement DataCamp DataLab : jointures multi-tables, clauses GROUP BY, Common Table Expressions (CTE) et fonctions de fenêtrage partitionnées ROW_NUMBER().',
      keyDecisions: [
        {
          title: 'Usage de ROW_NUMBER() vs RANK() pour un classement univoque',
          decision: 'Sélectionner ROW_NUMBER() avec un tri secondaire sur le volume de dons plutôt que RANK().',
          rationale: 'Prévenir la génération de doublons d’ex æquo qui fausseraient l’extraction stricte d’une mission pilote par région.',
          impact: 'Attribution déterministe d’un rang ordinal unique par partition régionale, garantissant la fiabilité des restitutions décisionnelles.',
        },
        {
          title: 'Encapsulation modulaire par Common Table Expression (CTE)',
          decision: 'Structurer l’analyse via une CTE intermédiaire isolant les missions ayant des dons effectifs enregistrés.',
          rationale: 'Rendre la requête modulaire, lisible et optimisable par le planificateur de requêtes sans recourir à des sous-requêtes imbriquées.',
          impact: 'Séparation nette entre la logique de consolidation transactionnelle et la couche de fenêtrage analytique.',
        },
      ],
      results: [
        { value: '4 régions', label: 'Scores maximums consignés', detail: 'East et South : 10,00 ; North et West : 9,99.' },
        { value: '3 840,66 $', label: 'Plus grand agrégat de dons', detail: 'Assignment_3033, East, type Individual ; somme regroupée par mission et type de donateur.' },
        { value: 'Assignment_316', label: 'Mission classée première à East', detail: 'Score de 10,00 et deux dons enregistrés dans le classement régional.' },
      ],
      validation: 'Relecture des requêtes et des sorties enregistrées dans le notebook fourni.',
      reflection: 'Ce projet illustre la puissance de l’Analytics Engineering en SQL : au-delà de simples agrégations, l’utilisation combinée de CTEs modulaires et de fonctions de fenêtrage partitionnées permet de répondre à des problématiques décisionnelles complexes tout en garantissant un plan d’exécution déterministe et maintenable.',
      technologiesDetailed: [
        { category: 'Analyse & Base de données', items: ['PostgreSQL', 'SQL', 'Common Table Expressions (CTE)', 'Window Functions'] },
        { category: 'Environnement', items: ['DataCamp DataLab', 'Jupyter Notebook'] },
      ],
      reportUrl: '/certifications/impact-analysis-of-goodthought-ngo-initiatives.pdf',
    },
  },
  {
    id: 'motorcycle-parts-sales',
    slug: 'motorcycle-parts-sales',
    title: 'Analyse des ventes de pièces de moto',
    tagline: 'Agrégation multidimensionnelle de ventes B2B en gros et audit de formule financière.',
    category: 'Data Analysis',
    isFeatured: false,
    order: 10,
    context: 'Projet guidé DataCamp',
    period: 'SQL Data Analyst',
    summary:
      'Requêtes SQL d’agrégation sur 1 000 commandes réparties sur 3 entrepôts (48 agrégats) et audit de cohérence sur le calcul du revenu net (payment_fee).',
    skills: ['SQL', 'Jupyter'],
    accentColor: '#C77A24',
    image: '/images/projects/motorcycle-parts-sales.jpg',
    keyMetrics: [
      { value: '1 000', label: 'Commandes', detail: 'Jeu d’exercice analysé dans le notebook' },
      { value: '48', label: 'Agrégats affichés', detail: 'Ligne de produits · mois · entrepôt' },
      { value: '3 mois', label: 'Période couverte', detail: 'Juin à août 2021' },
    ],
    caseStudy: {
      heroTagline: 'Structurer l’analyse des ventes B2B en gros et auditer la formule de marge nette en SQL.',
      problem: 'Analyser la répartition du chiffre d’affaires en gros selon la ligne de produits, le mois et l’entrepôt, tout en auditant la formule de calcul du revenu net face à un taux de commission déduit additivement.',
      approach: 'Agrégation groupée multidimensionnelle (produit × mois × entrepôt) sur 1 000 transactions, couplée à un audit critique de la clause de calcul du net (identification de l’erreur de soustraction de payment_fee et du tri alphabétique des mois).',
      roleDescription: 'Projet d’analyse et d’audit SQL réalisé dans le parcours certifiant SQL Data Analyst de DataCamp.',
      implementation: 'Requêtes d’agrégation PostgreSQL sous DataCamp DataLab : fonctions SUM, ROUND, clauses GROUP BY sur dimensions croisées, et audit de formule financière.',
      keyDecisions: [],
      results: [
        { value: '48', label: 'Agrégats affichés', detail: 'Lignes de produits, mois et entrepôts dans la sortie enregistrée.' },
        { value: '1 000', label: 'Commandes', detail: 'Jeu de données du notebook de formation.' },
        { value: '3', label: 'Entrepôts', detail: 'Sites présents dans l’analyse.' },
      ],
      validation: 'Relecture des requêtes et des sorties enregistrées dans le notebook fourni.',
      reflection: 'Ce projet illustre l’importance de l’esprit critique en analyse de données : au-delà de l’exécution technique des regroupements SQL, le rôle du Data Analyst consiste à auditer la validité sémantique des formules métier et à signaler les incohérences de calcul avant intégration décisionnelle.',
      technologiesDetailed: [
        { category: 'Analyse & Base de données', items: ['PostgreSQL', 'SQL', 'Grouped Aggregations', 'Data Quality Audit'] },
        { category: 'Environnement', items: ['DataCamp DataLab', 'Jupyter Notebook'] },
      ],
    },
  },
  {
    id: 'students-mental-health',
    slug: 'students-mental-health',
    title: 'Analyse de la santé mentale des étudiants',
    tagline: 'Analyse biostatistique SQL : évaluation psychométrique comparative (PHQ-9, SCS, ASISS) selon le statut et la durée de séjour.',
    category: 'Data Analysis',
    isFeatured: false,
    order: 11,
    context: 'Projet guidé DataCamp',
    period: 'SQL Data Analyst',
    summary:
      'Analyse comparative sous PostgreSQL des scores de dépression (PHQ-9), d’intégration sociale (SCS) et de stress d’acculturation (ASISS) sur une cohorte universitaire (286 étudiants).',
    skills: ['SQL', 'Jupyter'],
    accentColor: '#7762A8',
    image: '/images/projects/students-mental-health.jpg',
    keyMetrics: [
      { value: '201 / 67', label: 'Étudiants Inter / Dom', detail: 'Effectifs qualifiés sur les échelles psychométriques dans le CSV.' },
      { value: '+12,72', label: 'Écart moyen ASISS', detail: '75,56 pour Inter contre 62,84 pour Dom dans le CSV.' },
      { value: '9,09', label: 'PHQ-9 moyen à 3 ans', detail: 'Pic d’intensité dépressive sur la cohorte de 46 étudiants internationaux.' },
    ],
    caseStudy: {
      heroTagline: 'Analyse biostatistique et modélisation comparative des échelles de santé mentale sous PostgreSQL.',
      problem: 'Dans quelle mesure les scores cliniques de dépression (PHQ-9), de connectivité sociale (SCS) et de stress d’acculturation (ASISS) diffèrent-ils entre étudiants internationaux et nationaux, et comment ces indicateurs se distribuent-ils selon la durée de séjour ?',
      approach: 'Audit des distributions, structuration des requêtes d’agrégation SQL conditionnelles pour isoler les cohortes Inter/Dom, et segmentation transversale des étudiants internationaux par durée de séjour décroissante.',
      roleDescription: 'Projet d’analyse biostatistique SQL réalisé sous DataCamp DataLab. Conception et exécution des requêtes d’agrégation analytique et modélisation comparative des échelles psychométriques.',
      implementation: 'Requêtes PostgreSQL exploitant AVG(), ROUND(), COUNT(), filtrage WHERE inter_dom = \'Inter\' et GROUP BY stay ORDER BY stay DESC.',
      keyDecisions: [],
      results: [
        { value: '201 / 67', label: 'Étudiants Inter / Dom', detail: 'Effectifs portant ces deux catégories dans le CSV fourni.' },
        { value: '75,56 / 62,84', label: 'Score ASISS moyen', detail: 'Inter / Dom ; écart descriptif de 12,72 points dans ce jeu de données.' },
        { value: '8,04 / 8,61', label: 'Score PHQ-9 moyen', detail: 'Inter / Dom ; moyennes calculées à partir des scores présents dans le CSV.' },
        { value: '9,09', label: 'PHQ-9 moyen après 3 ans', detail: '46 étudiants internationaux dans la sortie enregistrée du notebook.' },
      ],
      validation: 'Contrôle d’intégrité des sorties du notebook et vérification croisée des moyennes pondérées à partir du jeu de données brut.',
      reflection: 'Cette étude démontre la pertinence de SQL pour l’analyse épidémiologique descriptive, tout en exigeant une stricte prudence méthodologique : distinguer rigoureusement corrélation transversale et inférence causale longitudinale.',
      technologiesDetailed: [{ category: 'Analyse & Base de données', items: ['PostgreSQL', 'SQL', 'Jupyter Notebook', 'DataCamp DataLab'] }] as any,
    },
  },
  {
    id: 'investigating-netflix-movies',
    slug: 'investigating-netflix-movies',
    title: 'Analyse des films Netflix des années 1990',
    tagline: 'Analyse exploratoire de données sous Python (Pandas) : filtrage temporel, durée modale et segmentation par genre.',
    category: 'Data Analysis',
    isFeatured: false,
    order: 7,
    context: 'Projet guidé DataCamp',
    period: 'Python Data Analyst',
    summary:
      'Analyse exploratoire sous Python et pandas du catalogue Netflix : isolation de 183 films des années 1990, calcul de la durée modale (94 min) et dénombrement des films d’action courts.',
    skills: ['Python', 'Pandas', 'Jupyter'],
    accentColor: '#E50914',
    image: '/images/projects/investigating-netflix-movies.jpg',
    keyMetrics: [
      { value: '183', label: 'Films des années 90', detail: 'Films sortis entre 1990 et 1999 (type Movie) extraits du CSV.' },
      { value: '94 min', label: 'Durée modale', detail: 'Durée la plus fréquente calculée par mode() sur la décennie.' },
      { value: '7', label: 'Films d’action courts', detail: 'Films d’action durant strictement moins de 90 minutes.' },
    ],
    caseStudy: {
      heroTagline: 'Explorer la durée et les genres des films Netflix des années 1990 avec Python et pandas.',
      problem: 'Quelle était la durée la plus fréquente des films sortis dans les années 1990 sur Netflix, et combien de films d’action de cette décennie duraient moins de 90 minutes ?',
      approach: 'Charger netflix_data.csv, appliquer un filtrage booléen multicritère sur la décennie 1990 et le type Movie, calculer la valeur modale de la durée et dénombrer les films d’action courts.',
      roleDescription: 'Projet guidé DataCamp réalisé dans le parcours Python Data Analyst. Conception du notebook d’analyse exploratoire et validation des sorties.',
      implementation: 'Script Python exploitant pandas (read_csv, masques booléens, mode(), count()) et matplotlib pour l’analyse exploratoire de données.',
      keyDecisions: [],
      results: [
        { value: '183', label: 'Films des années 90 analysés', detail: 'Films sortis entre 1990 et 1999 (type Movie) isolés du catalogue.' },
        { value: '94 min', label: 'Durée modale des films', detail: 'Valeur modale calculée via pandas.mode() sur la variable duration.' },
        { value: '7', label: 'Films d’action < 90 min', detail: 'Nombre de films du genre Action durant strictement moins de 90 minutes.' },
      ],
      validation: 'Vérification de la conformité du code et validation automatique par la suite de tests DataCamp avec obtention de l’attestation officielle de projet.',
      reflection: 'Ce projet met en pratique la sélection vectorisée et le calcul statistique descriptif avec pandas, démontrant la rigueur d’extraction et de validation des critères sur des données réelles.',
      technologiesDetailed: [{ category: 'Analyse & Programmation', items: ['Python', 'Pandas', 'Matplotlib', 'DataCamp DataLab'] }] as any,
    },
  },
  {
    id: 'grocery-store-sales',
    slug: 'grocery-store-sales',
    title: 'Audit & Analyse SQL des ventes en supermarché — FoodYum',
    tagline: 'Examen pratique certifiant DataCamp : audit d’intégrité, nettoyage SQL avancé et analyse des ventes.',
    category: 'Data Analysis',
    isFeatured: true,
    order: 3,
    context: 'Examen officiel · DataCamp',
    period: 'Data Analyst Associate',
    summary:
      'Audit d’un bug d’intégrité système, pipeline de nettoyage SQL avancé (CTEs et imputations par médiane avec PERCENTILE_CONT), et ciblage commercial des produits phares.',
    skills: ['SQL', 'PostgreSQL', 'Data Cleaning', 'Data Preparation', 'Jupyter'],
    accentColor: '#0D9488',
    image: '/images/projects/grocery-store-sales.png',
    keyMetrics: [
      { value: '4 tâches SQL', label: 'Épreuve pratique chronométrée', detail: 'Audit bug 2022, CTEs de nettoyage, calculs d’extrêmes et extraction ciblée.' },
      { value: 'PERCENTILE_CONT', label: 'Imputation vectorisée', detail: 'Calcul exact des médianes de prix et de poids sans altération de la table source.' },
      { value: '8 colonnes', label: 'Variables normalisées & typées', detail: 'Imputation déterministe de year_added (2022) et standardisation des labels.' },
    ],
    caseStudy: {
      heroTagline: 'Résoudre un bug d’intégrité et nettoyer des données de supermarché avec du SQL avancé sous PostgreSQL.',
      problem: 'La chaîne de supermarchés FoodYum fait face à une hausse des coûts et à un bug survenu en 2022 ayant effacé l’année d’ajout de certains produits. L’objectif est d’auditer les pertes, de nettoyer l’ensemble du catalogue sans modifier la table source, et d’analyser les fourchettes de prix par rayon ainsi que les ventes moyennes.',
      approach: 'Dénombrer les anomalies, construire un pipeline CTE avec conversion de types et calcul de médianes pour les valeurs continues manquantes, puis effectuer des agrégations et filtrages décisionnels.',
      roleDescription: 'Projet d’examen pratique officiel réalisé et validé pour l’obtention de la certification DataCamp Data Analyst Associate.',
      implementation: 'Notebook SQL PostgreSQL utilisant des CTEs imbriquées, PERCENTILE_CONT(0.5) WITHIN GROUP, COALESCE, CAST, REPLACE, ROUND, GROUP BY et filtrages multi-conditions.',
      keyDecisions: [
        {
          title: 'Pipeline CTE non destructif & Imputation atomique',
          decision: 'Structuration du nettoyage via des expressions de table communes (typed, medians) assemblées par CROSS JOIN et COALESCE, sans clause UPDATE.',
          rationale: 'Préserver l’intégrité et l’immutabilité de la table brute en base tout en générant un dataset assaini en une seule exécution sans effet de bord.',
          impact: 'Transformation traçable, reproductible et conforme aux standards de l’Analytics Engineering.',
        },
        {
          title: 'Imputation de médiane continue via PERCENTILE_CONT',
          decision: 'Calcul des scalaires de médiane pour weight et price avec PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ...), plutôt qu’une moyenne arithmétique.',
          rationale: 'Neutraliser le biais d’asymétrie causé par les articles très lourds ou très chers afin d’imputer la valeur centrale la plus représentative.',
          impact: 'Données imputées cohérentes avec la distribution réelle du catalogue.',
        },
      ],
      results: [
        { value: 'Task 1', label: 'Audit du bug système', detail: 'Requête dénombrant avec précision les produits affectés par l’absence de year_added.' },
        { value: 'Task 2', label: 'Pipeline de nettoyage CTE', detail: 'Imputation par médiane pour le poids et le prix, typage strict et standardisation de brand et stock_location.' },
        { value: 'Task 3 & 4', label: 'Fourchettes de prix & ciblage', detail: 'Extraction des MIN/MAX par product_type et ciblage des rayons Meat et Dairy à fortes ventes (>10 unités).' },
      ],
      validation: 'Validation automatisée par les tests de conformité de l’examen officiel DataCamp Data Analyst Associate.',
      reflection: 'Ce projet valide l’aptitude à manipuler du SQL rigoureux sous contrainte de temps, en privilégiant l’intégrité des calculs et la non-altération des tables brutes.',
      technologiesDetailed: [{ category: 'Analyse de données', items: ['SQL', 'PostgreSQL', 'DataCamp', 'Jupyter Notebook'] }],
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
