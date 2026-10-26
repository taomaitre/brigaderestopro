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
  "8 ter": "Contrôle officiel 1 · Le déroulement",
  "8 quater": "Contrôle officiel 2 · Les notes",
  "8 quinquies": "Contrôle officiel 3 · Ce qui pèse le plus",
  "8 sexies": "Contrôle officiel 4 · Retraits et rappels",
  "8 septies": "Contrôle officiel 5 · Petits restaurants et produits d'entretien",
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
  const h2 = ligne.match(/^## (\d+(?: (?:bis|ter|quater|quinquies|sexies|septies))?)\./);
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


// ---------- Rangement par groupes (ordre logique pour un chef) ----------
// Chaque groupe : nom, phrase d'introduction, et débuts de titres (sans accent, minuscules) des fiches qui y vont, dans l'ordre d'affichage.
// `titres` (optionnel) : titre plus simple affiché à la place du titre d'origine (le texte source n'est pas modifié).
const GROUPES = [
  { nom: "1 · Les bases : HACCP, PMS, qui contrôle", intro: "Les mots qu'on entend tout le temps, et quelles règles s'appliquent à votre restaurant.", fiches: [
    ["haccp, ccp, pms", "HACCP, CCP, PMS : ce que c'est"],
    ["ddpp, rappelconso", "La DDPP et RappelConso"],
    ["culture de la securite", "La culture de la sécurité alimentaire"],
    ["quelle annexe de l'arrete", "Quelles règles pour quel type d'établissement ?"],
    ["annexe iv : changements", "Restauration collective : ce qui a changé en 2020"],
  ] },
  { nom: "2 · Le froid et le chaud pendant le service", intro: "Les températures à connaître au quotidien.", fiches: [
    ["temperatures maximales de conservation", "Températures maximales de conservation au froid"],
    ["chaine du froid", "Chaîne du froid : les principes"],
    ["maintien au chaud", "Maintien au chaud : 63 °C minimum"],
    ["zone de danger", "La zone de danger"],
    ["temperature a coeur", "La température à cœur"],
  ] },
  { nom: "3 · La cuisson", intro: "Les températures de cuisson et leur origine.", fiches: [
    ["baremes de cuisson", "Barèmes de cuisson du guide Restaurateur"],
    ["cuisson par type de viande", "Cuisson des viandes dans l'arrêté"],
    ["valeur d, valeur z", "Valeur D, valeur z (pour comprendre les barèmes)"],
  ] },
  { nom: "4 · Refroidir, réchauffer, congeler, décongeler", intro: "Tout ce qui se passe entre la cuisson et l'assiette. Les fiches « restauration collective » sont des règles écrites pour les collectivités ; pour un restaurant commercial, ce sont des repères.", fiches: [
    ["refroidissement", "Refroidissement : de 63 °C à 10 °C en 2 h maximum (collectivités)"],
    ["remise en temperature", "Remise en température : 1 h maximum, 63 °C minimum (collectivités)"],
    ["surgelation et congelation", "Surgélation et congélation"],
    ["decongelation", "Décongélation"],
    ["duree de vie des plats", "Durée de vie des plats préparés à l'avance : 3 jours (collectivités)"],
    ["preparations servies froides", "Préparations servies froides (collectivités)"],
    ["fin de service", "Fin de service : restes et excédents (collectivités)"],
    ["plats temoins", "Plats témoins : 5 jours (collectivités)"],
  ] },
  { nom: "5 · Produits particuliers", intro: "Viande hachée, gibier, œufs, poisson.", fiches: [
    ["viande hachee (cession", "Viande hachée vendue au client"],
    ["gibier sauvage", "Gibier sauvage en petites quantités"],
    ["oeufs", "Les œufs"],
    ["histamine", "Poisson : l'histamine"],
    ["anisakis", "Poisson : l'anisakis (vers)"],
  ] },
  { nom: "6 · Dates, allergènes et information du client", intro: "Ce que le client doit savoir, et les dates de vos produits.", fiches: [
    ["dlc et ddm", "DLC et DDM : la différence"],
    ["14 allergenes", "Les 14 allergènes"],
    ["etude de duree de conservation", "Étude de durée de conservation"],
    ["don alimentaire", "Donner des denrées (don alimentaire)"],
  ] },
  { nom: "7 · Hygiène du personnel, locaux et nettoyage", intro: "Les règles de base de la cuisine : mains, tenue, locaux, déchets, nuisibles.", fiches: [
    ["hygiene du personnel", "Hygiène du personnel"],
    ["formation", "Formation"],
    ["locaux et equipements", "Locaux et équipements"],
    ["contamination croisee, dechets", "Contamination croisée, déchets, eau, nuisibles"],
    ["contamination croisee", "La contamination croisée"],
  ] },
  { nom: "8 · Les germes et les intoxications", intro: "Les bactéries qu'on rencontre en cuisine et ce qu'est une TIAC.", fiches: [
    ["tiac", "TIAC : intoxication alimentaire collective"],
    ["effet indesirable inhabituel", "Effet indésirable inhabituel (au moins 2 clients)"],
    ["salmonella (", "Salmonella"],
    ["listeria monocytogenes", "Listeria monocytogenes"],
    ["campylobacter", "Campylobacter"],
    ["e. coli", "E. coli STEC"],
    ["staphylococcus", "Staphylococcus aureus"],
    ["clostridium perfringens", "Clostridium perfringens et Bacillus cereus"],
    ["clostridium botulinum", "Clostridium botulinum (botulisme)"],
    ["spores", "Les spores"],
  ] },
  { nom: "9 · Analyses de laboratoire (règlement 2073/2005)", intro: "Les seuils officiels si vous faites analyser vos produits. Ce règlement ne fixe pas de fréquence d'analyses pour un restaurant.", fiches: [
    ["critere de securite", "Critère de sécurité et critère d'hygiène"],
    ["listeria monocytogenes : seuils", "Listeria : les seuils"],
    ["salmonella : absence", "Salmonella : absence dans 25 g"],
    ["viande hachee et preparations", "Viande hachée et préparations de viande : critères"],
    ["autres criteres", "Autres critères utiles en cuisine"],
  ] },
  { nom: "10 · Le contrôle officiel : le déroulement", intro: "Comment se passe une inspection.", fiches: [["comment se passe", null], ["ce que l'inspecteur prepare", null], ["le vade-mecum", null], ["reactivite", null], ["action corrective", null]] },
  { nom: "11 · Le contrôle officiel : les notes", intro: "Comment l'inspecteur note : A, B, C, D.", fiches: [["les notes a", null], ["la note globale", null]] },
  { nom: "12 · Le contrôle officiel : ce qui pèse le plus", intro: "Les situations qui valent une note D ou C. À éviter en priorité.", fiches: [["notes d : temperatures", null], ["notes d : tracabilite", null], ["notes d : locaux", null], ["notes d : personnel", null], ["notes c", null]] },
  { nom: "13 · Le contrôle officiel : retraits et rappels", intro: "Que faire quand un produit est rappelé : le délai, l'affichage, le produit retiré.", fiches: [["retrait et rappel", null], ["retirer un produit", null], ["informer les clients", null], ["que faire d'un produit", null], ["prevenir ceux", null]] },
  { nom: "14 · Le contrôle officiel : petits restaurants et produits d'entretien", intro: "Les assouplissements pour les petites équipes, et le rangement des produits.", fiches: [["petits restaurants", null], ["produits d'entretien", null]] },
];
{
  const reste = [];
  const rang = new Map();
  for (const e of entrees) {
    const t = normaliser(e.titre).replace(/œ/g, "oe");
    let meilleur = null;
    GROUPES.forEach((g, gi) => g.fiches.forEach(([debut, nouveau], fi) => {
      if (t.startsWith(debut) && (!meilleur || debut.length > meilleur.debut.length)) meilleur = { gi, fi, debut, nouveau };
    }));
    const trouve = !!meilleur;
    if (meilleur) { e.section = GROUPES[meilleur.gi].nom; if (meilleur.nouveau) e.titre = meilleur.nouveau; rang.set(e, meilleur.gi * 100 + meilleur.fi); }
    if (!trouve) reste.push(e.titre);
  }
  if (reste.length) { console.error("NON RANGÉES : " + reste.join(" | ")); process.exit(1); }
  entrees.sort((a, b) => rang.get(a) - rang.get(b));
}

for (const e of entrees) {
  const texteTout = normaliser([e.titre, ...e.champs.map((c) => c.texte)].join(" "));
  const extra = Object.entries(MOTS_CLES_EN_PLUS).filter(([cle]) => texteTout.includes(normaliser(cle))).map(([, v]) => v).join(" ");
  e.motsCles = extra;
}

const sortie = `// FICHIER GÉNÉRÉ par scripts/genererLexique.mjs à partir de docs/lexique-haccp.md : ne pas modifier à la main.
// Chaque entrée porte sa source, son lien et son niveau de certitude (verifie / a-confirmer / mixte).
export const LEXIQUE_DATE = ${JSON.stringify(new Date().toISOString().slice(0, 10))};
export const LEXIQUE_GROUPES = ${JSON.stringify(GROUPES.map((g) => ({ nom: g.nom, intro: g.intro })), null, 1)};
export const LEXIQUE = ${JSON.stringify(entrees, null, 1)};
`;
fs.writeFileSync(path.join(racine, "src/lexiqueDonnees.js"), sortie);
console.log(entrees.length + " entrées, sections : " + [...new Set(entrees.map((e) => e.section))].join(" | "));
