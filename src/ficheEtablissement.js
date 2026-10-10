// Fiche de l'établissement (module 1 du PMS) : liste des champs, partagée par l'écran (App.jsx) et par la
// lecture/écriture en base (ConnexionReelle.jsx). `colonne` = nom de la colonne de la table etablissements.
// `type` : texte | nombre | date | choix | liste. `requis` = compte dans le niveau de remplissage.
export const FORMES_JURIDIQUES = ["SARL", "SAS", "SASU", "EURL", "SA", "EI / micro-entreprise", "Association", "Autre"];
export const TYPES_ETABLISSEMENT = ["Restaurant", "Pizzeria", "Crêperie", "Brasserie", "Snack", "Traiteur", "Bar avec restauration", "Autre"];
export const SERVICES_ETABLISSEMENT = ["Sur place", "À emporter", "Livraison", "Buffet"];

export const FICHE_ETAB_GROUPES = [
  { id: "societe", titre: "Société" },
  { id: "site", titre: "Établissement" },
  { id: "activite", titre: "Activité" },
  { id: "responsables", titre: "Responsables" },
];

export const FICHE_ETAB_CHAMPS = [
  { cle: "raisonSociale", colonne: "raison_sociale", groupe: "societe", label: "Raison sociale", type: "texte", requis: true, aide: "Telle qu'elle figure sur le Kbis." },
  { cle: "formeJuridique", colonne: "forme_juridique", groupe: "societe", label: "Forme juridique", type: "choix", options: FORMES_JURIDIQUES },
  { cle: "siret", colonne: "siret", groupe: "societe", label: "SIRET (14 chiffres)", type: "texte", requis: true, aide: "Sur votre Kbis ou votre avis de situation INSEE." },
  { cle: "adresseSiege", colonne: "adresse_siege", groupe: "societe", label: "Adresse du siège", type: "texte" },
  { cle: "nom", colonne: "nom", groupe: "site", label: "Nom de l'établissement (enseigne)", type: "texte", requis: true },
  { cle: "adresseSite", colonne: "adresse_site", groupe: "site", label: "Adresse du site d'exploitation", type: "texte", requis: true },
  { cle: "telephone", colonne: "telephone", groupe: "site", label: "Téléphone", type: "texte", requis: true },
  { cle: "emailGeneral", colonne: "email_general", groupe: "site", label: "E-mail général", type: "texte", requis: true },
  { cle: "dateDebutActivite", colonne: "date_debut_activite", groupe: "site", label: "Début d'activité sur le site", type: "date" },
  { cle: "dateDeclarationActivite", colonne: "date_declaration_activite", groupe: "site", label: "Date de la déclaration d'activité (Cerfa 13984)", type: "date", aide: "Déposée auprès de la DDPP avant le démarrage de l'activité. Gardez le récépissé." },
  { cle: "codeNaf", colonne: "code_naf", groupe: "activite", label: "Code NAF / APE", type: "texte", requis: true, aide: "Exemple : 56.10A. Il détermine si la formation hygiène de 14 h s'applique." },
  { cle: "typeEtablissement", colonne: "type_etablissement", groupe: "activite", label: "Type d'établissement", type: "choix", options: TYPES_ETABLISSEMENT },
  { cle: "services", colonne: "services", groupe: "activite", label: "Services proposés", type: "liste", options: SERVICES_ETABLISSEMENT },
  { cle: "couvertsJour", colonne: "couverts_jour", groupe: "activite", label: "Couverts servis par jour (en moyenne)", type: "nombre", requis: true, aide: "Une estimation suffit." },
  { cle: "effectif", colonne: "effectif", groupe: "activite", label: "Effectif", type: "nombre" },
  { cle: "conventionCollective", colonne: "convention_collective", groupe: "activite", label: "Convention collective applicable", type: "texte", aide: "À confirmer avec votre expert-comptable : le logiciel ne la présume pas." },
  { cle: "exploitant", colonne: "exploitant", groupe: "responsables", label: "Exploitant (nom)", type: "texte", requis: true },
  { cle: "exploitantFonction", colonne: "exploitant_fonction", groupe: "responsables", label: "Fonction de l'exploitant", type: "texte" },
  { cle: "responsableHygiene", colonne: "responsable_hygiene", groupe: "responsables", label: "Responsable hygiène / référent PMS (nom)", type: "texte", requis: true },
  { cle: "responsableHygieneFonction", colonne: "responsable_hygiene_fonction", groupe: "responsables", label: "Fonction du responsable hygiène", type: "texte" },
];

// Remarques de saisie (affichées en gris, jamais bloquantes).
export function remarqueChamp(cle, valeur) {
  const v = (valeur || "").toString().trim();
  if (!v) return "";
  if (cle === "siret" && !/^\d{14}$/.test(v.replace(/\s/g, ""))) return "Un SIRET comporte 14 chiffres.";
  if (cle === "codeNaf" && !/^\d{2}\.\d{2}[A-Za-z]$/.test(v)) return "Format attendu : 56.10A";
  if (cle === "emailGeneral" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Cette adresse e-mail semble incomplète.";
  return "";
}

/* ---------- Dossier PMS : prestataires, formations, pièces jointes ---------- */

export const TYPES_PRESTATAIRE = [
  { value: "antinuisibles", label: "Lutte antinuisibles" },
  { value: "maintenance_froid_sondes", label: "Maintenance du froid et des sondes" },
  { value: "entretien_materiel", label: "Entretien du matériel" },
  { value: "laboratoire", label: "Laboratoire d'analyses" },
  { value: "huiles_usagees", label: "Collecte des huiles usagées" },
  { value: "dechets", label: "Déchets et biodéchets" },
  { value: "autre", label: "Autre prestataire" },
];
// Types que le PMS attend en priorité (proposés « à renseigner » tant qu'ils sont absents).
export const TYPES_PRESTATAIRE_ATTENDUS = ["antinuisibles", "maintenance_froid_sondes", "entretien_materiel", "laboratoire", "huiles_usagees", "dechets"];
export const FREQUENCES_RAPPEL = [
  { value: "mensuelle", label: "Chaque mois", mois: 1 },
  { value: "trimestrielle", label: "Chaque trimestre", mois: 3 },
  { value: "semestrielle", label: "Chaque semestre", mois: 6 },
  { value: "annuelle", label: "Chaque année", mois: 12 },
];
export const CATEGORIES_DOCUMENT = [
  { value: "declaration_activite", label: "Déclaration d'activité (récépissé)" },
  { value: "attestation_formation", label: "Attestation de formation" },
  { value: "contrat_nuisibles", label: "Contrat ou rapport antinuisibles" },
  { value: "attestation_eau", label: "Attestation d'eau potable" },
  { value: "rapport_laboratoire", label: "Rapport de laboratoire" },
  { value: "contrat_maintenance", label: "Contrat ou rapport de maintenance" },
  { value: "fds", label: "Fiche de données de sécurité" },
  { value: "autre", label: "Autre document" },
];
export const TYPES_FORMATION = [
  { value: "hygiene_14h", label: "Formation hygiène alimentaire de 14 h" },
  { value: "haccp", label: "Formation HACCP (personne qui établit le PMS)" },
  { value: "instructions", label: "Consignes d'hygiène remises" },
  { value: "consigne_sante", label: "Consigne maladie / plaie remise" },
];

export function libelleDe(liste, valeur) {
  const t = liste.find((x) => x.value === valeur);
  return t ? t.label : valeur || "";
}

// Ajoute n mois à une date AAAA-MM-JJ (fin de mois respectée : 31 janvier + 1 mois = 28/29 février).
export function ajouterMois(dateStr, n) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + n, d));
  if (dt.getUTCDate() !== d) dt.setUTCDate(0);
  return dt.toISOString().slice(0, 10);
}

// État d'une échéance : 'aucune' | 'depassee' | 'bientot' (30 jours ou moins) | 'ok'.
export function etatEcheance(dateStr, aujourdhui) {
  if (!dateStr) return { etat: "aucune", jours: null };
  const jours = Math.round((Date.parse(dateStr + "T00:00:00Z") - Date.parse(aujourdhui + "T00:00:00Z")) / 86400000);
  if (jours < 0) return { etat: "depassee", jours };
  if (jours <= 30) return { etat: "bientot", jours };
  return { etat: "ok", jours };
}
