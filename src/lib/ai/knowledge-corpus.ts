import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { PROJECT_DETAIL_COPY } from '@/data/project-details';
import { SKILLS } from '@/data/skills';
import { CERTIFICATIONS_BY_IMPORTANCE } from '@/data/certifications';
import { KnowledgeCategory, KnowledgeDocument, RelatedKnowledgeItem } from './types';
import { PNEUMONIA_NOTEBOOK_PROOFS } from './corpus';


/**
 * Builds the comprehensive authoritative knowledge corpus for Godwin Elie NOUGBOLO's portfolio.
 * Every document is strictly grounded in the verified data layer of the application.
 * No facts, course contents, or metrics are invented.
 */
function buildAuthoritativeCorpus(): Record<string, KnowledgeDocument> {
  const docs: Record<string, KnowledgeDocument> = {};

  // 1. PROFILE & IDENTITY
  docs['profile-identity'] = {
    id: 'profile-identity',
    category: 'profile',
    title: {
      fr: 'Identité et présentation professionnelle',
      en: 'Identity & Professional Profile',
    },
    summary: {
      fr: 'Présentation générale de Godwin Elie NOUGBOLO, étudiant ingénieur en Informatique et Ingénierie des Données (IID).',
      en: 'General profile of Godwin Elie NOUGBOLO, Computer Science & Data Engineering (IID) student.',
    },
    facts: {
      fr: [
        `Nom complet : ${PROFILE.name} (${PROFILE.shortName}).`,
        `Statut : ${PROFILE.title} à l'ENSA Khouribga (2e année du cycle ingénieur).`,
        `Philosophie de travail : « ${PROFILE.corePhilosophy} » (Evidence > Claim).`,
        `Devise / Démarche : « ${PROFILE.tagline} ».`,
        `Axes d'intérêt majeurs : ${PROFILE.primaryFocus}.`,
        `Localisation : ${PROFILE.contact.location.fr}.`,
        `Contact professionnel : ${PROFILE.contact.email}, GitHub (${PROFILE.contact.github}), LinkedIn (${PROFILE.contact.linkedin}).`,
      ],
      en: [
        `Full name: ${PROFILE.name} (${PROFILE.shortName}).`,
        `Status: ${PROFILE.title} at ENSA Khouribga (currently in 2nd year of the engineering cycle).`,
        `Work philosophy: "${PROFILE.corePhilosophy}" (Evidence > Claim).`,
        `Motto / Approach: "${PROFILE.tagline}".`,
        `Primary focus: ${PROFILE.primaryFocus}.`,
        `Location: ${PROFILE.contact.location.en}.`,
        `Professional contact: ${PROFILE.contact.email}, GitHub (${PROFILE.contact.github}), LinkedIn (${PROFILE.contact.linkedin}).`,
      ],
    },
    href: '/about',
    tags: ['identite', 'nom', 'profil', 'presentation', 'contact', 'email', 'github', 'linkedin', 'godwin', 'nougbolo'],
    source: 'src/data/profile.ts',
  };

  // 2. INTERNSHIP SEARCH
  docs['profile-internship'] = {
    id: 'profile-internship',
    category: 'profile',
    title: {
      fr: 'Recherche de stage et disponibilité',
      en: 'Internship Search & Availability',
    },
    summary: {
      fr: 'Disponibilité pour un stage à partir de juillet 2027 dans les métiers de la donnée.',
      en: 'Availability for an internship starting in July 2027 in data-focused roles.',
    },
    facts: {
      fr: [
        `Disponibilité : stage à partir de juillet 2027 (${PROFILE.badge}).`,
        `Domaines ciblés : Data Engineering, Data Analysis & Business Intelligence, ou développement logiciel orienté données.`,
        `Objectif : contribuer à un projet concret en entreprise tout en approfondissant les acquis techniques.`,
        `Moyen de contact privilégié pour un stage : ${PROFILE.contact.email}.`,
      ],
      en: [
        `Availability: internship starting July 2027 (${PROFILE.badge}).`,
        `Target domains: Data Engineering, Data Analysis & Business Intelligence, or data-centric software development.`,
        `Goal: contribute to a real-world company project while deepening technical competencies.`,
        `Preferred contact for internship opportunities: ${PROFILE.contact.email}.`,
      ],
    },
    limitations: {
      fr: [
        'Actuellement en cours de formation académique (pas de disponibilité à temps plein avant juillet 2027).',
        'Il s’agit d’une recherche de stage d’immersion / césure en 2e année, et non d’un stage de fin d’études (PFE) immédiat.',
      ],
      en: [
        'Currently attending full-time academic courses (not available for full-time work before July 2027).',
        'This is an internship search for 2nd-year immersion, not an immediate final graduation project (PFE).',
      ],
    },
    href: '/contact',
    tags: ['stage', 'disponibilite', 'juillet 2027', 'recherche', 'recrutement', 'internship', 'availability'],
    source: 'src/data/profile.ts',
  };

  // 3. WORK METHOD
  docs['profile-method'] = {
    id: 'profile-method',
    category: 'profile',
    title: {
      fr: 'Méthode de travail : Comprendre → Analyser → Construire',
      en: 'Work Methodology: Understand → Analyze → Build',
    },
    summary: {
      fr: 'Démarche d’ingénierie rigoureuse articulée en trois étapes et fondée sur la vérification des données.',
      en: 'Rigorous 3-step engineering process grounded in data verification and testing.',
    },
    facts: {
      fr: [
        '1. Comprendre : cerner le problème métier, les contraintes réelles et la qualité des données disponibles avant d’écrire la première ligne de code.',
        '2. Analyser : nettoyer, explorer et vérifier la cohérence des jeux de données (comme dans l’audit Olist et les calculs factoriels de l’AFC).',
        '3. Construire : développer un livrable testé, modulaire et maintenable (interface web, tableau de bord décisionnel, exports automatisés, pipeline).',
        'Contrôle qualité systématique : tests unitaires (pytest), validation d’intégrité transactionnelle (ACID) et documentation des limites réelles.',
      ],
      en: [
        '1. Understand: grasp the business problem, real constraints, and available data quality before writing code.',
        '2. Analyze: clean, explore, and verify data consistency (demonstrated in Olist audit and CA factorial math).',
        '3. Build: implement a modular, tested, maintainable deliverable (web UI, BI dashboard, automated exports, pipeline).',
        'Systematic quality gates: unit testing (pytest), transactional integrity (ACID), and transparent limitation tracking.',
      ],
    },
    href: '/about',
    tags: ['methode', 'demarche', 'rigueur', 'comprendre', 'analyser', 'construire', 'methodology', 'quality'],
    source: 'messages/fr.json (about.steps)',
  };

  // 4. EDUCATION
  docs['edu-engineering'] = {
    id: 'edu-engineering',
    category: 'education',
    title: {
      fr: 'Cycle ingénieur IID — ENSA Khouribga',
      en: 'Engineering Cycle (IID) — ENSA Khouribga',
    },
    summary: {
      fr: 'Formation d’ingénieur d’État en Informatique et Ingénierie des Données (depuis 2025).',
      en: 'State engineering curriculum in Computer Science & Data Engineering (since 2025).',
    },
    facts: {
      fr: [
        'Établissement : École Nationale des Sciences Appliquées (ENSA) de Khouribga, Maroc.',
        'Filière : Informatique et Ingénierie des Données (IID).',
        'Période : depuis 2025 (actuellement en 2e année du cycle ingénieur).',
        'Enseignements clés : structures de données, bases de données relationnelles et SQL, statistiques appliquées, algorithmique, génie logiciel.',
      ],
      en: [
        'Institution: École Nationale des Sciences Appliquées (ENSA) in Khouribga, Morocco.',
        'Major: Computer Science and Data Engineering (IID).',
        'Period: since 2025 (currently in 2nd year of the engineering cycle).',
        'Core curriculum: data structures, relational databases & SQL, applied statistics, algorithms, software engineering.',
      ],
    },
    limitations: {
      fr: ['Diplôme d’ingénieur en cours d’acquisition (non encore délivré).'],
      en: ['Engineering degree in progress (not yet completed/conferred).'],
    },
    href: '/about',
    tags: ['education', 'etudes', 'formation', 'ensa', 'khouribga', 'iid', 'ingenieur', 'maroc', 'university'],
    source: 'src/data/profile.ts & messages (about.education.engineering)',
  };

  docs['edu-deug'] = {
    id: 'edu-deug',
    category: 'education',
    title: {
      fr: 'DEUG Informatique Fondamentale — Université Ibn Tofaïl',
      en: 'Associate Degree (DEUG) in Computer Science — Ibn Tofaïl University',
    },
    summary: {
      fr: 'Diplôme d’Études Universitaires Générales (DEUG) en Informatique Fondamentale (2023–2025).',
      en: 'Undergraduate Diploma in Fundamental Computer Science (2023–2025).',
    },
    facts: {
      fr: [
        'Établissement : Université Ibn Tofaïl, Faculté des Sciences, Kénitra, Maroc.',
        'Filière : Informatique Fondamentale.',
        'Période : 2023–2025.',
        'Mention obtenue : Assez Bien, avec une moyenne de 13/20.',
        'Acquis : fondements des mathématiques pour l’informatique, algorithmique, programmation procédurale et orientée objet.',
      ],
      en: [
        'Institution: Ibn Tofaïl University, Faculty of Sciences, Kénitra, Morocco.',
        'Major: Fundamental Computer Science.',
        'Period: 2023–2025.',
        'Honors: Mention Assez Bien (Fairly good honors), GPA 13/20.',
        'Acquired foundations: discrete mathematics, algorithms, procedural & object-oriented programming.',
      ],
    },
    href: '/about',
    tags: ['deug', 'universite', 'ibn tofail', 'kenitra', 'informatique fondamentale', 'mention assez bien', '13/20'],
    source: 'src/data/profile.ts & messages (about.education.deug)',
  };

  docs['edu-baccalaureate'] = {
    id: 'edu-baccalaureate',
    category: 'education',
    title: {
      fr: 'Baccalauréat Maths & SVT — Collège Protestant Lomé Tokoin',
      en: 'High School Baccalaureate in Mathematics & Life Sciences',
    },
    summary: {
      fr: 'Baccalauréat scientifique obtenu au Togo avec la Mention Très Bien (2022–2023).',
      en: 'Scientific Baccalaureate completed in Togo with Highest Honors (2022–2023).',
    },
    facts: {
      fr: [
        'Établissement : Collège Protestant Lomé Tokoin, Lomé, Togo.',
        'Série : Mathématiques et Sciences de la Vie et de la Terre (SVT) / Sciences de la Nature.',
        'Période : 2022–2023.',
        'Mention obtenue : Très Bien.',
      ],
      en: [
        'Institution: Collège Protestant Lomé Tokoin, Lomé, Togo.',
        'Stream: Mathematics and Life/Earth Sciences (SVT).',
        'Period: 2022–2023.',
        'Honors: Mention Très Bien (Highest honors).',
      ],
    },
    href: '/about',
    tags: ['bac', 'baccalaureat', 'togo', 'lome', 'mention tres bien', 'maths', 'svt'],
    source: 'src/data/profile.ts & messages (about.education.baccalaureate)',
  };

  // 5. EXPERIENCE (Galaxy Solutions)
  docs['exp-galaxy-solutions'] = {
    id: 'exp-galaxy-solutions',
    category: 'experience',
    title: {
      fr: 'Stage d’initiation — Galaxy Solutions (juillet–août 2026)',
      en: 'Initiation Internship — Galaxy Solutions (July–August 2026)',
    },
    summary: {
      fr: 'Conception et développement de l’application professionnelle Galaxy Training Manager (GTM).',
      en: 'Design and development of Galaxy Training Manager (GTM) training management application.',
    },
    facts: {
      fr: [
        'Entreprise : Galaxy Solutions.',
        'Période : juillet–août 2026, pendant deux mois (stage d’initiation terminé).',
        'Modalité : à distance.',
        'Cadre : travail individuel sur l’intégralité du cycle de conception et de développement.',
        'Projet développé : GTM (Galaxy Training Manager).',
        'Fonctionnalités documentées : gestion des formations, sessions et inscriptions ; tableau de bord avec six indicateurs et cinq graphiques ; exports CSV, Excel et PDF ; outil d’ACP exploratoire.',
        'Technologies documentées : Flask, SQLAlchemy, MySQL, Jinja2, Chart.js, ReportLab et openpyxl.',
      ],
      en: [
        'Company: Galaxy Solutions.',
        'Period: July–August 2026, for two months (completed initiation internship).',
        'Format: remote.',
        'Scope: individual responsibility across the entire design and implementation lifecycle.',
        'Delivered software: GTM (Galaxy Training Manager).',
        'Documented features: course, session, and registration management; a dashboard with six indicators and five charts; CSV, Excel, and PDF exports; an exploratory PCA tool.',
        'Documented technologies: Flask, SQLAlchemy, MySQL, Jinja2, Chart.js, ReportLab, and openpyxl.',
      ],
    },
    proofs: {
      fr: [
        'Application fonctionnelle livrée avec suite de tests pytest.',
        'Génération automatique de feuilles d’émargement PDF et de bilans de session.',
        'Module d’ACP exploratoire des profils clients / formations.',
      ],
      en: [
        'Functional web application delivered with pytest test suite.',
        'Automated generation of PDF attendance sheets and session summary reports.',
        'Exploratory PCA module for client / course profiles.',
      ],
    },
    limitations: {
      fr: [
        'Les données de démonstration affichées dans le portfolio sont des données fictives créées pour la démonstration publique.',
      ],
      en: [
        'Demo records displayed in the portfolio use synthetic data created for public demonstration.',
      ],
    },
    href: '/projects/gtm',
    tags: ['experience', 'stage', 'galaxy solutions', 'gtm', 'professionnel', 'entreprise', 'internship'],
    source: 'messages/fr.json (about.professional) & src/data/projects.ts (gtm)',
  };

  // 6. ASSOCIATIVE ENGAGEMENT (CESTOM)
  docs['assoc-cestom'] = {
    id: 'assoc-cestom',
    category: 'association',
    title: {
      fr: 'Engagement associatif — CESTOM Khouribga',
      en: 'Community Leadership — CESTOM Khouribga',
    },
    summary: {
      fr: 'Secrétaire général de la Confédération des Étudiants et Stagiaires Togolais au Maroc (section Khouribga).',
      en: 'General Secretary of the Confederation of Togolese Students and Trainees in Morocco (Khouribga chapter).',
    },
    facts: {
      fr: [
        'Organisation : CESTOM (Confédération des Étudiants et Stagiaires Togolais au Maroc).',
        'Poste actuel : Secrétaire général de la section locale de Khouribga.',
        'Responsabilités documentées : 1. Accueillir et orienter les nouveaux étudiants togolais à Khouribga.',
        '2. Assurer le relais d’information fluide entre la section locale et le bureau exécutif national.',
        '3. Participer activement à l’organisation des activités culturelles, scientifiques et sportives.',
        '4. Assurer le suivi des membres et contribuer à la coordination administrative de la section.',
        'Engagements passés documentés : Trésorier local à la CESTOM Kénitra, Bénévole à la CESTOM Ben Guerir.',
      ],
      en: [
        'Organization: CESTOM (Confederation of Togolese Students and Trainees in Morocco).',
        'Current role: General Secretary of the Khouribga local chapter.',
        'Documented duties: 1. Welcome and orient newly arriving Togolese students in Khouribga.',
        '2. Relay official communications between local members and the national executive board.',
        '3. Co-organize cultural, academic, and athletic community events.',
        '4. Maintain member follow-up and chapter administrative coordination.',
        'Past documented involvement: Local Treasurer at CESTOM Kénitra, Volunteer at CESTOM Ben Guerir.',
      ],
    },
    href: '/about',
    tags: ['association', 'engagement', 'cestom', 'secretaire general', 'khouribga', 'kenitra', 'ben guerir', 'benevolat', 'leadership'],
    source: 'src/data/profile.ts & messages (about.association)',
  };

  // 7. CERTIFICATIONS (DataCamp SQL)
  for (const cert of CERTIFICATIONS_BY_IMPORTANCE) {
    const isPostgres = cert.title.toLowerCase().includes('postgresql');
    const evidence = cert.documentPath
      ? `Preuve documentaire : document ${cert.documentPath.endsWith('.pdf') ? 'PDF vectoriel' : 'image officielle'} accessible sur le portfolio.`
      : 'Aucune copie du certificat n’est hébergée sur le portfolio.';
    const evidenceEn = cert.documentPath
      ? `Documentary evidence: official ${cert.documentPath.endsWith('.pdf') ? 'PDF' : 'image'} document available on the portfolio.`
      : 'No certificate copy is hosted on the portfolio.';
    docs[`cert-${cert.id}`] = {
      id: `cert-${cert.id}`,
      category: 'certification',
      title: {
        fr: `${cert.title} — DataCamp`,
        en: `${cert.title} — DataCamp`,
      },
      summary: {
        fr: cert.completedOn
          ? `Cours DataCamp terminé le ${cert.completedOn}.`
          : 'Cours DataCamp documenté dans le portfolio.',
        en: cert.completedOn
          ? `DataCamp course completed on ${cert.completedOn}.`
          : 'DataCamp course documented in the portfolio.',
      },
      facts: {
        fr: [
          `Intitulé de la formation : ${cert.title}.`,
          `Organisme formateur : DataCamp (plateforme d’apprentissage spécialisée dans la data).`,
          ...(cert.completedOn
            ? [`Date d’achèvement : ${cert.completedOn}.`]
            : []),
          ...(cert.reference
            ? [`Numéro de référence officiel du certificat : #${cert.reference}.`]
            : []),
          `Notions recensées dans la fiche : ${cert.content.fr.topics.join('; ')}.`,
          `Mise en pratique décrite : ${cert.content.fr.practice}`,
          evidence,
          cert.verificationUrl
            ? `Lien officiel de vérification DataCamp : ${cert.verificationUrl}`
            : cert.documentPath
              ? 'Certificat vérifiable via le document officiel téléchargeable.'
              : 'Aucun document ou lien officiel de vérification n’est renseigné.',
        ],
        en: [
          `Course title: ${cert.title}.`,
          `Issuing organization: DataCamp (specialized data learning platform).`,
          ...(cert.completedOn
            ? [`Completion date: ${cert.completedOn}.`]
            : []),
          ...(cert.reference
            ? [`Official certificate reference: #${cert.reference}.`]
            : []),
          `Topics listed in the course summary: ${cert.content.en.topics.join('; ')}.`,
          `Practice described: ${cert.content.en.practice}`,
          evidenceEn,
          cert.verificationUrl
            ? `Official DataCamp online verification: ${cert.verificationUrl}`
            : cert.documentPath
              ? 'Certificate verifiable via the downloadable official document.'
              : 'No official document or verification link is listed.',
        ],
      },
      limitations: {
        fr: [
          'Cette fiche présente le cours suivi et ne constitue pas une évaluation indépendante du niveau professionnel.',
          `Cette formation porte sur ${isPostgres ? 'PostgreSQL' : cert.title.includes('Statistics') ? 'les statistiques' : 'le langage SQL'} et complète les projets pratiques, qui restent les preuves maîtresses des compétences de Godwin.`,
        ],
        en: [
          'This course summary does not constitute an independent assessment of professional proficiency.',
          `This course focuses on ${isPostgres ? 'PostgreSQL' : cert.title.includes('Statistics') ? 'statistics' : 'SQL'} and complements applied projects, which remain the primary evidence of Godwin’s skills.`,
        ],
      },
      href: cert.verificationUrl || cert.documentPath,
      tags: ['certification', 'certificat', 'datacamp', 'sql', 'postgresql', cert.title.toLowerCase()],
      source: 'src/data/certifications.ts',
    };
  }

  // 8. PROJECTS & CASE STUDIES
  for (const p of PROJECTS) {
    const detail = PROJECT_DETAIL_COPY[p.id as keyof typeof PROJECT_DETAIL_COPY];
    const frDetail = detail?.fr;
    const enDetail = detail?.en;

    const frProofs: string[] = [];
    const enProofs: string[] = [];

    if (frDetail?.results) {
      for (const r of frDetail.results) {
        frProofs.push(`${r.label} : ${r.value} (${r.detail})`);
      }
    }
    if (enDetail?.results) {
      for (const r of enDetail.results) {
        enProofs.push(`${r.label}: ${r.value} (${r.detail})`);
      }
    }

    const documentedTechnologiesFr =
      p.id === 'novastore'
        ? p.skills.filter((technology) => technology.toLowerCase() !== 'sqlalchemy')
        : p.skills;
    const documentedTechnologiesEn = documentedTechnologiesFr;

    const frFacts: string[] = [
      `Titre : ${p.title}.`,
      `Catégorie : ${p.category} · Période : ${p.period} · Cadre : ${p.context}.`,
      `Résumé : ${p.summary}`,
    ];
    const enFacts: string[] = [
      `Title: ${p.title}.`,
      `Category: ${p.category} · Period: ${p.period} · Context: ${p.context}.`,
      `Summary: ${p.tagline}`,
    ];

    if (p.id === 'novastore') {
      frFacts.push(
        'La fiche projet mentionne SQLAlchemy, mais le parcours étudié ne configure pas l’ORM et ne l’utilise pas pour persister les données. Le catalogue est créé à partir d’objets Python.'
      );
      enFacts.push(
        'The project page mentions SQLAlchemy, but the reviewed application flow does not configure the ORM or use it to persist data. The catalogue is built from Python objects.'
      );
    }
    frFacts.push(`Technologies principales : ${documentedTechnologiesFr.join(', ')}.`);
    enFacts.push(`Core technologies: ${documentedTechnologiesEn.join(', ')}.`);
    if (frDetail?.context) frFacts.push(`Contexte : ${frDetail.context}`);
    if (frDetail?.question) frFacts.push(`Problématique : ${frDetail.question}`);

    if (enDetail?.context) enFacts.push(`Context: ${enDetail.context}`);
    if (enDetail?.question) enFacts.push(`Core question: ${enDetail.question}`);

    if (p.id === 'pneumonia-detection') {
      frFacts.push(
        'Approche CNN : réseau construit pour le projet et entraîné à partir de zéro, sans poids pré-entraînés.'
      );
      enFacts.push(
        'CNN approach: a project-built network trained from scratch without pre-trained weights.'
      );
      if (frDetail && 'dataConstruction' in frDetail && frDetail.dataConstruction) {
        frFacts.push(`Données et préparation : ${frDetail.dataConstruction}`);
      }
      if (enDetail && 'dataConstruction' in enDetail && enDetail.dataConstruction) {
        enFacts.push(`Data and preparation: ${enDetail.dataConstruction}`);
      }
      if (frDetail) {
        frFacts.push(`Démarche expérimentale : ${frDetail.methodIntro}`);
        frFacts.push(
          ...frDetail.methodSteps.map((step) => `${step.title} : ${step.description}`)
        );
        if ('architecture' in frDetail && frDetail.architecture) {
          frFacts.push(`Architectures : ${frDetail.architecture.introduction}`);
          frFacts.push(
            ...frDetail.architecture.layers.map(
              (layer) => `${layer.title} : ${layer.description}`
            )
          );
        }
        if ('keyDecisions' in frDetail && frDetail.keyDecisions) {
          frFacts.push(
            ...frDetail.keyDecisions.items.map(
              (item) => `${item.title} : ${item.description}`
            )
          );
        }
        if (frDetail.conclusion) {
          frFacts.push(`Interprétation : ${frDetail.conclusion.description}`);
        }
      }
      if (enDetail) {
        enFacts.push(`Experimental approach: ${enDetail.methodIntro}`);
        enFacts.push(
          ...enDetail.methodSteps.map((step) => `${step.title}: ${step.description}`)
        );
        if ('architecture' in enDetail && enDetail.architecture) {
          enFacts.push(`Architectures: ${enDetail.architecture.introduction}`);
          enFacts.push(
            ...enDetail.architecture.layers.map(
              (layer) => `${layer.title}: ${layer.description}`
            )
          );
        }
        if ('keyDecisions' in enDetail && enDetail.keyDecisions) {
          enFacts.push(
            ...enDetail.keyDecisions.items.map(
              (item) => `${item.title}: ${item.description}`
            )
          );
        }
        if (enDetail.conclusion) {
          enFacts.push(`Interpretation: ${enDetail.conclusion.description}`);
        }
      }
      frProofs.push(...PNEUMONIA_NOTEBOOK_PROOFS.fr);
      enProofs.push(...PNEUMONIA_NOTEBOOK_PROOFS.en);
    }

    docs[`proj-${p.id}`] = {
      id: `proj-${p.id}`,
      category: 'project',
      title: {
        fr: p.title,
        en: p.title,
      },
      summary: {
        fr: p.summary,
        en: p.tagline,
      },
      facts: {
        fr: frFacts,
        en: enFacts,
      },
      proofs: {
        fr: frProofs,
        en: enProofs,
      },
      limitations: {
        fr: frDetail?.limitations ? [...frDetail.limitations] : [],
        en: enDetail?.limitations ? [...enDetail.limitations] : [],
      },
      href: `/projects/${p.slug}`,
      tags: ['projet', 'project', p.id, p.slug, p.category.toLowerCase(), ...p.skills.map((s) => s.toLowerCase())],
      source:
        p.id === 'pneumonia-detection'
          ? 'src/data/projects.ts, src/data/project-details.ts & Pneumonia-Detection-from-X-rays/notebooks/'
          : 'src/data/projects.ts & src/data/project-details.ts',
    };
  }

  // 9. PUBLIC DOCUMENTS

  docs['doc-cv'] = {
    id: 'doc-cv',
    category: 'document',
    title: {
      fr: 'CV de Godwin Elie NOUGBOLO (PDF)',
      en: 'Godwin Elie NOUGBOLO’s Resume (PDF)',
    },
    summary: {
      fr: 'CV d’une page de Godwin Elie NOUGBOLO, étudiant ingénieur en Informatique et Ingénierie des Données.',
      en: 'One-page resume for Godwin Elie NOUGBOLO, a Computer Science and Data Engineering student.',
    },
    facts: {
      fr: [
        'Format : PDF.',
        'Chemin d’accès public : /cv/CV_Godwin_Nougbolo.pdf.',
        'Langue : Français.',
      ],
      en: [
        'Format: PDF.',
        'Public access path: /cv/CV_Godwin_Nougbolo.pdf.',
        'Language: French.',
      ],
    },
    href: '/cv/CV_Godwin_Nougbolo.pdf',
    tags: ['cv', 'curriculum vitae', 'resume', 'résumé', 'pdf', 'document'],
    source: 'cv/CV_Godwin_Nougbolo.tex',
  };

  docs['doc-gtm-report'] = {
    id: 'doc-gtm-report',
    category: 'document',
    title: {
      fr: 'Rapport de stage GTM (PDF)',
      en: 'GTM Internship Report (PDF)',
    },
    summary: {
      fr: 'Rapport de stage d’initiation consacré à la conception de Galaxy Training Manager chez Galaxy Solutions.',
      en: 'Internship report covering the development of Galaxy Training Manager at Galaxy Solutions.',
    },
    facts: {
      fr: [
        'Intitulé : Rapport de stage en français (PDF).',
        'Chemin d’accès public : /documents/projects/gtm-internship-report-fr.pdf.',
        'Langue : Français.',
        'Sujet : conception et développement du SI de suivi des formations GTM pendant le stage chez Galaxy Solutions.',
      ],
      en: [
        'Title: Internship report in French (PDF).',
        'Public access path: /documents/projects/gtm-internship-report-fr.pdf.',
        'Language: French.',
        'Topic: design and implementation of the GTM training management system during internship at Galaxy Solutions.',
      ],
    },
    limitations: {
      fr: ['Document rédigé en français. Son contenu textuel complet n’est pas transmis au modèle IA afin d’éviter toute hallucination.'],
      en: ['Document written in French. Full text is not ingested into the LLM context to prevent hallucinated summarization.'],
    },
    href: '/documents/projects/gtm-internship-report-fr.pdf',
    tags: ['rapport', 'stage', 'gtm', 'galaxy solutions', 'pdf', 'document'],
    source: 'src/data/project-details.ts (gtm.documents)',
  };

  docs['doc-afc-presentation'] = {
    id: 'doc-afc-presentation',
    category: 'document',
    title: {
      fr: 'Présentation méthodologique AFC (PDF)',
      en: 'CA Methodology Presentation (PDF)',
    },
    summary: {
      fr: 'Présentation méthodologique de l’Analyse Factorielle des Correspondances appliquée aux offres LinkedIn.',
      en: 'Methodology slide presentation of Correspondence Analysis applied to LinkedIn job posts.',
    },
    facts: {
      fr: [
        'Intitulé : Présentation méthodologique en français (PDF).',
        'Chemin d’accès public : /documents/projects/afc-methodology-presentation-fr.pdf.',
        'Langue : Français.',
        'Sujet : formulation mathématique du chi-deux, profils-lignes et profils-colonnes, décomposition factorielle avec NumPy/SciPy.',
      ],
      en: [
        'Title: Methodology presentation in French (PDF).',
        'Public access path: /documents/projects/afc-methodology-presentation-fr.pdf.',
        'Language: French.',
        'Topic: chi-square mathematical foundation, row/column profiles, and factorial decomposition with NumPy/SciPy.',
      ],
    },
    href: '/documents/projects/afc-methodology-presentation-fr.pdf',
    tags: ['presentation', 'afc', 'statistiques', 'methodologie', 'pdf', 'document'],
    source: 'src/data/project-details.ts (afc.documents)',
  };

  docs['doc-revisionflow-report'] = {
    id: 'doc-revisionflow-report',
    category: 'document',
    title: {
      fr: 'Rapport complet RevisionFlow (PDF)',
      en: 'RevisionFlow Full Report (PDF)',
    },
    summary: {
      fr: 'Rapport technique sur l’algorithme d’ordonnancement et le Store réactif de RevisionFlow.',
      en: 'Technical report on the scheduling algorithm and reactive Store in RevisionFlow.',
    },
    facts: {
      fr: [
        'Intitulé : Rapport complet de RevisionFlow (PDF).',
        'Chemin d’accès public : /documents/projects/revisionflow-report-fr.pdf.',
        'Langue : Français.',
        'Sujet : formule du score de priorité logarithmique, alternance journalière, persistance locale et architecture modulaire.',
      ],
      en: [
        'Title: Full RevisionFlow technical report (PDF).',
        'Public access path: /documents/projects/revisionflow-report-fr.pdf.',
        'Language: French.',
        'Topic: logarithmic priority score formula, daily subject alternation, local persistence, and modular architecture.',
      ],
    },
    href: '/documents/projects/revisionflow-report-fr.pdf',
    tags: ['rapport', 'revisionflow', 'algorithme', 'pdf', 'document'],
    source: 'src/data/project-details.ts (revision-flow.documents)',
  };

  docs['doc-santescolaire-presentation'] = {
    id: 'doc-santescolaire-presentation',
    category: 'document',
    title: {
      fr: 'Présentation du projet SantéScolaire (PDF)',
      en: 'SantéScolaire Project Presentation (PDF)',
    },
    summary: {
      fr: 'Support de présentation de l’application web SantéScolaire et de sa politique d’accès par rôles (RBAC).',
      en: 'Presentation slides on SantéScolaire web app and its role-based access control (RBAC).',
    },
    facts: {
      fr: [
        'Intitulé : Présentation du projet SantéScolaire en français (PDF).',
        'Chemin d’accès public : /documents/projects/santescolaire-project-presentation-fr.pdf.',
        'Langue : Français.',
        'Sujet : modélisation relationnelle MySQL, contrôle d’accès pour 3 rôles (administrateur, médecin, infirmier), dashboard Chart.js.',
      ],
      en: [
        'Title: SantéScolaire project presentation in French (PDF).',
        'Public access path: /documents/projects/santescolaire-project-presentation-fr.pdf.',
        'Language: French.',
        'Topic: MySQL relational modeling, 3-role access control (admin, doctor, nurse), Chart.js dashboard.',
      ],
    },
    href: '/documents/projects/santescolaire-project-presentation-fr.pdf',
    tags: ['presentation', 'sante scolaire', 'rbac', 'pdf', 'document'],
    source: 'src/data/project-details.ts (sante-scolaire.documents)',
  };

  // 10. SKILLS (Core inventory)
  for (const sk of SKILLS) {
    docs[`skill-${sk.id}`] = {
      id: `skill-${sk.id}`,
      category: 'skill',
      title: {
        fr: `${sk.name} (${sk.category})`,
        en: `${sk.name} (${sk.category})`,
      },
      summary: {
        fr: `Compétence ${sk.isTopSkill ? 'clé' : 'complémentaire'} démontrée dans les projets : ${sk.projectSlugs.join(', ')}.`,
        en: `${sk.isTopSkill ? 'Primary' : 'Complementary'} skill demonstrated in projects: ${sk.projectSlugs.join(', ')}.`,
      },
      facts: {
        fr: [
          `Compétence : ${sk.name}.`,
          `Catégorie : ${sk.category}.`,
          `Niveau dans le profil : ${sk.isTopSkill ? 'Compétence principale (Top skill)' : 'Compétence pratiquée'}.`,
          `Projets documentés démontrant cette compétence : ${sk.projectSlugs.join(', ')}.`,
        ],
        en: [
          `Skill: ${sk.name}.`,
          `Category: ${sk.category}.`,
          `Profile status: ${sk.isTopSkill ? 'Top skill' : 'Practiced skill'}.`,
          `Documented projects demonstrating this skill: ${sk.projectSlugs.join(', ')}.`,
        ],
      },
      href: `/projects`,
      tags: ['competence', 'skill', sk.id, sk.name.toLowerCase(), sk.category.toLowerCase()],
      source: 'src/data/skills.ts',
    };
  }

  return docs;
}

export const KNOWLEDGE_CORPUS = buildAuthoritativeCorpus();

export function getAllKnowledgeDocuments(): KnowledgeDocument[] {
  return Object.values(KNOWLEDGE_CORPUS);
}

export function getKnowledgeDocumentById(id: string): KnowledgeDocument | undefined {
  return KNOWLEDGE_CORPUS[id];
}

export function getKnowledgeDocumentsByCategory(category: KnowledgeCategory): KnowledgeDocument[] {
  return Object.values(KNOWLEDGE_CORPUS).filter((doc) => doc.category === category);
}

/**
 * Builds a compact, high-signal prompt context for Cloudflare Workers AI.
 * Only authoritative facts are included.
 */
export function buildPromptKnowledgeContext(locale: 'fr' | 'en'): string {
  const lines: string[] = [
    `AUTHORITATIVE PORTFOLIO KNOWLEDGE BASE (${locale.toUpperCase()}):`,
    `Owner: ${PROFILE.name} (${PROFILE.title}, ${PROFILE.badge})`,
    `Philosophy: ${PROFILE.corePhilosophy} | Tagline: ${PROFILE.tagline}`,
    '',
    'VERIFIED KNOWLEDGE DOCUMENTS:',
  ];

  for (const doc of Object.values(KNOWLEDGE_CORPUS)) {
    // Only pass major documents to prompt to keep it compact and ultra fast
    if (doc.category === 'skill' && !doc.id.includes('python') && !doc.id.includes('sql') && !doc.id.includes('pandas') && !doc.id.includes('flask')) {
      continue;
    }

    lines.push(`- DOC_ID: "${doc.id}" [Category: ${doc.category}]`);
    lines.push(`  Title: ${doc.title[locale]}`);
    lines.push(`  Facts:`);
    const isPneumoniaProject = doc.id === 'proj-pneumonia-detection';
    const facts = isPneumoniaProject || doc.category === 'certification'
      ? doc.facts[locale]
      : doc.facts[locale].slice(0, 4);
    for (const fact of facts) {
      lines.push(`    * ${fact}`);
    }
    if (doc.proofs && doc.proofs[locale].length > 0) {
      lines.push(`  Proofs:`);
      const proofs = isPneumoniaProject
        ? doc.proofs[locale]
        : doc.proofs[locale].slice(0, 3);
      for (const proof of proofs) {
        lines.push(`    + ${proof}`);
      }
    }
    if (doc.limitations && doc.limitations[locale].length > 0) {
      lines.push(`  Limitations:`);
      const limitations = isPneumoniaProject
        ? doc.limitations[locale]
        : doc.limitations[locale].slice(0, 2);
      for (const lim of limitations) {
        lines.push(`    ! ${lim}`);
      }
    }
  }

  lines.push('');
  lines.push('GROWING FIELDS (ACTIVE LEARNING IN PROGRESS, NOT PRODUCTION-DEPLOYED):');
  lines.push('- Data Engineering: Primary growth area. Active training via ENSA Khouribga and DataCamp 1-year scholarship.');
  lines.push('- Machine Learning & Deep Learning: Academic foundations at ENSA Khouribga. The portfolio includes an academic predictive classification experiment (Pneumonia Detection) and exploratory factorial analyses (PCA in the ACP project and GTM, CA in AFC); none is presented as a production-deployed medical system.');
  lines.push('- Data Science: Data preparation and exploratory statistics (Olist, ACP, AFC). Advanced predictive modeling is currently in acquisition.');

  return lines.join('\n');
}

/**
 * Formats a KnowledgeDocument into a client-safe RelatedKnowledgeItem.
 */
export function documentToRelatedItem(doc: KnowledgeDocument, locale: 'fr' | 'en'): RelatedKnowledgeItem {
  return {
    id: doc.id,
    category: doc.category,
    title: doc.title[locale],
    summary: doc.summary[locale],
    verifiedFacts: doc.facts[locale],
    verifiedProofs: doc.proofs ? doc.proofs[locale] : undefined,
    limitations: doc.limitations ? doc.limitations[locale] : undefined,
    href: doc.href,
  };
}
