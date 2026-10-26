// Groupes de produits du stock : même rangement pour TOUS les établissements (pas propre à une cuisine).
// Les variantes d'écriture (majuscules, « / » au lieu de « & », « Épicerie sèche »…) tombent dans le même groupe,
// et les groupes s'affichent toujours dans le même ordre. Un groupe inconnu reste tel quel, après les groupes standard.
export const GROUPES_STANDARD = [
  "Fruits & légumes", "Viandes & volaille", "Charcuterie", "Crèmerie & fromages", "Surgelés", "Traiteur & friture",
  "Préparations maison", "Sauces", "Épicerie", "Sucré & desserts", "Cocktail & snacking", "Bar / Softs",
];
const clef = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\bet\b/g, " ").replace(/\s+/g, " ").trim();
const SYNONYMES = {
  "fruits legumes": "Fruits & légumes", "fruits et legumes": "Fruits & légumes", "legumes": "Fruits & légumes",
  "viandes volaille": "Viandes & volaille", "viandes": "Viandes & volaille", "volaille": "Viandes & volaille",
  "charcuterie": "Charcuterie",
  "cremerie fromages": "Crèmerie & fromages", "cremerie": "Crèmerie & fromages", "frais laitier fromages": "Crèmerie & fromages", "frais laitier": "Crèmerie & fromages", "laitier": "Crèmerie & fromages", "fromages": "Crèmerie & fromages",
  "surgeles": "Surgelés", "traiteur friture": "Traiteur & friture",
  "preparations maison": "Préparations maison", "sauces": "Sauces",
  "epicerie": "Épicerie", "epicerie huiles": "Épicerie", "epicerie seche": "Épicerie",
  "sucre desserts": "Sucré & desserts", "cocktail snacking": "Cocktail & snacking",
  "bar softs": "Bar / Softs", "boissons": "Bar / Softs",
};
export function normaliserGroupe(c) {
  const t = String(c || "").trim();
  if (!t) return t;
  return SYNONYMES[clef(t)] || t;
}
export function comparerGroupes(a, b) {
  const ia = GROUPES_STANDARD.indexOf(a), ib = GROUPES_STANDARD.indexOf(b);
  if (ia >= 0 && ib >= 0) return ia - ib;
  if (ia >= 0) return -1;
  if (ib >= 0) return 1;
  return String(a).localeCompare(String(b), "fr");
}
