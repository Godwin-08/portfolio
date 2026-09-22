import { EducationItem, ExperienceItem } from '@/types';

export const PROFILE = {
  name: 'Godwin Elie Nougbolo',
  shortName: 'Godwin Nougbolo',
  title: 'Étudiant Ingénieur en Informatique & Ingénierie des Données (IID)',
  badge: 'Recherche PFA 2e année',
  primaryFocus: 'Data Analysis',
  growingFields: ['Data Engineering', 'Machine Learning'],
  tagline: 'Comprendre → Analyser → Construire',
  corePhilosophy: 'Preuve > Affirmation',
  philosophyDescription:
    "Je privilégie la démonstration par le projet, la décision technique documentée, le résultat chiffré et la validation empirique plutôt que les affirmations sans mesure.",
  bio: `Étudiant en 2e année du cycle ingénieur en Informatique et Ingénierie des Données, je conçois des solutions logicielles et analytiques robustes. Mon approche repose sur une méthode claire : comprendre le domaine métier, analyser rigoureusement les données et construire des outils fiables et testés.
  
Actuellement orienté vers la Data Analysis avec un fort investissement continu en Data Engineering et Machine Learning, je recherche un Projet de Fin d'Année (PFA) stimulant où mettre au service d'une équipe ma rigueur d'ingénieur et ma capacité d'apprentissage rapide.`,
  contact: {
    email: 'godwin.nougbolo@example.com', // à remplacer par l'email réel si fourni
    github: 'https://github.com/GodwinElie',
    linkedin: 'https://www.linkedin.com/in/godwin-elie-nougbolo',
    location: 'France / Disponible en stage',
    cvPath: '/cv/CV_Godwin_Nougbolo.pdf',
  },
  principles: [
    {
      title: 'Comprendre',
      description: 'Explorer le besoin métier et la structure réelle des données avant toute ligne de code.',
      icon: 'Search',
    },
    {
      title: 'Analyser',
      description: 'Quantifier, nettoyer, vérifier la distribution statistique et modéliser les relations clés.',
      icon: 'BarChart3',
    },
    {
      title: 'Construire',
      description: 'Développer des architectures maintenables, automatisées, testées et documentées.',
      icon: 'Cpu',
    },
  ],
  education: [
    {
      period: '2023 — Présent (Diplôme prévu 2026)',
      degree: 'Cycle Ingénieur — Informatique et Ingénierie des Données (IID)',
      institution: 'École d\'Ingénieurs',
      location: 'France',
      description: 'Formation approfondie alliant modélisation informatique, systèmes d\'information, mathématiques appliquées, statistiques avancées, et technologies Big Data & Machine Learning.',
      specialties: ['Data Analysis & Visualisation', 'Statistiques multivariées & Probabilités', 'Bases de données relationnelles & NoSQL', 'Algorithmique & Génie Logiciel', 'Architecture SI & Web'],
    },
    {
      period: '2021 — 2023',
      degree: 'Classes Préparatoires aux Grandes Écoles (CPGE) / Cycle Préparatoire Scientifique',
      institution: 'Formation Scientifique Intensive',
      location: '',
      description: 'Socle scientifique rigoureux en mathématiques pures et appliquées, physique et algorithmique.',
      specialties: ['Algèbre linéaire', 'Analyse mathématique', 'Probabilités', 'Physique'],
    }
  ] as EducationItem[],
  experiences: [
    {
      period: 'Projet Professionnel de Référence',
      role: 'Concepteur & Développeur Lead Data / Web',
      organization: 'Galaxy Training Manager (GTM)',
      location: 'Projet PFA Professionnel',
      context: 'Conception intégrale d\'une solution web de pilotage opérationnel, d\'évaluation et d\'analyse décisionnelle des sessions de formation.',
      highlights: [
        'Architecture MVC complète sous Flask et SQLAlchemy avec persistance MySQL.',
        'Moteur analytique avec NumPy / Pandas pour le calcul d\'indicateurs clés (taux de satisfaction, complétion, assiduité).',
        'Génération automatique de rapports décisionnels multi-formats (tableurs dynamiques openpyxl et exports PDF ReportLab).',
        'Suite de tests unitaires et d\'intégration automatisée sous pytest.',
      ],
      skills: ['Flask', 'Python', 'SQLAlchemy', 'MySQL', 'Pandas', 'NumPy', 'Tailwind CSS', 'openpyxl', 'ReportLab', 'pytest'],
    },
    {
      period: 'Projets Académiques & Recherche Opérationnelle',
      role: 'Analyste Data & Modélisation',
      organization: 'Projets Majeurs IID (Olist, AFC)',
      location: 'Cycle Ingénieur',
      context: 'Audits de données massives e-commerce (Olist : 96k+ commandes) et implémentation from scratch d\'algorithmes d\'Analyse Factorielle des Correspondances.',
      highlights: [
        'Audit de qualité, traitement des valeurs aberrantes/manquantes et segmentation comportementale.',
        'Calcul matriciel vectorisé sous NumPy/SciPy (diagonalisation, inertie, coordonnées factorielles).',
      ],
      skills: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    },
  ] as ExperienceItem[],
  association: {
    title: 'Engagement Associatif & Collectif',
    description: 'Participation active à des initiatives communautaires et étudiantes, notamment la contribution au développement frontend du projet CESTOM, développant l\'esprit d\'équipe, l\'écoute des utilisateurs et la transmission de connaissances.',
  },
  workMethod: [
    {
      title: 'Rigueur & Démarche scientifique',
      description: 'Chaque choix technique ou statistique est justifié par les contraintes réelles du problème, des tests et des métriques vérifiables.',
    },
    {
      title: 'Capacité d\'apprentissage continu',
      description: 'Exploration proactive des standards de l\'écosystème Data (Data Engineering, pipelines de données, MLOps, architectures modernes).',
    },
    {
      title: 'Sens du produit & Utilisabilité',
      description: 'La donnée n\'a de valeur que si elle est intelligible et exploitable par les décideurs métiers.',
    },
  ]
};

