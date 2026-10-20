// Génère src/lexiqueDonnees.js à partir de docs/lexique-haccp.md (source unique du lexique).
// Usage : node scripts/genererLexique.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const md = fs.readFileSync(path.join(racine, "docs/lexique-haccp.md"), "utf8").split(/\r?\n/);

// Sections reprises dans l'application (numéro du titre « ## n. »)
const SECTIONS = {
  "4": "Règles du logiciel et températures",
  "5": "Notions et bactéries",
  "6": "Températures de cuisson",
  "7": "Réglementation et organisation",
  "8": "Critères microbiologiques (2073/2005)",
  "8 bis": "Hygiène générale (852/2004)",
};

const MOTS_CLES_EN_PLUS = {
  "refroidissement": "cellule abattage 63 10 deux heures 2h",
  "remise en température": "réchauffage reheat 63 75 une heure 1h",
  "maintien au chaud": "bain-marie 63 liaison chaude",
  "décongélation": "dégel sortir congélateur recongélation",
  "plats témoins": "échantillon conservation 5 jours 0 3",
  "allergènes": "gluten arachide lait œuf soja sulfites 1169",
  "haccp": "ccp pms 852 principes plan maîtrise sanitaire",
  "listeria": "listériose femme enceinte charcuterie 2073",
  "salmonella": "salmonelle œuf volaille",
  "viande hachée": "steak haché boeuf 71 steak",
  "tiac": "intoxication alimentaire déclaration ars ddpp",
  "formation": "hygiène 5 octobre 2011 manipulateur",
  "froid": "température conservation frigo congélateur annexe i",
};

function normaliser(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
function id(s) { return normaliser(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70); }

const entrees = [];
let section = null, courante = null, tableau = null, tableauCuisson = null;
const fermer = () => { if (courante) entrees.push(courante); courante = null; };

for (const brut of md) {
  const ligne = brut.trimEnd();
  const h2 = ligne.match(/^## (\d+(?: bis)?)\./);
  if (h2) { fermer(); if (tableau && tableau.length) tableauCuisson = tableau; section = SECTIONS[h2[1]] ? h2[1] : null; tableau = null; continue; }
  if (!section) continue;
  const h3 = ligne.match(/^### (.+)$/);
  if (h3) {
    fermer();
    const titreBrut = h3[1].trim();
    const certitude = titreBrut.includes("✖") ? "non-publie" : /✔/.test(titreBrut) && !/◐/.test(titreBrut) ? "verifie" : /◐/.test(titreBrut) && !/✔/.test(titreBrut) ? "a-confirmer" : "mixte";
    const titre = titreBrut.replace(/\s*[✔◐✖](\s*\/\s*[✔◐✖])?\s*/g, " ").replace(/\s+/g, " ").trim();
    courante = { id: id(titre) + "-" + entrees.length, section: SECTIONS[section], titre, certitude, champs: [] };
    continue;
  }
  if (section === "6" && !courante) {
    // Section 6 : un seul bloc « barèmes » construit à partir du tableau et des paragraphes
    if (ligne.startsWith("|") && !/^\|[-| ]+\|$/.test(ligne) && !/Famille/.test(ligne)) {
      const c = ligne.split("|").slice(1, -1).map((x) => x.trim());
      (tableau = tableau || []).push(c);
    }
    continue;
  }
  if (!courante) continue;
  const champ = ligne.match(/^\*\*(.+?)\*\*\s*:\s*(.*)$/);
  if (champ) { courante.champs.push({ label: champ[1], texte: champ[2] }); continue; }
  if (ligne.trim() && courante.champs.length) courante.champs[courante.champs.length - 1].texte += " " + ligne.trim();
}
fermer();

// Entrée dédiée aux barèmes de cuisson (tableau de la section 6)
if (tableauCuisson && tableauCuisson.length) {
  const tableauFinal = tableauCuisson;
  entrees.push({
    id: "baremes-cuisson-guide-p180",
    section: SECTIONS["6"],
    titre: "Barèmes de cuisson indicatifs du guide Restaurateur (page imprimée 180, page 187 du PDF)",
    certitude: "verifie",
    champs: [
      { label: "En bref", texte: "Barèmes recommandés par l'ANSES, repris par le guide « à titre indicatif ». Ils « restent sous la responsabilité de chaque professionnel ». " + tableauFinal.map((c) => `${c[0]} : ${c[1]}${c[2] ? " (" + c[2] + ")" : ""}`).join(" ; ") + "." },
      { label: "Texte", texte: "Guide de bonnes pratiques d'hygiène et d'application de l'HACCP « Restaurateur », novembre 2015, page imprimée 180 (page 187 du fichier PDF)." },
      { label: "Volaille entière, canard, magret", texte: "Aucun barème officiel trouvé. La valeur de 80 °C du logiciel est une règle de la cuisine, pas une norme. Question à la DDPP en attente." },
      { label: "Certitude", texte: "✔ lu le 20/10/2026." },
    ],
  });
}

for (const e of entrees) {
  const texteTout = normaliser([e.titre, ...e.champs.map((c) => c.texte)].join(" "));
  const extra = Object.entries(MOTS_CLES_EN_PLUS).filter(([cle]) => texteTout.includes(normaliser(cle))).map(([, v]) => v).join(" ");
  e.motsCles = extra;
}

const sortie = `// FICHIER GÉNÉRÉ par scripts/genererLexique.mjs à partir de docs/lexique-haccp.md : ne pas modifier à la main.
// Chaque entrée porte sa source, son lien et son niveau de certitude (verifie / a-confirmer / mixte).
export const LEXIQUE_DATE = ${JSON.stringify(new Date().toISOString().slice(0, 10))};
export const LEXIQUE = ${JSON.stringify(entrees, null, 1)};
`;
fs.writeFileSync(path.join(racine, "src/lexiqueDonnees.js"), sortie);
console.log(entrees.length + " entrées, sections : " + [...new Set(entrees.map((e) => e.section))].join(" | "));
