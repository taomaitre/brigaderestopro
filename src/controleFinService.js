// Contrôle de fin de service : listes GÉNÉRALES (valables pour tout établissement, aucun nom d'appareil ni de marque) et
// codes de la grille officielle d'inspection (src/grilleInspection.js). Chaque établissement peut remplacer ou compléter ces
// listes dans Paramétrage > Contrôles de fin de service (clé « controles-fin-service », rangée par établissement).
// Les lignes physiques viennent des points que l'inspecteur regarde (vade-mecum général V7 et « Remise directe » V3).

// Lignes « physiques » que le chef confirme des yeux le soir (en plus des lignes calculées par le logiciel).
export const LIGNES_CHEF_GENERALES = [
  { code: "F1", texte: "Lave-mains : savon, essuie-mains à usage unique, eau chaude, accès libre" },
  { code: "F1", texte: "Vestiaires rangés : tenues propres et tenues sales séparées" },
  { code: "E1-E2", texte: "Poubelles vidées et sorties, conteneurs fermés, aucun déchet en zone de préparation" },
  { code: "C402", texte: "Cartons et cagettes sortis de la cuisine ; denrées déconditionnées et étiquetées" },
  { code: "B5", texte: "Produits d'entretien rangés à part, loin des denrées, dans leur emballage étiqueté" },
  { code: "B3", texte: "Aucune trace de nuisibles ; portes et fenêtres donnant sur l'extérieur fermées" },
  { code: "B1", texte: "Denrées couvertes en chambre froide, rien au sol, pas de condensation au-dessus des denrées" },
  { code: "B4", texte: "Appareils de cuisson éteints et nettoyés" },
];

// Listes par défaut des contrôles des employés (fin de service midi et soir), sans nom d'appareil.
export const CONTROLE_EMPLOYE_DEFAUT = {
  midi: [
    "Appareils de cuisson du poste éteints",
    "Saladettes et frigos du poste : denrées filmées et étiquetées, portes fermées",
    "Plans de travail nettoyés et désinfectés",
    "Aucun produit sans étiquette",
  ],
  soir: [
    "Appareils de cuisson du poste éteints et nettoyés",
    "Saladettes et frigos du poste : denrées filmées et étiquetées, intérieur, portes et poignées propres",
    "Plans de travail nettoyés et désinfectés",
    "Produits à DLC atteinte retirés et signalés",
    "Aucun produit sans étiquette",
  ],
  general: [
    "Températures des appareils du poste relevées et conformes",
    "DLC des produits du poste vérifiées",
  ],
  fin: [
    "Sol nettoyé",
    "Poubelles vidées et sacs changés",
    "Plonge terminée et éteinte",
  ],
};

// Lit les listes de l'établissement (ou les listes générales par défaut).
export function listesControle(reglage) {
  const r = reglage && typeof reglage === "object" ? reglage : {};
  const tableau = (v, defaut) => (Array.isArray(v) && v.length ? v.map((x) => String(x)).filter((x) => x.trim()) : defaut);
  return {
    // { [poste]: { midi: [], soir: [], general: [] } } : vide = la liste par défaut s'applique à tous les postes.
    postes: r.postes && typeof r.postes === "object" ? r.postes : {},
    employe: {
      midi: tableau(r.employe && r.employe.midi, CONTROLE_EMPLOYE_DEFAUT.midi),
      soir: tableau(r.employe && r.employe.soir, CONTROLE_EMPLOYE_DEFAUT.soir),
      general: tableau(r.employe && r.employe.general, CONTROLE_EMPLOYE_DEFAUT.general),
      fin: tableau(r.employe && r.employe.fin, CONTROLE_EMPLOYE_DEFAUT.fin),
    },
    // Lignes ajoutées par l'établissement au contrôle du chef (ex. un appareil précis à vérifier éteint).
    chefPerso: tableau(r.chefPerso, []),
    // Contrôle obligatoire de fin de service (vue employé) écrit par l'établissement : { midi: [{ section, items }], soir: [...] }.
    obligatoire: r.obligatoire && typeof r.obligatoire === "object" ? r.obligatoire : null,
  };
}

// Sections du « Contrôle obligatoire » de fin de service : celles de l'établissement, sinon construites à partir des listes générales.
export function sectionsObligatoires(listes, moment) {
  const m = moment === "midi" ? "midi" : "soir";
  if (listes.obligatoire && Array.isArray(listes.obligatoire[m]) && listes.obligatoire[m].length) return listes.obligatoire[m];
  const postes = Object.keys(listes.postes || {});
  return [
    ...(postes.length
      ? postes.map((p) => ({ section: p, items: listePoste(listes, p, m).items.filter((x) => !listes.employe.fin.includes(x) && !listes.employe.general.includes(x)) }))
      : [{ section: "Postes de cuisine", items: listes.employe[m] }]),
    { section: "Températures et DLC", items: listes.employe.general },
    { section: "Clôture", items: listes.employe.fin },
  ];
}

// Liste d'un poste : celle du poste si l'établissement l'a écrite, sinon la liste par défaut.
export function listePoste(listes, poste, moment) {
  const p = (listes.postes && listes.postes[poste]) || null;
  const lire = (cle) => (p && Array.isArray(p[cle]) && p[cle].length ? p[cle] : listes.employe[cle]);
  return { items: [...lire(moment === "midi" ? "midi" : "soir"), ...lire("general"), ...listes.employe.fin] };
}

// Écart d'un relevé par rapport au maximum de l'appareil (°C, positif = au-dessus). null si pas de maximum.
export function ecartAuMaximum(valeur, max) {
  const v = Number(valeur); const m = Number(max);
  if (!Number.isFinite(v) || max == null || max === "" || !Number.isFinite(m)) return null;
  return Math.round((v - m) * 10) / 10;
}

// Niveau de risque d'un écart, aligné sur la grille officielle (vade-mecum C401) : plus de +3 °C = D, de +2 à +3 °C = C.
export function niveauEcart(ecart) {
  if (ecart == null || ecart <= 0) return null;
  if (ecart > 3) return "D";
  if (ecart >= 2) return "C";
  return "surveillance";
}

// Risques pour l'inspection, calculés sur les données du jour. Jamais une note : seulement ce qui risque un C ou un D.
export function risquesDuJour({ aujourdhui, appareils = [], releves = [], dlcDepassees = 0, suivisEnCours = [], huileAttendue = false, huileFaiteAujourdhui = true, rappelsNonTraites = 0, receptionsNonConformesNonTraitees = 0, controlesSoir = [] }) {
  const r = [];
  const relevesJour = releves.filter((x) => x.date === aujourdhui);
  const sansReleve = appareils.filter((a) => !relevesJour.some((x) => x.equipementId === a.id));
  if (sansReleve.length) r.push({ niveau: "D", code: "C401", texte: `${sansReleve.length} appareil${sansReleve.length > 1 ? "s" : ""} sans relevé de température aujourd'hui : ${sansReleve.map((a) => a.nom).join(", ")}`, ecran: "temperatures" });
  appareils.forEach((a) => {
    const derniers = relevesJour.filter((x) => x.equipementId === a.id);
    if (!derniers.length) return;
    const pire = Math.max(...derniers.map((x) => ecartAuMaximum(x.valeur, a.max)).filter((e) => e != null), -Infinity);
    const niv = niveauEcart(pire === -Infinity ? null : pire);
    if (niv === "D" || niv === "C") r.push({ niveau: niv, code: "C401", texte: `${a.nom} : relevé à +${pire} °C au-dessus de son maximum (${a.max} °C) aujourd'hui. Vérifiez que l'action (transfert ou destruction) est enregistrée.`, ecran: "temperatures" });
  });
  if (dlcDepassees > 0) r.push({ niveau: "D", code: "C401", texte: `${dlcDepassees} produit${dlcDepassees > 1 ? "s" : ""} à DLC dépassée encore en stock ou en préparation`, ecran: "etiquettes" });
  if (suivisEnCours.length) r.push({ niveau: "D", code: "C403", texte: `Suivi non clôturé : ${suivisEnCours.join(", ")}. Saisissez la température de fin.`, ecran: "controles" });
  if (huileAttendue && !huileFaiteAujourdhui) r.push({ niveau: "C", code: "C403", texte: "Aucun test d'huile de friture enregistré aujourd'hui", ecran: "huile" });
  if (rappelsNonTraites > 0) r.push({ niveau: "D", code: "D2", texte: `${rappelsNonTraites} rappel${rappelsNonTraites > 1 ? "s" : ""} de produit non traité${rappelsNonTraites > 1 ? "s" : ""} (retrait à faire dans la demi-journée)`, ecran: "rappels" });
  if (receptionsNonConformesNonTraitees > 0) r.push({ niveau: "C", code: "C3", texte: `${receptionsNonConformesNonTraitees} non-conformité${receptionsNonConformesNonTraitees > 1 ? "s" : ""} de réception sans suite (fournisseur à prévenir)`, ecran: "reception" });
  const pasFaits = controlesSoir.filter((c) => c.date === aujourdhui && c.statut === "ko");
  if (pasFaits.length) r.push({ niveau: "C", code: "—", texte: `${pasFaits.length} point${pasFaits.length > 1 ? "s" : ""} du contrôle de ce soir marqué${pasFaits.length > 1 ? "s" : ""} « Pas fait » : corrigez avant de partir`, ecran: null });
  return r.sort((a, b) => (a.niveau === b.niveau ? 0 : a.niveau === "D" ? -1 : 1));
}
