export type ProjectDetailLocale = 'fr' | 'en';

export interface ProjectDetailImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
  zoomable?: boolean;
  analysis?: {
    question: string;
    reading: string;
    observation: string;
    interpretation: string;
    businessInterest: string;
    limitation: string;
  };
}

export interface OlistAnalysisSections {
  dataModel: { title: string; introduction: string };
  preparation: {
    title: string;
    introduction: string;
    steps: readonly { value: string; title: string; description: string }[];
    conclusion: string;
  };
  delivery: {
    title: string;
    introduction: string;
    metrics: readonly { value: string; label: string; detail: string }[];
  };
  satisfaction: {
    title: string;
    introduction: string;
    metrics: readonly { value: string; label: string; detail: string }[];
  };
  financial: {
    title: string;
    introduction: string;
    indicators: readonly { value: string; label: string; detail: string }[];
    note: string;
  };
}

export interface ProjectDetailDocument {
  href: string;
  label: string;
  description?: string;
  internal?: boolean;
  download?: boolean;
}

export interface ProjectDetailArchitecture {
  title: string;
  introduction: string;
  layers: readonly { title: string; description: string }[];
}

export interface ProjectDetailDecisions {
  title: string;
  items: readonly { title: string; description: string }[];
}

export interface ProjectDetailCopy {
  context: string;
  question: string;
  featuredFinding?: string;
  dataTitle?: string;
  dataConstruction?: string;
  methodTitle?: string;
  resultsIntro?: string;
  architecture?: ProjectDetailArchitecture;
  keyDecisions?: ProjectDetailDecisions;
  conclusion?: { title: string; description: string };
  methodIntro: string;
  methodSteps: readonly { title: string; description: string }[];
  contribution: string;
  results: readonly { value: string; label: string; detail: string }[];
  limitations: readonly string[];
  technologies: readonly string[];
  repository?: string;
  gallery: readonly ProjectDetailImage[];
  olistAnalysis?: OlistAnalysisSections;
  documents?: readonly ProjectDetailDocument[];
  collaborators?: readonly { name: string; role: string; linkedinUrl?: string }[];
  supervisors?: readonly { name: string; role: string; linkedinUrl?: string }[];
}

export const PROJECT_DETAIL_COPY = {
  gtm: {
    fr: {
      context: 'Pendant mon stage d’initiation chez Galaxy Solutions (Mohammedia, Maroc), j’ai conçu et développé en autonomie Galaxy Training Manager. Face à la dispersion des données dans de multiples tableurs, GTM centralise la gestion des formations B2B (catalogues, sessions, clients, formateurs, inscriptions) et intègre un moteur d’analyse décisionnelle (KPIs temps réel, alertes métier et analyse factorielle ACP). L’application s’appuie sur une modélisation relationnelle 3NF sous MySQL et est validée par 166 tests Pytest. Les exemples de cette page utilisent le jeu de démonstration du projet.',
      question: 'Comment centraliser la gestion opérationnelle B2B et fiabiliser le pilotage décisionnel tout en garantissant un contrôle d’accès strict (RBAC) et une intégrité transactionnelle sans faille ?',
      methodIntro: 'Le projet a été mené selon une méthodologie par socles successifs (Fondation, Métier & Pilotage, Analytique & Consolidation) pour garantir la robustesse des données et l’exactitude des calculs :',
      methodSteps: [
        { title: 'Modélisation Relationnelle 3NF & Intégrité', description: 'Conception du schéma de 9 entités (Role, Domaine, Formation, Session, Client, Participant, Inscription...). Mise en place de contraintes d’unicité SQL strictes sur (session_id, participant_id) et (utilisateur_id) pour éliminer les doublons directement au niveau du stockage MySQL.' },
        { title: 'Architecture en Couches & Sécurité RBAC', description: 'Séparation stricte Modèles (SQLAlchemy), Services métier, Routes API REST et Blueprints Jinja2. Contrôle RBAC à deux niveaux (Admin, Gestionnaire, Formateur) avec isolation étanche des données du Formateur (HTTP 403) et onboarding par tokens d’activation 48h (hmac.compare_digest).' },
        { title: 'Moteur Décisionnel & Calculs Serveur', description: 'Le tableau de bord présente six indicateurs clés consolidés (sessions actives, clients récents, taux de remplissage τ = N_confirmées / C_max) et cinq graphiques interactifs Chart.js synchronisés par filtres combinés.' },
        { title: 'Service d’Alertes en Temps Réel', description: 'Détection automatisée des points d’attention (points_attention_service.py) : sessions à risque (< 40 % de remplissage à J-7, danger), clients inactifs (≥ 6 mois, warning) et tendances d’activité (+5 % sur 3 mois).' },
        { title: 'Analyse Multivariée (ACP des Profils)', description: 'Matrice de 30 clients × 12 formations (484 inscriptions confirmées). Décomposition en valeurs propres (F1 = 18,5 %, F2 = 15,8 %) avec interprétation stricte par cos² (seuil de fiabilité ≥ 0,50) et contributions (analyse d’atypicité de Marjane Holding à F1 = -5,51).' },
        { title: 'Pipeline d’Exports Multi-Formats', description: 'Génération de fichiers CSV en utf-8-sig (sans corruption d’accents dans Excel), classeurs XLSX professionnels stylisés (openpyxl) et rapports de synthèse / feuilles d’émargement en PDF vectoriels (ReportLab).' },
      ],
      architecture: {
        title: 'Architecture logicielle & Trajet d’une requête',
        introduction: 'L’application sépare les pages, les routes web et API, les règles métier et l’accès aux données. Les calculs et les contrôles sont faits sur le serveur.',
        layers: [
          { title: '1. Navigateur & Présentation', description: 'Gabarits HTML Jinja2 stylisés avec Tailwind CSS et dynamisés par Alpine.js pour les interactions réactives (requêtes HTTP fetch, fenêtres modales, filtres instantanés).' },
          { title: '2. Flask — Routes & Blueprints', description: 'Réception des requêtes HTTP (GET, POST, PUT, DELETE), validation de l’authentification et application des décorateurs de contrôle d’accès RBAC par rôle.' },
          { title: '3. Couche Services Métier', description: 'Cœur applicatif réutilisable : validation des inscriptions (rejet HTTP 409 si session complète), filtrage des données par visibilité formateur, calcul des KPIs et module ACP.' },
          { title: '4. SQLAlchemy ORM & MySQL 8.0', description: 'Traduction des modèles Python en requêtes SQL optimisées avec migrations Alembic. Base MySQL 8.0 garantissant l’intégrité référentielle et les contraintes d’unicité.' },
        ],
      },
      keyDecisions: {
        title: 'Règles métier & Choix d’ingénierie',
        items: [
          { title: 'Vérifier les accès sur le serveur (RBAC)', description: 'Les rôles Administrateur, Gestionnaire et Formateur n’ont pas les mêmes droits. Le serveur vérifie systématiquement les accès côté backend ; masquer un bouton dans l’interface ne suffit pas.' },
          { title: 'Éviter les doubles inscriptions et gérer la capacité', description: 'Une personne ne peut pas s’inscrire deux fois à la même session. Seules les inscriptions confirmées comptent dans la capacité maximale ; une place sur la liste d’attente ne correspond pas encore à une place confirmée.' },
          { title: 'Appliquer des règles strictes sur le tableau de bord', description: 'Le serveur combine les filtres du tableau de bord. Le taux moyen compare rigoureusement les inscriptions confirmées à la capacité des sessions choisies.' },
        ],
      },
      contribution: 'J’ai conçu le modèle de données relationnel et développé l’ensemble de l’application en autonomie : modèles SQLAlchemy, services métier, tableau de bord dynamique, exports et outil d’ACP. Les captures utilisent le jeu de données de démonstration déterministe inclus dans le dépôt (les mêmes données à chaque fois). Elles ne montrent pas l’activité réelle de l’entreprise.',
      results: [
        { value: '6', label: 'indicateurs d’activité', detail: 'Sessions et clients actifs, participants formés, taux de remplissage, formations et formateurs mobilisés.' },
        { value: '5', label: 'graphiques interactifs', detail: 'Répartition par domaine, activité par client et formateur, inscriptions mensuelles et jauge de remplissage.' },
        { value: '166', label: 'tests dans le dépôt', detail: 'Le dépôt contient 166 fonctions de test. La dernière exécution disponible en rapporte 166 réussies ; la suite n’a pas été relancée pour cette vérification.' },
        { value: 'CSV · XLSX · PDF', label: 'formats d’export automatisés', detail: 'Feuilles d’émargement vectorielles ReportLab, classeurs openpyxl et exports CSV en utf-8-sig.' },
      ],
      limitations: [
        'Les exemples et captures s’appuient sur le jeu de démonstration du projet ; ils ne mesurent pas l’activité réelle de l’entreprise.',
        'L’ACP sert à explorer des profils dans le jeu de démonstration. Elle ne prédit pas les résultats futurs.',
        'La documentation propose la pagination côté serveur pour les grands volumes et des tests E2E automatisés comme perspectives d’évolution.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie',
        description: 'Galaxy Training Manager a permis de transformer une gestion dispersée sur tableurs en un système d’information robuste, modulaire et audité. Le projet démontre l’importance de la solidité du socle métier, de l’intégrité des données au niveau de la base et de la vérification continue par les tests automatisés.',
      },
      technologies: ['Python', 'Flask', 'Jinja2', 'Flask-Login', 'Flask-SQLAlchemy', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Chart.js', 'Pandas', 'NumPy', 'openpyxl', 'ReportLab', 'pytest'],
      repository: 'https://github.com/Godwin-08/GTM',
      documents: [
        { href: '/documents/projects/gtm-internship-report-fr.pdf', label: 'Rapport de stage en français (PDF)' },
      ],
      supervisors: [
        { name: 'Prince Baba Daouda Coulibaly', role: 'Encadrant professionnel · Galaxy Solutions', linkedinUrl: 'https://ma.linkedin.com/in/coulibaly-prince-baba-daouda' },
        { name: 'Nidal Lamghari', role: 'Encadrante académique · ENSA Khouribga', linkedinUrl: 'https://ma.linkedin.com/in/nidal-lamghari-12474b54' },
      ],
      gallery: [
        { src: '/images/projects/gtm-architecture-fonctionnelle.jpg', alt: 'Architecture fonctionnelle générale de GTM : Gestion, Analyse, Décision.', title: 'Architecture fonctionnelle', caption: 'Flux fonctionnel : Gestion opérationnelle (données brutes), Analyse (KPI et alertes), et Décision (relances, profils ACP).' },
        { src: '/images/projects/gtm-trajet-requete.jpg', alt: 'Trajet d’une requête dans GTM entre les différentes couches technologiques.', title: 'Cycle de vie d’une requête', caption: 'Trajet complet : Navigateur (Alpine.js) → Flask (Routes & RBAC) → Services métier → SQLAlchemy ORM → MySQL 8.0.' },
        { src: '/images/projects/gtm-mld.png', alt: 'Modèle logique de données (MLD) relationnel de Galaxy Training Manager sous MySQL, montrant les 9 tables et leurs contraintes de clés.', title: 'Modèle logique de données (MLD)', caption: 'Schéma relationnel normalisé (3NF) : 9 entités interconnectées, contraintes d’intégrité référentielle et contrainte d’unicité session–participant.' },
        { src: '/images/projects/gtm-dashboard-demo.png', alt: 'Tableau de bord de Galaxy Training Manager avec des indicateurs issus du jeu de démonstration.', title: 'Tableau de bord décisionnel', caption: 'Vue d’ensemble avec 6 indicateurs clés, filtres combinés et graphiques Chart.js.' },
        { src: '/images/projects/gtm-class-diagram.png', alt: 'Diagramme UML des classes de Galaxy Training Manager, avec les 9 entités relationnelles.', title: 'Modèle conceptuel & UML', caption: 'Diagramme de classes du projet montrant les entités et relations 3NF.' },
        { src: '/images/projects/gtm-sessions.png', alt: 'Liste des sessions de formation dans Galaxy Training Manager.', title: 'Suivi des sessions & Remplissage', caption: 'Vue opérationnelle des sessions avec statut dynamique et jauges de capacité.' },
        { src: '/images/projects/gtm-catalogue-formations.png', alt: 'Catalogue des formations affiché dans Galaxy Training Manager.', title: 'Catalogue des formations', caption: 'Gestion des formations réparties par domaines d’expertise.' },
      ],
    },
    en: {
      context: 'During my introductory internship at Galaxy Solutions (Mohammedia, Morocco), I designed and built Galaxy Training Manager autonomously. It brings together course catalogues, sessions, clients, trainers, learners, and registrations, while embedding decision-support analytics (real-time KPIs, operational alerts, and PCA multivariate analysis). The application is backed by a 3NF relational model in MySQL and validated by 166 Pytest tests. The examples on this page use the project’s demo dataset.',
      question: 'How can an application unify operational B2B training management and deliver reliable decision analytics while enforcing strict role-based access control and data integrity?',
      methodIntro: 'The project followed an engineering roadmap structured into three successive tiers (Foundation, Operations & Business, Analytics & Consolidation) to ensure data robustness and computational precision:',
      methodSteps: [
        { title: '3NF Relational Modeling & SQL Integrity', description: 'Designed a normalized 9-entity relational schema in MySQL 8.0. Enforced strict composite unique constraints on (session_id, participant_id) and (user_id) to eliminate duplicate registrations at the storage level.' },
        { title: 'Layered Architecture & RBAC Security', description: 'Strict separation between Models (SQLAlchemy), Business Services, REST API routes, and Jinja2 Blueprints. Two-tier RBAC (Admin, Manager, Trainer) with server-side Trainer isolation (HTTP 403) and 48h token-based onboarding via hmac.compare_digest.' },
        { title: 'Decision Engine & Server-Side Analytics', description: 'The dashboard displays six indicators and five charts. Filters let users choose a year, training area, client, or trainer with server-side computations.' },
        { title: 'Real-Time Alert Service', description: 'Automated monitoring service (points_attention_service.py) detecting 3 operational triggers: at-risk sessions (<40% fill rate within 7 days, danger), inactive clients (>= 6 months, warning), and quarterly trends.' },
        { title: 'Multivariate Analysis (Client PCA)', description: 'Processed a 30 clients x 12 courses matrix (484 confirmed registrations). Eigenvalue decomposition (F1=18.5%, F2=15.8%) with rigorous cos² filtering (reliability threshold >= 0.50) and contribution analysis.' },
        { title: 'Multi-Format Export Pipeline', description: 'Automated generation of raw CSVs (utf-8-sig encoded for Excel compatibility), branded multi-tab XLSX workbooks (openpyxl), and official vector PDF reports (ReportLab).' },
      ],
      architecture: {
        title: 'How the app is built',
        introduction: 'The app has separate parts for its pages, web and API routes, business rules, and data access. Checks and calculations run on the server.',
        layers: [
          { title: '1. Interface & Presentation', description: 'Jinja2 renders the HTML pages. Tailwind CSS styles them, and Alpine.js adds small browser interactions (fetch calls, modals, dynamic filters).' },
          { title: '2. Flask — Routes & Blueprints', description: 'HTTP request handling (GET, POST, PUT, DELETE), authentication checks, and RBAC decorator-based permission enforcement.' },
          { title: '3. Business Services Tier', description: 'Reusable core logic: registration validation (HTTP 409 rejection on full sessions), trainer visibility scoping, KPI calculations, and PCA computation.' },
          { title: '4. SQLAlchemy ORM & MySQL 8.0', description: 'SQLAlchemy connects the data models to MySQL with schema constraints and Alembic migrations.' },
        ],
      },
      keyDecisions: {
        title: 'Rules and design choices',
        items: [
          { title: 'Check access on the server (RBAC)', description: 'Administrator, Manager, and Trainer accounts have different access. The server checks each request; hiding a button is not enough.' },
          { title: 'Avoid invalid registrations and manage capacity', description: 'A learner cannot register twice for the same session. Confirmed registrations count towards the session limit. A place on the waitlist is not confirmed.' },
          { title: 'Use strict rules for dashboard values', description: 'The server applies the dashboard filters together. The average fill rate is based on confirmed registrations and the capacity of sessions in the selected group.' },
        ],
      },
      contribution: 'I worked on the relational data model, pages, business services, dashboard, exports, and PCA tool in complete autonomy. The screenshots use the deterministic demo dataset included in the repository (the same data each time). They do not show the company’s live activity.',
      results: [
        { value: '6', label: 'activity indicators', detail: 'Active sessions and clients, learners, average fill rate, courses, and trainers.' },
        { value: '5', label: 'interactive charts', detail: 'Activity by training area, client, and trainer, plus registrations and fill rate.' },
        { value: '166', label: 'tests in the repository', detail: 'The repository has 166 test functions. The latest available run records 166 passing tests; the suite was not rerun for this review.' },
        { value: 'CSV · XLSX · PDF', label: 'file formats', detail: 'For business lists, attendance sheets, and the dashboard summary.' },
      ],
      limitations: [
        'The examples and screenshots use the project’s demo dataset; they do not measure the company’s real activity.',
        'PCA explores profiles in the demo dataset. It does not predict future results.',
        'The project documentation suggests server-side pagination for very large datasets and automated end-to-end tests as future improvements.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'Galaxy Training Manager brings course, session, and registration management together with tools to track activity and export data. The project applies a relational data model and business rules for different user roles. The screenshots show demo data, not the company’s real activity.',
      },
      technologies: ['Python', 'Flask', 'Jinja2', 'Flask-Login', 'Flask-SQLAlchemy', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Chart.js', 'Pandas', 'NumPy', 'openpyxl', 'ReportLab', 'pytest'],
      repository: 'https://github.com/Godwin-08/GTM',
      documents: [
        { href: '/documents/projects/gtm-internship-report-fr.pdf', label: 'Internship report in French (PDF)' },
      ],
      supervisors: [
        { name: 'Prince Baba Daouda Coulibaly', role: 'Professional supervisor · Galaxy Solutions', linkedinUrl: 'https://ma.linkedin.com/in/coulibaly-prince-baba-daouda' },
        { name: 'Nidal Lamghari', role: 'Academic supervisor · ENSA Khouribga', linkedinUrl: 'https://ma.linkedin.com/in/nidal-lamghari-12474b54' },
      ],
      gallery: [
        { src: '/images/projects/gtm-architecture-fonctionnelle.jpg', alt: 'Functional architecture diagram of GTM: Management, Analysis, Decision.', title: 'Functional architecture', caption: 'Three-tier functional flow: Operational management (raw data), Analysis (KPIs & alerts), and Decision (follow-ups, PCA profiles).' },
        { src: '/images/projects/gtm-trajet-requete.jpg', alt: 'Request lifecycle diagram in GTM across architecture tiers.', title: 'Request lifecycle', caption: 'End-to-end path: Browser (Alpine.js) → Flask (Routes & RBAC) → Business Services → SQLAlchemy ORM → MySQL 8.0.' },
        { src: '/images/projects/gtm-mld.png', alt: 'Relational Logical Data Model (LDM / MLD) of Galaxy Training Manager in MySQL, detailing the 9 tables and foreign key constraints.', title: 'Logical Data Model (MLD)', caption: 'Normalized relational schema (3NF): 9 interconnected entities, referential integrity rules, and unique session-participant constraint.' },
        { src: '/images/projects/gtm-dashboard-demo.png', alt: 'Galaxy Training Manager dashboard with indicators from its demo dataset.', title: 'Executive dashboard', caption: 'Overview featuring 6 core indicators, multi-filters, and interactive Chart.js visualizations.' },
        { src: '/images/projects/gtm-class-diagram.png', alt: 'UML class diagram for Galaxy Training Manager, showing 9 relational entities.', title: 'Conceptual model & UML', caption: 'Project class diagram detailing 3NF entities and referential relationships.' },
        { src: '/images/projects/gtm-sessions.png', alt: 'Training session list in Galaxy Training Manager.', title: 'Session tracking & Capacity', caption: 'Operational session view with real-time status and capacity gauges.' },
        { src: '/images/projects/gtm-catalogue-formations.png', alt: 'Training catalogue displayed in Galaxy Training Manager.', title: 'Course catalogue', caption: 'Management of training courses categorized across functional domains.' },
      ],
    },
  },
  olist: {
    fr: {
      context: 'Ce projet étudie les données publiques d’Olist, une plateforme de vente en ligne brésilienne, de 2016 à 2018. Ses neuf tables décrivent les commandes, paiements, articles, produits, vendeurs, clients et avis. Le but est de préparer ces données pour étudier les livraisons, les avis et les montants des commandes.',
      question: 'Comment relier les tables sans compter une commande plusieurs fois, puis étudier les délais, les avis et les montants ?',
      featuredFinding: 'Pour 96 244 commandes avec les dates nécessaires, la livraison prend 12,1 jours en moyenne et 10 jours au milieu de la distribution. Parmi ces commandes, 6 531 sont arrivées après la date prévue, soit environ 6,8 %.',
      methodIntro: 'Le travail commence par la vérification des tables et des clés. Une commande peut avoir plusieurs articles et paiements. Je les regroupe donc avant de relier les tables, pour garder une ligne par commande dans l’analyse.',
      methodSteps: [
        { title: 'Vérifier les données', description: 'Contrôler les formats, les clés, les dates et les valeurs manquantes.' },
        { title: 'Garder une ligne par commande', description: 'Regrouper les articles et les paiements avant de relier les tables.' },
        { title: 'Calculer les indicateurs', description: 'Calculer les délais, les retards, les notes et les montants.' },
        { title: 'Lire les résultats avec prudence', description: 'Comparer les groupes sans prendre un lien observé pour une cause.' },
      ],
      contribution: 'Ce projet académique (module Traitement de Données, IID1, ENSA Khouribga) a été réalisé en binôme avec Maktou Azeddine. J’ai conçu et exécuté l’intégralité du pipeline technique : ingestion et nettoyage des 9 tables relationnelles, résolution des anomalies chronologiques et doublons, jointures sans perte, calcul vectorisé des indicateurs logistiques (délais réels vs estimés, taux de retard) et réalisation des analyses et graphiques du notebook final.',
      results: [],
      limitations: [
        'Huit commandes n’ont pas les dates nécessaires. Elles ne sont donc pas incluses dans les calculs de durée et de retard.',
        'Le graphique des notes ne montre pas le nombre de commandes dans chaque groupe. Il montre un lien observé, pas une cause. Il ne tient pas compte des autres facteurs qui peuvent influencer les notes.',
        'Le graphique des notes moyennes selon le statut de livraison est exclu, car ses valeurs n’ont pas été confirmées.',
        'Le classement des ventes par catégorie est exclu : le montant total d’une commande est associé à la catégorie de son premier article, ce qui ne donne pas les ventes exactes par catégorie.',
        'Les taux de retard par État ne sont pas présentés. Le nombre de commandes et la définition des groupes doivent encore être vérifiés. Les données n’expliquent pas non plus le rôle de la distance, des routes ou des transporteurs.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'Le regroupement des articles et des paiements avant les jointures permet de construire une table d’analyse au niveau de la commande et d’éviter les doubles comptages. Les données étudiées montrent des écarts de durée et de retard entre commandes, ainsi qu’une variation des notes selon la durée de livraison. Ces observations décrivent des associations dans le jeu de données et ne suffisent pas à établir leurs causes.',
      },
      documents: [
        { href: '/documents/projects/olist-report-fr.pdf', label: 'Rapport Olist en français (PDF)' },
      ],
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      repository: 'https://github.com/Godwin-08/Projet-Traitement-des-donn-es-',
      collaborators: [
        { name: 'Maktou Azeddine', role: 'Binôme du projet', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
      ],
      supervisors: [
        { name: 'Soukaina El Harouri', role: 'Encadrante du projet', linkedinUrl: 'https://ma.linkedin.com/in/soukaina-elharouri-5004a6262' },
      ],
      olistAnalysis: {
        dataModel: {
          title: 'Des tables liées autour de la commande',
          introduction: 'Le schéma présente neuf tables. La table des commandes sert de point de départ ; les lignes d’articles, les paiements et les avis peuvent être multiples pour une commande. Cette structure explique pourquoi les jointures doivent respecter le niveau de détail choisi.',
        },
        preparation: {
          title: 'Nettoyage et construction du jeu d’analyse',
          introduction: 'Le nettoyage réduit le nombre de lignes à chaque étape. Le but n’est pas seulement de retirer des données, mais de garder des commandes cohérentes pour comparer les durées et calculer des indicateurs sans double comptage.',
          steps: [
            { value: '99 441', title: 'Commandes initiales', description: 'Nombre de lignes dans la table initiale des commandes.' },
            { value: '99 275', title: 'Après le premier contrôle', description: '166 anomalies chronologiques sont retirées de la table initiale.' },
            { value: '96 313', title: 'Commandes livrées', description: 'Le jeu est filtré pour garder les commandes au statut « delivered ».' },
            { value: '96 252', title: 'Jeu d’analyse final', description: '61 incohérences supplémentaires sont retirées après le filtrage.' },
          ],
          conclusion: 'Les articles et les paiements sont agrégés au niveau de la commande avant les jointures. On obtient ainsi une table d’analyse avec une ligne par commande, adaptée aux indicateurs présentés ensuite.',
        },
        delivery: {
          title: 'Durée de livraison et statut de retard',
          introduction: 'La durée de livraison est le temps entre l’achat et la livraison. Le statut « en retard » compare la date réelle à la date estimée. Une livraison peut prendre du temps et rester à l’heure si la date prévue est plus tardive.',
          metrics: [
            { value: '12,1 jours', label: 'durée réelle moyenne', detail: 'Calculée sur les commandes avec les dates nécessaires.' },
            { value: '10 jours', label: 'durée réelle médiane', detail: 'La médiane est la valeur du milieu : la moitié des durées est inférieure ou égale à 10 jours.' },
            { value: '6 531', label: 'commandes en retard', detail: 'Sur 96 244 commandes avec les dates nécessaires.' },
            { value: '≈ 6,8 %', label: 'taux de retard observé', detail: '6 531 sur 96 244 ; les huit commandes sans date sont exclues.' },
          ],
        },
        satisfaction: {
          title: 'Durée de livraison et notes',
          introduction: 'La note moyenne est de 4,16 sur 5, à partir de 95 150 avis. Le graphique regroupe les commandes selon leur durée de livraison et compare la note moyenne de chaque groupe.',
          metrics: [
            { value: '4,16 / 5', label: 'note moyenne globale', detail: '95 150 avis avec une note renseignée.' },
          ],
        },
        financial: {
          title: 'Montants des commandes',
          introduction: 'Ces montants décrivent les commandes étudiées. La moyenne est plus élevée que la médiane, car quelques commandes sont très chères. La médiane, qui est la valeur du milieu, représente mieux une commande type.',
          indicators: [
            { value: '159,88 BRL', label: 'montant moyen par commande', detail: 'Frais de livraison inclus.' },
            { value: '105,28 BRL', label: 'montant médian par commande', detail: 'La médiane est la valeur du milieu. Frais de livraison inclus.' },
            { value: '≈ 13,2 M BRL', label: 'total des prix des articles', detail: 'Ce total ne représente ni un revenu net ni un bénéfice de la plateforme.' },
          ],
          note: 'Le montant total des frais de livraison n’est pas présenté. Le classement par catégorie est aussi écarté, car la préparation disponible ne relie pas chaque article à sa catégorie de façon fiable.',
        },
      },
      gallery: [
        {
          src: '/images/projects/olist-schema-relations.png',
          alt: 'Schéma relationnel des neuf tables Olist, dont orders, order_items, order_payments, order_reviews, customers, sellers et products.',
          title: 'Schéma des tables et de leurs relations',
          caption: 'Neuf tables reliées autour des commandes et de leurs entités associées.',
          analysis: {
            question: 'Comment les tables doivent-elles être reliées pour analyser une commande sans compter plusieurs fois ses montants ?',
            reading: 'Le schéma montre les tables, leurs clés et les relations entre les commandes, les clients, les avis, les paiements, les articles, les vendeurs et les produits. Les lignes d’articles et les paiements peuvent avoir plusieurs enregistrements pour une même commande.',
            observation: 'La table orders se trouve au centre du parcours. Les articles, les paiements et les avis sont dans des tables séparées ; ils ne correspondent donc pas toujours à une seule ligne par commande.',
            interpretation: 'Ce niveau de détail est important. Relier directement des tables avec plusieurs lignes par commande peut compter une commande plusieurs fois et augmenter les totaux. Il vaut mieux regrouper les articles et les paiements avant de relier les tables.',
            businessInterest: 'Ce contrôle rend les calculs par commande plus fiables avant d’étudier les livraisons, les avis ou les montants.',
            limitation: 'Le schéma montre comment les tables doivent être reliées. Il ne prouve pas que toutes les lignes sont complètes ni que chaque lien a fonctionné.',
          },
        },
        {
          src: '/images/projects/olist-delais-livraison.png',
          alt: 'Boîtes à moustaches de la durée de livraison en jours, séparée entre commandes à temps et commandes en retard.',
          title: 'Durée de livraison selon le statut',
          caption: 'Dans ce jeu de données, les commandes en retard ont souvent une durée plus longue.',
          analysis: {
            question: 'Les commandes en retard prennent-elles aussi plus de temps à arriver ?',
            reading: 'L’axe horizontal sépare les commandes livrées à temps de celles livrées après la date estimée. L’axe vertical montre le nombre de jours. Chaque boîte montre la valeur du milieu et l’écart des durées ; les points isolés sont des valeurs très éloignées.',
            observation: 'La valeur du milieu et la boîte du groupe « en retard » sont plus hautes que celles du groupe « à temps ». Des valeurs très éloignées apparaissent dans les deux groupes, surtout pour les commandes en retard.',
            interpretation: 'Dans les commandes étudiées, les retards vont souvent avec une durée plus longue. Mais le retard dépend de la date estimée : le graphique compare les groupes, sans expliquer pourquoi la date a été dépassée.',
            businessInterest: 'Cette vue distingue la durée réelle du respect de la date annoncée. Pour comprendre les écarts, il faudrait aussi étudier les dates estimées, les transporteurs et d’autres données.',
            limitation: 'Le nombre de commandes dans chaque groupe n’est pas indiqué. Le graphique ne montre pas les causes ni les conditions de chaque commande. Les valeurs très éloignées influencent aussi la lecture.',
          },
        },
        {
          src: '/images/projects/olist-delai-note.png',
          alt: 'Graphique en français des notes moyennes sur cinq selon cinq tranches de durée de livraison, de 0 à 7 jours à plus de 30 jours.',
          title: 'Notes moyennes selon la durée réelle',
          caption: 'Le graphique montre une moyenne plus basse dans les tranches de livraison les plus longues.',
          analysis: {
            question: 'La note moyenne observée varie-t-elle selon le temps écoulé entre l’achat et la livraison ?',
            reading: 'L’axe horizontal présente cinq tranches de durée : 0–7, 8–14, 15–21, 22–30 et plus de 30 jours. L’axe vertical indique la note moyenne, sur une échelle de 0 à 5.',
            observation: 'Les barres baissent globalement quand la durée augmente. La baisse est plus visible dans les tranches de 22–30 jours et de plus de 30 jours. Les valeurs précises ne sont pas inscrites sur les barres.',
            interpretation: 'Cette figure montre qu’une livraison plus longue va souvent avec une note moyenne plus basse dans les données étudiées. Cela ne prouve pas que la durée ou le retard cause une insatisfaction.',
            businessInterest: 'On peut vérifier si les avis des commandes les plus longues parlent aussi de la livraison. Il faut étudier d’autres facteurs avant de proposer une action.',
            limitation: 'Le nombre de commandes dans chaque tranche n’est pas affiché. La figure ne montre pas l’écart entre les notes et ne tient pas compte d’autres facteurs, comme le produit ou l’expérience d’achat.',
          },
        },
      ],
    },
    en: {
      context: 'This project studies public data from Olist, a Brazilian online marketplace, from 2016 to 2018. Its nine tables describe orders, payments, items, products, sellers, customers, and reviews. The goal is to prepare the data and study deliveries, reviews, and order amounts.',
      question: 'How can we link the tables without counting an order more than once, then study delivery times, reviews, and amounts?',
      featuredFinding: 'For 96,244 orders with the needed dates, delivery took 12.1 days on average and 10 days at the middle value. Of these orders, 6,531 arrived after the estimated date, or about 6.8%.',
      methodIntro: 'First, I checked the tables and keys. One order can have several items and payments. I grouped them before joining the tables, so the analysis has one row for each order.',
      methodSteps: [
        { title: 'Check the data', description: 'Check data formats, keys, dates, and missing values.' },
        { title: 'Keep one row per order', description: 'Group items and payments before joining the tables.' },
        { title: 'Calculate indicators', description: 'Calculate delivery times, late status, ratings, and amounts.' },
        { title: 'Read results with care', description: 'Compare groups without treating a link as proof of cause.' },
      ],
      contribution: 'This academic project (Data Processing course, IID1, ENSA Khouribga) was conducted in pair with Maktou Azeddine. I designed and executed the entire technical pipeline: ingestion and sanitization of the 9 relational tables, resolution of chronological anomalies and duplicate records, zero-loss joins, vectorized computation of logistical metrics (actual vs estimated delivery, delay rates), and creation of the exploratory analyses and charts in the final notebook.',
      results: [],
      limitations: [
        'Eight orders do not have the dates needed for these measures. They are left out of the delivery-time and late-order calculations.',
        'The rating chart does not show how many orders are in each group. It shows a link in the data, not a cause. It also does not check other things that may affect ratings.',
        'The chart of average ratings by delivery status is not shown because its values have not been confirmed.',
        'The sales ranking by category is not shown: the full order amount is linked to the first item category, so it does not measure sales by category correctly.',
        'Late-order rates by state are not shown. The group sizes and group rules need more checks. The data also do not explain the role of distance, roads, or delivery companies.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'Grouping items and payments before joining the tables creates an order-level analysis table and helps avoid double counting. The data show differences in delivery time and late status, as well as changes in ratings across delivery-time groups. These are patterns in the dataset; they do not explain what caused them.',
      },
      documents: [
        { href: '/documents/projects/olist-report-fr.pdf', label: 'Olist report in French (PDF)' },
      ],
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      repository: 'https://github.com/Godwin-08/Projet-Traitement-des-donn-es-',
      collaborators: [
        { name: 'Maktou Azeddine', role: 'Project teammate', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
      ],
      supervisors: [
        { name: 'Soukaina El Harouri', role: 'Project supervisor', linkedinUrl: 'https://ma.linkedin.com/in/soukaina-elharouri-5004a6262' },
      ],
      olistAnalysis: {
        dataModel: {
          title: 'Tables linked around the order',
          introduction: 'The diagram shows nine tables. The orders table is at the centre. One order can have several items, payments, or reviews. The tables must be joined with care to avoid counting the same order more than once.',
        },
        preparation: {
          title: 'Preparing the data for analysis',
          introduction: 'The number of rows changes as the data are checked. The aim is to keep usable orders for comparison and avoid counting an order more than once.',
          steps: [
            { value: '99,441', title: 'Initial orders', description: 'Number of rows in the initial orders table.' },
            { value: '99,275', title: 'After the first check', description: '166 records with date problems are removed.' },
            { value: '96,313', title: 'Delivered orders', description: 'Only orders marked as delivered are kept.' },
            { value: '96,252', title: 'Final analysis dataset', description: 'A further 61 records that do not match are removed.' },
          ],
          conclusion: 'Items and payments are grouped by order before the tables are joined. The final table has one row per order and is ready for the next calculations.',
        },
        delivery: {
          title: 'Delivery time and late status',
          introduction: 'Delivery time is the time between purchase and delivery. Late status compares the actual date with the estimated date. A delivery can take a long time and still be on time if the estimated date is later.',
          metrics: [
            { value: '12.1 days', label: 'average actual delivery time', detail: 'Calculated for orders with the required dates.' },
            { value: '10 days', label: 'middle delivery time', detail: 'Half of the observed times are 10 days or less.' },
            { value: '6,531', label: 'late orders', detail: 'Out of 96,244 orders with the required dates.' },
            { value: '≈ 6.8%', label: 'observed late rate', detail: '6,531 out of 96,244; the eight orders without dates are excluded.' },
          ],
        },
        satisfaction: {
          title: 'Delivery time and ratings',
          introduction: 'The average rating is 4.16 out of 5, based on 95,150 ratings. The chart groups orders by delivery time and compares the average rating in each group.',
          metrics: [
            { value: '4.16 / 5', label: 'overall average rating', detail: '95,150 reviews with a recorded score.' },
          ],
        },
        financial: {
          title: 'Order amounts',
          introduction: 'These amounts describe the orders in this dataset. The average is higher than the middle value because some orders are expensive. The middle value better represents a typical order.',
          indicators: [
            { value: '159.88 BRL', label: 'average amount per order', detail: 'Shipping is included.' },
            { value: '105.28 BRL', label: 'median amount per order', detail: 'Shipping is included.' },
            { value: '≈ BRL 13.2m', label: 'total item prices', detail: 'This is only the sum of item prices, not the marketplace’s net revenue or profit.' },
          ],
          note: 'The total shipping cost is not shown. The category ranking is also left out because the available data preparation does not link each item to its category reliably.',
        },
      },
      gallery: [
        {
          src: '/images/projects/olist-schema-relations.png',
          alt: 'Relational diagram of the nine Olist tables, including orders, order_items, order_payments, order_reviews, customers, sellers, and products.',
          title: 'How the tables are linked',
          caption: 'Nine tables connected through orders and related information.',
          analysis: {
            question: 'How can we join the tables without counting an order or its amounts more than once?',
            reading: 'The diagram shows tables and links between orders, customers, reviews, payments, items, sellers, and products. An order can have several items or payments.',
            observation: 'The orders table is at the centre. Items, payments, and reviews are in separate tables, and there may be several rows for one order.',
            interpretation: 'If we join these tables without care, an order can appear several times and totals can become too high. Grouping items and payments by order first helps avoid this problem.',
            businessInterest: 'This check helps make order calculations more reliable before studying delivery, reviews, or amounts.',
            limitation: 'The diagram shows how the tables are meant to connect. It does not prove that all rows are complete or that every join worked.',
          },
        },
        {
          src: '/images/projects/olist-delais-livraison.png',
          alt: 'Box plots of delivery time in days, split between on-time and late orders. The chart labels are in French.',
          title: 'Delivery time by order status',
          caption: 'In this dataset, late orders usually took longer to arrive.',
          analysis: {
            question: 'Do late orders also take longer to arrive?',
            reading: 'The horizontal axis shows orders delivered on time or after the estimated date. The vertical axis shows days. Each box shows the middle and spread of a group. Separate dots show very different values.',
            observation: 'The middle value and box are higher for late orders. Both groups have very high values, with more in the late group.',
            interpretation: 'In this dataset, late orders usually took longer to arrive. The chart compares orders with their estimated dates, but it does not explain why they were late.',
            businessInterest: 'This view separates delivery time from meeting the estimated date. We would need to study estimates, delivery companies, and other data to understand the difference.',
            limitation: 'The chart does not show the number of orders in each group or the reasons for delays. Very high values also affect the spread.',
          },
        },
        {
          src: '/images/projects/olist-delai-note.png',
          alt: 'Chart in French of average ratings out of five across five delivery-time groups, from 0–7 days to over 30 days.',
          title: 'Average rating by delivery time',
          caption: 'The chart shows a lower average rating in the longest delivery-time groups.',
          analysis: {
            question: 'Does the average rating change with delivery time?',
            reading: 'The chart has five time groups: 0–7, 8–14, 15–21, 22–30, and over 30 days. The vertical axis shows the average rating from 0 to 5.',
            observation: 'The bars generally get lower as delivery time increases. The drop is clearer for 22–30 days and over 30 days. Exact values are not shown.',
            interpretation: 'The chart shows that longer delivery times appear with lower average ratings in this dataset. This is a link, not proof that long delivery times cause lower ratings.',
            businessInterest: 'We could check whether customer comments in the longest-time groups mention delivery. Other factors should be checked before choosing an action.',
            limitation: 'The chart does not show the number of orders or the spread of ratings in each group. It also does not account for the product or shopping experience.',
          },
        },
      ],
    },
  },
  afc: {
    fr: {
      context: 'Ce projet étudie des offres d’emploi publiées sur LinkedIn en 2023 et 2024. Il montre comment les compétences citées se répartissent entre six domaines professionnels.',
      question: 'Quelles compétences sont citées dans les offres de chaque domaine ?',
      featuredFinding: 'Le tableau compte 25 955 mentions de domaines et de compétences. Le test global donne χ² = 67 617,28 (170 degrés de liberté). Le premier plan montre 56,2 % de l’inertie, une mesure des tendances dans les données ; les trois premiers axes en montrent environ 81 %.',
      dataConstruction: 'Le tableau de contingence (un tableau de comptage) compare 6 domaines et 35 compétences, soit 210 paires possibles. Il compte 25 955 mentions dans les offres étudiées. Une offre peut citer plusieurs compétences : le nombre de mentions n’est donc pas le nombre d’offres.',
      methodIntro: 'L’AFC compare les résultats observés à ceux attendus si les domaines et les compétences n’étaient pas liés. On utilise un tableau de comptage, on ajuste les écarts, puis on calcule les axes et la position des points.',
      methodSteps: [
        { title: 'Préparer les données', description: 'Relier les offres aux compétences, puis garder les six domaines et les 35 compétences étudiés.' },
        { title: 'Construire le tableau', description: 'Compter chaque paire domaine–compétence dans un tableau de 6 lignes et 35 colonnes.' },
        { title: 'Comparer les résultats', description: 'Comparer les nombres observés à ceux attendus si les domaines et les compétences étaient indépendants. Le test χ² porte sur le tableau entier.' },
        { title: 'Calculer et vérifier les axes', description: 'Ajuster les écarts, calculer les axes, puis vérifier les valeurs, les positions et les cos².' },
      ],
      contribution: 'Ce projet académique a été mené en binôme avec Mohammed Sadik sous la supervision du Pr. Ahmed Aghrich. J’ai développé l’intégralité de l’implémentation logicielle et algorithmique en Python : vectorisation NumPy des 8 étapes du pipeline (de la contingence au biplot), décomposition SVD, calcul automatisé des métriques d’inertie, des contributions (CTR) et de la qualité de projection (cos²).',
      results: [
        { value: '6 × 35', label: 'domaines et compétences', detail: '210 paires possibles dans le tableau de comptage.' },
        { value: '25 955', label: 'mentions de compétences', detail: 'Mentions comptées dans les offres des six domaines.' },
        { value: 'χ² = 67 617,28', label: 'test global · 170 ddl', detail: 'Le test porte sur l’ensemble du tableau.' },
        { value: '2,6052', label: 'inertie totale', detail: 'Mesure de la tendance totale étudiée.' },
        { value: 'F1 29,2 % · F2 27,0 %', label: 'inertie par axe', detail: 'Part montrée par chacun des deux premiers axes.' },
        { value: '56,2 %', label: 'inertie sur les axes 1–2', detail: 'Les axes suivants montrent les 43,8 % restants.' },
      ],
      limitations: [
        'L’analyse décrit uniquement les offres présentes dans ce jeu de données. Elle ne prédit pas les besoins futurs et ne représente pas tout le marché du travail.',
        'Le test du χ² donne un résultat global sur le tableau. Il ne montre pas que chaque paire domaine–compétence est liée.',
        'Le plan F1–F2 montre 56,2 % de l’inertie. Les points avec un cos² faible sont donc à lire avec prudence.',
        'Le cos² indique si un domaine est bien représenté sur le plan. Il ne mesure ni son importance ni la force de son lien avec une compétence.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'L’AFC résume les mentions de compétences selon six domaines professionnels et met en évidence des tendances dans les offres étudiées. Le plan des deux premiers axes en montre 56,2 %, ce qui en fait une synthèse partielle. Les résultats orientent l’exploration des données, mais ne permettent ni de décrire tout le marché ni d’affirmer un lien pour chaque paire domaine–compétence.',
      },
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
      repository: 'https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances',
      documents: [
        { href: '/documents/projects/afc-methodology-presentation-fr.pdf', label: 'Présentation méthodologique en français (exemple fictif, PDF)' },
      ],
      collaborators: [
        { name: 'Mohammed Sadik', role: 'Partie théorique', linkedinUrl: 'https://ma.linkedin.com/in/mohammed-sadik-1175b12b2' },
      ],
      supervisors: [
        { name: 'Ahmed Aghrich', role: 'Encadrement du projet', linkedinUrl: 'https://ma.linkedin.com/in/ahmed-aghriche-b89394109' },
      ],
      gallery: [
        {
          src: '/images/projects/afc-biplot-lisible.png',
          alt: 'Carte des six domaines et des compétences. Les points dont le cos² est sous 0,5 sont visibles, mais plus clairs et sans étiquette.',
          title: 'Carte des domaines et compétences',
          caption: 'Cette image plus lisible garde les mêmes positions. Les points avec un cos² inférieur à 0,5 restent visibles, mais sans étiquette. F1 et F2 montrent 56,2 % de l’inertie.',
          analysis: {
            question: 'Où se trouvent les domaines et les compétences sur les deux premiers axes ?',
            reading: 'Les losanges montrent les domaines et les points montrent les compétences. Les points proches ont des positions similaires sur la carte. Ceux dont le cos² est sous 0,5 sont plus clairs et sans étiquette.',
            observation: 'Finance & Compta est près de Finance et Accounting/Auditing. Commerce & Marketing est près de Sales et Business Development. Certains autres points sont moins bien représentés sur cette carte.',
            interpretation: 'Ces positions montrent des tendances dans les offres étudiées. Elles ne prouvent pas un lien unique ni un résultat clair pour chaque paire.',
            businessInterest: 'Cette carte aide à repérer les compétences citées dans différents domaines. Elle peut donner des pistes pour le recrutement ou la formation, à vérifier avec d’autres données.',
            limitation: 'La carte montre 56,2 % de l’inertie. Finance & Compta est bien représenté (cos² ≈ 0,994), mais Tech & Ingénierie (≈ 0,437) et Data & Analyse (≈ 0,208) le sont moins. Le cos² mesure la qualité de représentation, pas la force du lien.',
          },
        },
        {
          src: '/images/projects/afc-screeplot.png',
          alt: 'Graphique des axes : F1 montre 29,2 % de l’inertie, F2 27,0 %, et les deux axes ensemble 56,2 %.',
          title: 'Inertie montrée par chaque axe',
          caption: 'Les barres montrent la part de chaque axe. La ligne orange montre le total. Les trois premiers axes atteignent environ 81 %.',
          analysis: {
            question: 'Quelle part de l’inertie est montrée par les axes de la carte ?',
            reading: 'Chaque barre montre un axe. La ligne orange montre le total atteint. La zone colorée indique les deux premiers axes.',
            observation: 'F1 montre 29,2 % et F2 27,0 %, soit 56,2 % ensemble. Le troisième axe ajoute 24,8 points, pour atteindre environ 81 %.',
            interpretation: 'Le plan F1–F2 donne un résumé visuel utile, mais il ne montre pas toutes les tendances des données.',
            businessInterest: 'La carte aide à voir les tendances principales et la part des données qu’elle ne montre pas.',
            limitation: 'Les axes suivants montrent encore 43,8 % de l’inertie. Il faut donc rester prudent avec les conclusions basées seulement sur cette carte.',
          },
        },
        {
          src: '/images/projects/afc-qualite-representation.png',
          alt: 'Scores cos² des six domaines sur F1–F2 : Finance et Comptabilité 0,9942, Commerce et Marketing 0,8137, Technique et Ingénierie 0,4368, Gestion de Projet 0,2504, Data et Analyse 0,2082, RH et Recrutement 0,0975.',
          title: 'Qualité de représentation sur la carte',
          caption: 'La ligne orange marque 0,5. Le cos² indique si chaque domaine est bien représenté sur F1–F2.',
          analysis: {
            question: 'Quels domaines sont les mieux représentés sur F1 et F2 ?',
            reading: 'Chaque barre montre le cos² d’un domaine. La ligne pointillée à 0,5 est un repère, pas un test statistique.',
            observation: 'Finance & Compta obtient 0,9942 et Commerce & Marketing 0,8137. Tech & Ingénierie obtient 0,4368, Data & Analyse 0,2082, Gestion de Projet 0,2504 et RH & Recrutement 0,0975.',
            interpretation: 'Les deux premiers domaines sont bien représentés. Les autres, surtout Data & Analyse et RH, le sont moins. Leur position donne donc une image moins complète.',
            businessInterest: 'Le cos² aide à savoir quelles positions sont plus faciles à lire et quand d’autres axes peuvent être utiles.',
            limitation: 'Un cos² élevé ne signifie pas qu’un domaine est plus important ou plus lié à une compétence. Il indique seulement si le domaine est bien représenté sur ces deux axes.',
          },
        },
      ],
    },
    en: {
      context: 'This project studies LinkedIn job ads from 2023 and 2024. It looks at the skills named in the ads across six areas of work.',
      question: 'Which skills appear in the ads for each area of work?',
      featuredFinding: 'The table counts 25,955 mentions of areas and skills. The overall test gives χ² = 67,617.28 (170 degrees of freedom). The first map shows 56.2% of the total inertia, a measure of patterns in the data. The first three axes show about 81%.',
      dataConstruction: 'The contingency table (a table of counts) compares 6 fields and 35 skills, making 210 possible pairs. It counts 25,955 mentions in the job ads studied. One ad can name several skills, so the number of mentions is not the number of ads.',
      methodIntro: 'Correspondence Analysis compares the patterns we see with patterns expected if areas and skills were not linked. We use a count table, adjust the differences, and use singular value decomposition, a calculation that finds the main axes and points.',
      methodSteps: [
        { title: 'Prepare the data', description: 'Link each job ad to its skills, then keep the six areas and 35 skills in the study.' },
        { title: 'Build the count table', description: 'Count each area–skill pair in a table with 6 rows and 35 columns.' },
        { title: 'Check the overall difference', description: 'Compare the counts with values expected if the areas and skills were not linked. The χ² test checks the whole table, not each pair.' },
        { title: 'Calculate and check the axes', description: 'Adjust the differences, calculate the axes, and check the values, points, and cos² scores. Cos² shows how well a point appears on the map.' },
      ],
      contribution: 'This academic project was conducted in pair with Mohammed Sadik under the supervision of Prof. Ahmed Aghrich. I took full ownership of the software and algorithmic implementation in Python: NumPy vectorization of the 8 pipeline steps (from contingency table to final biplot), SVD decomposition, automated computation of inertia metrics, contributions (CTR), and projection quality (cos²).',
      results: [
        { value: '6 × 35', label: 'areas and skills', detail: '210 possible pairs in the count table.' },
        { value: '25,955', label: 'skill mentions', detail: 'Mentions of skills in ads for the six areas.' },
        { value: 'χ² = 67,617.28', label: 'overall test · 170 df', detail: 'The test checks the whole table.' },
        { value: '2.6052', label: 'total inertia', detail: 'A measure of the full pattern in the analysis.' },
        { value: 'F1 29.2% · F2 27.0%', label: 'inertia by axis', detail: 'Share shown by each of the first two axes.' },
        { value: '56.2%', label: 'inertia on axes 1–2', detail: 'The later axes show the remaining 43.8%.' },
      ],
      limitations: [
        'The analysis describes only the ads in this dataset. It does not predict future needs or represent the whole job market.',
        'The χ² test is a global test of the whole table. It does not show that each field–skill pair has a clear link.',
        'The F1–F2 map shows 56.2% of the total inertia. Read points with a low cos² score with care.',
        'Cos² shows how well an area appears on the map. It does not show how important the area is or how strong its link to a skill is.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'Correspondence Analysis summarises skill mentions across six areas of work and shows patterns in the job ads studied. The first two axes show 56.2% of the total inertia, so the map is only a partial summary. The results can guide further data exploration, but they do not represent the whole job market or prove a link for every area–skill pair.',
      },
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
      repository: 'https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances',
      documents: [
        { href: '/documents/projects/afc-methodology-presentation-fr.pdf', label: 'Method presentation in French (fictional example, PDF)' },
      ],
      collaborators: [
        { name: 'Mohammed Sadik', role: 'Theory', linkedinUrl: 'https://ma.linkedin.com/in/mohammed-sadik-1175b12b2' },
      ],
      supervisors: [
        { name: 'Ahmed Aghrich', role: 'Project supervisor', linkedinUrl: 'https://ma.linkedin.com/in/ahmed-aghriche-b89394109' },
      ],
      gallery: [
        {
          src: '/images/projects/afc-biplot-lisible.png',
          alt: 'Biplot of six professional fields and skills. Points with cos² below 0.5 are visible but faded and have no labels.',
          title: 'Map of areas and skills',
          caption: 'This clearer image uses the same points. Points with cos² below 0.5 are still shown, but without labels. F1 and F2 show 56.2% of the total inertia.',
          analysis: {
            question: 'Where do the areas and skills appear on the first two axes?',
            reading: 'Diamonds show areas and dots show skills. Nearby points have similar positions on this map. Points with cos² below 0.5 are faded and have no label.',
            observation: 'Finance & Accounting is near Finance and Accounting/Auditing. Commerce & Marketing is near Sales and Business Development. Some other points are not shown well on this map.',
            interpretation: 'These positions show patterns in the job ads. They do not prove an exclusive link or a clear result for every pair.',
            businessInterest: 'This map helps explore which skills appear in different areas. It can suggest questions about hiring or training, which need more data to check.',
            limitation: 'The map shows 56.2% of the total inertia. Finance & Accounting is shown well (cos² ≈ 0.994), but Technology & Engineering (≈ 0.437) and Data & Analysis (≈ 0.208) are less clear. Cos² measures how well a point appears, not how strong a link is.',
          },
        },
        {
          src: '/images/projects/afc-screeplot.png',
          alt: 'Scree plot: F1 shows 29.2% of inertia, F2 27.0%, and both axes together 56.2%.',
          title: 'Inertia shown by each axis',
          caption: 'The bars show the share for each axis. The orange line shows the running total. The first three axes show about 81%.',
          analysis: {
            question: 'How much of the total inertia do the map axes show?',
            reading: 'Each bar shows one axis. The orange line shows the total so far. The shaded area marks the first two axes.',
            observation: 'F1 shows 29.2% and F2 shows 27.0%, or 56.2% together. The third axis adds 24.8 points, bringing the total to about 81%.',
            interpretation: 'The F1–F2 map is a useful summary, but it does not show all the patterns in the data.',
            businessInterest: 'The chart shows the main patterns and how much of the data is not shown on the two-axis map.',
            limitation: 'The later axes still show 43.8% of the total inertia. Conclusions from the two-axis map alone need care.',
          },
        },
        {
          src: '/images/projects/afc-qualite-representation.png',
          alt: 'Cos² scores for six areas on axes F1–F2: Finance and Accounting 0.9942, Commerce and Marketing 0.8137, Technology and Engineering 0.4368, Project Management 0.2504, Data and Analysis 0.2082, HR and Recruitment 0.0975.',
          title: 'How well each area appears on the map',
          caption: 'The orange line marks 0.5. Cos² shows how well each area appears on axes F1–F2.',
          analysis: {
            question: 'Which areas appear best on the F1 and F2 map?',
            reading: 'Each bar shows the cos² score for an area. The dotted line at 0.5 is a guide, not a test.',
            observation: 'Finance & Accounting scores 0.9942 and Commerce & Marketing 0.8137. Technology & Engineering scores 0.4368, Data & Analysis 0.2082, Project Management 0.2504, and HR & Recruitment 0.0975.',
            interpretation: 'The first two areas appear clearly on this map. Data & Analysis and HR appear less clearly, so the map gives a less complete view of them.',
            businessInterest: 'Cos² helps show which points are easier to read and when other axes may help.',
            limitation: 'A high cos² does not mean that an area is more important or has a stronger link to a skill. It only shows how well the area appears on these two axes.',
          },
        },
      ],
    },
  },
  acp: {
    fr: {
      context: 'Ce projet utilise l’analyse en composantes principales (ACP) pour étudier 169 pays à partir de neuf indicateurs économiques et de santé. L’analyse prépare les données, met les indicateurs à la même échelle et compare les profils des pays.',
      question: 'Comment résumer neuf indicateurs économiques et de santé pour comparer les pays ?',
      featuredFinding: 'Les deux premiers axes expliquent 63,86 % de l’inertie, c’est-à-dire de la variation résumée par l’analyse : 47,25 % pour F1 et 16,61 % pour F2. Cette carte aide à explorer les données, mais ne les montre pas toutes.',
      methodIntro: 'Le notebook charge les indicateurs et retire les lignes avec des valeurs manquantes. Il met ensuite les indicateurs à la même échelle, puis calcule et affiche les composantes principales. L’interprétation tient compte de la part d’inertie et de la qualité de représentation sur le plan F1 × F2.',
      methodSteps: [
        { title: 'Préparer les données', description: 'Charger le tableau des pays et retirer les lignes avec des valeurs manquantes.' },
        { title: 'Mettre les indicateurs à la même échelle', description: 'Ajuster les valeurs pour pouvoir comparer des mesures dans différentes unités.' },
        { title: 'Calculer les composantes principales', description: 'Étudier la matrice de corrélation et les valeurs propres, qui aident à construire les axes.' },
        { title: 'Lire les cartes', description: 'Étudier les cartes des pays et des indicateurs, puis vérifier leur qualité de représentation sur F1 × F2.' },
      ],
      contribution: 'Le notebook documente une chaîne d’analyse en Python : retrait des lignes avec des valeurs manquantes, standardisation des neuf indicateurs, calcul des composantes principales, visualisation des pays et des variables, puis calcul des contributions et de la qualité de représentation (cos²).',
      results: [
        { value: '169', label: 'pays analysés', detail: 'Neuf indicateurs économiques et sanitaires ont été retenus.' },
        { value: '47,25 %', label: 'inertie expliquée par F1', detail: 'Cet axe oppose surtout le revenu et l’espérance de vie à la mortalité infantile et à la fécondité.' },
        { value: '63,86 %', label: 'inertie cumulée F1 + F2', detail: 'F2 explique 16,61 %. Les axes suivants portent encore 36,14 %.' },
      ],
      limitations: [
        'Les lignes avec des valeurs manquantes sont retirées avant les calculs. Les résultats décrivent seulement les lignes conservées.',
        'Les deux premiers axes expliquent 63,86 % de l’inertie. Le plan F1 × F2 ne montre pas toutes les informations.',
        'Certains pays et indicateurs sont moins bien représentés sur la carte. Il faut donc lire leur position avec prudence.',
        'Cette analyse décrit les données. Elle ne prouve pas une cause et ne prédit pas les résultats futurs.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'L’ACP réduit neuf indicateurs à quelques axes pour comparer les profils de 169 pays. Les deux premiers résument 63,86 % de l’inertie et offrent une vue d’ensemble utile, mais partielle. Cette analyse exploratoire aide à repérer des tendances sans établir de causalité ni prédire les résultats futurs.',
      },
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
      repository: 'https://github.com/Godwin-08/ACP',
      supervisors: [
        { name: 'Ahmed Aghrich', role: 'Encadrement du projet', linkedinUrl: 'https://ma.linkedin.com/in/ahmed-aghriche-b89394109' },
      ],
      gallery: [
        {
          src: '/images/projects/acp-plan-factoriel-pays.png',
          alt: 'Carte des pays sur les axes F1 et F2, à partir d’indicateurs économiques et de santé.',
          title: 'Plan factoriel des pays (F1 × F2)',
          caption: 'Dispersion des 169 pays sur les deux premiers axes capturant 63,86 % de l’inertie totale.',
          analysis: {
            question: 'Comment les 169 pays se positionnent-ils et se différencient-ils selon leur profil économique et sanitaire ?',
            reading: 'L’axe horizontal représente F1 (47,25 % d’inertie) et l’axe vertical F2 (16,61 %). Chaque point correspond à un pays projeté. La proximité de deux points indique des profils socio-économiques proches sur ce plan.',
            observation: 'F1 sépare nettement les pays développés à haut revenu, fort PIB/habitant et forte espérance de vie (à droite) des pays à forte mortalité infantile et fécondité élevée (à gauche). F2 discrimine verticalement l’intensité des flux commerciaux (exportations/importations).',
            interpretation: 'Le premier axe structure un gradient majeur de développement humain et de richesse matérielle, tandis que le second axe reflète le degré d’ouverture commerciale des économies.',
            businessInterest: 'Cette lecture aide à comparer les profils sur les deux axes. Le notebook ne réalise ni segmentation des pays ni ciblage d’aides ou de marchés.',
            limitation: '36,14 % de l’inertie reste portée par les axes suivants. Deux pays visuellement proches sur F1-F2 peuvent différer sur les dimensions F3 à F9 si leur cos² est faible.',
          },
        },
        {
          src: '/images/projects/acp-correlation-matrice.png',
          alt: 'Matrice de corrélation linéaire entre neuf indicateurs économiques et de santé.',
          title: 'Matrice de corrélation',
          caption: 'Interdépendances linéaires entre indicateurs avant réduction de dimension par ACP.',
          analysis: {
            question: 'Quelles sont les corrélations et redondances linéaires entre les 9 indicateurs socio-économiques étudiés ?',
            reading: 'Heatmap des coefficients de corrélation, arrondis à une décimale, entre -1 (bleu/froid) et +1 (chaud/rouge). La diagonale affichée est arrondie à 1 ; la formule du notebook donne 168/169 (≈ 0,994).',
            observation: 'Les sorties du notebook, arrondies à une décimale, montrent une corrélation positive d’environ 0,9 entre PIB/habitant et revenu, et entre mortalité infantile et fécondité, ainsi qu’une corrélation négative d’environ -0,9 entre espérance de vie et mortalité infantile.',
            interpretation: 'Ces associations signalent des redondances possibles entre indicateurs. L’ACP les résume sur des axes, mais le plan F1 × F2 ne conserve pas toute l’inertie.',
            businessInterest: 'Ces corrélations donnent des pistes pour examiner les indicateurs qui évoluent ensemble ; elles ne suffisent pas, à elles seules, à définir des décisions ou des leviers d’action.',
            limitation: 'Le coefficient de Pearson ne capte que les liaisons linéaires et reste sensible aux valeurs aberrantes (pays aux PIB extrêmes).',
          },
        },
        {
          src: '/images/projects/acp-eboulis-valeurs-propres.png',
          alt: 'Éboulis des valeurs propres et part d’inertie expliquée par chaque composante principale.',
          title: 'Éboulis des valeurs propres',
          caption: 'Part d’inertie expliquée par chaque axe factoriel et variance cumulée (63,86 % sur F1+F2).',
          analysis: {
            question: 'Quelle part de l’inertie les axes F1, F2 et F3 expliquent-ils ?',
            reading: 'Les barres indiquent la part de variance expliquée par chaque axe (λk). La ligne supérieure trace le pourcentage cumulé de variance.',
            observation: 'Le notebook affiche λ1 = 4,2270 (47,25 %), λ2 = 1,4860 (16,61 %) et λ3 = 0,9986 (11,16 %). Les trois premiers axes cumulent 75,02 % de l’inertie.',
            interpretation: 'Le notebook présente F1 et F2 comme les axes les plus pertinents à interpréter et les visualise ensemble (63,86 %). Toutefois, il standardise avec l’écart-type d’échantillon puis divise par n : la diagonale de la matrice vaut 168/169 et λ3 se trouve juste sous 1. La règle de Kaiser ne justifie donc pas, à elle seule, de s’arrêter à deux axes.',
            businessInterest: 'Le scree plot aide à comparer la part d’inertie portée par chaque axe. Le notebook ne réalise pas de clustering.',
            limitation: 'Négliger les composantes 3 à 9 écarte 36,14 % de la variabilité totale, ce qui peut masquer des signaux faibles spécifiques à certains pays.',
          },
        },
        {
          src: '/images/projects/acp-cercle-correlations.png',
          alt: 'Cercle des corrélations des 9 indicateurs sur le plan factoriel F1 x F2.',
          title: 'Cercle des corrélations (F1 × F2)',
          caption: 'Projection des variables dans le cercle unité : interprétation thématique des axes et qualité de représentation.',
          analysis: {
            question: 'Quels indicateurs structurent chaque axe factoriel et quelles sont les oppositions majeures entre variables ?',
            reading: 'Les variables sont des vecteurs projetés dans le cercle de rayon 1. La projection sur un axe donne sa corrélation avec l’axe. Une flèche proche du bord indique une excellente représentation (cos² proche de 1).',
            observation: 'gdpp, income et life_expec pointent fortement vers la droite sur F1, à l’opposé direct de child_mort et total_fer (pointant à gauche). exports et imports pointent conjointement vers le haut le long de F2.',
            interpretation: 'F1 est l’axe du développement humain et économique (richesse et santé contre précarité infantile et natalité non maîtrisée). F2 est l’axe de l’intensité des échanges extérieurs.',
            businessInterest: 'Fournit la grille de lecture sémantique indispensable pour interpréter le positionnement de chaque pays sur la carte factorielle.',
            limitation: 'Les variables dont les flèches n’atteignent pas la bordure du cercle possèdent une part d’inertie projetée sur les axes supérieurs (F3).',
          },
        },
      ],
    },
    en: {
      context: 'This project uses principal component analysis (PCA) to study 169 countries with nine economic and health indicators. The analysis prepares the data, puts the indicators on a common scale, and explores country profiles.',
      question: 'How can nine economic and health indicators help us compare country profiles?',
      featuredFinding: 'The first two axes show 63.86% of the total variation: 47.25% on F1 and 16.61% on F2. This map is useful for exploration, but it does not show all the data.',
      methodIntro: 'The notebook loads the indicators and removes rows with missing values. It then puts the indicators on a common scale and calculates the main components. The results are read with the amount of variation shown and how well points appear on the F1 × F2 map.',
      methodSteps: [
        { title: 'Prepare the data', description: 'Load the country table and remove observations with missing values.' },
        { title: 'Put indicators on a common scale', description: 'Adjust the values so indicators with different units can be compared.' },
        { title: 'Calculate the main components', description: 'Study the correlation matrix, eigenvalues, and eigenvectors.' },
        { title: 'Read the maps', description: 'Study the country and indicator maps, and check how well they appear on the F1 × F2 map.' },
      ],
      contribution: 'The notebook documents a Python analysis workflow: removing rows with missing values, standardizing nine indicators, calculating principal components, visualizing countries and variables, and computing contributions and representation quality (cos²).',
      results: [
        { value: '169', label: 'countries analysed', detail: 'Nine economic and health indicators were included.' },
        { value: '47.25%', label: 'variation shown by F1', detail: 'This axis mainly contrasts income and life expectancy with infant mortality and fertility.' },
        { value: '63.86%', label: 'variation shown by F1 + F2', detail: 'F2 shows 16.61%. The other axes show the remaining 36.14%.' },
      ],
      limitations: [
        'Rows with missing values are removed before the calculations. The results describe only the rows that remain.',
        'The first two axes show 63.86% of the total variation. The F1 × F2 map does not show all the data.',
        'Some countries and indicators are not shown well on the map. Their positions should be read with care.',
        'This analysis describes the data. It does not show cause and effect or predict future results.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'PCA reduces nine indicators to a few axes to compare profiles for 169 countries. The first two axes show 63.86% of the total variation and give a useful, but partial, overview. This exploratory analysis helps identify patterns; it does not show cause and effect or predict future results.',
      },
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
      repository: 'https://github.com/Godwin-08/ACP',
      supervisors: [
        { name: 'Ahmed Aghrich', role: 'Project supervisor', linkedinUrl: 'https://ma.linkedin.com/in/ahmed-aghriche-b89394109' },
      ],
      gallery: [
        {
          src: '/images/projects/acp-plan-factoriel-pays.png',
          alt: 'Map of countries on axes F1 and F2, based on economic and health indicators.',
          title: 'Factorial country map (F1 × F2)',
          caption: 'Dispersion of 169 countries across the first two axes capturing 63.86% of total inertia.',
          analysis: {
            question: 'How do the 169 countries differ in their economic and health profiles?',
            reading: 'The horizontal axis is F1 (47.25% of inertia) and the vertical axis is F2 (16.61%). Each point represents a projected country. Close proximity indicates similar multivariate profiles on this plane.',
            observation: 'F1 clearly separates high-income, high-GDP, long-life-expectancy countries (on the right) from nations facing high infant mortality and elevated fertility rates (on the left). F2 vertically differentiates foreign trade intensity (exports/imports).',
            interpretation: 'The first axis captures a primary global gradient of human development and material wealth, while the second reflects external trade integration.',
            businessInterest: 'This view helps compare profiles across the two axes. The notebook does not cluster countries or target aid or markets.',
            limitation: '36.14% of inertia remains on higher dimensions. Two visually close points may differ substantially along axes F3 to F9 if their cos² is low.',
          },
        },
        {
          src: '/images/projects/acp-correlation-matrice.png',
          alt: 'Linear correlation matrix for nine economic and health indicators.',
          title: 'Correlation matrix',
          caption: 'Linear dependencies across indicators prior to PCA dimensionality reduction.',
          analysis: {
            question: 'What linear correlations and redundancies exist among the 9 socio-economic indicators?',
            reading: 'The heatmap shows correlation coefficients rounded to one decimal, from -1 (cool blue) to +1 (warm red). The displayed diagonal rounds to 1; the notebook formula gives 168/169 (about 0.994).',
            observation: 'The notebook output, rounded to one decimal, shows positive correlations of about 0.9 between GDP per capita and income, and between infant mortality and fertility, and a negative correlation of about -0.9 between life expectancy and infant mortality.',
            interpretation: 'These associations suggest possible redundancy among indicators. PCA summarizes them on axes, but the F1 × F2 plane does not retain all the inertia.',
            businessInterest: 'These correlations can guide closer examination of indicators that move together; on their own, they do not establish decisions or policy levers.',
            limitation: 'Pearson r only evaluates linear relationships and can be sensitive to extreme economic outliers.',
          },
        },
        {
          src: '/images/projects/acp-eboulis-valeurs-propres.png',
          alt: 'Scree plot of eigenvalues and variance explained by each principal component.',
          title: 'Eigenvalue scree plot',
          caption: 'Inertia explained per factorial axis and cumulative variance (63.86% on F1+F2).',
          analysis: {
            question: 'How much inertia do axes F1, F2, and F3 explain?',
            reading: 'Bars indicate the variance share explained by each eigenvalue (λk). The stepped line traces cumulative explained variance.',
            observation: 'The notebook reports λ1 = 4.2270 (47.25%), λ2 = 1.4860 (16.61%), and λ3 = 0.9986 (11.16%). The first three axes show 75.02% of the total inertia.',
            interpretation: 'The notebook presents F1 and F2 as the most relevant axes to interpret and plots them together (63.86%). However, it standardizes with the sample standard deviation and then divides by n: the matrix diagonal is 168/169 and λ3 falls just below 1. The Kaiser rule alone therefore does not justify stopping at two axes.',
            businessInterest: 'The scree plot helps compare the inertia shown by each axis. The notebook does not perform clustering.',
            limitation: 'Ignoring components 3 through 9 discards 36.14% of total variability, which may overlook localized nuances in specific countries.',
          },
        },
        {
          src: '/images/projects/acp-cercle-correlations.png',
          alt: 'Correlation circle of the 9 indicators on factorial plane F1 x F2.',
          title: 'Correlation circle (F1 × F2)',
          caption: 'Projection of variables within the unit circle: axis thematic interpretation and quality of representation.',
          analysis: {
            question: 'Which indicators drive each factorial axis and what are the primary contrasts among variables?',
            reading: 'Variables are projected as vectors within a radius-1 circle. Projection onto an axis measures its correlation with that axis. A vector approaching the circumference indicates high representation quality (cos² near 1).',
            observation: 'gdpp, income, and life_expec point rightward along F1, directly opposite child_mort and total_fer (pointing left). exports and imports point upward together along F2.',
            interpretation: 'F1 reflects global socio-economic development (wealth and health vs infant mortality and high fertility). F2 represents external trade dynamism.',
            businessInterest: 'Supplies the semantic interpretation required to accurately decipher country positions on the factorial map.',
            limitation: 'Variables whose arrows do not reach the perimeter have a portion of their inertia projected onto higher axes (F3).',
          },
        },
      ],
    },
  },
  'revision-flow': {
    fr: {
      context: 'Avant les examens, il faut répartir le travail entre plusieurs matières et tenir compte du temps disponible. RevisionFlow transforme ces informations en séances par jour et montre les tâches qui ne peuvent pas être placées dans le planning.',
      question: 'Comment garder un planning clair quand l’avancement change ou que le temps manque ?',
      methodIntro: 'L’étudiant ajoute ses matières, les dates d’examen et ses heures disponibles. Une règle de priorité répartit les séances selon la charge et l’urgence. Le planning peut être recalculé pour les jours à venir, sans changer les jours passés. Les séances non planifiées apparaissent dans un backlog, une liste à revoir plus tard.',
      methodSteps: [
        { title: 'Ajouter les matières', description: 'Ajouter les modules, les dates d’examen, les tâches et leur niveau de difficulté.' },
        { title: 'Choisir les heures disponibles', description: 'Définir les heures de travail en semaine et le week-end, la durée des séances et les jours de repos.' },
        { title: 'Utiliser la vue du jour', description: 'Voir les séances prévues, en cours ou terminées, puis lancer le minuteur Pomodoro.' },
        { title: 'Suivre et modifier le planning', description: 'Utiliser le calendrier et l’historique pour ajuster le travail. Les données restent dans le navigateur et peuvent être importées ou exportées en JSON.' },
      ],
      contribution: 'J’ai conçu et développé RevisionFlow individuellement en JavaScript vanilla, HTML5 et CSS3. J’ai implémenté l’algorithme de calcul du planning dynamique avec gestion du backlog d’inadmissibilité temporelle, la persistance locale via localStorage (avec sérialisation/désérialisation JSON), le minuteur Pomodoro audio (Web Audio API) et le suivi chronologique.',
      results: [
        { value: 'Mise à jour', label: 'des jours à venir', detail: 'Le planning futur peut changer sans modifier les jours passés.' },
        { value: 'Séances en attente', label: 'pour le travail non planifié', detail: 'Les séances qui ne rentrent pas dans le temps prévu restent visibles.' },
        { value: '5 max.', label: 'plannings sauvegardés', detail: 'L’historique garde jusqu’à cinq plannings à consulter.' },
      ],
      limitations: [
        'Le planning encourage à changer de matière, mais ne garantit pas une alternance parfaite.',
        'Les données restent dans le navigateur, sans synchronisation entre appareils. Elles peuvent être perdues si les données du navigateur sont effacées. Un export JSON permet d’en garder une copie.',
        'La mise à jour des jours fériés utilise le service Nager.Date et demande une connexion internet.',
        'Le projet ne mesure pas d’effet sur le travail ou les résultats aux examens.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'RevisionFlow transforme les matières, les échéances et le temps disponible en séances révisables. Le recalcul des jours à venir et la mise en évidence des séances non planifiées rendent les changements de charge plus visibles, sans effacer l’historique passé. Le projet propose un outil d’organisation, mais son effet sur les habitudes de travail ou les résultats aux examens n’a pas été mesuré.',
      },
      technologies: ['JavaScript', 'HTML', 'CSS', 'localStorage', 'Web Audio API', 'Nager.Date'],
      repository: 'https://github.com/Godwin-08/RevisionFlow',
      documents: [
        { href: '/documents/projects/revisionflow-report-fr.pdf', label: 'Rapport complet de RevisionFlow (PDF)' },
      ],
      supervisors: [
        { name: 'Loubna Rabhi', role: 'Encadrante académique' },
      ],
      gallery: [
        { src: '/images/projects/revisionflow-focus.png', alt: 'Tableau de bord RevisionFlow avec les séances prévues et terminées, le résumé du jour et le minuteur Pomodoro.', title: 'Planning du jour et minuteur', caption: 'La vue du jour montre les séances, leur état et le minuteur. Les chiffres décrivent cette capture, pas un résultat mesuré.' },
        { src: '/images/projects/revisionflow-planning.png', alt: 'Calendrier mensuel des révisions avec l’état des jours et les prochaines dates d’examen.', title: 'Calendrier des révisions', caption: 'Le calendrier montre les jours planifiés et les dates d’examen.' },
        { src: '/images/projects/revisionflow-progression.png', alt: 'Planning sauvegardé en lecture seule avec sa progression, ses séances et trois matières de démonstration.', title: 'Progression du planning', caption: 'Cette vue de démonstration montre la progression et les séances terminées.' },
        { src: '/images/projects/revisionflow-historique.png', alt: 'Historique en lecture seule des plannings sauvegardés avec leur taux de complétion et d’autres informations.', title: 'Plannings sauvegardés', caption: 'L’historique permet de revoir les résumés et les détails des anciens plannings.' },
      ],
    },
    en: {
      context: 'Before exams, students need to plan study time across their subjects. RevisionFlow turns this information into daily sessions and shows tasks that cannot fit in the plan.',
      question: 'How can a study plan stay clear when progress changes or time is short?',
      methodIntro: 'Students add subjects, exam dates, and study hours. A rule plans sessions based on workload and urgency. The app can update future days while keeping past days unchanged. Sessions that do not fit go into a backlog, a list of work to plan later.',
      methodSteps: [
        { title: 'Add subjects', description: 'Add modules, exam dates, study tasks, and a difficulty level.' },
        { title: 'Set study hours', description: 'Choose hours for weekdays and weekends, session length, and days off.' },
        { title: 'Use the daily view', description: 'See planned, current, and completed sessions, then start the Pomodoro timer.' },
        { title: 'Follow and change the plan', description: 'Use the calendar and plan history to update your work. Data stay in the browser and can be moved in or out as JSON files.' },
      ],
      contribution: 'I designed and built RevisionFlow on my own with vanilla JavaScript, HTML5, and CSS3. I implemented dynamic schedule generation with overload backlog handling, browser storage via localStorage (JSON serialization), audio Pomodoro timer (Web Audio API), and plan history tracking.',
      results: [
        { value: 'Plan updates', label: 'for future days', detail: 'Future days can change without changing past days.' },
        { value: 'Extra sessions', label: 'for work not yet planned', detail: 'Sessions that do not fit stay visible.' },
        { value: 'Up to 5', label: 'saved plans', detail: 'The history keeps up to five plans for review.' },
      ],
      limitations: [
        'The schedule encourages students to change subjects, but it does not always alternate them perfectly.',
        'Data are saved in the browser and are not synced across devices. They may be lost if browser data are cleared. Users can save a copy as a JSON file.',
        'The app uses the Nager.Date service to update public holidays. This needs an internet connection.',
        'The project has not measured changes in study or exam results.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'RevisionFlow turns subjects, exam dates, and available time into study sessions that users can review. Updating future days and showing unplanned sessions makes changes in workload easier to see, while keeping past days unchanged. It is a planning tool; its effect on study habits or exam results has not been measured.',
      },
      technologies: ['JavaScript', 'HTML', 'CSS', 'localStorage', 'Web Audio API', 'Nager.Date'],
      repository: 'https://github.com/Godwin-08/RevisionFlow',
      documents: [
        { href: '/documents/projects/revisionflow-report-fr.pdf', label: 'RevisionFlow full report (French PDF)' },
      ],
      supervisors: [
        { name: 'Loubna Rabhi', role: 'Academic supervisor' },
      ],
      gallery: [
        { src: '/images/projects/revisionflow-focus.png', alt: 'RevisionFlow dashboard in French. It shows planned and completed sessions, a daily summary, and the Pomodoro timer.', title: 'Daily plan and timer', caption: 'The daily view shows sessions, their status, and the timer. The numbers describe this screenshot, not a measured result.' },
        { src: '/images/projects/revisionflow-planning.png', alt: 'Monthly study calendar with daily status and upcoming exam dates.', title: 'Study calendar', caption: 'The calendar shows planned days and exam dates.' },
        { src: '/images/projects/revisionflow-progression.png', alt: 'Archived plan in read-only mode, with progress, sessions, and three demo subjects.', title: 'Progress in a saved plan', caption: 'This demo view shows progress and completed sessions.' },
        { src: '/images/projects/revisionflow-historique.png', alt: 'Read-only list of saved plans with completion rates and other details.', title: 'Saved plans', caption: 'Students can review summaries and details from earlier plans.' },
      ],
    },
  },
  'sante-scolaire': {
    fr: {
      context: 'SantéScolaire est une application web créée dans le cadre d’un projet d’études. Elle regroupe les dossiers des élèves, les consultations, les rendez-vous, les prescriptions et le stock de médicaments.',
      question: 'Comment suivre les soins des élèves et donner des accès différents selon le rôle de chaque utilisateur ?',
      methodIntro: 'L’application relie les dossiers des élèves aux consultations et aux rendez-vous. Elle permet aussi de gérer les prescriptions, le stock de médicaments et des indicateurs d’activité.',
      methodSteps: [
        { title: 'Gérer les dossiers', description: 'Relier chaque élève à sa classe, à ses antécédents médicaux et à ses consultations.' },
        { title: 'Suivre les soins', description: 'Planifier les rendez-vous, noter les consultations, ajouter les prescriptions et vérifier le stock.' },
        { title: 'Gérer les accès', description: 'Les médecins et infirmiers peuvent consulter les dossiers médicaux. L’administrateur a un espace séparé.' },
        { title: 'Voir l’activité', description: 'Calculer des indicateurs sur les consultations, les rendez-vous et le stock, puis les afficher dans le tableau de bord.' },
      ],
      architecture: {
        title: 'Architecture de l’application',
        introduction: 'Le serveur Flask utilise des Blueprints pour regrouper les routes. Certaines routes consultent MySQL avec Flask-MySQLdb. Les modèles et le service de statistiques utilisent SQLAlchemy.',
        layers: [
          { title: 'Serveur', description: 'Les Blueprints regroupent la connexion, les élèves, les consultations, le tableau de bord et l’administration.' },
          { title: 'Données', description: 'MySQL stocke les élèves, les classes, les antécédents, les consultations, les prescriptions, les rendez-vous et le stock. Flask-Migrate met à jour la structure de la base.' },
          { title: 'Pages', description: 'Les pages utilisent Jinja2 et Bootstrap. Chart.js affiche les indicateurs du tableau de bord.' },
        ],
      },
      contribution: 'Projet académique individuel conçu et développé sous la supervision de Yassir Rochd. J’ai structuré le modèle relationnel MySQL, qui compte 13 tables dans la base présentée, développé les routes Flask organisées en Blueprints, mis en place des accès différenciés selon les rôles et créé le tableau de bord d’activité avec Chart.js. Les données de démonstration sont fictives.',
      results: [
        { value: '3 rôles', label: 'espaces différents', detail: 'Les administrateurs, médecins et infirmiers ont des vues adaptées à leur rôle.' },
        { value: 'Indicateurs', label: 'activité de suivi', detail: 'L’application calcule des indicateurs à partir de ses données.' },
      ],
      limitations: [
        'Les captures et les données sont fictives. L’application ne doit pas être utilisée avec de vrais dossiers de santé.',
        'Ce projet d’études n’est pas un produit médical certifié ni une application prête pour une vraie école.',
        'Le seul test pytest du dépôt vérifie le chargement de la configuration depuis les variables d’environnement; il ne couvre pas les fonctions métier ni les règles d’accès.',
        'Le dépôt ne présente pas de contrôle indépendant de la sécurité ou du respect des règles.',
        'La capture de la base montre 13 tables, dont referentiel_medicament; le schéma SQL et les modèles publiés dans le dépôt en décrivent 12.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'SantéScolaire réunit dans une même application les dossiers, les consultations, les rendez-vous et le suivi du stock, avec des espaces prévus pour trois rôles. Le projet met en œuvre une organisation des accès côté application, mais ne constitue pas un système validé pour des données de santé réelles. Les captures et les données présentées sont fictives.',
      },
      technologies: ['Python', 'Flask', 'Flask-MySQLdb', 'MySQL', 'SQLAlchemy', 'Flask-Migrate', 'Jinja2', 'Bootstrap', 'Chart.js'],
      repository: 'https://github.com/Godwin-08/SanteScolaire',
      documents: [
        { href: '/documents/projects/santescolaire-project-presentation-fr.pdf', label: 'Présentation du projet en français (PDF)' },
      ],
      supervisors: [
        { name: 'Yassir Rochd', role: 'Encadrant académique', linkedinUrl: 'https://ma.linkedin.com/in/yassir-rochd-01462470' },
      ],
      gallery: [
        { src: '/images/projects/sante-scolaire-dashboard-admin.png', alt: 'Tableau de bord avec des totaux fictifs pour 30 élèves, 25 visites et 17 rendez-vous.', title: 'Tableau de bord administrateur', caption: 'Vue administrateur avec des totaux calculés à partir des données fictives.' },
        { src: '/images/projects/sante-scolaire-directory.png', alt: 'Liste de 30 élèves et de leurs classes avec des données fictives.', title: 'Liste des élèves', caption: 'Vue du personnel soignant. Les noms et les dossiers sont fictifs.' },
        { src: '/images/projects/sante-scolaire-agenda.png', alt: 'Agenda du personnel soignant avec 17 rendez-vous fictifs, leurs dates, élèves, médecins, classes et statuts.', title: 'Agenda des rendez-vous', caption: 'Vue du personnel soignant sur des rendez-vous fictifs.' },
      ],
    },
    en: {
      context: 'SantéScolaire is a school health app built for a study project. It brings together student records, visits, appointments, prescriptions, and medicine stock.',
      question: 'How can a school track student care and give users different levels of access?',
      methodIntro: 'The app links student records to visits and appointments. It also manages prescriptions, medicine stock, and activity indicators.',
      methodSteps: [
        { title: 'Manage records', description: 'Link each student to their class, health history, and visits.' },
        { title: 'Follow care', description: 'Plan appointments, record visits, add prescriptions, and check medicine stock.' },
        { title: 'Set user access', description: 'Doctors and nurses can see health records. Administrators have a separate area.' },
        { title: 'Show activity', description: 'Calculate values for visits, appointments, and stock, then show them on the dashboard.' },
      ],
      architecture: {
        title: 'How the app is built',
        introduction: 'The Flask server uses Blueprints to group routes. Some routes use Flask-MySQLdb to query MySQL. The data models and statistics service use SQLAlchemy.',
        layers: [
          { title: 'Server', description: 'Blueprints group sign-in, student records, visits, the dashboard, and administration.' },
          { title: 'Data', description: 'MySQL stores students, classes, health history, visits, prescriptions, appointments, and stock. Flask-Migrate updates the database structure.' },
          { title: 'Pages', description: 'The pages use Jinja2 and Bootstrap. Chart.js shows dashboard indicators.' },
        ],
      },
      contribution: 'Individual academic project developed under the supervision of Yassir Rochd. I structured the MySQL relational data model, which has 13 tables in the presented database, built Flask routes organized into Blueprints, implemented role-based access restrictions, and created the activity dashboard with Chart.js. Demo data are fictional.',
      results: [
        { value: '3 roles', label: 'separate user areas', detail: 'Administrators, doctors, and nurses have different views.' },
        { value: 'Activity indicators', label: 'care follow-up', detail: 'The app calculates indicators from its data.' },
      ],
      limitations: [
        'All screenshots and demo data are fictional. Do not use the app with real student health records.',
        'This is a study project, not a certified medical product or an app ready for a real school.',
        'The repository has one pytest test for loading configuration from environment variables; it does not cover business features or access rules.',
        'The project does not include an independent security or rules check.',
        'The database screenshot shows 13 tables, including referentiel_medicament; the SQL schema and models published in the repository describe 12.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'SantéScolaire brings student records, visits, appointments, and stock tracking into one app, with separate areas for three user roles. The project implements access rules in the app, but it is not a validated system for real health records. All data and screenshots shown are fictional.',
      },
      technologies: ['Python', 'Flask', 'Flask-MySQLdb', 'MySQL', 'SQLAlchemy', 'Flask-Migrate', 'Jinja2', 'Bootstrap', 'Chart.js'],
      repository: 'https://github.com/Godwin-08/SanteScolaire',
      documents: [
        { href: '/documents/projects/santescolaire-project-presentation-fr.pdf', label: 'Project presentation in French (PDF)' },
      ],
      supervisors: [
        { name: 'Yassir Rochd', role: 'Academic supervisor', linkedinUrl: 'https://ma.linkedin.com/in/yassir-rochd-01462470' },
      ],
      gallery: [
        { src: '/images/projects/sante-scolaire-dashboard-admin.png', alt: 'Administrator dashboard with fictional totals for 30 students, 25 visits, and 17 appointments.', title: 'Administrator dashboard', caption: 'Administrator view with totals from fictional demo data.' },
        { src: '/images/projects/sante-scolaire-directory.png', alt: 'List of 30 students and their classes using fictional demo data.', title: 'Student list', caption: 'Health staff view. All names and records are fictional.' },
        { src: '/images/projects/sante-scolaire-agenda.png', alt: 'Health staff calendar with 17 fictional appointments, dates, students, doctors, classes, and status.', title: 'Appointment calendar', caption: 'Health staff view of fictional appointments from the demo data.' },
      ],
    },
  },
  novastore: {
    fr: {
      context: 'NovaStore est une boutique en ligne de démonstration créée par une équipe de cinq pour un projet d’études. On peut consulter les produits, remplir un panier, créer une commande et voir une facture. Ce n’est pas une boutique ouverte aux clients.',
      question: 'Comment une petite boutique en ligne peut-elle gérer les produits, les paniers et les commandes ?',
      architecture: {
        title: 'Organisation de l’application',
        introduction: 'Les classes Python contiennent une partie des règles de l’application. Les routes Flask relient les pages et le panier. Dans le parcours étudié, les données ne sont pas enregistrées dans une base de données active.',
        layers: [
          { title: 'Objets principaux', description: 'Les classes Produit, Panier, Commande, Client et Paiement représentent les éléments clés. Elles gèrent les articles, les totaux, le stock et les factures.' },
          { title: 'Routes Flask', description: 'Les Blueprints regroupent les pages principales, la connexion et les actions du panier.' },
          { title: 'Pages', description: 'Jinja2 construit les pages. JavaScript gère la recherche, les filtres et le tri des produits.' },
          { title: 'Données utilisées', description: 'Le catalogue contient 20 objets produit. Le panier utilise la session Flask. Les commandes et les alertes restent en mémoire pendant l’utilisation de l’application.' },
        ],
      },
      keyDecisions: {
        title: 'Choix de conception',
        items: [
          { title: 'Mettre les règles dans des classes', description: 'Les classes peuvent calculer un total, vérifier le stock et créer une facture. Cela évite de placer toutes les règles dans les pages.' },
          { title: 'Grouper les routes par fonction', description: 'Les Blueprints regroupent les pages de la boutique, la connexion et les actions du panier.' },
          { title: 'Séparer le panier des commandes', description: 'Le panier garde les identifiants des produits dans la session. Les commandes et les alertes restent en mémoire et disparaissent quand l’application s’arrête.' },
        ],
      },
      methodIntro: 'Les utilisateurs peuvent rechercher des produits, filtrer le catalogue par catégorie, stock, promotion ou prix, puis trier les résultats. Le panier est chargé depuis la session Flask. Au moment de la commande, l’application vérifie le stock, crée la commande, simule le paiement et prépare une facture à imprimer.',
      methodSteps: [
        { title: 'Parcourir les produits', description: 'Voir 20 produits de démonstration, puis les filtrer par catégorie, disponibilité, promotion ou prix et trier la liste.' },
        { title: 'Remplir le panier', description: 'Ajouter ou retirer des articles. Le panier utilise les identifiants de la session et le code vérifie le stock disponible.' },
        { title: 'Créer une commande', description: 'Vérifier le stock, créer la commande et mettre à jour les quantités. Le paiement utilise des valeurs de test et aucun service bancaire.' },
        { title: 'Voir la facture et les données de vente', description: 'Créer une facture et afficher des indicateurs à partir des commandes gardées en mémoire.' },
      ],
      contribution: 'Dans le cadre d’un projet d’équipe de cinq, mon apport principal a porté sur la conception et le développement de l’application. La présentation ne détaille pas la répartition des contributions entre les membres.',
      results: [
        { value: '20 produits', label: 'catalogue de démonstration', detail: 'Les produits sont répartis dans quatre catégories.' },
        { value: 'Panier → facture', label: 'parcours de démonstration', detail: 'Une commande peut produire une facture à imprimer.' },
        { value: 'Paiement test', label: 'aucune transaction réelle', detail: 'L’application ne contacte aucun service de paiement.' },
      ],
      limitations: [
        'Le dépôt mentionne SQLAlchemy, mais l’application n’initialise pas l’ORM et ne l’utilise pas pour persister les données. Le catalogue est construit à partir d’objets Python.',
        'Les commandes et les alertes sont gardées dans des listes en mémoire. Elles disparaissent quand l’application redémarre. La session Flask garde le panier, mais pas les commandes de façon durable.',
        'Le paiement est simulé avec des valeurs de test fixes. Aucun service bancaire ne traite de vraie transaction.',
        'NovaStore est un projet d’études, pas une boutique prête pour de vrais achats.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'NovaStore présente un parcours de boutique de démonstration, du catalogue au panier puis à la facture. Il met en pratique des règles de stock et une simulation de commande, sans traiter de paiement réel. Les commandes restent en mémoire et ne sont pas conservées après l’arrêt de l’application : le projet illustre un parcours fonctionnel, pas une boutique prête à la vente.',
      },
      technologies: ['Python', 'Flask', 'Jinja2', 'JavaScript', 'HTML', 'CSS'],
      repository: 'https://github.com/Godwin-08/Novastore',
      collaborators: [
        { name: 'Azeddine Maktou', role: 'Membre de l’équipe', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
        { name: 'Othmane Laaouina', role: 'Membre de l’équipe', linkedinUrl: 'https://ma.linkedin.com/in/othmane-laaouina-671052385' },
        { name: 'Mariam M’barki', role: 'Membre de l’équipe', linkedinUrl: 'https://ma.linkedin.com/in/mariam-mbarki' },
        { name: 'Kawtar Mahboub El Idrissi', role: 'Membre de l’équipe', linkedinUrl: 'https://ma.linkedin.com/in/kawtar-mahboub-el-idrissi-57826a382' },
      ],
      gallery: [
        { src: '/images/projects/novastore-filtre-prix.png', alt: 'Catalogue NovaStore avec les catégories, les filtres de prix et un résultat de téléphone.', title: 'Catalogue et filtres', caption: 'La page permet de filtrer les produits, par exemple par catégorie ou par prix.' },
        { src: '/images/projects/novastore-fiche-produit.png', alt: 'Page du Xiaomi 13T Pro avec sa catégorie, sa description, le stock, le prix et le bouton pour l’ajouter au panier.', title: 'Page d’un produit', caption: 'La page présente le produit et permet de l’ajouter au panier.' },
        { src: '/images/projects/novastore-panier.png', alt: 'Panier avec un Xiaomi 13T Pro, sa quantité, son sous-total et le total.', title: 'Panier et total', caption: 'Le panier montre les montants avant la commande. Le paiement est un test.' },
      ],
    },
    en: {
      context: 'NovaStore is an online shop demo built by a team of five for a study project. Users can browse products, fill a cart, create an order, and view an invoice. It is not a real online shop.',
      question: 'How can a small online shop manage products, carts, and orders?',
      architecture: {
        title: 'How the app is built',
        introduction: 'Python classes contain some app rules. Flask routes connect the pages and cart. In the flow reviewed, the app does not save data to an active database.',
        layers: [
          { title: 'Main objects', description: 'Product, Cart, Order, Customer, and Payment classes represent key parts of the app. Their methods manage items, totals, stock checks, and invoices.' },
          { title: 'Flask routes', description: 'Blueprints group the main pages, sign-in, and cart actions.' },
          { title: 'Pages', description: 'Jinja2 builds the pages. JavaScript handles product search, filters, and sorting.' },
          { title: 'Saved data', description: 'The catalogue has 20 product objects. The cart uses a Flask session. Orders and alerts stay in memory while the app runs.' },
        ],
      },
      keyDecisions: {
        title: 'Design choices',
        items: [
          { title: 'Put rules in classes', description: 'Classes can calculate totals, check stock, and create invoices. This keeps some rules out of the page code.' },
          { title: 'Group routes by task', description: 'Blueprints group shop pages, sign-in, and cart actions.' },
          { title: 'Separate cart and order data', description: 'The cart saves product IDs in a session, but orders and alerts stay in memory. They do not last after the app closes.' },
        ],
      },
      methodIntro: 'Users can search the catalogue, filter by category, stock, promotion, or price, and sort products. The app rebuilds the cart from the Flask session. At checkout, it checks stock, creates an order, simulates payment, and prepares an invoice to print.',
      methodSteps: [
        { title: 'Browse products', description: 'Browse 20 demo products, then filter by category, stock, promotion, or price and sort the list.' },
        { title: 'Fill the cart', description: 'Add or remove items. The cart uses product IDs from the session and checks available stock.' },
        { title: 'Create an order', description: 'Check stock, create the order, and update product amounts. Payment uses test values and no bank service.' },
        { title: 'View the invoice and order data', description: 'Create an invoice and show admin indicators for orders still in memory.' },
      ],
      contribution: 'For this five-person team project, my main contribution was designing and developing the application. This presentation does not detail how work was divided among the team members.',
      results: [
        { value: '20 products', label: 'demo catalogue', detail: 'Products are in four categories.' },
        { value: 'Cart → invoice', label: 'demo flow', detail: 'An order can create an invoice to print.' },
        { value: 'Test payment', label: 'no real transaction', detail: 'The app does not contact a payment service.' },
      ],
      limitations: [
        'The repository mentions SQLAlchemy, but the application does not initialize the ORM or use it to persist data. The catalogue is built from Python objects.',
        'Orders and alerts are kept in in-memory lists. They are lost when the app restarts. The Flask session stores the cart, not permanent order data.',
        'Payment is a test with fixed values. No payment service handles a real transaction.',
        'NovaStore is a study project, not a shop ready for real purchases.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'NovaStore shows a demo shopping flow from the product catalogue to the cart and invoice. It applies stock rules and simulates an order, but does not process real payments. Orders stay in memory and are lost when the app stops, so this is a working example flow, not a shop ready for real sales.',
      },
      technologies: ['Python', 'Flask', 'Jinja2', 'JavaScript', 'HTML', 'CSS'],
      repository: 'https://github.com/Godwin-08/Novastore',
      collaborators: [
        { name: 'Azeddine Maktou', role: 'Team member', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
        { name: 'Othmane Laaouina', role: 'Team member', linkedinUrl: 'https://ma.linkedin.com/in/othmane-laaouina-671052385' },
        { name: 'Mariam M’barki', role: 'Team member', linkedinUrl: 'https://ma.linkedin.com/in/mariam-mbarki' },
        { name: 'Kawtar Mahboub El Idrissi', role: 'Team member', linkedinUrl: 'https://ma.linkedin.com/in/kawtar-mahboub-el-idrissi-57826a382' },
      ],
      gallery: [
        { src: '/images/projects/novastore-filtre-prix.png', alt: 'NovaStore catalogue with product groups, price filters, and a phone result.', title: 'Product list and filters', caption: 'Users can filter the demo products by category, price, and other options.' },
        { src: '/images/projects/novastore-fiche-produit.png', alt: 'Xiaomi 13T Pro page with its type, description, stock, price, and add-to-cart button.', title: 'Product page', caption: 'The product page shows details and lets the user add it to the cart.' },
        { src: '/images/projects/novastore-panier.png', alt: 'Cart with a Xiaomi 13T Pro, quantity, subtotal, and total.', title: 'Cart and total', caption: 'The cart shows the amounts before checkout. Payment is only a test.' },
      ],
    },
  },
  'pneumonia-detection': {
    fr: {
      context:
        'Projet académique réalisé en équipe de quatre étudiants à l’ENSA Khouribga en 2025–2026. L’objectif est de classer des radiographies thoraciques en deux catégories — NORMAL ou PNEUMONIA — et d’étudier comment le choix du modèle et du seuil de décision influence les résultats.',
      question:
        'Comment comparer un réseau de neurones créé pour le projet à un modèle pré-entraîné pour classer des radiographies thoraciques ?',
      featuredFinding:
        'Sur le jeu de test, DenseNet121 atteint environ 89 % d’exactitude globale et 92 % de rappel pour PNEUMONIA au seuil 0,8. Le score F1 de cette classe est de 0,91. Les métriques et leur interprétation sont détaillées plus bas.',
      dataTitle: 'Données et préparation',
      dataConstruction:
        'Le dépôt indique 5 856 radiographies pédiatriques dans le jeu Chest X-Ray de Kaggle. Il documente 5 216 images pour l’entraînement et 624 pour le test; l’utilisation des 16 autres images n’est pas précisée. Une partie de l’entraînement (20 %, graine aléatoire 42) sert à vérifier les modèles pendant leur apprentissage. Les images sont redimensionnées en 224 × 224 pixels et leurs valeurs ramenées entre 0 et 1. Pour enrichir les exemples, le CNN utilise retournements, rotations, zooms et translations; DenseNet121 utilise retournements, rotations, zooms et contraste. Les images PNEUMONIA sont majoritaires dans le jeu d’entraînement (environ 74 %).',
      methodTitle: 'Démarche expérimentale',
      methodIntro:
        'L’équipe a étudié deux approches pour comparer un réseau apprenant directement à partir des radiographies et un réseau réutilisant des caractéristiques visuelles apprises auparavant. Cette comparaison explore deux stratégies, sans conclure qu’elles ont été évaluées dans des conditions strictement identiques.',
      methodSteps: [
        {
          title: 'Réseau CNN construit pour le projet',
          description:
            'Un réseau de neurones convolutif (CNN) apprend ses filtres à partir des radiographies du jeu. Il sert de modèle de référence. L’expérience utilise Adam, des lots de 32 images, un arrêt anticipé après 13 époques et un seuil de décision de 0,7 pour les résultats rapportés.',
        },
        {
          title: 'DenseNet121 pré-entraîné',
          description:
            'DenseNet121 a déjà appris à reconnaître des motifs visuels sur ImageNet. La première phase réutilise ces représentations (transfer learning) et entraîne une nouvelle tête de classification pour distinguer les deux catégories de radiographies.',
        },
        {
          title: 'Ajustement et choix du seuil',
          description:
            'Une phase de fine-tuning ajuste aussi le réseau pré-entraîné. Le seuil détermine à partir de quelle probabilité une image est classée PNEUMONIA. Les résultats disponibles utilisent un seuil de 0,8 pour Feature Extraction et de 0,9 après fine-tuning.',
        },
        {
          title: 'Évaluation des prédictions',
          description:
            'Les métriques sont calculées sur le jeu de test. Le rappel est mis en évidence pour suivre la part des cas PNEUMONIA détectés; il ne suffit pas, à lui seul, à décrire toutes les erreurs.',
        },
        {
          title: 'Démonstration Streamlit',
          description:
            'Une interface de démonstration permet de charger une radiographie, de sélectionner un modèle enregistré (.keras) et de consulter sa classe prédite ainsi que les probabilités associées.',
        },
      ],
      architecture: {
        title: 'Architectures et pipeline technique',
        introduction:
          'Les deux modèles reçoivent des images de même format, mais n’apprennent pas de la même façon : le CNN construit ses représentations à partir des données du projet, tandis que DenseNet121 réutilise des représentations acquises avant cette expérience.',
        layers: [
          {
            title: 'Images en entrée',
            description:
              'Chaque radiographie est redimensionnée en 224 × 224 pixels, représentée sur trois canaux couleur et normalisée entre 0 et 1 avant d’être transmise au modèle.',
          },
          {
            title: 'CNN créé pour le projet',
            description:
              'Quatre blocs convolutifs (32 à 256 filtres) repèrent progressivement des motifs dans l’image. MaxPooling réduit la taille des représentations; Dropout aide à limiter le surapprentissage.',
          },
          {
            title: 'DenseNet121 pré-entraîné',
            description:
              'Ce réseau pré-entraîné sur ImageNet fournit des caractéristiques visuelles réutilisées pour la tâche. La base est d’abord gelée pendant l’apprentissage de la tête de classification; le dépôt décrit ensuite une phase de fine-tuning.',
          },
          {
            title: 'Interface Streamlit',
            description:
              'Une application Python charge un modèle enregistré au format .keras et affiche une prédiction de démonstration pour une image téléversée.',
          },
        ],
      },
      keyDecisions: {
        title: 'Décisions techniques et méthodologiques',
        items: [
          {
            title: 'Suivre les cas PNEUMONIA détectés',
            description:
              'L’accuracy mesure toutes les prédictions correctes, mais peut masquer les cas positifs manqués. Le rappel PNEUMONIA mesure la proportion de radiographies positives détectées. Le seuil de décision influe sur ce compromis; ce projet reste une expérience académique.',
          },
          {
            title: 'Interpréter prudemment le fine-tuning',
            description:
              'Les résultats enregistrés ne montrent pas de gain clair après fine-tuning. Toutefois, les expériences utilisent des seuils différents pour Feature Extraction (0,8) et après fine-tuning (0,9). Elles ne permettent donc pas d’attribuer de façon fiable une différence au modèle seul.',
          },
        ],
      },
      contribution:
        'J’ai rédigé le rapport technique du projet, qui présente la démarche expérimentale, les modèles évalués et l’analyse des résultats. Le projet a été mené en équipe de quatre.',
      results: [
        { value: '≈89 %', label: 'Exactitude globale (accuracy)', detail: 'Part de toutes les images du test correctement classées par DenseNet121 au seuil 0,8; accuracy mesurée : 0,887821.' },
        { value: '≈92 %', label: 'Rappel de la classe PNEUMONIA', detail: 'Part des radiographies positives détectées : rappel mesuré de 0,917949, soit 358 cas sur 390.' },
        { value: '0,91', label: 'Score F1 de la classe PNEUMONIA', detail: 'Combine précision parmi les prédictions PNEUMONIA et rappel des cas positifs; score mesuré : 0,910941.' },
      ],
      limitations: [
        'Projet académique uniquement : le modèle n’est ni un dispositif médical certifié ni un outil de diagnostic destiné à la pratique clinique.',
        'Le jeu de données est pédiatrique et les résultats proviennent de son jeu de test. Une validation externe serait nécessaire avant d’envisager une généralisation à d’autres données ou populations.',
        'Les résultats consignés ne concordent pas entièrement : deux comptes apparaissent pour les cas PNEUMONIA détectés (358 ou 359 sur 390), les résultats du CNN varient entre 80,3 % et 81 %, et les seuils du fine-tuning diffèrent. Une comparaison complète des modèles reste donc incertaine.',
      ],
      conclusion: {
        title: 'Bilan',
        description:
          'Cette étude met en pratique deux stratégies de classification d’images et montre pourquoi il faut lire plusieurs métriques ensemble. DenseNet121 obtient des résultats encourageants sur le jeu de test utilisé, mais les écarts entre documents et les seuils différents empêchent de conclure que cette approche surpasse systématiquement le CNN. Une comparaison à protocole identique et une validation sur d’autres données seraient les prochaines étapes.',
      },
      resultsIntro:
        'Ces mesures concernent DenseNet121 sur le jeu de test de 624 images, au seuil 0,8. L’accuracy est la part de toutes les images bien classées. Le recall est la part des images PNEUMONIA détectées. Le F1-score combine précision (part des prédictions PNEUMONIA qui sont réellement positives) et recall.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'DenseNet121', 'Streamlit', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Pillow'],
      repository: 'https://github.com/Godwin-08/Pneumonia-Detection-from-X-rays',
      documents: [
        { href: '/documents/projects/pneumonia-report-fr.pdf', label: 'Rapport technique complet du projet (PDF)' },
      ],
      collaborators: [
        { name: 'Mouad Deroui', role: 'Étudiant co-auteur (IID1, ENSA Khouribga)', linkedinUrl: 'https://www.linkedin.com/in/mouadderoui/' },
        { name: 'Othmane Laaouina', role: 'Étudiant co-auteur (IID1, ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/othmane-laaouina-671052385' },
        { name: 'Azeddine Maktou', role: 'Étudiant co-auteur (IID1, ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
      ],
      supervisors: [
        { name: 'Pr. Safiny Yazid', role: 'Encadrant technique (ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/yazidsafiny' },
        { name: 'Pr. Siham Ahmam', role: 'Encadrante méthodologie (ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/siham-ahmam-568200202' },
      ],
      gallery: [
        {
          src: '/images/projects/pneumonia-xray.png',
          alt: 'Radiographie thoracique illustrant le type d’image utilisé pour la classification.',
          title: 'Radiographie thoracique — exemple d’entrée',
          caption: 'Exemple du type d’image utilisé par les modèles. Cette radiographie illustre les données en entrée; elle ne représente pas une prédiction.',
        },
        {
          src: '/images/projects/pneumonia-streamlit-interface.png',
          alt: 'Capture de l’application Streamlit montrant le modèle sélectionné et la zone de téléversement.',
          title: 'Interface de démonstration Streamlit',
          caption: 'L’interface d’origine permet de choisir un modèle et de charger une image. Cette capture ne montre aucun résultat de prédiction.',
        },
        {
          src: '/images/projects/pneumonia-streamlit-upload.png',
          alt: 'Capture de l’application Streamlit avec une radiographie chargée, avant le lancement de l’analyse.',
          title: 'Téléversement d’une radiographie',
          caption: 'La radiographie est affichée avant l’analyse. Cette capture montre une entrée de démonstration, pas une prédiction ni un résultat clinique.',
        },
        {
          src: '/images/projects/pneumonia-courbes-cnn.png',
          alt: 'Courbes de perte et de précision lors de l’entraînement du modèle CNN personnalisé.',
          title: 'Courbes d’apprentissage — CNN from scratch',
          caption: 'La courbe suit la loss (erreur) et l’accuracy pendant l’entraînement et la validation. La ligne pointillée marque le meilleur modèle, à l’époque 8. Ces courbes ne sont pas les résultats du jeu de test.',
          zoomable: true,
        },
        {
          src: '/images/projects/pneumonia-courbes-densenet.png',
          alt: 'Courbes de perte et de précision de DenseNet121 en phase d’extraction de caractéristiques.',
          title: 'Courbes d’apprentissage — DenseNet121 (Transfer Learning)',
          caption: 'La courbe suit la loss (erreur) et l’accuracy pendant la phase Feature Extraction. La ligne pointillée marque le meilleur modèle, à l’époque 14. Ces courbes ne sont pas les résultats du jeu de test.',
          zoomable: true,
        },
      ],
    },
    en: {
      context:
        'Academic project completed by a four-student team at ENSA Khouribga in 2025–2026. The goal is to classify chest X-rays as NORMAL or PNEUMONIA and study how the model and decision threshold affect the results.',
      question:
        'How do a CNN built for this project and a pre-trained model compare when classifying chest X-rays?',
      featuredFinding:
        'On the test set, DenseNet121 reaches about 89% accuracy and 92% PNEUMONIA recall at threshold 0.8. The F1-score for this class is 0.91. The metrics and what they mean are explained below.',
      dataTitle: 'Data and preparation',
      dataConstruction:
        'The repository reports 5,856 pediatric X-rays in the Kaggle Chest X-Ray dataset. It documents 5,216 images for training and 624 for testing; it does not explain how the other 16 images are used. A part of the training set (20%, random seed 42) is used to check the models during training. Images are resized to 224 × 224 pixels and scaled from 0 to 1. To add variety, the CNN uses flips, rotations, zooms, and shifts; DenseNet121 uses flips, rotations, zooms, and contrast changes. About 74% of training images show PNEUMONIA.',
      methodTitle: 'Experiments and approach',
      methodIntro:
        'The team studied two ways to build an image classifier: a network that learns from the project images, and a network that reuses visual features learned before this project. This explores two approaches; it does not prove that they were tested under exactly the same conditions.',
      methodSteps: [
        {
          title: 'CNN built for this project',
          description:
            'A convolutional neural network (CNN) learns image patterns from the project X-rays. It serves as a baseline. The experiment uses the Adam optimizer, batches of 32 images, early stopping after 13 epochs, and a 0.7 decision threshold for the reported results.',
        },
        {
          title: 'Pre-trained DenseNet121',
          description:
            'DenseNet121 has already learned visual patterns from ImageNet. The first phase reuses these features (transfer learning) and trains a new classification head to separate the two X-ray classes.',
        },
        {
          title: 'Fine-tuning and decision threshold',
          description:
            'A later fine-tuning phase further trains the pre-trained network. The decision threshold sets the probability needed to label an image PNEUMONIA. The available results use 0.8 for Feature Extraction and 0.9 after fine-tuning.',
        },
        {
          title: 'Checking predictions',
          description:
            'Test metrics are calculated from the model predictions. PNEUMONIA recall is highlighted to show the share of positive X-rays detected; it does not describe every type of error on its own.',
        },
        {
          title: 'Streamlit demonstration',
          description:
            'A demo interface lets a user upload an X-ray, choose a saved model (.keras), and view its predicted class and related probabilities.',
        },
      ],
      architecture: {
        title: 'Architectures and technical pipeline',
        introduction:
          'Both models receive images in the same format, but learn in different ways. The CNN builds its image features from the project data, while DenseNet121 reuses features learned before this experiment.',
        layers: [
          {
            title: 'Input images',
            description:
              'Each X-ray is resized to 224 × 224 pixels, represented with three color channels, and scaled from 0 to 1 before it enters the model.',
          },
          {
            title: 'CNN built for this project',
            description:
              'Four convolution blocks (32 to 256 filters) find image patterns at different levels. MaxPooling reduces feature-map size; Dropout helps limit overfitting.',
          },
          {
            title: 'Pre-trained DenseNet121',
            description:
              'This network was pre-trained on ImageNet. Its visual features are reused for this task. The base is first frozen while a new classification head is trained; the repository also describes a later fine-tuning phase.',
          },
          {
            title: 'Streamlit UI',
            description:
              'A Python demo loads a model saved in .keras format and shows a prediction for an uploaded image.',
          },
        ],
      },
      keyDecisions: {
        title: 'Technical and methodological choices',
        items: [
          {
            title: 'Tracking detected PNEUMONIA cases',
            description:
              'Accuracy counts all correct predictions, but it can hide missed positive cases. PNEUMONIA recall measures the share of positive X-rays detected. The decision threshold affects this balance; this project remains an academic experiment.',
          },
          {
            title: 'Reading fine-tuning results with care',
            description:
              'The recorded results do not show a clear gain after fine-tuning. However, the experiments use different thresholds for Feature Extraction (0.8) and fine-tuning (0.9). They cannot show reliably that any difference came from the model alone.',
          },
        ],
      },
      contribution:
        'I wrote the project’s technical report, documenting the experimental approach, evaluated models, and analysis of the results. The project was carried out by a team of four.',
      results: [
        { value: '≈89%', label: 'Overall accuracy', detail: 'Share of all test images correctly classified by DenseNet121 at threshold 0.8; measured accuracy: 0.887821.' },
        { value: '≈92%', label: 'PNEUMONIA recall', detail: 'Share of positive X-rays detected: measured recall of 0.917949, or 358 of 390 cases.' },
        { value: '0.91', label: 'PNEUMONIA F1-score', detail: 'Combines precision among PNEUMONIA predictions with recall of positive cases; measured score: 0.910941.' },
      ],
      limitations: [
        'Academic project only: this model is not a certified medical device or a tool for clinical diagnosis.',
        'The dataset contains pediatric X-rays, and results come from its test set. External validation would be needed before applying them to other data or populations.',
        'The recorded results do not fully agree: two counts appear for detected PNEUMONIA cases (358 or 359 out of 390), CNN accuracy varies between 80.3% and 81%, and fine-tuning uses different thresholds. A full comparison of the models is therefore uncertain.',
      ],
      conclusion: {
        title: 'Takeaways',
        description:
          'This study puts two image-classification approaches into practice and shows why several metrics should be read together. DenseNet121 gives promising results on the test set used, but source differences and different thresholds do not support a clear claim that it always performs better than the CNN. The next steps would be a comparison under the same test protocol and validation on other data.',
      },
      resultsIntro:
        'These measures are for DenseNet121 on the 624-image test set at threshold 0.8. Accuracy is the share of all images classified correctly. Recall is the share of PNEUMONIA images detected. The F1-score combines precision (the share of PNEUMONIA predictions that are correct) with recall.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'DenseNet121', 'Streamlit', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Pillow'],
      repository: 'https://github.com/Godwin-08/Pneumonia-Detection-from-X-rays',
      documents: [
        { href: '/documents/projects/pneumonia-report-fr.pdf', label: 'Complete technical report (PDF, French)' },
      ],
      collaborators: [
        { name: 'Mouad Deroui', role: 'Student co-author (IID1, ENSA Khouribga)', linkedinUrl: 'https://www.linkedin.com/in/mouadderoui/' },
        { name: 'Othmane Laaouina', role: 'Student co-author (IID1, ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/othmane-laaouina-671052385' },
        { name: 'Azeddine Maktou', role: 'Student co-author (IID1, ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380' },
      ],
      supervisors: [
        { name: 'Pr. Safiny Yazid', role: 'Technical supervisor (ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/yazidsafiny' },
        { name: 'Pr. Siham Ahmam', role: 'Methodology supervisor (ENSA Khouribga)', linkedinUrl: 'https://ma.linkedin.com/in/siham-ahmam-568200202' },
      ],
      gallery: [
        {
          src: '/images/projects/pneumonia-xray.png',
          alt: 'Chest X-ray illustrating the type of image used for classification.',
          title: 'Chest X-ray — example input',
          caption: 'An example of the type of image used by the models. It shows the input data and is not a model prediction.',
        },
        {
          src: '/images/projects/pneumonia-streamlit-interface.png',
          alt: 'Screenshot of the Streamlit app showing the selected model and the image upload area.',
          title: 'Streamlit demo interface',
          caption: 'The original interface lets users choose a model and upload an image. This screenshot does not show a prediction result.',
        },
        {
          src: '/images/projects/pneumonia-streamlit-upload.png',
          alt: 'Screenshot of the Streamlit app with a chest X-ray uploaded, before analysis starts.',
          title: 'Uploading a chest X-ray',
          caption: 'The X-ray is shown before analysis. This is a demo input, not a prediction or a clinical result.',
        },
        {
          src: '/images/projects/pneumonia-courbes-cnn.png',
          alt: 'Loss and accuracy curves during training of the custom CNN model.',
          title: 'Training curves — Custom CNN from scratch',
          caption: 'The curves show loss and accuracy during training and validation. The dotted line marks the best model, at epoch 8. These are not test-set results.',
          zoomable: true,
        },
        {
          src: '/images/projects/pneumonia-courbes-densenet.png',
          alt: 'Loss and accuracy curves of DenseNet121 during feature extraction.',
          title: 'Training curves — DenseNet121 (Transfer Learning)',
          caption: 'The curves show loss and accuracy during Feature Extraction. The dotted line marks the best model, at epoch 14. These are not test-set results.',
          zoomable: true,
        },
      ],
    },
  },
  'goodthought-sql-analysis': {
    fr: {
      context: 'Projet guidé DataCamp réalisé dans le cadre du parcours SQL Data Analyst. Le notebook explore GoodThought, un cas d’exercice portant sur les missions d’une ONG, les dons et les scores d’impact.',
      question: 'Comment les dons se répartissent-ils entre les missions, et quelles missions obtiennent les scores d’impact les plus élevés par région ?',
      dataTitle: 'Données et préparation',
      dataConstruction: 'Le notebook interroge les tables Assignments, Donations et Donors. Les jointures relient les missions aux dons et aux donateurs avant les agrégations. Les données sources ne sont pas incluses dans l’archive du notebook.',
      methodTitle: 'Démarche SQL',
      methodIntro: 'Les requêtes étudient les montants de dons par mission et type de donateur, puis classent les scores d’impact à l’intérieur de chaque région.',
      methodSteps: [
        { title: 'Relier les tables', description: 'Joindre Assignments, Donations et Donors pour rattacher les dons aux missions et aux types de donateurs.' },
        { title: 'Agréger les dons', description: 'Calculer les montants par mission et type de donateur, puis présenter les cinq combinaisons les mieux classées.' },
        { title: 'Préparer un classement par région', description: 'Utiliser une CTE pour organiser les missions ayant des dons consignés et leurs scores d’impact.' },
        { title: 'Classer les résultats', description: 'Appliquer ROW_NUMBER() pour repérer les missions les mieux classées dans chaque région.' },
      ],
      contribution: 'J’ai réalisé ce projet guidé DataCamp dans le parcours SQL Data Analyst. Ma contribution porte sur le notebook et les requêtes SQL qui y sont documentés.',
      resultsIntro: 'Ces valeurs proviennent des sorties enregistrées dans le notebook DataCamp. Elles décrivent le jeu d’exercice GoodThought, pas l’activité réelle d’une ONG. Le classement des dons porte sur des groupes mission × type de donateur.',
      results: [
        { value: '4 régions', label: 'Scores maximums consignés', detail: 'East et South : 10,00 ; North et West : 9,99.' },
        { value: 'Assignment_316', label: 'Mission classée première à East', detail: 'Score de 10,00 et deux dons enregistrés parmi les missions avec dons.' },
        { value: '3 840,66 $', label: 'Plus grand agrégat de dons', detail: 'Assignment_3033, East, type Individual ; ce montant concerne un groupe mission × type de donateur.' },
      ],
      limitations: ['Les scores et montants sont ceux du jeu de formation DataCamp ; ils ne décrivent pas des résultats réels d’une ONG.'],
      conclusion: {
        title: 'Bilan',
        description: 'Ce projet guidé met en pratique les jointures, les agrégations, les CTE et les fonctions de fenêtrage. Dans le jeu d’exercice, les scores maximums sont de 10,00 à East et South et de 9,99 à North et West. Les totaux de dons sont interprétés par groupe mission × type de donateur.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/f8f3f346-1000-46b8-8570-27be207896b3/edit', label: 'Ouvrir le notebook DataLab' }],
      gallery: [],
    },
    en: {
      context: 'A guided DataCamp project completed as part of the SQL Data Analyst track. The notebook explores GoodThought, a practice case about an NGO’s assignments, donations, and impact scores.',
      question: 'How are donations distributed across assignments, and which assignments have the highest impact scores in each region?',
      dataTitle: 'Data and preparation',
      dataConstruction: 'The notebook queries the Assignments, Donations, and Donors tables. Joins connect assignments to donations and donors before aggregation. The source data are not included in the notebook archive.',
      methodTitle: 'SQL approach',
      methodIntro: 'The queries examine donation amounts by assignment and donor type, then rank impact scores within each region.',
      methodSteps: [
        { title: 'Join the tables', description: 'Join Assignments, Donations, and Donors to connect donations to assignments and donor types.' },
        { title: 'Aggregate donations', description: 'Calculate amounts by assignment and donor type, then show the five highest-ranked combinations.' },
        { title: 'Prepare a regional ranking', description: 'Use a CTE to organise assignments with recorded donations and their impact scores.' },
        { title: 'Rank the results', description: 'Apply ROW_NUMBER() to identify the highest-ranked assignments within each region.' },
      ],
      contribution: 'I completed this guided DataCamp project as part of the SQL Data Analyst track. My contribution is the notebook and the SQL queries documented in it.',
      resultsIntro: 'These values come from the saved outputs in the DataCamp notebook. They describe the GoodThought practice dataset, not the real activity of an NGO. The donation ranking is grouped by assignment × donor type.',
      results: [
        { value: '4 regions', label: 'Recorded maximum scores', detail: 'East and South: 10.00; North and West: 9.99.' },
        { value: 'Assignment_316', label: 'Top-ranked East assignment', detail: 'Impact score 10.00 with two recorded donations among assignments with donations.' },
        { value: '$3,840.66', label: 'Largest aggregated donation group', detail: 'Assignment_3033, East, donor type Individual; this is one assignment × donor-type group.' },
      ],
      limitations: ['The scores and amounts belong to the DataCamp practice dataset; they do not describe the real results of an NGO.'],
      conclusion: {
        title: 'Takeaways',
        description: 'This guided project applies joins, aggregations, CTEs, and window functions. In the practice dataset, maximum scores are 10.00 in East and South and 9.99 in North and West. Donation totals are interpreted by assignment × donor-type group.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/f8f3f346-1000-46b8-8570-27be207896b3/edit', label: 'Open the DataLab notebook' }],
      gallery: [],
    },
  },
  'motorcycle-parts-sales': {
    fr: {
      context: 'Projet guidé DataCamp réalisé dans le parcours SQL Data Analyst. Le notebook analyse un jeu d’exercice de ventes en gros de pièces de moto, couvrant 1 000 commandes de juin à août 2021.',
      question: 'Comment les ventes varient-elles selon la ligne de produits, le mois et l’entrepôt ?',
      dataTitle: 'Données et préparation',
      dataConstruction: 'Le notebook travaille sur 1 000 commandes enregistrées entre juin et août 2021. Les requêtes mobilisent notamment la ligne de produits, la date de commande et l’entrepôt pour comparer les agrégats. Les données sources ne sont pas incluses dans l’archive.',
      methodTitle: 'Démarche SQL',
      methodIntro: 'Les requêtes regroupent les ventes par ligne de produits, période et entrepôt, puis comparent les résultats enregistrés dans le notebook.',
      methodSteps: [
        { title: 'Explorer le jeu de commandes', description: 'Repérer les dimensions utiles à l’analyse : produit, date de commande et entrepôt.' },
        { title: 'Agréger par produit', description: 'Regrouper les lignes de commande par ligne de produits pour comparer les catégories.' },
        { title: 'Comparer les mois', description: 'Extraire le mois des dates et regrouper les ventes de juin à août 2021. La requête trie les noms de mois alphabétiquement, pas dans l’ordre chronologique.' },
        { title: 'Comparer les entrepôts', description: 'Ajouter l’entrepôt au regroupement pour examiner les différences entre les trois sites.' },
      ],
      contribution: 'J’ai réalisé ce projet guidé DataCamp dans le parcours SQL Data Analyst. Ma contribution porte sur le notebook et les requêtes SQL qui y sont documentés.',
      resultsIntro: 'Les nombres ci-dessous décrivent le volume et le regroupement des données d’exercice. Les montants de revenu net enregistrés ne sont pas repris : la requête soustrait directement un taux de frais au montant des ventes.',
      results: [
        { value: '48', label: 'Agrégats affichés', detail: 'Lignes de produits, mois et entrepôts dans la sortie enregistrée.' },
        { value: '1 000', label: 'Commandes du jeu d’exercice', detail: 'Volume de données indiqué dans le notebook.' },
        { value: '3 entrepôts', label: 'Sites comparés', detail: 'North, Central et West.' },
      ],
      limitations: ['La requête enregistrée soustrait directement payment_fee, qui est un taux, et trie les noms des mois alphabétiquement. Aucun montant net ni aucune tendance chronologique ne sont donc repris ici.'],
      conclusion: {
        title: 'Bilan',
        description: 'Ce projet guidé met en pratique les agrégations SQL pour explorer des ventes par produit, mois et entrepôt. Les sorties confirment 48 regroupements sur 1 000 commandes ; les valeurs de revenu net restent à recalculer avec la formule de frais correcte.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/42a9134d-c268-458b-9a48-d7abf76d5365/edit', label: 'Ouvrir le notebook DataLab' }],
      gallery: [],
    },
    en: {
      context: 'A guided DataCamp project completed as part of the SQL Data Analyst track. The notebook analyses a motorcycle-parts wholesale practice dataset with 1,000 orders from June to August 2021.',
      question: 'How do sales vary by product line, month, and warehouse?',
      dataTitle: 'Data and preparation',
      dataConstruction: 'The notebook works with 1,000 orders recorded between June and August 2021. Queries use dimensions such as product line, order date, and warehouse to compare aggregates. The source data are not included in the archive.',
      methodTitle: 'SQL approach',
      methodIntro: 'The queries group sales by product line, period, and warehouse, then compare the outputs saved in the notebook.',
      methodSteps: [
        { title: 'Explore the orders', description: 'Identify the dimensions used in the analysis: product, order date, and warehouse.' },
        { title: 'Aggregate by product', description: 'Group order lines by product line to compare categories.' },
        { title: 'Compare months', description: 'Extract the month from order dates and group sales from June to August 2021. The query sorts month names alphabetically, not chronologically.' },
        { title: 'Compare warehouses', description: 'Add warehouse to the grouping to examine differences across the three sites.' },
      ],
      contribution: 'I completed this guided DataCamp project as part of the SQL Data Analyst track. My contribution is the notebook and the SQL queries documented in it.',
      resultsIntro: 'The figures below describe the volume and grouping of the practice data. The saved net revenue amounts are not reported because the query subtracts a fee rate directly from sales totals.',
      results: [
        { value: '48', label: 'Aggregated rows', detail: 'Product lines, months, and warehouses in the saved output.' },
        { value: '1,000', label: 'Practice orders', detail: 'Dataset size stated in the notebook.' },
        { value: '3 warehouses', label: 'Sites compared', detail: 'North, Central, and West.' },
      ],
      limitations: ['The saved query directly subtracts payment_fee, which is a rate, and sorts month names alphabetically. Net amounts and chronological trends are therefore not reported here.'],
      conclusion: {
        title: 'Takeaways',
        description: 'This guided project applies SQL aggregations to explore sales by product, month, and warehouse. The saved output contains 48 groups across 1,000 orders; net revenue still needs to be recalculated with the correct fee formula.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/42a9134d-c268-458b-9a48-d7abf76d5365/edit', label: 'Open the DataLab notebook' }],
      gallery: [],
    },
  },
  'students-mental-health': {
    fr: {
      context: 'Projet guidé DataCamp réalisé dans le parcours SQL Data Analyst. Le notebook explore les scores PHQ-9 (dépression), SCS (connexion sociale) et ASISS (stress d’acculturation) d’une enquête menée en 2018 dans une université internationale japonaise.',
      question: 'Les scores diffèrent-ils selon le statut international ou national, et comment varient-ils selon la durée du séjour ?',
      dataTitle: 'Données et préparation',
      dataConstruction: 'L’archive contient un CSV de 286 lignes et 50 colonnes. Les champs utilisés comprennent le statut Inter / Dom, la durée du séjour et les scores todep (PHQ-9), tosc (SCS) et toas (ASISS). L’analyse résume les valeurs par moyennes et effectifs.',
      methodTitle: 'Démarche SQL',
      methodIntro: 'Le notebook filtre les étudiants internationaux et compare les scores moyens en fonction de leur durée de séjour. Les moyennes Inter / Dom présentées ici sont également recalculées depuis le CSV fourni.',
      methodSteps: [
        { title: 'Repérer les variables', description: 'Utiliser inter_dom pour distinguer les catégories Inter et Dom, stay pour la durée du séjour, et todep, tosc et toas pour les scores.' },
        { title: 'Comparer les catégories', description: 'Calculer les moyennes PHQ-9, SCS et ASISS séparément pour les observations Inter et Dom du CSV.' },
        { title: 'Regrouper par durée', description: 'Dans le notebook, filtrer Inter puis calculer le nombre d’étudiants et les trois moyennes pour chaque durée de séjour.' },
        { title: 'Lire les résultats', description: 'Trier les durées par ordre décroissant ; les sorties décrivent des moyennes par groupe, pas l’évolution d’un même étudiant.' },
      ],
      contribution: 'J’ai réalisé ce projet guidé DataCamp dans le parcours SQL Data Analyst. La fiche présente les requêtes du notebook et des moyennes comparatives recalculées à partir du CSV fourni.',
      resultsIntro: 'Les moyennes ci-dessous sont descriptives et calculées sur les lignes renseignées des catégories Inter et Dom. Les sorties par durée proviennent du notebook fourni.',
      results: [
        { value: '201 / 67', label: 'Effectifs Inter / Dom', detail: 'Observations portant ces catégories et des scores renseignés dans le CSV.' },
        { value: '75,56 / 62,84', label: 'Score ASISS moyen · Inter / Dom', detail: 'Écart descriptif de 12,72 points dans le CSV fourni.' },
        { value: '37,42 / 37,64', label: 'Score SCS moyen · Inter / Dom', detail: 'Moyennes calculées à partir du CSV fourni.' },
        { value: '8,04 / 8,61', label: 'Score PHQ-9 moyen · Inter / Dom', detail: 'Moyennes calculées à partir du CSV fourni.' },
        { value: '9,09', label: 'PHQ-9 moyen après 3 ans', detail: '46 étudiants internationaux dans la sortie du notebook.' },
      ],
      limitations: ['Ces moyennes décrivent les réponses de l’enquête ; elles ne démontrent pas de lien de causalité ni ne permettent de généraliser à tous les étudiants. Les groupes de séjour les plus longs comptent peu d’observations.'],
      conclusion: {
        title: 'Bilan',
        description: 'Dans le CSV fourni, la moyenne ASISS est de 75,56 pour les étudiants Inter et de 62,84 pour les étudiants Dom ; la moyenne PHQ-9 est respectivement de 8,04 et 8,61. Les moyennes par durée varient selon les groupes et ne suffisent pas à établir un effet du séjour.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/92c8ef26-70ff-4f29-9282-69a8bed276ee/edit', label: 'Ouvrir le notebook DataLab' }],
      gallery: [],
    },
    en: {
      context: 'A guided DataCamp project completed as part of the SQL Data Analyst track. The notebook explores PHQ-9 (depression), SCS (social connectedness), and ASISS (acculturative stress) scores from a 2018 survey at an international university in Japan.',
      question: 'Do scores differ between international and domestic students, and how do they vary by length of stay?',
      dataTitle: 'Data and preparation',
      dataConstruction: 'The archive contains a CSV with 286 rows and 50 columns. The fields used include Inter / Dom status, length of stay, and the todep (PHQ-9), tosc (SCS), and toas (ASISS) scores. The analysis summarizes values with means and counts.',
      methodTitle: 'SQL approach',
      methodIntro: 'The notebook filters international students and compares average scores by length of stay. The Inter / Dom averages shown here were also recalculated from the supplied CSV.',
      methodSteps: [
        { title: 'Identify the variables', description: 'Use inter_dom for Inter / Dom status, stay for length of stay, and todep, tosc, and toas for the scores.' },
        { title: 'Compare categories', description: 'Calculate mean PHQ-9, SCS, and ASISS scores separately for Inter and Dom records in the CSV.' },
        { title: 'Group by length of stay', description: 'In the notebook, filter for Inter and calculate the student count and three score averages for each length of stay.' },
        { title: 'Read the results', description: 'Sort lengths in descending order; the outputs describe group averages, not changes experienced by the same student.' },
      ],
      contribution: 'I completed this guided DataCamp project as part of the SQL Data Analyst track. This page presents the notebook queries and comparative averages recalculated from the supplied CSV.',
      resultsIntro: 'The averages below are descriptive and calculated from rows with recorded scores in the Inter and Dom categories. The length-of-stay outputs come from the supplied notebook.',
      results: [
        { value: '201 / 67', label: 'Inter / Dom records', detail: 'Records with these categories and recorded scores in the CSV.' },
        { value: '75.56 / 62.84', label: 'Mean ASISS score · Inter / Dom', detail: 'A descriptive 12.72-point difference in the supplied CSV.' },
        { value: '37.42 / 37.64', label: 'Mean SCS score · Inter / Dom', detail: 'Averages calculated from the supplied CSV.' },
        { value: '8.04 / 8.61', label: 'Mean PHQ-9 score · Inter / Dom', detail: 'Averages calculated from the supplied CSV.' },
        { value: '9.09', label: 'Mean PHQ-9 after 3 years', detail: '46 international students in the notebook output.' },
      ],
      limitations: ['These averages describe survey responses; they do not establish causation or support generalization to all students. The longest-stay groups contain few observations.'],
      conclusion: {
        title: 'Takeaways',
        description: 'In the supplied CSV, mean ASISS is 75.56 for Inter students and 62.84 for Dom students; mean PHQ-9 is 8.04 and 8.61, respectively. Averages vary across length-of-stay groups and are not enough to establish an effect of time abroad.',
      },
      technologies: ['SQL', 'Jupyter Notebook', 'DataCamp'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/92c8ef26-70ff-4f29-9282-69a8bed276ee/edit', label: 'Open the DataLab notebook' }],
      gallery: [],
    },
  },
  'grocery-store-sales': {
    fr: {
      context: 'Examen pratique certifiant DataCamp réalisé pour l’obtention de la certification Data Analyst Associate (novembre 2026). Le notebook résout un cas d’étude sous PostgreSQL portant sur la chaîne de supermarchés FoodYum.',
      question: 'Comment auditer un bug d’intégrité système, nettoyer et imputer un catalogue de produits sans modifier la table source, puis identifier les catégories à fort potentiel commercial ?',
      dataTitle: 'Données et contexte métier',
      dataConstruction: 'La table products regroupe l’identifiant, le type de produit (Produce, Meat, Dairy, Bakery, Snacks), la marque, le poids en grammes, le prix de vente en dollars, les ventes moyennes mensuelles en unités, l’année d’ajout au stock et l’entrepôt d’origine (A, B, C, D). Un bug en 2022 a causé des valeurs manquantes dans year_added.',
      methodTitle: 'Démarche SQL',
      methodIntro: 'L’épreuve est structurée en quatre tâches séquentielles menées sous contrainte de temps et vérifiées automatiquement :',
      methodSteps: [
        { title: '1. Audit du bug système 2022', description: 'Requête SELECT COUNT(*) AS missing_year pour comptabiliser les produits dont l’année d’ajout est non renseignée.' },
        { title: '2. Pipeline de nettoyage & imputation (CTE)', description: 'Création de la CTE typed pour convertir les types et nettoyer les suffixes (\" grams\"), puis calcul des médianes de prix et de poids avec PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ...), et assemblage final via CROSS JOIN et COALESCE sans modifier la table source.' },
        { title: '3. Analyse de dispersion des prix', description: 'Calcul des prix minimums et maximums groupés par catégorie (product_type) via MIN(price) et MAX(price).' },
        { title: '4. Ciblage stratégique des produits phares', description: 'Filtrage conditionnel sur les rayons Meat et Dairy pour extraire les produits enregistrant des ventes mensuelles moyennes strictement supérieures à 10 unités.' },
      ],
      contribution: 'J’ai conçu et validé l’intégralité des requêtes SQL de cet examen pratique chronométré, permettant l’obtention de la certification officielle DataCamp Data Analyst Associate.',
      resultsIntro: 'Les résultats confirment la résolution intégrale des quatre tâches de l’épreuve pratique :',
      results: [
        { value: '4 / 4', label: 'Tâches d’examen validées', detail: 'Audit, nettoyage CTE, dispersion des prix et ciblage des ventes.' },
        { value: 'PERCENTILE_CONT', label: 'Médianes vectorisées', detail: 'Calcul de la médiane pour imputer prix et poids sans biais d’asymétrie.' },
        { value: '8 colonnes', label: 'Schéma cible validé', detail: 'Colonnes normalisées et typées selon le dictionnaire de données imposé.' },
      ],
      limitations: [
        'L’épreuve pratique est réalisée sur la base PostgreSQL mise à disposition dans l’environnement sécurisé DataLab de DataCamp.',
        'Les règles d’imputation (médiane globale pour le prix et le poids, remplacement par 2022 pour l’année manquante) répondent strictement aux consignes d’évaluation de la certification.',
      ],
      conclusion: {
        title: 'Bilan',
        description: 'Ce projet valide la capacité à transformer des données brutes corrompues en une vue analytique propre, reproductible et directement exploitable pour le pilotage commercial, tout en respectant les standards de rigueur du SQL sous PostgreSQL.',
      },
      technologies: ['SQL', 'PostgreSQL', 'DataCamp', 'Jupyter Notebook'],
      documents: [
        {
          href: '/projects/grocery-store-sales/notebook',
          label: 'Lire le notebook SQL en ligne',
          description: 'Notebook consultable · 12 cellules',
          internal: true,
        },
        {
          href: '/documents/projects/grocery-sales-notebook.ipynb',
          label: 'Télécharger le notebook source (.ipynb)',
          description: 'Fichier Jupyter Notebook original',
          download: true,
        },
      ],
      gallery: [
        {
          src: '/images/projects/grocery-store-sales.png',
          alt: 'Schéma du pipeline de nettoyage et d’analyse SQL de l’examen pratique FoodYum.',
          title: 'Pipeline SQL & Dictionnaire de données',
          caption: 'De la table brute avec anomalies à la vue nettoyée par CTEs et médianes, jusqu’aux requêtes de filtrage métier.',
          analysis: {
            question: 'Comment structurer le pipeline SQL pour nettoyer et imputer les données sans modifier la table source ?',
            reading: 'Le schéma montre à gauche la table brute products avec ses anomalies, au centre la transformation par CTEs (typed, medians), et à droite les requêtes d’agrégation et de filtrage.',
            observation: 'Les colonnes continues (weight, price) sont imputées par leur médiane calculée via PERCENTILE_CONT(0.5). Les anomalies de chaînes et d’années sont résolues avec CASE WHEN et COALESCE.',
            interpretation: 'L’utilisation de CTEs évite toute modification destructrice de la table source (UPDATE/ALTER) et permet de produire une vue nettoyée en une seule exécution sans effet de bord.',
            businessInterest: 'Garantit que les analyses de prix et de volumes de ventes reposent sur des données exhaustives et non biaisées par des valeurs aberrantes ou manquantes.',
            limitation: 'L’imputation globale par médiane ne tient pas compte des spécificités par catégorie de produit.',
          },
        },
      ],
    },
    en: {
      context: 'Official DataCamp certification practical exam completed for the Data Analyst Associate certification (November 2026). The notebook solves a PostgreSQL business case study for the FoodYum grocery chain.',
      question: 'How can you audit a system integrity bug, clean and impute a product catalogue without modifying the source table, and identify high-potential categories?',
      dataTitle: 'Data and business context',
      dataConstruction: 'The products table includes product_id, product_type (Produce, Meat, Dairy, Bakery, Snacks), brand, weight in grams, price in USD, monthly average units sold, year_added to stock, and stock_location (A, B, C, D). A 2022 bug resulted in missing values for year_added.',
      methodTitle: 'SQL Methodology',
      methodIntro: 'The exam consists of four sequential, timed tasks validated by automated checks:',
      methodSteps: [
        { title: '1. Audit of the 2022 system bug', description: 'SELECT COUNT(*) AS missing_year query to count products with missing year_added.' },
        { title: '2. Cleaning & imputation pipeline (CTE)', description: 'Built typed CTE to convert types and strip suffixes (\" grams\"), calculated median weight and price using PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ...), and combined via CROSS JOIN and COALESCE without modifying the source table.' },
        { title: '3. Price dispersion analysis', description: 'Calculated minimum and maximum prices grouped by product_type using MIN(price) and MAX(price).' },
        { title: '4. Strategic targeting of key items', description: 'Filtered Meat and Dairy categories to isolate products with average monthly sales strictly greater than 10 units.' },
      ],
      contribution: 'I authored and validated all SQL queries in this timed practical exam, successfully securing the official DataCamp Data Analyst Associate certification.',
      resultsIntro: 'The queries verify the complete resolution of all four practical exam tasks:',
      results: [
        { value: '4 / 4', label: 'Exam tasks validated', detail: 'Audit, CTE data cleaning, price dispersion, and sales targeting.' },
        { value: 'PERCENTILE_CONT', label: 'Vectorized medians', detail: 'Computed medians to impute price and weight without skewness bias.' },
        { value: '8 columns', label: 'Target schema validated', detail: 'Normalized and typed columns strictly matching the data dictionary.' },
      ],
      limitations: [
        'The practical exam runs against the PostgreSQL database provided within the secure DataCamp DataLab environment.',
        'Imputation rules (overall median for price/weight, fixed replacement with 2022 for year_added) follow the explicit exam specification.',
      ],
      conclusion: {
        title: 'Takeaways',
        description: 'This project demonstrates the ability to transform raw, corrupted data into a clean, reproducible analytical dataset ready for business decisions, following strict SQL standards in PostgreSQL.',
      },
      technologies: ['SQL', 'PostgreSQL', 'DataCamp', 'Jupyter Notebook'],
      documents: [
        {
          href: '/projects/grocery-store-sales/notebook',
          label: 'Read the SQL notebook online',
          description: 'Viewable notebook · 12 cells',
          internal: true,
        },
        {
          href: '/documents/projects/grocery-sales-notebook.ipynb',
          label: 'Download source notebook (.ipynb)',
          description: 'Original Jupyter Notebook file',
          download: true,
        },
      ],
      gallery: [
        {
          src: '/images/projects/grocery-store-sales.png',
          alt: 'FoodYum practical exam SQL cleaning and analysis pipeline diagram.',
          title: 'SQL Pipeline & Data Dictionary',
          caption: 'From raw table with anomalies to CTE and median-imputed view, down to targeted business queries.',
          analysis: {
            question: 'How can you design the SQL pipeline to clean and impute data without altering the source table?',
            reading: 'The diagram shows the raw products table on the left, CTE transformations (typed, medians) in the center, and analytical queries on the right.',
            observation: 'Continuous columns (weight, price) are imputed with their median via PERCENTILE_CONT(0.5). String and date anomalies are handled with CASE WHEN and COALESCE.',
            interpretation: 'Using CTEs prevents destructive writes to the source table and yields a clean view in a single atomic query execution.',
            businessInterest: 'Ensures pricing and sales volume analyses are based on complete, uncorrupted data without outlier distortion.',
            limitation: 'Global median imputation does not account for category-specific distributions.',
          },
        },
      ],
    },
  },
} satisfies Record<string, Record<ProjectDetailLocale, ProjectDetailCopy>>;

export type DetailedProjectSlug = keyof typeof PROJECT_DETAIL_COPY;

export function getProjectDetailCopy(slug: string, locale: ProjectDetailLocale): ProjectDetailCopy | undefined {
  if (!Object.prototype.hasOwnProperty.call(PROJECT_DETAIL_COPY, slug)) return undefined;
  return PROJECT_DETAIL_COPY[slug as DetailedProjectSlug][locale];
}
