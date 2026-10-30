export interface CertificationCourseContent {
  overview: string;
  topics: readonly string[];
  practice: string;
}

export interface Certification {
  id: string;
  title: string;
  category: 'sql' | 'statistics';
  importance: number;
  completedOn?: string;
  reference?: string;
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
    id: 'introduction-to-statistics',
    title: 'Introduction to Statistics',
    category: 'statistics',
    importance: 6,
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
    category: 'sql',
    importance: 7,
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
    category: 'sql',
    importance: 5,
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
    category: 'sql',
    importance: 2,
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
    category: 'sql',
    importance: 1,
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
    category: 'sql',
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
    category: 'sql',
    importance: 4,
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
    category: 'sql',
    importance: 8,
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
];

export const CERTIFICATIONS_BY_IMPORTANCE = [...CERTIFICATIONS].sort(
  (first, second) => first.importance - second.importance
);

export const FEATURED_CERTIFICATION_COUNT = 3;

export function getCertificationById(id: string) {
  return CERTIFICATIONS.find((certification) => certification.id === id);
}
