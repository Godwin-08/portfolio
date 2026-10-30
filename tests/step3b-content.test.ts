import { describe, expect, it } from 'vitest';
import fr from '../messages/fr.json';
import en from '../messages/en.json';
import { PROJECTS } from '../src/data/projects';
import { PROJECT_DETAIL_COPY } from '../src/data/project-details';
import { GROWING_FIELDS_INFO } from '../src/lib/ai/corpus';
import { runLocalMatcher } from '../src/lib/ai/local-matcher';

describe('step 3B targeted content corrections', () => {
  it('announces eight documented projects in both locales', () => {
    expect(fr.seo.projects.description).toContain('huit projets');
    expect(en.seo.projects.description).toContain('eight documented projects');
  });

  it('keeps the French academic distinction without implying an equivalence', () => {
    expect(fr.about.education.deug.description).toBe('Mention assez bien.');
    expect(en.about.education.deug.description).toBe(
      'French distinction: assez bien.'
    );
    expect(en.about.education.baccalaureate.degree).toBe(
      'Baccalaureate in Mathematics and Life and Earth Sciences'
    );
  });

  it('keeps the scholarship duration without claiming full funding', () => {
    const scholarship = GROWING_FIELDS_INFO['data-engineering'];

    expect(scholarship.fr.description).toContain('bourse annuelle DataCamp');
    expect(scholarship.en.description).toContain('one-year DataCamp scholarship');
    expect(scholarship.en.description.toLowerCase()).not.toContain('full');
  });

  it('describes the ACP figures with the indicators used in the project', () => {
    const frenchAlts = PROJECT_DETAIL_COPY.acp.fr.gallery.map(({ alt }) => alt);
    const englishAlts = PROJECT_DETAIL_COPY.acp.en.gallery.map(({ alt }) => alt);

    expect(frenchAlts[0]).toContain('indicateurs économiques et de santé');
    expect(frenchAlts[1]).toContain('indicateurs économiques et de santé');
    expect(englishAlts[0]).toContain('economic and health indicators');
    expect(englishAlts[1]).toContain('economic and health indicators');
    expect(englishAlts.join(' ')).not.toMatch(/social indicators/i);
  });

  it('explains when Cloudflare may process questions and names the local fallback', () => {
    const frenchNotices = [fr.projects.matcher.modes.aiNotice, fr.aiAssistant.modes.aiNotice];
    const englishNotices = [en.projects.matcher.modes.aiNotice, en.aiAssistant.modes.aiNotice];

    for (const notice of frenchNotices) {
      expect(notice).toContain('Cloudflare Workers AI');
      expect(notice).toContain('configuré et disponible');
      expect(notice).toContain('le moteur local');
      expect(notice).toContain('informations sensibles');
      expect(notice).not.toMatch(/aucune donnée personnelle/i);
    }

    for (const notice of englishNotices) {
      expect(notice).toContain('Cloudflare Workers AI');
      expect(notice).toContain('configured and available');
      expect(notice).toContain('local matcher');
      expect(notice).toContain('sensitive information');
      expect(notice).not.toMatch(/no personal data is stored/i);
    }
  });

  it('labels DataCamp courses, completion certificates, and verification links separately', () => {
    expect(fr.home.certifications.heading).toBe('Certifications');
    expect(fr.home.certifications.count).toContain('certifications répertoriées');
    expect(fr.home.certifications.detail.certificate).toBe('Attestation de réussite');
    expect(fr.home.certifications.viewCertificate).toContain('attestation');
    expect(fr.home.certifications.verifyCertificate).toContain('DataCamp');
    expect(fr.home.certifications.viewAll).toContain('certifications');

    expect(en.home.certifications.heading).toBe('Certifications');
    expect(en.home.certifications.count).toContain('certifications listed');
    expect(en.home.certifications.detail.certificate).toBe('Completion certificate');
    expect(en.home.certifications.viewCertificate).toContain('completion certificate');
    expect(en.home.certifications.verifyCertificate).toContain('DataCamp');
    expect(en.home.certifications.viewAll).toContain('certifications');

    const frenchAnswer = runLocalMatcher(
      'Quels cours DataCamp et quelles attestations sont documentés ?',
      'fr'
    );
    const englishAnswer = runLocalMatcher(
      'Which DataCamp courses and completion certificates are documented?',
      'en'
    );

    expect(frenchAnswer.directAnswer).toContain('cours DataCamp terminés');
    expect(frenchAnswer.directAnswer).toContain('attestation de réussite');
    expect(frenchAnswer.directAnswer).toContain('lien officiel de vérification');
    expect(englishAnswer.directAnswer).toContain('completed DataCamp courses');
    expect(englishAnswer.directAnswer).toContain('completion certificate');
    expect(englishAnswer.directAnswer).toContain('official verification link');
  });

  it('distinguishes the final Olist dataset from the delivery-date subset', () => {
    const olist = PROJECTS.find(({ slug }) => slug === 'olist');
    const finalStep = PROJECT_DETAIL_COPY.olist.fr.olistAnalysis?.preparation.steps.at(-1);

    expect(fr.projects.cards.olist.tagline).toContain('Jeu d’analyse final');
    expect(en.projects.cards.olist.tagline).toContain('Final analysis dataset');
    expect(fr.home.projects.ordersAnalyzed).toBe('commandes du jeu final');
    expect(en.home.projects.ordersAnalyzed).toBe('orders in the final dataset');
    expect(olist?.summary).toContain('96 252 lignes du jeu d’analyse final');
    expect(olist?.keyMetrics[0]?.label).toBe('Jeu d’analyse final');
    expect(finalStep).toMatchObject({ value: '96 252', title: 'Jeu d’analyse final' });
    expect(PROJECT_DETAIL_COPY.olist.fr.featuredFinding).toContain(
      '96 244 commandes avec les dates nécessaires'
    );
  });
});
