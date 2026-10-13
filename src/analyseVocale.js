// Analyse locale des commandes vocales (sans IA, sans coût, instantanée).
// Elle reconnaît les mots-clés de la cuisine (fiche technique, étiquette, cellule, four, bain-marie…) et extrait le produit
// et le nombre. Si la phrase n'est pas claire, elle renvoie null et l'application demande à l'IA (secours).

export const norm = (t) => String(t == null ? "" : t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/œ/g, "oe").replace(/[’'`]/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const NOMBRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30 };

// Familles d'intention : expressions (déjà sans accents), la plus tôt dans la phrase l'emporte.
const INTENTIONS = [
  { action: "etiquette_dlc", cible: "etiquettes", re: /\b(etiquettes?|etiqueter|dlc|ddm|imprim\w*|date limite|peremption|date de fabrication)\b/ },
  { action: "ouvrir_fiche", cible: "fiches", re: /\b(fiches?|recettes?|fiche technique|fiches techniques)\b/ },
  { action: "demarrer_refroidissement", cible: "haccpRefroid", re: /\b(cellule|cellules|refroidissement|refroidir|refroidi|refroidis|abattre|abattage|abattu|descente en temperature)\b/ },
  { action: "demarrer_cuisson", cible: "haccpCuisson", re: /\b(cuisson|cuire|four|fours|plancha|grill|rotissoire|sauteuse)\b|\bfaire cuire\b|\ba cuire\b/ },
  { action: "demarrer_maintien_chaud", cible: "haccpChaud", re: /\b(bain marie|bains marie|maintien|maintenir|passe chaude|garder au chaud|tenir au chaud|mettre au chaud|mets au chaud|au chaud)\b/ },
];

// Mots sans intérêt pour trouver le nom du produit.
const MOTS_VIDES = new Set((
  "ouvre ouvrir ouvres ouvrez montre montrer affiche afficher va vas aller aux au aussi fais fait faire moi un une des de du d la le les l lance lancer lances " +
  "mets mettre met mettez en a pour stp svp s il te plait veux veut voudrais voulons je j ai besoin nouvelle nouveau nouvelles nouveaux imprime imprimer impression " +
  "sortir sors creer cree etiquette etiquettes etiqueter dlc ddm lot date limite peremption fabrication fiche fiches technique techniques recette recettes " +
  "cuisson cuire four fours plancha grill rotissoire sauteuse cellule cellules refroidissement refroidir refroidi refroidis abattre abattage abattu descente temperature " +
  "bain marie bains maintien maintenir passe chaude garder tenir chaud demarre demarrer commence commencer enregistre enregistrer page onglet ecran numero nombre quantite " +
  "sur dans et ou ca ce cette ces donc alors please s'il suis tu pouvez peux peut test tests releve releves verifier verification lis me m moi toi nous vous lui leur leurs y il elle ils elles on ca cela ceci celui celle mon ma mes ton ta tes notre nos votre vos son sa ses plus tres bien bon bonne ben euh heu hein bah voila merci bonjour salut hey ok okay vite maintenant tout toute tous toutes aussi encore deja faudrait faut doit dois dois devrait vais vas allons allez va vont veux voudrais voudrait souhaite aimerais aimerait peux pourrais pourriez pourrait peut fasse fasses fassent fais faites faisons lance lances lancez mette mettes mettez mettons mis ouvrez ouvrons donne donnes donner passe passer sors sortez quelque chose truc machin petit petite petits petites grand grande ici la voici voila svp stp sil vous plait prie qu que qui quoi
).split(" "));

const NAVIGATION = [
  { cible: "reception", re: /\b(reception|receptions|livraison|livraisons|receptionner|camion)\b/ },
  { cible: "tracabilite", re: /\b(tracabilite|tracabilites)\b/ },
  { cible: "haccpHuile", re: /\b(huile|huiles|friteuse|friteuses|bain d huile)\b/ },
  { cible: "haccpTemp", re: /\b(frigo|frigos|chambre froide|chambres froides|congelateur|congelateurs|saladette|releve de temperature|temperatures?)\b/ },
  { cible: "taches", re: /\b(taches?|to do|todo|liste du jour|mes taches)\b/ },
  { cible: "stock", re: /\b(stock|stocks|inventaire|reserve)\b/ },
  { cible: "controle", re: /\b(controle|gestion|chef)\b/ },
];

export function nombreDansTexte(t) {
  const n = norm(t);
  const chiffre = n.match(/\b(\d{1,3})\b/);
  if (chiffre) return Math.max(1, parseInt(chiffre[1], 10));
  for (const mot of n.split(" ")) { if (mot !== "un" && mot !== "une" && NOMBRES[mot]) return NOMBRES[mot]; }
  return null;
}

export function motsDuProduit(texte) {
  return norm(texte).split(" ").filter((m) => m && m.length > 1 && !MOTS_VIDES.has(m) && !/^\d+$/.test(m) && !(NOMBRES[m] && m !== "un" && m !== "une"));
}

// Renvoie { action, produit, nb, cible } ou null (phrase à confier à l'IA).
export function analyserCommandeLocale(texte) {
  const n = norm(texte);
  if (!n) return null;
  // Retrait de stock : la quantité, l'unité et le motif demandent l'IA.
  if (/\b(retire|retires|retirer|enleve|enlever|jette|jeter|sors|sortir du stock|perdu|casse|tombe|rate|abime)\b/.test(n) && !/\b(etiquette|fiche|cuisson|cellule)\b/.test(n)) return null;
  let trouve = null;
  for (const it of INTENTIONS) {
    const m = n.match(it.re);
    if (m && (trouve === null || m.index < trouve.index)) trouve = { ...it, index: m.index };
  }
  const mots = motsDuProduit(n);
  const produit = mots.join(" ");
  if (trouve) {
    if (!produit) return { action: "naviguer", cible: trouve.cible, produit: null, nb: null };
    return { action: trouve.action, produit, nb: trouve.action === "etiquette_dlc" ? (nombreDansTexte(n) || 1) : null, cible: trouve.cible };
  }
  // Pas d'intention : navigation si un seul mot-clé d'onglet et rien d'autre.
  for (const nav of NAVIGATION) {
    if (nav.re.test(n)) {
      const reste = norm(n.replace(new RegExp(nav.re.source, "g"), " ")).split(" ").filter((m) => m && !MOTS_VIDES.has(m));
      if (reste.length === 0) return { action: "naviguer", cible: nav.cible, produit: null, nb: null };
      return null;
    }
  }
  return null;
}

// Cherche l'élément qui correspond le mieux aux mots-clés du produit. Les mots en trop (petits mots, hésitations) sont ignorés :
// on compte les mots du produit retrouvés dans le nom ; le meilleur score gagne, puis le nom le plus court.
const racine = (m) => m.replace(/(s|x)$/, "");
const MOTS_TROP_GENERAUX = new Set(["sauce", "plat", "produit", "maison", "portion", "pate", "pates", "creme", "base", "mix", "melange"]);
export function rapprocher(produitTexte, liste, getNom) {
  const mots = [...new Set(motsDuProduit(produitTexte).map(racine).filter((m) => m.length > 1))];
  if (!mots.length) return null;
  const retrouve = (m, jetons) => jetons.some((j) => j === m || (m.length >= 4 && (j.startsWith(m) || m.startsWith(j) && j.length >= 4)));
  let meilleur = null, meilleurScore = 0, meilleurReste = Infinity, egalite = false;
  for (const item of liste || []) {
    const nom = norm(getNom(item));
    if (!nom) continue;
    const jetons = nom.split(" ").map(racine);
    const trouves = mots.filter((m) => retrouve(m, jetons));
    if (!trouves.length) continue;
    // au moins un mot précis (pas seulement « sauce », « maison »…)
    if (trouves.every((m) => MOTS_TROP_GENERAUX.has(m)) && mots.some((m) => !MOTS_TROP_GENERAUX.has(m))) continue;
    // Tous les mots du nom de l'élément doivent figurer dans la phrase (ou le contraire), sinon le score est pénalisé.
    const reste = jetons.length - trouves.length;
    const score = trouves.length * 10 - reste;
    if (score > meilleurScore || (score === meilleurScore && reste < meilleurReste)) { meilleur = item; meilleurScore = score; meilleurReste = reste; egalite = false; }
    else if (score === meilleurScore && reste === meilleurReste) egalite = true;
  }
  // Égalité parfaite entre deux éléments différents : on ne devine pas.
  return egalite ? null : meilleur;
}

const OUI = /\b(oui|ouais|ouai|yes|ok|okay|d accord|daccord|c est bon|c est ca|exact|exactement|parfait|confirme|confirmer|vas y|allez y|go|affirmatif|tout a fait|bien sur|certainement|valide|valider)\b/;
const NON = /\b(non|nan|nope|annule|annuler|stop|faux|pas du tout|negatif|recommence|pas ca|pas bon|c est pas ca|ce n est pas ca|erreur)\b/;
export function reponseOuiNon(texte) {
  const n = norm(texte);
  if (!n) return null;
  const non = NON.test(n), oui = OUI.test(n);
  if (non && !oui) return "non";
  if (oui && !non) return "oui";
  if (non && oui) return n.search(NON) < n.search(OUI) ? "non" : "oui";
  return null;
}

export function pluriel(n, mot) { return `${n} ${mot}${n > 1 ? "s" : ""}`; }
