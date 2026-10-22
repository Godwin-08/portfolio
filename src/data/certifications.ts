export interface Certification {
  id: string;
  title: string;
  completedOn: string;
  reference: string;
  documentPath: string;
  verificationUrl: string | null;
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    id: 'introduction-to-sql',
    title: 'Introduction to SQL',
    completedOn: '2026-10-09',
    reference: '647,099',
    documentPath: '/certifications/introduction-to-sql.jpg',
    verificationUrl: null,
  },
  {
    id: 'intermediate-sql',
    title: 'Intermediate SQL',
    completedOn: '2026-10-09',
    reference: '50,322,153',
    documentPath: '/certifications/intermediate-sql.jpg',
    verificationUrl: null,
  },
  {
    id: 'joining-data-in-sql',
    title: 'Joining Data in SQL',
    completedOn: '2026-10-13',
    reference: '50,340,287',
    documentPath: '/certifications/joining-data-in-sql.jpg',
    verificationUrl: null,
  },
  {
    id: 'data-manipulation-in-sql',
    title: 'Data Manipulation in SQL',
    completedOn: '2026-10-16',
    reference: '50,413,441',
    documentPath: '/certifications/data-manipulation-in-sql.pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/72044b6d512760b656a89468ba3b56b0a2a62cbe?pdf=0&raw=1',
  },
  {
    id: 'postgresql-summary-stats-and-window-functions',
    title: 'PostgreSQL Summary Stats and Window Functions',
    completedOn: '2026-10-18',
    reference: '50,456,282',
    documentPath:
      '/certifications/postgresql-summary-stats-and-window-functions.pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/a8581ffc6aa57074497f5573be0f77b0994d6896?pdf=0&raw=1',
  },
  {
    id: 'functions-for-manipulating-data-in-postgresql',
    title: 'Functions for Manipulating Data in PostgreSQL',
    completedOn: '2026-10-20',
    reference: '50,476,062',
    documentPath:
      '/certifications/functions-for-manipulating-data-in-postgresql.pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/9e7a7d3f048248ad5a5a672d2fcc0600835b229d?pdf=0&raw=1',
  },
];
