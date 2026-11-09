export interface CertificationCourseContent {
  overview: string;
  topics: readonly string[];
  assessedDomains?: readonly CertificationAssessedDomain[];
  practice: string;
}

export interface CertificationAssessedDomain {
  id: string;
  title: string;
  description: string;
  assessment?: string;
}

export interface Certification {
  id: string;
  title: string;
  category: 'sql' | 'statistics' | 'data-analysis';
  credentialType: 'certification' | 'track' | 'course';
  courseIds?: readonly string[];
  importance: number;
  completedOn?: string;
  expiresOn?: string;
  reference?: string;
  imagePath?: string;
  documentPath?: string;
  verificationUrl?: string;
  issuer: string;
  accent: 'emerald';
  content: {
    fr: CertificationCourseContent;
    en: CertificationCourseContent;
  };
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    id: 'data-analyst-associate',
    title: 'Data Analyst Associate',
    imagePath: '/certifications/data-analyst-associate.png',
    category: 'data-analysis',
    credentialType: 'certification',
    importance: 0,
    completedOn: '2026-11-03',
    expiresOn: '2028-11-02',
    documentPath: '/certifications/data-analyst-associate.pdf',
    verificationUrl: 'https://www.datacamp.com/certificate/DAA0010708616816',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Certification DataCamp Data Analyst Associate obtenue après la réussite d’évaluations chronométrées et d’une épreuve pratique. L’attestation officielle indique une validité jusqu’au 2 novembre 2028.',
        topics: [
          'Gestion des données (Data Management)',
          'Analyse exploratoire (Exploratory Analysis)',
          'Expérimentation statistique (Statistical Experimentation)',
          'Communication et visualisation (Communication and Visualization)',
        ],
        assessedDomains: [
          {
            id: 'data-management',
            title: 'Gestion des données (Data Management)',
            description:
              'Au niveau d’un analyste de données, la gestion porte surtout sur le nettoyage et le traitement des données. Cela comprend le repérage des problèmes de qualité, les transformations et le travail à partir de plusieurs sources, généralement plusieurs tables de base de données. Ces tâches sont principalement réalisées en SQL.',
            assessment:
              'Ce domaine a été évalué par un défi pratique de codage SQL portant sur des tâches précises de nettoyage et de transformation appliquées à une source de données.',
          },
          {
            id: 'exploratory-analysis',
            title: 'Analyse exploratoire (Exploratory Analysis)',
            description:
              'À partir de questions métier jusqu’à une exploration plus générale, il s’agit d’aborder un problème, de trouver les données adaptées et de les mettre au bon format. Cela comprend la création de synthèses et la transformation des données pour produire des rapports et des tableaux de bord.',
            assessment:
              'Ce domaine a été principalement évalué par un défi pratique en SQL, complété par un test en R ou en Python.',
          },
          {
            id: 'statistical-experimentation',
            title:
              'Expérimentation statistique (Statistical Experimentation)',
            description:
              'Utiliser les données et des approches statistiques pertinentes pour mener des expérimentations.',
          },
          {
            id: 'communication-visualization',
            title:
              'Communication et visualisation (Communication and Visualization)',
            description:
              'Le rôle d’analyste implique de communiquer efficacement les enseignements aux parties prenantes. Cela comprend la création de tableaux de bord, de rapports et de présentations, ainsi que la représentation des données par des tableaux et des visualisations clairs et l’explication des résultats.',
          },
        ],
        practice:
          "DataCamp décrit des examens chronométrés adaptatifs et une épreuve pratique dans laquelle les candidats doivent résoudre un problème métier en nettoyant et validant des données, puis en calculant des indicateurs. Épreuve pratique officielle FoodYum Grocery Store Sales validée sous PostgreSQL : audit d’un bug d’intégrité système (year_added), pipeline de nettoyage avancé avec calcul vectorisé de médianes (PERCENTILE_CONT) via CTEs, dispersion des prix par rayon et ciblage commercial des produits phares. DataCamp note que l’acquisition des compétences de ce rôle peut généralement demander 100 heures ou plus d’apprentissage ; il s’agit d’une estimation générale, pas de la durée de préparation de Godwin.",
      },
      en: {
        overview:
          'DataCamp Data Analyst Associate certification earned after passing timed assessments and a practical exam. The official certificate states that it is valid through November 2, 2028.',
        topics: [
          'Data Management',
          'Exploratory Analysis',
          'Statistical Experimentation',
          'Communication and Visualization',
        ],
        assessedDomains: [
          {
            id: 'data-management',
            title: 'Data Management',
            description:
              'At the data analyst level, data management focuses mostly on cleaning and processing data. This includes identifying data quality issues, performing transformations, and working with data from multiple sources, typically multiple database tables. These tasks are mostly performed in SQL.',
            assessment:
              'This domain was tested through a hands-on SQL coding challenge involving specific cleaning and transformation tasks applied to a given data source.',
          },
          {
            id: 'exploratory-analysis',
            title: 'Exploratory Analysis',
            description:
              'From specific business questions to broader exploration, this involves approaching a problem, finding the right data, and getting it into the right format. It includes creating data summaries and transforming data into formats suitable for reports and dashboards.',
            assessment:
              'This domain was primarily tested through a hands-on SQL coding challenge, supplemented by a test in either R or Python.',
          },
          {
            id: 'statistical-experimentation',
            title: 'Statistical Experimentation',
            description:
              'Using data and relevant statistical approaches to perform experiments.',
          },
          {
            id: 'communication-visualization',
            title: 'Communication and Visualization',
            description:
              'Data analysts act as a direct line between business stakeholders and data, so communicating insights effectively is essential. The role includes creating dashboards, reports, and presentations, representing data with clear tables and visualizations, and explaining findings.',
          },
        ],
        practice:
          'DataCamp describes adaptive timed exams and a practical exam in which candidates solve a business problem by cleaning and validating data, then calculating metrics. Official FoodYum Grocery Store Sales practical exam completed under PostgreSQL: system integrity bug audit (year_added), advanced data cleaning pipeline with vectorized median calculation (PERCENTILE_CONT) via CTEs, product category price dispersion, and flagship product targeting. DataCamp says these skills can typically take candidates 100+ hours to acquire over time; this is a general estimate, not a claim about Godwin’s preparation time.',
      },
    },
  },
  {
    id: 'introduction-to-statistics',
    title: 'Introduction to Statistics',
    imagePath: '/certifications/introduction-to-statistics.png',
    category: 'statistics',
    credentialType: 'course',
    importance: 12,
    completedOn: '2026-10-22',
    reference: '50,503,580',
    documentPath: '/certifications/introduction-to-statistics.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/b74cbda6c327863acc461a0d1d0cd99dfe61c949',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours d’introduction aux méthodes statistiques pour décrire des données, raisonner sur les probabilités et tirer des conclusions à partir d’observations.',
        topics: [
          'Statistiques descriptives et inférentielles',
          'Mesures de tendance centrale et de dispersion',
          'Probabilités et distributions, dont les lois binomiale, normale et de Poisson',
          'Théorème central limite, corrélation et tests d’hypothèses',
        ],
        practice:
          'Les exercices du cours s’appuient notamment sur des données de criminalité à Londres et des ventes d’un commerce en ligne.',
      },
      en: {
        overview:
          'An introduction to statistical methods for describing data, reasoning about probability, and drawing conclusions from observations.',
        topics: [
          'Descriptive and inferential statistics',
          'Measures of center and spread',
          'Probability and distributions, including binomial, normal, and Poisson distributions',
          'The central limit theorem, correlation, and hypothesis testing',
        ],
        practice:
          'Course exercises include London crime data and sales data from an online retailer.',
      },
    },
  },
  {
    id: 'introduction-to-sql',
    title: 'Introduction to SQL',
    imagePath: '/certifications/introduction-to-sql.jpg',
    category: 'sql',
    credentialType: 'course',
    importance: 11,
    completedOn: '2026-10-09',
    reference: '647,099',
    documentPath: '/certifications/introduction-to-sql.jpg',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours de découverte des bases de données relationnelles et des premières requêtes SQL, avec une introduction à l’organisation et à l’extraction des données.',
        topics: [
          'Tables, identifiants et types de données',
          'Sélectionner et personnaliser des résultats avec SQL',
          'Alias, vues et bonnes pratiques de requête',
          'Différences entre les dialectes SQL, dont PostgreSQL et SQL Server',
        ],
        practice:
          'Les exercices guidés utilisent notamment une base de bibliothèque et des tables de livres.',
      },
      en: {
        overview:
          'An introduction to relational databases and foundational SQL queries, including how data is organized and retrieved.',
        topics: [
          'Tables, identifiers, and data types',
          'Selecting and tailoring results with SQL',
          'Aliases, views, and query-writing practices',
          'Differences between SQL dialects, including PostgreSQL and SQL Server',
        ],
        practice:
          'Guided exercises include a library database and book tables.',
      },
    },
  },
  {
    id: 'intermediate-sql',
    title: 'Intermediate SQL',
    imagePath: '/certifications/intermediate-sql.jpg',
    category: 'sql',
    credentialType: 'course',
    importance: 8,
    completedOn: '2026-10-09',
    reference: '50,322,153',
    documentPath: '/certifications/intermediate-sql.jpg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/3cd15ce257c58033f33f0ffeb35bda310c4d48d0',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours de pratique SQL autour du filtrage, de la synthèse et de la présentation de données afin de répondre à des questions métier.',
        topics: [
          'SELECT DISTINCT, filtres WHERE et traitement des valeurs NULL',
          'Fonctions d’agrégation, calculs et arrondis',
          'Tri, regroupement et filtres HAVING',
          'Lisibilité et bonnes pratiques de rédaction SQL',
        ],
        practice:
          'Les exercices s’appuient sur une base de films pour filtrer, comparer, agréger et regrouper des données.',
      },
      en: {
        overview:
          'A practical SQL course on filtering, summarizing, and presenting data to answer business questions.',
        topics: [
          'SELECT DISTINCT, WHERE filters, and handling NULL values',
          'Aggregate functions, calculations, and rounding',
          'Sorting, grouping, and HAVING filters',
          'Readable SQL and query-writing practices',
        ],
        practice:
          'Exercises use a film database to filter, compare, aggregate, and group data.',
      },
    },
  },
  {
    id: 'joining-data-in-sql',
    title: 'Joining Data in SQL',
    imagePath: '/certifications/joining-data-in-sql.jpg',
    category: 'sql',
    credentialType: 'course',
    importance: 10,
    completedOn: '2026-10-13',
    reference: '50,340,287',
    documentPath: '/certifications/joining-data-in-sql.jpg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/b31eb55198673c224989cf0c237e2091e8476256',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours consacré au rapprochement de tables relationnelles et à la construction de résultats cohérents à partir de plusieurs sources.',
        topics: [
          'Jointures INNER, LEFT, RIGHT, FULL et CROSS',
          'Auto-jointures, alias et relations entre tables',
          'Opérations ensemblistes UNION, INTERSECT et EXCEPT',
          'Semi-jointures, anti-jointures et sous-requêtes',
        ],
        practice:
          'Les exercices mettent en pratique les jointures et sous-requêtes sur plusieurs tables relationnelles.',
      },
      en: {
        overview:
          'A course on combining relational tables and building consistent results from multiple data sources.',
        topics: [
          'INNER, LEFT, RIGHT, FULL, and CROSS joins',
          'Self joins, aliases, and table relationships',
          'UNION, INTERSECT, and EXCEPT set operations',
          'Semi joins, anti joins, and subqueries',
        ],
        practice:
          'Exercises practice joins and subqueries across relational tables.',
      },
    },
  },
  {
    id: 'data-manipulation-in-sql',
    title: 'Data Manipulation in SQL',
    imagePath: '/certifications/data-manipulation-in-sql.png',
    category: 'sql',
    credentialType: 'course',
    importance: 4,
    completedOn: '2026-10-16',
    reference: '50,413,441',
    documentPath: '/certifications/data-manipulation-in-sql.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/72044b6d512760b656a89468ba3b56b0a2a62cbe',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours de niveau intermédiaire consacré à la transformation, au filtrage et à la catégorisation de données dans une base relationnelle.',
        topics: [
          'Instructions CASE WHEN et agrégations conditionnelles',
          'Sous-requêtes dans SELECT, FROM et WHERE',
          'Sous-requêtes corrélées, requêtes imbriquées et CTE',
          'Fonctions de fenêtre pour l’analyse de données',
        ],
        practice:
          'Les exercices utilisent la base European Soccer Database pour construire et analyser des requêtes.',
      },
      en: {
        overview:
          'An intermediate course on transforming, filtering, and categorizing data in a relational database.',
        topics: [
          'CASE WHEN statements and conditional aggregation',
          'Subqueries in SELECT, FROM, and WHERE',
          'Correlated and nested subqueries, and CTEs',
          'Window functions for data analysis',
        ],
        practice:
          'Exercises use the European Soccer Database to build and analyze queries.',
      },
    },
  },
  {
    id: 'postgresql-summary-stats-and-window-functions',
    title: 'PostgreSQL Summary Stats and Window Functions',
    imagePath: '/certifications/postgresql-summary-stats-and-window-functions.png',
    category: 'sql',
    credentialType: 'course',
    importance: 3,
    completedOn: '2026-10-18',
    reference: '50,456,282',
    documentPath:
      '/certifications/postgresql-summary-stats-and-window-functions.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/a8581ffc6aa57074497f5573be0f77b0994d6896',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours de perfectionnement à SQL portant sur les statistiques récapitulatives et les fonctions de fenêtre pour l’analyse et l’ingénierie des données.',
        topics: [
          'ORDER BY et PARTITION BY dans les fonctions de fenêtre',
          'Numérotation, classement et pagination des lignes',
          'Agrégats, cadres de fenêtre, moyennes et totaux mobiles',
          'Pivots, ROLLUP et CUBE',
        ],
        practice:
          'Les exercices appliquent les fonctions de fenêtre à des données sportives et de vols.',
      },
      en: {
        overview:
          'An advanced SQL course on summary statistics and window functions for analytics and data engineering.',
        topics: [
          'ORDER BY and PARTITION BY in window functions',
          'Row numbering, ranking, and pagination',
          'Window aggregates, frames, moving averages, and running totals',
          'Pivoting, ROLLUP, and CUBE',
        ],
        practice:
          'Exercises apply window functions to sports and flight data.',
      },
    },
  },
  {
    id: 'functions-for-manipulating-data-in-postgresql',
    title: 'Functions for Manipulating Data in PostgreSQL',
    imagePath: '/certifications/functions-for-manipulating-data-in-postgresql.png',
    category: 'sql',
    credentialType: 'course',
    importance: 6,
    completedOn: '2026-10-20',
    reference: '50,476,062',
    documentPath:
      '/certifications/functions-for-manipulating-data-in-postgresql.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/9e7a7d3f048248ad5a5a672d2fcc0600835b229d',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours consacré aux fonctions intégrées de PostgreSQL pour manipuler différents types de données et étendre les possibilités des requêtes.',
        topics: [
          'Types texte, numériques, tableaux et date/heure',
          'Fonctions et opérateurs de date, heure et intervalle',
          'Transformation, extraction et nettoyage de chaînes',
          'Recherche en texte intégral et extensions PostgreSQL',
        ],
        practice:
          'Les exercices manipulent des données de films et mettent en pratique des fonctions intégrées de PostgreSQL.',
      },
      en: {
        overview:
          'A course on PostgreSQL built-in functions for manipulating different data types and extending query capabilities.',
        topics: [
          'Text, numeric, array, and date/time data types',
          'Date, time, and interval functions and operators',
          'Transforming, extracting, and cleaning strings',
          'Full-text search and PostgreSQL extensions',
        ],
        practice:
          'Exercises manipulate film data and apply PostgreSQL built-in functions.',
      },
    },
  },
  {
    id: 'exploratory-data-analysis-in-sql',
    title: 'Exploratory Data Analysis in SQL',
    imagePath: '/certifications/exploratory-data-analysis-in-sql.png',
    category: 'sql',
    credentialType: 'course',
    importance: 7,
    completedOn: '2026-10-27',
    reference: '50,562,081',
    documentPath: '/certifications/exploratory-data-analysis-in-sql.pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/12c271d164bb6d6dc0000ef38e34a4dfdeda7d5e?raw=1',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours intermédiaire sur l’exploration de bases PostgreSQL : examiner les tables et leurs relations, résumer les données numériques, nettoyer le texte et analyser les dates.',
        topics: [
          'Structure des bases, clés étrangères, valeurs manquantes et types de données',
          'Agrégations et statistiques numériques, dont moyenne, variance, corrélation et percentiles',
          'Exploration et nettoyage de données catégorielles et de texte non structuré',
          'Dates, horodatages, séries temporelles et recherche de périodes manquantes',
        ],
        practice:
          'Les exercices explorent notamment des données de Stack Overflow, d’entreprises du Fortune 500 et des demandes de services 311 d’Evanston.',
      },
      en: {
        overview:
          'An intermediate course on exploring PostgreSQL databases: inspect tables and their relationships, summarise numeric data, clean text, and work with dates.',
        topics: [
          'Database structure, foreign keys, missing values, and data types',
          'Aggregations and numeric statistics, including averages, variance, correlation, and percentiles',
          'Exploring and cleaning categories and unstructured text',
          'Dates, timestamps, time series, and finding missing periods',
        ],
        practice:
          'Exercises explore data from Stack Overflow, Fortune 500 companies, and 311 service requests from Evanston.',
      },
    },
  },
  {
    id: 'associate-data-analyst-in-sql',
    title: 'Associate Data Analyst in SQL',
    imagePath: '/certifications/associate-data-analyst-in-sql.png',
    category: 'sql',
    credentialType: 'track',
    courseIds: [
      'introduction-to-statistics',
      'introduction-to-sql',
      'intermediate-sql',
      'joining-data-in-sql',
      'data-manipulation-in-sql',
      'postgresql-summary-stats-and-window-functions',
      'functions-for-manipulating-data-in-postgresql',
      'exploratory-data-analysis-in-sql',
      'data-communication-concepts',
      'understanding-data-visualization',
      'data-driven-decision-making-in-sql',
    ],
    importance: 9,
    completedOn: '2026-11-01',
    reference: '978,842',
    documentPath: '/certifications/associate-data-analyst-in-sql.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/track/792469f86f6275d924983bafc60c0de90da86477',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Parcours DataCamp de 39 heures terminé sous le titre Associate Data Analyst in SQL.',
        topics: ['Parcours DataCamp de 39 heures consacré à l’analyse de données avec SQL'],
        practice: 'L’attestation documente le parcours DataCamp terminé.',
      },
      en: {
        overview:
          'Completed the 39-hour DataCamp track titled Associate Data Analyst in SQL.',
        topics: ['A 39-hour DataCamp track focused on data analysis with SQL'],
        practice: 'The certificate documents the completed DataCamp track.',
      },
    },
  },
  {
    id: 'data-communication-concepts',
    title: 'Data Communication Concepts',
    imagePath: '/certifications/data-communication-concepts.png',
    category: 'data-analysis',
    credentialType: 'course',
    importance: 13,
    completedOn: '2026-11-01',
    reference: '50,676,087',
    documentPath: '/certifications/data-communication-concepts.pdf',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours consacré à la communication des résultats d’analyse : storytelling, choix des données et visualisations, rapports écrits et présentations orales adaptés au public.',
        topics: [
          'Storytelling avec les données et vulgarisation de résultats techniques',
          'Choix des données, statistiques et visualisations adaptées au public',
          'Structure, clarté et reproductibilité des rapports écrits',
          'Préparation et présentation orale de résultats',
        ],
        practice:
          'Les exercices abordent notamment la rédaction d’un rapport sur le risque de crédit et la préparation de présentations.',
      },
      en: {
        overview:
          'A course on communicating analysis results through data storytelling, appropriate data and visualisations, written reports, and audience-focused presentations.',
        topics: [
          'Data storytelling and explaining technical findings',
          'Choosing data, statistics, and visualisations for an audience',
          'Structure, clarity, and reproducibility in written reports',
          'Preparing and delivering oral presentations',
        ],
        practice:
          'Exercises include writing a credit-risk report and preparing presentations.',
      },
    },
  },
  {
    id: 'understanding-data-visualization',
    title: 'Understanding Data Visualization',
    imagePath: '/certifications/understanding-data-visualization.png',
    category: 'data-analysis',
    credentialType: 'course',
    importance: 14,
    completedOn: '2026-10-31',
    reference: '50,665,247',
    documentPath: '/certifications/understanding-data-visualization.pdf',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours d’introduction au choix et à l’interprétation de visualisations pour communiquer des données complexes.',
        topics: [
          'Histogrammes et diagrammes en boîte pour décrire des distributions',
          'Nuages de points, courbes, diagrammes à barres et diagrammes en points',
          'Couleur, forme et visualisation de plusieurs variables',
          'Pièges courants : axes trompeurs, surcharge et graphiques difficiles à lire',
        ],
        practice:
          'Les exercices explorent plus de 20 jeux de données et comparent différentes représentations graphiques.',
      },
      en: {
        overview:
          'An introductory course on choosing and interpreting visualisations to communicate complex data.',
        topics: [
          'Histograms and box plots for describing distributions',
          'Scatter plots, line charts, bar charts, and dot plots',
          'Colour, shape, and visualising multiple variables',
          'Common pitfalls: misleading axes, clutter, and hard-to-read charts',
        ],
        practice:
          'Exercises explore more than 20 datasets and compare different visual representations.',
      },
    },
  },
  {
    id: 'data-driven-decision-making-in-sql',
    title: 'Data-Driven Decision Making in SQL',
    imagePath: '/certifications/data-driven-decision-making-in-sql.png',
    category: 'sql',
    credentialType: 'course',
    importance: 5,
    completedOn: '2026-10-30',
    reference: '50,652,560',
    documentPath: '/certifications/data-driven-decision-making-in-sql.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/155f470f0fc55a1e1f222ba27e6168439da1d01f',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Cours sur l’utilisation de SQL pour éclairer les décisions métier, à partir d’une étude de cas sur une société de location de films en ligne.',
        topics: [
          'Requêtes SQL simples pour répondre à des questions métier',
          'Requêtes SQL avancées appliquées à la prise de décision',
          'Analyse de clients, évaluations de films, acteurs et ventes',
          'Agrégations multidimensionnelles et requêtes OLAP',
        ],
        practice:
          'L’étude de cas explore les préférences et l’engagement des clients ainsi que l’évolution des ventes dans une base de location de films.',
      },
      en: {
        overview:
          'A course on using SQL to support business decisions, built around an online film-rental company case study.',
        topics: [
          'Simple SQL queries for business questions',
          'Advanced SQL queries for decision-making',
          'Analysis of customers, film ratings, actors, and sales',
          'Multidimensional aggregation and OLAP queries',
        ],
        practice:
          'The case study explores customer preferences and engagement, as well as sales trends in a film-rental database.',
      },
    },
  },
  {
    id: 'introduction-to-python',
    title: 'Introduction to Python',
    imagePath: '/certifications/introduction-to-python.png',
    category: 'data-analysis',
    credentialType: 'course',
    importance: 2,
    completedOn: '2026-11-05',
    reference: '50,278,936',
    documentPath: '/certifications/introduction-to-python.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/cfa62d5ad06aab726327174a33cc14c874dd5b9b',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Formation fondamentale à Python orientée Data Science : structures de données natives, manipulation de listes, modularité (fonctions et packages) et calcul vectoriel avec NumPy.',
        topics: [
          'Bases du langage Python : variables, types scalaires et calculs',
          'Listes Python : création, indexation, découpage (slicing) et manipulation',
          'Fonctions intégrées, méthodes et gestion de paquets (imports sélectifs)',
          'Tableaux NumPy (1D et 2D), arithmétique vectorisée et statistiques de base',
        ],
        practice:
          '46 exercices interactifs et études de cas appliqués à des jeux de données réels (analyse de caractéristiques de joueurs de baseball).',
      },
      en: {
        overview:
          'Foundational Python course tailored for Data Science: core data structures, list operations, modular code with functions and packages, and vectorised computing with NumPy.',
        topics: [
          'Python programming fundamentals: variables, basic data types, and arithmetic',
          'Python lists: creation, indexing, slicing, and multi-dimensional lists',
          'Built-in functions, methods, and package management (selective imports)',
          'NumPy arrays (1D and 2D), vectorised arithmetic, and descriptive summary statistics',
        ],
        practice:
          '46 interactive exercises and applied case studies on real-world datasets (e.g. baseball player statistics).',
      },
    },
  },
  {
    id: 'intermediate-python',
    title: 'Intermediate Python',
    imagePath: '/certifications/intermediate-python.png',
    category: 'data-analysis',
    credentialType: 'course',
    importance: 1,
    completedOn: '2026-11-08',
    reference: '50,826,835',
    documentPath: '/certifications/intermediate-python.pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/9736682841e8048403b81700768031ec5568a9fe',
    issuer: 'DataCamp',
    accent: 'emerald',
    content: {
      fr: {
        overview:
          'Perfectionnement à la manipulation et à la visualisation de données en Python : graphiques Matplotlib, structures de données clés (dictionnaires et DataFrames pandas), structures de contrôle et simulation statistique.',
        topics: [
          'Visualisation avec Matplotlib : courbes, nuages de points, histogrammes et personnalisation',
          'Dictionnaires et DataFrames pandas : indexation, sélection par loc/iloc et conversion CSV',
          'Logique booléenne, flux de contrôle (if/elif/else) et filtrage logique de DataFrames',
          'Boucles while et for sur structures itérables et DataFrames',
          'Simulation statistique (Hacker Statistics) : marches aléatoires et calcul de probabilités',
        ],
        practice:
          '87 exercices interactifs et étude de cas finale de simulation statistique (Hacker Statistics) avec génération de nombres aléatoires et marches aléatoires.',
      },
      en: {
        overview:
          'Intermediate Python for data analysis and visualization: Matplotlib plotting, key data structures (dictionaries and pandas DataFrames), control flow, and statistical simulation.',
        topics: [
          'Data visualization with Matplotlib: line plots, scatter plots, histograms, and customizations',
          'Dictionaries and pandas DataFrames: indexing, subsetting via loc/iloc, and CSV ingestion',
          'Boolean logic, control flow (if/elif/else), and conditional DataFrame filtering',
          'while and for loops across iterables, NumPy arrays, and DataFrames',
          'Hacker Statistics case study: random walk simulations and empirical probability estimation',
        ],
        practice:
          '87 interactive exercises and a capstone case study using Hacker Statistics, random number generation, and probability distributions.',
      },
    },
  },
];

export const CERTIFICATIONS_BY_IMPORTANCE = [...CERTIFICATIONS].sort(
  (first, second) => first.importance - second.importance
);

export const FEATURED_COURSE_COUNT = 3;

export function getCertificationById(id: string) {
  return CERTIFICATIONS.find((certification) => certification.id === id);
}
