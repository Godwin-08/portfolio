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

L’assistant appelle Cloudflare Workers AI côté serveur. Les identifiants Cloudflare ne doivent jamais être préfixés par `NEXT_PUBLIC_`, ajoutés au dépôt ou affichés dans les journaux. Sans identifiants, l’application conserve le moteur local de secours.

| Variable | Production | Preview | Development |
| --- | --- | --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | À configurer si l’IA Cloudflare est activée | Facultative; utiliser un compte de test séparé ou laisser le moteur local | Facultative dans le `.env.local` ignoré par Git |
| `CLOUDFLARE_API_TOKEN` | Secret Vercel, avec les permissions minimales nécessaires à Workers AI | Secret de test distinct, ou non configuré | Secret local uniquement dans le `.env.local` ignoré |
| `CLOUDFLARE_AI_MODEL` | `@cf/meta/llama-3.2-3b-instruct` | Même modèle si les appels de Preview sont autorisés | Facultative; le code utilise ce modèle par défaut |
| `NEXT_PUBLIC_SITE_URL` | Origine HTTPS canonique du site | URL stable de Preview si les métadonnées de cette version doivent être absolues | `http://localhost:3000` |

Dans **Vercel → projet → Settings → Environment Variables**, affectez chaque variable uniquement aux environnements indiqués. Les deux variables `CLOUDFLARE_*` sensibles restent côté serveur. Séparez les identifiants Production et Preview, surveillez les quotas Cloudflare et ne fournissez pas de jeton de production aux previews non fiables.

### Limitation des requêtes

La route limite également chaque adresse suivie à 15 requêtes par minute dans la mémoire de chaque instance. Sur Vercel, elle utilise l’en-tête `x-vercel-forwarded-for` fourni par la plateforme plutôt que l’en-tête transféré contrôlable par le client. C’est une protection complémentaire, **pas une limite globale** : les instances serverless n’en partagent pas l’état et cette mémoire peut être réinitialisée.

Avant d’activer l’IA Cloudflare en production, configurer et publier une règle Vercel WAF :

1. Dans le tableau de bord Vercel, ouvrir le projet puis **Firewall → Configure → + New Rule**.
2. Ajouter les conditions **Path equals `/api/ai/match`** et **Method equals `POST`**.
3. Choisir l’action **Rate Limit**, l’algorithme **Fixed Window**, une clé de comptage **IP**, une fenêtre initiale de **60 secondes** et une limite initiale de **15 requêtes**. Garder l’action de dépassement **429**. Voir la [documentation Vercel sur le rate limiting WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
4. Enregistrer les changements avec **Review Changes → Publish** puis observer la règle dans la vue Firewall et vérifier les dépassements avant d’ouvrir le trafic.

Selon la documentation Vercel consultée le 30 octobre 2026, le rate limiting WAF est proposé sur tous les plans; Hobby autorise une règle et inclut un quota de requêtes autorisées, tandis que Pro est facturé à l’usage. Vérifier les conditions et tarifs affichés dans le compte avant publication. Les compteurs sont **par région** : une même source répartie sur plusieurs régions peut dépasser la limite configurée. Cette règle réduit le trafic à l’edge, mais ne constitue pas un plafond strict et global pour toutes les régions. Une limite globale stricte nécessiterait un compteur partagé; aucun stockage ni service externe n’est inclus dans cette application.

Jusqu’à publication et vérification de la règle WAF, ne pas considérer la limitation edge comme active. Même après activation, maintenir des plafonds de dépense/quotas côté Cloudflare et surveiller les appels à l’API.

## Organisation

- `src/app/[locale]` : pages localisées et métadonnées
- `src/components` : composants de mise en page, d’accueil et de projets
- `src/data` : profil, projets et compétences
- `messages` : traductions françaises et anglaises
- `src/content/projects` : contenu des études de cas en MDX
- `tests` : tests unitaires et scénarios Playwright
