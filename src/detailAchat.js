// Détail d'achat et de comptage d'un produit.
// Le fournisseur vend « une unité » (colis, carton, barquette, boîte, pièce, kilo, litre). Cette unité peut contenir des paquets
// (3 sachets) et des pièces ou portions (25 tranches de 20 g, 30 œufs, 6 briques de 1 L). Le prix de la facture porte sur l'unité
// vendue ; on en déduit le prix d'une pièce, le prix au kilo / au litre, et l'unité de comptage du stock et de l'inventaire.
export const UNITES_PRODUIT_DETAIL = ["kg", "g", "L", "cL", "pièce", "botte", "boîte", "sachet", "barquette"];
export const UNITES_PRIX_DETAIL = ["€/kg", "€/L", "€/pièce", "€/botte", "€/boîte", "€/sachet", "€/barquette"];
export const nbDetail = (t) => { const x = parseFloat(String(t == null ? "" : t).replace(",", ".")); return Number.isFinite(x) ? x : 0; };
export const pluriel = (m) => { const t = String(m || "").trim(); return !t || /[sxz]$/i.test(t) ? t : t + "s"; };
export const capitale = (t) => { const x = String(t || ""); return x.charAt(0).toUpperCase() + x.slice(1); };
export const fmtDetail = (n) => (Math.round(n * 1000) / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 3 });
export const eurDetail = (n) => `${(Math.round(n * 100) / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
export const eurPrecis = (n) => `${(Math.round(n * 10000) / 10000).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} €`;
const FACTEUR = { g: 1, kg: 1000, ml: 1, cl: 10, l: 1000 };
const MATIERE = { g: "g", kg: "g", ml: "ml", cl: "ml", l: "ml" };
export const poidsTexte = (val, mat) => (val >= 1000 ? `${fmtDetail(val / 1000)} ${mat === "ml" ? "L" : "kg"}` : `${fmtDetail(val)} ${mat}`);

// « 30 », « 3 x 15 », « 15x3 » → nombre de paquets et de pièces (tous les nombres se multiplient pour le total).
export function lireContenu(expr) {
  const nombres = String(expr == null ? "" : expr).replace(/,/g, ".").split(/\s*(?:x|×|\*|fois)\s*/i).map((t) => parseFloat(t)).filter((n) => Number.isFinite(n) && n > 0);
  if (!nombres.length) return null;
  if (nombres.length === 1) return { nbSous: "", nbPieces: String(nombres[0]) };
  return { nbSous: String(nombres[0]), nbPieces: String(nombres.slice(1).reduce((a, b) => a * b, 1)) };
}

export function calculerDetailAchat(d) {
  const out = { ok: false, erreurs: [], avertissements: [], resume: [], derive: null, piecesParColis: 1, piecesParSous: 1, prixPiece: null, prixKg: null, prixL: null, contenuPiece: null, totalPiece: null, contenuDeduit: 0, contenuUniteEff: "g", conditionnement: "" };
  if (!d || !d.vente) { out.erreurs.push("Choisissez comment le fournisseur vend ce produit."); return out; }
  const avecPieces = d.vente === "colis" || d.vente === "piece";
  const nbSous = avecPieces ? nbDetail(d.nbSous) : 0;
  const nbPieces = avecPieces ? nbDetail(d.nbPieces) : 1;
  if (d.vente === "colis" && !(nbPieces > 0)) out.erreurs.push(nbSous > 0 ? "Indiquez le nombre de pièces dans chaque " + (d.nomSous || "sachet") + "." : "Indiquez le nombre de pièces dans le " + (d.nomColis || "colis") + ".");
  if (d.vente === "piece" && nbSous > 0 && !(nbPieces > 0)) out.erreurs.push("Indiquez le nombre de pièces dans chaque " + (d.nomSous || "sachet") + ".");
  const piecesParSous = avecPieces ? (nbPieces > 0 ? nbPieces : 1) : 1;
  const piecesParColis = avecPieces ? (nbSous > 0 ? nbSous * piecesParSous : piecesParSous) : 1;
  out.piecesParColis = piecesParColis; out.piecesParSous = piecesParSous;
  // Poids / volume total de ce qu'on commande, et d'une pièce : l'un se déduit de l'autre.
  const ptBrut = nbDetail(d.poidsColis);
  const ptU = ["kg", "l", "ml"].includes(d.poidsColisUnite) ? d.poidsColisUnite : "g";
  const ptBase = ptBrut * FACTEUR[ptU];
  const ptMat = MATIERE[ptU];
  const contenuSaisi = nbDetail(d.contenu);
  const cuSaisi = d.contenuUnite === "ml" ? "ml" : "g";
  const contenuDeduit = !(contenuSaisi > 0) && ptBase > 0 && piecesParColis > 0 ? ptBase / piecesParColis : 0;
  const contenu = contenuSaisi > 0 ? contenuSaisi : contenuDeduit;
  const cu = contenuSaisi > 0 ? cuSaisi : ptMat;
  out.contenuDeduit = contenuDeduit; out.contenuUniteEff = cu;
  if (contenu > 0) out.contenuPiece = { val: contenu, unite: cu };
  const total = ptBase > 0 ? { val: ptBase, unite: ptMat } : (contenu > 0 && piecesParColis > 1 ? { val: contenu * piecesParColis, unite: cu } : null);
  out.totalPiece = total;
  if (contenuSaisi > 0 && ptBase > 0 && cuSaisi === ptMat && Math.abs(contenuSaisi * piecesParColis - ptBase) / ptBase > 0.03) out.avertissements.push(`${fmtDetail(piecesParColis)} pièces de ${poidsTexte(contenuSaisi, cuSaisi)} font ${poidsTexte(contenuSaisi * piecesParColis, cuSaisi)}, pas ${poidsTexte(ptBase, ptMat)} : vérifiez le nombre de pièces ou les poids.`);
  const contenuBase = contenu > 0 ? contenu / 1000 : 0; // kg ou L
  const prix = nbDetail(d.prix);
  let prixPour = d.prixPour;
  if (d.vente === "piece" && prixPour === "piece") prixPour = "colis";
  if (!prixPour) out.erreurs.push("Indiquez le prix de la facture.");
  else if (!(prix > 0)) out.erreurs.push("Indiquez le prix de la facture.");
  let prixPiece = null, prixKg = null, prixL = null;
  if (prix > 0) {
    if (prixPour === "colis" && piecesParColis > 0) prixPiece = prix / piecesParColis;
    else if (prixPour === "sous" && piecesParSous > 0) prixPiece = prix / piecesParSous;
    else if (prixPour === "piece") prixPiece = prix;
    else if (prixPour === "kg") { prixKg = prix; if (contenuBase > 0 && cu === "g") prixPiece = prix * contenuBase; }
    else if (prixPour === "l") { prixL = prix; if (contenuBase > 0 && cu === "ml") prixPiece = prix * contenuBase; }
    if (prixPiece != null && contenuBase > 0) { if (cu === "g" && prixKg == null) prixKg = prixPiece / contenuBase; if (cu === "ml" && prixL == null) prixL = prixPiece / contenuBase; }
  }
  Object.assign(out, { prixPiece, prixKg, prixL });
  const nomPiece = String(d.nomPiece || "").trim() || "pièce";
  const uniteListe = UNITES_PRODUIT_DETAIL.find((u) => u.toLowerCase() === nomPiece.toLowerCase());
  const unitePiece = uniteListe || "pièce";
  const nomVendu = String(d.nomColis || "").trim() || (d.vente === "piece" ? "pièce" : "colis");
  // Texte du conditionnement
  const poidsPieceTxt = contenu > 0 ? poidsTexte(contenu, cu) : "";
  const totalTxt = total ? poidsTexte(total.val, total.unite) : "";
  let cond;
  if (avecPieces) {
    const dedans = piecesParColis > 1 ? ` de ${nbSous > 0 ? `${fmtDetail(nbSous)} ${pluriel(d.nomSous || "sachet")} de ` : ""}${fmtDetail(piecesParSous)} ${piecesParSous > 1 ? pluriel(nomPiece) : nomPiece}${poidsPieceTxt ? ` de ${poidsPieceTxt}` : ""}${totalTxt ? ` (${totalTxt})` : ""}` : (poidsPieceTxt ? ` de ${poidsPieceTxt}` : "");
    cond = `${capitale(nomVendu)}${dedans}`;
  } else cond = poidsPieceTxt ? `${capitale(nomVendu === "colis" || nomVendu === "pièce" ? nomPiece : nomVendu)} de ${poidsPieceTxt}` : (d.vente === "poids" ? "Vendu au poids" : "Vendu au volume");
  out.conditionnement = cond;
  // Unité de comptage et prix par unité de comptage
  const c = d.comptage;
  if (!c) out.erreurs.push("Indiquez comment vous comptez ce produit à l'inventaire.");
  let derive = null;
  if (c === "piece") {
    if (prixPiece == null && prix > 0) out.erreurs.push("Pour compter en pièces avec un prix au " + (prixPour === "kg" ? "kilo" : "litre") + ", indiquez le poids (ou le volume) d'une pièce.");
    if (prixPiece != null) derive = { unite: unitePiece, prix_achat: prixPiece, prix_unite: UNITES_PRIX_DETAIL.includes("€/" + unitePiece) ? "€/" + unitePiece : "€/pièce" };
  } else if (c === "kg") {
    if (prixKg == null && prix > 0) out.erreurs.push("Pour compter en kilos, indiquez le prix au kilo, ou le poids d'une pièce.");
    if (prixKg != null) derive = { unite: "kg", prix_achat: prixKg, prix_unite: "€/kg" };
  } else if (c === "l") {
    if (prixL == null && prix > 0) out.erreurs.push("Pour compter en litres, indiquez le prix au litre, ou le volume d'une pièce.");
    if (prixL != null) derive = { unite: "L", prix_achat: prixL, prix_unite: "€/L" };
  }
  if (derive) { derive.prix_achat = Math.round(derive.prix_achat * 10000) / 10000; derive.conditionnement = cond; derive.poids_par_piece = poidsPieceTxt; }
  const r = [];
  if (avecPieces && piecesParColis > 1) r.push(`1 ${nomVendu} = ${nbSous > 0 ? `${fmtDetail(nbSous)} ${pluriel(d.nomSous || "sachet")} = ` : ""}${fmtDetail(piecesParColis)} ${pluriel(nomPiece)}${prix > 0 && prixPour === "colis" ? ` = ${eurDetail(prix)}` : ""}${totalTxt ? ` = ${totalTxt}` : ""}`);
  if (prixPiece != null) r.push(`1 ${nomPiece} = ${eurPrecis(prixPiece)}${poidsPieceTxt ? ` (${poidsPieceTxt})` : ""}`);
  if (prixKg != null) r.push(`1 kg = ${eurDetail(prixKg)}${contenuBase > 0 && cu === "g" ? ` · 100 g = ${eurDetail(prixKg / 10)}` : ""}`);
  if (prixL != null) r.push(`1 L = ${eurDetail(prixL)}`);
  if (avecPieces && piecesParColis > 1 && prixPiece != null) r.push(`2 ${pluriel(nomVendu)} = ${fmtDetail(2 * piecesParColis)} ${pluriel(nomPiece)} = ${eurDetail(2 * prixPiece * piecesParColis)}`);
  out.resume = r; out.derive = derive; out.ok = !!derive && out.erreurs.length === 0;
  return out;
}

// Pré-remplissage : retrouve le détail d'achat d'un produit déjà saisi à partir de son conditionnement (texte), de son unité et de son prix.
// Le résultat n'est gardé que s'il redonne EXACTEMENT le prix et l'unité déjà enregistrés (sinon : null, rien n'est supposé).
export function detailDepuisProduit(p) {
  const prix = nbDetail(p && p.prix_achat);
  if (!p || !(prix > 0)) return null;
  const cond = String(p.conditionnement || "").toLowerCase().replace(/,/g, ".").replace(/(\d)\s*(kilogrammes?|kilos?)\b/g, "$1 kg").replace(/(\d)\s*grammes?\b/g, "$1 g").replace(/(\d)\s*(centilitres?)\b/g, "$1 cl").replace(/(\d)\s*(millilitres?)\b/g, "$1 ml").replace(/(\d)\s*litres?\b/g, "$1 l");
  const pu = String(p.prix_unite || "").replace(/^€\s*\/\s*/, "").toLowerCase();
  const unite = String(p.unite || "").toLowerCase();
  const d = { vente: "piece", nomColis: "", nbSous: "", nbPieces: "", nomPiece: "", poidsColis: "", poidsColisUnite: "g", contenu: "", contenuUnite: "g", prix: "", prixPour: "colis", comptage: "piece" };
  const nomsVendu = ["colis", "carton", "caisse", "pack", "plateau", "seau", "bidon", "sac", "barquette", "boîte", "boite", "pot", "brique", "bouteille", "paquet", "sachet", "pièce", "piece"];
  const premier = (cond.match(/^\s*([a-zéèêîôû]+)/) || [])[1];
  if (premier && nomsVendu.includes(premier)) d.nomColis = premier === "boite" ? "boîte" : premier === "piece" ? "pièce" : premier;
  const unites = "kg|g|l|cl|ml";
  const mult = cond.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:x|×)\\s*(\\d+(?:\\.\\d+)?)\\s*(${unites})?(?![a-zé])`));
  const pieces = cond.match(/(\d+(?:\.\d+)?)\s*(pi[eè]ces?|tranches?|portions?|œufs?|oeufs?|pains?|briques?|sachets?|barquettes?|boîtes?)/);
  const poids = cond.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${unites})(?![a-zé])`));
  if (mult && mult[3]) { d.vente = "colis"; d.nbPieces = mult[1]; d.contenu = String(parseFloat(mult[2]) * FACTEUR[mult[3]]); d.contenuUnite = MATIERE[mult[3]]; if (!d.nomColis) d.nomColis = "colis"; }
  else if (mult) { d.vente = "colis"; d.nbSous = mult[1]; d.nbPieces = mult[2]; if (!d.nomColis) d.nomColis = "colis"; }
  else if (pieces) { d.nbPieces = pieces[1]; const nom = pieces[2].replace(/s$/, "").replace("oeuf", "œuf"); if (!/^pi[eè]ce$/.test(nom)) d.nomPiece = nom; d.vente = parseFloat(pieces[1]) > 1 && ["colis", "carton", "caisse", "pack", "plateau"].includes(d.nomColis) ? "colis" : "piece"; const apres = cond.slice(cond.indexOf(pieces[0]) + pieces[0].length).match(new RegExp(`^\\s*(?:de|d')\\s*(\\d+(?:\\.\\d+)?)\\s*(${unites})(?![a-zé])`)); if (apres) { d.contenu = String(parseFloat(apres[1]) * FACTEUR[apres[2]]); d.contenuUnite = MATIERE[apres[2]]; } else if (poids) { d.poidsColis = poids[1]; d.poidsColisUnite = poids[2]; } }
  else if (poids) { d.poidsColis = poids[1]; d.poidsColisUnite = poids[2]; }
  // prix : ramené au produit vendu (colis entier, kilo ou litre)
  const calc = (dd) => calculerDetailAchat({ ...dd });
  const essayer = (dd) => { const r = calc(dd); return r.ok && r.derive && Math.abs(r.derive.prix_achat - prix) <= Math.max(0.0001, prix * 0.002) ? dd : null; };
  const piecesVendu = (() => { const t = calculerDetailAchat({ ...d, prix: "1", prixPour: "colis", comptage: "piece" }); return t.piecesParColis || 1; })();
  const comptageParUnite = pu === "kg" || unite === "kg" ? "kg" : pu === "l" || unite === "l" ? "l" : "piece";
  const candidats = [];
  if (pu === "kg") { candidats.push({ ...d, vente: "poids", prixPour: "kg", prix: String(prix), comptage: "kg" }); candidats.push({ ...d, vente: "poids", prixPour: "kg", prix: String(prix), comptage: comptageParUnite === "kg" ? "kg" : "piece" }); }
  else if (pu === "l") { candidats.push({ ...d, vente: "volume", prixPour: "l", prix: String(prix), comptage: "l" }); candidats.push({ ...d, vente: "volume", prixPour: "l", prix: String(prix), comptage: comptageParUnite === "l" ? "l" : "piece" }); }
  else { candidats.push({ ...d, prixPour: "colis", prix: String(Math.round(prix * piecesVendu * 10000) / 10000), comptage: "piece" }); candidats.push({ ...d, prixPour: "colis", vente: "piece", prix: String(prix), comptage: "piece", nbPieces: "", nbSous: "" }); }
  for (const c of candidats) {
    const ok = essayer(c);
    if (ok) { const r = calc(ok); if (r.derive && (r.derive.unite.toLowerCase() === unite || (unite === "pièce" && r.derive.unite === "pièce") || (!unite))) return ok; if (r.derive && ["kg", "L"].includes(r.derive.unite) && r.derive.unite.toLowerCase() === unite) return ok; }
  }
  return null;
}
