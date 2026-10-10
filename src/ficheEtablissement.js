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
