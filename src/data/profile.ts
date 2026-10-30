import { EducationItem } from '@/types';

export const PROFILE = {
  name: 'Godwin Elie NOUGBOLO',
  shortName: 'Godwin NOUGBOLO',
  title: 'Étudiant ingénieur en Informatique et Ingénierie des Données (IID)',
  badge: 'Stage à partir de juillet 2027',
  primaryFocus: 'Data Engineering · Data Analysis & Business Intelligence',
  growingFields: ['Data Engineering', 'Data Science', 'Machine Learning', 'Deep Learning'],
  tagline: 'Comprendre → Analyser → Construire',
  corePhilosophy: 'Preuve > Affirmation',
  contact: {
    email: 'godwinelienougbolo@gmail.com',
    phone: '+212 615 817 706',
    github: 'https://github.com/Godwin-08',
    linkedin: 'https://www.linkedin.com/in/godwin-elie-nougbolo',
    location: {
      fr: 'Khouribga, Maroc',
      en: 'Khouribga, Morocco',
    },
    cvPath: null,
  },
  association: {
    current: {
      role: 'Secrétaire général',
      organization: 'CESTOM Khouribga',
    },
    previous: [
      { role: 'Trésorier local', organization: 'CESTOM Kénitra' },
      { role: 'Bénévole', organization: 'CESTOM Ben Guerir' },
    ],
  },
  education: [
    {
      id: 'engineering',
      institution: 'ENSA Khouribga',
    },
    {
      id: 'deug',
      institution: 'Université Ibn Tofaïl',
    },
    {
      id: 'baccalaureate',
      institution: 'Collège Protestant Lomé Tokoin',
    },
  ] as EducationItem[],
};
