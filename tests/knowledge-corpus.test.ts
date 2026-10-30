import { describe, it, expect } from 'vitest';
import { runLocalMatcher } from '@/lib/ai/local-matcher';
import {
  KNOWLEDGE_CORPUS,
  getAllKnowledgeDocuments,
  getKnowledgeDocumentById,
  getKnowledgeDocumentsByCategory,
  buildPromptKnowledgeContext,
} from '@/lib/ai/knowledge-corpus';
import { CERTIFICATIONS } from '@/data/certifications';

describe('Authoritative Knowledge Corpus & Global Assistant Tests', () => {
  describe('1. Knowledge Corpus Structure & Verification', () => {
    it('should index all required knowledge categories without gaps', () => {
      expect(Object.keys(KNOWLEDGE_CORPUS).length).toBeGreaterThanOrEqual(15);
      const engineeringDoc = getKnowledgeDocumentById('edu-engineering');
      expect(engineeringDoc).toBeDefined();
      expect(engineeringDoc?.category).toBe('education');

      const docs = getAllKnowledgeDocuments();
      expect(docs.length).toBeGreaterThanOrEqual(15);

      const categories = new Set(docs.map((d) => d.category));
      expect(categories).toContain('profile');
      expect(categories).toContain('education');
      expect(categories).toContain('experience');
      expect(categories).toContain('association');
      expect(categories).toContain('certification');
      expect(categories).toContain('project');
      expect(categories).toContain('document');
      expect(categories).toContain('skill');
    });

    it('should guarantee bilingual presence (FR/EN) for every knowledge document', () => {
      for (const doc of getAllKnowledgeDocuments()) {
        expect(doc.title.fr).toBeTruthy();
        expect(doc.title.en).toBeTruthy();
        expect(doc.summary.fr).toBeTruthy();
        expect(doc.summary.en).toBeTruthy();
        expect(doc.facts.fr.length).toBeGreaterThan(0);
        expect(doc.facts.en.length).toBeGreaterThan(0);
      }
    });

    it('should index all DataCamp course entries with available metadata and course summaries', () => {
      const certDocs = getKnowledgeDocumentsByCategory('certification');
      expect(certDocs).toHaveLength(CERTIFICATIONS.length);

      for (const cert of certDocs) {
        expect(cert.facts.fr.join(' ')).not.toContain('undefined');
        expect(cert.facts.en.join(' ')).not.toContain('undefined');
        expect(cert.facts.fr.join(' ')).toContain('Notions recensées');
        expect(cert.facts.en.join(' ')).toContain('Topics listed');
        expect(cert.limitations?.fr.join(' ')).toContain('évaluation indépendante');
        expect(cert.source).toBe('src/data/certifications.ts');
      }
    });
  });

  describe('2. Profil et formation', () => {
    it('should answer academic background questions accurately (FR & EN)', () => {
      const resFr = runLocalMatcher('Quel est mon parcours académique ?', 'fr');
      expect(resFr.status).toBe('answer');
      expect(resFr.intent).toBe('education');
      expect(resFr.directAnswer).toContain('ENSA Khouribga');
      expect(resFr.directAnswer).toContain('DEUG');
      expect(resFr.directAnswer).toContain('Baccalauréat');
      expect(resFr.relatedItems?.map((r) => r.id)).toContain('edu-engineering');
      expect(resFr.relatedItems?.map((r) => r.id)).toContain('edu-deug');
      expect(resFr.relatedItems?.map((r) => r.id)).toContain('edu-baccalaureate');

      const resEn = runLocalMatcher('What is your academic background and degrees?', 'en');
      expect(resEn.status).toBe('answer');
      expect(resEn.intent).toBe('education');
      expect(resEn.directAnswer).toContain('ENSA Khouribga');
      expect(resEn.directAnswer).toContain('Ibn Tofaïl');
    });

    it('should state internship availability starting in July 2027', () => {
      const res = runLocalMatcher('Quand commence ma recherche de stage et ma disponibilité ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('internship');
      expect(res.directAnswer).toContain('juillet 2027');
      expect(res.directAnswer).toContain('Data Engineering');
      expect(res.relatedItems?.map((r) => r.id)).toContain('profile-internship');
    });

    it('should explain professional objectives and working methodology', () => {
      const res = runLocalMatcher('Quels sont mes objectifs professionnels et ma méthode ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('profile');
      expect(res.directAnswer).toContain('Comprendre');
      expect(res.directAnswer).toContain('Analyser');
      expect(res.directAnswer).toContain('Construire');
      expect(res.directAnswer).toContain('Preuve > Affirmation');
    });
  });

  describe('3. Compétences & Technologies', () => {
    it('should identify only documented SQL projects in French and English', () => {
      for (const [locale, query] of [
        ['fr', 'Quels projets démontrent mes compétences en SQL ?'],
        ['en', 'Which projects demonstrate my SQL skills?'],
        ['fr', 'NovaStore est-il une preuve de compétences SQL ?'],
        ['en', 'Does NovaStore demonstrate my SQL skills?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('success');
        const projectIds = result.matches.map((match) => match.projectId);
        expect(projectIds).not.toContain('novastore');
        if (query.includes('projets') || query.includes('projects')) {
          expect(projectIds).toContain('gtm');
          expect(projectIds).toContain('sante-scolaire');
        }
      }
    });

    it('should document NovaStore ORM caveat without treating it as SQL evidence', () => {
      const novaStore = getKnowledgeDocumentById('proj-novastore');
      expect(novaStore).toBeDefined();
      expect(novaStore?.facts.fr.find((fact) => fact.startsWith('Technologies principales'))).not.toContain(
        'SQLAlchemy'
      );
      expect(novaStore?.facts.fr.join(' ')).toContain(
        'ne l’utilise pas pour persister les données'
      );
      expect(novaStore?.facts.en.join(' ')).toContain(
        'does not configure the ORM or use it to persist data'
      );
      expect(buildPromptKnowledgeContext('fr')).toContain(
        'La fiche projet mentionne SQLAlchemy, mais le parcours étudié ne configure pas l’ORM'
      );
    });

    it('should enumerate technologies used with Flask without fabricating unverified tools', () => {
      const res = runLocalMatcher('Quelles technologies ai-je utilisées avec Flask ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('skills');
      expect(res.directAnswer).toContain('SQLAlchemy');
      expect(res.directAnswer).toContain('MySQL');
      expect(res.directAnswer).toContain('Jinja2');
      expect(res.directAnswer).toContain('Chart.js');
      expect(res.directAnswer).not.toContain('Django');
      expect(res.directAnswer).not.toContain('FastAPI');
    });

    it('should flag in-progress competencies separately from production skills', () => {
      const res = runLocalMatcher('Quelles compétences sont encore en cours d’acquisition ?', 'fr');
      expect(res.status).toBe('learning_match');
      expect(res.growingFieldMatches).toBeDefined();
      const fields = res.growingFieldMatches?.map((g) => g.field);
      expect(fields?.join(' ')).toMatch(/Data Engineering|Machine Learning/);
    });
  });

  describe('4. Projets & Comparaisons', () => {
    it('should articulate differences between GTM and SantéScolaire', () => {
      const res = runLocalMatcher('Quelle différence existe entre GTM et SantéScolaire ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('comparison');
      expect(res.directAnswer).toContain('Galaxy Solutions');
      expect(res.directAnswer).toContain('RBAC');
      const projectIds = res.matches.map((m) => m.projectId);
      expect(projectIds).toContain('gtm');
      expect(projectIds).toContain('sante-scolaire');
    });

    it('should return Olist and AFC for data preparation and exploratory analysis', () => {
      const res = runLocalMatcher('Quels projets démontrent la préparation de données et la visualisation ?', 'fr');
      expect(res.status).toBe('success');
      const projectIds = res.matches.map((m) => m.projectId);
      expect(projectIds).toContain('olist');
    });

    it('should transparently present project limitations', () => {
      const res = runLocalMatcher('Quelles sont les limites principales de mes projets ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('projects');
      expect(res.directAnswer).toContain('fictives');
      expect(res.directAnswer).toContain('exploratoires');
      expect(res.matches.length).toBeGreaterThan(0);
    });
  });

  describe('5. Certifications & course summaries', () => {
    it('should list official certifications without fabricating course contents', () => {
      const res = runLocalMatcher('Quelles certifications sont répertoriées sur mon portfolio ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('certifications');
      expect(res.directAnswer).toContain('DataCamp');
      expect(res.relatedItems).toHaveLength(CERTIFICATIONS.length);
    });

    it('should use the documented course summary without inventing chapter comparisons', () => {
      const res = runLocalMatcher('Quels sont les sujets et chapitres étudiés dans Joining Data in SQL ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('certifications');
      expect(res.directAnswer).toContain('Jointures INNER, LEFT, RIGHT, FULL et CROSS');
      expect(res.directAnswer).toContain('sous-requêtes');
      expect(res.directAnswer).toContain('plusieurs tables relationnelles');
      expect(res.directAnswer).not.toContain('FULL JOIN vs CROSS JOIN');
    });
  });

  describe('6. Association et documents publics', () => {
    it('should describe documented CESTOM associative duties accurately', () => {
      const res = runLocalMatcher('Quel engagement associatif est documenté sur le portfolio ?', 'fr');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('association');
      expect(res.directAnswer).toContain('Secrétaire général');
      expect(res.directAnswer).toContain('CESTOM');
      expect(res.directAnswer).toContain('Khouribga');
      expect(res.relatedItems?.[0].id).toBe('assoc-cestom');
    });

    it('should list the public CV and keep approved project documents', () => {
      const res = runLocalMatcher('Quels documents publics sont disponibles en téléchargement ?', 'fr');
      const resEn = runLocalMatcher('Download CV and public documents', 'en');
      expect(res.status).toBe('answer');
      expect(res.intent).toBe('documents');
      expect(res.directAnswer).toContain('/cv/CV_Godwin_Nougbolo.pdf');
      expect(res.directAnswer).toContain('gtm-internship-report-fr.pdf');
      expect(res.relatedItems?.map((r) => r.id)).toContain('doc-cv');
      expect(res.relatedItems?.map((r) => r.id)).toContain('doc-gtm-report');
      expect(res.relatedItems?.map((r) => r.id)).not.toContain('doc-olist-report');
      expect(getKnowledgeDocumentById('doc-cv')?.href).toBe('/cv/CV_Godwin_Nougbolo.pdf');
      expect(resEn.directAnswer).toContain('/cv/CV_Godwin_Nougbolo.pdf');
      expect(resEn.relatedItems?.map((r) => r.id)).toContain('doc-cv');
    });
  });

  describe('6b. Global coverage routing regressions', () => {
    it('should recognize the current study program and skills in progress in both languages', () => {
      const educationCases = [
        ['fr', 'Dans quelle formation suis-je actuellement ?'],
        ['en', 'What degree program am I currently enrolled in?'],
      ] as const;

      for (const [locale, query] of educationCases) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('education');
        expect(result.relatedItems?.map((item) => item.id)).toContain('edu-engineering');
        expect(result.directAnswer).toContain('ENSA Khouribga');
      }

      const learningCases = [
        ['fr', 'Quelles compétences sont encore en cours d’acquisition ?'],
        ['en', 'Which skills am I still developing?'],
      ] as const;

      for (const [locale, query] of learningCases) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('learning_match');
        expect(result.growingFieldMatches?.length).toBeGreaterThan(0);
      }
    });

    it('should route project experience and Machine Learning questions to relevant projects', () => {
      const dataAnalysisCases = [
        ['fr', 'Quels projets démontrent une expérience en analyse de données ?'],
        ['en', 'Which projects demonstrate experience in data analysis?'],
      ] as const;

      for (const [locale, query] of dataAnalysisCases) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('projects');
        expect(result.matches.map((match) => match.projectId)).toEqual(
          expect.arrayContaining(['olist', 'afc', 'gtm'])
        );
        expect(result.matches.every((match) => match.href.startsWith(locale === 'fr' ? '/projets/' : '/projects/'))).toBe(true);
      }

      const methodsCases = [
        ['fr', 'Quels projets utilisent des méthodes statistiques ou de Machine Learning ?'],
        ['en', 'Which projects use statistical or Machine Learning methods?'],
      ] as const;

      for (const [locale, query] of methodsCases) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('success');
        expect(result.matches.map((match) => match.projectId)).toContain('pneumonia-detection');
        expect(result.matches.map((match) => match.projectId)).toContain('afc');
      }
    });

    it('should return only the named project limitations and keep Flask matches accurate', () => {
      for (const [locale, query] of [
        ['fr', 'Quelles sont les limites d’Olist ?'],
        ['en', 'What are Olist’s limitations?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('answer');
        expect(result.matches.map((match) => match.projectId)).toEqual(['olist']);
        expect(result.directAnswer).toContain(result.matches[0].limitations[0]);
      }

      for (const [locale, query] of [
        ['fr', 'Quels projets ont utilisé Flask ?'],
        ['en', 'Which projects used Flask?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.matches.map((match) => match.projectId)).toEqual([
          'gtm',
          'sante-scolaire',
          'novastore',
        ]);
        expect(result.matches.map((match) => match.projectId)).not.toContain('revision-flow');
        expect(result.matches.every((match) => match.href.startsWith(locale === 'fr' ? '/projets/' : '/projects/'))).toBe(true);
      }
    });

    it('should ground Galaxy experience in the completed July-August 2026 internship in both languages', () => {
      const cases = [
        ['fr', 'Présente mon expérience chez Galaxy Solutions.'],
        ['en', 'Tell me about my experience at Galaxy Solutions.'],
      ] as const;

      for (const [locale, query] of cases) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('answer');
        expect(result.intent).toBe('experience');
        expect(result.directAnswer).toMatch(/juillet–août 2026|July–August 2026/);
        expect(result.directAnswer).toMatch(/deux mois|two months/);
        expect(result.directAnswer).toMatch(/terminé|completed/);
        expect(result.directAnswer).toMatch(/à distance|remote/);
        expect(result.directAnswer).not.toMatch(/actuellement en stage|currently (?:doing|in) (?:an )?internship/i);
        expect(result.directAnswer).not.toMatch(/student progress|progress reports|progression des étudiants/i);
      }
    });

    it('should explicitly abstain on undocumented personal employment details in both languages', () => {
      const cases = [
        ['fr', 'Quel était mon salaire mensuel chez Galaxy Solutions ?'],
        ['en', 'What was my monthly salary at Galaxy Solutions?'],
        ['fr', 'Quels étaient mes horaires de stage ?'],
        ['en', 'What were my internship working hours?'],
      ] as const;

      for (const [locale, query] of cases) {
        const result = runLocalMatcher(query, locale);
        expect(result.status).toBe('no_match');
        expect(result.matches).toHaveLength(0);
        expect(result.message).toMatch(/n’est pas documentée|is not documented/i);
        expect(result.message).not.toMatch(/juillet 2027|July 2027/);
      }
    });

    it('should answer certification issuer and documented course-content questions in both languages', () => {
      const issuerCases = [
        ['fr', 'Qui a délivré la certification Introduction to Statistics ?'],
        ['en', 'Which organization issued Introduction to Statistics?'],
      ] as const;

      for (const [locale, query] of issuerCases) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('certifications');
        expect(result.relatedItems).toHaveLength(1);
        expect(result.relatedItems?.[0].id).toBe('cert-introduction-to-statistics');
        expect(result.directAnswer).toContain('DataCamp');
      }

      for (const [locale, query] of [
        ['fr', 'Quels contenus de formation sont effectivement documentés ?'],
        ['en', 'What course content is actually documented?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('certifications');
        expect(result.relatedItems).toHaveLength(CERTIFICATIONS.length);
        expect(result.directAnswer).toContain(String(CERTIFICATIONS.length));
      }

      for (const [locale, query] of [
        ['fr', 'Quels sont les chapitres détaillés de Introduction to Statistics ?'],
        ['en', 'What are the detailed chapters of Introduction to Statistics?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.relatedItems).toHaveLength(1);
        expect(result.directAnswer).toMatch(/chapitres|chapter-by-chapter/i);
        expect(result.directAnswer?.toLowerCase()).toContain('probabilit');
      }
    });

    it('should recognize association activities in French and English', () => {
      for (const [locale, query] of [
        ['fr', 'Quelles activités associatives sont documentées ?'],
        ['en', 'What association activities are documented?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('association');
        expect(result.relatedItems?.map((item) => item.id)).toContain('assoc-cestom');
        expect(result.relatedItems?.[0].verifiedFacts.join(' ')).toMatch(/CESTOM/);
      }
    });

    it('should distinguish public documents from documents excluded or absent from the assistant corpus', () => {
      for (const [locale, query] of [
        ['fr', 'Quels documents publics sont réellement accessibles ?'],
        ['en', 'Which public documents are actually available?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('documents');
        expect(result.relatedItems?.map((item) => item.id)).toContain('doc-gtm-report');
        expect(result.relatedItems?.map((item) => item.id)).not.toContain('doc-olist-report');
      }

      for (const [locale, query] of [
        ['fr', 'Où télécharger le CV final ou le rapport complet Olist ?'],
        ['en', 'Where can I download the final resume or full Olist report?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('documents');
        expect(result.directAnswer).toMatch(/CV final|Olist n’est pas inclus|not included/i);
        expect(result.directAnswer).toContain('/cv/CV_Godwin_Nougbolo.pdf');
        expect(result.directAnswer).not.toContain('olist-report-fr.pdf');
        expect(result.matches.map((match) => match.projectId)).toEqual(['olist']);
      }

      for (const [locale, query] of [
        ['fr', 'Où télécharger un document confidentiel non vérifié ?'],
        ['en', 'Where can I download an unverified confidential document?'],
      ] as const) {
        const result = runLocalMatcher(query, locale);
        expect(result.intent).toBe('documents');
        expect(result.directAnswer).toMatch(/ne peux pas confirmer|cannot confirm/i);
        expect(result.matches).toHaveLength(0);
        expect(result.relatedItems).toBeUndefined();
      }
    });
  });

  describe('7. Robustesse et Hors Périmètre', () => {
    it('should return no_match for technologies absent from portfolio', () => {
      const res = runLocalMatcher('Expérience professionnelle avec Kubernetes, AWS et Terraform', 'fr');
      expect(res.status).toBe('no_match');
      expect(res.matches).toHaveLength(0);
    });

    it('should reject short queries under 2 characters', () => {
      const res = runLocalMatcher('a', 'fr');
      expect(res.status).toBe('no_match');
    });

    it('should exclude unapproved documents and secrets from the prompt context sent to Cloudflare', () => {
      const promptFr = buildPromptKnowledgeContext('fr');
      const promptEn = buildPromptKnowledgeContext('en');

      // Must NOT contain unapproved documents
      expect(promptFr).not.toContain('olist-report-fr.pdf');
      expect(promptEn).not.toContain('olist-report-fr.pdf');

      // Must NOT contain .env or secrets
      expect(promptFr).not.toContain('CLOUDFLARE_API_TOKEN');
      expect(promptFr).not.toContain('CLOUDFLARE_ACCOUNT_ID');

      // Must contain approved documents
      expect(promptFr).toContain('gtm-internship-report-fr.pdf');
      expect(promptFr).toContain('Statistiques descriptives et inférentielles');
      expect(promptEn).toContain('Descriptive and inferential statistics');
    });

    it('should include the full verified Pneumonia study and notebook results in both prompts', () => {
      const promptFr = buildPromptKnowledgeContext('fr');
      const promptEn = buildPromptKnowledgeContext('en');
      const pneumoniaFr = promptFr.slice(
        promptFr.indexOf('DOC_ID: "proj-pneumonia-detection"'),
        promptFr.indexOf('\n- DOC_ID:', promptFr.indexOf('DOC_ID: "proj-pneumonia-detection"') + 1)
      );
      const pneumoniaEn = promptEn.slice(
        promptEn.indexOf('DOC_ID: "proj-pneumonia-detection"'),
        promptEn.indexOf('\n- DOC_ID:', promptEn.indexOf('DOC_ID: "proj-pneumonia-detection"') + 1)
      );

      expect(pneumoniaFr).toContain('5 856 radiographies pédiatriques');
      expect(pneumoniaFr).toContain('224 × 224 pixels');
      expect(pneumoniaFr).toContain('Réseau CNN construit pour le projet');
      expect(pneumoniaFr).toContain('apprend ses filtres à partir');
      expect(pneumoniaFr).toContain('DenseNet121');
      expect(pneumoniaFr).toContain('ImageNet');
      expect(pneumoniaFr).toContain('seuil 0,7');
      expect(pneumoniaFr).toContain('seuil 0,8');
      expect(pneumoniaFr).toContain('seuil 0,9');
      expect(pneumoniaFr).toContain('0,809295');
      expect(pneumoniaFr).toContain('0,887821');
      expect(pneumoniaFr).toContain('0,879808');
      expect(pneumoniaFr).toContain('validation externe');
      expect(pneumoniaFr).toContain('358 ou 359 sur 390');
      expect(pneumoniaEn).toContain('5,856 pediatric X-rays');
      expect(pneumoniaEn).toContain('224 × 224 pixels');
      expect(pneumoniaEn).toContain('trained from scratch');
      expect(pneumoniaEn).toContain('ImageNet');
      expect(pneumoniaEn).toContain('threshold 0.7');
      expect(pneumoniaEn).toContain('threshold 0.8');
      expect(pneumoniaEn).toContain('threshold 0.9');
      expect(pneumoniaEn).toContain('0.809295');
      expect(pneumoniaEn).toContain('0.887821');
      expect(pneumoniaEn).toContain('0.879808');
      expect(pneumoniaEn).toMatch(/external validation/i);
      expect(pneumoniaEn).toContain('358 or 359 out of 390');

      expect(promptFr).not.toContain('olist-report-fr.pdf');
      expect(promptEn).not.toContain('olist-report-fr.pdf');
    });
  });
});
