'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Compass, FileText, GraduationCap, Lightbulb, Puzzle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/data/profile';

const content = {
  fr: {
    eyebrow: 'À propos', title: 'Donner du sens aux données, puis en faire quelque chose d’utile.',
    intro: 'Je suis étudiant ingénieur en Informatique et Ingénierie des Données à l’ENSA Khouribga. La Data Analysis est mon orientation actuelle ; je développe aussi progressivement mes repères en Data Engineering et en Machine Learning.',
    search: 'Je recherche aujourd’hui un PFA de deuxième année, avec l’envie de contribuer à un contexte où les données et le logiciel répondent à un besoin concret.',
    education: 'Parcours académique', professional: 'Expérience professionnelle', association: 'Engagement associatif',
    galaxyLabel: 'Projet / PFA · GTM', galaxy: 'Galaxy Solutions — Galaxy Training Manager',
    galaxyText: 'Dans le cadre d’un projet professionnel individuel, j’ai conçu GTM, une application de gestion de formations. Elle réunit une interface web, une base de données, des rôles utilisateurs, un tableau de bord et des fonctions d’analyse pour rendre le suivi des formations plus lisible.', galaxyLink: 'Voir l’étude de cas GTM',
    cestom: 'CESTOM', currentEngagement: 'Engagement actuel', currentRole: 'Secrétaire général · CESTOM Khouribga', previousEngagements: 'Engagements précédents', previous: ['Trésorier local · CESTOM Kénitra', 'Bénévole · CESTOM Ben Guerir'], cestomText: 'Responsabilité associative actuelle, distincte d’une expérience salariée.',
    method: 'Ma manière de travailler', methodTitle: 'Comprendre → Analyser → Construire',
    steps: [
      ['Comprendre', 'Je commence par le problème, les données disponibles et les contraintes. Le travail AFC m’a notamment amené à revenir aux mécanismes de la méthode avant de les coder.'],
      ['Analyser', 'Je vérifie et structure ce qui existe avant d’en tirer une lecture. L’audit Olist est le terrain où cette étape prend le plus de place.'],
      ['Construire', 'Je transforme ensuite cette compréhension en un livrable concret : une interface, une analyse ou un outil. GTM relie ces dimensions dans une même application.'],
    ],
    traits: 'Ce que les projets montrent',
    proof: [
      ['Vérifier avant de conclure', 'Les contrôles de cohérence d’Olist et les étapes de validation de GTM font partie du travail, pas seulement de sa présentation.'],
      ['Comprendre une méthode', 'Pour l’AFC, le calcul a été reconstruit étape par étape avec Pandas, NumPy et SciPy plutôt que réduit à une boîte noire.'],
      ['Rester en progression', 'La Data Analysis est mon point d’appui actuel. Le Data Engineering et le Machine Learning restent des domaines que j’explore et développe.'],
    ],
    focus: 'Ce que je cherche aujourd’hui', focusText: 'Un PFA de deuxième année, prioritairement orienté Data Analysis, tout en restant ouvert à une mission où la Data Engineering apporte un cadre utile. Le Machine Learning et l’IA font partie des domaines que je continue d’explorer.',
    beyond: 'En dehors des projets', beyondText: 'J’apprends aussi à travers des projets collectifs et des problèmes techniques concrets. L’engagement associatif, comme CESTOM, complète ce parcours en donnant une place au travail d’équipe et à l’usage réel des interfaces.',
    cta: 'Continuons la conversation.', projects: 'Voir mes projets', contact: 'Me contacter', cv: 'Télécharger mon CV',
  },
  en: {
    eyebrow: 'About', title: 'Making sense of data, then turning it into something useful.',
    intro: 'I am an engineering student in Computer Science and Data Engineering at ENSA Khouribga. Data Analysis is my current direction; I am also steadily building my foundations in Data Engineering and Machine Learning.',
    search: 'I am currently seeking a second-year end-of-year project placement (PFA), where data and software can address a concrete need.',
    education: 'Academic path', professional: 'Professional experience', association: 'Community involvement',
    galaxyLabel: 'Project / PFA · GTM', galaxy: 'Galaxy Solutions — Galaxy Training Manager',
    galaxyText: 'As part of an individual professional project, I designed GTM, a training-management application. It brings together a web interface, a database, user roles, a dashboard, and analytical features to make training follow-up easier to read.', galaxyLink: 'View the GTM case study',
    cestom: 'CESTOM', currentEngagement: 'Current involvement', currentRole: 'Secretary General · CESTOM Khouribga', previousEngagements: 'Previous involvement', previous: ['Local Treasurer · CESTOM Kénitra', 'Volunteer · CESTOM Ben Guerir'], cestomText: 'A current community responsibility, separate from paid employment.',
    method: 'How I work', methodTitle: 'Understand → Analyse → Build',
    steps: [
      ['Understand', 'I start with the problem, available data, and constraints. The CA project in particular led me to revisit the method’s mechanics before coding them.'],
      ['Analyse', 'I check and structure what exists before drawing conclusions. The Olist audit is where this step takes the most space.'],
      ['Build', 'I then turn that understanding into a tangible output: an interface, an analysis, or a tool. GTM brings these dimensions together in one application.'],
    ],
    traits: 'What the projects demonstrate',
    proof: [
      ['Check before concluding', 'Olist consistency checks and GTM validation steps are part of the work, not merely part of its presentation.'],
      ['Understand a method', 'For correspondence analysis, the calculation was reconstructed step by step with Pandas, NumPy, and SciPy instead of being treated as a black box.'],
      ['Keep progressing', 'Data Analysis is my current foundation. Data Engineering and Machine Learning remain fields I am exploring and developing.'],
    ],
    focus: 'What I am looking for now', focusText: 'A second-year end-of-year project placement (PFA), primarily in Data Analysis, while remaining open to work where Data Engineering provides a useful framework. Machine Learning and AI are fields I continue to explore.',
    beyond: 'Beyond projects', beyondText: 'I also learn through collaborative projects and practical technical problems. Community involvement, such as CESTOM, complements this path by making room for teamwork and real interface use.',
    cta: 'Let’s continue the conversation.', projects: 'View my projects', contact: 'Contact me', cv: 'Download my CV',
  },
} as const;

export function AboutContent() {
  const english = usePathname().startsWith('/en');
  const t = content[english ? 'en' : 'fr'];
  const href = (path: string) => english ? `/en${path}` : path;
  const heading = 'text-2xl sm:text-3xl font-heading font-extrabold text-slate-900';

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">
    <header className="max-w-4xl space-y-6"><div className="flex flex-wrap gap-2"><Badge variant="pfa" size="md">{PROFILE.badge}</Badge><Badge variant="neutral" size="md">{PROFILE.primaryFocus}</Badge></div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{t.eyebrow}</p><h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.08]">{t.title}</h1><div className="max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-slate-700"><p>{t.intro}</p><p className="text-slate-600">{t.search}</p></div></header>
    <section className="grid lg:grid-cols-12 gap-8 lg:gap-16"><div className="lg:col-span-4 flex items-center gap-3"><GraduationCap className="w-5 h-5 text-primary-600" /><h2 className={heading}>{t.education}</h2></div><ol className="lg:col-span-8 border-l border-primary-200 ml-2 space-y-8">{PROFILE.education.map((item) => <li key={item.period} className="relative pl-7"><span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary-600 ring-4 ring-primary-50" /><p className="text-xs font-bold uppercase tracking-wider text-primary-700">{item.period}</p><h3 className="mt-1 text-lg font-heading font-bold text-slate-900">{item.degree}</h3><p className="mt-1 text-sm text-slate-600">{item.institution} · {item.location}</p><p className="mt-2 text-sm text-slate-600">{item.description}</p></li>)}</ol></section>
    <section className="grid lg:grid-cols-12 gap-8 lg:gap-16"><div className="lg:col-span-4 flex items-center gap-3"><BriefcaseBusiness className="w-5 h-5 text-primary-600" /><h2 className={heading}>{t.professional}</h2></div><article className="lg:col-span-8 border-y border-slate-200 py-7"><p className="text-xs font-bold uppercase tracking-wider text-accent-700">{t.galaxyLabel}</p><h3 className="mt-2 text-xl font-heading font-extrabold text-slate-900">{t.galaxy}</h3><p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">{t.galaxyText}</p><Link href={href('/projects/gtm')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">{t.galaxyLink}<ArrowRight className="w-4 h-4" /></Link></article></section>
    <section className="grid lg:grid-cols-12 gap-8 lg:gap-16"><div className="lg:col-span-4 flex items-center gap-3"><Users className="w-5 h-5 text-accent-600" /><h2 className={heading}>{t.association}</h2></div><article className="lg:col-span-8 border-l-2 border-accent-300 bg-accent-50/60 px-6 py-6 sm:px-8"><h3 className="text-xl font-heading font-extrabold text-slate-900">{t.cestom}</h3><p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent-800">{t.currentEngagement}</p><p className="mt-1 text-base font-semibold text-slate-900">{t.currentRole}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">{t.cestomText}</p><div className="mt-5 border-t border-accent-200 pt-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-600">{t.previousEngagements}</p><ul className="mt-2 space-y-1 text-sm text-slate-700">{t.previous.map((item) => <li key={item}>{item}</li>)}</ul></div></article></section>
    <section className="space-y-8"><div className="space-y-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{t.method}</p><h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">{t.methodTitle}</h2></div><div className="grid md:grid-cols-3 gap-6">{t.steps.map(([title, text], index) => <article key={title} className="border-t-2 border-primary-200 pt-5"><p className="font-mono text-xs font-bold text-primary-700">0{index + 1}</p><h3 className="mt-2 text-lg font-heading font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p></article>)}</div></section>
    <section className="grid lg:grid-cols-12 gap-8 lg:gap-16"><div className="lg:col-span-4 flex items-center gap-3"><Puzzle className="w-5 h-5 text-primary-600" /><h2 className={heading}>{t.traits}</h2></div><div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">{t.proof.map(([title, text]) => <article key={title} className="space-y-2"><CheckCircle2 className="w-5 h-5 text-accent-600" /><h3 className="text-base font-heading font-bold text-slate-900">{title}</h3><p className="text-sm leading-relaxed text-slate-600">{text}</p></article>)}</div></section>
    <section className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"><div className="lg:col-span-4 flex items-center gap-3"><Compass className="w-5 h-5 text-primary-600" /><h2 className={heading}>{t.focus}</h2></div><div className="lg:col-span-8 rounded-card bg-primary-50 border border-primary-200/80 px-6 py-7 sm:px-8"><p className="max-w-2xl text-base leading-relaxed text-slate-700">{t.focusText}</p></div></section>
    <section className="max-w-3xl border-t border-slate-200 pt-10"><div className="flex items-center gap-3"><Lightbulb className="w-5 h-5 text-accent-600" /><h2 className={heading}>{t.beyond}</h2></div><p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">{t.beyondText}</p></section>
    <section className="rounded-2xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-10 text-white"><h2 className="text-2xl sm:text-3xl font-heading font-extrabold">{t.cta}</h2><div className="mt-6 flex flex-col sm:flex-row gap-3"><Button href={href('/projects')} variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>{t.projects}</Button><Button href={href('/contact')} variant="outline" size="md" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:border-slate-500">{t.contact}</Button><Button href={PROFILE.contact.cvPath} isExternal variant="ghost" size="md" className="text-slate-200 hover:bg-slate-800 hover:text-white" leftIcon={<FileText className="w-4 h-4" />}>{t.cv}</Button></div></section>
  </div>;
}
