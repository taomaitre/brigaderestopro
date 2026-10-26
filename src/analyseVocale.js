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
  "sur dans et ou ca ce cette ces donc alors please s'il suis tu pouvez peux peut test tests releve releves verifier verification lis me m moi toi nous vous lui leur leurs y il elle ils elles on ca cela ceci celui celle mon ma mes ton ta tes notre nos votre vos son sa ses plus tres bien bon bonne ben euh heu hein bah voila merci bonjour salut hey ok okay vite maintenant tout toute tous toutes aussi encore deja faudrait faut doit dois dois devrait vais vas allons allez va vont veux voudrais voudrait souhaite aimerais aimerait peux pourrais pourriez pourrait peut fasse fasses fassent fais faites faisons lance lances lancez mette mettes mettez mettons mis ouvrez ouvrons donne donnes donner passe passer sors sortez quelque chose truc machin petit petite petits petites grand grande ici la voici voila svp stp sil vous plait prie qu que qui quoi"
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

// ───────────── Phrases à plusieurs actions ─────────────
// « Je prépare 20 lasagnes, enlève le stock pour 20 lasagnes, je les ai mises en cellule, fais-moi 20 étiquettes. »
// On découpe en morceaux, on repère l'action de chaque morceau, puis l'application relit la liste et attend « oui ».
const MOTS_VIDES_MULTI = new Set("vais viens prepare prepares preparer prepares prepar fabrique fabriquer cuisine cuisiner mis mise mises mettre supprime supprimes supprimer retire retires retirer enleve enleves enlever sors sortir deduis stock du dans jai ai fait faits faite deja".split(" "));
const UNITES_VOIX = { kg: "kg", kilo: "kg", kilos: "kg", kilogramme: "kg", kilogrammes: "kg", g: "g", gramme: "g", grammes: "g", gr: "g", l: "L", litre: "L", litres: "L", cl: "cl", ml: "ml" };

function produitDuMorceau(n) {
  return motsDuProduit(n).filter((m) => !MOTS_VIDES_MULTI.has(m)).join(" ");
}
function nombreDecimal(n) {
  const m = n.match(/\b(\d+)(?:[.,](\d+))?\b/);
  if (m) return parseFloat(m[1] + (m[2] ? "." + m[2] : ""));
  for (const mot of n.split(" ")) { if (NOMBRES[mot] && mot !== "un" && mot !== "une") return NOMBRES[mot]; }
  return null;
}

// Renvoie une liste d'actions { action, produit, nb?, quantite?, unite? } ou null si la phrase n'est pas de ce type.
// Actions : retirer_stock (quantité + unité), destocker_fiche (ingrédients d'une fiche × nb), etiquette_dlc, demarrer_refroidissement,
// demarrer_cuisson, demarrer_maintien_chaud, production (= destocker_fiche + étiquettes, utilisé quand « j'ai préparé N X »).
export function analyserPhraseMultiple(texte) {
  if (!norm(texte)) return null;
  const morceaux = String(texte).split(/[.;!?,\n]+/).flatMap((brut) => norm(brut).split(/\s+(?:puis|et puis|ensuite|apres|et)\s+/)).map((m) => m.trim()).filter(Boolean);
  const actions = [];
  let ctxProduit = "", ctxNb = null, derniereProd = null;
  const poser = (a) => { actions.push(a); };
  for (const m0 of morceaux) {
    let m = m0;
    const avantPour = (s) => s.split(/\bpour\b/)[0];
    // 1. Retrait / déduction de stock
    if (/\b(retire|retires|retirer|enleve|enleves|enlever|supprime|supprimes|supprimer|sors|sortir|deduis|deduire|decompte)\b/.test(m) && /\b(stock|stocks)\b|\b(kg|kilos?|grammes?|litres?|g|cl|ml)\b/.test(m) && !/\betiquettes?\b/.test(m)) {
      const pour = m.match(/\bpour\s+(\S+)\s+(.+)$/);
      if (/\bstock\b/.test(m) && pour && nombreDecimal(pour[1])) {
        const nb = nombreDecimal(pour[1]); const produit = produitDuMorceau(pour[2]);
        if (produit) { ctxProduit = produit; ctxNb = nb; poser({ action: "destocker_fiche", produit, nb }); continue; }
      }
      const q = m.match(/\b(\d+(?:[.,]\d+)?|un|une)\s*(kg|kilos?|kilogrammes?|grammes?|gr|g|litres?|l|cl|ml)\b\s*(?:d|de|du|des)?\s*(.*)$/);
      if (q) {
        const produit = produitDuMorceau(q[3].replace(/\b(du|le|de|dans le)\s+stock\b.*$/, ""));
        if (produit) { poser({ action: "retirer_stock", produit, quantite: parseFloat(q[1].replace(",", ".")) || 1, unite: UNITES_VOIX[q[2]] || q[2] }); continue; }
      }
      return null; // cas flou : on laisse l'IA / l'ancien chemin
    }
    // 2. « J'ai préparé 5 crèmes brûlées » : production réalisée (stock + étiquettes)
    const prod = m.match(/\b(?:j ai|on a|je viens de|nous avons)\s+(?:prepare|fait|fabrique|cuisine)\s+(.+)$/);
    if (prod || (derniereProd && !INTENTIONS.some((it) => it.re.test(m)) && nombreDecimal(m) && produitDuMorceau(avantPour(m)))) {
      const reste = prod ? prod[1] : m;
      const nb = nombreDecimal(avantPour(reste)) || 1; const produit = produitDuMorceau(avantPour(reste));
      if (produit) {
        if (derniereProd && derniereProd.produit === produit) derniereProd.nb += nb;
        else { derniereProd = { action: "production", produit, nb }; poser(derniereProd); }
        ctxProduit = produit; ctxNb = derniereProd.nb; continue;
      }
    }
    // 3. « Je vais préparer 20 lasagnes » : simple contexte (rien n'est exécuté)
    const vais = m.match(/\b(?:je vais|je prepare|on va|je dois|il faut)\s+(?:preparer|faire|fabriquer|cuisiner)?\s*(.+)$/);
    if (vais && !INTENTIONS.some((it) => it.re.test(m))) {
      const produit = produitDuMorceau(avantPour(vais[1]));
      if (produit) { ctxProduit = produit; ctxNb = nombreDecimal(vais[1]) || ctxNb; continue; }
    }
    // 4. Étapes HACCP et étiquettes
    let trouve = null;
    for (const it of INTENTIONS) { const mm = m.match(it.re); if (mm && (trouve === null || mm.index < trouve.index)) trouve = { ...it, index: mm.index }; }
    if (trouve && ["etiquette_dlc", "demarrer_refroidissement", "demarrer_cuisson", "demarrer_maintien_chaud"].includes(trouve.action)) {
      const produit = produitDuMorceau(m) || ctxProduit;
      if (!produit) return null;
      if (trouve.action === "etiquette_dlc") poser({ action: "etiquette_dlc", produit, nb: nombreDecimal(m) || ctxNb || 1 });
      else poser({ action: trouve.action, produit });
      continue;
    }
    return null; // un morceau incompris : on n'exécute rien de la phrase, l'ancien chemin prend le relais
  }
  return actions.length ? actions : null;
}
