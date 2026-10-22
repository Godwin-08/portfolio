# Godwin Elie Nougbolo — Portfolio

Portfolio professionnel de Godwin Elie Nougbolo, étudiant ingénieur en Informatique et Ingénierie des Données à l’ENSA Khouribga. Il présente son parcours, ses compétences et ses projets à travers une identité visuelle contrastée et expressive : tons encre et papier, accents cobalt et corail, typographie éditoriale et visuels issus des projets.

## Contenu

- Accueil, présentation et contact, disponibles en français et en anglais.
- Projets filtrables par catégorie et compétence, avec leurs études de cas.
- Métadonnées localisées, navigation accessible au clavier et prise en charge de la préférence de réduction des animations.
- Présentation adaptée aux écrans mobiles et de bureau.

Le français est la langue par défaut; les pages anglaises utilisent le préfixe `/en`. Les métadonnées canoniques et sociales absolues nécessitent `NEXT_PUBLIC_SITE_URL` lorsqu’un domaine de production est défini.

## Technologies

- Next.js 16.4.2 (App Router), React 19 et TypeScript
- Tailwind CSS 4
- `next-intl` pour les traductions et le routage FR/EN
- Motion (`motion/react`) pour les animations
- MDX, Lucide React
- Vitest, Testing Library et Playwright (Chromium)

## Installation et développement

```bash
npm ci
npm run dev
```

Le serveur de développement est disponible à l’adresse [http://localhost:3000](http://localhost:3000).

## Vérifications

```bash
npm test                 # tests unitaires
npm run type-check       # TypeScript
npm run lint             # ESLint
npm run build            # build de production
npx playwright install chromium  # installation initiale du navigateur
npm run start            # démarrer le serveur de production dans un terminal
npm run test:e2e         # lancer Chromium dans un autre terminal
```

Les tests E2E ciblent le serveur à `http://localhost:3000`. Lancez `npm run build`, puis `npm run start` dans un terminal avant `npm run test:e2e` dans un second. Pour utiliser une autre adresse, définissez `PLAYWRIGHT_BASE_URL` avant de lancer les tests.

## Organisation

- `src/app/[locale]` : pages localisées et métadonnées
- `src/components` : composants de mise en page, d’accueil et de projets
- `src/data` : profil, projets et compétences
- `messages` : traductions françaises et anglaises
- `src/content/projects` : contenu des études de cas en MDX
- `tests` : tests unitaires et scénarios Playwright
