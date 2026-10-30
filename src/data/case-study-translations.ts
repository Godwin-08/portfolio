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
    reflection: 'RevisionFlow was an opportunity to build a decision algorithm and reactive state without external dependencies. It also made product transparency concrete: tell users when their schedule cannot work.',
    technologyCategories: ['Frontend', 'State and persistence', 'Browser APIs'],
    technologyItemLabels: {
      'Nager.Date (jours fériés)': 'Nager.Date (public holidays)',
    },
  },
  'sante-scolaire': {
    heroTagline: 'Bring school health records together in a secure and practical application.',
    problem: 'A school infirmary handles sensitive information such as medical records, vaccinations, and consultations, often stored on paper. The project aimed to centralize these records in a web application that respects confidentiality and separates staff responsibilities.',
    problemPoints: [
      'Student records and medical histories are spread across documents and can be hard to find quickly.',
      'Sensitive information needs clear access boundaries between healthcare staff and administration.',
      'There is no combined view of visits and appointments to help manage the infirmary.',
    ],
    approach: 'A modular Flask application using MVC and blueprints, role-based access, and a statistics dashboard. The account flow also includes activation and password setup.',
    approachSteps: [
      { step: '1. Relational data model', description: 'SQLAlchemy models for students, medical records, consultations, and appointments, with referential integrity.' },
      { step: '2. Blueprint structure', description: 'Separate areas for authentication, students, consultations, scheduling, statistics, and administration.' },
      { step: '3. Role-based access', description: 'RBAC policies distinguish administrators, doctors, and nurses, with access limited by role.' },
      { step: '4. Monitoring and account security', description: 'A Chart.js activity dashboard, password change at first sign-in, and account activation through /activate.' },
    ],
    roleDescription: 'Built the solution individually, including data modelling, Flask backend, Jinja2 and Bootstrap screens, access roles, the statistics dashboard, and tests.',
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
        impact: 'Each profile can access only the information in its scope.',
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
    validation: 'Automated pytest tests and checks of MySQL referential-integrity constraints, alongside a documented demonstration plan.',
    validationPoints: [
      'Unit tests for application logic and services.',
      'Checks of MySQL database integrity constraints.',
    ],
    reflection: 'SantéScolaire helped me deepen my understanding of security and sensitive data handling through roles, account activation, and migrations. It is a project where technical care directly supports confidentiality.',
    technologyCategories: ['Backend', 'Database', 'Frontend', 'Quality'],
  },
  novastore: {
    heroTagline: 'Apply core object-oriented programming ideas to a complete e-commerce use case.',
    problem: 'An e-commerce project needs clear business entities such as users, products, orders, and carts. It also needs rules for stock, totals, and taxes without mixing business logic with data storage.',
    problemPoints: [
      'Model business entities with clear rules for stock and order totals.',
      'Separate object-oriented business logic from relational data storage.',
      'Cover a complete purchase flow from catalogue and cart to order and invoice.',
    ],
    approach: 'Use object-oriented design: dedicated classes represent the business domain, while SQLAlchemy ORM handles persistence without mixing it into the business logic.',
    approachSteps: [
      { step: '1. Object model', description: 'Business classes in models.py and poo_classes.py represent users, products, and orders.' },
      { step: '2. ORM persistence', description: 'Map business objects to the relational database with SQLAlchemy.' },
      { step: '3. Business rules', description: 'Class methods validate the cart, manage stock, and calculate totals.' },
      { step: '4. Storefront and admin area', description: 'Catalogue, API-backed cart, checkout and invoicing, plus a CRUD admin dashboard.' },
    ],
    roleDescription: 'An academic team project with five students in the IID programme. I contributed to application development and group design work around object-oriented programming.',
    implementation: 'A Flask application organized with blueprints, domain classes persisted through SQLAlchemy, a Jinja2 / HTML5 / CSS3 interface, and client-side cart interactions in JavaScript.',
    architectureHighlights: [
      'Clear separation between domain classes for business logic and ORM models for persistence.',
      'Encapsulation of user data and product attributes.',
      'Routes organized in Flask controller blueprints.',
    ],
    keyDecisions: [
      {
        title: 'Object-oriented business rules',
        decision: 'Keep rules such as stock and order totals in class methods.',
        rationale: 'Make business logic testable and independent of storage.',
        impact: 'The code is easier to read, with entities responsible for their own rules.',
      },
      {
        title: 'Persistence through an ORM',
        decision: 'Map objects with SQLAlchemy instead of writing SQL by hand.',
        rationale: 'Connect the object model to a relational database without duplicating logic.',
        impact: 'Python objects stay consistent with the stored data.',
      },
    ],
    resultLabels: [
      { label: 'Products in the catalogue', detail: 'Spread across several categories' },
      { label: 'Complete checkout flow', detail: 'From catalogue to invoice generation' },
      { label: 'Admin CRUD area', detail: 'Manage products and orders' },
    ],
    validation: 'Functional test scenarios cover cart management, stock validation, and order-total calculations.',
    validationPoints: [
      'Check business rules for stock and totals through class methods.',
      'Test the full cart-to-order-to-invoice flow.',
    ],
    reflection: 'NovaStore strengthened my skills in object-oriented design and separation of concerns. It is a project where OOP ideas map directly to e-commerce features.',
    technologyCategories: ['Language and framework', 'OOP and persistence', 'Database', 'Frontend'],
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
