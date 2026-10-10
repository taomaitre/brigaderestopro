// Origine des viandes — décret n° 2025-141 du 13 février 2025 (modifie le décret n° 2002-1465).
// Si naissance, élevage et abattage ont lieu dans le même pays : « Origine : pays ».
// Sinon : bœuf → « Né : …, élevé : … et abattu : … » ; porc, ovin, volaille → « Élevé : … et abattu : … ».
export const ESPECES_ORIGINE = [
  { id: "bovin", label: "Bœuf / veau", ne: true },
  { id: "porc", label: "Porc", ne: false },
  { id: "ovin", label: "Agneau / mouton", ne: false },
  { id: "volaille", label: "Volaille", ne: false },
  { id: "autre", label: "Autre produit", libre: true },
];

export function detecterEspece(nom = "", categorie = "") {
  const t = `${nom} ${categorie}`.toLowerCase();
  if (/(bœuf|boeuf|veau|bovin|entrecôte|entrecote|faux-filet|steak|bavette|onglet|rumsteck|hach)/.test(t)) return "bovin";
  if (/(porc|jambon|lard|saucisse|chorizo|côte de porc|echine|échine)/.test(t)) return "porc";
  if (/(agneau|mouton|ovin|gigot)/.test(t)) return "ovin";
  if (/(poulet|volaille|dinde|canard|pintade|escalope)/.test(t)) return "volaille";
  return "autre";
}

const nettoie = (v) => String(v || "").trim();

export function composerOrigine(espece, d) {
  const ne = nettoie(d.ne), eleve = nettoie(d.eleve), abattu = nettoie(d.abattu);
  const cfg = ESPECES_ORIGINE.find((e) => e.id === espece);
  if (!cfg || cfg.libre) return nettoie(d.libre);
  if (!eleve && !abattu && !(cfg.ne && ne)) return "";
  const tous = cfg.ne ? [ne, eleve, abattu] : [eleve, abattu];
  if (tous.every((x) => x && x.toLowerCase() === tous[0].toLowerCase())) return `Origine : ${tous[0]}`;
  if (cfg.ne) return `Né : ${ne || "…"}, élevé : ${eleve || "…"} et abattu : ${abattu || "…"}`;
  return `Élevé : ${eleve || "…"} et abattu : ${abattu || "…"}`;
}

export function lireOrigine(texte) {
  const t = nettoie(texte);
  if (!t) return { ne: "", eleve: "", abattu: "", libre: "" };
  let m = t.match(/^Origine\s*:\s*(.+)$/i);
  if (m) return { ne: m[1], eleve: m[1], abattu: m[1], libre: t };
  m = t.match(/^Né\s*:\s*(.+?),\s*élevé\s*:\s*(.+?)\s+et abattu\s*:\s*(.+)$/i);
  if (m) return { ne: m[1], eleve: m[2], abattu: m[3], libre: t };
  m = t.match(/^Élevé\s*:\s*(.+?)\s+et abattu\s*:\s*(.+)$/i);
  if (m) return { ne: "", eleve: m[1], abattu: m[2], libre: t };
  return { ne: "", eleve: "", abattu: "", libre: t };
}
