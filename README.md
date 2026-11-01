# Godwin Elie NOUGBOLO — Portfolio

Portfolio professionnel de Godwin Elie NOUGBOLO, étudiant ingénieur en Informatique et Ingénierie des Données à l’ENSA Khouribga. Il présente son parcours, ses compétences et ses projets à travers une identité visuelle contrastée et expressive : tons encre et papier, accents cobalt et corail, typographie éditoriale et visuels issus des projets.

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

## Déploiement Vercel et assistant IA

L’assistant utilise Cloudflare Workers AI comme moteur principal et le moteur local de recherche par mots-clés comme solution de secours. Les réponses et références sont validées puis reconstruites à partir du corpus documenté du portfolio. Les erreurs fournisseur, les quotas, les délais d’attente et l’absence d’identifiants déclenchent le moteur local, sans nouvelle tentative.

| Variable | Production | Preview | Development |
| --- | --- | --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Identifiant du compte Cloudflare si Workers AI est activé | À configurer pour activer Workers AI sur Preview | Facultative; laisser absente pour utiliser le moteur local |
| `CLOUDFLARE_API_TOKEN` | Secret Cloudflare côté serveur, avec les permissions minimales Workers AI | Secret Preview distinct si Workers AI est activé | Facultative; ne jamais l’ajouter au dépôt |
| `CLOUDFLARE_AI_MODEL` | `@cf/meta/llama-3.2-3b-instruct` par défaut | Même modèle que Production | Facultative; le code utilise le modèle par défaut |
| `NEXT_PUBLIC_SITE_URL` | Origine HTTPS canonique du site | URL stable de Preview si les métadonnées de cette version doivent être absolues | `http://localhost:3000` |

Utiliser exclusivement l’offre **Workers Free**. Ne pas passer à Workers Paid, activer la facturation à l’usage, ni ajouter des crédits AI Gateway. Les valeurs des variables sensibles ne doivent jamais être préfixées par `NEXT_PUBLIC_`, affichées dans les journaux ou copiées entre environnements.

### Limitation des requêtes

La route limite également chaque adresse suivie à 15 requêtes par minute dans la mémoire de chaque instance. Sur Vercel, elle utilise l’en-tête `x-vercel-forwarded-for` fourni par la plateforme plutôt que l’en-tête transféré contrôlable par le client. C’est une protection complémentaire, **pas une limite globale** : les instances serverless n’en partagent pas l’état et cette mémoire peut être réinitialisée. Aucune règle WAF personnalisée ni limite globale partagée n’est configurée.

## Organisation

- `src/app/[locale]` : pages localisées et métadonnées
- `src/components` : composants de mise en page, d’accueil et de projets
- `src/data` : profil, projets et compétences
- `messages` : traductions françaises et anglaises
- `src/content/projects` : contenu des études de cas en MDX
- `tests` : tests unitaires et scénarios Playwright
