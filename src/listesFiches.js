// Listes de choix de la fiche technique (nouvelle version), généralisées à tous les restaurants — plus
// seulement à la carte de Games Factory. Sources : structure d'une carte de restaurant français
// (tic-et-tac.com/carte-des-mets), matériel de cuisine professionnelle (quiditmieux.fr, sumup.com,
// nelinkia.com) et fonctionnement d'un four mixte professionnel (electroluxprofessional.com).
// Pour ajouter ou retirer un choix : modifier ici. Un choix « Autre » saisi par un employé est enregistré
// pour l'établissement et signalé à l'éditeur (table demandes_ajout) pour enrichir ces listes plus tard.

// [libellé affiché, code court utilisé dans le code de la fiche : FT + code + numéro]
export const CATEGORIES_FICHE_GENERALES = [
  ["Entrée", "ENTREE"],
  ["Potage / Soupe", "POTAGE"],
  ["Salade", "SALADE"],
  ["Poisson", "POISSON"],
  ["Viande", "VIANDE"],
  ["Pizza", "PIZZA"],
  ["Burger", "BURGER"],
  ["Plat", "PLAT"],
  ["Légume / Accompagnement", "ACCOMP"],
  ["Fromage", "FROMAGE"],
  ["Dessert", "DESSERT"],
  ["Partagé", "PARTAGE"],
  ["Boisson", "BOISSON"],
  ["Base", "BASE"],
  ["Sauce", "SAUCE"],
];

export const APPAREILS_CUISSON_GENERAUX = [
  "Four à convection", "Four mixte / vapeur", "Four à pizza", "Four à charbon", "Micro-ondes",
  "Plaque de cuisson (induction / gaz / vitrocéramique)", "Plancha", "Friteuse", "Sauteuse",
  "Marmite / bain-marie", "Grill", "Salamandre", "Rôtissoire", "Étuve",
];

// Appareils de maintien au chaud (nouvelle version).
export const APPAREILS_MAINTIEN_GENERAUX = [
  "Bain-marie", "Étuve / armoire chaude", "Vitrine chauffante", "Four mixte / vapeur", "Lampe chauffante",
];

export const MATERIEL_GENERAL = [
  "Bac gastro GN 1/1", "Bac gastro GN 1/2", "Bac gastro GN 1/3", "Bac gastro GN 1/6",
  "Balance électronique", "Cellule de refroidissement", "Chambre froide positive", "Étagères inox",
  "Faitout", "Film alimentaire", "Grille de refroidissement", "Plaque à pâtisserie", "Poêle",
  "Robot-coupe / cutter", "Saladette", "Trancheuse",
];

export const USTENSILES_GENERAUX = [
  "Balance", "Casserole", "Chinois", "Couteau d'office", "Couteau à désosser", "Couteau à trancher",
  "Cul-de-poule", "Économe", "Entonnoir", "Faitout", "Fouet", "Hachoir à viande", "Louche",
  "Mandoline", "Maryse", "Mixeur plongeant", "Passoire / tamis", "Pince", "Planche à découper",
  "Plaque à pâtisserie", "Poche à douille", "Rouleau à pâtisserie", "Spatule", "Thermomètre sonde",
  "Verre doseur", "Wok",
];

// Réglages propres à chaque appareil de cuisson : la fiche documente une vraie méthode de cuisson
// plutôt qu'une température unique approximative. type : "texte" (saisie libre) ou liste de choix.
const T_TEMP = { cle: "temperature", label: "Température (°C)", type: "texte", placeholder: "ex. 180" };
const T_TEMPS = { cle: "temps", label: "Temps de cuisson", type: "texte", placeholder: "ex. 12 min" };
const T_VENTIL = { cle: "ventilation", label: "Ventilation", type: ["Faible", "Moyenne", "Forte"] };

export const PARAMETRES_APPAREIL = {
  "Four à convection": [T_TEMP, T_TEMPS, T_VENTIL],
  "Four mixte / vapeur": [
    { cle: "mode", label: "Mode", type: ["Sec / convection", "Vapeur", "Mixte combiné"] },
    T_TEMP,
    { cle: "humidite", label: "Taux d'humidité (%)", type: "texte", placeholder: "ex. 40" },
    T_VENTIL, T_TEMPS,
    { cle: "sonde", label: "Sonde à cœur", type: ["Oui", "Non"] },
  ],
  "Four à pizza": [T_TEMP, T_TEMPS, { cle: "position", label: "Position", type: ["Sole", "Voûte"] }],
  "Plaque de cuisson (induction / gaz / vitrocéramique)": [
    { cle: "temperature", label: "Température ou niveau de puissance", type: "texte", placeholder: "ex. 6/10" }, T_TEMPS,
  ],
  "Plancha": [
    { cle: "temperature", label: "Température ou niveau de puissance", type: "texte", placeholder: "ex. 220 °C" }, T_TEMPS,
  ],
  "Friteuse": [{ cle: "temperature", label: "Température de l'huile (°C)", type: "texte", placeholder: "ex. 170" }, T_TEMPS],
  "Sauteuse": [{ cle: "mode", label: "Mode", type: ["Mijotage", "Ébullition"] }, T_TEMP, T_TEMPS],
  "Marmite / bain-marie": [{ cle: "mode", label: "Mode", type: ["Mijotage", "Ébullition"] }, T_TEMP, T_TEMPS],
  "Grill": [
    { cle: "puissance", label: "Puissance", type: "texte", placeholder: "ex. forte" }, T_TEMPS,
    { cle: "distance", label: "Distance à la source de chaleur", type: "texte", placeholder: "ex. 10 cm" },
  ],
  "Salamandre": [
    { cle: "puissance", label: "Puissance", type: "texte", placeholder: "ex. forte" }, T_TEMPS,
    { cle: "distance", label: "Distance à la source de chaleur", type: "texte", placeholder: "ex. 10 cm" },
  ],
  "Étuve": [T_TEMP, { cle: "temps", label: "Durée", type: "texte", placeholder: "ex. 30 min" }],
  "Four à charbon": [T_TEMP, T_TEMPS],
  "Micro-ondes": [{ cle: "puissance", label: "Puissance (W)", type: "texte", placeholder: "ex. 800" }, T_TEMPS],
  "Rôtissoire": [T_TEMP, T_TEMPS],
};

// Résumé lisible des réglages saisis, pour le tableau HACCP et la fiche.
export function resumeParametresAppareil(appareil, parametres) {
  const defs = PARAMETRES_APPAREIL[appareil] || [];
  const p = parametres || {};
  return defs.filter((d) => String(p[d.cle] || "").trim()).map((d) => `${d.label.replace(/ \(.*\)$/, "")} : ${String(p[d.cle]).trim()}`).join(" · ");
}
