import { EducationItem } from '@/types';

export const PROFILE = {
  name: 'Godwin Elie Nougbolo',
  shortName: 'Godwin Nougbolo',
  title: 'Étudiant ingénieur en Informatique et Ingénierie des Données (IID)',
  badge: 'Stage à partir de juillet 2027',
  primaryFocus: 'Data Analysis',
  growingFields: ['Data Engineering', 'Machine Learning'],
  tagline: 'Comprendre → Analyser → Construire',
  corePhilosophy: 'Preuve > Affirmation',
  contact: {
    email: 'godwinelienougbolo@gmail.com',
    github: 'https://github.com/Godwin-08',
    linkedin: 'https://www.linkedin.com/in/godwin-elie-nougbolo',
    location: 'Maroc',
    cvPath: '/cv/CV_Godwin_Nougbolo.pdf',
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
