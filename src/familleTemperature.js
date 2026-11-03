// Famille de température proposée automatiquement pour un produit, d'après sa catégorie et son nom.
// Les valeurs (+2 °C, +3 °C, +4 °C, −18 °C) sont celles de la liste CONSERVATIONS du logiciel (textes officiels) :
// rien n'est inventé ici, on ne fait que choisir la famille. Règle : la plus stricte l'emporte (comme à la réception).
// Le chef peut toujours choisir autre chose : le logiciel avertit, il ne bloque jamais.

const sansAccent = (t) => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Température maximale de chaque famille réfrigérée (pour comparer « plus strict / moins strict »).
export const TEMP_MAX_FAMILLE = { hache: 2, poisson: 2, abats: 3, plat: 3, viande: 4, frais: 4, laitier: 4 };

// Catégories « non réfrigérées » : quand la catégorie le dit, le nom ne compte pas
// (ex. « Confit de canard » rangé en Épicerie = conserve, pas de la viande fraîche).
const CAT_SEC = /epicerie|sec\b|seche|conserve|condiment|bocal/;
const CAT_BOISSON = /boisson|\bbar\b|soft|\bvin\b|biere|spiritueux|cave/;
const CAT_EMBALLAGE = /emballage|jetable|consommable/;
const CAT_ENTRETIEN = /entretien|hygiene|nettoyage|menager|droguerie/;

export function familleProposee(nom, categorie) {
  const c = sansAccent(categorie);
  const n = sansAccent(nom);
  const tout = `${c} ${n}`;
  if (/surgel|congel/.test(tout)) return "surgele";
  if (c) {
    if (CAT_ENTRETIEN.test(c)) return "entretien";
    if (CAT_EMBALLAGE.test(c)) return "emballage";
    if (CAT_BOISSON.test(c)) return "boisson";
    if (CAT_SEC.test(c)) return "sec";
  }
  const candidats = [];
  // Viande hachée (et préparations hachées) : +2 °C.
  if (/hache|chair a saucisse|tartare de (boeuf|bœuf)|steak tartare/.test(n)) candidats.push("hache");
  // Poisson et produits de la pêche frais : +2 °C.
  // (poisson fumé, salé ou mariné : famille « frais », température du fabricant)
  if (/fume|sale\b|marine/.test(n) && /saumon|truite|hareng|poisson|anchois|perle/.test(n)) candidats.push("frais");
  else if (/poisson|maree|fruits? de mer|crustace|coquillage/.test(c) || /saumon|cabillaud|colin|merlu|dorade|daurade|\bbar\b|sole|truite|lieu|crevette|gambas|moule|huitre|saint-jacques|st jacques|calamar|encornet|seiche|poulpe|langoustine|lotte|maquereau|sardine|anchois frais/.test(n)) candidats.push("poisson");
  // Abats : +3 °C.
  if (/abats?/.test(c) || /\bfoie\b|rognon|tripe|\blangue\b|\bcoeur\b|ris de veau|gesier/.test(n)) candidats.push("abats");
  // Plats cuisinés, traiteur, préparations à l'avance : +3 °C.
  if (/plat|traiteur|preparation|cuisine/.test(c)) candidats.push("plat");
  // Viande et volaille fraîches : +4 °C.
  if (/viande|volaille|boucherie/.test(c) || /\bboeuf\b|\bporc\b|\bveau\b|agneau|poulet|volaille|canard|dinde|bavette|entrecote|faux-filet|escalope|magret|supreme|cuisse|filet de (poulet|boeuf|porc|canard|dinde)/.test(n)) candidats.push("viande");
  // Charcuterie, produits laitiers, œufs, crèmerie : +4 °C (famille « frais »).
  if (/charcut|lait|fromage|cremerie|creme|oeuf|frais|crèmerie/.test(c) || /jambon|saucisson|rosette|chorizo|lardon|bacon|pate\b|terrine|rillette|fromage|creme|beurre|\blait\b|yaourt|mozzarella|burrat|comte|emmental|cheddar|chevre|reblochon|camembert|gorgonzola|mascarpone|parmesan|ricotta|oeuf/.test(n)) candidats.push("frais");
  // Fruits, légumes, herbes fraîches.
  if (/fruit|legume|herbe|primeur/.test(c)) candidats.push("legume");
  if (!candidats.length) return null;
  // La plus stricte l'emporte.
  const rang = (f) => (f in TEMP_MAX_FAMILLE ? TEMP_MAX_FAMILLE[f] : 10);
  return candidats.sort((a, b) => rang(a) - rang(b))[0];
}

// Avertissement (jamais bloquant) quand la famille choisie est moins stricte que celle proposée.
export function ecartFamille(choisie, proposee) {
  if (!choisie || !proposee || choisie === proposee) return null;
  if (proposee === "surgele" && choisie !== "surgele") return "surgele";
  const a = TEMP_MAX_FAMILLE[choisie], b = TEMP_MAX_FAMILLE[proposee];
  if (a != null && b != null && a > b) return "moins_strict";
  if (b != null && a == null && !["surgele"].includes(choisie)) return "non_refrigere";
  return null;
}
