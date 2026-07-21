# Plan - « Même contenu, trois présentations »

Concept : le toggle de design EST le pitch du site. Philosophie affichée :
« la présentation importe peu, c'est le contenu qui compte ». Trois skins,
un seul contenu, un seul layout logique.

- **riso** - la version actuelle « Surimpression » (encres, grain, misregistration)
- **clean** - pro/moderne/lisse : shadcn-like, vercel-like, emojis, sobre
- **(3e)** - à décider, doit trancher radicalement

## Réponse à la question « c'est possible avec Tailwind ? »

Oui, sans hack. Le principe n'est PAS de faire muter les classes Tailwind,
mais de séparer trois choses :

1. **Contenu** (déjà fait) : `content/` reste la vérité unique - i18n, projets,
   timeline, photos, liens. Aucun skin n'y touche.
2. **Composants par skin** : chaque skin implémente le même contrat de sections
   avec ses propres composants/classes. Les classes de tous les skins
   coexistent dans le build Tailwind sans conflit.
3. **Tokens par skin** : `data-skin="…"` sur `<html>` + un fichier de variables
   CSS par skin pour ce qui est token-isable (couleurs, radius, fonts).

## Architecture cible

```
components/skins/
  types.ts        # le contrat : SkinDef = { Header, Hero, About, Experience,
                  #   Projects, Photos, HireMe, Contact, Chrome } - props
                  #   identiques partout (dict, locale, données de content/)
  index.ts        # registre { riso, clean, … } + type Skin = keyof
  riso/           # ← l'existant déménage ici (sections/, fx/, PersonaPress…)
  clean/          # PR suivante
app/skins/riso.css, clean.css   # variables par skin, importées dans globals
lib/skin.ts       # cookie `skin` (même mécanique que `locale`), défaut riso
lib/hooks/useHireMe.ts  # logique headless partagée (fetch/status/validation) ;
                        # chaque skin ne refait que la présentation
components/SkinSwitcher # contrat commun (3 positions), stylé par chaque skin,
                        # présent dans chaque Header - le geste signature
```

- `page.tsx` : `const S = skins[await getSkin()]` puis `<S.Hero …/>` - avec les
  server components, **seul le code du skin actif part au client**.
- `layout.tsx` : pose `data-skin`, applique les fonts du skin actif
  (tout est déclaré dans `lib/fonts.ts`, `preload` réservé au skin par défaut).
- Bonus : `?skin=clean` en query string pour partager un lien avec un skin forcé.
- Le grain/curseur/wipes actuels deviennent le `Chrome` du skin riso.

## Étapes

1. ✅ **Refactor iso-fonctionnel** (fait) : tout déplacé vers `skins/riso/`,
   contrat thin `{ Header, Page, Chrome }` + registre + cookie `skin` +
   `proxy.ts` pour `?skin=` + SkinSwitcher (masqué tant qu'il n'y a qu'un
   skin). Logique HireMe extraite en hook headless `lib/hooks/useHireMe.ts`.
   Skin par défaut : riso (décision Thomas).
2. ✅ **Skin clean « Lisse »** (fait) : Geist + neutres shadcn, header sticky
   blur + nav ancres, emojis, light/dark AUTO via `light-dark()` +
   `color-scheme` (riso verrouillé clair). Libellés du toggle en i18n
   (`dict.skins`) : Encre/Lisse, Ink/Sleek.
3. ✅ **Skin word « Brut »** (fait) : pastiche Word 97 - fenêtre Win95,
   page blanche sur gris, Times justifié, WordArt, tableaux, squiggles
   rouges sur les noms de projets, Clippy pour l'IA, surligneur jaune,
   barre d'état. 100 % fontes système. `useCookieSwitch` partagé,
   contrat `Chrome` enrichi de `dict`.

## Triptyque complet ✅ - décisions actées

- Skin par défaut : **riso** · Toggle : **Riso / Vercel / Word 97** (mêmes noms FR/EN)
- ✅ **Manifesto** « La forme est devenue gratuite. Le fond, non. » dans les
  trois heroes, avec le **ThemePicker** central (`skins/ThemePicker.tsx`) :
  chaque bouton est stylé comme son thème cible.
- ✅ **Transitions théâtrales** (`skins/SkinTransition.tsx`, provider dans le
  layout, machine à états par timers - PAS par callbacks d'animation, peu
  fiables ici) : rideau d'encre / fondu / sablier Win95 (hold 900 ms).
- ✅ Vocabulaire encre retiré du dico partagé (réservé au visuel riso).
