# thomasgendron.fr — v5 « Surimpression »

Site perso de Thomas Gendron, direction artistique risographie : encres franches
en aplats pleine page, grain de papier, calques mal calés.

**Stack** : Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · TypeScript

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de production
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

- `GEMINI_API_KEY` — clé Gemini pour la section « Pourquoi me recruter ? ».
  Jamais côté client : l'appel passe par `app/api/hire-me/route.ts`.
- `HIRE_ME_SYSTEM_PROMPT` — le pré-prompt (profil/ton/forces) rédigé par Thomas.
- `MOCK_HIRE_ME=1` — dev sans clé : la route renvoie une réponse canned.

Rate-limiting : fenêtre glissante en mémoire par IP (5/min, 20/jour) dans
`lib/rate-limit.ts`. Best-effort sur serverless ; passer à `@upstash/ratelimit`
si besoin d'une garantie multi-instances.

## Éditer le contenu

Tout le contenu vit dans `content/` :

| Fichier | Contenu |
|---|---|
| `content/i18n/fr.ts`, `en.ts` | tous les textes du site (typés par `types.ts`) |
| `content/projects.ts` | la sélection de projets (desc FR/EN, tags, liens) |
| `content/experience.ts` | la timeline parcours |
| `content/photos.ts` | les photos de voyage (`public/images/photos/`) |
| `content/site.ts` | email, liens sociaux, chemin du CV |

**Ajouter une langue** : créer `content/i18n/<locale>.ts` (le type `Dictionary`
guide toutes les clés) et l'ajouter au registre dans `content/i18n/index.ts`.

## Déployer (Vercel)

```bash
vercel
```

Renseigner `GEMINI_API_KEY` et `HIRE_ME_SYSTEM_PROMPT` dans les settings du
projet Vercel (ne PAS définir `MOCK_HIRE_ME` en prod).

## À fournir / remplacer (placeholders actuels)

- Bio (`about.body` dans `fr.ts`/`en.ts`)
- Dates exactes du stage Canal+ (`content/experience.ts`)
- Photos réelles + lieux (`content/photos.ts`)
- CV : remplacer `public/cv-thomas-gendron.pdf`
- Pré-prompt Gemini + clé API
- Email public (`content/site.ts`)
- Valider les descriptions des projets (`content/projects.ts`)
