// Catalogue de départ du plan de nettoyage, organisé par ZONE (cuisine professionnelle complète).
// Ce sont des PROPOSITIONS génériques (aucune marque) : produit courant + protocole type + fréquence usuelle,
// alignées sur les repères du guide de bonnes pratiques d'hygiène (GBPH) du restaurateur.
// C'est à l'établissement de valider ou d'adapter : produits réellement utilisés, dosage selon la fiche technique du produit,
// fréquences selon ses risques. Rien n'est enregistré tant que le responsable ne valide pas une ligne.

export const PRODUITS_NETTOYAGE_SUGGERES = [
  "Dégraissant alimentaire",
  "Nettoyant désinfectant alimentaire",
  "Détergent alimentaire",
  "Désinfectant alimentaire",
  "Détartrant alimentaire",
  "Nettoyant four et grill (usage alimentaire)",
  "Détergent sols",
  "Désinfectant sols",
  "Produit lave-vaisselle et liquide de rinçage",
  "Nettoyant désinfectant sanitaires",
  "Nettoyant vitres et surfaces",
  "Produit spécifique machine (pastilles, cartouche…)",
  "Eau chaude et savon",
];

const P = {
  degraisser: ["Retirer les débris et les résidus", "Appliquer le dégraissant sur toute la surface", "Laisser agir le temps indiqué sur l'étiquette", "Frotter, puis rincer à l'eau claire", "Essuyer ou laisser sécher à l'air"],
  desinfecter: ["Retirer les débris", "Nettoyer à l'eau chaude avec un détergent alimentaire", "Rincer à l'eau claire", "Appliquer le désinfectant, respecter le temps de contact", "Rincer à l'eau claire si l'étiquette l'indique, laisser sécher"],
  appareil: ["Éteindre et débrancher, laisser refroidir", "Démonter les pièces amovibles", "Laver les pièces au détergent, rincer", "Nettoyer le corps de l'appareil, désinfecter les surfaces en contact avec les aliments", "Rincer, sécher, remonter"],
  chaud: ["Laisser refroidir l'appareil", "Retirer les résidus et la graisse", "Appliquer le produit adapté, laisser agir", "Frotter, rincer et essuyer", "Remettre en service et vérifier"],
  frigo: ["Sortir ou protéger les denrées (maintenir au froid)", "Nettoyer parois, clayettes et joints au détergent", "Rincer, puis désinfecter", "Sécher, remettre les denrées", "Vérifier la température"],
  sol: ["Balayer ou ramasser les déchets", "Laver à l'eau chaude avec le détergent sols", "Désinfecter (temps de contact)", "Rincer si besoin", "Laisser sécher"],
  sanitaires: ["Porter des gants dédiés", "Appliquer le nettoyant désinfectant sanitaires", "Frotter cuvettes, lavabos, robinets, poignées", "Rincer, essuyer", "Réapprovisionner savon, papier, essuie-mains"],
  simple: ["Retirer ce qui encombre", "Nettoyer avec le produit", "Rincer ou essuyer", "Laisser sécher"],
  poubelle: ["Vider et fermer le sac", "Laver l'intérieur et l'extérieur de la poubelle", "Désinfecter, rincer", "Laisser sécher, remettre un sac propre"],
};

// f : qs = chaque jour (soir) · qms = chaque jour (midi et soir) · h = chaque semaine · m = chaque mois
const FREQ = {
  qs: { frequence: "Quotidienne", moments: ["soir"] },
  qms: { frequence: "Quotidienne", moments: ["midi", "soir"] },
  h: (jour) => ({ frequence: "Hebdomadaire", jours: [jour || "Lundi"], moments: ["soir"] }),
  m: { frequence: "Mensuelle", positionMois: 1, jourSemaineMois: "Dimanche", moments: ["soir"] },
};
const el = (nom, produit, proto, f, duree, jour) => ({
  nom, produit, etapes: P[proto] || P.simple, duree,
  planning: typeof FREQ[f] === "function" ? FREQ[f](jour) : { ...FREQ[f] },
});

const DEG = "Dégraissant alimentaire";
const DESI = "Nettoyant désinfectant alimentaire";
const DETE = "Détergent alimentaire";
const DETA = "Détartrant alimentaire";

export const CATALOGUE_NETTOYAGE = [
  { nom: "Tous", couleur: "#5B6B7A", elements: [
    el("Sols de la cuisine", "Désinfectant sols", "sol", "qms", 20),
    el("Murs et carrelage (zones de projection)", DEG, "degraisser", "h", 20, "Samedi"),
    el("Plafond et bouches d'aération", DETE, "simple", "m", 30),
    el("Poignées de portes et interrupteurs", DESI, "desinfecter", "qms", 5),
    el("Lave-mains (robinet, bac, distributeurs)", DESI, "desinfecter", "qms", 5),
    el("Poubelles de cuisine", DESI, "poubelle", "qs", 10),
    el("Siphons et bouches d'évacuation", DESI, "desinfecter", "h", 10, "Mercredi"),
    el("Chiffons, éponges et balais", DESI, "desinfecter", "qs", 5),
    el("Pièges et dispositifs anti-nuisibles (contrôle visuel)", "Aucun", "simple", "h", 5, "Lundi"),
  ] },
  { nom: "Poste Chaud", couleur: "#D9691A", elements: [
    el("Piano / plaques de cuisson", DEG, "chaud", "qs", 15),
    el("Four (mixte ou statique)", "Nettoyant four et grill (usage alimentaire)", "chaud", "qs", 20),
    el("Friteuse", DEG, "chaud", "h", 30, "Vendredi"),
    el("Plancha / gril", "Nettoyant four et grill (usage alimentaire)", "chaud", "qs", 15),
    el("Salamandre", "Nettoyant four et grill (usage alimentaire)", "chaud", "h", 15, "Mardi"),
    el("Marmite / sauteuse / bain-marie", DEG, "degraisser", "qs", 10),
    el("Hotte et filtres", DEG, "degraisser", "h", 30, "Dimanche"),
    el("Plans de travail inox", DESI, "desinfecter", "qms", 10),
    el("Étagères et supports", DETE, "simple", "h", 10, "Jeudi"),
    el("Plonge de poste et évier", DESI, "desinfecter", "qs", 10),
  ] },
  { nom: "Poste Froid", couleur: "#2B6FD1", elements: [
    el("Plan de travail réfrigéré (saladette)", DESI, "frigo", "qs", 15),
    el("Plans de travail inox", DESI, "desinfecter", "qms", 10),
    el("Trancheur à jambon / charcuterie", DESI, "appareil", "qs", 15),
    el("Robot / mixeur / cutter", DESI, "appareil", "qs", 10),
    el("Planches à découper", DESI, "desinfecter", "qms", 5),
    el("Frigo de poste", DESI, "frigo", "h", 20, "Lundi"),
    el("Étagères et supports", DETE, "simple", "h", 10, "Jeudi"),
    el("Évier de poste", DESI, "desinfecter", "qs", 10),
  ] },
  { nom: "Poste Pizza", couleur: "#8D5A33", elements: [
    el("Four à pizza (sole et voûte)", "Nettoyant four et grill (usage alimentaire)", "chaud", "qs", 20),
    el("Pétrin / batteur", DESI, "appareil", "qs", 15),
    el("Laminoir / façonneuse à pâte", DESI, "appareil", "qs", 15),
    el("Plan de travail pizza", DESI, "desinfecter", "qms", 10),
    el("Tour réfrigérée", DESI, "frigo", "h", 20, "Mardi"),
    el("Pelles, grilles et plaques", DETE, "simple", "qs", 10),
  ] },
  { nom: "Pâtisserie", couleur: "#C2549B", elements: [
    el("Four pâtissier", "Nettoyant four et grill (usage alimentaire)", "chaud", "h", 20, "Lundi"),
    el("Batteur mélangeur et accessoires", DESI, "appareil", "qs", 15),
    el("Laminoir à pâte", DESI, "appareil", "qs", 15),
    el("Plan de travail (inox, marbre)", DESI, "desinfecter", "qms", 10),
    el("Machine à glace / sorbetière", DESI, "appareil", "qs", 20),
    el("Moules, cadres et poches", DETE, "simple", "qs", 10),
    el("Frigo de pâtisserie", DESI, "frigo", "h", 20, "Jeudi"),
  ] },
  { nom: "Préparation viandes et poissons", couleur: "#B58900", elements: [
    el("Plans de travail viande", DESI, "desinfecter", "qms", 10),
    el("Plans de travail poisson", DESI, "desinfecter", "qms", 10),
    el("Hachoir / machine à hacher", DESI, "appareil", "qs", 20),
    el("Planches à découper (codées par couleur)", DESI, "desinfecter", "qms", 5),
    el("Couteaux et ustensiles", DESI, "desinfecter", "qms", 5),
    el("Machine sous vide", DESI, "appareil", "qs", 10),
  ] },
  { nom: "Chambres froides", couleur: "#4A56C9", elements: [
    el("Chambre froide positive", DESI, "frigo", "h", 40, "Lundi"),
    el("Chambre froide négative / congélateur", DESI, "frigo", "m", 60),
    el("Cellule de refroidissement", DESI, "frigo", "h", 20, "Mercredi"),
    el("Frigos armoires", DESI, "frigo", "h", 20, "Mardi"),
    el("Joints et poignées de portes", DESI, "desinfecter", "h", 10, "Vendredi"),
    el("Sol de la chambre froide", "Désinfectant sols", "sol", "h", 15, "Lundi"),
  ] },
  { nom: "Réserves sèches", couleur: "#7C8B1F", elements: [
    el("Étagères de stockage", DETE, "simple", "h", 20, "Samedi"),
    el("Sol de la réserve", "Désinfectant sols", "sol", "h", 15, "Samedi"),
    el("Bacs et contenants de stockage", DETE, "simple", "m", 30),
    el("Local produits d'entretien", DETE, "simple", "m", 15),
  ] },
  { nom: "Réception", couleur: "#8E4FBF", elements: [
    el("Zone de réception des marchandises", DESI, "desinfecter", "qs", 10),
    el("Balance de réception", DESI, "desinfecter", "qs", 5),
    el("Chariots et diables", DETE, "simple", "h", 10, "Vendredi"),
    el("Sol de la zone de réception", "Désinfectant sols", "sol", "qs", 10),
  ] },
  { nom: "Plonge", couleur: "#12877A", elements: [
    el("Lave-vaisselle / lave-batterie", "Produit lave-vaisselle et liquide de rinçage", "appareil", "qs", 15),
    el("Filtres et bras de lavage du lave-vaisselle", DETA, "appareil", "h", 15, "Dimanche"),
    el("Bacs de plonge", DESI, "desinfecter", "qs", 10),
    el("Égouttoirs et paillasses", DESI, "desinfecter", "qs", 10),
    el("Poubelles de tri", DESI, "poubelle", "qs", 10),
    el("Sol et siphon de plonge", "Désinfectant sols", "sol", "qs", 10),
  ] },
  { nom: "Bar", couleur: "#1F3A5F", elements: [
    el("Plan de bar et comptoir", DESI, "desinfecter", "qms", 10),
    el("Machine à café", "Produit spécifique machine (pastilles, cartouche…)", "appareil", "qs", 15),
    el("Tireuse à bière (circuit et becs)", "Produit spécifique machine (pastilles, cartouche…)", "appareil", "h", 20, "Lundi"),
    el("Machine à glaçons", DESI, "appareil", "m", 30),
    el("Lave-verres", "Produit lave-vaisselle et liquide de rinçage", "appareil", "qs", 10),
    el("Frigos de bar", DESI, "frigo", "h", 20, "Mercredi"),
  ] },
  { nom: "Salle", couleur: "#2F8F4E", elements: [
    el("Tables et chaises", DESI, "desinfecter", "qms", 20),
    el("Banquettes", DETE, "simple", "h", 20, "Lundi"),
    el("Sol de la salle", "Détergent sols", "sol", "qs", 20),
    el("Vitres et baies vitrées", "Nettoyant vitres et surfaces", "simple", "h", 20, "Mardi"),
    el("Cartes et menus", DESI, "desinfecter", "qs", 5),
    el("Terrasse (tables, chaises, sol)", DETE, "simple", "qs", 20),
  ] },
  { nom: "Sanitaires et vestiaires", couleur: "#17A2B8", elements: [
    el("Sanitaires clients", "Nettoyant désinfectant sanitaires", "sanitaires", "qms", 20),
    el("Sanitaires du personnel", "Nettoyant désinfectant sanitaires", "sanitaires", "qs", 15),
    el("Vestiaires et casiers", DETE, "simple", "h", 15, "Vendredi"),
    el("Lave-mains du personnel", DESI, "desinfecter", "qs", 5),
  ] },
  { nom: "Poubelles et extérieur", couleur: "#9C6B98", elements: [
    el("Local poubelles", DESI, "sol", "h", 20, "Mardi"),
    el("Conteneurs et bacs extérieurs", DESI, "poubelle", "h", 15, "Jeudi"),
    el("Bac à graisses", "Produit spécifique machine (pastilles, cartouche…)", "simple", "m", 40),
    el("Abords et accès livraison", DETE, "simple", "h", 10, "Samedi"),
  ] },
];

// Couleurs des zones ajoutées par l'établissement (jamais de rouge : réservé aux alertes)
export const COULEURS_ZONES_EXTRA = ["#0F766E", "#B45309", "#6D28D9", "#0369A1", "#4D7C0F", "#A21CAF", "#9A3412", "#1D4ED8"];

export const normaliserNomNet = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export const baseTacheNet = (t) => String(t || "").split(" — ")[0];

export const JOURS_COURTS_NET = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven", Samedi: "Sam", Dimanche: "Dim" };
