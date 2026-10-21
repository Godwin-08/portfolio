This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Portfolio Professionnel — Godwin Elie Nougbolo

## Getting Started
Portfolio personnel et professionnel de **Godwin Elie Nougbolo**, étudiant ingénieur en 2e année en *Informatique et Ingénierie des Données (IID)*.

First, run the development server:
## 🚀 Stack Technique

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion (respect de `prefers-reduced-motion`)
- **Icônes** : Lucide React
- **Internationalisation (i18n)** : `next-intl` (FR / EN)
- **Contenu** : MDX & Data Layer typé
- **Tests** : Vitest

## SEO et domaine de production

Les métadonnées canoniques, `og:url` et les images sociales absolues s’appuient sur la variable `NEXT_PUBLIC_SITE_URL`. Configurez-la avec l’origine HTTPS du domaine de production une fois celui-ci confirmé. Aucune valeur n’est définie dans ce dépôt : sans domaine fiable, ces URL sont volontairement omises plutôt que remplacées par une adresse fictive. `next-intl` fournit les variantes de langue via l’en-tête HTTP `Link`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## 📁 Arborescence du Projet

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
```
portofolio/
├── messages/               # Fichiers de traductions (fr.json, en.json)
├── public/                 # Assets statiques
│   ├── cv/                 # CV téléchargeable
│   ├── icons/              # Icônes et favicons
│   └── images/             # Images et portraits
├── src/
│   ├── app/                # App Router Next.js
│   │   ├── about/          # Page À Propos
│   │   ├── contact/        # Page Contact
│   │   ├── projects/       # Page Projets et [slug] études de cas
│   │   ├── globals.css     # Styles globaux Tailwind
│   │   ├── layout.tsx      # Layout racine
│   │   └── page.tsx        # Page d'accueil
│   ├── components/         # Composants UI réutilisables
│   │   ├── home/           # Sections Hero, Skills, Projets Phares, Méthode
│   │   ├── layout/         # Navbar, Footer
│   │   ├── projects/       # Cartes projets, Filtres, Études de cas
│   │   └── ui/             # Primitives UI (Button, Badge, etc.)
│   ├── content/            # Contenu MDX des projets
│   │   └── projects/       # gtm.mdx, olist.mdx, afc.mdx
│   ├── data/               # Source de données découplée
│   │   ├── profile.ts      # Profil, bio, parcours, philosophie
│   │   ├── projects.ts     # Données des projets et métriques
│   │   └── skills.ts       # Compétences et mapping vers les projets
│   ├── i18n/               # Configuration de routage next-intl
│   │   ├── routing.ts      # Locales supportées (fr, en)
│   │   └── request.ts      # Chargement dynamique des messages
│   ├── lib/                # Utilitaires (cn, helpers)
│   ├── styles/             # Tokens CSS
│   └── types/              # Définitions TypeScript
├── tests/                  # Tests unitaires Vitest
├── tailwind.config.ts      # Configuration Tailwind (couleurs, polices)
├── tsconfig.json           # Configuration TypeScript & alias
└── package.json            # Scripts et dépendances
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
## 🛠️ Commandes Principales

## Learn More
```bash
# Lancer le serveur de développement
npm run dev

To learn more about Next.js, take a look at the following resources:
# Exécuter les vérifications de lint
npm run lint

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
# Lancer la suite de tests unitaires
npm test

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
# Compiler pour la production (SSG / Build Next.js)
npm run build

## Deploy on Vercel
# Démarrer en mode production
npm start
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
## 🎯 Principes Clés

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
1. **Preuve > Affirmation** : Valorisation des projets, décisions techniques documentées et métriques réelles plutôt que des adjectifs vagues.
2. **Fil rouge** : *Comprendre → Analyser → Construire*.
3. **Thème clair uniquement** : Interface sobre, éditoriale et lisible.
