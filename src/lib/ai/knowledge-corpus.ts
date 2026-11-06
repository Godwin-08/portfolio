import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { PROJECT_DETAIL_COPY } from '@/data/project-details';
import type { ProjectDetailCopy } from '@/data/project-details';
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
        `Domaine principal recherché : Data Analytics & BI, avec une orientation Analytics Engineering.`,
        `Ouverture complémentaire : opportunités en Data Engineering.`,
        `Objectif : contribuer à un projet concret en entreprise tout en approfondissant les acquis techniques.`,
        `Moyen de contact privilégié pour un stage : ${PROFILE.contact.email}.`,
      ],
      en: [
        `Availability: internship starting July 2027 (${PROFILE.badge}).`,
        `Primary target: Data Analytics & BI, with an Analytics Engineering orientation.`,
        `Also open to Data Engineering opportunities.`,
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
    tags: ['stage', 'pfa', 'data analytics', 'business intelligence', 'analytics engineering', 'data engineering', 'disponibilite', 'juillet 2027', 'recherche', 'recrutement', 'internship', 'availability'],
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
    const evidenceType =
      cert.credentialType === 'certification'
        ? { fr: 'Certification d’examen', en: 'Exam certification' }
        : cert.credentialType === 'track'
          ? { fr: 'Parcours', en: 'Learning path' }
          : { fr: 'Cours', en: 'Course' };
    const evidence = cert.documentPath
      ? `Preuve documentaire : ${cert.documentPath.endsWith('.pdf') ? 'document PDF' : 'image officielle'} accessible sur le portfolio à l’adresse ${cert.documentPath}.`
      : 'Aucune copie du certificat n’est hébergée sur le portfolio.';
    const evidenceEn = cert.documentPath
      ? `Documentary evidence: official ${cert.documentPath.endsWith('.pdf') ? 'PDF' : 'image'} document available on the portfolio at ${cert.documentPath}.`
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
          ? cert.credentialType === 'certification'
            ? `Certification DataCamp délivrée le ${cert.completedOn}.`
            : `${evidenceType.fr} DataCamp terminé le ${cert.completedOn}.`
          : `${evidenceType.fr} DataCamp documenté dans le portfolio.`,
        en: cert.completedOn
          ? cert.credentialType === 'certification'
            ? `DataCamp certification issued on ${cert.completedOn}.`
            : `${evidenceType.en} completed on ${cert.completedOn}.`
          : `${evidenceType.en} documented in the portfolio.`,
      },
      facts: {
        fr: [
          `${cert.credentialType === 'certification' ? 'Intitulé de la certification' : 'Intitulé de la formation'} : ${cert.title}.`,
          `Type de preuve : ${evidenceType.fr}.`,
          cert.credentialType === 'certification'
            ? 'Organisme certificateur : DataCamp.'
            : 'Organisme formateur : DataCamp (plateforme d’apprentissage spécialisée dans la data).',
          ...(cert.completedOn
            ? [
                cert.credentialType === 'certification'
                  ? `Date de certification : ${cert.completedOn}.`
                  : `Date d’achèvement : ${cert.completedOn}.`,
              ]
            : []),
          ...(cert.expiresOn
            ? [`Date d’expiration de la certification : ${cert.expiresOn}.`]
            : []),
          ...(cert.reference
            ? [`Numéro de référence officiel du certificat : #${cert.reference}.`]
            : []),
          cert.credentialType === 'certification'
            ? `Domaines évalués selon DataCamp (liste non exhaustive) : ${cert.content.fr.assessedDomains?.map((domain) => `${domain.title} : ${domain.description}${domain.assessment ? ` Évaluation : ${domain.assessment}` : ''}`).join(' ')}`
            : `Notions recensées dans la fiche : ${cert.content.fr.topics.join('; ')}.`,
          `Mise en pratique décrite : ${cert.content.fr.practice}`,
          evidence,
          cert.verificationUrl
            ? `Lien officiel de vérification DataCamp : ${cert.verificationUrl}`
            : cert.documentPath
              ? 'Certificat vérifiable via le document officiel téléchargeable.'
              : 'Aucun document ou lien officiel de vérification n’est renseigné.',
        ],
        en: [
          `${cert.credentialType === 'certification' ? 'Certification title' : 'Learning title'}: ${cert.title}.`,
          `Evidence type: ${evidenceType.en}.`,
          cert.credentialType === 'certification'
            ? 'Certifying organization: DataCamp.'
            : 'Issuing organization: DataCamp (specialized data learning platform).',
          ...(cert.completedOn
            ? [
                cert.credentialType === 'certification'
                  ? `Certification date: ${cert.completedOn}.`
                  : `Completion date: ${cert.completedOn}.`,
              ]
            : []),
          ...(cert.expiresOn
            ? [`Certification expiration date: ${cert.expiresOn}.`]
            : []),
          ...(cert.reference
            ? [`Official certificate reference: #${cert.reference}.`]
            : []),
          cert.credentialType === 'certification'
            ? `Competency domains assessed according to DataCamp (not exhaustive): ${cert.content.en.assessedDomains?.map((domain) => `${domain.title}: ${domain.description}${domain.assessment ? ` Assessment: ${domain.assessment}` : ''}`).join(' ')}`
            : `Topics listed in the course summary: ${cert.content.en.topics.join('; ')}.`,
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
          cert.credentialType === 'certification'
            ? 'Cette certification atteste la réussite aux évaluations DataCamp dans les domaines indiqués ; elle ne garantit pas à elle seule une expérience professionnelle.'
            : cert.credentialType === 'track'
              ? 'Cette attestation documente l’achèvement d’un parcours, pas une certification d’examen ni une évaluation indépendante du niveau professionnel.'
              : 'Cette fiche documente un cours terminé et ne constitue pas une évaluation indépendante du niveau professionnel.',
          cert.credentialType === 'certification'
            ? 'Les domaines évalués comprennent la gestion des données, l’analyse exploratoire, l’expérimentation statistique, ainsi que la communication et la visualisation.'
            : `Cette formation porte sur ${isPostgres ? 'PostgreSQL' : cert.title.includes('Statistics') ? 'les statistiques' : 'le langage SQL'} et complète les projets pratiques, qui restent les preuves maîtresses des compétences de Godwin.`,
        ],
        en: [
          cert.credentialType === 'certification'
            ? 'This certification records passing DataCamp assessments in the listed competency areas; it does not by itself guarantee professional experience.'
            : cert.credentialType === 'track'
              ? 'This record documents completion of a learning path, not an exam certification or an independent assessment of professional proficiency.'
              : 'This record documents a completed course and is not an independent assessment of professional proficiency.',
          cert.credentialType === 'certification'
            ? 'The assessed domains include data management, exploratory analysis, statistical experimentation, and communication and visualization.'
            : `This course focuses on ${isPostgres ? 'PostgreSQL' : cert.title.includes('Statistics') ? 'statistics' : 'SQL'} and complements applied projects, which remain the primary evidence of Godwin’s skills.`,
        ],
      },
      href: cert.verificationUrl || cert.documentPath,
      tags: [
        'certification',
        'certificat',
        'datacamp',
        'sql',
        'postgresql',
        cert.title.toLowerCase(),
        ...(cert.credentialType === 'certification'
          ? ['data analyst associate', 'analyst associate', 'data analyst certification']
          : []),
      ],
      source: 'src/data/certifications.ts',
    };
  }

  // 8. PROJECTS & CASE STUDIES
  for (const p of PROJECTS) {
    const detail = PROJECT_DETAIL_COPY[p.id as keyof typeof PROJECT_DETAIL_COPY] as
      | { fr?: ProjectDetailCopy; en?: ProjectDetailCopy }
      | undefined;
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

    if (frDetail && enDetail) {
      for (const [detail, facts] of [
        [frDetail, frFacts],
        [enDetail, enFacts],
      ] as const) {
        if (detail.featuredFinding) facts.push(detail.featuredFinding);
        if (detail.dataTitle) facts.push(detail.dataTitle);
        if (detail.dataConstruction) facts.push(detail.dataConstruction);
        if (detail.methodTitle) facts.push(detail.methodTitle);
        if (detail.resultsIntro) facts.push(detail.resultsIntro);

        if (p.id !== 'pneumonia-detection') {
          facts.push(detail.methodIntro);
          facts.push(
            ...detail.methodSteps.map((step) => `${step.title}: ${step.description}`)
          );
          if (detail.architecture) {
            facts.push(`${detail.architecture.title}: ${detail.architecture.introduction}`);
            facts.push(
              ...detail.architecture.layers.map(
                (layer) => `${layer.title}: ${layer.description}`
              )
            );
          }
          if (detail.keyDecisions) {
            facts.push(
              ...detail.keyDecisions.items.map(
                (item) => `${item.title}: ${item.description}`
              )
            );
          }
          if (detail.conclusion) facts.push(detail.conclusion.description);

          if (detail.olistAnalysis) {
            const analysis = detail.olistAnalysis;
            facts.push(`${analysis.dataModel.title}: ${analysis.dataModel.introduction}`);
            facts.push(`${analysis.preparation.title}: ${analysis.preparation.introduction}`);
            facts.push(
              ...analysis.preparation.steps.map(
                (step) => `${step.title} (${step.value}): ${step.description}`
              )
            );
            facts.push(analysis.preparation.conclusion);
            for (const section of [
              analysis.delivery,
              analysis.satisfaction,
              analysis.financial,
            ]) {
              facts.push(`${section.title}: ${section.introduction}`);
              if ('metrics' in section) {
                facts.push(
                  ...section.metrics.map(
                    (metric) => `${metric.label} (${metric.value}): ${metric.detail}`
                  )
                );
              }
              if ('indicators' in section) {
                facts.push(
                  ...section.indicators.map(
                    (indicator) =>
                      `${indicator.label} (${indicator.value}): ${indicator.detail}`
                  )
                );
                facts.push(section.note);
              }
            }
          }
        }

        facts.push(`Contribution: ${detail.contribution}`);
        facts.push(`Technologies: ${detail.technologies.join(', ')}`);
        facts.push(
          ...detail.results.map(
            (result) => `${result.label} (${result.value}): ${result.detail}`
          )
        );
        if (detail.repository) facts.push(`Repository: ${detail.repository}`);
        facts.push(
          ...(detail.documents ?? []).map(
            (document) => `Public document: ${document.label} (${document.href})`
          )
        );
        facts.push(
          ...(detail.collaborators ?? []).map(
            (person) => `Project collaborator: ${person.name}, ${person.role}.`
          )
        );
        facts.push(
          ...(detail.supervisors ?? []).map(
            (person) => `Project supervisor: ${person.name}, ${person.role}.`
          )
        );
        facts.push(
          ...detail.gallery.map((image) =>
            [
              `Gallery item "${image.title}": ${image.caption}`,
              image.analysis?.question && `Question: ${image.analysis.question}`,
              image.analysis?.reading && `Reading: ${image.analysis.reading}`,
              image.analysis?.observation && `Observation: ${image.analysis.observation}`,
              image.analysis?.interpretation &&
                `Interpretation: ${image.analysis.interpretation}`,
              image.analysis?.businessInterest &&
                `Business relevance: ${image.analysis.businessInterest}`,
              image.analysis?.limitation && `Scope: ${image.analysis.limitation}`,
            ]
              .filter((fact): fact is string => Boolean(fact))
              .join(' ')
          )
        );
      }
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
        'Le rapport présente GTM, développé chez Galaxy Solutions pour centraliser la gestion des formations professionnelles et faciliter le pilotage de l’activité.',
        'Le périmètre couvre trois domaines de formation : Web & Data, Management Agile et Cybersécurité.',
        'L’application associe Flask, SQLAlchemy et MySQL à une interface Jinja2, Tailwind CSS et Alpine.js. Les rôles Admin, Gestionnaire et Formateur sont contrôlés côté serveur.',
        'Le rapport décrit trois volets : gestion opérationnelle, analyse par tableau de bord et graphiques filtrables, puis aide à la décision avec alertes et ACP des profils clients.',
        'Les exports sont générés en CSV, Excel et PDF. Le rapport documente 166 tests automatisés réussis.',
        'Le résumé du rapport mentionne une relecture finale portant sur la sécurité des accès, les seuils d’alerte et la fiabilisation de l’application.',
        'L’ACP exploratoire du jeu de démonstration porte sur 30 clients, 12 formations et 484 inscriptions confirmées. Les deux premiers axes expliquent 18,5 % et 15,8 % de l’inertie, soit 34,3 % au total; cette analyse ne vise pas à prévoir les inscriptions futures.',
        'Le rapport recense 166 tests Pytest répartis dans 22 fichiers, avec 100 % de réussite. Ils couvrent notamment l’authentification, les permissions RBAC, les règles métier, les imports/exports et les calculs d’ACP.',
      ],
      en: [
        'Title: Internship report in French (PDF).',
        'Public access path: /documents/projects/gtm-internship-report-fr.pdf.',
        'Language: French.',
        'The report presents GTM, developed at Galaxy Solutions to centralize professional training management and support operational oversight.',
        'Its scope covers three training areas: Web & Data, Agile Management, and Cybersecurity.',
        'The application combines Flask, SQLAlchemy, and MySQL with a Jinja2, Tailwind CSS, and Alpine.js interface. Admin, Manager, and Trainer roles are checked server-side.',
        'The report describes three areas: operational management, dashboard analysis with filterable charts, and decision support through alerts and PCA of client profiles.',
        'CSV, Excel, and PDF exports are available. The report documents 166 successful automated tests.',
        'The report summary mentions a final review of access security, alert thresholds, and application reliability.',
        'The exploratory PCA on the demo dataset covers 30 clients, 12 courses, and 484 confirmed registrations. Its first two axes explain 18.5% and 15.8% of inertia (34.3% combined); the analysis is not intended to forecast future registrations.',
        'The report lists 166 Pytest tests across 22 files, with a 100% pass rate. Coverage includes authentication, RBAC permissions, business rules, imports/exports, and PCA calculations.',
      ],
    },
    href: '/documents/projects/gtm-internship-report-fr.pdf',
    tags: ['rapport', 'stage', 'gtm', 'galaxy solutions', 'pdf', 'document'],
    source: 'public/documents/projects/gtm-internship-report-fr.pdf',
  };

  docs['doc-olist-report'] = {
    id: 'doc-olist-report',
    category: 'document',
    title: {
      fr: 'Rapport d’analyse de données Olist (PDF)',
      en: 'Olist Data Analysis Report (PDF)',
    },
    summary: {
      fr: 'Rapport de projet en français analysant le jeu public Brazilian E-Commerce by Olist et 96 252 commandes livrées entre 2016 et 2018.',
      en: 'French-language project report analyzing the public Brazilian E-Commerce by Olist dataset and 96,252 delivered orders from 2016 to 2018.',
    },
    facts: {
      fr: [
        'Document : rapport PDF en français, réalisé par Godwin Elie Nougbolo et Maktou Azeddine dans le module Traitement de Données de la filière IID1 à l’ENSA Khouribga, année universitaire 2025–2026.',
        'Chemin d’accès public : /documents/projects/olist-report-fr.pdf.',
        'Source et périmètre : Brazilian E-Commerce Public Dataset by Olist (Kaggle), neuf tables couvrant septembre 2016 à août 2018.',
        'Préparation : après nettoyage et six jointures, la table finale contient 96 252 commandes livrées et 30 colonnes. Aucune ligne n’a été perdue lors des jointures; 61 lignes avec des dates incohérentes ont été supprimées.',
        'Détail du filtrage décrit dans le rapport : 99 441 commandes initiales, 166 anomalies chronologiques retirées, puis 96 313 commandes livrées; 61 dates incohérentes supplémentaires sont exclues pour obtenir les 96 252 commandes finales.',
        'Indicateurs globaux rapportés : chiffre d’affaires de 13 195 594 BRL, panier moyen de 159,88 BRL, panier médian de 105,28 BRL, note moyenne de 4,16/5, taux de retard de 6,8 % et délai moyen de livraison de 12,1 jours.',
        'Satisfaction : la note moyenne rapportée est de 4,29/5 pour les commandes livrées à temps et de 2,27/5 pour celles livrées en retard. Il s’agit d’une association observée dans les données, pas d’une preuve causale.',
        'Logistique : les commandes entre états présentent un taux de retard de 8,1 % et un délai moyen de 14,7 jours, contre 4,5 % et 7,5 jours pour les commandes au sein d’un même état. La distance est approximée par la comparaison des états, pas calculée à partir des coordonnées GPS.',
        'Autres analyses : évolution et répartition du chiffre d’affaires, satisfaction, délais logistiques, scores de vendeurs et catégories de produits; le rapport formule aussi des recommandations et des indicateurs de suivi.',
        'Périmètre des résultats : seuls les commandes livrées sont analysées. Le jeu ne documente pas les marges ni les coûts, les distances sont approximées et les conclusions décrivent des associations sur la période 2016–2018.',
      ],
      en: [
        'Document: French-language PDF report by Godwin Elie Nougbolo and Maktou Azeddine for the Data Processing course in the IID1 program at ENSA Khouribga, academic year 2025–2026.',
        'Public access path: /documents/projects/olist-report-fr.pdf.',
        'Source and scope: Brazilian E-Commerce Public Dataset by Olist (Kaggle), nine tables covering September 2016 to August 2018.',
        'Preparation: after cleaning and six joins, the final table contains 96,252 delivered orders and 30 columns. No rows were lost during the joins; 61 rows with inconsistent dates were removed.',
        'Filtering detail in the report: 99,441 initial orders, 166 chronological anomalies removed, then 96,313 delivered orders; 61 additional inconsistent dates are excluded to reach the final 96,252 orders.',
        'Reported overall indicators: BRL 13,195,594 revenue, BRL 159.88 average order value, BRL 105.28 median order value, 4.16/5 average rating, 6.8% late-delivery rate, and 12.1-day average delivery time.',
        'Satisfaction: the reported average rating is 4.29/5 for on-time orders and 2.27/5 for late orders. This is an observed association in the data, not proof of causation.',
        'Logistics: cross-state orders have an 8.1% late-delivery rate and 14.7-day average delivery time, compared with 4.5% and 7.5 days for orders within one state. Distance is approximated by comparing states, not calculated from GPS coordinates.',
        'Other analyses cover revenue trends and distribution, customer satisfaction, delivery times, seller scores, and product categories; the report also proposes recommendations and monitoring indicators.',
        'Scope of findings: only delivered orders are analyzed. The dataset does not document margins or costs, distances are approximate, and findings describe associations over the 2016–2018 period.',
      ],
    },
    href: '/documents/projects/olist-report-fr.pdf',
    tags: [
      'rapport',
      'report',
      'olist',
      'brasile',
      'brazilian ecommerce',
      'e-commerce',
      'marketplace',
      'livraison',
      'satisfaction',
      'logistique',
      'pdf',
      'document',
    ],
    source: 'public/documents/projects/olist-report-fr.pdf',
  };

  docs['doc-afc-presentation'] = {
    id: 'doc-afc-presentation',
    category: 'document',
    title: {
      fr: 'Présentation méthodologique AFC (PDF)',
      en: 'CA Methodology Presentation (PDF)',
    },
    summary: {
      fr: 'Support pédagogique expliquant les étapes de l’Analyse Factorielle des Correspondances à partir d’un exemple détaillé.',
      en: 'Teaching presentation explaining the steps of Correspondence Analysis through a worked example.',
    },
    facts: {
      fr: [
        'Intitulé : Présentation méthodologique en français (PDF).',
        'Chemin d’accès public : /documents/projects/afc-methodology-presentation-fr.pdf.',
        'Langue : Français.',
        'Le support présente les étapes d’une AFC : tableau de contingence, fréquences et profils, test du chi-deux, inertie, décomposition en valeurs propres, coordonnées factorielles, biplot et cos².',
        'Son exemple pédagogique croise trois catégories de personnes (étudiants, salariés, retraités) et trois loisirs (sport, cinéma, lecture), pour un total de 300 observations.',
        'Dans cet exemple, le support rapporte χ² = 74,48 et une inertie totale de 0,248; les deux axes affichés expliquent respectivement 63 % et 37 % de l’inertie.',
        'Ces nombres illustrent la méthode dans le support et ne sont pas présentés comme des résultats de l’étude AFC sur les offres LinkedIn.',
        'Le support explique que le cos² évalue la qualité de représentation des modalités sur les axes affichés et aide à éviter de surinterpréter un point mal représenté.',
      ],
      en: [
        'Title: Methodology presentation in French (PDF).',
        'Public access path: /documents/projects/afc-methodology-presentation-fr.pdf.',
        'Language: French.',
        'The slides explain the CA workflow: contingency table, frequencies and profiles, chi-square test, inertia, eigenvalue decomposition, factor coordinates, biplot, and cos².',
        'Their teaching example crosses three population groups (students, employees, retirees) with three leisure activities (sports, cinema, reading), for 300 observations.',
        'For this example, the slides report χ² = 74.48 and total inertia of 0.248; the two displayed axes explain 63% and 37% of inertia, respectively.',
        'These figures illustrate the method in the slides; they are not presented as results from the LinkedIn job-post CA study.',
        'The slides explain that cos² measures how well categories are represented on the displayed axes and helps avoid overinterpreting poorly represented points.',
      ],
    },
    href: '/documents/projects/afc-methodology-presentation-fr.pdf',
    tags: ['presentation', 'afc', 'statistiques', 'methodologie', 'pdf', 'document'],
    source: 'public/documents/projects/afc-methodology-presentation-fr.pdf',
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
        'Le rapport décrit un planificateur de révisions qui calcule une priorité à partir de la difficulté, du nombre de chapitres et du temps restant avant l’examen, avec une pondération logarithmique de l’urgence.',
        'La formule documentée est Pᵢ = (difficultéᵢ × chapitresᵢ) × (1 + 1 / ln(Δtᵢ + 2)), où Δtᵢ désigne le nombre de jours avant l’examen.',
        'Pour alterner les matières, le score d’un module déjà planifié k fois dans la journée est divisé par 2^k; l’exemple du rapport produit l’ordre A, B, A, B.',
        'Lors d’un recalcul, les journées passées sont conservées et seules les journées futures sont régénérées. Les sessions impossibles à placer restent dans un backlog signalé à l’étudiant.',
        'La pile présentée comprend HTML5, CSS3 et JavaScript ES6+, avec une architecture modulaire et un Store comme source unique de l’état.',
        'Le rapport décrit une persistance locale via localStorage, une récupération des jours fériés via Nager.Date et un minuteur Pomodoro utilisant Web Audio API.',
        'Selon sa conclusion, l’application fonctionne sans serveur ni inscription et conserve les données localement dans le navigateur.',
      ],
      en: [
        'Title: Full RevisionFlow technical report (PDF).',
        'Public access path: /documents/projects/revisionflow-report-fr.pdf.',
        'Language: French.',
        'The report describes a revision planner that scores priorities using difficulty, chapter count, and time until the exam, with a logarithmic urgency factor.',
        'The documented formula is Pᵢ = (difficultyᵢ × chaptersᵢ) × (1 + 1 / ln(Δtᵢ + 2)), where Δtᵢ is the number of days until the exam.',
        'To alternate subjects, a module’s score is divided by 2^k after it has already been scheduled k times that day; the report’s example produces A, B, A, B.',
        'When the plan is recalculated, past days are preserved and only future days are regenerated. Sessions that cannot fit remain in a backlog shown to the student.',
        'The documented stack includes HTML5, CSS3, and JavaScript ES6+, with a modular architecture and a Store as the single source of state.',
        'The report describes localStorage persistence, public-holiday retrieval through Nager.Date, and a Pomodoro timer using the Web Audio API.',
        'Its conclusion states that the application runs without a server or sign-up and keeps data locally in the browser.',
      ],
    },
    href: '/documents/projects/revisionflow-report-fr.pdf',
    tags: ['rapport', 'revisionflow', 'algorithme', 'pdf', 'document'],
    source: 'public/documents/projects/revisionflow-report-fr.pdf',
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
        'Le support présente un système centralisé pour gérer les dossiers médicaux des élèves, les consultations, les prescriptions et les rendez-vous.',
        'Les acteurs décrits sont les élèves, les médecins, les infirmiers et un responsable administratif. Ce dernier gère les comptes et les statistiques globales sans accès aux dossiers médicaux.',
        'La démarche présentée passe par l’analyse des besoins et la modélisation Merise (MCD, MCT et MLD), puis par la conception de la base MySQL.',
        'Le modèle logique présenté distingue six entités : élève, médecin, infirmier, consultation, prescription et rendez-vous, reliées par des identifiants et des clés étrangères.',
        'Le parcours schématisé va de l’arrivée de l’élève et la vérification de son dossier à la consultation, la prescription éventuelle et la mise à jour du rendez-vous.',
        'La conclusion du support met en avant le suivi individualisé des visites, l’historique des élèves et prescriptions, ainsi que l’intégrité par clés étrangères.',
      ],
      en: [
        'Title: SantéScolaire project presentation in French (PDF).',
        'Public access path: /documents/projects/santescolaire-project-presentation-fr.pdf.',
        'Language: French.',
        'The slides present a centralized system for managing student medical records, consultations, prescriptions, and appointments.',
        'The actors are students, doctors, nurses, and an administrative manager. The manager handles accounts and aggregate statistics without access to medical records.',
        'The documented process covers requirements analysis and Merise modeling (conceptual data, process, and logical models), followed by MySQL database design.',
        'The logical model presents six entities: student, doctor, nurse, consultation, prescription, and appointment, linked through identifiers and foreign keys.',
        'The illustrated workflow runs from a student arriving and their record being checked through consultation, any prescription, and appointment-status updates.',
        'The presentation concludes with individual visit tracking, student and prescription history, and referential integrity through foreign keys.',
      ],
    },
    href: '/documents/projects/santescolaire-project-presentation-fr.pdf',
    tags: ['presentation', 'sante scolaire', 'rbac', 'pdf', 'document'],
    source: 'public/documents/projects/santescolaire-project-presentation-fr.pdf',
  };

  docs['doc-pneumonia-report'] = {
    id: 'doc-pneumonia-report',
    category: 'document',
    title: {
      fr: 'Rapport technique Pneumonia Detection (PDF)',
      en: 'Pneumonia Detection Technical Report (PDF)',
    },
    summary: {
      fr: 'Rapport académique en français sur la comparaison d’un CNN construit pour le projet et de DenseNet121 pour classifier des radiographies thoraciques.',
      en: 'French-language academic report comparing a project-built CNN and DenseNet121 for chest X-ray classification.',
    },
    facts: {
      fr: [
        'Document : rapport technique en français consacré au projet académique Pneumonia Detection.',
        'Chemin d’accès public : /documents/projects/pneumonia-report-fr.pdf.',
        'Le rapport décrit un CNN construit de zéro et une approche DenseNet121 pré-entraînée sur ImageNet, ainsi qu’une interface de démonstration Streamlit.',
        'Le rapport et les notebooks sauvegardés sont des sources distinctes : les métriques détaillées présentées par l’assistant proviennent des sorties de notebooks indexées dans la fiche du projet.',
        'Résumé du rapport, valeurs arrondies sur le jeu de test de 624 images : le CNN affiche 81 % d’accuracy, un F1 PNEUMONIA de 0,84 et un rappel de 0,81; DenseNet121 en Feature Extraction affiche respectivement 88,9 %, 0,91 et 0,92. Les sorties exactes des notebooks sont indexées séparément dans la fiche projet.',
        'Le rapport indique que le fine-tuning DenseNet121 n’améliore pas les valeurs résumées de Feature Extraction; les deux configurations utilisent toutefois des seuils différents (0,9 et 0,8).',
      ],
      en: [
        'Document: French-language technical report about the academic Pneumonia Detection project.',
        'Public access path: /documents/projects/pneumonia-report-fr.pdf.',
        'The report describes a CNN built from scratch, a DenseNet121 approach pre-trained on ImageNet, and a Streamlit demonstration interface.',
        'The report and saved notebooks are separate sources: the detailed metrics presented by the assistant come from notebook outputs indexed in the project record.',
        'Report summary, rounded values on the 624-image test set: the CNN shows 81% accuracy, a PNEUMONIA F1 of 0.84, and recall of 0.81; DenseNet121 Feature Extraction reports 88.9%, 0.91, and 0.92, respectively. Exact notebook outputs are indexed separately in the project record.',
        'The report says DenseNet121 fine-tuning does not improve the summarized Feature Extraction values; the two configurations nevertheless use different thresholds (0.9 and 0.8).',
      ],
    },
    href: '/documents/projects/pneumonia-report-fr.pdf',
    tags: [
      'rapport',
      'report',
      'pneumonia',
      'pneumonie',
      'radiographie',
      'x-ray',
      'densenet121',
      'pdf',
      'document',
    ],
    source: 'public/documents/projects/pneumonia-report-fr.pdf',
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

const MAX_SCOPED_PROMPT_CONTEXT_CHARS = 24_000;
const PROMPT_QUERY_STOP_WORDS = new Set([
  'an', 'and', 'are', 'as', 'at', 'be', 'can', 'describe', 'does', 'for', 'from',
  'how', 'in', 'is', 'it', 'of', 'on', 'or', 'tell', 'the', 'to', 'what',
  'which', 'who', 'with', 'your',
  'aux', 'avec', 'comment', 'dans', 'des', 'est', 'et', 'les', 'mon', 'pour',
  'projet', 'projets', 'project', 'projects', 'portfolio', 'quelle', 'quelles',
  'quels', 'quel', 'que', 'qui', 'sur',
]);

function normalizePromptSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsPromptSearchTerm(text: string, term: string): boolean {
  return ` ${normalizePromptSearchText(text)} `.includes(` ${term} `);
}

export function getRelevantKnowledgeDocumentIds(
  query: string,
  maxDocuments = 6
): string[] {
  const terms = normalizePromptSearchText(query)
    .split(' ')
    .filter((term) => term.length >= 3 && !PROMPT_QUERY_STOP_WORDS.has(term));

  if (terms.length === 0) return [];

  return Object.values(KNOWLEDGE_CORPUS)
    .map((document, order) => {
      const title = `${document.title.fr} ${document.title.en}`;
      const summary = `${document.summary.fr} ${document.summary.en}`;
      const tags = document.tags.join(' ');
      const facts = [...document.facts.fr, ...document.facts.en].join(' ');
      const score = terms.reduce(
        (total, term) =>
          total +
          (containsPromptSearchTerm(tags, term) ? 5 : 0) +
          (containsPromptSearchTerm(title, term) ? 4 : 0) +
          (containsPromptSearchTerm(summary, term) ? 2 : 0) +
          (containsPromptSearchTerm(facts, term) ? 1 : 0),
        0
      );
      return { id: document.id, score, order };
    })
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score || left.order - right.order)
    .slice(0, maxDocuments)
    .map((document) => document.id);
}

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
 * Builds the complete verified portfolio context for Cloudflare Workers AI.
 * Only authoritative facts are included.
 */
export function buildPromptKnowledgeContext(
  locale: 'fr' | 'en',
  documentIds?: readonly string[]
): string {
  const lines: string[] = [
    `AUTHORITATIVE PORTFOLIO KNOWLEDGE BASE (${locale.toUpperCase()}):`,
    `Owner: ${PROFILE.name} (${PROFILE.title}, ${PROFILE.badge})`,
    `Philosophy: ${PROFILE.corePhilosophy} | Tagline: ${PROFILE.tagline}`,
    '',
    'VERIFIED KNOWLEDGE DOCUMENTS:',
  ];

  const documents =
    documentIds === undefined
      ? Object.values(KNOWLEDGE_CORPUS)
      : [...new Set(['profile-identity', ...documentIds])]
          .map((id) => KNOWLEDGE_CORPUS[id])
          .filter((document): document is KnowledgeDocument => Boolean(document));
  const maxDocumentContextChars =
    documentIds === undefined ? Number.POSITIVE_INFINITY : MAX_SCOPED_PROMPT_CONTEXT_CHARS - 2_000;
  let documentContextChars = lines.join('\n').length + 1;
  let contextLimitReached = false;

  for (const doc of documents) {
    const documentLines = [
      `- DOC_ID: "${doc.id}" [Category: ${doc.category}]`,
      `  Title: ${doc.title[locale]}`,
      '  Facts:',
      ...doc.facts[locale].map((fact) => `    * ${fact}`),
    ];
    if (doc.proofs && doc.proofs[locale].length > 0) {
      documentLines.push('  Proofs:', ...doc.proofs[locale].map((proof) => `    + ${proof}`));
    }
    if (doc.limitations && doc.limitations[locale].length > 0) {
      documentLines.push(
        '  Limitations:',
        ...doc.limitations[locale].map((limitation) => `    ! ${limitation}`)
      );
    }

    for (const line of documentLines) {
      const addedChars = line.length + 1;
      if (documentContextChars + addedChars > maxDocumentContextChars) {
        contextLimitReached = true;
        break;
      }
      lines.push(line);
      documentContextChars += addedChars;
    }
    if (contextLimitReached) break;
  }

  if (documentIds !== undefined && documentContextChars >= maxDocumentContextChars) {
    lines.push('Additional matching evidence is available in the portfolio corpus.');
  } else {
    lines.push('');
    lines.push('GROWING FIELDS (ACTIVE LEARNING IN PROGRESS, NOT PRODUCTION-DEPLOYED):');
    lines.push('- Data Analytics & BI: Primary field, with an Analytics Engineering orientation.');
    lines.push('- Data Engineering: An additional area of interest; relevant pipeline and data-processing skills are in development.');
    lines.push('- Machine Learning & Deep Learning: Academic foundations at ENSA Khouribga. The portfolio includes an academic predictive classification experiment (Pneumonia Detection) and exploratory factorial analyses (PCA in the ACP project and GTM, CA in AFC); none is presented as a production-deployed medical system.');
    lines.push('- Data Science: Data preparation and exploratory statistics (Olist, ACP, AFC). Advanced predictive modeling is currently in acquisition.');
  }

  if (documentIds !== undefined && lines.join('\n').length > MAX_SCOPED_PROMPT_CONTEXT_CHARS) {
    throw new Error('Scoped AI knowledge context exceeded its configured character budget.');
  }

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
