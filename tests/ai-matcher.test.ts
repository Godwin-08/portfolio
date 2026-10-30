import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/match/route';
import { runLocalMatcher } from '@/lib/ai/local-matcher';
import { PROJECT_CORPUS } from '@/lib/ai/corpus';
import { queryCloudflareAI, DEFAULT_CLOUDFLARE_MODEL } from '@/lib/ai/cloudflare-client';
import { PROJECTS } from '@/data/projects';

describe('Evidence Matcher - Quality & Grounding Tests', () => {
  const representativeQueries = [
    // 1. SQL et bases de données (FR & EN)
    {
      query: 'Modélisation SQL et bases de données relationnelles',
      locale: 'fr' as const,
      expectedProject: 'gtm',
      category: 'SQL & Relational DB',
    },
    {
      query: 'MySQL queries, database schema, and SQLAlchemy ORM',
      locale: 'en' as const,
      expectedProject: 'gtm',
      category: 'SQL & Relational DB',
    },
    // 2. Préparation et analyse des données (FR & EN)
    {
      query: 'Nettoyage et préparation de données avec Pandas et NumPy',
      locale: 'fr' as const,
      expectedProject: 'olist',
      category: 'Data Preparation & Cleaning',
    },
    {
      query: 'Data cleaning, missing values, and exploratory analysis',
      locale: 'en' as const,
      expectedProject: 'olist',
      category: 'Data Preparation & Cleaning',
    },
    // 3. Visualisation et indicateurs (FR & EN)
    {
      query: 'Tableaux de bord, indicateurs KPI et graphiques Chart.js',
      locale: 'fr' as const,
      expectedProject: 'gtm',
      category: 'Visualization & BI',
    },
    {
      query: 'Business Intelligence, operational metrics, and automated PDF export',
      locale: 'en' as const,
      expectedProject: 'gtm',
      category: 'Visualization & BI',
    },
    // 4. Développement Flask (FR & EN)
    {
      query: 'Développement d’application web en Python avec Flask et Jinja',
      locale: 'fr' as const,
      expectedProject: 'gtm',
      category: 'Flask Web Development',
    },
    {
      query: 'Flask server routing, sessions, and Jinja templates',
      locale: 'en' as const,
      expectedProject: 'gtm',
      category: 'Flask Web Development',
    },
    // 5. Gestion des rôles et permissions (FR & EN)
    {
      query: 'Gestion des rôles, permissions et droits d’accès pour médecins et administrateurs',
      locale: 'fr' as const,
      expectedProject: 'sante-scolaire',
      category: 'Roles & Access Control',
    },
    {
      query: 'Role-based access control with separate medical and admin portals',
      locale: 'en' as const,
      expectedProject: 'sante-scolaire',
      category: 'Roles & Access Control',
    },
    // 6. Architecture d’application (FR & EN)
    {
      query: 'Architecture modulaire en couches et Blueprints',
      locale: 'fr' as const,
      expectedProject: 'gtm',
      category: 'Modular Architecture',
    },
    {
      query: 'Layered MVC architecture separating routes, business services, and database',
      locale: 'en' as const,
      expectedProject: 'gtm',
      category: 'Modular Architecture',
    },
    // 7. Requêtes indirectes avec synonymes (FR & EN)
    {
      query: 'BDD relationnelle et intégrité transactionnelle',
      locale: 'fr' as const,
      expectedProject: 'gtm',
      category: 'Indirect / Synonyms',
    },
    {
      query: 'Contingency tables, inertia, and correspondence analysis',
      locale: 'en' as const,
      expectedProject: 'afc',
      category: 'Indirect / Synonyms',
    },
    {
      query: 'Prototype de boutique en ligne avec panier et commande simulée',
      locale: 'fr' as const,
      expectedProject: 'novastore',
      category: 'Indirect / Synonyms',
    },
    {
      query: 'Study planner with dynamic rescheduling and Pomodoro timer',
      locale: 'en' as const,
      expectedProject: 'revision-flow',
      category: 'Indirect / Synonyms',
    },
    // 8. Compétences en cours d’acquisition (FR & EN)
    {
      query: 'Data Engineering, pipelines ETL et orchestration Spark/Airflow',
      locale: 'fr' as const,
      expectedStatus: 'learning_match',
      category: 'Skills in Progress',
    },
    {
      query: 'Machine Learning, Deep Learning, and predictive models',
      locale: 'en' as const,
      expectedStatus: 'learning_match',
      category: 'Skills in Progress',
    },
    {
      query: 'Data Science avancée et intelligence artificielle générative',
      locale: 'fr' as const,
      expectedStatus: 'learning_match',
      category: 'Skills in Progress',
    },
    // 9. Recherches sans correspondance / hors périmètre (FR & EN)
    {
      query: 'Cluster Kubernetes avec Docker Swarm et Helm',
      locale: 'fr' as const,
      expectedStatus: 'no_match',
      category: 'No Match',
    },
    {
      query: 'Smart contract Solidity on Ethereum blockchain',
      locale: 'en' as const,
      expectedStatus: 'no_match',
      category: 'No Match',
    },
  ];

  it('should validate all 21 representative test scenarios in French and English', () => {
    expect(representativeQueries.length).toBeGreaterThanOrEqual(20);

    for (const testCase of representativeQueries) {
      const result = runLocalMatcher(testCase.query, testCase.locale);

      if (testCase.expectedStatus) {
        expect(result.status).toBe(testCase.expectedStatus);
      }

      if (testCase.expectedProject) {
        expect(result.status).toBe('success');
        const projectIds = result.matches.map((m) => m.projectId);
        expect(projectIds).toContain(testCase.expectedProject);

        const match = result.matches.find((m) => m.projectId === testCase.expectedProject);
        expect(match).toBeDefined();
        expect(['strong', 'moderate', 'indirect']).toContain(match?.level);
        expect(match?.verifiedProofs.length).toBeGreaterThan(0);
        expect(match?.limitations.length).toBeGreaterThan(0);
      }
    }
  });

  it('should ensure all verified proofs and limitations come from the authentic corpus', () => {
    const result = runLocalMatcher('SQL et Flask', 'fr');
    expect(result.status).toBe('success');

    for (const match of result.matches) {
      const corpusEntry = PROJECT_CORPUS[match.projectId];
      expect(corpusEntry).toBeDefined();

      // Check verified proofs
      for (const proof of match.verifiedProofs) {
        expect(corpusEntry.fr.verifiedProofs).toContain(proof);
      }

      // Check limitations
      for (const lim of match.limitations) {
        expect(corpusEntry.fr.limitations).toContain(lim);
      }
    }
  });

  it('should never output arbitrary numeric percentages', () => {
    const result = runLocalMatcher('Pandas et analyse', 'fr');
    expect(result.status).toBe('success');
    for (const match of result.matches) {
      expect(['strong', 'moderate', 'indirect']).toContain(match.level);
      // Ensure no property holds a fake percentage string like "98%"
      expect(JSON.stringify(match)).not.toMatch(/\b\d{1,3}%\b/);
    }
  });

  it('should identify growing fields separately from demonstrated production skills', () => {
    const result = runLocalMatcher('Data Engineering', 'fr');
    expect(result.growingFieldMatches).toBeDefined();
    expect(result.growingFieldMatches?.length).toBeGreaterThan(0);
    const de = result.growingFieldMatches?.[0];
    expect(de?.field).toBe('Data Engineering');
    expect(de?.description).toContain('ENSA Khouribga');
    expect(de?.description).toContain('DataCamp');
  });

  it('should return honest zero-match state for out-of-scope requirements', () => {
    const resultFr = runLocalMatcher('Développement d’application mobile Flutter iOS', 'fr');
    expect(resultFr.status).toBe('no_match');
    expect(resultFr.matches).toHaveLength(0);
    expect(resultFr.message).toContain('Aucun projet documenté');

    const resultEn = runLocalMatcher('Rust systems programming and memory safety', 'en');
    expect(resultEn.status).toBe('no_match');
    expect(resultEn.matches).toHaveLength(0);
    expect(resultEn.message).toContain('No documented project');
  });

  it('should properly route links to valid project pages', () => {
    const validSlugs = PROJECTS.map((p) => p.slug);
    const result = runLocalMatcher('SQL MySQL', 'fr');
    for (const match of result.matches) {
      expect(validSlugs).toContain(match.projectSlug);
      expect(match.href).toBe(`/projets/${match.projectSlug}`);
    }
  });

  it('should identify Pneumonia Detection for the audit questions in French and English', () => {
    const questions = [
      {
        locale: 'fr' as const,
        query:
          'Peux-tu me présenter mon projet de Deep Learning sur la détection de la pneumonie ?',
        kind: 'presentation',
      },
      {
        locale: 'en' as const,
        query: 'Can you present my Deep Learning project on pneumonia detection?',
        kind: 'presentation',
      },
      {
        locale: 'fr' as const,
        query: 'Quelles approches et quels modèles ai-je comparés ?',
        kind: 'comparison',
      },
      {
        locale: 'en' as const,
        query: 'Which approaches and models did I compare?',
        kind: 'comparison',
      },
      {
        locale: 'fr' as const,
        query: 'Quels résultats ont été obtenus et comment faut-il les interpréter ?',
        kind: 'results',
      },
      {
        locale: 'en' as const,
        query: 'What results were obtained and how should they be interpreted?',
        kind: 'results',
      },
      {
        locale: 'fr' as const,
        query: 'Quelles sont les limites de ce projet ?',
        kind: 'limitations',
      },
      {
        locale: 'en' as const,
        query: 'What are the limitations of this project?',
        kind: 'limitations',
      },
      {
        locale: 'fr' as const,
        query: 'Quel projet de Deep Learning ai-je réalisé et quels modèles ai-je comparés ?',
        kind: 'comparison',
      },
      {
        locale: 'en' as const,
        query:
          'What Deep Learning project did I work on, and which models did I compare?',
        kind: 'comparison',
      },
    ];

    for (const { locale, query, kind } of questions) {
      const result = runLocalMatcher(query, locale);
      expect(result.status, query).toBe('success');
      expect(result.matches, query).toHaveLength(1);
      expect(result.matches[0].projectId, query).toBe('pneumonia-detection');
      expect(result.matches[0].href, query).toBe(
        `/${locale === 'fr' ? 'projets' : 'projects'}/pneumonia-detection`
      );
      expect(result.directAnswer, query).toBeTruthy();

      if (kind === 'presentation' || kind === 'comparison') {
        expect(result.matches[0].verifiedProofs.join(' ')).toMatch(
          /CNN|DenseNet121/i
        );
      }
      if (kind === 'results') {
        expect(result.matches[0].verifiedProofs.join(' ')).toContain(
          locale === 'fr' ? '0,809295' : '0.809295'
        );
        expect(result.matches[0].verifiedProofs.join(' ')).toContain(
          locale === 'fr' ? '0,887821' : '0.887821'
        );
      }
      if (kind === 'limitations') {
        expect(result.matches[0].limitations).toHaveLength(3);
        expect(result.matches[0].limitations.join(' ')).toMatch(
          /validation|diagnostic/i
        );
        expect(result.directAnswer).toMatch(/academic|académique/i);
      }
    }
  });

  it('should match Pneumonia-specific terms without mixing in other projects', () => {
    for (const query of [
      'CNN',
      'DenseNet121',
      'X-ray pneumonia project results',
      'Projet de radiographie et pneumonie',
    ]) {
      const result = runLocalMatcher(query, query.startsWith('Projet') ? 'fr' : 'en');
      expect(result.matches.map((match) => match.projectId)).toEqual([
        'pneumonia-detection',
      ]);
    }
  });
});

describe('Cloudflare Workers AI Client - Mock & Fallback Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    delete process.env.CLOUDFLARE_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_API_TOKEN;
  });

  it('should use the active Llama 3.2 3B Instruct model and not the deprecated 3.1 8B model', () => {
    expect(DEFAULT_CLOUDFLARE_MODEL).toBe('@cf/meta/llama-3.2-3b-instruct');
    expect(DEFAULT_CLOUDFLARE_MODEL).not.toContain('3.1-8b');
  });

  it('should return null (triggering fallback) when Cloudflare credentials are missing', async () => {
    const res = await queryCloudflareAI('Modélisation SQL', 'fr');
    expect(res).toBeNull();
  });

  it('should bypass Cloudflare for undocumented personal employment details', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
    const fetchSpy = vi.spyOn(global, 'fetch');

    await expect(
      queryCloudflareAI('What was my monthly salary at Galaxy Solutions?', 'en')
    ).resolves.toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should parse successful Cloudflare Workers AI responses with mode "ai" and attach authentic facts', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    const mockAiResponse = {
      result: {
        response: JSON.stringify({
          projectMatches: [
            {
              projectId: 'gtm',
              level: 'strong',
              reason: 'Application complète de gestion des formations avec modélisation MySQL et ORM SQLAlchemy.',
            },
          ],
          learningFieldKeys: [],
          noMatch: false,
        }),
      },
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockAiResponse,
    } as Response);

    const res = await queryCloudflareAI('Modélisation relationnelle MySQL', 'fr');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(res).not.toBeNull();
    expect(res?.mode).toBe('ai');
    expect(res?.status).toBe('success');
    expect(res?.matches).toHaveLength(1);

    const match = res?.matches[0];
    expect(match?.projectId).toBe('gtm');
    expect(match?.level).toBe('strong');
    // Authentic proofs from corpus are attached by the server, not generated by LLM
    expect(match?.verifiedProofs.length).toBeGreaterThan(0);
    expect(match?.limitations.length).toBeGreaterThan(0);
    expect(res?.providerInfo?.model).toBe(DEFAULT_CLOUDFLARE_MODEL);
  });

  it('should rebuild Galaxy experience answers from completed internship facts in French and English', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    for (const [locale, query] of [
      ['fr', 'Présente mon expérience chez Galaxy Solutions.'],
      ['en', 'Tell me about my experience at Galaxy Solutions.'],
    ] as const) {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            response: JSON.stringify({
              intent: 'comparison',
              directAnswer:
                locale === 'fr'
                  ? 'Je suis actuellement en stage et je suis le progrès des étudiants avec des rapports détaillés.'
                  : 'I am currently interning and tracking student progress with detailed reports.',
              matchedDocumentIds: ['exp-galaxy-solutions'],
              projectMatches: [
                {
                  projectId: 'gtm',
                  level: 'strong',
                  reason: 'Unsupported student progress tracking.',
                },
              ],
              learningFieldKeys: ['data-engineering', 'machine-learning', 'data-science'],
              noMatch: false,
            }),
          },
        }),
      } as Response);

      const result = await queryCloudflareAI(query, locale);
      expect(result?.mode).toBe('ai');
      expect(result?.intent).toBe('experience');
      expect(result?.growingFieldMatches).toBeUndefined();
      expect(result?.directAnswer).toMatch(/juillet–août 2026|July–August 2026/);
      expect(result?.directAnswer).toMatch(/deux mois|two months/);
      expect(result?.directAnswer).toMatch(/terminé|completed/);
      expect(result?.directAnswer).toMatch(/à distance|remote/);
      expect(result?.directAnswer).not.toMatch(
        /actuellement en stage|currently (?:doing|in) (?:an )?internship|student progress|progression des étudiants|detailed reports|rapports détaillés/i
      );
    }
  });

  it('should force Olist limitation intent and answer only from published limitations in both languages', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    for (const [locale, query] of [
      ['fr', 'Quelles sont les principales limites de mon projet Olist ?'],
      ['en', 'What are the main limitations of my Olist project?'],
    ] as const) {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            response: JSON.stringify({
              intent: 'comparison',
              directAnswer:
                'Missing rows were removed before calculation; Olist has no other limitations.',
              matchedDocumentIds: ['proj-olist'],
              projectMatches: [
                { projectId: 'olist', level: 'strong', reason: 'unsupported model text' },
              ],
              learningFieldKeys: [],
            }),
          },
        }),
      } as Response);

      const result = await queryCloudflareAI(query, locale);
      expect(result?.mode).toBe('ai');
      expect(result?.intent).toBe('projects');
      expect(result?.matches.map((match) => match.projectId)).toEqual(['olist']);
      expect(result?.directAnswer).toContain(
        PROJECT_CORPUS.olist[locale].limitations[0]
      );
      expect(result?.directAnswer).toContain(
        PROJECT_CORPUS.olist[locale].limitations[1]
      );
      expect(result?.directAnswer).not.toMatch(/missing rows were removed|lignes manquantes retirées/i);
    }
  });

  it('should exclude NovaStore from Cloudflare SQL evidence and synthesize the answer from supported projects', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: {
          response: JSON.stringify({
            intent: 'skills',
            directAnswer: 'NovaStore demonstrates SQL persistence and relational modeling.',
            matchedDocumentIds: ['proj-novastore', 'proj-gtm', 'proj-sante-scolaire'],
            projectMatches: [
              { projectId: 'novastore', level: 'strong', reason: 'SQL persistence' },
              { projectId: 'gtm', level: 'strong', reason: 'SQL modeling' },
              { projectId: 'sante-scolaire', level: 'strong', reason: 'SQL modeling' },
            ],
            learningFieldKeys: [],
          }),
        },
      }),
    } as Response);

    const result = await queryCloudflareAI(
      'Which projects demonstrate my SQL skills?',
      'en'
    );

    expect(result?.mode).toBe('ai');
    expect(result?.matches.map((match) => match.projectId)).toEqual([
      'gtm',
      'sante-scolaire',
    ]);
    expect(result?.directAnswer).toContain('GTM');
    expect(result?.directAnswer).toContain('SantéScolaire');
    expect(result?.directAnswer).not.toMatch(/NovaStore|relational modeling/i);
  });

  it('should send complete Pneumonia facts and retain notebook evidence in mocked AI responses', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: {
          response: JSON.stringify({
            intent: 'projects',
            directAnswer: 'Academic project comparing CNN and DenseNet121.',
            matchedDocumentIds: ['proj-pneumonia-detection'],
            projectMatches: [
              {
                projectId: 'pneumonia-detection',
                level: 'strong',
                reason: 'Academic X-ray classification study.',
              },
            ],
            learningFieldKeys: [],
            noMatch: false,
          }),
        },
      }),
    } as Response);

    const result = await queryCloudflareAI(
      'Present my Pneumonia Detection project',
      'en'
    );

    expect(result?.matches).toHaveLength(1);
    expect(result?.matches[0].projectId).toBe('pneumonia-detection');
    expect(result?.matches[0].verifiedProofs.join(' ')).toContain(
      'CNN_Pneumonia.ipynb'
    );
    expect(result?.matches[0].verifiedProofs.join(' ')).toContain(
      'DenseNet121_Pneumonia.ipynb'
    );
    expect(result?.matches[0].limitations).toHaveLength(3);

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body;
    expect(typeof requestBody).toBe('string');
    const systemPrompt = JSON.parse(String(requestBody)).messages[0].content as string;
    expect(systemPrompt).toContain('threshold 0.7');
    expect(systemPrompt).toContain('trained from scratch');
    expect(systemPrompt).toMatch(/external validation/i);
  });

  it('should reject unknown Cloudflare references and fall back instead of trusting their answer', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: {
          response: JSON.stringify({
            intent: 'certifications',
            directAnswer: 'Unsupported certificate claim.',
            matchedDocumentIds: ['cert-not-in-corpus'],
            projectMatches: [{ projectId: 'project-not-in-corpus' }],
            learningFieldKeys: [],
          }),
        },
      }),
    } as Response);

    await expect(queryCloudflareAI('Which certificates are listed?', 'en')).resolves.toBeNull();
  });

  it('should discard project references inconsistent with a certification intent', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: {
          response: JSON.stringify({
            intent: 'certifications',
            directAnswer: 'Introduction to Statistics was issued by DataCamp.',
            matchedDocumentIds: ['cert-introduction-to-statistics', 'proj-gtm'],
            projectMatches: [{ projectId: 'gtm', level: 'strong' }],
            learningFieldKeys: [],
          }),
        },
      }),
    } as Response);

    const result = await queryCloudflareAI(
      'Which organization issued Introduction to Statistics?',
      'en'
    );
    expect(result?.intent).toBe('certifications');
    expect(result?.matches).toHaveLength(0);
    expect(result?.relatedItems?.map((item) => item.id)).toEqual([
      'cert-introduction-to-statistics',
    ]);
  });

  it('should return null and trigger fallback on HTTP 429 quota exhaustion (10,000 neurons limit)', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    } as Response);

    const res = await queryCloudflareAI('Tableaux de bord BI', 'fr');
    expect(res).toBeNull();
  });

  it('should return null on network error or timeout', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';

    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error or abort'));

    const res = await queryCloudflareAI('Analyse de données', 'fr');
    expect(res).toBeNull();
  });
});

describe('API Route Handler - /api/ai/match', () => {
  beforeEach(() => {
    delete process.env.CLOUDFLARE_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_API_TOKEN;
  });

  it('should fall back gracefully to local engine when credentials are not configured', async () => {
    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Je cherche un projet avec SQL et des indicateurs métier.',
        locale: 'fr',
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.mode).toBe('keyword');
    expect(data.status).toBe('success');
    expect(data.matches.length).toBeGreaterThan(0);
    expect(data.matches[0].projectId).toBe('gtm');
    expect(data.matches[0].verifiedProofs.length).toBeGreaterThan(0);
    expect(data.matches[0].limitations.length).toBeGreaterThan(0);
  });

  it('should process English query with local fallback when credentials are not configured', async () => {
    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'I am looking for a project involving Python data analysis and visualisation.',
        locale: 'en',
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.mode).toBe('keyword');
    expect(data.status).toBe('success');
    expect(data.matches.map((m: { projectId: string }) => m.projectId)).toContain('olist');
  });

  it('should keep the local matcher available when a configured Cloudflare request fails', async () => {
    process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    process.env.CLOUDFLARE_API_TOKEN = 'test-api-token';
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Simulated Cloudflare outage'));

    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Which projects used Flask?',
        locale: 'en',
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.mode).toBe('keyword');
    expect(data.matches.map((match: { projectId: string }) => match.projectId)).toEqual([
      'gtm',
      'sante-scolaire',
      'novastore',
    ]);
  });

  it('should clearly abstain when undocumented salary information is requested', async () => {
    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'What was my monthly salary at Galaxy Solutions?',
        locale: 'en',
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.mode).toBe('keyword');
    expect(data.status).toBe('no_match');
    expect(data.matches).toHaveLength(0);
    expect(data.message).toMatch(/is not documented/i);
    expect(data.message).not.toMatch(/July 2027/);
  });

  it('should reject queries shorter than 2 characters with 400', async () => {
    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'a', locale: 'fr' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('should reject queries longer than 250 characters with 400', async () => {
    const req = new NextRequest('http://localhost:3000/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'x'.repeat(251), locale: 'fr' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
