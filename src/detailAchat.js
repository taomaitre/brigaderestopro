// Détail d'achat et de comptage d'un produit.
// Le fournisseur vend « une unité » (colis, carton, barquette, boîte, pièce, kilo, litre). Cette unité peut contenir des paquets
// (3 sachets) et des pièces ou portions (25 tranches de 20 g, 30 œufs, 6 briques de 1 L). Le prix de la facture porte sur l'unité
// vendue ; on en déduit le prix d'une pièce, le prix au kilo / au litre, et l'unité de comptage du stock et de l'inventaire.
export const UNITES_PRODUIT_DETAIL = ["kg", "g", "L", "cL", "pièce", "botte", "boîte", "sachet", "barquette"];
export const UNITES_PRIX_DETAIL = ["€/kg", "€/L", "€/pièce", "€/botte", "€/boîte", "€/sachet", "€/barquette"];
export const nbDetail = (t) => { const x = parseFloat(String(t == null ? "" : t).replace(",", ".")); return Number.isFinite(x) ? x : 0; };
export const pluriel = (m) => { const t = String(m || "").trim(); return !t || /[sxz]$/i.test(t) ? t : /(eau|eu)$/i.test(t) ? t + "x" : t + "s"; };
export const capitale = (t) => { const x = String(t || ""); return x.charAt(0).toUpperCase() + x.slice(1); };
export const fmtDetail = (n) => (Math.round(n * 1000) / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 3 });
export const eurDetail = (n) => `${(Math.round(n * 100) / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
export const eurPrecis = (n) => `${(Math.round(n * 10000) / 10000).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: n >= 10 ? 2 : 4 })} €`;
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
  const out = { ok: false, erreurs: [], avertissements: [], resume: [], derive: null, piecesParColis: 1, piecesParSous: 1, prixPiece: null, prixKg: null, prixL: null, contenuPiece: null, contenuRecette: null, coefNet: 1, densite: null, totalPiece: null, contenuDeduit: 0, contenuUniteEff: "g", conditionnement: "" };
  if (!d || !d.vente) { out.erreurs.push("Choisissez comment le fournisseur vend ce produit."); return out; }
  const avecPieces = ["colis", "piece", "poids", "volume"].includes(d.vente); // un produit vendu au kilo peut aussi contenir des pièces (50 bouchées de 20 g)
  const nbSous = nbDetail(d.nbSous);
  const nbPieces = nbDetail(d.nbPieces);
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
  // Poids net (égoutté, utile en cuisine) par rapport au poids total (brut) : ex. cornichons 4,2 kg brut, 2,12 kg net.
  // On achète, compte et commande sur le brut ; les fiches techniques sont calculées sur le net.
  const netBrut = nbDetail(d.netVal);
  const netU = ["g", "kg", "l", "ml"].includes(d.netUnite) ? d.netUnite : ptU;
  if (netBrut > 0 && ptBase > 0) {
    if (MATIERE[netU] !== ptMat) out.erreurs.push("Le poids net doit être dans la même mesure que le poids total (grammes avec grammes, litres avec litres).");
    else {
      const coef = (netBrut * FACTEUR[netU]) / ptBase;
      if (coef > 1.0001) out.erreurs.push("Le poids net ne peut pas dépasser le poids total (brut).");
      else if (coef < 1) { out.coefNet = Math.round(coef * 10000) / 10000; if (coef < 0.3) out.avertissements.push(`Le net (${poidsTexte(netBrut * FACTEUR[netU], ptMat)}) ne représente que ${Math.round(coef * 100)} % du brut : vérifiez.`); }
    }
  } else if (netBrut > 0 && !(ptBase > 0)) out.erreurs.push("Pour indiquer un poids net, indiquez d'abord le poids total (brut).");
  // Équivalence poids <-> volume (glace : 2,5 L = 1,63 kg) : sert à convertir les grammes d'une fiche en litres.
  const eqVal = nbDetail(d.equivVal);
  const eqU = ["kg", "l", "ml", "g"].includes(d.equivUnite) ? d.equivUnite : (ptMat === "ml" ? "kg" : "l");
  if (eqVal > 0 && ptBase > 0) {
    if (MATIERE[eqU] === ptMat) out.erreurs.push(ptMat === "ml" ? "Indiquez l'équivalent en poids (g ou kg) du volume total." : "Indiquez l'équivalent en volume (ml ou L) du poids total.");
    else {
      const eqBase = eqVal * FACTEUR[eqU];
      out.densite = Math.round((ptMat === "ml" ? eqBase / ptBase : ptBase / eqBase) * 10000) / 10000; // grammes par millilitre
      if (out.densite < 0.2 || out.densite > 2.5) out.avertissements.push(`Densité surprenante (${out.densite} g par ml) : vérifiez le poids et le volume.`);
    }
  }
  // Pour les fiches techniques, « 1 pièce » = le poids d'une pièce SEULEMENT si le produit contient des pièces ou si on l'a saisi : un sachet de 1 kg vendu au kilo ne vaut pas « 1 pièce de 1 kg ».
  if (contenu > 0 && (piecesParColis > 1 || contenuSaisi > 0 || d.comptage === "piece" || d.vente === "piece" || d.vente === "colis")) out.contenuRecette = { val: Math.round(contenu * out.coefNet * 1000) / 1000, unite: cu };
  const total = ptBase > 0 ? { val: ptBase, unite: ptMat } : (contenu > 0 && piecesParColis > 1 ? { val: contenu * piecesParColis, unite: cu } : null);
  out.totalPiece = total;
  if (contenuSaisi > 0 && ptBase > 0 && cuSaisi === ptMat && Math.abs(contenuSaisi * piecesParColis - ptBase) / ptBase > 0.03) out.avertissements.push(`${fmtDetail(piecesParColis)} pièces de ${poidsTexte(contenuSaisi, cuSaisi)} font ${poidsTexte(contenuSaisi * piecesParColis, cuSaisi)}, pas ${poidsTexte(ptBase, ptMat)} : vérifiez le nombre de pièces ou les poids.`);
  const contenuBase = contenu > 0 ? contenu / 1000 : 0; // kg ou L
  let prix = nbDetail(d.prix);
  let prixPour = d.prixPour;
  // Prix donné au kilo NET (égoutté) : on le ramène au kilo brut (celui qu'on commande et compte), le net servira aux fiches.
  if (prixPour === "kgnet") {
    prixPour = "kg";
    if (out.coefNet < 1) prix = prix * out.coefNet; else out.erreurs.push("Prix au kilo net : indiquez d'abord le poids net.");
  }
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
  // Si le poids total est connu, le prix au kilo / au litre se calcule directement dessus (plus exact que pièce × poids).
  if (prix > 0 && ptBase > 0 && (prixPour === "colis" || (prixPour === "sous" && nbSous > 0))) {
    const base = (prixPour === "sous" ? ptBase / nbSous : ptBase) / 1000;
    if (ptMat === "g") prixKg = prix / base; else prixL = prix / base;
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
  const aDesPieces = piecesParColis > 1 || nbSous > 0;
  const nomPlein = capitale(nomVendu === "colis" && !aDesPieces && !d.nomColis ? (d.vente === "poids" ? "Vendu au poids" : d.vente === "volume" ? "Vendu au volume" : "colis") : nomVendu);
  if (aDesPieces) {
    cond = `${nomPlein} de ${nbSous > 0 ? `${fmtDetail(nbSous)} ${pluriel(d.nomSous || "sachet")} de ` : ""}${fmtDetail(piecesParSous)} ${piecesParSous > 1 ? pluriel(nomPiece) : nomPiece}${poidsPieceTxt ? ` de ${poidsPieceTxt}` : ""}${totalTxt ? ` (${totalTxt})` : ""}`;
  } else if (d.nomColis || d.vente === "piece") cond = `${nomPlein}${totalTxt || poidsPieceTxt ? ` de ${totalTxt || poidsPieceTxt}` : ""}`;
  else cond = totalTxt ? `Vendu au ${d.vente === "volume" ? "volume" : "poids"} (${totalTxt})` : (d.vente === "volume" ? "Vendu au volume" : "Vendu au poids");
  if (String(d.precision || "").trim()) cond += ` — ${String(d.precision).trim()}`;
  if (d.variable) cond += " — poids variable";
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
  if (derive) { derive.prix_achat = Math.round(derive.prix_achat * 10000) / 10000; derive.conditionnement = cond; derive.poids_par_piece = out.contenuRecette ? poidsTexte(out.contenuRecette.val, out.contenuRecette.unite) : ""; }
  const r = [];
  if (avecPieces && piecesParColis > 1) r.push(`1 ${nomVendu} = ${nbSous > 0 ? `${fmtDetail(nbSous)} ${pluriel(d.nomSous || "sachet")} = ` : ""}${fmtDetail(piecesParColis)} ${pluriel(nomPiece)}${prix > 0 && prixPour === "colis" ? ` = ${eurDetail(prix)}` : ""}${totalTxt ? ` = ${totalTxt}` : ""}`);
  if (prixPiece != null) r.push(`1 ${!String(d.nomPiece || "").trim() && piecesParColis <= 1 ? nomVendu : nomPiece} = ${eurPrecis(prixPiece)}${poidsPieceTxt ? ` (${poidsPieceTxt})` : ""}`);
  if (prixKg != null) r.push(`1 kg = ${eurDetail(prixKg)}${contenuBase > 0 && cu === "g" ? ` · 100 g = ${eurDetail(prixKg / 10)}` : ""}`);
  if (prixL != null) r.push(`1 L = ${eurDetail(prixL)}`);
  if (out.coefNet < 1) {
    r.push(`Net utilisé en fiche : ${Math.round(out.coefNet * 100)} % du poids total (brut) → les fiches techniques comptent sur le net`);
    if (prixKg != null) r.push(`1 kg net = ${eurDetail(prixKg / out.coefNet)} (1 kg brut = ${eurDetail(prixKg)})`);
    if (prixL != null) r.push(`1 L net = ${eurDetail(prixL / out.coefNet)} (1 L brut = ${eurDetail(prixL)})`);
  }
  if (out.densite) r.push(`1 L pèse ${fmtDetail(Math.round(out.densite * 1000))} g (100 g = ${fmtDetail(Math.round(100 / out.densite * 10) / 10)} ml) : sert à passer des grammes des fiches aux litres`);
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

// Ce qu'on commande réellement chez le fournisseur : « 1 carton » = 5 kg / 30 pièces / 6 L. Rend null si le détail ne permet pas de le dire.
// taille = quantité contenue dans 1 unité commandée, exprimée dans l'unité de comptage du stock (kg, L ou pièces).
export function infosCommande(d) {
  const r = calculerDetailAchat(d);
  if (!r.ok) return null;
  const nom = String(d.nomColis || "").trim() || (d.vente === "piece" ? "pièce" : "colis");
  const u = r.derive.unite;
  let taille = null;
  if (d.comptage === "piece") taille = r.piecesParColis;
  else if (d.comptage === "kg" && r.totalPiece && r.totalPiece.unite === "g") taille = r.totalPiece.val / 1000;
  else if (d.comptage === "l" && r.totalPiece && r.totalPiece.unite === "ml") taille = r.totalPiece.val / 1000;
  if (!(taille > 0)) return null;
  taille = Math.round(taille * 1000) / 1000;
  return { nom, taille, unite: u, prixColis: Math.round(taille * r.derive.prix_achat * 100) / 100 };
}
// « 2 cartons = 10 kg » (pour la commande, l'e-mail et le bon).
export function texteCommande(info, nbColis) {
  const n = Math.round(nbColis * 1000) / 1000;
  return `${fmtDetail(n)} ${n > 1 ? pluriel(info.nom) : info.nom} (${fmtDetail(Math.round(n * info.taille * 1000) / 1000)} ${n * info.taille > 1 && !/^(kg|g|l|cl|ml)$/i.test(info.unite) ? pluriel(info.unite) : info.unite})`;
}
