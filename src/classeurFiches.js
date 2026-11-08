// Compléter les fiches techniques avec le classeur « Fiches techniques Games Factory » (ingrédients, matériel, étapes,
// points HACCP, refroidissement, rendement, conservation, non-conformité, traçabilité, étiquetage).
// Règles : on ne touche QUE les fiches qui n'ont encore aucune étape de préparation et qui n'ont pas déjà été complétées ;
// on garde tout le reste de la fiche (allergènes, coût, groupe, ordre, code, poste) ; les ingrédients déjà reliés au stock
// gardent leur lien. Rien n'est supprimé ailleurs.
const sansAccent = (t) => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const cleIng = (t) => sansAccent(t).replace(/\(.*?\)/g, " ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

export function ficheACompleter(f, detail) {
  if (!f || !detail || !(f.nom in detail)) return false;
  if (f.classeurApplique) return false;
  return !(Array.isArray(f.preparation) && f.preparation.length > 0);
}

function fusionnerIngredients(anciens, nouveaux) {
  const liste = Array.isArray(anciens) ? anciens : [];
  return nouveaux.map((n) => {
    const k = cleIng(n.nom);
    const a = liste.find((x) => x.lienId && cleIng(x.nom) === k) || liste.find((x) => x.lienId && k.length >= 4 && (cleIng(x.nom).includes(k) || k.includes(cleIng(x.nom))) && cleIng(x.nom).length >= 4);
    return a ? { ...n, lienId: a.lienId, lienType: a.lienType } : { ...n };
  });
}

export function fusionnerFiche(f, d, aujourdhui) {
  const out = { ...f };
  const garnir = (cle) => { if (Array.isArray(d[cle]) && d[cle].length > 0) out[cle] = d[cle]; };
  if (d.sousTitre) out.sousTitre = d.sousTitre;
  if (d.rendementCourt) out.rendementCourt = d.rendementCourt;
  if (d.rendementAttendu) out.rendementAttendu = d.rendementAttendu;
  if (Array.isArray(d.ingredients) && d.ingredients.length > 0) out.ingredients = fusionnerIngredients(f.ingredients, d.ingredients);
  ["materiel", "haccp", "preparation", "consignesImportantes", "refroidissementStockage", "rendement", "dureeConservation", "nonConformite", "tracabilite", "etiquetage", "autresSections", "aRetenir"].forEach(garnir);
  if (d.titresSections && Object.keys(d.titresSections).length > 0) out.titresSections = { ...(f.titresSections || {}), ...d.titresSections };
  if (Number.isFinite(d.dlcJours) && d.dlcJours > 0) out.dlcJours = d.dlcJours;
  out.classeurApplique = aujourdhui || true;
  return out;
}

// Retourne { fiches, nb, restantes } : la liste complète mise à jour, le nombre de fiches complétées, et les fiches
// du classeur pour lesquelles aucune fiche du même nom n'existe.
export function appliquerClasseur(fiches, detail, aujourdhui) {
  let nb = 0;
  const maj = (fiches || []).map((f) => {
    if (!ficheACompleter(f, detail)) return f;
    nb += 1;
    return fusionnerFiche(f, detail[f.nom], aujourdhui);
  });
  const noms = new Set((fiches || []).map((f) => f.nom));
  return { fiches: maj, nb, absentes: Object.keys(detail).filter((n) => !noms.has(n)) };
}
