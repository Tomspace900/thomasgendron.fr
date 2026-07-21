import type { Dictionary } from "./types";

export const fr = {
  meta: {
    description:
      "Thomas Gendron - ingénieur full-stack à Paris. Un portfolio, trois interfaces : Graphique, Vercel et Word 97.",
  },
  header: {
    skipToContent: "Aller au contenu",
  },
  skins: {
    riso: "Graphique",
    clean: "Vercel",
    word: "Word 97",
  },
  manifesto: {
    punch: "Choisissez le style",
    body: "Aujourd'hui, n'importe qui sort un beau front-end en un prompt. La forme ne prouve plus rien. Alors tant qu'à faire, j'en ai fait trois, le contenu reste le même.",
    pick: "Essayez :",
  },
  word: {
    docTitle: "Microsoft Word - thomasgendron_CV_FINAL_v5(1).doc",
    menus: ["Fichier", "Édition", "Affichage", "Insertion", "Format", "Outils", "?"],
    pageInfo: "Page 1 sur 1   Sec 1   À 2,5 cm   Li 1   Col 1",
    clippy:
      "Il semble que vous essayiez de recruter un développeur full-stack. Voulez-vous de l'aide ?",
    figure: "Figure",
    switching: "Changement d'affichage en cours…",
  },
  hero: {
    hello: "Bonjour, je suis",
    tagline: "Ingénieur full-stack basé à Paris.",
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
    title: "En bref",
    body: [
      "Passionné par la physique et les sciences en général. J'ai découvert l'informatique via son utilisation dans l'analyse scientifique d'abord, et j'y ai pris goût.",
      "Aujourd'hui ingénieur full-stack chez Canal+, en CDI après mon stage de fin d'études. Au quotidien je travaille sur des applications et architectures complexes : TypeScript, React, Nest, Kube, AWS, Jenkins…",
      "En perso : j'aime accompagner un projet sur toutes ses étapes, de l'idée de base jusqu'à la production, en expérimentant des technos à chaque fois ; c'est là que j'apprends le plus vite.",
    ],
  },
  experience: {
    number: "02",
    title: "Mon parcours",
  },
  projects: {
    number: "03",
    title: "Mes projets",
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
        "Puzzle géographique quotidien : une grille de 3×3 pays à remplir en croisant des critères. Algorithmes de génération et planification des grilles autonomes côté serveur. UI/UX, référencement, monitoring, etc.",
      "phase-diversity":
        "Interface web qui enveloppe un algorithme Python existant utilisé par des astrophysiciens. Un outil de recherche pour ajuster des paramètres optiques, visualiser la reconstruction du front d'onde, et suivre le tuning de l'algorithme de diversité de phase.",
      tomato:
        "Suivi d'objets perdus par QR code avec messagerie instantanée sans compte. Web et mobile.",
      "revision-droit":
        "PWA mobile-first qui transforme un PDF de prises de notes de cours en une application complète de révision : fiches de cours, notions, lexique, quiz vrai/faux, mises en situation, questions ouvertes, et chatbot IA pour toute question.",
      sesame:
        "Coffre-fort personnel : détecte achats, abonnements, voyages et réservations depuis la boîte mail et centralise en dossiers. Permet de savoir quand les garanties expirent, les livraisons de colis, retrouver une réservation d'hôtel, etc.",
      opheli:
        "Dématérialisation des ordonnances médicales : accès quadri-parties (médecin, patient, pharmacien, mutuelles). Une entité numérique qui supporte les renouvellements, médicaments génériques, suivis de remboursement, etc.",
    },
    takeaways: {
      geodoku:
        "Mon premier projet perso poussé aussi loin. Une production qui tourne, des dizaines de joueurs chaque jour. J'en suis fier.",
      "phase-diversity":
        "Développé pour mon père, astronome. L'outil n'est pas en production mais utilisé localement par les astrophysiciens pour la recherche scientifique.",
      tomato:
        "Projet d'école, le jury nous a poussés à amener le produit sur le marché, propositions à l'appui. Mais encore trop étudiant pour aller au bout de l'idée.",
      "revision-droit":
        "Vibe-codé en quelques jours pour les partiels de ma copine. Étonnamment efficace et utile pour le peu de temps passé dessus.",
      sesame:
        "Marche très bien pour une utilisation personnelle, mais le coût IA n'aurait pas été viable pour déployer à grande échelle.",
      opheli:
        "Mon plus vieux projet ici, le premier mené jusqu'au bout : vidéo de communication, données de santé. Pas destiné à la production mais très formateur.",
    },
  },
  photos: {
    number: "04",
    title: "Plus personnel",
    showMore: "Voir plus de photos",
    showLess: "En voir moins",
  },
  concierge: {
    mute: "Chut",
    unmute: "Rallumer le concierge",
    muted: "Concierge en sourdine.",
    why: "Comment je sais ça",
    whyTitle: "Signaux observés",
    offline: "réplique écrite d'avance (pas de clé API)",
  },
  debrief: {
    number: "05",
    title: "Le mot de la fin",
    loading: "Relecture de votre visite…",
    disclaimer:
      "Écrit à l'instant d'après votre visite. Rien n'est enregistré : tout vit dans votre onglet.",
  },
  contact: {
    number: "06",
    title: "Me contacter",
    catch:
      "Une question ? Un projet ? Un poste de CTO ? Peut-être juste une envie de dire bonjour ?",
    emailButton: "M'écrire un email",
    cvButton: "Télécharger mon CV",
    marquee: "Ouvert aux propositions",
  },
  footer: {
    credits: "Conçu et développé par Thomas Gendron",
  },
} satisfies Dictionary;
