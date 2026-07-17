import type { Dictionary } from "./types";

export const fr = {
  meta: {
    description:
      "Thomas Gendron — développeur full-stack à Paris. Tout ce qu'il y a à savoir sur moi, et même davantage.",
  },
  header: {
    skipToContent: "Aller au contenu",
  },
  hero: {
    hello: "Bonjour, moi c'est",
    tagline: "Tout ce qu'il y a à savoir sur moi, et même davantage.",
    scroll: "Faites défiler",
    trioCaption: "Le même moi, trois encres",
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
    intro: "Une sélection curée, tirée de mon GitHub.",
    seeCode: "Voir le code",
    seeLive: "Voir en ligne",
    privateRepo: "Repo privé",
  },
  photos: {
    number: "04",
    title: "Je voyage, et je prends des photos",
    hint: "Survolez pour révéler les couleurs",
  },
  hireMe: {
    number: "05",
    title: "Pourquoi me recruter ?",
    intro:
      "Dites-moi qui vous êtes et ce que vous cherchez — l'atelier imprime une réponse sur mesure.",
    formLabel: "Votre contexte",
    placeholder:
      "Ex. « Je recrute un dev full-stack chez ACME, stack React/Node, équipe de 6 »",
    submit: "Imprimer la réponse",
    loading: "Encrage en cours…",
    stamp: "Candidat idéal",
    errorGeneric: "La machine est à court d'encre. Réessayez dans un instant.",
    errorRateLimit:
      "Le rouleau chauffe ! Trop de tirages d'un coup — réessayez dans une minute.",
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
    credits: "Conçu et imprimé numériquement par Thomas Gendron",
  },
} satisfies Dictionary;
