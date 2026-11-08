'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { ReactNode } from 'react';
import { ArrowLeft, BarChart3, Download, GitBranch, Github, LockKeyhole, ShieldCheck, TestTube2, UsersRound } from 'lucide-react';

export const GTM_QUALITY_COPY = {
  fr: "La suite pytest couvre l'authentification, l'onboarding, les permissions RBAC, les filtres, les inscriptions, les exports, le tableau de bord, l'ACP et les erreurs API. Elle contient 166 tests automatisés ; les 166 réussissaient lors de la dernière exécution disponible.",
  en: 'The pytest suite covers authentication, onboarding, RBAC permissions, filters, registrations, exports, the dashboard, PCA, and API errors. It contains 166 automated tests; all 166 passed in the latest available run.',
} as const;

type FigureData = {
  src: string; alt: string; width: number; height: number; caption: string;
  question: string; reading: string; observation: string; interpretation: string;
  businessInterest: string; limitation: string;
};
type Labels = { question: string; reading: string; observation: string; interpretation: string; businessInterest: string; limitation: string };

const figuresFr = {
  architecture: {
    src: '/images/projects/gtm-architecture-fonctionnelle.jpg',
    alt: "Architecture fonctionnelle générale de GTM : Gestion, Analyse, Décision.",
    width: 1024, height: 576,
    caption: "Flux fonctionnel : Gestion opérationnelle → Analyse → Décision.",
    question: "Comment l'application transforme-t-elle des saisies opérationnelles en informations exploitables ?",
    reading: "Trois blocs sont reliés de gauche à droite : Gestion (créer, modifier, suivre), Analyse (KPI, graphiques, taux de remplissage) et Décision (relancer clients, ouvrir sessions, profils ACP). Les flèches indiquent le sens des données.",
    observation: "Le bloc Gestion alimente le bloc Analyse avec des données brutes. Le bloc Analyse produit des informations lisibles qui alimentent le bloc Décision. Chaque couche a un périmètre distinct.",
    interpretation: "Cette séparation en trois couches reflète l'architecture logicielle : les modèles SQLAlchemy gèrent la persistance, les services métier calculent les indicateurs, et le dashboard présente les résultats aux rôles qui en ont besoin.",
    businessInterest: "La structure permet d'étendre chaque couche indépendamment : ajouter une entité métier dans Gestion, un indicateur dans Analyse, ou un nouveau rôle dans Décision sans revoir le reste.",
    limitation: "Le schéma montre les flux fonctionnels, pas l'implémentation technique détaillée ni les volumes de données traités.",
  } satisfies FigureData,
  requete: {
    src: '/images/projects/gtm-trajet-requete.jpg',
    alt: "Trajet d'une requête dans GTM entre les différentes couches technologiques.",
    width: 600, height: 900,
    caption: "Trajet complet : Navigateur → Flask → Services → SQLAlchemy → MySQL.",
    question: "Quel chemin une requête HTTP parcourt-elle de l'interface jusqu'à la base de données ?",
    reading: "Le diagramme présente cinq couches verticales : Navigateur (Alpine.js), Flask Routes & RBAC, Services Métier, SQLAlchemy ORM et MySQL 8.0. Une flèche remonte à droite du bas vers le haut pour la réponse JSON ou HTML (Jinja2).",
    observation: "Chaque couche a un rôle distinct : le navigateur déclenche la requête HTTP, Flask vérifie l'authentification et les droits RBAC avant de déléguer aux services, les services appliquent la logique métier et calculent les agrégats, SQLAlchemy traduit les objets Python en SQL, et MySQL stocke les données.",
    interpretation: "Cette séparation stricte empêche la logique métier de fuir dans les routes et les calculs d'être dispersés dans le navigateur. Elle facilite aussi les tests unitaires par couche : les services peuvent être testés sans passer par Flask.",
    businessInterest: "Le contrôle RBAC au niveau des routes (et non seulement de l'interface) garantit qu'un formateur ne peut pas accéder aux données d'un autre en appelant directement l'API.",
    limitation: "Le schéma montre le chemin nominal. Les cas d'erreur (token expiré, session pleine, doublon d'inscription) sont gérés à chaque couche mais ne sont pas représentés ici.",
  } satisfies FigureData,
  mld: {
    src: '/images/projects/gtm-mld.png',
    alt: "Modèle logique de données (MLD) relationnel de Galaxy Training Manager sous MySQL, montrant les 9 tables et leurs contraintes de clés.",
    width: 1200, height: 675,
    caption: "Schéma relationnel normalisé (3NF) : 9 entités, contraintes d'intégrité référentielle et unicité session–participant.",
    question: "Comment le schéma relationnel garantit-il l'intégrité des données sans doublons d'inscription ?",
    reading: "Neuf tables sont reliées par des clés étrangères : Users, Domaines, Formations, Sessions, Clients, Participants, Inscriptions, Formateurs et Groupes. Les clés primaires et étrangères, ainsi que les contraintes d'unicité, sont indiquées.",
    observation: "La table Inscriptions est la table centrale de liaison entre Sessions et Participants. Une contrainte d'unicité composite sur (session_id, participant_id) empêche un doublon d'inscription à la même session. Les Sessions ont une capacité maximale ; les inscriptions confirmées y sont comptées.",
    interpretation: "La normalisation en 3NF évite les redondances : un formateur est lié à une session via la table Sessions, pas dupliqué dans chaque inscription. La contrainte d'unicité est gérée au niveau de la base de données (MySQL), pas seulement par le code applicatif.",
    businessInterest: "Cette conception garantit la cohérence des KPI de remplissage : le taux est calculé sur les inscriptions confirmées divisées par la capacité de la session, sans risque de comptage double.",
    limitation: "Le MLD montre la structure cible. Les migrations Alembic appliquent les changements de schéma en production ; les contraintes peuvent différer légèrement selon la version du schéma.",
  } satisfies FigureData,
  dashboard: {
    src: '/images/projects/gtm-dashboard-demo.png',
    alt: "Tableau de bord de Galaxy Training Manager avec des indicateurs issus du jeu de démonstration.",
    width: 1323, height: 742,
    caption: "Vue d'ensemble avec 6 indicateurs clés, filtres combinés et graphiques Chart.js (données de démonstration).",
    question: "Quels indicateurs le dashboard expose-t-il et comment les filtres influencent-ils les valeurs affichées ?",
    reading: "Le screenshot montre six tuiles KPI en haut (sessions actives, clients actifs, participants distincts, remplissage moyen, formations, formateurs) suivies de cinq graphiques Chart.js. Des filtres Année, Domaine, Client et Formateur sont disponibles.",
    observation: "Les valeurs des KPI et des graphiques dépendent des filtres sélectionnés. Le taux de remplissage moyen est calculé sur les sessions du périmètre filtré. Les données affichées proviennent du jeu de démonstration inclus dans le dépôt.",
    interpretation: "Les calculs sont effectués côté serveur à chaque requête de filtre, pas dans le navigateur. Cela garantit que le remplissage moyen reflète exactement les sessions et inscriptions du périmètre choisi, sans approximation JavaScript.",
    businessInterest: "Ce point d'entrée permet à un responsable de repérer rapidement les sessions à risque (faible remplissage) et les clients inactifs signalés par le service d'alertes.",
    limitation: "Les données affichées sont issues du jeu de démonstration du dépôt ; elles ne reflètent pas l'activité réelle de Galaxy Solutions.",
  } satisfies FigureData,
};

const figuresEn = {
  architecture: {
    src: '/images/projects/gtm-architecture-fonctionnelle.jpg',
    alt: 'Functional architecture diagram of GTM: Management, Analysis, Decision.',
    width: 1024, height: 576,
    caption: 'Three-tier functional flow: Operational Management → Analysis → Decision.',
    question: 'How does the application turn operational input into actionable information?',
    reading: 'Three blocks are connected left to right: Management (create, edit, track), Analysis (KPIs, charts, fill rates), and Decision (follow up clients, open sessions, PCA profiles). Arrows show the direction of data flow.',
    observation: 'The Management block feeds the Analysis block with raw data. Analysis produces readable information that feeds the Decision block. Each layer has a distinct responsibility.',
    interpretation: 'This three-layer separation mirrors the software architecture: SQLAlchemy models handle persistence, business services compute indicators, and the dashboard surfaces results to the roles that need them.',
    businessInterest: 'The structure makes each layer independently extensible: add a business entity in Management, a new indicator in Analysis, or a new role in Decision without changing the rest.',
    limitation: 'The diagram shows functional flows, not the detailed technical implementation or data volumes processed.',
  } satisfies FigureData,
  requete: {
    src: '/images/projects/gtm-trajet-requete.jpg',
    alt: 'Request lifecycle diagram in GTM across architecture tiers.',
    width: 600, height: 900,
    caption: 'End-to-end path: Browser → Flask → Services → SQLAlchemy → MySQL.',
    question: 'What path does an HTTP request take from the interface to the database?',
    reading: 'The diagram shows five vertical layers: Browser (Alpine.js), Flask Routes & RBAC, Business Services, SQLAlchemy ORM, and MySQL 8.0. A right-side arrow returns the JSON or HTML (Jinja2) response upward.',
    observation: 'Each layer has a distinct role: the browser triggers the HTTP request, Flask checks authentication and RBAC rights before delegating to services, services apply business logic and compute aggregates, SQLAlchemy translates Python objects to SQL, and MySQL stores the data.',
    interpretation: 'This strict separation prevents business logic from leaking into routes and calculations from scattering into the browser. It also enables layer-by-layer unit testing: services can be tested without going through Flask.',
    businessInterest: "RBAC enforcement at the route level (not just the interface) ensures a trainer cannot access another trainer's data by calling the API directly.",
    limitation: 'The diagram shows the happy path. Error cases (expired token, full session, duplicate registration) are handled at each layer but are not represented here.',
  } satisfies FigureData,
  mld: {
    src: '/images/projects/gtm-mld.png',
    alt: 'Relational Logical Data Model (LDM / MLD) of Galaxy Training Manager in MySQL, detailing the 9 tables and foreign key constraints.',
    width: 1200, height: 675,
    caption: 'Normalized relational schema (3NF): 9 entities, referential integrity rules, and unique session-participant constraint.',
    question: 'How does the relational schema enforce data integrity and prevent duplicate registrations?',
    reading: 'Nine tables are linked by foreign keys: Users, Domains, Courses, Sessions, Clients, Participants, Registrations, Trainers, and Groups. Primary and foreign keys and unique constraints are shown.',
    observation: 'The Registrations table is the central join table between Sessions and Participants. A composite unique constraint on (session_id, participant_id) prevents a participant from registering twice for the same session. Sessions have a maximum capacity; confirmed registrations are counted against it.',
    interpretation: 'Third-normal-form normalization avoids redundancy: a trainer is linked to a session via the Sessions table, not duplicated in each registration. The unique constraint is enforced at the database level (MySQL), not only by application code.',
    businessInterest: 'This design guarantees fill-rate KPI accuracy: the rate is computed on confirmed registrations divided by session capacity, with no risk of double-counting.',
    limitation: 'The LDM shows the target schema. Alembic migrations apply schema changes to production; constraints may differ slightly depending on the schema version.',
  } satisfies FigureData,
  dashboard: {
    src: '/images/projects/gtm-dashboard-demo.png',
    alt: 'Galaxy Training Manager dashboard with indicators from its demo dataset.',
    width: 1323, height: 742,
    caption: 'Overview featuring 6 core indicators, multi-filters, and interactive Chart.js visualizations (demo data).',
    question: 'What indicators does the dashboard expose, and how do filters affect the displayed values?',
    reading: 'The screenshot shows six KPI tiles at the top (active sessions, active clients, distinct learners, average fill rate, courses, trainers) followed by five Chart.js charts. Year, Domain, Client, and Trainer filters are available.',
    observation: "KPI and chart values change with the selected filters. The average fill rate is computed for sessions in the filtered scope. The data shown come from the demo dataset included in the repository.",
    interpretation: 'Calculations are performed server-side on each filter request, not in the browser. This ensures the average fill rate accurately reflects the sessions and registrations in the chosen scope, without JavaScript approximation.',
    businessInterest: 'This entry point lets a manager quickly spot at-risk sessions (low fill rate) and inactive clients flagged by the alert service.',
    limitation: "The data shown come from the repository's demo dataset; they do not reflect Galaxy Solutions' real activity.",
  } satisfies FigureData,
};

const labelsFr: Labels = {
  question: 'Question étudiée',
  reading: 'Clés de lecture',
  observation: 'Constat factuel',
  interpretation: 'Interprétation analytique',
  businessInterest: 'Impact décisionnel & Métier',
  limitation: 'Limites méthodologiques',
};

const labelsEn: Labels = {
  question: 'Research question',
  reading: 'Reading guide',
  observation: 'Key observation',
  interpretation: 'Analytical interpretation',
  businessInterest: 'Operational & Business Impact',
  limitation: 'Methodological caveats',
};

function FigureAnalysis({ fig, labels }: { fig: FigureData; labels: Labels }) {
  return (
    <div className="mt-6 grid lg:grid-cols-2 gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <figure className="flex flex-col">
        <div className="flex-1 bg-slate-50 flex items-center justify-center p-4">
          <Image src={fig.src} alt={fig.alt} width={fig.width} height={fig.height} className="h-auto w-full object-contain" />
        </div>
        <figcaption className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">{fig.caption}</figcaption>
      </figure>
      <div className="border-t lg:border-t-0 lg:border-l border-slate-200 p-5">
        <dl className="space-y-4 text-sm text-slate-700">
          <div><dt className="font-semibold text-slate-900">{labels.question}</dt><dd className="mt-1 text-base leading-relaxed">{fig.question}</dd></div>
          <div><dt className="font-semibold text-slate-900">{labels.reading}</dt><dd className="mt-1 text-base leading-relaxed">{fig.reading}</dd></div>
          <div><dt className="font-semibold text-slate-900">{labels.observation}</dt><dd className="mt-1 text-base leading-relaxed">{fig.observation}</dd></div>
          <div><dt className="font-semibold text-slate-900">{labels.interpretation}</dt><dd className="mt-1 text-base leading-relaxed">{fig.interpretation}</dd></div>
          <div><dt className="font-semibold text-slate-900">{labels.businessInterest}</dt><dd className="mt-1 text-base leading-relaxed">{fig.businessInterest}</dd></div>
          <div><dt className="font-semibold text-slate-900">{labels.limitation}</dt><dd className="mt-1 text-base leading-relaxed text-slate-500 italic">{fig.limitation}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export function GtmCaseStudy() {
  const isEnglish = useLocale() === 'en';
  const figs = isEnglish ? figuresEn : figuresFr;
  const labels = isEnglish ? labelsEn : labelsFr;

  const back = isEnglish ? 'Back to projects' : 'Retour aux projets';
  const eyebrow = isEnglish ? '1st-Year Internship · Galaxy Solutions · 2025–2026' : "Stage de 1re année · Galaxy Solutions · 2025–2026";
  const title = 'GTM — Galaxy Training Manager';
  const intro = isEnglish
    ? 'A Flask application that centralizes training management and makes activity data readable for Galaxy Solutions teams.'
    : "Une application Flask pour centraliser la gestion des formations et rendre les données d'activité lisibles pour les équipes de Galaxy Solutions.";
  const roleTitle = isEnglish ? 'My role' : 'Mon rôle';
  const role = isEnglish
    ? 'I designed and developed the solution: data model, Flask backend, Jinja2 interfaces, business logic, exports, analysis, and automated validation.'
    : "J'ai pris en charge la conception et le développement de la solution : modèle de données, backend Flask, interfaces Jinja2, logique métier, exports, analyse et validation automatisée.";
  const contextTitle = isEnglish ? 'Context' : 'Le contexte';
  const context = isEnglish
    ? 'Training information, session tracking, and reporting were spread across separate tools. GTM brings training courses, sessions, clients, learners, trainers, and registrations together in one application.'
    : "La gestion des formations répartissait informations, suivi des sessions et reporting entre plusieurs supports. GTM rassemble les formations, sessions, clients, participants, formateurs et inscriptions dans une même application.";
  const builtTitle = isEnglish ? 'What I built' : "Ce que j'ai construit";
  const built: [string, string][] = isEnglish
    ? [
        ['Run operations', 'CRUD for domains, training courses, sessions, trainers, clients, learners, and registrations; business rules and consistency checks run in the backend.'],
        ['Monitor activity', 'A global dashboard provides 6 KPIs and 5 Chart.js charts. Year, domain, client, and trainer filters are combined server-side.'],
        ['Adapt access', 'Admin, Manager, and Trainer roles provide distinct workflows. The trainer dashboard is limited to its own data.'],
      ]
    : [
        ['Gérer le quotidien', "CRUD des domaines, formations, sessions, formateurs, clients, participants et inscriptions ; règles métier et contrôles de cohérence sont appliqués au backend."],
        ["Piloter l'activité", "Un dashboard global propose 6 KPI et 5 graphiques Chart.js. Les filtres année, domaine, client et formateur sont combinés côté serveur."],
        ["Adapter l'accès", "Les rôles Admin, Gestionnaire et Formateur ouvrent des parcours différents. Le dashboard formateur est limité à ses propres données."],
      ];
  const architectureTitle = isEnglish ? 'Architecture' : 'Architecture';
  const architecture = isEnglish
    ? "Jinja2, Tailwind CSS, and Alpine.js interface with a Flask application organized around routes, services, and SQLAlchemy models. MySQL handles persistence; services isolate aggregations, PCA, validation, and exports."
    : "L'interface Jinja2, Tailwind CSS et Alpine.js appelle une application Flask organisée en routes, services et modèles SQLAlchemy. La persistance est assurée par MySQL ; les services isolent notamment les agrégations, l'ACP, les validations et les exports.";
  const decisionsTitle = isEnglish ? 'Technical decisions' : 'Décisions techniques';
  const decisions: [string, string][] = isEnglish
    ? [
        ['Enforce access in the backend', 'RBAC permissions do not rely on the interface alone: API routes check privileges. This also protects trainer-dashboard aggregates.'],
        ['Compute KPIs in the right place', 'Cross-filters are handled by the API rather than recalculated in the browser, keeping indicators tied to a consistent data scope.'],
        ['Generate documents directly', 'A dedicated service creates CSV, formatted XLSX, and PDF documents, including session attendance sheets.'],
      ]
    : [
        ["Contrôler les accès au backend", "Les permissions RBAC ne reposent pas sur la seule interface : les routes API vérifient les privilèges. Cela protège aussi les agrégats du dashboard formateur."],
        ['Calculer les KPI au bon endroit', "Les filtres croisés sont traités par l'API, plutôt que recalculés dans le navigateur. Les indicateurs restent donc liés au même périmètre de données."],
        ['Produire des documents directement', "Un service dédié génère les CSV, XLSX stylisés et PDF. Les exports couvrent les entités métier et la feuille d'émargement d'une session."],
      ];
  const securityTitle = isEnglish ? 'Access and integrity' : 'Accès et intégrité';
  const security = isEnglish
    ? 'Flask-Login handles sessions; passwords are hashed with Werkzeug. The code includes token-based activation, RBAC checks, registration-duplicate constraints, and protection against deletions that break dependencies.'
    : "Flask-Login gère les sessions ; les mots de passe sont hashés avec Werkzeug. Le code contient un parcours d'activation par token, des contrôles RBAC, des contraintes contre les doublons d'inscription et des protections contre les suppressions rompant les dépendances.";
  const dashboardTitle = isEnglish ? 'Dashboard and analysis' : 'Dashboard et analyse';
  const dashboard = isEnglish
    ? 'The screenshot shows the monitoring entry point: active sessions, active clients, distinct learners, average occupancy, training courses, and active trainers. PCA complements it as exploratory—not predictive—analysis of Client × Training data, computed with NumPy and Pandas and projected onto two axes.'
    : "Le screenshot montre le point d'entrée de pilotage : sessions actives, clients actifs, participants distincts, remplissage moyen, formations et formateurs mobilisés. L'ACP complète cette vue comme analyse exploratoire — non prédictive — des données Clients × Formations, calculée avec NumPy et Pandas puis projetée sur deux axes.";
  const feedbackTitle = isEnglish ? 'Feedback → correction → validation' : 'Feedback → correction → validation';
  const feedback = isEnglish
    ? 'The repository documents user feedback through success, error, warning, and information toasts. Tests check their presence, API error contracts, and CRUD regression; structured responses distinguish, among others, 400 errors and 409 conflicts.'
    : "Le dépôt documente un système de retours utilisateur via toasts de succès, erreur, avertissement et information. Les tests vérifient leur présence, le contrat d'erreur des API et la non-régression d'actions CRUD ; les réponses structurées distinguent notamment les erreurs 400 et conflits 409.";
  const qualityTitle = isEnglish ? 'Testing and quality' : 'Tests et qualité';
  const quality = isEnglish ? GTM_QUALITY_COPY.en : GTM_QUALITY_COPY.fr;
  const resultsTitle = isEnglish ? 'What the assignment delivered' : 'Ce que la mission a livré';
  const results = isEnglish
    ? ['A system centralizing training operations.', 'Views and indicators scoped to the selected role and data perimeter.', 'Usable CSV, XLSX, and PDF exports.', 'PCA analysis connected to application data.']
    : ["Un système centralisant les opérations de formation.", "Des vues et indicateurs dépendants du rôle et du périmètre choisi.", "Des exports exploitables en CSV, XLSX et PDF.", "Une analyse ACP reliée aux données de l'application."];
  const reflectionTitle = isEnglish ? 'In retrospect' : 'Avec le recul';
  const reflection = isEnglish
    ? 'This project connected information-system design and data analysis in one product. For further scale, the repository identifies server-side pagination and E2E testing as relevant next steps.'
    : "Le projet a relié conception d'un système d'information et analyse de données dans le même produit. Pour une montée en charge, le dépôt identifie la pagination serveur et des tests E2E comme suites pertinentes.";
  const source = isEnglish ? 'View the GTM repository' : 'Voir le dépôt GTM';
  const techTitle = isEnglish ? 'Technologies used' : 'Technologies mobilisées';
  const exportsText = isEnglish
    ? 'Exports are available for operational entities in CSV and formatted XLSX; PDF is used for attendance sheets and the dashboard summary report.'
    : "Les exports couvrent les entités opérationnelles en CSV et XLSX stylisé ; le PDF sert aux feuilles d'émargement et au rapport de synthèse du dashboard.";
  const navLabel = isEnglish ? 'Project navigation' : 'Navigation entre les projets';
  const dashboardAlt = isEnglish ? 'GTM dashboard showing training activity indicators' : 'Tableau de bord GTM présentant les indicateurs de suivi des formations';
  const dashboardCaption = isEnglish ? 'Galaxy Training Manager — dashboard' : 'Galaxy Training Manager — tableau de bord';

  return (
    <article className="max-w-5xl mx-auto pb-20 space-y-16">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />{back}
      </Link>

      <header className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-700">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-slate-900">{title}</h1>
          <p className="text-lg leading-relaxed text-slate-700">{intro}</p>
          <a href="https://github.com/Godwin-08/GTM" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-btn border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            <Github className="w-4 h-4" aria-hidden="true" />{source}
          </a>
        </div>
        <figure className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-card">
          <Image src="/images/projects/gtm-dashboard.png" alt={dashboardAlt} width={1323} height={742} priority className="w-full h-auto" />
          <figcaption className="px-4 py-3 text-xs text-slate-500">{dashboardCaption}</figcaption>
        </figure>
      </header>

      <Section icon={<UsersRound />} title={contextTitle}>
        <p>{context}</p>
        <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/60 p-5">
          <h3 className="font-heading font-bold text-slate-900">{roleTitle}</h3>
          <p className="mt-2">{role}</p>
        </div>
      </Section>

      <Section icon={<GitBranch />} title={builtTitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {built.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-heading font-bold text-slate-900">{t}</h3>
              <p className="mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={<GitBranch />} title={architectureTitle}>
        <p>{architecture}</p>
        <FigureAnalysis fig={figs.architecture} labels={labels} />
        <FigureAnalysis fig={figs.requete} labels={labels} />
        <FigureAnalysis fig={figs.mld} labels={labels} />
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
          <Flow label="Interface" /><Flow label="Flask" /><Flow label="Services" /><Flow label="SQLAlchemy" /><Flow label="MySQL" />
        </div>
      </Section>

      <Section icon={<ShieldCheck />} title={decisionsTitle}>
        <div className="space-y-4">
          {decisions.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-heading font-bold text-slate-900">{t}</h3>
              <p className="mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={<LockKeyhole />} title={securityTitle}>
        <p>{security}</p>
      </Section>

      <Section icon={<BarChart3 />} title={dashboardTitle}>
        <p>{dashboard}</p>
        <FigureAnalysis fig={figs.dashboard} labels={labels} />
      </Section>

      <Section icon={<Download />} title="Exports">
        <p>{exportsText}</p>
      </Section>

      <Section icon={<TestTube2 />} title={feedbackTitle}>
        <p>{feedback}</p>
      </Section>

      <Section icon={<TestTube2 />} title={qualityTitle}>
        <p>{quality}</p>
      </Section>

      <Section icon={<BarChart3 />} title={resultsTitle}>
        <ul className="grid sm:grid-cols-2 gap-3">
          {results.map((r) => <li key={r} className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm">{r}</li>)}
        </ul>
      </Section>

      <Section icon={<GitBranch />} title={reflectionTitle}>
        <p>{reflection}</p>
      </Section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="font-heading text-xl font-bold text-slate-900">{techTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Flask', 'SQLAlchemy', 'MySQL', 'Jinja2', 'Flask-Login', 'Tailwind CSS', 'Alpine.js', 'Chart.js', 'Pandas', 'NumPy', 'openpyxl', 'ReportLab', 'pytest'].map((item) => (
            <span key={item} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-700">{item}</span>
          ))}
        </div>
      </section>

      <nav className="flex items-center justify-between border-t border-slate-200 pt-8" aria-label={navLabel}>
        <Link href={{ pathname: '/projects/[slug]', params: { slug: 'olist' } }} className="text-sm font-semibold text-slate-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">← Olist</Link>
        <Link href={{ pathname: '/projects/[slug]', params: { slug: 'afc' } }} className="text-right text-sm font-semibold text-slate-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">AFC →</Link>
      </nav>
    </article>
  );
}

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900">
        <span className="text-primary-600">{icon}</span>{title}
      </h2>
      <div className="text-base leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

function Flow({ label }: { label: string }) {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-3">{label}</div>;
}
