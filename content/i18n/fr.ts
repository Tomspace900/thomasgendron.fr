import type { Dictionary } from "./types";

export const fr = {
  meta: {
    description:
      "Thomas Gendron — développeur full-stack à Paris. Un portfolio, trois interfaces : Riso, Vercel et Word 97.",
  },
  header: {
    skipToContent: "Aller au contenu",
  },
  skins: {
    riso: "Riso",
    clean: "Vercel",
    word: "Word 97",
  },
  manifesto: {
    punch: "Aujourd'hui, n'importe qui fait un beau frontend en une après-midi.",
    body: "Ce n'est plus ça qui fait la différence — alors je ne m'en suis pas privé, j'en ai fait trois.",
    pick: "À vous de choisir :",
  },
  word: {
    docTitle: "Microsoft Word - thomasgendron_CV_FINAL_v5(1).doc",
    menus: ["Fichier", "Édition", "Affichage", "Insertion", "Format", "Outils", "?"],
    pageInfo: "Page 1 sur 1   Sec 1   À 2,5 cm   Li 1   Col 1",
    clippy:
      "Il semble que vous essayiez de recruter un développeur full-stack. Voulez-vous de l'aide ?",
    figure: "Figure",
    switching: "Changement d'affichage en cours…",
  },
  hero: {
    hello: "Bonjour, moi c'est",
    tagline: "Développeur full-stack basé à Paris.",
    scroll: "Faites défiler",
    trioCaption: "Le même moi, trois registres",
  },
  personas: {
    linkedin: { label: "LinkedIn", tagline: "Un peu plus formel" },
    github: { label: "GitHub", tagline: "Un peu plus technique" },
    instagram: { label: "Instagram", tagline: "Un peu plus personnel" },
  },
  about: {
    number: "01",
    title: "À propos",
    body: "[BIO À FOURNIR — un vrai paragraphe qui raconte qui est Thomas : développeur full-stack, formation d'ingénieur EFREI, passé par la physique à Orsay et un semestre à Kuala Lumpur, goût pour les projets géo, le voyage et la photo. Ce texte sera remplacé par la version écrite par Thomas.]",
  },
  experience: {
    number: "02",
    title: "Parcours",
  },
  projects: {
    number: "03",
    title: "Projets",
    seeCode: "Voir le code",
    seeLive: "Voir en ligne",
    privateRepo: "Repo privé",
    kinds: {
      perso: "Perso",
      pro: "Pro",
      scolaire: "École",
    },
    items: {
      geodoku:
        "Puzzle géographique quotidien : une grille 3×3 à remplir en croisant des critères sur les pays. Un nouveau défi chaque jour.",
      "phase-diversity":
        "Outil de recherche pour astronomes : interface web autour de l'algorithme de phase diversity d'Eric Gendron, pour analyser les aberrations optiques des télescopes.",
      tomato:
        "Plateforme de suivi d'objets perdus via QR codes : web, mobile et backend Supabase. Contribution au projet de Victor Billaud.",
      "revision-droit":
        "Outil de révision générique : PWA mobile-first qui transforme un PDF de cours en fiches interactives, quiz et assistant IA — sans backend.",
      sesame:
        "Coffre-fort intelligent pour centraliser et surveiller achats, abonnements et voyages au même endroit.",
      opheli:
        "Dématérialisation des ordonnances médicales : API Express et front React.",
    },
  },
  photos: {
    number: "04",
    title: "Je voyage, et je prends des photos",
    showMore: "Voir plus de photos",
    showLess: "En voir moins",
  },
  hireMe: {
    number: "05",
    title: "Pourquoi me recruter ?",
    intro:
      "Dites-moi qui vous êtes et ce que vous cherchez — l'IA rédige une réponse sur mesure.",
    formLabel: "Votre contexte",
    placeholder:
      "Ex. « Je recrute un dev full-stack chez ACME, stack React/Node, équipe de 6 »",
    submit: "Générer la réponse",
    loading: "Génération en cours…",
    stamp: "Candidat idéal",
    errorGeneric: "Quelque chose a coincé. Réessayez dans un instant.",
    errorRateLimit:
      "Doucement ! Trop de demandes d'un coup — réessayez dans une minute.",
    disclaimer:
      "Réponse générée par IA à partir d'un profil rédigé par Thomas. À prendre avec humour (mais pas que).",
  },
  contact: {
    number: "06",
    title: "Contact",
    catch: "Un projet, un poste, une question — ou juste envie de dire bonjour ?",
    emailButton: "M'écrire un email",
    cvButton: "Télécharger mon CV",
    marquee: "Disponible pour de nouvelles aventures",
  },
  footer: {
    credits: "Conçu et développé par Thomas Gendron",
  },
} satisfies Dictionary;
