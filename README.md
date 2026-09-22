# Portfolio Professionnel — Godwin Elie Nougbolo

Portfolio personnel et professionnel de **Godwin Elie Nougbolo**, étudiant ingénieur en 2e année en *Informatique et Ingénierie des Données (IID)*.

## 🚀 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion (respect de `prefers-reduced-motion`)
- **Icônes** : Lucide React
- **Internationalisation (i18n)** : `next-intl` (FR / EN)
- **Contenu** : MDX & Data Layer typé
- **Tests** : Vitest

## 📁 Arborescence du Projet

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

## 🛠️ Commandes Principales

```bash
# Lancer le serveur de développement
npm run dev

# Exécuter les vérifications de lint
npm run lint

# Lancer la suite de tests unitaires
npm test

# Compiler pour la production (SSG / Build Next.js)
npm run build

# Démarrer en mode production
npm start
```

## 🎯 Principes Clés

1. **Preuve > Affirmation** : Valorisation des projets, décisions techniques documentées et métriques réelles plutôt que des adjectifs vagues.
2. **Fil rouge** : *Comprendre → Analyser → Construire*.
3. **Thème clair uniquement** : Interface sobre, éditoriale et lisible.
