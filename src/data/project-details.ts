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
      context: 'Pendant mon stage chez Galaxy Solutions (Mohammedia, Maroc), j’ai conçu et développé en autonomie Galaxy Training Manager (GTM). Face à la dispersion des données dans de multiples tableurs, GTM centralise la gestion des formations B2B (catalogues, sessions, clients, formateurs, inscriptions) et intègre un moteur d’analyse décisionnelle (KPIs temps réel, alertes opérationnelles et analyse factorielle ACP). L’application s’appuie sur une modélisation relationnelle 3NF sous MySQL et une suite de 166 tests Pytest. Pour des impératifs de confidentialité, les données présentées dans cette étude utilisent le jeu de démonstration du projet.',
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
        introduction: 'L’application sépare les interfaces, les routes web et API, les règles métier et l’accès aux données. L’intégrité transactionnelle et les calculs analytiques sont rigoureusement exécutés côté serveur.',
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
          { title: 'Contrôle d’accès strict côté serveur (RBAC)', description: 'Isolation étanche des périmètres de données (Admin, Gestionnaire, Formateur) garantie par des décorateurs Python sur chaque route API, bloquant toute tentative d’accès non autorisé par requête directe.' },
          { title: 'Intégrité relationnelle et gestion de capacité', description: 'Contrainte d’unicité SQL composite (session_id, participant_id) empêchant un apprenant de s’inscrire deux fois à la même session. Seules les inscriptions confirmées consomment une place ; une mise sur liste d’attente ne réserve aucun siège avant validation (rejet HTTP 409 si session complète).' },
          { title: 'Moteur décisionnel et agrégations synchronisées', description: 'Traitement serveur des filtres combinés (année, domaine, client, formateur) avec calcul vectorisé des KPIs d’assiduité et de saturation pour garantir des métriques exactes sans approximation côté client.' },
        ],
      },
      contribution: 'J’ai conçu le modèle de données relationnel normalisé et développé l’ensemble de l’application en autonomie : schémas SQLAlchemy, services métier, tableau de bord décisionnel interactif, pipelines d’exports et module d’ACP. Pour des impératifs de confidentialité professionnelle, les captures s’appuient sur le jeu de données de démonstration déterministe inclus dans le dépôt.',
      results: [
        { value: '6', label: 'indicateurs d’activité', detail: 'Sessions et clients actifs, participants formés, taux de remplissage, formations et formateurs mobilisés.' },
        { value: '5', label: 'graphiques interactifs', detail: 'Répartition par domaine, activité par client et formateur, inscriptions mensuelles et jauge de remplissage.' },
        { value: '166', label: 'tests dans le dépôt', detail: 'Le dépôt contient 166 fonctions de test. La dernière exécution disponible en rapporte 166 réussies ; la suite n’a pas été relancée pour cette vérification.' },
        { value: 'CSV · XLSX · PDF', label: 'formats d’export automatisés', detail: 'Feuilles d’émargement vectorielles ReportLab, classeurs openpyxl et exports CSV en utf-8-sig.' },
      ],
      limitations: [
        'Environnement d’évaluation : les métriques et visuels présentés sont issus d’un jeu de données d’essai déterministe modélisant des flux B2B réalistes.',
        'L’ACP est employée à des fins d’analyse factorielle exploratoire (réduction dimensionnelle et typologie des clients B2B), et non comme un modèle prédictif supervisé.',
        'Perspectives d’évolution documentées : implémentation de la pagination côté serveur pour les catalogues à fort volume et intégration de tests E2E automatisés (Playwright).',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie',
        description: 'Galaxy Training Manager a permis de transformer une gestion opérationnelle dispersée sur tableurs en un système d’information décisionnel robuste, modulaire et audité. Le projet démontre l’importance d’un socle relationnel normalisé en 3NF, de l’intégrité des données au niveau du SGBD et de la vérification continue par les tests automatisés.',
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
      context: 'During my internship at Galaxy Solutions (Mohammedia, Morocco), I designed and built Galaxy Training Manager (GTM) autonomously. Addressing data fragmentation across multiple spreadsheets, GTM centralizes B2B training operations (course catalogues, sessions, clients, trainers, enrollments) while embedding decision-support analytics (real-time KPIs, operational alerts, and PCA multivariate analysis). Backed by a 3NF relational model in MySQL and a 166-test Pytest suite, this case study uses the project’s demo dataset to protect client confidentiality.',
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
        title: 'Layered Architecture & Data Flow',
        introduction: 'The application implements a decoupled architecture separating presentation, web and API routes, business rules, and data access. Business validation and analytic computations are strictly executed server-side.',
        layers: [
          { title: '1. Interface & Presentation', description: 'Jinja2 templates styled with Tailwind CSS, augmented by Alpine.js for lightweight reactive interactions (HTTP fetch requests, modals, real-time client-side filter events).' },
          { title: '2. Flask — Routes & Blueprints', description: 'HTTP request handling (GET, POST, PUT, DELETE), authentication state management, and declarative RBAC permission decorators.' },
          { title: '3. Business Services Tier', description: 'Reusable core logic: enrollment validation (HTTP 409 conflict rejection on full sessions), trainer-scoped visibility rules, KPI calculations, and PCA computations.' },
          { title: '4. SQLAlchemy ORM & MySQL 8.0', description: 'Optimized SQL query translation and schema versioning via Alembic. MySQL 8.0 engine enforcing referential integrity and foreign key constraints.' },
        ],
      },
      keyDecisions: {
        title: 'Engineering Decisions & Business Rules',
        items: [
          { title: 'Server-Side RBAC Authorization', description: 'Strict role-based isolation (Admin, Manager, Trainer) enforced via backend Python decorators on each REST endpoint, preventing unauthorized queries regardless of client-side UI state.' },
          { title: 'Relational Integrity & Capacity Management', description: 'Database-level composite unique constraint on (session_id, participant_id) preventing a participant from registering twice for the same session. Capacity rules ensure that waitlist entries do not count as confirmed seats, triggering an automated HTTP 409 rejection upon saturation.' },
          { title: 'Server-Side Analytic Aggregations', description: 'Synchronized multi-criteria filtering (year, domain, client, trainer) with server-side KPI recalculation, ensuring accurate operational metrics without client-side approximation.' },
        ],
      },
      contribution: 'I designed the normalized relational data model and built the entire application autonomously: SQLAlchemy schemas, business logic services, interactive decision dashboards, export pipelines, and the PCA exploratory tool. For confidentiality purposes, screenshots rely on the deterministic demo dataset included in the repository.',
      results: [
        { value: '6', label: 'activity indicators', detail: 'Active sessions and clients, trained learners, average fill rate, courses, and mobilized trainers.' },
        { value: '5', label: 'interactive charts', detail: 'Activity distribution by domain, client, and trainer, plus monthly enrollment velocity and fill rates.' },
        { value: '166', label: 'tests in the repository', detail: 'The repository has 166 test functions. The latest available run records 166 passing tests; the suite was not rerun for this review.' },
        { value: 'CSV · XLSX · PDF', label: 'file formats', detail: 'Clean Excel-compatible CSVs (utf-8-sig), styled multi-tab XLSX workbooks, and vector PDF attendance sheets.' },
      ],
      limitations: [
        'Evaluation dataset: all metrics and screenshots are generated from a deterministic test dataset modeling realistic B2B training operations.',
        'PCA is utilized strictly for exploratory multivariate analysis (dimensional reduction and client typology), rather than a supervised predictive model.',
        'Documented roadmap highlights server-side pagination for high-volume catalogs and automated end-to-end tests (Playwright).',
      ],
      conclusion: {
        title: 'Key Takeaways & Engineering Assessment',
        description: 'Galaxy Training Manager successfully transitioned B2B training operations from fragmented spreadsheets to a centralized, auditable information system. It underscores the critical value of 3NF relational normalization, server-enforced business constraints, and comprehensive automated test suites in delivering dependable business intelligence.',
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
      context: 'Ce projet étudie les données transactionnelles publiques d’Olist, principale place de marché e-commerce brésilienne, sur la période 2016–2018. Structuré autour de neuf tables relationnelles interconnectées (commandes, paiements, articles, catalogues produits, vendeurs, clients et avis), le travail porte sur l’intégrité des données, la modélisation des flux logistiques et l’analyse quantitative de la satisfaction client.',
      question: 'Comment auditer la cohérence d’un schéma relationnel à cardinalités multiples, éliminer les biais d’agrégation (fan-out) et quantifier l’impact des retards de livraison sur la satisfaction client ?',
      featuredFinding: 'Pour 96 244 commandes avec les dates nécessaires, la livraison prend 12,1 jours en moyenne et 10 jours au milieu de la distribution (médiane logistique robuste aux valeurs extrêmes). Parmi ces commandes, 6 531 sont arrivées après la date prévue, soit un taux de retard de 6,8 %.',
      methodIntro: 'La démarche s’articule autour de l’intégrité relationnelle et du contrôle de granularité. Étant donné la cardinalité 1-N entre commandes, articles et règlements échelonnés, les agrégations sont rigoureusement exécutées avant jointure pour fixer le grain d’analyse à la commande unique sans duplication transactionnelle :',
      methodSteps: [
        { title: 'Audit d’intégrité & Typage', description: 'Contrôle des formats, des clés primaires/étrangères, conversion vectorisée des timestamps et identification des valeurs manquantes.' },
        { title: 'Contrôle de granularité (Grain Commande)', description: 'Agrégation pré-jointure des articles et paiements pour éliminer le phénomène de fan-out et préserver la somme transactionnelle exacte.' },
        { title: 'Calcul vectorisé des KPIs logistiques', description: 'Calcul des délais réels d’acheminement, détection de la dérive par rapport à la date estimée et segmentation des scores de satisfaction.' },
        { title: 'Analyse statistique & Rigueur causale', description: 'Analyse univariée et bivariée des distributions, corrélation empirique et identification stricte des limites d’interprétation causale.' },
      ],
      contribution: 'Ce projet académique (module Traitement de Données, IID1, ENSA Khouribga) a été réalisé en binôme avec Maktou Azeddine. J’ai conçu et exécuté l’intégralité du pipeline technique : ingestion et nettoyage des 9 tables relationnelles, résolution des anomalies chronologiques et doublons, jointures sans perte, calcul vectorisé des indicateurs logistiques (délais réels vs estimés, taux de retard) et réalisation des analyses et graphiques du notebook final.',
      results: [],
      limitations: [
        'Échantillon logistique : 8 commandes présentent des timestamps de livraison non renseignés (NaN) et sont exclues des calculs de durée, fixant le sous-ensemble logistique à 96 244 commandes.',
        'Prudence causale : l’analyse bivariée délai-note met en évidence une association statistique négative, mais ne constitue pas une preuve causale isolée sans contrôle multivarié des autres dimensions (prix, qualité produit, service client).',
        'Contrôle qualité : la visualisation exploratoire des notes par statut de livraison a été écartée de la restitution finale en l’absence de confirmation indépendante des volumétries sous-jacentes.',
        'Biais d’attribution catégorielle : le classement des ventes par catégorie est exclu de l’étude, car le montant total d’une commande multi-produits était arbitrairement attribué à la catégorie de son premier article.',
        'Représentativité régionale : les disparités logistiques par État brésilien nécessitent des données complémentaires sur les infrastructures routières, les prestataires tiers et les distances kilométriques réelles.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie & Enseignements analytiques',
        description: 'L’audit approfondi du dataset Olist illustre l’importance capitale de l’Analytics Engineering : maîtriser les cardinalités relationnelles et consolider les tables au bon grain d’agrégation avant toute jointure évite les erreurs critiques de surévaluation financière. L’analyse quantitative prouve empiriquement la sensibilité des clients au respect de la promesse de livraison, tout en maintenant la distinction indispensable entre corrélation observée et causalité métier.',
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
          title: 'Schéma relationnel & Alignement des granularités',
          introduction: 'Le modèle source articule neuf tables autour de l’entité centrale orders. Les cardinalités 1-N sur order_items, order_payments et order_reviews imposent une stratégie rigoureuse de réduction au grain commande pour prévenir toute duplication lors des jointures relationnelles.',
        },
        preparation: {
          title: 'Pipeline ETL, Déduplication & Filtrage de Cohérence',
          introduction: 'Le pipeline de préparation assainit progressivement les flux transactionnels afin de garantir la comparabilité des métriques logistiques et éliminer tout risque d’artéfact statistique :',
          steps: [
            { value: '99 441', title: 'Commandes initiales', description: 'Volumétrie brute enregistrée dans la table source orders sur la période 2016–2018.' },
            { value: '99 275', title: 'Contrôle chronologique', description: 'Purge de 166 enregistrements incohérents présentant une date de livraison antérieure à la validation du paiement.' },
            { value: '96 313', title: 'Commandes livrées', description: 'Filtrage strict sur le statut delivered, isolant le cycle logistique achevé des flux annulés ou en transit.' },
            { value: '96 252', title: 'Jeu d’analyse final', description: 'Consolidation finale après exclusion de 61 anomalies résiduelles d’horodatage et doublons orphelins.' },
          ],
          conclusion: 'L’agrégation systématique des articles et paiements au niveau de la commande unique produit une table d’analyse dénormalisée fiable, exempte de tout biais de surcomptage.',
        },
        delivery: {
          title: 'Délais d’acheminement & Analyse de la dérive logistique',
          introduction: 'Le délai d’acheminement réel mesure le temps écoulé entre la commande et sa réception client. Le statut de retard quantifie la dérive par rapport à la date de livraison promise (délai estimé).',
          metrics: [
            { value: '12,1 jours', label: 'durée réelle moyenne', detail: 'Calculée sur l’échantillon des commandes livrées disposant de timestamps valides.' },
            { value: '10 jours', label: 'durée réelle médiane', detail: 'Délai médian robuste aux valeurs extrêmes (50 % des commandes acheminées en 10 jours ou moins).' },
            { value: '6 531', label: 'commandes en retard', detail: 'Sur 96 244 commandes avec les dates nécessaires, identifiées par dépassement de la date estimée.' },
            { value: '≈ 6,8 %', label: 'taux de retard observé', detail: '6 531 sur 96 244 ; les 8 commandes aux timestamps incomplets sont isolées.' },
          ],
        },
        satisfaction: {
          title: 'Impact des délais sur la satisfaction client (Reviews)',
          introduction: 'Le score de satisfaction moyen s’établit à 4,16 / 5 sur un échantillon de 95 150 avis qualifiés. La distribution montre une nette sensibilité de la notation à la durée d’acheminement.',
          metrics: [
            { value: '4,16 / 5', label: 'note moyenne globale', detail: '95 150 avis consolidés avec score d’évaluation renseigné.' },
          ],
        },
        financial: {
          title: 'Agrégations financières & Distribution des paniers',
          introduction: 'La comparaison des grandeurs moyennes et médianes met en lumière une asymétrie positive prononcée de la distribution des paniers d’achat, tirée par une minorité de commandes à fort montant.',
          indicators: [
            { value: '159,88 BRL', label: 'montant moyen par commande', detail: 'Frais de livraison inclus ; valeur sensible aux paniers atypiques de forte valeur.' },
            { value: '105,28 BRL', label: 'montant médian par commande', detail: 'Indicateur central robuste reflétant le panier d’achat typique d’un consommateur (frais de livraison inclus).' },
            { value: '≈ 13,2 M BRL', label: 'total des prix des articles', detail: 'Volume brut d’affaires cumulé des articles (GMV transactionnel), qui ne constitue ni un revenu net ni un bénéfice pour la marketplace.' },
          ],
          note: 'Le classement des ventes par catégorie de produits est volontairement écarté afin de ne pas propager le biais d’attribution au premier article observé dans les commandes multi-catégories.',
        },
      },
      gallery: [
        {
          src: '/images/projects/olist-schema-relations.png',
          alt: 'Schéma relationnel des neuf tables Olist, dont orders, order_items, order_payments, order_reviews, customers, sellers et products.',
          title: 'Schéma relationnel & Cardinalités multi-tables',
          caption: 'Modélisation relationnelle des 9 entités interconnectées autour du flux de commande.',
          analysis: {
            question: 'Comment structurer les jointures relationnelles pour agréger les commandes sans introduire d’erreur de surcomptage (fan-out) ?',
            reading: 'Le schéma cartographie les 9 tables, leurs clés primaires/étrangères et les relations liant commandes, clients, paiements, articles, catalogues et avis. Les tables order_items et order_payments présentent une cardinalité 1-N avec orders.',
            observation: 'L’entité centrale orders structure le cycle de vie transactionnel. Ses tables satellites d’exécution (articles, règlements multiples) contiennent fréquemment plusieurs enregistrements pour une même commande.',
            interpretation: 'Une jointure directe sans agrégation préalable produirait un produit cartésien partiel (fan-out) multipliant artificiellement les lignes de commande et surévaluant les montants totaux. Un regroupement strict par commande est indispensable avant fusion.',
            businessInterest: 'Garantir la fiabilité absolue des agrégations financières et logistiques indispensables au pilotage de la marketplace.',
            limitation: 'Le modèle conceptuel décrit la structure relationnelle théorique sans préjuger de la complétude opérationnelle des horodatages ou de la présence de valeurs nulles.',
          },
        },
        {
          src: '/images/projects/olist-delais-livraison.png',
          alt: 'Boîtes à moustaches de la durée de livraison en jours, séparée entre commandes à temps et commandes en retard.',
          title: 'Distribution des délais réels selon le respect de l’estimation',
          caption: 'Boxplots comparatifs des durées d’acheminement : décalage de la médiane et dispersion des valeurs aberrantes.',
          analysis: {
            question: 'Quelle est la dispersion statistique réelle des délais de livraison entre commandes conformes et commandes en retard ?',
            reading: 'L’abscisse segmente les commandes selon leur statut logistique (livrées dans les délais vs après la date estimée). L’ordonnée mesure le délai réel en jours. Chaque boîte détaille la médiane et l’écart interquartile (IQR) ; les points isolés identifient les valeurs aberrantes (outliers).',
            observation: 'La médiane et l’IQR du groupe en retard sont nettement déportés vers le haut. Une longue traîne de valeurs aberrantes s’étend au-delà de 60 jours d’acheminement, particulièrement prononcée pour les commandes retardées.',
            interpretation: 'Les commandes en retard subissent une dégradation combinée du délai absolu et du non-respect de la promesse client. La présence d’outliers extrêmes souligne des ruptures opérationnelles localisées.',
            businessInterest: 'Distinguer la performance de transport absolue du respect de l’engagement commercial, afin de recalibrer les algorithmes d’estimation des dates de livraison.',
            limitation: 'La visualisation ne pondère pas les volumes respectifs des deux cohortes (6,8 % de commandes en retard) et ne permet pas d’isoler l’impact de la distance géographique sans données géospatiales jointes.',
          },
        },
        {
          src: '/images/projects/olist-delai-note.png',
          alt: 'Graphique en français des notes moyennes sur cinq selon cinq tranches de durée de livraison, de 0 à 7 jours à plus de 30 jours.',
          title: 'Sensibilité du score de satisfaction à la durée d’acheminement',
          caption: 'Évolution de la note moyenne par tranche de délai réel : décroissance continue avec rupture au-delà de 21 jours.',
          analysis: {
            question: 'Existe-t-il une corrélation empirique entre l’allongement de la durée de livraison et la dégradation de la satisfaction client ?',
            reading: 'L’axe horizontal découpe les commandes livrées en cinq tranches de délai réel (0–7j, 8–14j, 15–21j, 22–30j et >30j). L’axe vertical reporte la note moyenne de satisfaction sur l’échelle standard de 1 à 5 étoiles.',
            observation: 'La note moyenne décroît de manière monotone à mesure que le délai augmente. Une rupture marquée apparaît à partir de la tranche 22–30 jours et s’accentue au-delà de 30 jours de transport.',
            interpretation: 'L’expérience client est directement corrélée à la vélocité logistique. L’accroissement du délai amplifie l’insatisfaction, particulièrement lorsque la commande franchit le seuil critique des trois semaines.',
            businessInterest: 'Définir un seuil d’alerte logistique proactif à J+14 pour déclencher des actions correctives (notification client, suivi transporteur prioritaire) avant la bascule dans la zone critique de notation.',
            limitation: 'Cette relation bivariée décrit une association empirique globale sans contrôle d’autres variables d’influence (qualité intrinsèque du produit, conformité du colis, interactions avec le vendeur).',
          },
        },
      ],
    },
    en: {
      context: 'This project investigates transactional data from Olist, Brazil’s leading e-commerce marketplace, spanning 2016 to 2018. Structured around nine interconnected relational tables (orders, payments, items, product catalogues, sellers, customers, and reviews), the case study focuses on relational data integrity, logistics flow modeling, and empirical satisfaction analytics.',
      question: 'How can an analytics engineer audit a complex one-to-many relational schema, eliminate fan-out aggregation bias, and quantify the operational impact of delivery delays on customer satisfaction?',
      featuredFinding: 'For 96,244 orders with valid timestamps, delivery took 12.1 days on average with a median lead time of 10 days (robust to extreme logistics outliers). Among these orders, 6,531 arrived past their estimated delivery date, representing an observed late delivery rate of 6.8%.',
      methodIntro: 'The methodology is centered on relational data hygiene and strict grain resolution. Because orders exhibit 1-to-N cardinality with items and multi-installment payments, aggregations are executed prior to joins to preserve a clean single-row-per-order grain without financial inflation:',
      methodSteps: [
        { title: 'Schema Audit & Vectorized Typing', description: 'Audited primary and foreign keys, converted datetime strings to vectorized timestamps, and resolved missing values.' },
        { title: 'Granularity Alignment (Order Grain)', description: 'Pre-aggregated items and payment installments prior to joining, eliminating fan-out duplicates and preserving exact revenue figures.' },
        { title: 'Logistics KPI & Drift Computation', description: 'Calculated actual transit duration, measured delivery drift against promised delivery dates, and segmented review distributions.' },
        { title: 'Bivariate Analysis & Causal Caution', description: 'Investigated lead time vs review score associations while explicitly documenting the boundary between empirical correlation and causality.' },
      ],
      contribution: 'This academic project (Data Processing course, IID1, ENSA Khouribga) was conducted in pair with Maktou Azeddine. I designed and executed the entire technical pipeline: ingestion and sanitization of the 9 relational tables, resolution of chronological anomalies and duplicate records, zero-loss joins, vectorized computation of logistical metrics (actual vs estimated delivery, delay rates), and creation of the exploratory analyses and charts in the final notebook.',
      results: [],
      limitations: [
        'Timestamp completeness: 8 records lack delivery completion timestamps (NaN) and are excluded from transit calculations, establishing the valid logistics sample at 96,244 orders.',
        'Causal inference: the observed negative association between transit lead time and review scores represents an empirical pattern, not an isolated causal proof without multivariately controlling for product quality, price tier, or merchant responsiveness.',
        'Quality gating: an exploratory breakdown of ratings by delivery status was excluded from the final deliverable due to unconfirmed underlying group volumes.',
        'Category attribution caveat: revenue ranking by category is deliberately omitted, as multi-item orders were provisionally assigned to the first item category, introducing catalog-level attribution bias.',
        'Geographic granularity: regional delay variations across Brazilian states require supplementary logistics telemetry (actual freight distance, carrier contract types, and road infrastructure data).',
      ],
      conclusion: {
        title: 'Key Takeaways & Analytics Assessment',
        description: 'The in-depth audit of the Olist dataset demonstrates the core discipline of Analytics Engineering: resolving relational cardinality and pre-aggregating data at the proper grain prevents catastrophic financial miscalculations. The quantitative findings validate customer sensitivity to fulfillment promises, while upholding the fundamental analytical distinction between observed correlation and business causality.',
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
          title: 'Relational Schema & Grain Alignment',
          introduction: 'The source schema connects nine tables around the central orders entity. The 1-to-N cardinalities of order_items, order_payments, and order_reviews require strict pre-join aggregation to maintain an order-level grain and avoid duplicate records.',
        },
        preparation: {
          title: 'Data Sanitization, Deduplication & Validation Pipeline',
          introduction: 'The ETL pipeline systematically cleanses the transactional stream to ensure metric comparability and prevent statistical artifacts:',
          steps: [
            { value: '99,441', title: 'Initial orders', description: 'Raw order volume recorded in the primary orders table across the 2016–2018 observation window.' },
            { value: '99,275', title: 'Chronological validation', description: 'Removal of 166 inconsistent records exhibiting delivery timestamps prior to payment approval.' },
            { value: '96,313', title: 'Delivered orders', description: 'Strict filtering on delivered status, isolating fulfilled supply chain cycles from cancelled or in-transit orders.' },
            { value: '96,252', title: 'Final analysis dataset', description: 'Final consolidated dataset after pruning 61 residual timestamp anomalies and orphan records.' },
          ],
          conclusion: 'Pre-aggregating item prices and payment installments to the order level produces an authoritative denormalized analysis table free from fan-out distortions.',
        },
        delivery: {
          title: 'Fulfillment Lead Times & Delivery Drift Analytics',
          introduction: 'Actual transit lead time measures the duration between order placement and customer receipt. Delivery drift evaluates performance against the estimated delivery date communicated at purchase.',
          metrics: [
            { value: '12.1 days', label: 'average actual delivery time', detail: 'Computed across delivered orders with complete and validated timestamp records.' },
            { value: '10 days', label: 'median delivery lead time', detail: 'Median fulfillment duration robust to extreme logistics delays (50% delivered in 10 days or less).' },
            { value: '6,531', label: 'late orders', detail: 'Out of 96,244 orders with valid delivery dates, identified where actual delivery exceeded estimated delivery.' },
            { value: '≈ 6.8%', label: 'observed late rate', detail: '6,531 out of 96,244; 8 orders lacking complete timestamp data are excluded from transit metrics.' },
          ],
        },
        satisfaction: {
          title: 'Impact of Delivery Lead Time on Customer Satisfaction',
          introduction: 'The dataset records an overall average rating of 4.16 out of 5 across 95,150 evaluated reviews, exhibiting pronounced sensitivity to delivery lead time.',
          metrics: [
            { value: '4.16 / 5', label: 'overall average rating', detail: '95,150 customer reviews with a recorded rating score.' },
          ],
        },
        financial: {
          title: 'Financial Aggregations & Basket Value Distribution',
          introduction: 'Comparing mean and median metrics highlights substantial right-skewness in order value, driven by a high-value transaction tail.',
          indicators: [
            { value: '159.88 BRL', label: 'average amount per order', detail: 'Shipping fee included; metric reflects sensitivity to high-value basket outliers.' },
            { value: '105.28 BRL', label: 'median amount per order', detail: 'Robust central tendency metric reflecting a typical customer basket (shipping fee included).' },
            { value: '≈ BRL 13.2m', label: 'total item prices', detail: 'Cumulative gross merchandise value of ordered items; this is not the marketplace’s net revenue or profit.' },
          ],
          note: 'Category revenue breakdowns are excluded to prevent propagating the first-item category attribution bias present in multi-product baskets.',
        },
      },
      gallery: [
        {
          src: '/images/projects/olist-schema-relations.png',
          alt: 'Relational diagram of the nine Olist tables, including orders, order_items, order_payments, order_reviews, customers, sellers, and products.',
          title: 'Relational Schema & Multi-Table Cardinality',
          caption: 'Entity-relationship model of 9 tables interconnected around the e-commerce order lifecycle.',
          analysis: {
            question: 'How should relational joins be architected to aggregate order metrics without fan-out inflation?',
            reading: 'The diagram details the 9 tables, primary/foreign keys, and 1-to-N relationships linking orders to items, payments, customers, and reviews.',
            observation: 'The central orders table defines transaction progress. Satellite execution tables (items, payment installments) routinely store multiple records per order.',
            interpretation: 'Direct naive joining produces partial Cartesian fan-out, inflating line counts and distorting financial totals. Strict pre-aggregation at the order grain is mandatory.',
            businessInterest: 'Guarantees uncompromised accuracy across operational and financial KPIs driving executive marketplace decisions.',
            limitation: 'The schema reflects structural entity relationships; it does not guarantee timestamp completeness or the absence of null values in production data.',
          },
        },
        {
          src: '/images/projects/olist-delais-livraison.png',
          alt: 'Box plots of delivery time in days, split between on-time and late orders. The chart labels are in French.',
          title: 'Actual Lead Time Distribution by Delivery Status',
          caption: 'Comparative boxplots of fulfillment lead times: median shift and distribution of extreme outliers.',
          analysis: {
            question: 'What is the empirical lead time spread between on-time orders and late deliveries?',
            reading: 'The horizontal axis partitions orders by delivery status (on-time vs delayed). The vertical axis tracks transit days. Each box displays the median and interquartile range (IQR); dots represent extreme statistical outliers.',
            observation: 'The median and IQR for delayed orders are significantly shifted upward. A pronounced tail of extreme outliers extends past 60 days, predominantly in the late delivery cohort.',
            interpretation: 'Delayed orders suffer compounded operational degradation. The extreme long-tail outliers indicate isolated supply chain breakdowns and regional transit bottlenecks.',
            businessInterest: 'Separates absolute logistics speed from commitment accuracy, providing actionable benchmarks to retrain automated ETA prediction models.',
            limitation: 'The visualization does not convey relative cohort sizes (6.8% delayed orders) and cannot isolate geographic distance without joined geospatial coordinates.',
          },
        },
        {
          src: '/images/projects/olist-delai-note.png',
          alt: 'Chart in French of average ratings out of five across five delivery-time groups, from 0–7 days to over 30 days.',
          title: 'Review Score Sensitivity to Fulfillment Lead Time',
          caption: 'Average rating by delivery duration cohort: monotonic decay with steep drop-off beyond 21 days.',
          analysis: {
            question: 'How does extended fulfillment lead time quantitatively correlate with customer satisfaction scores?',
            reading: 'The horizontal axis groups delivered orders into five lead time brackets (0–7d, 8–14d, 15–21d, 22–30d, and >30d). The vertical axis tracks average customer review scores from 1 to 5 stars.',
            observation: 'Average review scores exhibit monotonic decline as transit time increases, with a sharp drop-off emerging past the 21-day mark and accelerating beyond 30 days.',
            interpretation: 'Customer perception is acutely tied to fulfillment velocity. Transit lead time increases customer friction, especially when exceeding the 3-week threshold.',
            businessInterest: 'Establish an automated proactive intervention threshold at Day 14 (carrier expediting, proactive customer messaging) before shipments enter the critical satisfaction drop-off window.',
            limitation: 'This bivariate relationship reflects an empirical correlation without multivariately controlling for product defect rates, packaging compliance, or seller responsiveness.',
          },
        },
      ],
    },
  },
  afc: {
    fr: {
      context: 'Ce projet étudie les exigences en compétences publiées sur LinkedIn en 2023 et 2024. Structuré autour de méthodes d’analyse multivariée, il analyse comment les profils de qualifications se structurent et s’associent statistiquement à travers six grands domaines professionnels.',
      question: 'Quelles affinités et proximités statistiques structurent la répartition des compétences à travers les différents domaines professionnels ?',
      featuredFinding: 'Le tableau compte 25 955 mentions de domaines et de compétences. Le test global d’indépendance donne un χ² = 67 617,28 (170 degrés de liberté, p < 0,001). Le premier plan factoriel restitue 56,2 % de l’inertie totale ; les trois premiers axes factoriels en capturent environ 81 %.',
      dataConstruction: 'La matrice de contingence croise 6 domaines et 35 compétences, soit 210 paires possibles. Elle totalise 25 955 mentions extraites des offres étudiées. Une même annonce pouvant stipuler plusieurs qualifications, le nombre de mentions reflète la volumétrie lexicale globale et non le décompte brut des offres.',
      methodIntro: 'L’AFC projette les profils-lignes et profils-colonnes dans un espace vectoriel de dimension réduite muni de la métrique du χ². L’algorithme standardise les résidus sous l’hypothèse d’indépendance, applique une décomposition en valeurs singulières (SVD) et extrait les facteurs principaux :',
      methodSteps: [
        { title: '1. Matrice des profils & Marges', description: 'Calcul de la matrice de correspondance $P$, des masses relatives lignes ($r$) et colonnes ($c$), et des profils conditionnels associés.' },
        { title: '2. Matrice de contingence & Écarts', description: 'Construction de la matrice 6 × 35 croisant chaque modalité et évaluation des écarts à l’indépendance théorique.' },
        { title: '3. Test d’indépendance du χ²', description: 'Calcul de la statistique du χ² sur la matrice globale (170 degrés de liberté) confirmant le rejet catégorique de l’hypothèse d’indépendance (p < 0,001).' },
        { title: '4. Décomposition SVD & Métriques', description: 'Diagonalisation de la matrice des résidus standardisés $S = D_r^{-1/2} (P - r c^T) D_c^{-1/2}$, extraction des valeurs propres $\\lambda_k$, calcul des coordonnées factorielles et filtrage par les cos².' },
      ],
      contribution: 'Ce projet académique a été mené en binôme avec Mohammed Sadik sous la supervision du Pr. Ahmed Aghrich. J’ai développé l’intégralité de l’implémentation logicielle et algorithmique en Python : vectorisation NumPy des 8 étapes du pipeline (de la contingence au biplot), décomposition SVD, calcul automatisé des métriques d’inertie, des contributions (CTR) et de la qualité de projection (cos²).',
      results: [
        { value: '6 × 35', label: 'domaines et compétences', detail: '210 paires possibles dans le tableau de contingence.' },
        { value: '25 955', label: 'mentions de compétences', detail: 'Total des occurrences extraites des offres analysées.' },
        { value: 'χ² = 67 617,28', label: 'test global · 170 ddl', detail: 'Test d’indépendance du χ² attestant d’une liaison globale hautement significative.' },
        { value: '2,6052', label: 'inertie totale', detail: 'Inertie totale (phi-deux) mesurant la dispersion multivariée des profils.' },
        { value: 'F1 29,2 % · F2 27,0 %', label: 'inertie par axe', detail: 'Taux de variance restitué par chacun des deux premiers axes factoriels.' },
        { value: '56,2 %', label: 'inertie sur les axes 1–2', detail: 'Inertie cumulée du plan factoriel principal (les axes suivants capturant 43,8 %).' },
      ],
      limitations: [
        'Périmètre observationnel : l’analyse reflète strictement les distributions observées dans ce corpus LinkedIn. Elle ne prédit pas l’évolution future des compétences requises et ne constitue pas un recensement exhaustif du marché du travail.',
        'Portée statistique : le test du χ² produit un résultat global attestant d’une dépendance hautement significative à l’échelle de la matrice entière, mais ne prouve pas une affinité statistique spécifique pour chaque paire domaine–compétence prise isolément.',
        'Projection factorielle : le plan F1–F2 restitue 56,2 % de l’inertie totale. L’interprétation de la proximité des modalités exige l’examen scrupuleux des cos² afin d’éviter les surinterprétations géométriques.',
        'Métrique cos² : le cos² mesure exclusivement la qualité d’ajustement au sous-espace factoriel (pourcentage de distance à l’origine restitué) ; il ne quantifie en aucun cas l’importance économique d’une compétence ni la force absolue d’une corrélation métier.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie & Enseignements statistiques',
        description: 'L’implémentation from scratch de l’Analyse Factorielle des Correspondances démontre la puissance de l’algèbre linéaire appliquée à la réduction dimensionnelle. En traduisant fidèlement la métrique du χ² et la décomposition SVD en calcul vectorisé sous NumPy, ce projet produit une cartographie rigoureuse des compétences tout en respectant scrupuleusement les contraintes de validité géométrique imposées par les cos².',
      },
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
      repository: 'https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances',
      documents: [
        { href: '/documents/projects/afc-methodology-presentation-fr.pdf', label: 'Support méthodologique — Présentation de l’AFC (22 slides, PDF)' },
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
          alt: 'Biplot factoriel symétrique des six domaines et des compétences, avec atténuation visuelle des modalités affichant un cos² inférieur à 0,5.',
          title: 'Biplot factoriel symétrique (Domaines & Compétences)',
          caption: 'Projection factorielle F1–F2 (56,2 % de l’inertie). Les modalités affichant un cos² < 0,5 sont atténuées sans étiquette pour prévenir les surinterprétations géométriques.',
          analysis: {
            question: 'Quelles associations statistiques et proximités factorielles le plan F1–F2 met-il en évidence entre domaines professionnels et compétences ?',
            reading: 'Les losanges figurent les profils-lignes (6 domaines) et les points représentent les profils-colonnes (35 compétences). Les coordonnées correspondent aux projections factorielles symétriques. Les modalités avec cos² < 0,5 sont atténuées sans étiquette pour éviter les biais de lecture.',
            observation: 'Finance & Comptabilité se projette au plus près de Finance et Accounting/Auditing. Commerce & Marketing s’associe fortement à Sales et Business Development. Certains profils techniques affichent une moindre projection sur ce plan initial.',
            interpretation: 'Les proximités géométriques traduisent des profils de compétences différenciés par rapport au profil moyen d’indépendance. La distance du χ² entre points traduit leur degré de co-occurrence préférentielle.',
            businessInterest: 'Permet aux recruteurs et responsables pédagogiques de cartographier objectivement les blocs de compétences distinctifs propres à chaque filière professionnelle.',
            limitation: 'Le premier plan capture 56,2 % de l’inertie. Si Finance & Comptabilité bénéficie d’une excellente projection (cos² ≈ 0,994), Technique & Ingénierie (cos² ≈ 0,437) et Data & Analyse (cos² ≈ 0,208) requièrent l’inspection des axes factoriels ultérieurs pour une interprétation complète.',
          },
        },
        {
          src: '/images/projects/afc-screeplot.png',
          alt: 'Éboulis des valeurs propres : F1 restitue 29,2 % de l’inertie, F2 27,0 %, et le plan F1–F2 cumule 56,2 %.',
          title: 'Éboulis des valeurs propres & Décomposition de l’inertie',
          caption: 'Histogramme des valeurs propres et courbe d’inertie cumulée : les trois premiers axes factoriels capturent 81 % de l’inertie totale.',
          analysis: {
            question: 'Comment l’inertie totale de la matrice se répartit-elle le long des axes factoriels principaux ?',
            reading: 'Les barres représentent la part de variance expliquée par chaque facteur ($\lambda_k$). La courbe orange trace le cumul d’inertie. Le premier plan (axes 1 et 2) est mis en surbrillance.',
            observation: 'Le facteur F1 capture 29,2 % et F2 restitue 27,0 %, totalisant 56,2 % de l’inertie sur le premier plan. L’axe 3 apporte 24,8 points supplémentaires pour atteindre environ 81 % de variance cumulée.',
            interpretation: 'L’éboulis confirme que deux axes suffisent pour résumer plus de la moitié de l’information structurante, mais le troisième axe conserve un poids substantiel justifiant une exploration tridimensionnelle.',
            businessInterest: 'Valider le pouvoir explicatif et les limites de compressibilité de l’espace factoriel avant prise de décision décisionnelle.',
            limitation: 'Les axes 3 à 5 conservent 43,8 % de l’inertie globale. Toute conclusion fondée exclusivement sur le plan F1–F2 doit vérifier la contribution et le cos² des points projetés.',
          },
        },
        {
          src: '/images/projects/afc-qualite-representation.png',
          alt: 'Scores cos² des six domaines sur F1–F2 : Finance et Comptabilité 0,9942, Commerce et Marketing 0,8137, Technique et Ingénierie 0,4368, Gestion de Projet 0,2504, Data et Analyse 0,2082, RH et Recrutement 0,0975.',
          title: 'Qualité de projection factorielle (Scores cos² par domaine)',
          caption: 'Diagramme des cos² par domaine sur F1–F2. Le seuil de 0,5 distingue les profils fidèlement restitués de ceux nécessitant l’examen des axes d’ordre supérieur.',
          analysis: {
            question: 'Quels domaines professionnels bénéficient d’une qualité de projection suffisante sur le premier plan factoriel ?',
            reading: 'Chaque barre rapporte le score de cos² d’un profil-ligne sur F1–F2. La ligne en pointillés à 0,5 matérialise le seuil d’acceptabilité méthodologique usuel.',
            observation: 'Finance & Comptabilité (cos² = 0,9942) et Commerce & Marketing (cos² = 0,8137) sont très fidèlement projetés. Technique & Ingénierie (0,4368), Data & Analyse (0,2082), Gestion de Projet (0,2504) et RH (0,0975) restent sous le seuil de 0,5.',
            interpretation: 'La projection F1–F2 est hautement représentative pour les activités financières et commerciales, mais déforme la position relative des domaines techniques dont la variance s’exprime principalement sur l’axe F3.',
            businessInterest: 'Empêche d’émettre des conclusions managériales erronées sur des domaines mal projetés dans l’espace 2D.',
            limitation: 'Le cos² est un indicateur de représentativité géométrique (carré du cosinus de l’angle avec le sous-espace) ; un cos² élevé n’implique ni une surreprésentation quantitative ni une supériorité statistique du domaine concerné.',
          },
        },
      ],
    },
    en: {
      context: 'This project investigates technical skill requirements across LinkedIn job listings published in 2023 and 2024. Leveraging multivariate statistical methods, it analyzes how skill competencies structure and associate across six primary professional domains.',
      question: 'Which statistical associations and factorial affinities govern the distribution of competencies across professional domains?',
      featuredFinding: 'The contingency table records 25,955 mentions across domains and skills. The global independence test yields χ² = 67,617.28 (170 degrees of freedom, p < 0.001). The primary factorial plane accounts for 56.2% of the total inertia, and the first three principal axes capture approximately 81%.',
      dataConstruction: 'The contingency table cross-tabulates 6 fields and 35 skills, representing 210 possible pairs. It aggregates 25,955 mentions identified across the job ads studied. Because an individual listing can specify multiple competencies, the total count reflects aggregate skill occurrences rather than unique job postings.',
      methodIntro: 'Correspondence Analysis maps row and column profiles into a lower-dimensional Euclidean subspace endowed with the χ² metric. The algorithm standardizes profile deviations under the hypothesis of statistical independence, executes Singular Value Decomposition (SVD), and extracts principal factors:',
      methodSteps: [
        { title: '1. Profile Matrix & Margins', description: 'Computed correspondence matrix $P$, row and column marginal mass vectors ($r$, $c$), and conditional profile coordinates.' },
        { title: '2. Contingency Table Construction', description: 'Structured the 6 × 35 cross-tabulation table aggregating observed frequencies and expected independent distributions.' },
        { title: '3. Global χ² Independence Test', description: 'Computed matrix-wide χ² test statistic (170 degrees of freedom), confirming categorical rejection of the independence hypothesis (p < 0.001).' },
        { title: '4. SVD Decomposition & Metrics', description: 'Diagonalized the standardized residuals matrix $S = D_r^{-1/2} (P - r c^T) D_c^{-1/2}$, computed eigenvalues $\\lambda_k$, coordinate projections, and cos² quality metrics.' },
      ],
      contribution: 'This academic project was conducted in pair with Mohammed Sadik under the supervision of Prof. Ahmed Aghrich. I took full ownership of the software and algorithmic implementation in Python: NumPy vectorization of the 8 pipeline steps (from contingency table to final biplot), SVD decomposition, automated computation of inertia metrics, contributions (CTR), and projection quality (cos²).',
      results: [
        { value: '6 × 35', label: 'fields and skills', detail: '210 candidate pairs across the contingency matrix.' },
        { value: '25,955', label: 'skill mentions', detail: 'Aggregated occurrences documented across all analyzed job listings.' },
        { value: 'χ² = 67,617.28', label: 'overall test · 170 df', detail: 'Global χ² independence test validating highly significant multivariate dependence.' },
        { value: '2.6052', label: 'total inertia', detail: 'Total matrix inertia (phi-squared) measuring multidimensional profile dispersion.' },
        { value: 'F1 29.2% · F2 27.0%', label: 'inertia by axis', detail: 'Share of explained variance accounted for by each of the first two principal axes.' },
        { value: '56.2%', label: 'inertia on axes 1–2', detail: 'Cumulative inertia captured on the primary factorial plane (subsequent axes capture 43.8%).' },
      ],
      limitations: [
        'Observational boundary: the analysis reflects specific empirical patterns within this LinkedIn sample. It does not forecast future labor market demand or capture the entire employment landscape.',
        'Statistical scope: the χ² test provides a global test across the full contingency matrix, without validating an isolated statistically significant affinity for each field–skill pair independently.',
        'Factorial variance: the F1–F2 plane captures 56.2% of the total inertia. Spatial proximity between points with low cos² values must be interpreted with caution.',
        'Interpretation of cos²: the cos² score indicates how well a profile vector is projected onto the subspace; it does not measure the commercial weight of a skill or the absolute strength of an operational link.',
      ],
      conclusion: {
        title: 'Key Takeaways & Statistical Assessment',
        description: 'The from-scratch implementation of Correspondence Analysis highlights the practical power of linear algebra in dimensional reduction. By faithfully implementing the χ² metric and singular value decomposition in vectorized NumPy, this project delivers an authoritative competency map while strictly adhering to geometric projection validity constraints imposed by cos² metrics.',
      },
      technologies: ['Python', 'Jupyter', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
      repository: 'https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances',
      documents: [
        { href: '/documents/projects/afc-methodology-presentation-fr.pdf', label: 'Methodological Presentation — Correspondence Analysis (22 slides, PDF)' },
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
          alt: 'Symmetric factorial biplot of six professional fields and competencies, featuring visual de-emphasis for modalities with cos² below 0.5.',
          title: 'Symmetric Factorial Biplot (Fields & Skills)',
          caption: 'Factorial projection on F1–F2 (56.2% total inertia). Points with cos² < 0.5 are faded without labels to prevent geometric overinterpretation.',
          analysis: {
            question: 'What statistical affinities and factorial proximities does the F1–F2 plane reveal between professional domains and skills?',
            reading: 'Diamonds designate row profiles (6 domains) and circles denote column profiles (35 skills). Factor coordinates follow symmetric scaling. Modalities with cos² < 0.5 are faded without text labels.',
            observation: 'Finance & Accounting projects adjacent to Finance and Accounting/Auditing. Commerce & Marketing tightly aligns with Sales and Business Development. Technical domains exhibit lower representation on this initial plane.',
            interpretation: 'Spatial proximities quantify preferential co-occurrence relative to the theoretical centroid of independence, governed by the χ² metric.',
            businessInterest: 'Provides talent acquisition and academic leaders with an empirical benchmark to map distinct competency clusters across professional paths.',
            limitation: 'The primary plane accounts for 56.2% of total inertia. While Finance & Accounting is cleanly projected (cos² ≈ 0.994), Technology & Engineering (cos² ≈ 0.437) and Data & Analytics (cos² ≈ 0.208) require consulting subsequent factorial axes.',
          },
        },
        {
          src: '/images/projects/afc-screeplot.png',
          alt: 'Scree plot: F1 captures 29.2% of inertia, F2 27.0%, and both axes together accumulate 56.2%.',
          title: 'Scree Plot & Eigenvalue Inertia Decomposition',
          caption: 'Eigenvalue distribution and cumulative inertia curve: the first three principal axes capture approximately 81% of total matrix variance.',
          analysis: {
            question: 'How is total matrix inertia distributed across principal factorial axes?',
            reading: 'Bars quantify explained variance per factor (lambda_k). The continuous orange line tracks cumulative inertia. The primary plane (axes 1 and 2) is highlighted.',
            observation: 'Axis F1 explains 29.2% and F2 explains 27.0%, aggregating 56.2% across the first two axes. Factor 3 adds 24.8 percentage points to achieve approximately 81% cumulative variance.',
            interpretation: 'The scree plot confirms that two dimensions capture over half of the underlying structural variation, while the third factor holds substantial explanatory value for three-dimensional analysis.',
            businessInterest: 'Validates dimensionality trade-offs before relying on 2D geometric representations for organizational decision-making.',
            limitation: 'Axes 3 through 5 retain 43.8% of residual inertia. Conclusions drawn strictly from the F1–F2 projection must cross-verify cos² values.',
          },
        },
        {
          src: '/images/projects/afc-qualite-representation.png',
          alt: 'Cos² scores for six areas on axes F1–F2: Finance and Accounting 0.9942, Commerce and Marketing 0.8137, Technology and Engineering 0.4368, Project Management 0.2504, Data and Analysis 0.2082, HR and Recruitment 0.0975.',
          title: 'Factorial Projection Quality (cos² Scores by Field)',
          caption: 'Diagram of cos² values per domain on F1–F2. The 0.5 benchmark separates well-projected profiles from those requiring higher-order axes inspection.',
          analysis: {
            question: 'Which professional domains achieve sufficient projection quality on the primary factorial plane?',
            reading: 'Each bar represents the cos² score of a row profile on F1–F2. The dashed line at 0.5 indicates the customary threshold of geometric acceptability.',
            observation: 'Finance & Accounting (cos² = 0.9942) and Commerce & Marketing (cos² = 0.8137) are cleanly represented. Technology & Engineering (0.4368), Data & Analytics (0.2082), Project Management (0.2504), and HR (0.0975) remain below 0.5.',
            interpretation: 'The F1–F2 subspace provides high fidelity for financial and commercial domains, but projects technical engineering disciplines with distortion, as their variance primarily aligns with factor F3.',
            businessInterest: 'Prevents misinterpreting distances for domains poorly captured within the 2D plane.',
            limitation: 'The cos² metric measures geometric projection adequacy (squared cosine of the angle with the subspace); high cos² does not denote greater operational importance or superior statistical standing.',
          },
        },
      ],
    },
  },
  acp: {
    fr: {
      context: 'Application de l’Analyse en Composantes Principales (ACP) normée sur un jeu de données socio-économiques couvrant 169 pays et 9 indicateurs multidimensionnels (PIB/habitant, revenu, espérance de vie, mortalité infantile, fertilité, inflation, importations, exportations, dépenses de santé). L’analyse structure une démarche d’exploration statistique rigoureuse : audit de complétude, centrage-réduction Z-score pour s’affranchir des disparités d’échelles et d’unités, décomposition spectrale de la matrice des corrélations, projection factorielle et validation métrique par le calcul des contributions et de la qualité de représentation (cos²).',
      question: 'Comment synthétiser 9 indicateurs macro-économiques et sanitaires hétérogènes pour comparer objectivement les typologies des pays sans distorsion d’échelle ?',
      featuredFinding: 'Le premier plan factoriel (F1 × F2) capte 63,86 % de l’inertie totale (47,25 % sur F1 et 16,61 % sur F2). F1 oppose structurellement le niveau de développement humain et de richesse matérielle à la vulnérabilité sanitaire et démographique, tandis que F2 traduit l’intensité des échanges commerciaux. Les 36,14 % d’inertie résiduelle imposent toutefois un contrôle systématique des cos² avant toute conclusion individuelle.',
      methodIntro: 'L’exploration statistique suit une chaîne de traitement standardisée sous Python (Pandas, NumPy, Matplotlib, Seaborn) : vérification de l’intégrité du dataset (169 observations complètes), normalisation des variables, calcul de la matrice de corrélation de Pearson, extraction des valeurs propres et analyse critique de la dimensionnalité.',
      methodSteps: [
        {
          title: 'Audit de complétude & Contrôle d’intégrité',
          description: 'Chargement du dataset de 169 pays, audit des distributions empiriques et filtrage des observations pour garantir une matrice de données exempte de valeurs manquantes.',
        },
        {
          title: 'Centrage-réduction & Normalisation Z-score',
          description: 'Standardisation des 9 variables quantitatives pour éliminer les biais d’échelle et rendre comparables des grandeurs hétérogènes (monnaies, taux pour 1 000, pourcentages).',
        },
        {
          title: 'Décomposition spectrale & Sélection dimensionnelle',
          description: 'Calcul de la matrice de corrélation, diagonalisation et extraction des valeurs propres (λk). Confrontation conjointe du critère de Kaiser et du critère du coude de Cattell.',
        },
        {
          title: 'Projection factorielle & Validation métrique',
          description: 'Projection des observations et des variables sur les axes factoriels, interprétation sémantique via le cercle des corrélations, et validation des coordonnées par l’examen des contributions et des cos².',
        },
      ],
      keyDecisions: {
        title: 'Décisions méthodologiques & Arbitrages statistiques',
        items: [
          {
            title: 'Normalisation Z-score systématique (ACP normée)',
            description: 'Les variables présentant des ordres de grandeur disparates (PIB par habitant en dollars vs taux de mortalité infantile pour 1 000), l’analyse sur matrice de corrélation évite que les variables à forte variance brute n’écrasent artificiellement les axes.',
          },
          {
            title: 'Contrôle critique de l’inertie résiduelle (36,14 %)',
            description: 'Refus de sur-interpréter la carte F1 × F2 : les 36,14 % d’inertie portée par les axes 3 à 9 imposent de vérifier le cos² de chaque pays avant de valider sa proximité géométrique.',
          },
          {
            title: 'Analyse critique du critère de Kaiser sur F3',
            description: 'Identification rigoureuse de la division par n dans le calcul de la variance (matrice de corrélation à diagonale 168/169), expliquant pourquoi λ3 = 0,9986 se situe juste sous le seuil 1,0 sans disqualifier formellement l’information résiduelle.',
          },
        ],
      },
      contribution: 'Conception et exécution intégrale d’un notebook d’analyse statistique multivariée en Python : pipeline de prétraitement, centrage-réduction, décomposition spectrale, visualisations factorielles avancées et analyse métrique rigoureuse (contributions, cos², examen des valeurs propres).',
      results: [
        { value: '169', label: 'pays analysés', detail: 'Échantillon mondial complet après contrôle d’intégrité sur les 9 indicateurs.' },
        { value: '47,25 %', label: 'inertie expliquée par F1', detail: 'Axe structurant majeur opposant richesse et longévité à précarité infantile et natalité.' },
        { value: '63,86 %', label: 'inertie cumulée F1 + F2', detail: 'F2 capte 16,61 % (intensité commerciale). Les dimensions F3 à F9 portent les 36,14 % restants.' },
      ],
      limitations: [
        'Élimination préalable des observations incomplètes : les conclusions s’appliquent strictement aux 169 pays disposant des 9 indicateurs validés.',
        'Inertie résiduelle de 36,14 % : le premier plan factoriel offre une vue synthétique puissante mais partielle de la structure multidimensionnelle.',
        'Distorsion potentielle des faibles cos² : la proximité visuelle de deux pays sur le plan F1 × F2 est trompeuse si leur part de variance expliquée par ce plan est faible.',
        'Nature strictement descriptive et exploratoire : l’ACP met en évidence des proximités et des corrélations linéaires, sans inférence causale ni capacité prédictive.',
      ],
      conclusion: {
        title: 'Bilan méthodologique & Enseignements statistiques',
        description: 'L’ACP normée synthétise efficacement 9 indicateurs macro-économiques et sanitaires pour comparer les 169 pays, dégageant un axe prédominant de développement humain (F1, 47,25 %) et un axe d’ouverture commerciale (F2, 16,61 %). Cette étude illustre la nécessité de coupler la lecture graphique à une validation métrique rigoureuse (cos², contributions, analyse spectrale) pour éviter les conclusions hâtives sur des projections partielles.',
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
          caption: 'Dispersion des 169 pays sur les deux premiers axes factoriels résumant 63,86 % de l’inertie totale.',
          analysis: {
            question: 'Comment les 169 pays se différencient-ils et se regroupent-ils selon leur profil macro-économique et sanitaire ?',
            reading: 'L’axe horizontal F1 (47,25 % d’inertie) et l’axe vertical F2 (16,61 %) forment le plan factoriel principal. Chaque point représente un pays projeté. La proximité spatiale traduit une similarité de profils sous réserve d’un cos² suffisant.',
            observation: 'F1 sépare nettement les pays développés à haut revenu, fort PIB/habitant et forte espérance de vie (à droite) des pays à forte mortalité infantile et fécondité élevée (à gauche). F2 discrimine verticalement l’intensité des flux commerciaux (exportations/importations).',
            interpretation: 'Le premier axe structure un gradient universel de développement humain et de richesse matérielle, tandis que le second axe reflète le degré d’intégration dans les échanges commerciaux mondiaux.',
            businessInterest: 'Fournit une cartographie synthétique des disparités macro-économiques mondiales, servant de socle exploratoire objectif avant tout partitionnement non supervisé (clustering k-means ou classification ascendante hiérarchique).',
            limitation: '36,14 % de l’inertie reste portée par les axes supérieurs. Deux pays visuellement proches sur F1-F2 peuvent diverger sur les dimensions F3 à F9 si leurs cos² sur ce plan sont limités.',
          },
        },
        {
          src: '/images/projects/acp-correlation-matrice.png',
          alt: 'Matrice de corrélation linéaire entre neuf indicateurs économiques et de santé.',
          title: 'Matrice de corrélation de Pearson',
          caption: 'Interdépendances linéaires entre indicateurs avant réduction de dimension par décomposition spectrale.',
          analysis: {
            question: 'Quelles sont les corrélations bivariées et les colinéarités entre les 9 indicateurs socio-économiques ?',
            reading: 'Heatmap des coefficients de corrélation linéaire de Pearson, arrondis à une décimale, entre -1 (bleu/froid) et +1 (chaud/rouge). La diagonale affichée est arrondie à 1 ; la formule du notebook donne 168/169 (≈ 0,994).',
            observation: 'Les sorties du notebook, arrondies à une décimale, montrent une corrélation positive d’environ 0,9 entre PIB/habitant et revenu, et entre mortalité infantile et fécondité, ainsi qu’une corrélation négative d’environ -0,9 entre espérance de vie et mortalité infantile.',
            interpretation: 'Ces fortes liaisons mettent en évidence des redondances informationnelles substantielles, validant pleinement la pertinence d’une réduction de dimensionnalité par ACP.',
            businessInterest: 'Permet d’identifier les colinéarités directes afin de simplifier les futurs tableaux de bord de suivi macro-économique et d’éviter les redondances dans les modèles statistiques.',
            limitation: 'Le coefficient de Pearson ne capte que les dépendances purement linéaires et demeure sensible aux valeurs atypiques extrêmes (ex. micro-états ou pays à PIB exceptionnel).',
          },
        },
        {
          src: '/images/projects/acp-eboulis-valeurs-propres.png',
          alt: 'Éboulis des valeurs propres et part d’inertie expliquée par chaque composante principale.',
          title: 'Éboulis des valeurs propres (Scree Plot)',
          caption: 'Part d’inertie expliquée par chaque axe factoriel et variance cumulée (63,86 % sur F1+F2).',
          analysis: {
            question: 'Quelle est la répartition de l’inertie factorielle et combien d’axes retenir pour l’interprétation ?',
            reading: 'Les barres représentent la part de variance portée par chaque valeur propre (λk). La courbe cumulative indique le pourcentage cumulé de variance captée.',
            observation: 'Le notebook affiche λ1 = 4,2270 (47,25 %), λ2 = 1,4860 (16,61 %) et λ3 = 0,9986 (11,16 %). Les trois premiers axes cumulent 75,02 % de l’inertie.',
            interpretation: 'Le notebook présente F1 et F2 comme les axes les plus pertinents à interpréter et les visualise ensemble (63,86 %). Toutefois, il standardise avec l’écart-type d’échantillon puis divise par n : la diagonale de la matrice vaut 168/169 et λ3 se trouve juste sous 1. La règle de Kaiser ne justifie donc pas, à elle seule, de s’arrêter à deux axes.',
            businessInterest: 'Permet d’arbitrer rationnellement le compromis entre réduction de dimension et fidélité de l’information statistique, en documentant rigoureusement la perte d’information induite.',
            limitation: 'L’omission des axes F3 à F9 écarte 36,14 % de la variance totale, ce qui peut masquer des signaux faibles ou des spécificités nationales secondaires.',
          },
        },
        {
          src: '/images/projects/acp-cercle-correlations.png',
          alt: 'Cercle des corrélations des 9 indicateurs sur le plan factoriel F1 x F2.',
          title: 'Cercle des corrélations (F1 × F2)',
          caption: 'Projection des variables dans le cercle unité : interprétation sémantique des axes et qualité de représentation.',
          analysis: {
            question: 'Quels indicateurs structurent chaque axe factoriel et quelles oppositions thématiques émergent ?',
            reading: 'Les variables sont projetées sous forme de vecteurs dans le cercle de corrélation unitaire. La longueur de la flèche reflète la qualité de représentation (cos² proche de 1 au bord du cercle). L’angle entre deux flèches traduit leur corrélation.',
            observation: 'gdpp, income et life_expec pointent fortement vers la droite sur F1, à l’opposé direct de child_mort et total_fer (pointant à gauche). exports et imports pointent conjointement vers le haut le long de F2.',
            interpretation: 'F1 est l’axe du développement humain et économique (richesse et santé contre précarité infantile et natalité non maîtrisée). F2 est l’axe de l’intensité des échanges extérieurs.',
            businessInterest: 'Fournit la grille de lecture sémantique indispensable pour décoder la position de chaque pays sur le plan factoriel et traduire les coordonnées mathématiques en indicateurs métier compréhensibles.',
            limitation: 'Les variables dont les vecteurs s’écartent de la bordure unitaire présentent une fraction substantielle de leur inertie reportée sur les axes ultérieurs (notamment F3).',
          },
        },
      ],
    },
    en: {
      context: 'Normalized Principal Component Analysis (PCA) applied to a socio-economic dataset covering 169 countries across 9 multidimensional indicators (GDP per capita, income, life expectancy, child mortality, fertility rate, inflation, imports, exports, and health spending). The project implements a disciplined statistical workflow: data integrity checks, Z-score standardization to eliminate unit and scale disparities, spectral decomposition of the correlation matrix, factorial projection, and metric validation via contributions and squared cosines (cos²).',
      question: 'How can 9 heterogeneous macro-economic and health indicators be synthesized to objectively compare country typologies without scale bias?',
      featuredFinding: 'The primary factorial plane (F1 × F2) captures 63.86% of total inertia (47.25% on F1 and 16.61% on F2). F1 structures a primary opposition between human development/material wealth and child vulnerability/high fertility, while F2 reflects foreign trade intensity. The remaining 36.14% residual inertia mandates systematic cos² verification prior to individual interpretations.',
      methodIntro: 'The statistical workflow is structured in Python using Pandas, NumPy, Matplotlib, and Seaborn: complete observation auditing (169 rows), Z-score variable standardization, Pearson correlation matrix computation, eigenvalue extraction, and dimensional selection.',
      methodSteps: [
        {
          title: 'Data Integrity & Completeness Audit',
          description: 'Loading the 169-country dataset, auditing empirical distributions, and filtering observations to ensure an intact data matrix free of missing values.',
        },
        {
          title: 'Z-Score Standardization & Centering',
          description: 'Standardizing all 9 quantitative variables to remove scale discrepancies and enable rigorous comparisons across heterogeneous units (currencies, per-thousand rates, percentages).',
        },
        {
          title: 'Spectral Decomposition & Dimensional Selection',
          description: 'Computing the correlation matrix, diagonalizing, and extracting eigenvalues (λk). Jointly evaluating Kaiser’s criterion and Cattell’s scree test.',
        },
        {
          title: 'Factorial Projection & Metric Validation',
          description: 'Projecting observations and variables onto factorial planes, establishing semantic interpretations via the correlation circle, and validating coordinates through relative contributions and cos² values.',
        },
      ],
      keyDecisions: {
        title: 'Methodological Decisions & Statistical Trade-offs',
        items: [
          {
            title: 'Systematic Z-score Standardization (Normalized PCA)',
            description: 'Because indicators span drastically different orders of magnitude (GDP per capita in thousands vs child mortality rates), performing PCA on the correlation matrix prevents raw high-variance variables from artificially dictating the axes.',
          },
          {
            title: 'Critical Oversight of Residual Inertia (36.14%)',
            description: 'Refusing over-interpretation of the F1 × F2 map: the 36.14% inertia held by components 3 through 9 requires checking individual cos² values before confirming visual proximity between countries.',
          },
          {
            title: 'Critical Examination of the Kaiser Rule on F3',
            description: 'Identifying that the notebook divides by n (producing a 168/169 diagonal), which places λ3 = 0.9986 just below the 1.0 threshold without disqualifying its valuable residual variance.',
          },
        ],
      },
      contribution: 'End-to-end design and execution of a multivariate statistical analysis notebook in Python: preprocessing pipeline, Z-score standardization, spectral decomposition, advanced factorial visualizations, and rigorous metric assessment (contributions, cos², scree analysis).',
      results: [
        { value: '169', label: 'countries analysed', detail: 'Complete global sample after integrity checks across all 9 indicators.' },
        { value: '47.25%', label: 'inertia explained by F1', detail: 'Major structural axis contrasting wealth and longevity with infant vulnerability and fertility.' },
        { value: '63.86%', label: 'cumulative inertia F1 + F2', detail: 'F2 captures 16.61% (trade openness). Dimensions F3 through F9 hold the remaining 36.14%.' },
      ],
      limitations: [
        'Prior exclusion of incomplete rows: findings strictly characterize the 169 countries with complete observations across all 9 indicators.',
        'Residual inertia of 36.14%: the primary factorial plane provides a powerful yet partial synthesis of the multidimensional dataset.',
        'Geometric distortion from low cos²: visual proximity on the F1 × F2 plane can be misleading for observations with weak representation on these dimensions.',
        'Strictly exploratory scope: PCA reveals linear associations and proximities without implying causality or predictive capacity.',
      ],
      conclusion: {
        title: 'Key Takeaways & Methodological Assessment',
        description: 'Normalized PCA effectively synthesizes 9 macro-economic and health indicators across 169 nations, isolating a primary human development axis (F1, 47.25%) and a trade integration axis (F2, 16.61%). This case study emphasizes coupling graphical exploration with rigorous metric validation (cos², contributions, spectral decomposition) to prevent unfounded conclusions on reduced projections.',
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
          caption: 'Dispersion of 169 countries across the first two factorial axes capturing 63.86% of total inertia.',
          analysis: {
            question: 'How do the 169 countries differ and cluster according to their macro-economic and health profiles?',
            reading: 'The horizontal axis F1 (47.25% of inertia) and the vertical axis F2 (16.61%) form the primary factorial plane. Each point represents a projected nation. Spatial proximity reflects multivariate similarity, provided representation quality (cos²) is sufficient.',
            observation: 'F1 clearly separates high-income, high-GDP, long-life-expectancy countries (on the right) from nations facing high infant mortality and elevated fertility rates (on the left). F2 vertically differentiates foreign trade intensity (exports/imports).',
            interpretation: 'The first axis captures a primary global gradient of human development and material wealth, while the second reflects external trade integration.',
            businessInterest: 'Provides an objective global mapping of macro-economic profiles, serving as a clean exploratory baseline prior to unsupervised clustering (k-means or hierarchical agglomerative clustering).',
            limitation: '36.14% of inertia remains on higher dimensions. Two visually close points may differ substantially along axes F3 to F9 if their cos² is low.',
          },
        },
        {
          src: '/images/projects/acp-correlation-matrice.png',
          alt: 'Linear correlation matrix for nine economic and health indicators.',
          title: 'Pearson correlation matrix',
          caption: 'Linear dependencies across indicators prior to dimensionality reduction via spectral decomposition.',
          analysis: {
            question: 'What bivariate correlations and collinearities exist among the 9 socio-economic indicators?',
            reading: 'Heatmap showing Pearson linear correlation coefficients rounded to one decimal, from -1 (cool blue) to +1 (warm red). The displayed diagonal rounds to 1; the notebook formula gives 168/169 (about 0.994).',
            observation: 'The notebook output, rounded to one decimal, shows positive correlations of about 0.9 between GDP per capita and income, and between infant mortality and fertility, and a negative correlation of about -0.9 between life expectancy and infant mortality.',
            interpretation: 'These strong associations demonstrate substantial informational redundancies, fully justifying dimensionality reduction via PCA.',
            businessInterest: 'Pinpoints direct collinearities to streamline executive monitoring dashboards and prevent redundant regressors in downstream statistical models.',
            limitation: 'Pearson r only evaluates linear relationships and can be sensitive to extreme economic outliers.',
          },
        },
        {
          src: '/images/projects/acp-eboulis-valeurs-propres.png',
          alt: 'Scree plot of eigenvalues and variance explained by each principal component.',
          title: 'Eigenvalue scree plot (Cattell Scree Test)',
          caption: 'Inertia explained per factorial axis and cumulative variance (63.86% on F1+F2).',
          analysis: {
            question: 'How is factorial inertia distributed and how many components should be retained for interpretation?',
            reading: 'Bars indicate the variance share explained by each eigenvalue (λk). The stepped line traces cumulative explained variance.',
            observation: 'The notebook reports λ1 = 4.2270 (47.25%), λ2 = 1.4860 (16.61%), and λ3 = 0.9986 (11.16%). The first three axes show 75.02% of the total inertia.',
            interpretation: 'The notebook presents F1 and F2 as the most relevant axes to interpret and plots them together (63.86%). However, it standardizes with the sample standard deviation and then divides by n: the matrix diagonal is 168/169 and λ3 falls just below 1. The Kaiser rule alone therefore does not justify stopping at two axes.',
            businessInterest: 'Enables a principled trade-off between dimensionality reduction and statistical information preservation by rigorously quantifying information loss.',
            limitation: 'Ignoring components 3 through 9 discards 36.14% of total variability, which may overlook localized nuances in specific countries.',
          },
        },
        {
          src: '/images/projects/acp-cercle-correlations.png',
          alt: 'Correlation circle of the 9 indicators on factorial plane F1 x F2.',
          title: 'Correlation circle (F1 × F2)',
          caption: 'Projection of variables within the unit circle: axis thematic interpretation and quality of representation.',
          analysis: {
            question: 'Which indicators drive each factorial axis and what thematic contrasts emerge?',
            reading: 'Variables are projected as vectors within a radius-1 circle. Projection onto an axis measures its correlation with that axis. A vector approaching the circumference indicates high representation quality (cos² near 1).',
            observation: 'gdpp, income, and life_expec point rightward along F1, directly opposite child_mort and total_fer (pointing left). exports and imports point upward together along F2.',
            interpretation: 'F1 reflects global socio-economic development (wealth and health vs infant mortality and high fertility). F2 represents external trade dynamism.',
            businessInterest: 'Supplies the semantic interpretation required to accurately decipher country positions on the factorial map and translate mathematical coordinates into actionable business insights.',
            limitation: 'Variables whose arrows do not reach the perimeter have a portion of their inertia projected onto higher axes (F3).',
          },
        },
      ],
    },
  },
  'revision-flow': {
    fr: {
      context: 'Application web monopage (SPA) 100 % client-side conçue pour optimiser les cycles de révision universitaires face aux contraintes temporelles strictes. Dotée d’un algorithme glouton déterministe d’allocation temporelle, elle répartit dynamiquement la charge de travail en séances par jour selon un principe d’entrelacement des matières (interleaving effect), tout en isolant explicitement dans un backlog d’inadmissibilité les tâches qui ne peuvent pas être placées dans le planning compte tenu des capacités horaires définies.',
      question: 'Comment modéliser un moteur d’ordonnancement transparent en temps réel capable d’adapter dynamiquement la charge de travail aux aléas sans dégrader l’historique des sessions ?',
      methodIntro: 'L’architecture repose sur un pipeline algorithmique pur navigateur : calcul d’un score d’urgence logarithmique par matière, pénalisation géométrique d’entrelacement (P/2^k), et régénération sélective des jours à venir garantissant l’intégrité immuable des jours passés, tandis que les sessions en dépassement de capacité horaire sont isolées dans un backlog d’arbitrage temporel explicite.',
      methodSteps: [
        {
          title: 'Modélisation des matières & Échéances',
          description: 'Paramétrage des modules, coefficients de difficulté (1 à 5), découpage en chapitres et dates d’examen cibles pour établir la charge de révision brute.',
        },
        {
          title: 'Contraintes de capacité & Calendrier',
          description: 'Définition des créneaux hebdomadaires ouvrés/week-ends, durée atomique des sessions, jours de repos et intégration des jours fériés légaux via l’API REST Nager.Date.',
        },
        {
          title: 'Ordonnancement glouton & Entrelacement cognitif',
          description: 'Priorisation logarithmique amortie et application d’une pénalité géométrique P/2^k forçant l’alternance des disciplines sur une même journée pour maximiser la rétention.',
        },
        {
          title: 'Gestion d’état réactive & Persistance locale',
          description: 'Pattern Store centralisé (flux unidirectionnel) pilotant le minuteur Pomodoro sonore (Web Audio API), la persistance localStorage avec migration de schéma et l’export JSON.',
        },
      ],
      keyDecisions: {
        title: 'Décisions d’ingénierie logicielle & Arbitrages produit',
        items: [
          {
            title: 'Score de priorité logarithmique amorti',
            description: 'Formulation P_i = (difficulté × chapitres) × (1 + 1 / ln(Δt + 2)) au lieu d’un simple ratio linéaire d’urgence, évitant qu’un examen imminent ne préempte brutalement l’ensemble des créneaux quotidiens.',
          },
          {
            title: 'Architecture Store centralisée sans framework',
            description: 'Implémentation d’un pattern Store inspiré de Redux (State.get / update / subscribe) en pur JavaScript ES6+, garantissant l’immutabilité des mutations d’état et la synchronisation atomique du localStorage.',
          },
          {
            title: 'Signalement honnête de la surcharge via backlog',
            description: 'Isoler les sessions excédant la capacité horaire dans un backlog visible plutôt que de compresser artificiellement les durées, offrant à l’étudiant un levier clair pour arbitrer sa charge.',
          },
        ],
      },
      contribution: 'J’ai conçu et développé RevisionFlow individuellement en JavaScript vanilla, HTML5 et CSS3. J’ai implémenté l’algorithme de calcul du planning dynamique avec gestion du backlog d’inadmissibilité temporelle, la persistance locale via localStorage (avec sérialisation/désérialisation JSON), le minuteur Pomodoro audio (Web Audio API) et le suivi chronologique.',
      results: [
        { value: 'Temps réel', label: 'Recalcul déterministe', detail: 'Régénération dynamique des jours futurs préservant l’immutabilité des jours passés.' },
        { value: 'Backlog actif', label: 'Détection de surcharge', detail: 'Isolement immédiat des sessions hors capacité horaire pour un arbitrage transparent.' },
        { value: '5 max.', label: 'plannings sauvegardés', detail: 'L’historique garde jusqu’à cinq plannings complets avec leurs statistiques de vélocité.' },
      ],
      limitations: [
        'Entrelacement heuristique : l’atténuation par facteur P/2^k favorise la variété cognitive journalière mais ne constitue pas une garantie d’alternance stricte en cas de très forte contrainte temporelle.',
        'Persistance locale exclusive : les données restent dans le navigateur, sans synchronisation entre appareils. Elles dépendent du cache local, avec un module d’import/export JSON prévu pour la sauvegarde.',
        'Dépendance réseau pour les calendriers : la récupération dynamique des jours fériés légaux utilise le service Nager.Date et demande une connexion internet active.',
        'Périmètre descriptif d’ordonnancement : l’outil optimise l’allocation du temps disponible mais ne mesure pas directement l’efficacité d’apprentissage ou les résultats aux examens.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie logicielle & Enseignements produit',
        description: 'RevisionFlow démontre la faisabilité d’une application d’ordonnancement complexe entièrement exécutée côté client en pur JavaScript. La séparation stricte entre passé immuable et futur recalculé, combinée au refus d’occulter la surcharge temporelle, offre un modèle d’outillage productif transparent et résilient, sans dépendance serveur ni coûts d’infrastructure.',
      },
      technologies: ['JavaScript ES6+', 'HTML5', 'CSS3', 'localStorage', 'Web Audio API', 'REST API (Nager.Date)'],
      repository: 'https://github.com/Godwin-08/RevisionFlow',
      documents: [
        { href: '/documents/projects/revisionflow-report-fr.pdf', label: 'Rapport complet de RevisionFlow (PDF)' },
      ],
      supervisors: [
        { name: 'Loubna Rabhi', role: 'Encadrante académique' },
      ],
      gallery: [
        { src: '/images/projects/revisionflow-focus.png', alt: 'Tableau de bord RevisionFlow avec les séances prévues et terminées, le résumé du jour et le minuteur Pomodoro.', title: 'Vue Focus & Minuteur Pomodoro', caption: 'Interface d’exécution journalière combinant les sessions programmées, les compteurs de progression et le minuteur cadencé par Web Audio API.' },
        { src: '/images/projects/revisionflow-planning.png', alt: 'Calendrier mensuel des révisions avec l’état des jours et les prochaines dates d’examen.', title: 'Calendrier mensuel & Échéances', caption: 'Vue calendaire synoptique matérialisant les créneaux alloués, la densité d’effort quotidienne et les jalons d’évaluation.' },
        { src: '/images/projects/revisionflow-progression.png', alt: 'Planning sauvegardé en lecture seule avec sa progression, ses séances et trois matières de démonstration.', title: 'Suivi de vélocité & Progression', caption: 'Visualisation de l’avancement consolidé par module et contrôle de la charge restante par rapport aux objectifs fixés.' },
        { src: '/images/projects/revisionflow-historique.png', alt: 'Historique en lecture seule des plannings sauvegardés avec leur taux de complétion et d’autres informations.', title: 'Historique des cycles & Archivage', caption: 'Console d’archivage multi-plans conservant les indicateurs clés (taux de complétion, séries continues et sessions validées).' },
      ],
    },
    en: {
      context: 'Client-side Single Page Application (SPA) designed to optimize academic revision cycles under strict calendar constraints. Driven by a deterministic greedy scheduling engine, the app dynamically allocates workload into daily sessions with cognitive subject interleaving, while explicitly isolating tasks that cannot fit in the plan into an overload backlog based on configured daily capacities.',
      question: 'How can a real-time deterministic scheduling engine adapt study plans to unexpected delays without altering past session records?',
      methodIntro: 'The client-side architecture implements a browser-native algorithmic pipeline: logarithmic urgency scoring per subject, geometric interleaving penalties (P/2^k), and selective future regeneration that preserves past days intact, while sessions exceeding capacity limits are routed into a dedicated overload backlog.',
      methodSteps: [
        {
          title: 'Subject Modeling & Deadlines',
          description: 'Configuring modules, difficulty coefficients (1 to 5), chapter breakdowns, and target exam deadlines to evaluate raw revision volume.',
        },
        {
          title: 'Capacity Constraints & Calendar Rules',
          description: 'Defining weekly weekday/weekend available hours, atomic session lengths, rest days, and public holiday integration via the Nager.Date REST API.',
        },
        {
          title: 'Greedy Scheduling & Interleaving Heuristic',
          description: 'Logarithmically damped prioritization coupled with geometric penalty P/2^k to alternate subjects within each day, reducing cognitive saturation.',
        },
        {
          title: 'Reactive State Architecture & Local Persistence',
          description: 'Centralized Store pattern (unidirectional data flow) driving the Web Audio API Pomodoro timer, schema-migrated localStorage persistence, and JSON exports.',
        },
      ],
      keyDecisions: {
        title: 'Software Engineering Decisions & Product Trade-offs',
        items: [
          {
            title: 'Damped Logarithmic Urgency Scoring',
            description: 'Formulation P_i = (difficulty × chapters) × (1 + 1 / ln(Δt + 2)) over a linear urgency ratio, preventing an imminent exam from monopolizing all daily slots at the expense of subsequent subjects.',
          },
          {
            title: 'Centralized Framework-Free Store Pattern',
            description: 'Implementing a Redux-inspired Store pattern (State.get / update / subscribe) in pure modern JavaScript, enforcing immutable state transitions and clean component decoupling.',
          },
          {
            title: 'Transparent Overload Backlog Isolation',
            description: 'Routing impossible sessions into a visible backlog rather than artificially compressing session lengths, delivering honest workload visibility.',
          },
        ],
      },
      contribution: 'I designed and built RevisionFlow on my own with vanilla JavaScript, HTML5, and CSS3. I implemented dynamic schedule generation with overload backlog handling, browser storage via localStorage (JSON serialization), audio Pomodoro timer (Web Audio API), and plan history tracking.',
      results: [
        { value: 'Real-time', label: 'Deterministic recalculation', detail: 'Dynamic future schedule regeneration preserving the immutability of past days.' },
        { value: 'Active Backlog', label: 'Transparent overload detection', detail: 'Immediate isolation of sessions exceeding time capacity for realistic planning.' },
        { value: 'Up to 5', label: 'saved plans', detail: 'History preserves up to five full study plans with completion velocity metrics.' },
      ],
      limitations: [
        'Heuristic rotation: geometric damping P/2^k promotes daily cognitive variety but cannot mathematically guarantee strict alternation under extreme urgency.',
        'Browser-local storage boundary: all data remain in local storage and are not synced across devices, making backups dependent on browser cache (mitigated by JSON import/export).',
        'External network requirement: automated public holiday calendar synchronization relies on the Nager.Date REST API and requires an active internet connection.',
        'Descriptive planning boundary: the application optimizes time allocation but does not claim to measure cognitive retention or direct exam grade impact.',
      ],
      conclusion: {
        title: 'Key Takeaways & Technical Assessment',
        description: 'RevisionFlow demonstrates that complex deterministic scheduling can run reliably client-side in pure JavaScript without external dependencies. The strict boundary between immutable past days and recalculated future sessions, paired with transparent overload reporting, delivers a resilient study assistant with zero infrastructure overhead.',
      },
      technologies: ['JavaScript ES6+', 'HTML5', 'CSS3', 'localStorage', 'Web Audio API', 'REST API (Nager.Date)'],
      repository: 'https://github.com/Godwin-08/RevisionFlow',
      documents: [
        { href: '/documents/projects/revisionflow-report-fr.pdf', label: 'RevisionFlow full report (French PDF)' },
      ],
      supervisors: [
        { name: 'Loubna Rabhi', role: 'Academic supervisor' },
      ],
      gallery: [
        { src: '/images/projects/revisionflow-focus.png', alt: 'RevisionFlow dashboard in French. It shows planned and completed sessions, a daily summary, and the Pomodoro timer.', title: 'Focus View & Pomodoro Timer', caption: 'Daily execution interface combining scheduled sessions, progress counters, and a synthesized Web Audio API timer.' },
        { src: '/images/projects/revisionflow-planning.png', alt: 'Monthly study calendar with daily status and upcoming exam dates.', title: 'Monthly Calendar & Milestones', caption: 'Synoptic calendar view detailing daily allocated slots, revision density, and target exam milestones.' },
        { src: '/images/projects/revisionflow-progression.png', alt: 'Archived plan in read-only mode, with progress, sessions, and three demo subjects.', title: 'Velocity Tracking & Progress', caption: 'Consolidated module completion metrics tracking remaining workload against timeline objectives.' },
        { src: '/images/projects/revisionflow-historique.png', alt: 'Read-only list of saved plans with completion rates and other details.', title: 'Plan Archiving & Analytics', caption: 'Multi-plan archiving console preserving key indicators (completion rates, streaks, and validated study blocks).' },
      ],
    },
  },
  'sante-scolaire': {
    fr: {
      context: 'Système d’information web dédié à la gestion médico-scolaire, conçu sous Flask et MySQL (schéma relationnel de 13 tables avec SQLAlchemy et Flask-Migrate). L’application structure le suivi longitudinal des élèves (dossiers médicaux, consultations, prescriptions, gestion du stock pharmaceutique et agenda) tout en instaurant une séparation stricte des privilèges d’accès par rôle (Administrateur, Médecin, Infirmier) et un tableau de bord analytique sous Chart.js.',
      question: 'Comment centraliser le cycle de suivi médico-scolaire et cloisonner strictement l’accès aux données de santé selon le profil fonctionnel (médical vs administratif) ?',
      methodIntro: 'L’application centralise les interactions médicales scolaires au sein d’une architecture relationnelle 3NF : liaison des dossiers élèves aux consultations et rendez-vous, suivi des prescriptions et alertes de stock pharmaceutique, et consolidation des indicateurs d’activité dans un tableau de bord décisionnel.',
      methodSteps: [
        { title: 'Dossiers médico-scolaires & Scolarité', description: 'Modélisation relationnelle associant chaque élève à sa classe, ses antécédents médicaux, ses vaccinations et son historique de visites.' },
        { title: 'Traçabilité des soins & Pharmacie', description: 'Gestion intégrée du planning de consultations, saisie des prescriptions médicales et suivi d’inventaire du stock de médicaments.' },
        { title: 'Cloisonnement des accès par rôle', description: 'Séparation étanche côté serveur entre l’administration de l’établissement et les espaces réservés aux médecins et infirmiers.' },
        { title: 'Pilotage d’activité & Reporting visuel', description: 'Agrégation des volumes de visites, rendez-vous et flux de stock dans un tableau de bord décisionnel sous Chart.js.' },
      ],
      architecture: {
        title: 'Architecture logicielle & Modélisation relationnelle',
        introduction: 'L’architecture repose sur un backend Flask modulaire organisé en Blueprints, couplé à une base MySQL administrée via SQLAlchemy, Flask-MySQLdb et Flask-Migrate (Alembic).',
        layers: [
          { title: 'Contrôleurs Blueprints Flask', description: 'Découpage modulaire des routes HTTP : authentification, gestion des élèves, consultations médicales, agenda, statistiques et administration.' },
          { title: 'Persistance relationnelle MySQL', description: 'Schéma relationnel normalisé (13 tables dans la base présentée) assurant l’intégrité référentielle entre élèves, consultations, prescriptions, rendez-vous et stocks.' },
          { title: 'Présentation & Visualisation', description: 'Interface responsive Jinja2 stylisée avec Bootstrap 5 et enrichie d’un tableau de bord de statistiques interactives sous Chart.js.' },
        ],
      },
      keyDecisions: {
        title: 'Décisions d’ingénierie logicielle & Architecture de sécurité',
        items: [
          { title: 'Cloisonnement strict des données par rôle côté serveur', description: 'Vérification systématique des privilèges au niveau des contrôleurs Flask selon le rôle (Admin, Médecin, Infirmier), garantissant que le secret médical ne repose pas sur un simple masquage dans l’interface.' },
          { title: 'Intégration d’un tableau de bord décisionnel natif', description: 'Consolidation directe des métriques de consultation et d’occupation de l’infirmerie via Chart.js, offrant une lecture immédiate de l’activité sans dépendre d’un outil de reporting externe.' },
        ],
      },
      contribution: 'Projet académique individuel conçu et développé sous la supervision de Yassir Rochd. J’ai structuré le modèle relationnel MySQL, qui compte 13 tables dans la base présentée, développé les routes Flask organisées en Blueprints, mis en place des accès différenciés selon les rôles et créé le tableau de bord d’activité avec Chart.js. Les données de démonstration sont fictives.',
      results: [
        { value: '3 rôles', label: 'Espaces différenciés', detail: 'Vues et contrôles d’accès adaptés : Administrateur, Médecin, Infirmier.' },
        { value: '13 tables', label: 'Base présentée', detail: 'Schéma relationnel normalisé incluant le référentiel des médicaments.' },
        { value: 'Indicateurs', label: 'Activité de suivi', detail: 'Indicateurs d’activité consolidés en temps réel dans le tableau de bord.' },
      ],
      limitations: [
        'Les captures et les données sont fictives. L’application ne doit pas être utilisée avec de vrais dossiers de santé.',
        'Ce projet d’études n’est pas un produit médical certifié ni une application prête pour une vraie école.',
        'Le seul test pytest du dépôt vérifie le chargement de la configuration depuis les variables d’environnement; il ne couvre pas les fonctions métier ni les règles d’accès.',
        'Le dépôt ne présente pas de contrôle indépendant de la sécurité ou du respect des règles.',
        'La capture de la base montre 13 tables, dont referentiel_medicament; le schéma SQL et les modèles publiés dans le dépôt en décrivent 12.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie logicielle & Traçabilité des données',
        description: 'SantéScolaire réunit dans un système d’information cohérent le suivi des dossiers, des consultations, des rendez-vous et du stock pharmaceutique, avec un contrôle d’accès différencié pour trois rôles. Le projet démontre la mise en œuvre rigoureuse d’une modélisation relationnelle d’entreprise et d’une architecture Flask modulaire, tout en rappelant avec transparence que le traitement de données médicales réelles exigerait des audits de sécurité approfondis et une homologation réglementaire formelle.',
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
        { src: '/images/projects/sante-scolaire-dashboard-admin.png', alt: 'Tableau de bord avec des totaux fictifs pour 30 élèves, 25 visites et 17 rendez-vous.', title: 'Tableau de bord d’activité', caption: 'Vue de synthèse consolidant les indicateurs clés de fréquentation de l’infirmerie et des rendez-vous (données fictives).' },
        { src: '/images/projects/sante-scolaire-directory.png', alt: 'Liste de 30 élèves et de leurs classes avec des données fictives.', title: 'Répertoire des dossiers élèves', caption: 'Interface réservée au personnel soignant permettant l’accès aux fiches sanitaires et aux antécédents (données fictives).' },
        { src: '/images/projects/sante-scolaire-agenda.png', alt: 'Agenda du personnel soignant avec 17 rendez-vous fictifs, leurs dates, élèves, médecins, classes et statuts.', title: 'Agenda & Planning des consultations', caption: 'Module d’ordonnancement des visites médicales avec suivi des statuts et filtres par praticien (données fictives).' },
      ],
    },
    en: {
      context: 'Web-based school healthcare information system built with Flask and MySQL (13-table relational schema using SQLAlchemy and Flask-Migrate). The application manages longitudinal student care (medical records, consultations, prescriptions, pharmaceutical inventory, and scheduling), while enforcing server-side role-based access restrictions (Administrator, Doctor, Nurse) and an interactive Chart.js analytics dashboard.',
      question: 'How can a school health information system centralize longitudinal student care while strictly enforcing role-based access boundaries between medical and administrative staff?',
      methodIntro: 'The application centralizes school medical workflows through a 3NF relational architecture: linking student profiles to clinical visits and appointments, managing prescriptions and pharmacy stock alerts, and consolidating operational indicators into an executive dashboard.',
      methodSteps: [
        { title: 'Student Health Records & School Roster', description: 'Relational data modeling linking each student to their class, medical history, vaccination records, and visit log.' },
        { title: 'Clinical Care Tracking & Pharmacy', description: 'Integrated consultation scheduling, prescription logging, and pharmaceutical inventory tracking with low-stock alerts.' },
        { title: 'Role-Based Access Boundaries', description: 'Server-side enforcement of strict privilege separation between administrative functions and clinical staff (doctors and nurses).' },
        { title: 'Operational Metrics & Visual Analytics', description: 'Aggregating visit volumes, appointments, and medication usage into an interactive Chart.js activity dashboard.' },
      ],
      architecture: {
        title: 'Software Architecture & Relational Modeling',
        introduction: 'The architecture couples a modular Flask backend structured with Blueprints to a normalized MySQL database managed via SQLAlchemy, Flask-MySQLdb, and Flask-Migrate (Alembic).',
        layers: [
          { title: 'Modular Flask Blueprints', description: 'Decoupled route controllers for authentication, student management, medical visits, appointment scheduling, statistics, and administration.' },
          { title: 'MySQL Relational Persistence', description: 'Normalized relational schema (13 tables in the presented database) ensuring referential integrity across students, visits, prescriptions, appointments, and inventory.' },
          { title: 'Presentation & Analytics UI', description: 'Responsive Jinja2 templates styled with Bootstrap 5 and backed by an interactive Chart.js activity monitoring dashboard.' },
        ],
      },
      keyDecisions: {
        title: 'Software Engineering Decisions & Security Architecture',
        items: [
          { title: 'Server-side role-based data partitioning', description: 'Enforcing access boundaries at the Flask route level according to user role (Admin, Doctor, Nurse), ensuring medical privacy is never reliant solely on UI masking.' },
          { title: 'Native in-app decision dashboard', description: 'Consolidating visit metrics and infirmary utilization directly via Chart.js, providing instant operational oversight without external reporting dependencies.' },
        ],
      },
      contribution: 'Individual academic project developed under the supervision of Yassir Rochd. I structured the MySQL relational data model, which has 13 tables in the presented database, built Flask routes organized into Blueprints, implemented role-based access restrictions, and created the activity dashboard with Chart.js. Demo data are fictional.',
      results: [
        { value: '3 roles', label: 'Separate user areas', detail: 'Tailored views and route restrictions: Administrator, Doctor, Nurse.' },
        { value: '13 tables', label: 'Presented database', detail: 'Normalized relational schema including the medication reference table.' },
        { value: 'Indicators', label: 'Care follow-up', detail: 'Real-time aggregated activity metrics displayed in the dashboard.' },
      ],
      limitations: [
        'All screenshots and demo data are fictional. Do not use the app with real student health records.',
        'This is a study project, not a certified medical product or an app ready for a real school.',
        'The repository has one pytest test for loading configuration from environment variables; it does not cover business features or access rules.',
        'The project does not include an independent security or rules check.',
        'The database screenshot shows 13 tables, including referentiel_medicament; the SQL schema and models published in the repository describe 12.',
      ],
      conclusion: {
        title: 'Key Takeaways & Technical Assessment',
        description: 'SantéScolaire unifies health records, consultations, appointments, and pharmacy inventory into a coherent information system with distinct access boundaries for three user roles. It demonstrates disciplined enterprise relational modeling and modular Flask architecture, while candidly recognizing that deploying with real patient data would require independent security audits and formal regulatory compliance.',
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
      context: 'Prototype applicatif d’e-commerce développé en Python Flask sous paradigme Orienté Objet (POO). Conçu dans le cadre d’un projet académique en équipe de cinq, NovaStore implémente un parcours complet d’achat en ligne (catalogue filtrable, panier dynamique, validation de stock et émission de facture), tout en isolant la logique métier dans des classes d’entités encapsulées sans persistance ORM active.',
      question: 'Comment modéliser les entités e-commerce et encapsuler les règles métier (décrémentation de stock, calculs de sous-totaux et facturation) au sein d’une architecture objet Flask modulaire ?',
      architecture: {
        title: 'Architecture logicielle & Modélisation objet',
        introduction: 'L’architecture sépare les responsabilités entre les entités métier Python, les contrôleurs HTTP organisés en Blueprints Flask et l’interface de présentation Jinja2. Dans le parcours étudié, les données ne sont pas enregistrées dans une base de données active.',
        layers: [
          { title: 'Modèle Domaine & POO', description: 'Les classes Produit, Panier, Commande, Client et Paiement encapsulent les données et la logique métier (gestion du stock, calcul des totaux et génération des factures).' },
          { title: 'Routage modulaire Flask', description: 'Les Blueprints structurent l’application en modules découplés pour la vitrine commerciale, l’authentification et les endpoints de manipulation du panier.' },
          { title: 'Présentation & Interactivité DOM', description: 'Templates Jinja2 combinés à des scripts JavaScript légers pour assurer la recherche en direct, le tri et le filtrage multicritère des produits.' },
          { title: 'Gestion d’état transitoire', description: 'Catalogue initialisé sur 20 objets produit en mémoire. La session Flask maintient l’état du panier, tandis que les commandes et alertes restent en mémoire vive pendant l’exécution.' },
        ],
      },
      keyDecisions: {
        title: 'Décisions d’ingénierie logicielle & Choix de conception',
        items: [
          { title: 'Encapsulation des règles métier en méthodes de domaine', description: 'Les calculs de sous-totaux, la vérification du stock et l’émission de facture sont portés par les classes métier, évitant de disperser la logique dans les vues Flask.' },
          { title: 'Modularité applicative par Blueprints Flask', description: 'Séparation étanche des périmètres fonctionnels (vitrine catalogue, sessions d’authentification, actions de panier) pour faciliter le travail collaboratif.' },
          { title: 'Gestion d’état hybride (Session Flask vs Mémoire vive)', description: 'Le panier conserve ses identifiants dans le cookie de session signé, tandis que les commandes et alertes résident en listes mémoire, documentant un prototype sans base de données active.' },
        ],
      },
      methodIntro: 'Le parcours client permet d’explorer le catalogue, d’appliquer des filtres dynamiques, de gérer un panier interactif en session et de simuler une commande jusqu’à la génération d’une facture imprimable.',
      methodSteps: [
        { title: 'Parcourir les produits', description: 'Voir 20 produits de démonstration, puis les filtrer par catégorie, disponibilité, promotion ou prix et trier la liste.' },
        { title: 'Gestion dynamique du panier', description: 'Ajout et suppression d’articles avec vérification en temps réel du stock disponible et persistance de l’état dans la session Flask.' },
        { title: 'Validation de commande & Simulation', description: 'Contrôle final du stock, instanciation de la commande et simulation du paiement avec des identifiants de test sans passerelle bancaire réelle.' },
        { title: 'Émission de facture & Métriques de vente', description: 'Génération de la facture prête à l’impression et calcul d’indicateurs d’activité à partir des commandes conservées en mémoire.' },
      ],
      contribution: 'Dans le cadre d’un projet d’équipe de cinq, mon apport principal a porté sur la conception et le développement de l’application. La présentation ne détaille pas la répartition des contributions entre les membres.',
      results: [
        { value: '20 produits', label: 'catalogue de démonstration', detail: 'Quatre catégories d’articles électroniques modélisées en POO.' },
        { value: 'Panier → facture', label: 'parcours de démonstration', detail: 'Génération d’une facture prête à l’impression avec ventilation des totaux.' },
        { value: 'Paiement test', label: 'aucune transaction réelle', detail: 'Simulation logique sans interaction avec un service bancaire.' },
      ],
      limitations: [
        'Le dépôt mentionne SQLAlchemy, mais l’application n’initialise pas l’ORM et ne l’utilise pas pour persister les données. Le catalogue est construit à partir d’objets Python.',
        'Les commandes et les alertes sont gardées dans des listes en mémoire. Elles disparaissent quand l’application redémarre. La session Flask garde le panier, mais pas les commandes de façon durable.',
        'Le paiement est simulé avec des valeurs de test fixes. Aucun service bancaire ne traite de vraie transaction.',
        'NovaStore est un prototype d’études conçu pour illustrer la programmation orientée objet, pas une plateforme e-commerce déployable en production.',
      ],
      conclusion: {
        title: 'Bilan d’ingénierie logicielle & Enseignements POO',
        description: 'NovaStore valide la mise en œuvre des principes fondamentaux de la programmation orientée objet (encapsulation des états, classes de domaine) dans le cadre d’un flux transactionnel complet. L’application démontre l’intérêt d’isoler les règles métier des contrôleurs HTTP, tout en soulignant avec transparence l’importance d’intégrer un ORM et un SGBD relationnel dès lors que le projet quitte le stade du prototype exploratoire.',
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
        { src: '/images/projects/novastore-filtre-prix.png', alt: 'Catalogue NovaStore avec les catégories, les filtres de prix et un résultat de téléphone.', title: 'Catalogue & Filtrage multicritère', caption: 'Interface de la vitrine permettant le filtrage dynamique par catégorie, seuil de prix et état de promotion.' },
        { src: '/images/projects/novastore-fiche-produit.png', alt: 'Page du Xiaomi 13T Pro avec sa catégorie, sa description, le stock, le prix et le bouton pour l’ajouter au panier.', title: 'Fiche produit détaillée', caption: 'Vue unitaire d’un article présentant la description technique, la disponibilité en stock et l’action d’ajout au panier.' },
        { src: '/images/projects/novastore-panier.png', alt: 'Panier avec un Xiaomi 13T Pro, sa quantité, son sous-total et le total.', title: 'Panier d’achat & Calcul des totaux', caption: 'Écran de récapitulatif transactionnel détaillant les sous-totaux et la ventilation finale avant simulation de paiement.' },
      ],
    },
    en: {
      context: 'E-commerce prototype developed in Python Flask using Object-Oriented Programming (OOP) principles. Built as an academic five-person team project, NovaStore implements a complete online shopping workflow (filterable catalogue, dynamic cart, stock checks, and invoice issuance), with business rules encapsulated inside domain classes without active ORM persistence.',
      question: 'How can e-commerce entities and business rules (stock decrement, subtotal calculations, and invoicing) be cleanly encapsulated within a modular Flask object architecture?',
      architecture: {
        title: 'Software Architecture & Object Modeling',
        introduction: 'The architecture enforces separation of concerns between domain Python classes, HTTP controllers grouped into Flask Blueprints, and Jinja2 presentation templates. In the reviewed workflow, data are not saved to an active database.',
        layers: [
          { title: 'Domain Model & OOP', description: 'Product, Cart, Order, Customer, and Payment classes encapsulate business logic (stock management, total calculations, and invoice generation).' },
          { title: 'Modular Flask Routing', description: 'Blueprints partition application endpoints into decoupled modules for storefront browsing, authentication, and cart API operations.' },
          { title: 'Presentation & Client Interactivity', description: 'Jinja2 templates paired with lightweight JavaScript to enable live search, multi-criteria filtering, and client-side sorting.' },
          { title: 'Transient State Management', description: 'Catalogue initialized from 20 in-memory product objects. Flask session maintains cart state, while orders and alerts remain in memory during runtime.' },
        ],
      },
      keyDecisions: {
        title: 'Software Engineering Decisions & Design Choices',
        items: [
          { title: 'Encapsulating business rules within domain classes', description: 'Subtotal arithmetic, stock validation, and invoice creation are housed in class methods rather than dispersed across Flask views.' },
          { title: 'Modular organization with Flask Blueprints', description: 'Isolating distinct functional boundaries (storefront catalogue, authentication sessions, cart actions) to support collaborative teamwork.' },
          { title: 'Hybrid state management (Flask Session vs Memory)', description: 'The cart stores product IDs in a signed session cookie, whereas orders and alerts reside in in-memory lists, documenting an ephemeral prototype without database persistence.' },
        ],
      },
      methodIntro: 'Users can search the catalogue, apply dynamic filters, manage an interactive session-based cart, and simulate checkout through to a printable invoice.',
      methodSteps: [
        { title: 'Browse products', description: 'Browse 20 demo products, then filter by category, stock, promotion, or price and sort the list.' },
        { title: 'Dynamic cart management', description: 'Adding and removing items with real-time stock checks and session persistence via Flask.' },
        { title: 'Order creation & Simulation', description: 'Verifying stock, instantiating the order, and simulating payment using test credentials without bank gateways.' },
        { title: 'Invoice generation & Sales indicators', description: 'Generating a print-ready invoice and calculating basic activity indicators from in-memory orders.' },
      ],
      contribution: 'For this five-person team project, my main contribution was designing and developing the application. This presentation does not detail how work was divided among the team members.',
      results: [
        { value: '20 products', label: 'demo catalogue', detail: 'Four consumer electronic categories modeled via OOP classes.' },
        { value: 'Cart → invoice', label: 'demo flow', detail: 'Print-ready invoice generation with complete itemized breakdown.' },
        { value: 'Test payment', label: 'no real transaction', detail: 'Logical order simulation without third-party payment gateway contact.' },
      ],
      limitations: [
        'The repository mentions SQLAlchemy, but the application does not initialize the ORM or use it to persist data. The catalogue is built from Python objects.',
        'Orders and alerts are kept in in-memory lists. They are lost when the app restarts. The Flask session stores the cart, not permanent order data.',
        'Payment is a test with fixed values. No payment service handles a real transaction.',
        'NovaStore is an academic study prototype designed to showcase object-oriented principles, not a production-ready store.',
      ],
      conclusion: {
        title: 'Key Takeaways & Technical Assessment',
        description: 'NovaStore demonstrates the application of object-oriented principles (encapsulation, domain classes) within an end-to-end transactional workflow. It highlights the architectural benefits of decoupling business logic from web routing, while transparently underscoring the necessity of relational database persistence (ORM/RDBMS) for any system beyond an exploratory prototype.',
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
        { src: '/images/projects/novastore-filtre-prix.png', alt: 'NovaStore catalogue with product groups, price filters, and a phone result.', title: 'Catalogue & Multicriteria Filters', caption: 'Storefront interface supporting dynamic filtering by category, price threshold, and promotion status.' },
        { src: '/images/projects/novastore-fiche-produit.png', alt: 'Xiaomi 13T Pro page with its type, description, stock, price, and add-to-cart button.', title: 'Detailed Product View', caption: 'Individual product display showing technical specifications, inventory availability, and add-to-cart action.' },
        { src: '/images/projects/novastore-panier.png', alt: 'Cart with a Xiaomi 13T Pro, quantity, subtotal, and total.', title: 'Shopping Cart & Totals Breakdown', caption: 'Transactional summary screen detailing item subtotals and final total calculation prior to checkout simulation.' },
      ],
    },
  },
  'pneumonia-detection': {
    fr: {
      context:
        'Projet académique réalisé en équipe de quatre étudiants à l’ENSA Khouribga (2025–2026). L’objectif est la classification binaire supervisée de radiographies thoraciques pédiatriques (NORMAL vs PNEUMONIA) et l’analyse comparative de deux paradigmes de vision par ordinateur : un réseau convolutionnel entraîné from scratch versus un modèle pré-entraîné par transfert d’apprentissage, avec étude d’impact du seuil de décision clinique.',
      question:
        'Dans quelle mesure une architecture pré-entraînée par transfert d’apprentissage (DenseNet121) surpasse-t-elle un réseau convolutionnel dédié (CNN from scratch) pour la détection de pneumopathies pédiatriques, et quel est l’arbitrage clinique imposé par la calibration du seuil de décision ?',
      featuredFinding:
        'Sur le jeu de test indépendant (624 radiographies), DenseNet121 atteint une exactitude globale de ≈89 % (0,8878) et un rappel de ≈92 % (358/390) pour la classe pathologique PNEUMONIA au seuil clinique calibré de 0,8 (F1-score de 0,91), priorisant la minimisation des faux négatifs critiques.',
      dataTitle: 'Données et préparation',
      dataConstruction:
        'Le dépôt indique 5 856 radiographies pédiatriques dans le jeu Chest X-Ray de Kaggle. Il documente 5 216 images pour l’entraînement et 624 pour le test; l’utilisation des 16 autres images n’est pas précisée. Une partition de validation (20 %, graine aléatoire 42) assure le suivi de la convergence et l’early stopping. Le pipeline d’entrée standardise les résolutions en 224 × 224 pixels (3 canaux) avec normalisation min-max des pixels dans [0, 1]. Pour prévenir le surapprentissage sur une distribution fortement déséquilibrée (environ 74 % de cas PNEUMONIA), les générateurs appliquent des augmentations géométriques et photométriques (rotations, zooms, translations, retournements horizontaux et ajustements de contraste).',
      methodTitle: 'Démarche expérimentale',
      methodIntro:
        'L’équipe a formalisé un protocole expérimental comparant un réseau convolutionnel entraîné de novo à une approche de transfert d’apprentissage exploitant des représentations visuelles hiérarchiques issues d’ImageNet. L’analyse examine l’impact de l’architecture, de l’adaptation des poids (feature extraction puis fine-tuning) et du seuil opérationnel de classification binaire.',
      methodSteps: [
        {
          title: 'Réseau CNN construit pour le projet',
          description:
            'Un réseau de neurones convolutif (CNN) apprend ses filtres à partir des radiographies du jeu. Il sert de modèle de référence. L’expérience utilise l’optimiseur Adam, des mini-lots de 32 images, une régularisation par Dropout et un arrêt anticipé à 13 époques, atteignant un seuil de décision rapporté de 0,7.',
        },
        {
          title: 'DenseNet121 pré-entraîné',
          description:
            'DenseNet121 exploite des représentations denses pré-entraînées sur ImageNet. La phase initiale gèle le corps du réseau pour n’entraîner qu’une tête de classification dense adaptée aux radiographies (GlobalAveragePooling2D, BatchNormalization, Dense 128 avec ReLU, Dropout 0.5, sortie Sigmoid).',
        },
        {
          title: 'Ajustement et choix du seuil',
          description:
            'Une phase de fine-tuning dégèle les couches supérieures de DenseNet121 avec un taux d’apprentissage réduit. La sensibilité clinique est optimisée en modulant le seuil de décision : le dépôt documente un seuil de 0,8 en extraction de caractéristiques et de 0,9 après fine-tuning pour arbitrer précision et rappel.',
        },
        {
          title: 'Évaluation des prédictions',
          description:
            'Les métriques sont calculées sur le jeu de test indépendant (624 radiographies). Le rappel de la classe PNEUMONIA est priorisé pour quantifier la réduction des faux négatifs, tout en analysant conjointement l’accuracy, la spécificité (classe NORMAL) et le score F1 pondéré.',
        },
        {
          title: 'Démonstration Streamlit',
          description:
            'Déploiement d’une interface interactive Streamlit permettant le chargement de clichés radiographiques, le chargement dynamique des modèles sérialisés (.keras), et la restitution en temps réel de la probabilité d’inférence et de la classe estimée.',
        },
      ],
      architecture: {
        title: 'Architectures et pipeline technique',
        introduction:
          'Le pipeline technique intègre l’ingestion des images radiographiques, leur prétraitement géométrique et tensoriel, deux topologies d’apprentissage profond distinctes, et une couche de restitution interactive.',
        layers: [
          {
            title: 'Ingestion & Prétraitement d’images',
            description:
              'Chaque radiographie pédiatrique est normalisée à 224 × 224 pixels sur 3 canaux, avec remise à l’échelle min-max [0, 1] et application d’augmentations géométriques (Keras ImageDataGenerator).',
          },
          {
            title: 'Baseline CNN from scratch',
            description:
              'Empilement de 4 blocs convolutionnels pyramidaux (32, 64, 128, 256 filtres 3×3 avec activation ReLU), MaxPooling2D (2×2), Dropout régularisateur (0.25 à 0.5) et tête Dense fully-connected.',
          },
          {
            title: 'DenseNet121 & Transfer Learning',
            description:
              'Backbone DenseNet-121 pré-entraîné (connectivité dense dense-block assurant la réutilisation des gradients), surmonté d’un GlobalAveragePooling2D, d’une normalisation par lots et d’une projection sigmoïde.',
          },
          {
            title: 'Inférence & Restitution Streamlit',
            description:
              'Micro-application Python Streamlit assurant la désérialisation du modèle Keras, le prétraitement à la volée de l’image téléversée et la visualisation probabiliste de la classification.',
          },
        ],
      },
      keyDecisions: {
        title: 'Décisions techniques et méthodologiques',
        items: [
          {
            title: 'Priorité métrique au rappel clinique (Sensibilité) sur l’exactitude globale',
            description:
              'Dans un contexte de détection médicale assistée, le coût d’un faux négatif (patient infecté classé comme sain) engage le pronostic vital. Le calibrage du seuil de décision (0,8) privilégie la sensibilité diagnostique (rappel de 92 %, soit 358 cas détectés sur 390) au détriment acceptable d’une fraction de faux positifs contrôlés.',
          },
          {
            title: 'Rigueur d’évaluation méthodologique du Fine-Tuning',
            description:
              'L’évaluation documentée n’enregistre pas de gain déterminant lors du dégel des couches profondes de DenseNet121. Cependant, l’usage de seuils distincts entre l’extraction de caractéristiques (0,8) et le fine-tuning (0,9) impose une lecture prudente, empêchant d’isoler rigoureusement la contribution des poids de celle de la règle de coupure.',
          },
        ],
      },
      contribution:
        'J’ai rédigé le rapport technique du projet, qui présente la démarche expérimentale, les modèles évalués et l’analyse des résultats. Le projet a été mené en équipe de quatre.',
      results: [
        { value: '≈89 %', label: 'Exactitude globale (accuracy)', detail: 'Taux global de classification correcte sur le jeu de test indépendant (624 radiographies) au seuil de 0,8 : exactitude mesurée de 0,887821.' },
        { value: '≈92 %', label: 'Rappel de la classe PNEUMONIA', detail: 'Sensibilité diagnostique sur les cas pathologiques : rappel mesuré de 0,917949, soit 358 cas sur 390 (seulement 32 faux négatifs manqués).' },
        { value: '0,91', label: 'Score F1 de la classe PNEUMONIA', detail: 'Moyenne harmonique entre précision (0,9040) et rappel (0,9179) sur la classe pathologique : score mesuré de 0,910941.' },
      ],
      limitations: [
        'Projet académique uniquement : le modèle n’est ni un dispositif médical certifié ni un outil de diagnostic destiné à la pratique clinique.',
        'Le jeu de données est pédiatrique et les résultats proviennent de son jeu de test. Une validation externe serait nécessaire avant d’envisager une généralisation à d’autres données ou populations.',
        'Les résultats consignés ne concordent pas entièrement : deux comptes apparaissent pour les cas PNEUMONIA détectés (358 ou 359 sur 390), les résultats du CNN varient entre 80,3 % et 81 %, et les seuils du fine-tuning diffèrent. Une comparaison complète des modèles reste donc incertaine.',
      ],
      conclusion: {
        title: 'Bilan méthodologique & Analyse comparative Deep Learning',
        description:
          'Cette étude valide l’efficacité du transfert d’apprentissage (DenseNet121) face à un CNN entraîné from scratch sur des données limitées et asymétriques. Au-delà des performances brutes, l’étude démontre la primauté de la calibration du seuil de décision opérationnel en vision médicale, où le rappel l’emporte sur l’exactitude globale. Les prochaines étapes impliquent une validation externe multicentrique et l’intégration de cartes d’activation Grad-CAM pour l’explicabilité clinique.',
      },
      resultsIntro:
        'Performances d’inférence obtenues par DenseNet121 sur l’ensemble de test indépendant de 624 images avec un seuil de coupure clinique calibré à 0,8 : exactitude globale de 88,78 % (accuracy), sensibilité/rappel de 91,79 % sur la classe pathologique, et précision de 90,40 %, synthétisées par un score F1 de 0,91.',
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
          analysis: {
            question: 'Comment la dynamique d’apprentissage du CNN from scratch évolue-t-elle et à quelle époque le risque de surapprentissage apparaît-il ?',
            reading: 'Le graphique superpose les courbes de perte (binary cross-entropy) et d’exactitude (accuracy) pour l’entraînement (bleu) et la validation (orange). La ligne pointillée verticale matérialise le meilleur point de contrôle à l’époque 8.',
            observation: 'La perte d’entraînement diminue continûment, tandis que la perte de validation atteint son minimum à l’époque 8 avant d’amorcer une remontée progressive. L’accuracy de validation plafonne autour de 80–82 %.',
            interpretation: 'Le réseau apprend efficacement les caractéristiques visuelles de premier niveau, mais commence à surajuster les spécificités du jeu d’entraînement au-delà de l’époque 8, justifiant l’interruption anticipée (Early Stopping) à l’époque 13.',
            businessInterest: 'Sécuriser la capacité de généralisation du modèle en prévenant la mémorisation du bruit radiographique par un arrêt précoce contrôlé.',
            limitation: 'L’analyse repose sur une seule partition de validation (20 %, graine 42) ; une validation croisée k-fold fournirait une estimation plus robuste de la variance d’apprentissage.',
          },
        },
        {
          src: '/images/projects/pneumonia-courbes-densenet.png',
          alt: 'Courbes de perte et de précision de DenseNet121 en phase d’extraction de caractéristiques.',
          title: 'Courbes d’apprentissage — DenseNet121 (Transfer Learning)',
          caption: 'La courbe suit la loss (erreur) et l’accuracy pendant la phase Feature Extraction. La ligne pointillée marque le meilleur modèle, à l’époque 14. Ces courbes ne sont pas les résultats du jeu de test.',
          zoomable: true,
          analysis: {
            question: 'Dans quelle mesure l’extraction de caractéristiques via DenseNet121 pré-entraîné accélère-t-elle la convergence et stabilise-t-elle la perte de validation ?',
            reading: 'Suivi de la perte et de l’accuracy pendant la phase de Feature Extraction avec le corps DenseNet121 gelé. La ligne pointillée marque le meilleur modèle à l’époque 14.',
            observation: 'La convergence s’opère dès les premières époques grâce aux filtres pré-entraînés sur ImageNet. La perte de validation reste stable et basse tout au long de l’entraînement, atteignant son optimum à l’époque 14.',
            interpretation: 'La connectivité dense (dense blocks) favorise la réutilisation des gradients et atténue considérablement le surapprentissage, permettant à la tête de classification d’atteindre une performance supérieure sans détérioration de la perte.',
            businessInterest: 'Valide le transfert d’apprentissage comme stratégie hautement efficiente pour pallier le volume restreint de données biomédicales annotées.',
            limitation: 'Les représentations issues d’ImageNet sont adaptées aux images naturelles ; l’extraction sans fine-tuning peut omettre des motifs radiologiques très spécifiques.',
          },
        },
      ],
    },
    en: {
      context:
        'Academic project completed by a team of four students at ENSA Khouribga (2025–2026). The objective is supervised binary classification of pediatric chest radiographs (NORMAL vs PNEUMONIA) and the comparative benchmark of two computer vision paradigms: a convolutional neural network trained from scratch versus pre-trained transfer learning, evaluating the sensitivity of clinical decision thresholds.',
      question:
        'To what extent does a pre-trained transfer learning architecture (DenseNet121) outperform a custom convolutional baseline (CNN from scratch) on pediatric chest radiographs, and what clinical trade-off is governed by decision threshold calibration?',
      featuredFinding:
        'On the independent test set (624 radiographs), DenseNet121 achieves ≈89% overall accuracy (0.8878) and ≈92% recall (358/390) for the pathological PNEUMONIA class at a calibrated decision threshold of 0.8 (F1-score of 0.91), deliberately minimizing critical false negatives.',
      dataTitle: 'Data and preparation',
      dataConstruction:
        'The repository reports 5,856 pediatric X-rays in the Kaggle Chest X-Ray dataset. It documents 5,216 images for training and 624 for testing; it does not explain how the other 16 images are used. A validation split (20%, random seed 42) governs convergence tracking and early stopping. The input pipeline resizes all radiographs to 224 × 224 pixels (3 channels) with min-max intensity normalization in [0, 1]. To mitigate overfitting under significant class imbalance (about 74% PNEUMONIA cases), data augmentation pipelines apply affine and geometric transformations (rotations, zooms, translations, horizontal flips, and contrast adjustments).',
      methodTitle: 'Experiments and approach',
      methodIntro:
        'The team structured an experimental benchmark comparing a de novo convolutional network against a transfer learning approach leveraging hierarchical visual representations from ImageNet. The analysis investigates architectural impact, weight adaptation stages (feature extraction followed by fine-tuning), and operational thresholding in binary classification.',
      methodSteps: [
        {
          title: 'CNN built for this project',
          description:
            'A convolutional neural network (CNN) learns its feature filters from scratch on the project dataset, serving as baseline. The training pipeline uses the Adam optimizer, batch size 32, Dropout regularization, and early stopping after 13 epochs, reporting metrics at a 0.7 decision threshold.',
        },
        {
          title: 'Pre-trained DenseNet121',
          description:
            'DenseNet121 leverages dense hierarchical feature representations pre-trained on ImageNet. The initial feature extraction phase freezes the convolutional backbone to train only a custom classification head (GlobalAveragePooling2D, BatchNormalization, Dense 128 ReLU, Dropout 0.5, Sigmoid activation).',
        },
        {
          title: 'Fine-tuning and decision threshold',
          description:
            'A fine-tuning stage unfreezes upper DenseNet blocks using a reduced learning rate. Clinical sensitivity is tuned by adjusting the decision threshold: the repository documents a threshold of 0.8 for feature extraction and 0.9 post fine-tuning to balance precision and recall.',
        },
        {
          title: 'Checking predictions',
          description:
            'Model inference is evaluated on the independent 624-image test set. Recall on the PNEUMONIA class is prioritized to minimize diagnostic false negatives, while evaluating overall accuracy, specificity (NORMAL class), and harmonic F1-score.',
        },
        {
          title: 'Streamlit demonstration',
          description:
            'Deployment of an interactive Streamlit inference demo allowing users to upload radiographic scans, dynamically load serialized models (.keras), and display real-time class probabilities alongside diagnostic predictions.',
        },
      ],
      architecture: {
        title: 'Architectures and technical pipeline',
        introduction:
          'The technical pipeline spans radiographic image ingestion, geometric and tensor preprocessing, two distinct deep learning architectures, and an interactive demo interface.',
        layers: [
          {
            title: 'Image Ingestion & Preprocessing',
            description:
              'Standardization of pediatric radiographs to 224 × 224 pixels across 3 channels, min-max intensity normalization into [0, 1], and real-time geometric augmentation via Keras ImageDataGenerator.',
          },
          {
            title: 'Baseline CNN from scratch',
            description:
              'Four pyramidal convolutional blocks (32, 64, 128, 256 filters of size 3×3 with ReLU activations), MaxPooling2D (2×2), Dropout regularization (0.25 to 0.5), and fully connected Dense layers.',
          },
          {
            title: 'DenseNet121 & Transfer Learning',
            description:
              'Pre-trained DenseNet121 backbone featuring dense block connectivity for optimal gradient flow, topped by GlobalAveragePooling2D, Batch Normalization, and sigmoid output projection.',
          },
          {
            title: 'Streamlit Inference & UI',
            description:
              'Python Streamlit web application providing on-the-fly model deserialization (.keras), uploaded scan preprocessing, and probabilistic inference visualization.',
          },
        ],
      },
      keyDecisions: {
        title: 'Technical and methodological choices',
        items: [
          {
            title: 'Prioritizing Clinical Recall (Sensitivity) over Raw Accuracy',
            description:
              'In computer-aided clinical triage, a false negative (missed infection) directly endangers the patient. Calibrating the decision threshold to 0.8 explicitly maximizes diagnostic sensitivity (92% recall, 358 detected cases out of 390) while accepting an inspectable margin of false alarms.',
          },
          {
            title: 'Methodological Rigor on Fine-Tuning Evaluation',
            description:
              'Recorded benchmarks show marginal improvement upon unfreezing deep DenseNet blocks. However, differing decision thresholds between feature extraction (0.8) and fine-tuning (0.9) mandate careful interpretation, precluding an isolated attribution between weight convergence and cutoff calibration.',
          },
        ],
      },
      contribution:
        'I wrote the project’s technical report, documenting the experimental approach, evaluated models, and analysis of the results. The project was carried out by a team of four.',
      results: [
        { value: '≈89%', label: 'Overall accuracy', detail: 'Share of all test images correctly classified by DenseNet121 at threshold 0.8; measured accuracy: 0.887821.' },
        { value: '≈92%', label: 'PNEUMONIA recall', detail: 'Diagnostic sensitivity on pathological cases: measured recall of 0.917949, detecting 358 of 390 cases.' },
        { value: '0.91', label: 'PNEUMONIA F1-score', detail: 'Harmonic mean of precision (0.9040) and recall (0.9179) on the pathological class; measured score: 0.910941.' },
      ],
      limitations: [
        'Academic project only: this model is not a certified medical device or a tool for clinical diagnosis.',
        'The dataset contains pediatric X-rays, and results come from its test set. External validation would be needed before applying them to other data or populations.',
        'The recorded results do not fully agree: two counts appear for detected PNEUMONIA cases (358 or 359 out of 390), CNN accuracy varies between 80.3% and 81%, and fine-tuning uses different thresholds. A full comparison of the models is therefore uncertain.',
      ],
      conclusion: {
        title: 'Key Takeaways & Technical Assessment',
        description:
          'This study puts two image-classification approaches into practice and shows why several metrics should be read together. DenseNet121 gives promising results on the test set used, but source differences and different thresholds do not support a clear claim that it always performs better than the CNN. The next steps would be a comparison under the same test protocol and validation on other data.',
      },
      resultsIntro:
        'Inference metrics achieved by DenseNet121 on the independent 624-image test set at a calibrated clinical threshold of 0.8: overall accuracy of 88.78%, clinical recall of 91.79% on the pathological class, and precision of 90.40%, synthesized into an F1-score of 0.91.',
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
          analysis: {
            question: 'How does the learning dynamic of the custom CNN evolve, and at what epoch does overfitting emerge?',
            reading: 'The plot tracks loss (binary cross-entropy) and accuracy curves across training (blue) and validation (orange) splits. The vertical dotted line highlights the best model checkpoint at epoch 8.',
            observation: 'Training loss decreases steadily, whereas validation loss reaches its minimum at epoch 8 before rising gradually. Validation accuracy plateaus between 80% and 82%.',
            interpretation: 'The network successfully captures primary visual features but begins to fit training set noise past epoch 8, justifying early stopping after 13 epochs.',
            businessInterest: 'Safeguards model generalization capability by preventing radiographic noise memorization through automated checkpointing.',
            limitation: 'The trajectory reflects a single validation split (20%, seed 42); a k-fold cross-validation would provide broader statistical variance bounds.',
          },
        },
        {
          src: '/images/projects/pneumonia-courbes-densenet.png',
          alt: 'Loss and accuracy curves of DenseNet121 during feature extraction.',
          title: 'Training curves — DenseNet121 (Transfer Learning)',
          caption: 'The curves show loss and accuracy during Feature Extraction. The dotted line marks the best model, at epoch 14. These are not test-set results.',
          zoomable: true,
          analysis: {
            question: 'To what extent does DenseNet121 feature extraction accelerate convergence and stabilize validation loss?',
            reading: 'Tracking loss and accuracy during the feature extraction stage with a frozen DenseNet121 backbone. The dotted line marks the optimal checkpoint at epoch 14.',
            observation: 'Rapid convergence occurs from initial epochs owing to ImageNet pre-trained filters. Validation loss remains stable and low throughout training, peaking at epoch 14.',
            interpretation: 'Dense block connectivity ensures strong gradient propagation and curbs overfitting, enabling the classification head to reach superior accuracy without loss deterioration.',
            businessInterest: 'Confirms transfer learning as a highly effective paradigm to overcome constrained biomedical training set volumes.',
            limitation: 'ImageNet features originate from natural imagery; feature extraction without subsequent fine-tuning may miss fine-grained radiographic subtleties.',
          },
        },
      ],
    },
  },
  'goodthought-sql-analysis': {
    fr: {
      context:
        'Projet d’analyse SQL avancée réalisé dans le cadre du parcours certifiant SQL Data Analyst de DataCamp. L’étude porte sur le modèle relationnel de l’organisation GoodThought (5 000 missions réparties sur 4 zones géographiques), visant à modéliser la dynamique des flux de dons et à quantifier l’efficacité opérationnelle via des métriques d’impact régionalisées.',
      question:
        'Comment structurer des requêtes analytiques multi-tables (CTEs, fenêtrage partitionné) pour cartographier la distribution des financements par segment de donateurs et isoler rigoureusement les missions à plus fort impact au sein de chaque région ?',
      dataTitle: 'Données et modélisation relationnelle',
      dataConstruction:
        'Schéma relationnel PostgreSQL 3NF articulant 3 entités : Assignments (5 000 missions, score d’impact normalisé sur [0, 10]), Donations et Donors (Individual vs Corporate). L’intégrité référentielle est assurée par jointures internes avant agrégation. Données du jeu d’entraînement officiel DataLab.',
      methodTitle: 'Démarche d’analyse SQL',
      methodIntro:
        'Requêtes SQL structurées : jointures relationnelles, agrégations multidimensionnelles et CTE intermédiaire couplée à un fenêtrage partitionné.',
      methodSteps: [
        {
          title: 'Jointures & Intégrité relationnelle',
          description:
            'Jointures internes reliant Assignments, Donations et Donors via leurs clés étrangères pour corréler montants, typologies et régions.',
        },
        {
          title: 'Agrégation multidimensionnelle',
          description:
            'Calcul des montants cumulés par couple (mission, type de donateur) via GROUP BY pour identifier les 5 plus grands agrégats de dons.',
        },
        {
          title: 'Isolation analytique via CTE',
          description:
            'Création d’une CTE filtrant les missions avec dons consignés et consolidant le volume financier et le score d’impact.',
        },
        {
          title: 'Fenêtrage partitionné ROW_NUMBER()',
          description:
            'Application de ROW_NUMBER() OVER (PARTITION BY region ORDER BY impact_score DESC, num_donations DESC) pour isoler la mission leader par région.',
        },
      ],
      contribution:
        'J’ai réalisé l’ensemble des analyses SQL et la rédaction du notebook d’investigation sur DataCamp DataLab, validant les requêtes d’agrégation, les CTEs et les calculs de fenêtrage sur le schéma relationnel.',
      resultsIntro:
        'Métriques extraites des sorties validées du notebook DataCamp DataLab sur le jeu d’entraînement GoodThought, modélisant la distribution des dons par segment mission × typologie et le classement d’impact régional.',
      results: [
        { value: '4 régions', label: 'Scores maximums consignés', detail: 'East et South : 10,00 ; North et West : 9,99.' },
        { value: 'Assignment_316', label: 'Mission classée première à East', detail: 'Score de 10,00 et deux dons enregistrés parmi les missions avec dons.' },
        { value: '3 840,66 $', label: 'Plus grand agrégat de dons', detail: 'Assignment_3033, East, type Individual ; ce montant concerne un groupe mission × type de donateur.' },
      ],
      limitations: [
        'Les scores et montants sont ceux du jeu de formation DataCamp ; ils ne décrivent pas des résultats réels d’une ONG.',
        'L’échantillon des dons est restreint à certaines missions (seule une fraction des 5 000 missions bénéficie de transactions consignées), limitant la portée de l’analyse aux seules initiatives financées.',
      ],
      conclusion: {
        title: 'Bilan méthodologique & Analyse décisionnelle SQL',
        description:
          'Ce projet guidé valide la maîtrise des requêtes SQL analytiques avancées sur base relationnelle PostgreSQL : jointures multi-tables avec intégrité référentielle, agrégations groupées, CTEs et fonctions de fenêtrage partitionnées. L’analyse dégage une cartographie claire de l’allocation des ressources et des performances d’impact par zone géographique.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Common Table Expressions (CTE)', 'Window Functions', 'DataCamp DataLab', 'Jupyter Notebook'],
      documents: [
        { href: 'https://www.datacamp.com/datalab/w/f8f3f346-1000-46b8-8570-27be207896b3/edit', label: 'Ouvrir le notebook DataLab' },
        { href: 'https://www.datacamp.com/completed/statement-of-accomplishment/project/edf15932-817b-4045-8c08-e9b0c76f48de', label: 'Attestation officielle de projet DataCamp' },
        { href: '/certifications/impact-analysis-of-goodthought-ngo-initiatives.pdf', label: 'Télécharger le certificat (PDF)' },
      ],
      gallery: [],
    },
    en: {
      context:
        'Advanced SQL analytics project completed within DataCamp’s SQL Data Analyst track. The study operates on the GoodThought NGO relational schema (5,000 assignments across 4 geographic regions), modeling donation cash flows and quantifying operational efficacy via regionalized impact metrics.',
      question:
        'How can multi-table analytical SQL queries (CTEs, partitioned window functions) be architected to map funding distributions across donor segments and rigorously isolate top-performing assignments within each geographic region?',
      dataTitle: 'Data & Relational Schema Architecture',
      dataConstruction:
        'PostgreSQL 3NF relational schema bridging 3 entities: Assignments (5,000 records, normalized impact score in [0, 10]), Donations, and Donors (Individual vs Corporate). Referential integrity enforced via inner joins prior to aggregation. Sourced from DataCamp DataLab practice dataset.',
      methodTitle: 'Analytical SQL Methodology',
      methodIntro:
        'Structured SQL queries: relational joins, multidimensional group aggregations, and an intermediate CTE paired with partitioned windowing.',
      methodSteps: [
        {
          title: 'Relational Joins & Integrity',
          description:
            'Inner joins connecting Assignments, Donations, and Donors on foreign keys to correlate amounts, typologies, and regions.',
        },
        {
          title: 'Multidimensional Aggregation',
          description:
            'Computing aggregated donation sums by (assignment, donor_type) via GROUP BY to extract top funding segments.',
        },
        {
          title: 'Analytical Isolation via CTE',
          description:
            'Creating an intermediate CTE filtering assignments with recorded donations and consolidating funding volume and impact score.',
        },
        {
          title: 'Partitioned Windowing ROW_NUMBER()',
          description:
            'Applying ROW_NUMBER() OVER (PARTITION BY region ORDER BY impact_score DESC, num_donations DESC) to deterministically rank top assignments by region.',
        },
      ],
      contribution:
        'I implemented the end-to-end SQL queries and analytical notebook on DataCamp DataLab, validating aggregation logic, CTE structures, and windowed analytics across the relational schema.',
      resultsIntro:
        'Metrics extracted from verified DataCamp DataLab notebook outputs on the GoodThought practice dataset, evaluating donation distribution per assignment × donor segment and regional impact ranks.',
      results: [
        { value: '4 regions', label: 'Recorded maximum scores', detail: 'East and South: 10.00; North and West: 9.99.' },
        { value: 'Assignment_316', label: 'Top-ranked East assignment', detail: 'Impact score 10.00 with two recorded donations among assignments with donations.' },
        { value: '$3,840.66', label: 'Largest aggregated donation group', detail: 'Assignment_3033, East, donor type Individual; this is one assignment × donor-type group.' },
      ],
      limitations: [
        'The scores and amounts belong to the DataCamp practice dataset; they do not describe the real results of an NGO.',
        'Donation records cover only a fraction of the 5,000 assignments, meaning regional rankings evaluate only active funded missions rather than the full operational catalog.',
      ],
      conclusion: {
        title: 'Key Takeaways & Analytical Assessment',
        description:
          'This guided project confirms advanced PostgreSQL querying capabilities: referential multi-table joins, grouped aggregations, CTE modularization, and partitioned window ranking. The analysis produces a transparent map of donor resource allocation and regional impact performance.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Common Table Expressions (CTE)', 'Window Functions', 'DataCamp DataLab', 'Jupyter Notebook'],
      documents: [
        { href: 'https://www.datacamp.com/datalab/w/f8f3f346-1000-46b8-8570-27be207896b3/edit', label: 'Open the DataLab notebook' },
        { href: 'https://www.datacamp.com/completed/statement-of-accomplishment/project/edf15932-817b-4045-8c08-e9b0c76f48de', label: 'DataCamp official project credential' },
        { href: '/certifications/impact-analysis-of-goodthought-ngo-initiatives.pdf', label: 'Download certificate (PDF)' },
      ],
      gallery: [],
    },
  },
  'motorcycle-parts-sales': {
    fr: {
      context:
        'Projet d’analyse et d’audit SQL (DataCamp SQL Data Analyst) portant sur 1 000 commandes de vente en gros de pièces de moto (juin à août 2021) réparties sur 3 entrepôts (North, Central, West).',
      question:
        'Comment structurer les agrégations multidimensionnelles pour analyser les ventes et auditer la formule de calcul du revenu net ?',
      dataTitle: 'Données et modélisation des ventes',
      dataConstruction:
        'Le notebook analyse 1 000 commandes de juin à août 2021 sur les dimensions produit, date, entrepôt et taux payment_fee. Données du jeu officiel DataLab.',
      methodTitle: 'Démarche d’agrégation et d’audit SQL',
      methodIntro:
        'Agrégations groupées multidimensionnelles et audit critique de la déduction de frais sur le revenu net.',
      methodSteps: [
        {
          title: 'Exploration dimensionnelle',
          description:
            'Qualification des dimensions produit, date et des 3 entrepôts logistiques.',
        },
        {
          title: 'Agrégation groupée',
          description:
            'Regroupement par produit, mois et entrepôt via GROUP BY pour générer 48 agrégats.',
        },
        {
          title: 'Audit de la formule payment_fee',
          description:
            'Identification de la soustraction directe du taux payment_fee au lieu d’une déduction multiplicative.',
        },
        {
          title: 'Analyse du tri temporel',
          description:
            'Constat du tri alphabétique des mois au lieu d’un ordonnancement chronologique.',
        },
      ],
      contribution:
        'J’ai réalisé l’ensemble des requêtes d’agrégation SQL et l’audit critique de cohérence des données sur le notebook DataCamp DataLab.',
      resultsIntro:
        'Les indicateurs ci-dessous quantifient la volumétrie et les 48 regroupements multidimensionnels vérifiés dans les sorties du notebook. Les montants de revenu net enregistrés ne sont pas repris en raison de la soustraction directe d’un taux de frais.',
      results: [
        { value: '48', label: 'Agrégats affichés', detail: 'Lignes de produits, mois et entrepôts dans la sortie enregistrée.' },
        { value: '1 000', label: 'Commandes du jeu d’exercice', detail: 'Volume de données indiqué dans le notebook.' },
        { value: '3 entrepôts', label: 'Sites comparés', detail: 'North, Central et West.' },
      ],
      limitations: [
        'La requête enregistrée soustrait directement payment_fee, qui est un taux, et trie les noms des mois alphabétiquement. Aucun montant net ni aucune tendance chronologique ne sont donc repris ici.',
      ],
      conclusion: {
        title: 'Bilan méthodologique & Audit de données SQL',
        description:
          'Agrégations SQL multidimensionnelles validant 48 groupes sur 1 000 commandes, assorties d’un audit critique signalant la déduction additive erronée de payment_fee avant toute décision financière.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Grouped Aggregations', 'Data Quality Audit', 'DataCamp DataLab', 'Jupyter Notebook'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/42a9134d-c268-458b-9a48-d7abf76d5365/edit', label: 'Ouvrir le notebook DataLab' }],
      gallery: [],
    },
    en: {
      context:
        'SQL data analysis and quality audit project (DataCamp SQL Data Analyst) covering 1,000 wholesale motorcycle-parts orders (June to August 2021) distributed across 3 warehouses (North, Central, West).',
      question:
        'How can multidimensional SQL aggregations be structured to evaluate sales while auditing the validity of net revenue fee deductions?',
      dataTitle: 'Data & Wholesale Sales Modeling',
      dataConstruction:
        'The notebook analyses 1,000 orders (June–August 2021) across product, date, warehouse, and payment_fee rate dimensions. Hosted on DataLab.',
      methodTitle: 'SQL Aggregation & Audit Methodology',
      methodIntro:
        'Multidimensional SQL aggregations and critical audit of fee deduction logic on net revenue.',
      methodSteps: [
        {
          title: 'Dimensional exploration',
          description:
            'Profiling product, date, and 3 warehouse logistics dimensions.',
        },
        {
          title: 'Grouped aggregation',
          description:
            'Grouping by product, month, and warehouse via GROUP BY to produce 48 aggregates.',
        },
        {
          title: 'Fee formula audit (payment_fee)',
          description:
            'Identifying direct subtraction of payment_fee rate instead of multiplicative deduction.',
        },
        {
          title: 'Temporal sorting analysis',
          description:
            'Noting alphabetical month sorting instead of chronological ordering.',
        },
      ],
      contribution:
        'I implemented the multidimensional SQL queries and conducted the critical data quality audit within the DataCamp DataLab notebook.',
      resultsIntro:
        'The figures below report the volume and 48 verified multidimensional aggregates in the notebook outputs. Net revenue amounts are excluded due to the direct subtraction of fee rates.',
      results: [
        { value: '48', label: 'Aggregated rows', detail: 'Product lines, months, and warehouses in the saved output.' },
        { value: '1,000', label: 'Practice orders', detail: 'Dataset size stated in the notebook.' },
        { value: '3 warehouses', label: 'Sites compared', detail: 'North, Central, and West.' },
      ],
      limitations: [
        'The saved query directly subtracts payment_fee, which is a rate, and sorts month names alphabetically. Net amounts and chronological trends are therefore not reported here.',
      ],
      conclusion: {
        title: 'Key Takeaways & Data Quality Assessment',
        description:
          'Multidimensional SQL aggregations producing 48 groups over 1,000 orders, combined with an audit flagging the additive payment_fee deduction error before financial reporting.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Grouped Aggregations', 'Data Quality Audit', 'DataCamp DataLab', 'Jupyter Notebook'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/42a9134d-c268-458b-9a48-d7abf76d5365/edit', label: 'Open the DataLab notebook' }],
      gallery: [],
    },
  },
  'students-mental-health': {
    fr: {
      context: 'Projet d’analyse biostatistique réalisé sous PostgreSQL dans le cadre du parcours DataCamp SQL Data Analyst. L’étude explore les déterminants psychométriques d’une cohorte universitaire internationale au Japon (2018) via trois échelles standardisées : PHQ-9 (dépression), SCS (connexion sociale) et ASISS (stress d’acculturation).',
      question: 'Quels différentiels psychométriques séparent les étudiants internationaux et nationaux, et comment ces scores se distribuent-ils selon la durée de séjour au sein de la population internationale ?',
      dataTitle: 'Données et corpus d’enquête',
      dataConstruction: 'Corpus d’enquête de 286 lignes (observations) et 50 variables psychométriques et sociodémographiques. L’extraction cible le statut de cohorte (inter_dom : 201 Inter, 67 Dom), la durée de séjour (stay) et les scores consolidés todep (PHQ-9), tosc (SCS) et toas (ASISS).',
      methodTitle: 'Démarche d’analyse SQL',
      methodIntro: 'Protocole d’analyse structuré sous PostgreSQL articulant segmentation de cohorte, agrégations multivariées et analyse transversale par palier de séjour :',
      methodSteps: [
        { title: 'Audit des distributions & Filtrage de cohorte', description: 'Identification des variables clés (inter_dom, stay, todep, tosc, toas) et exclusion des enregistrements hors champ ou incomplets.' },
        { title: 'Agrégation bivariée Inter vs Dom', description: 'Calcul des moyennes comparatives ROUND(AVG(...), 2) sur les échelles PHQ-9, SCS et ASISS pour quantifier l’écart d’acculturation.' },
        { title: 'Stratification par durée de séjour', description: 'Filtrage strict sur les étudiants internationaux (WHERE inter_dom = \'Inter\') et calcul du volume et des scores moyens groupés par année de présence.' },
        { title: 'Ordonnancement & Analyse transversale', description: 'Tri décroissant ORDER BY stay DESC pour analyser les dynamiques de groupe sans inférer de trajectoire individuelle longitudinale.' },
      ],
      contribution: 'Conception et exécution de l’ensemble des requêtes d’agrégation SQL sous PostgreSQL, modélisation comparative des échelles psychométriques et analyse critique des résultats d’enquête.',
      resultsIntro: 'Les résultats confirment une exposition significativement supérieure au stress d’acculturation chez les étudiants internationaux et mettent en évidence un pic dépressif à trois ans de séjour :',
      results: [
        { value: '201 / 67', label: 'Effectifs analysés · Inter / Dom', detail: 'Étudiants internationaux (75 %) et nationaux (25 %) qualifiés sur les échelles psychométriques.' },
        { value: '75,56 / 62,84', label: 'Score ASISS moyen · Inter / Dom', detail: 'Écart de stress d’acculturation de +12,72 points chez les étudiants internationaux.' },
        { value: '37,42 / 37,64', label: 'Score SCS moyen · Inter / Dom', detail: 'Indice de connectivité sociale quasi-équivalent entre les deux cohortes.' },
        { value: '8,04 / 8,61', label: 'Score PHQ-9 moyen · Inter / Dom', detail: 'Moyenne de dépression légèrement inférieure pour les étudiants internationaux dans le dataset.' },
        { value: '9,09', label: 'PHQ-9 moyen après 3 ans', detail: 'Pic d’intensité dépressive observé sur le groupe de 46 étudiants internationaux à 3 ans de séjour.' },
      ],
      limitations: [
        'Étude transversale observationnelle : les variations selon la durée de séjour comparent des cohortes distinctes et ne démontrent pas de lien de causalité ni d’évolution longitudinale individuelle.',
        'Asymétrie des effectifs : les strates de séjour prolongé (≥ 5 ans) comptent un effectif réduit limitant la portée de la généralisation statistique.',
      ],
      conclusion: {
        title: 'Bilan méthodologique & Analyse biostatistique',
        description: 'L’analyse SQL met en évidence un surcroît net de stress d’acculturation chez les étudiants internationaux (ASISS à 75,56 contre 62,84) et un niveau de dépression moyen comparable (PHQ-9 à 8,04 contre 8,61), avec un pic à 9,09 chez les étudiants à 3 ans de séjour. Ce projet souligne la valeur d’une exploitation SQL rigoureuse pour la santé publique universitaire, combinant segmentation fine et stricte prudence interprétative.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Jupyter Notebook', 'DataCamp DataLab'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/92c8ef26-70ff-4f29-9282-69a8bed276ee/edit', label: 'Ouvrir le notebook DataLab' }],
      gallery: [],
    },
    en: {
      context: 'Biostatistical SQL analysis completed in PostgreSQL as part of the DataCamp SQL Data Analyst track. The study investigates psychometric determinants across an international university cohort in Japan (2018) using three standardized clinical scales: PHQ-9 (depression), SCS (social connectedness), and ASISS (acculturative stress).',
      question: 'What psychometric disparities exist between international and domestic students, and how do these scores distribute across lengths of stay within the international cohort?',
      dataTitle: 'Data and Survey Corpus',
      dataConstruction: 'Survey corpus comprising 286 rows (student records) across 50 psychometric and demographic variables. Feature extraction targets cohort status (inter_dom: 201 Inter, 67 Dom), length of stay (stay), and consolidated scale scores todep (PHQ-9), tosc (SCS), and toas (ASISS).',
      methodTitle: 'SQL Analytical Methodology',
      methodIntro: 'Structured PostgreSQL analytical protocol combining cohort segmentation, multivariate aggregations, and cross-sectional stratification by length of stay:',
      methodSteps: [
        { title: 'Distribution Audit & Cohort Filtering', description: 'Identification of key attributes (inter_dom, stay, todep, tosc, toas) and filtering of incomplete records.' },
        { title: 'Bivariate Aggregation: Inter vs Dom', description: 'Computation of comparative means ROUND(AVG(...), 2) across PHQ-9, SCS, and ASISS to quantify the acculturation gap.' },
        { title: 'Stratification by Length of Stay', description: 'Targeted filtering on international students (WHERE inter_dom = \'Inter\') aggregating sample counts and mean scale scores per stay year.' },
        { title: 'Ordering & Cross-Sectional Synthesis', description: 'Descending sort ORDER BY stay DESC to analyze group-level dynamics without assuming individual longitudinal progression.' },
      ],
      contribution: 'Designed and executed all PostgreSQL aggregation queries, performed comparative psychometric modeling, and authored the critical survey assessment.',
      resultsIntro: 'Findings reveal significantly higher exposure to acculturative stress among international students and highlight a depressive vulnerability peak at year 3:',
      results: [
        { value: '201 / 67', label: 'Sample size · Inter / Dom', detail: 'International (75%) and domestic (25%) students assessed across psychometric scales.' },
        { value: '75.56 / 62.84', label: 'Mean ASISS score · Inter / Dom', detail: 'Acculturative stress differential of +12.72 points in international students.' },
        { value: '37.42 / 37.64', label: 'Mean SCS score · Inter / Dom', detail: 'Near-equivalent social connectedness index between both cohorts.' },
        { value: '8.04 / 8.61', label: 'Mean PHQ-9 score · Inter / Dom', detail: 'Slightly lower depression baseline for international students in the sample.' },
        { value: '9.09', label: 'Mean PHQ-9 after 3 years', detail: 'Depression peak identified in the cohort of 46 international students at 3 years of stay.' },
      ],
      limitations: [
        'Cross-sectional observational study: variations across length of stay compare distinct cohorts and do not establish causation or individual longitudinal progression.',
        'Sample asymmetry: extended stay strata (≥ 5 years) feature smaller sub-samples, limiting broader statistical generalization.',
      ],
      conclusion: {
        title: 'Key Takeaways & Analytical Assessment',
        description: 'The SQL analysis documents a pronounced acculturative stress burden on international students (ASISS 75.56 vs 62.84) with comparable baseline depression (PHQ-9 8.04 vs 8.61), peaking at 9.09 for third-year students. This work demonstrates the power of structured SQL analytics for institutional health screening when paired with rigorous methodological caution.',
      },
      technologies: ['PostgreSQL', 'SQL', 'Jupyter Notebook', 'DataCamp DataLab'],
      documents: [{ href: 'https://www.datacamp.com/datalab/w/92c8ef26-70ff-4f29-9282-69a8bed276ee/edit', label: 'Open the DataLab notebook' }],
      gallery: [],
    },
  },
  'investigating-netflix-movies': {
    fr: {
      context: 'Projet guidé DataCamp réalisé dans le cadre du parcours d’analyste de données Python. L’étude explore le catalogue Netflix pour analyser la durée et la typologie des films produits durant la décennie 1990.',
      question: 'Quelle est la durée de film la plus fréquente dans les années 1990 sur Netflix, et quel est le volume de films d’action de courte durée (< 90 minutes) ?',
      dataTitle: 'Données et préparation',
      dataConstruction: 'Le jeu de données netflix_data.csv recense les programmes de la plateforme avec leurs métadonnées (identifiant, type, titre, réalisateur, casting, pays, date d’ajout, année de sortie, durée en minutes et genre). L’extraction isole les 183 longs-métrages (Movie) sortis entre 1990 inclus et 2000 exclu.',
      methodTitle: 'Démarche d’analyse Python (pandas)',
      methodIntro: 'Protocole d’analyse exploratoire de données (EDA) structuré sous Python et pandas :',
      methodSteps: [
        { title: 'Chargement & Inspection', description: 'Importation de pandas et matplotlib, lecture du fichier netflix_data.csv et inspection des dimensions et variables.' },
        { title: 'Filtrage multicritère de la décennie 1990', description: 'Sélection booléenne combinant type Movie et release_year entre 1990 et 1999 (183 observations isolées).' },
        { title: 'Calcul de la durée modale', description: 'Extraction de la durée la plus représentative via la méthode mode() convertie en entier (94 minutes).' },
        { title: 'Segmentation des films d’action courts', description: 'Filtrage conditionnel ciblant les films du genre Action durant strictement moins de 90 minutes (7 films identifiés).' },
      ],
      contribution: 'Conception et exécution de l’intégralité du notebook d’analyse exploratoire sous DataCamp DataLab, validation des tests automatisés et obtention de l’attestation officielle de projet.',
      resultsIntro: 'L’analyse exploratoire dégage les caractéristiques temporelles et typologiques des films des années 1990 :',
      results: [
        { value: '183', label: 'Films des années 90 analysés', detail: 'Films sortis entre 1990 et 1999 (type Movie) isolés du catalogue.' },
        { value: '94 min', label: 'Durée modale des films', detail: 'Valeur modale calculée via pandas.mode() sur la variable duration.' },
        { value: '7', label: 'Films d’action < 90 min', detail: 'Nombre de films du genre Action durant strictement moins de 90 minutes.' },
      ],
      limitations: [
        'Le catalogue Netflix reflète l’offre disponible sur la plateforme et non l’exhaustivité de la production cinématographique mondiale des années 1990.',
        'La durée modale (94 min) constitue un indicateur de tendance centrale spécifique à la distribution observée dans le catalogue.',
      ],
      conclusion: {
        title: 'Bilan d’analyse exploratoire Python',
        description: 'Cette étude exploratoire sous pandas démontre la maîtrise du filtrage booléen multicritère, le calcul statistique de tendance centrale (mode à 94 min) et la segmentation précise de micro-cohortes (7 films d’action courts), validée par l’attestation officielle de projet DataCamp.',
      },
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter Notebook', 'DataCamp DataLab'],
      documents: [
        { href: 'https://www.datacamp.com/datalab/w/aa128536-41d8-4af0-8ca2-843c494e7ca6/edit', label: 'Ouvrir le workspace DataLab' },
        { href: 'https://www.datacamp.com/completed/statement-of-accomplishment/project/c7716293-4394-4aa9-b22b-b5a430a64d0a', label: 'Attestation officielle de projet DataCamp' },
        { href: '/documents/projects/netflix-movies-notebook.ipynb', label: 'Télécharger le notebook (.ipynb)' },
      ],
      gallery: [],
    },
    en: {
      context: 'A guided DataCamp project completed as part of the Python data analysis track. The study investigates the Netflix catalogue to analyze movie runtimes and genre distributions across the 1990s decade.',
      question: 'What was the most frequent movie runtime in the 1990s on Netflix, and how many action movies lasted under 90 minutes?',
      dataTitle: 'Data and preparation',
      dataConstruction: 'The netflix_data.csv dataset records platform titles with their metadata (id, type, title, director, cast, country, date added, release year, runtime in minutes, description, and genre). Filtering isolates 183 feature films (Movie) released between 1990 inclusive and 2000 exclusive.',
      methodTitle: 'Python (pandas) exploratory approach',
      methodIntro: 'Structured exploratory data analysis (EDA) protocol executed with Python and pandas:',
      methodSteps: [
        { title: 'Data Loading & Inspection', description: 'Importing pandas and matplotlib, reading netflix_data.csv, and inspecting dataset dimensions and feature data types.' },
        { title: '1990s Decade Multicriteria Filtering', description: 'Boolean masking isolating type Movie released between 1990 and 1999 (183 observations extracted).' },
        { title: 'Modal Runtime Computation', description: 'Extracting the most representative duration value via mode() cast to integer (94 minutes).' },
        { title: 'Short Action Movies Segmentation', description: 'Conditional filtering targeting Action movies lasting strictly under 90 minutes (7 films identified).' },
      ],
      contribution: 'Authored and executed the complete exploratory analysis notebook in DataCamp DataLab, passing all automated evaluation tests and earning the official project credential.',
      resultsIntro: 'The exploratory analysis highlights runtime and genre characteristics of 1990s films:',
      results: [
        { value: '183', label: '1990s movies analyzed', detail: 'Feature films released between 1990 and 1999 isolated from the catalogue.' },
        { value: '94 min', label: 'Modal movie runtime', detail: 'Modal value computed via pandas.mode() on the duration variable.' },
        { value: '7', label: 'Action movies < 90 min', detail: 'Count of Action movies with a duration strictly under 90 minutes.' },
      ],
      limitations: [
        'The Netflix dataset represents platform streaming availability rather than the exhaustive global film output of the 1990s.',
        'The modal runtime (94 min) represents a central tendency specific to the observed catalogue distribution.',
      ],
      conclusion: {
        title: 'Key Takeaways & Python EDA Assessment',
        description: 'This exploratory study in pandas demonstrates proficiency in multicriteria boolean filtering, central tendency statistics (94-min mode), and micro-cohort segmentation (7 short action films), confirmed by the official DataCamp project statement of accomplishment.',
      },
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter Notebook', 'DataCamp DataLab'],
      documents: [
        { href: 'https://www.datacamp.com/datalab/w/aa128536-41d8-4af0-8ca2-843c494e7ca6/edit', label: 'Open DataLab workspace' },
        { href: 'https://www.datacamp.com/completed/statement-of-accomplishment/project/c7716293-4394-4aa9-b22b-b5a430a64d0a', label: 'DataCamp official project credential' },
        { href: '/documents/projects/netflix-movies-notebook.ipynb', label: 'Download notebook (.ipynb)' },
      ],
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
        title: 'Bilan d’ingénierie & Enseignements SQL',
        description: 'Ce projet valide la capacité à transformer des données brutes corrompues en une vue analytique propre, reproductible et directement exploitable pour le pilotage commercial, tout en respectant les standards de rigueur de l’Analytics Engineering sous PostgreSQL.',
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
        title: 'Key Takeaways & Technical Assessment',
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
