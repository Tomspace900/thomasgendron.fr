# thomasgendron.fr - v5 « Surimpression »

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

- `GEMINI_API_KEY` - clé Gemini pour la section « Demandez-moi n'importe quoi ».
  Jamais côté client : l'appel passe par `app/api/ask/route.ts`.
- `MOCK_ASK=1` - dev sans clé : la route streame une réponse de démo.
- `GEMINI_MODEL` (optionnel) - défaut `gemini-2.5-flash`.

Rate-limiting : fenêtre glissante en mémoire par IP (5/min, 20/jour) dans
`lib/rate-limit.ts`. Best-effort sur serverless ; passer à `@upstash/ratelimit`
si besoin d'une garantie multi-instances.

## La section IA - Q&A ancré

Un visiteur pose n'importe quelle question sur Thomas (technique, RH, ou
« est-ce qu'il aime les pâtes ? »). La réponse est **ancrée** sur
`content/ai-corpus.ts` : le modèle n'a le droit de parler que de ce qui s'y
trouve, et doit dire qu'il ne sait pas sinon. **Pour nourrir l'IA, on édite
ce seul fichier** - pas de variable d'environnement, pas de base vectorielle
(le corpus tient en quelques milliers de tokens ; un RAG serait de la
sur-ingénierie ici).

- Réponse **en streaming** (`ReadableStream` côté route, lecture incrémentale
  dans `lib/hooks/useAsk.ts`).
- **Sources citées** : le modèle termine par un marqueur
  `<<<META>>>{"sources":[…],"jobMatch":bool}` que le client parse sans jamais
  l'afficher. Les ids valides sont ceux de `content/ai-sources.ts`, qui les
  mappe vers les ancres des sections.
- **Voix par thème** : même corpus, trois tons (Riso imagé, Vercel direct,
  Word 97 en assistant Office sur-poli) - la thèse du site appliquée à l'IA.
- `jobMatch` déclenche le tampon « Candidat idéal » quand la question
  ressemble à une fiche de poste.

## Skins - « même contenu, trois présentations »

Le design est découplé du contenu : chaque skin implémente le contrat
`components/skins/types.ts` (`Header` + `Page` + `Chrome`, mêmes props
partout) avec ses propres composants. Sélection par cookie `skin`
(défaut `riso`), lien partageable via `?skin=<nom>` (géré par `proxy.ts`).
Seul le code du skin actif est envoyé au client (server components).

Ajouter un skin : créer `components/skins/<nom>/` qui exporte un `SkinDef`,
puis l'enregistrer dans `components/skins/meta.ts` (nom + libellé du toggle)
et `components/skins/index.ts`. Le `SkinSwitcher` apparaît automatiquement
dès qu'il y a au moins deux skins. Plan détaillé : `docs/PLAN-skins.md`.

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

Renseigner `GEMINI_API_KEY` dans les settings du projet Vercel
(ne PAS définir `MOCK_ASK` en prod).

## À fournir / remplacer (placeholders actuels)

- Bio (`about.body` dans `fr.ts`/`en.ts`)
- Dates exactes du stage Canal+ (`content/experience.ts`)
- Lieux et descriptions des photos (`content/photos.ts`)
- CV : remplacer `public/cv-thomas-gendron.pdf`
- **Corpus de l'IA** (`content/ai-corpus.ts`) : tous les blocs `[À COMPLÉTER]`
  - c'est ce qui détermine la qualité des réponses. Plus il est riche et
  précis, meilleure est la section.
- Clé `GEMINI_API_KEY`
- Email public (`content/site.ts`)
- Valider les descriptions des projets (`content/projects.ts`)
