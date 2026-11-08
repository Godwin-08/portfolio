import type { CaseStudyData, KeyDecision, ProjectMetric } from '@/types';

export type LocalizedCaseStudySlug = 'revision-flow' | 'sante-scolaire' | 'novastore';

export interface LocalizedCaseStudyCopy {
  heroTagline: string;
  problem: string;
  problemPoints: readonly string[];
  approach: string;
  approachSteps: readonly { step: string; description: string }[];
  roleDescription: string;
  implementation: string;
  architectureHighlights: readonly string[];
  keyDecisions: readonly KeyDecision[];
  resultLabels: readonly Pick<ProjectMetric, 'label' | 'detail'>[];
  validation: string;
  validationPoints: readonly string[];
  reflection: string;
  technologyCategories: readonly string[];
  technologyItemLabels?: Readonly<Record<string, string>>;
}

export const ENGLISH_CASE_STUDY_COPY = {
  'revision-flow': {
    heroTagline: 'A transparent study planner that updates the schedule after each action and clearly flags overload.',
    problem: 'During exam periods, revision can be hard to spread across subjects with different levels of difficulty, urgency, and available time. Fixed schedules quickly become outdated after a change and may not show when the workload is unrealistic.',
    problemPoints: [
      'Revision work is spread across subjects, exam dates, and changing availability.',
      'There is no immediate tool that works without an account or installation.',
      'Overloaded schedules are not detected or clearly shown to the student.',
    ],
    approach: 'A greedy scheduling algorithm calculates a priority score for each subject, alternates subjects within a day, and rebuilds only future days when something changes.',
    approachSteps: [
      { step: '1. Priority score', description: 'P_i = (difficulty × chapters) × (1 + 1 / ln(Δt + 2)): workload is weighted by urgency, with logarithmic damping.' },
      { step: '2. Subject rotation', description: 'P_i_day = P_i / 2^k lowers the priority of a subject already scheduled that day, encouraging alternation.' },
      { step: '3. Greedy scheduling', description: 'The planner adds the highest-priority session each day, using a deterministic sort until the daily capacity is reached.' },
      { step: '4. Keep past records', description: 'Only future days are rebuilt, so streak, completion, and velocity statistics remain consistent.' },
    ],
    roleDescription: 'Designed and built individually: the scheduling algorithm, Store pattern, interface, local persistence, and Pomodoro timer.',
    implementation: 'Built with plain JavaScript ES6+, without a framework. A Redux-inspired Store pattern centralizes state, saves it in localStorage, and exposes it to modular interface components.',
    architectureHighlights: [
      'Store pattern with State.get, update, and subscribe, plus automatic saving after each action.',
      'localStorage persistence with deepMerge migration for new properties.',
      'Separate ES6 modules for planning, storage, UI, wizard, dashboard, Pomodoro, and history.',
    ],
    keyDecisions: [
      {
        title: 'Logarithmic priority score',
        decision: 'Use (1 + 1 / ln(Δt + 2)) instead of a simple urgency ratio.',
        rationale: 'Prevent a very close exam from sharply increasing its score and taking the whole day from other subjects.',
        impact: 'A more balanced schedule, including near the end of a revision period with several close exams.',
      },
      {
        title: 'One source of state with the Store pattern',
        decision: 'Keep state in one object instead of spreading it across components.',
        rationale: 'Keep schedule updates consistent and persistence automatic, without duplicated logic.',
        impact: 'Each action triggers recalculation, saving, and updates to subscribed components.',
      },
      {
        title: 'Show overload instead of hiding it',
        decision: 'Place impossible sessions in a visible backlog and show an alert.',
        rationale: 'An unrealistic schedule should be identified clearly instead of being presented as achievable.',
        impact: 'The student can change their capacity, reduce the workload, or mark a day as free.',
      },
    ],
    resultLabels: [
      { label: 'Offline operation', detail: 'Uses browser-native APIs only' },
      { label: 'Subject rotation', detail: 'Alternates subjects within the same day' },
      { label: 'Saved schedules', detail: 'Completion, streak, and velocity for each schedule' },
    ],
    validation: 'Functional tests cover delayed, early, and overloaded sessions, and check that the backlog is shown to the student.',
    validationPoints: [
      'Check that the schedule updates after completing, postponing, or bringing a session forward.',
      'Check that past statistics remain unchanged when future days are rebuilt.',
      'Test JSON import and export, and saved-data migration.',
    ],
    reflection: 'RevisionFlow demonstrates building a deterministic decision engine and reactive state without external dependencies. It also enforces radical product transparency: explicitly surfacing capacity overloads in an arbitrage backlog rather than masking conflicts behind an unrealistic schedule.',
    technologyCategories: ['Frontend', 'State and persistence', 'Browser APIs'],
    technologyItemLabels: {
      'Nager.Date (jours fériés)': 'Nager.Date (public holidays)',
    },
  },
  'sante-scolaire': {
    heroTagline: 'Bring school health records together in a web application.',
    problem: 'A school infirmary handles sensitive information such as medical records, vaccinations, and consultations, often stored on paper. The project aimed to centralize these records in a web application that respects confidentiality and separates staff responsibilities.',
    problemPoints: [
      'Student records and medical histories are spread across documents and can be hard to find quickly.',
      'Sensitive information needs clear access boundaries between healthcare staff and administration.',
      'There is no combined view of visits and appointments to help manage the infirmary.',
    ],
    approach: 'A Flask application organized with blueprints, different access by role, and an activity dashboard.',
    approachSteps: [
      { step: '1. Relational data model', description: 'SQLAlchemy models for students, medical records, consultations, and appointments, with referential integrity.' },
      { step: '2. Blueprint structure', description: 'Separate areas for authentication, students, consultations, scheduling, statistics, and administration.' },
      { step: '3. Role-based access', description: 'Differentiate administration and healthcare areas according to the account role.' },
      { step: '4. Activity tracking', description: 'Show visit and appointment indicators with Chart.js.' },
    ],
    roleDescription: 'Individual project covering data modelling, the Flask backend, Jinja2 and Bootstrap screens, role-based access, and the activity dashboard.',
    implementation: 'A Flask 3 backend connected to MySQL 8 through SQLAlchemy and Flask-Migrate, with a Jinja2 interface styled with Bootstrap 5 and activity charts in Chart.js.',
    architectureHighlights: [
      'A Flask application organized with blueprints, separating page logic, templates, and static assets.',
      'Versioned schema changes through Flask-Migrate and Alembic.',
      'Account lifecycle with token-based activation and a password chosen at first sign-in.',
    ],
    keyDecisions: [
      {
        title: 'Separate data access by role',
        decision: 'Check permissions on the server according to the administrator, doctor, or nurse role.',
        rationale: 'School health data is sensitive; access should be limited by responsibility, not only hidden in the interface.',
        impact: 'Routes distinguish the administration area from healthcare functions.',
      },
      {
        title: 'Keep statistics in the application',
        decision: 'Use a Chart.js dashboard instead of external reporting.',
        rationale: 'Give staff a direct view of infirmary activity.',
        impact: 'Consultations and appointments can be reviewed in the application.',
      },
    ],
    resultLabels: [
      { label: 'Separate access scopes', detail: 'Admin · Doctor · Nurse' },
      { label: 'Blueprint-based MVC', detail: 'Clear separation of responsibilities' },
      { label: 'Versioned schema', detail: 'Flask-Migrate / Alembic' },
    ],
    validation: 'The repository contains one pytest test that checks whether application configuration uses environment variables.',
    validationPoints: [
      'A test checks configuration values loaded from environment variables.',
    ],
    reflection: 'SantéScolaire highlights the architectural discipline required for sensitive healthcare information systems: strict referential database integrity, server-side role partitioning, and transparent acknowledgment of regulatory compliance audits prior to real-world deployment.',
    technologyCategories: ['Backend', 'Database', 'Frontend', 'Quality'],
  },
  novastore: {
    heroTagline: 'Apply core object-oriented programming ideas to a complete e-commerce use case.',
    problem: 'The project models products, carts, and orders, then applies stock and total-calculation rules in a demo shop.',
    problemPoints: [
      'Model business entities with clear rules for stock and order totals.',
      'Connect the catalogue to a session-based cart and an order flow.',
      'Generate a demo invoice without processing a real payment.',
    ],
    approach: 'Use object-oriented business classes. The Flask session stores the cart, while orders and alerts stay in memory.',
    approachSteps: [
      { step: '1. Object model', description: 'Business classes in models.py and poo_classes.py represent users, products, and orders.' },
      { step: '2. App state', description: 'Keep cart IDs in the Flask session and orders and alerts in memory.' },
      { step: '3. Business rules', description: 'Class methods validate the cart, manage stock, and calculate totals.' },
      { step: '4. Storefront', description: 'Filter the catalogue, update the cart through an API, and show a demo order and invoice.' },
    ],
    roleDescription: 'For this five-person team project, my main contribution was designing and developing the application. This presentation does not detail how work was divided among the team members.',
    implementation: 'A Flask application organized with blueprints, Python business classes, a Jinja2 / HTML5 / CSS3 interface, and client-side cart interactions in JavaScript. The cart uses a session; orders stay in memory.',
    architectureHighlights: [
      'Python classes represent products, carts, orders, and customers.',
      'Encapsulation of user data and product attributes.',
      'Flask routes are grouped into blueprints; the app does not configure ORM persistence.',
    ],
    keyDecisions: [
      {
        title: 'Object-oriented business rules',
        decision: 'Keep rules such as stock and order totals in class methods.',
        rationale: 'Keep stock and total calculations with the business objects.',
        impact: 'The code is easier to read, with entities responsible for their own rules.',
      },
      {
        title: 'Prototype state',
        decision: 'Keep the cart in the session and orders in memory.',
        rationale: 'Demonstrate the purchase flow without durable order storage.',
        impact: 'The cart can be rebuilt from the session; orders are lost when the app restarts.',
      },
    ],
    resultLabels: [
      { label: 'Demo products', detail: 'A catalogue grouped into categories' },
      { label: 'Cart → invoice', detail: 'A demo order can produce an invoice' },
      { label: 'Simulated payment', detail: 'No real transaction takes place' },
    ],
    validation: 'The repository contains no automated test suite; features are described from the application code.',
    validationPoints: [
      'No automated test files are present in the repository.',
    ],
    reflection: 'NovaStore demonstrates object-oriented modeling of transactional rules and modular routing in Flask. It underscores the value of isolating domain logic from HTTP controllers, while highlighting the necessity of an active relational persistence layer (ORM/RDBMS) to sustain state beyond in-memory execution.',
    technologyCategories: ['Language and framework', 'Object-oriented programming', 'Application state', 'Frontend'],
    technologyItemLabels: {
      'Classes métier': 'Domain classes',
    },
  },
} satisfies Record<LocalizedCaseStudySlug, LocalizedCaseStudyCopy>;

export function getEnglishCaseStudyCopy(slug: string): LocalizedCaseStudyCopy | undefined {
  if (slug === 'revision-flow' || slug === 'sante-scolaire' || slug === 'novastore') {
    return ENGLISH_CASE_STUDY_COPY[slug];
  }
  return undefined;
}

export function localizeCaseStudy(
  source: CaseStudyData,
  copy: LocalizedCaseStudyCopy
): CaseStudyData {
  const shapeMatches =
    (source.problemPoints?.length ?? 0) === copy.problemPoints.length &&
    (source.approachSteps?.length ?? 0) === copy.approachSteps.length &&
    (source.architectureHighlights?.length ?? 0) === copy.architectureHighlights.length &&
    source.keyDecisions.length === copy.keyDecisions.length &&
    source.results.length === copy.resultLabels.length &&
    (source.validationPoints?.length ?? 0) === copy.validationPoints.length &&
    source.technologiesDetailed.length === copy.technologyCategories.length;

  if (!shapeMatches) {
    throw new Error('English case-study copy does not match the source structure.');
  }

  return {
    ...source,
    heroTagline: copy.heroTagline,
    problem: copy.problem,
    problemPoints: source.problemPoints?.map((_, index) => copy.problemPoints[index]),
    approach: copy.approach,
    approachSteps: source.approachSteps?.map((step, index) => ({
      ...step,
      ...copy.approachSteps[index],
    })),
    roleDescription: copy.roleDescription,
    implementation: copy.implementation,
    architectureHighlights: source.architectureHighlights?.map((_, index) => copy.architectureHighlights[index]),
    keyDecisions: source.keyDecisions.map((decision, index) => ({
      ...decision,
      ...copy.keyDecisions[index],
    })),
    results: source.results.map((result, index) => ({
      ...result,
      ...copy.resultLabels[index],
    })),
    validation: copy.validation,
    validationPoints: source.validationPoints?.map((_, index) => copy.validationPoints[index]),
    reflection: copy.reflection,
    technologiesDetailed: source.technologiesDetailed.map((group, index) => ({
      ...group,
      category: copy.technologyCategories[index],
      items: group.items.map((item) => copy.technologyItemLabels?.[item] ?? item),
    })),
  };
}
