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
const FOUR = "Nettoyant four et grill (usage alimentaire)";
const SOLP = "Désinfectant sols";
const LAVE = "Produit lave-vaisselle et liquide de rinçage";

// Zones de la CUISINE uniquement (pas de salle, bar ni sanitaires)
export const ZONES_CUISINE = [
  { nom: "Tous", couleur: "#5B6B7A" },
  { nom: "Poste Chaud", couleur: "#D9691A" },
  { nom: "Poste Froid", couleur: "#1E88E5" },
  { nom: "Poste Pizza", couleur: "#8D5A33" },
  { nom: "Pâtisserie", couleur: "#C2549B" },
  { nom: "Préparation viandes et poissons", couleur: "#B58900" },
  { nom: "Chambres froides", couleur: "#283593" },
  { nom: "Réserves sèches", couleur: "#6D8B2F" },
  { nom: "Réception", couleur: "#8E4FBF" },
  { nom: "Plonge", couleur: "#17A2B8" },
];

// Surfaces à nettoyer dans une cuisine professionnelle (indépendantes de la zone : on les rattache aux zones où elles existent)
export const SURFACES_NETTOYAGE = [
  el("Sols", SOLP, "sol", "qms", 20),
  el("Murs et carrelage (zones de projection)", DEG, "degraisser", "h", 20, "Samedi"),
  el("Crédence derrière les cuissons", DEG, "degraisser", "h", 15, "Samedi"),
  el("Plafond et bouches d'aération", DETE, "simple", "m", 30),
  el("Plans de travail inox", DESI, "desinfecter", "qms", 10),
  el("Plans de travail marbre ou résine", DESI, "desinfecter", "qms", 10),
  el("Planches à découper", DESI, "desinfecter", "qms", 5),
  el("Étagères et supports", DETE, "simple", "h", 10, "Jeudi"),
  el("Portes et poignées", DESI, "desinfecter", "qms", 5),
  el("Interrupteurs et télécommandes", DESI, "desinfecter", "qms", 5),
  el("Lave-mains (robinet, bac, distributeurs)", DESI, "desinfecter", "qms", 5),
  el("Éviers et bacs de plonge", DESI, "desinfecter", "qs", 10),
  el("Égouttoirs et paillasses", DESI, "desinfecter", "qs", 10),
  el("Siphons et bouches d'évacuation", DESI, "desinfecter", "h", 10, "Mercredi"),
  el("Intérieur des frigos et chambres froides (parois, clayettes)", DESI, "frigo", "h", 25, "Lundi"),
  el("Joints de portes froides", DESI, "desinfecter", "h", 10, "Vendredi"),
  el("Poubelles de cuisine et de tri", DESI, "poubelle", "qs", 10),
  el("Zone de réception des marchandises", DESI, "desinfecter", "qs", 10),
  el("Bacs et contenants de stockage", DETE, "simple", "m", 30),
  el("Couteaux et ustensiles", DESI, "desinfecter", "qms", 5),
  el("Pelles, grilles et plaques", DETE, "simple", "qs", 10),
  el("Moules, cadres et poches", DETE, "simple", "qs", 10),
  el("Chariots et diables", DETE, "simple", "h", 10, "Vendredi"),
  el("Chiffons, éponges et balais", DESI, "desinfecter", "qs", 5),
  el("Local produits d'entretien", DETE, "simple", "m", 15),
].map((a) => ({ ...a, genre: "surface" }));

// Matériel et appareils d'une cuisine professionnelle
export const MATERIELS_NETTOYAGE = [
  el("Piano / plaques de cuisson", DEG, "chaud", "qs", 15),
  el("Four mixte ou statique", FOUR, "chaud", "qs", 20),
  el("Friteuse", DEG, "chaud", "h", 30, "Vendredi"),
  el("Plancha / gril", FOUR, "chaud", "qs", 15),
  el("Salamandre", FOUR, "chaud", "h", 15, "Mardi"),
  el("Marmite / sauteuse / bain-marie", DEG, "degraisser", "qs", 10),
  el("Cuiseur à pâtes ou à riz", DEG, "degraisser", "qs", 10),
  el("Cuiseur vapeur", DETA, "appareil", "h", 15, "Mercredi"),
  el("Micro-ondes", DESI, "desinfecter", "qs", 5),
  el("Bain-marie / chauffe-plats (maintien au chaud)", DEG, "degraisser", "qs", 10),
  el("Hotte et filtres", DEG, "degraisser", "h", 30, "Dimanche"),
  el("Plan de travail réfrigéré (saladette)", DESI, "frigo", "qs", 15),
  el("Frigo / armoire réfrigérée", DESI, "frigo", "h", 20, "Mardi"),
  el("Tour réfrigérée", DESI, "frigo", "h", 20, "Mardi"),
  el("Chambre froide positive", DESI, "frigo", "h", 40, "Lundi"),
  el("Chambre froide négative / congélateur", DESI, "frigo", "m", 60),
  el("Cellule de refroidissement", DESI, "frigo", "h", 20, "Mercredi"),
  el("Trancheur à jambon / charcuterie", DESI, "appareil", "qs", 15),
  el("Robot / mixeur / cutter", DESI, "appareil", "qs", 10),
  el("Mixeur plongeant", DESI, "appareil", "qs", 5),
  el("Coupe-légumes et éplucheuse", DESI, "appareil", "qs", 15),
  el("Hachoir / machine à hacher", DESI, "appareil", "qs", 20),
  el("Machine sous vide", DESI, "appareil", "qs", 10),
  el("Balance", DESI, "desinfecter", "qs", 5),
  el("Four à pizza (sole et voûte)", FOUR, "chaud", "qs", 20),
  el("Pétrin", DESI, "appareil", "qs", 15),
  el("Batteur mélangeur et accessoires", DESI, "appareil", "qs", 15),
  el("Laminoir / façonneuse à pâte", DESI, "appareil", "qs", 15),
  el("Four pâtissier", FOUR, "chaud", "h", 20, "Lundi"),
  el("Machine à glace / sorbetière", DESI, "appareil", "qs", 20),
  el("Lave-vaisselle / lave-batterie", LAVE, "appareil", "qs", 15),
  el("Filtres et bras de lavage du lave-vaisselle", DETA, "appareil", "h", 15, "Dimanche"),
].map((a) => ({ ...a, genre: "materiel" }));

// Autres façons courantes d'écrire le même appareil (pour reconnaître les noms des fiches techniques)
const ALIAS_ARTICLES = {
  "Batteur mélangeur et accessoires": ["batteur", "mixeur planétaire", "robot pâtissier"],
  "Hachoir / machine à hacher": ["hachoir à viande"],
  "Balance": ["balance électronique"],
  "Robot / mixeur / cutter": ["robot-coupe"],
  "Cellule de refroidissement": ["cellule"],
  "Trancheur à jambon / charcuterie": ["trancheur", "trancheuse"],
};
export const ARTICLES_NETTOYAGE = [...SURFACES_NETTOYAGE, ...MATERIELS_NETTOYAGE].map((a) => ({ ...a, alias: ALIAS_ARTICLES[a.nom] || [] }));

export const normaliserNomNet = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export const baseTacheNet = (t) => String(t || "").split(" — ")[0];
export const trouverArticleNet = (nom) => {
  const n = normaliserNomNet(baseTacheNet(nom));
  return ARTICLES_NETTOYAGE.find((a) => normaliserNomNet(a.nom) === n) || null;
};

// Protocole type d'un produit (propositions générales, à vérifier avec la fiche technique du produit réellement utilisé)
const DOSAGE_STD = "Selon la fiche technique du produit";
const PRO = (etapes) => ({ dosage: DOSAGE_STD, etapes });
export const PROTOCOLES_PAR_PRODUIT = {
  "Dégraissant alimentaire": PRO(P.degraisser),
  "Nettoyant désinfectant alimentaire": PRO(P.desinfecter),
  "Détergent alimentaire": PRO(P.simple),
  "Désinfectant alimentaire": PRO(P.desinfecter),
  "Détartrant alimentaire": PRO(["Retirer les denrées et protéger les surfaces sensibles", "Appliquer le détartrant à la dilution de la fiche technique", "Laisser agir le temps indiqué", "Rincer abondamment à l'eau claire", "Essuyer ou laisser sécher"]),
  "Nettoyant four et grill (usage alimentaire)": PRO(P.chaud),
  "Détergent sols": PRO(P.sol),
  "Désinfectant sols": PRO(P.sol),
  "Produit lave-vaisselle et liquide de rinçage": PRO(["Vidanger et nettoyer les filtres", "Contrôler le niveau de produit lessiviel et de rinçage", "Nettoyer les bras de lavage", "Essuyer l'intérieur et laisser la porte ouverte"]),
  "Nettoyant désinfectant sanitaires": PRO(P.sanitaires),
  "Nettoyant vitres et surfaces": PRO(P.simple),
  "Produit spécifique machine (pastilles, cartouche…)": PRO(["Suivre la notice du fabricant de la machine", "Lancer le programme de nettoyage", "Rincer", "Noter la date du nettoyage"]),
  "Eau chaude et savon": PRO(["Mouiller à l'eau chaude", "Laver au savon", "Rincer à l'eau claire", "Laisser sécher"]),
};

// Couleurs des zones ajoutées par l'établissement (jamais de rouge : réservé aux alertes)
export const COULEURS_ZONES_EXTRA = ["#0F766E", "#B45309", "#6D28D9", "#0369A1", "#4D7C0F", "#A21CAF", "#9A3412", "#1D4ED8"];


export const JOURS_COURTS_NET = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven", Samedi: "Sam", Dimanche: "Dim" };

// Types de produits de nettoyage (une couleur par type) ; « cle » = protocole type proposé pour ce type
export const CATEGORIES_PRODUITS_NET = [
  { nom: "Dégraissant", couleur: "#D9691A", cle: "Dégraissant alimentaire" },
  { nom: "Désinfectant", couleur: "#1E88E5", cle: "Désinfectant alimentaire" },
  { nom: "Détergent", couleur: "#2F8F4E", cle: "Détergent alimentaire" },
  { nom: "Détartrant", couleur: "#8E4FBF", cle: "Détartrant alimentaire" },
  { nom: "Four et grill", couleur: "#8D5A33", cle: "Nettoyant four et grill (usage alimentaire)" },
  { nom: "Sols", couleur: "#5B6B7A", cle: "Désinfectant sols" },
  { nom: "Lave-vaisselle", couleur: "#17A2B8", cle: "Produit lave-vaisselle et liquide de rinçage" },
  { nom: "Autre", couleur: "#B58900", cle: "Eau chaude et savon" },
];

// ---- Reconnaissance d'un appareil écrit sur une fiche technique et d'une ligne du plan de nettoyage ----
// On ignore majuscules, accents, pluriel et ce qui est entre parenthèses ; « / », « ou » séparent plusieurs façons de le nommer.
const SYNONYMES_NET = { trancheuse: "trancheur", hachoire: "hachoir" };
const sansPluriel = (w) => (w.length > 3 ? w.replace(/(s|x)$/, "") : w);
export function variantesNomNet(nom) {
  const brut = normaliserNomNet(nom);
  const dansParentheses = [...brut.matchAll(/\(([^)]*)\)/g)].map((m) => m[1]);
  const hors = brut.replace(/\([^)]*\)/g, " ");
  return [hors, ...dansParentheses]
    .flatMap((x) => x.split(/\s\/\s|\/|\sou\s|,/))
    .map((x) => x.trim()).filter(Boolean)
    .map((x) => x.split(/\s+/).map((w) => sansPluriel(SYNONYMES_NET[w] || w)).join(" "));
}
export function memeNomNet(a, b) {
  const B = variantesNomNet(b);
  return variantesNomNet(a).some((x) => B.includes(x));
}
// La ligne du plan (tâche) correspond-elle à cet appareil écrit sur une fiche ?
export function tacheCorrespondAppareilNet(t, appareil) {
  const nom = baseTacheNet(t.tache);
  const art = trouverArticleNet(nom);
  return memeNomNet(nom, appareil) || (art ? art.alias.some((al) => memeNomNet(al, appareil)) : false);
}
