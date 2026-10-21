import { EducationItem } from '@/types';

export const PROFILE = {
  name: 'Godwin Elie Nougbolo',
  shortName: 'Godwin Nougbolo',
  title: 'Étudiant ingénieur en Informatique et Ingénierie des Données (IID)',
  badge: 'Recherche PFA 2e année',
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
      period: 'Depuis 2025',
      degree: 'Cycle ingénieur — Informatique et Ingénierie des Données (IID)',
      institution: 'ENSA Khouribga',
      location: 'Khouribga, Maroc',
      description: 'Formation d’ingénieur en informatique et ingénierie des données.',
      specialties: [],
    },
    {
      period: '2023–2025',
      degree: 'DEUG Informatique Fondamentale',
      institution: 'Université Ibn Tofaïl',
      location: 'Kénitra, Maroc',
      description: 'Mention assez bien · 13/20.',
      specialties: [],
    },
    {
      period: '2022–2023',
      degree: 'Baccalauréat Maths & SVT / Sciences de la Nature',
      institution: 'Collège Protestant Lomé Tokoin',
      location: 'Togo',
      description: 'Mention très bien.',
      specialties: [],
    },
  ] as EducationItem[],
};
