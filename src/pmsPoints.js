// Points du PMS à suivre dans le Paramétrage (Dossier PMS). Source : « PMS complet client » v4 (13/10), « ce qui doit exister » v1,
// analyse du 10/10. Gabarit : Question → Aide concrète → Base légale vérifiée → Action proposée si « Non ».
// `cat` = lettre de la partie (A à H, voir PMS_CATEGORIES dans App.jsx). `auto` = constat du logiciel (clé lue dans App.jsx), jamais bloquant.
export const ETATS_POINT_PMS = [
  { value: "fait", label: "Fait", couleur: "#1E7B4B" },
  { value: "incomplet", label: "Incomplet", couleur: "#B7791F" },
  { value: "pas_fait", label: "Pas fait", couleur: "#C1432D" },
];

export const PMS_POINTS = [
  // ---------- A — Société, direction, employés (modules 1 et 2) ----------
  { id: "a-declaration", cat: "A", mod: "1.3", titre: "Établissement notifié à l'autorité compétente (déclaration d'activité, Cerfa 13984)",
    aide: "Tout exploitant notifie à l'autorité compétente chacun de ses établissements en vue de l'enregistrement, et signale toute modification significative de ses activités ou toute fermeture.", base: "Règlement (CE) 852/2004, art. 6 §2", auto: "declaration" },
  { id: "a-agrement", cat: "A", mod: "1.3", titre: "Agrément sanitaire : concerné ou non",
    aide: "Question à poser à la DDPP selon votre activité : aucun texte lu ici ne tranche votre cas.", base: "Règlement (CE) 853/2004 (non relu)", },
  { id: "a-referent", cat: "A", mod: "1.3", titre: "Exploitant et personne responsable de la procédure HACCP identifiés",
    aide: "Exploitant et personne responsable de la mise au point et du maintien de la procédure HACCP.", base: "Règlement (CE) 852/2004, art. 1(1)(a) : « la responsabilité première en matière de sécurité alimentaire incombe à l'exploitant du secteur alimentaire » ; annexe II, chap. XII point 2", auto: "referent" },
  { id: "a-activite", cat: "A", mod: "1.2", titre: "Activité de l'établissement décrite",
    aide: "Description de l'activité, proportionnée à la nature et à la taille de l'entreprise.", base: "Règlement (CE) 852/2004, art. 5 §2 g)", auto: "fiche" },
  { id: "a-formation14", cat: "A", mod: "2.2", titre: "Formation hygiène de 14 h : au moins UNE personne de l'effectif formée (ou dérogation)",
    aide: "Pas d'obligation par employé. Dérogations : 3 ans d'expérience comme exploitant ou gestionnaire, ou diplôme de la liste de l'arrêté du 18/11/2024. Justificatifs présentables sur place.", base: "Code rural, art. L.233-4 et D.233-11 à D.233-13 ; arrêté du 12/02/2024", auto: "formation14" },
  { id: "a-formation-haccp", cat: "A", mod: "2.2", titre: "Formation HACCP de la personne qui établit et maintient le PMS",
    aide: "« La formation appropriée en ce qui concerne l'application des principes HACCP » pour les personnes responsables de la mise au point et du maintien de la procédure. Le texte ne fixe ni durée ni diplôme. Distincte de la formation de 14 h.", base: "Règlement (CE) 852/2004, annexe II, chap. XII", auto: "formationHaccp" },
  { id: "a-instructions", cat: "A", mod: "2.2", titre: "Manutentionnaires encadrés, avec instructions et/ou formation à l'hygiène adaptées à leur activité",
    aide: "Les manutentionnaires de denrées sont encadrés et disposent d'instructions et/ou d'une formation en matière d'hygiène alimentaire adaptées à leur activité.", base: "Règlement (CE) 852/2004, annexe II, chap. XII point 1", auto: "instructions" },
  { id: "a-sante", cat: "A", mod: "2.3", titre: "Personne malade ou blessée : pas de manipulation des denrées, information immédiate de l'exploitant",
    aide: "Aucune personne atteinte d'une maladie susceptible d'être transmise par les aliments, ou souffrant de plaies infectées, d'infections ou lésions cutanées ou de diarrhée, ne doit manipuler les denrées s'il existe un risque de contamination ; elle informe immédiatement l'exploitant.", base: "Règlement (CE) 852/2004, annexe II, chap. VIII point 2", auto: "consigneSante" },
  { id: "a-tenue", cat: "A", mod: "2.3", titre: "Hygiène personnelle, tenue, vestiaires",
    aide: "Voir les textes cités.", base: "Règlement (CE) 852/2004, annexe II, chap. VIII ; Code du travail R.4228-5 et R.4228-6 (vestiaires)", },
  { id: "a-registre-personnel", cat: "A", mod: "2.1", titre: "Registre unique du personnel tenu (hors du logiciel)",
    aide: "Obligation d'employeur distincte du PMS ; ne rien saisir d'adresse personnelle, de date de naissance ni de santé dans le logiciel.", base: "Code du travail, art. L.1221-13 et D.1221-23", },
  { id: "a-equipe", cat: "A", mod: "2.1", titre: "Équipe créée dans le logiciel (un compte par personne, avec son poste)",
    aide: "Documents et dossiers en fonction de la nature et de la taille de l'entreprise, pour prouver l'application effective des mesures.", base: "Règlement (CE) 852/2004, art. 5(2)(g) : enregistrements", auto: "equipe" },

  // ---------- B — Locaux, nettoyage, prestataires (module 4) ----------
  { id: "b-plan", cat: "B", mod: "4.1", titre: "Locaux : conception et organisation",
    aide: "Voir les textes cités.", base: "Règlement (CE) 852/2004, annexe II, chap. I et II", auto: "plan" },
  { id: "b-equipements", cat: "B", mod: "4.2", titre: "Équipements entretenus et nettoyés",
    aide: "Voir le texte cité.", base: "Règlement (CE) 852/2004, annexe II, chap. V", auto: "appareils" },
  { id: "b-nettoyage", cat: "B", mod: "4.3", titre: "Nettoyage à une fréquence suffisante pour éviter tout risque de contamination",
    aide: "Nettoyage « à une fréquence suffisante pour éviter tout risque de contamination » (annexe II, chap. V §1 a). Le texte ne fixe aucune fréquence chiffrée.", base: "Règlement (CE) 852/2004, annexe II, chap. I et V", auto: "nettoyage" },
  { id: "b-fds", cat: "B", mod: "4.3", titre: "Fiches de données de sécurité des produits",
    aide: "Fiches de données de sécurité des produits.", base: "Code du travail, art. R.4412-39", auto: "fds" },
  { id: "b-nuisibles", cat: "B", mod: "4.4", titre: "Lutte contre les organismes nuisibles",
    aide: "Voir le texte cité.", base: "Règlement (CE) 852/2004, annexe II, chap. IX point 4", auto: "presta:antinuisibles" },
  { id: "b-froid", cat: "B", mod: "4.4", titre: "Équipements : maintenance (froid et sondes)",
    aide: "Voir le texte cité.", base: "Règlement (CE) 852/2004, annexe II, chap. V", auto: "presta:maintenance_froid_sondes" },
  { id: "b-dechets", cat: "B", mod: "4.4", titre: "Déchets et biodéchets",
    aide: "Voir les textes cités.", base: "Règlement (CE) 852/2004, annexe II, chap. VI ; loi AGEC (biodéchets)", auto: "presta:dechets" },
  { id: "b-huiles", cat: "B", mod: "4.4", titre: "Huiles usagées",
    aide: "Voir le texte cité.", base: "Texte non relu", auto: "presta:huiles_usagees" },
  { id: "b-labo", cat: "B", mod: "4.4", titre: "Laboratoire d'analyses",
    aide: "Aucun texte lu ne fixe de fréquence d'analyses pour un restaurant.", base: "Règlement (CE) 2073/2005 (critères microbiologiques)", auto: "presta:laboratoire" },
  { id: "b-eau", cat: "B", mod: "4.5", titre: "Approvisionnement en eau",
    aide: "L'alimentation en eau potable doit être en quantité suffisante pour éviter la contamination des denrées.", base: "Règlement (CE) 852/2004, annexe II, chap. VII", auto: "eau" },
  { id: "b-eau-circuit", cat: "B", mod: "4.5", titre: "Eau non potable : circuit séparé",
    aide: "Voir le texte cité.", base: "Règlement (CE) 852/2004, annexe II, chap. VII", },

  // ---------- C — Fournisseurs et réception (module 3) ----------
  { id: "c-registre", cat: "C", mod: "3.1", titre: "Fournisseurs identifiés",
    aide: "Savoir qui vous fournit et pouvoir le prouver.", base: "Règlement (CE) 853/2004 (marque de salubrité) ; 178/2002, art. 18", auto: "fournisseurs" },
  { id: "c-controle", cat: "C", mod: "3.2", titre: "Contrôle des denrées à la réception",
    aide: "Voir les textes cités.", base: "Arrêté du 21/12/2009, annexe I ; règlement (CE) 852/2004, annexe II, chap. IX", auto: "receptions" },
  { id: "c-limites", cat: "C", mod: "3.2", titre: "Limites de température à la réception",
    aide: "Maximales (sauf guide validé) : viande hachée +2 °C ; abats d'ongulés +3 °C ; préparations de viandes et volailles +4 °C ; autres très périssables +4 °C ; autres périssables +8 °C ; congelés −12 °C (glaces −18 °C).", base: "Arrêté du 21/12/2009, annexe I et art. 3", },
  { id: "c-tracabilite", cat: "C", mod: "3.3", titre: "Traçabilité amont",
    aide: "Savoir qui vous fournit et pouvoir le prouver. Aucune durée de conservation générale confirmée pour un restaurant dans nos lectures (le logiciel garde le texte 5 ans et les photos 6 mois).", base: "Règlement (CE) 178/2002, art. 18", },

  // ---------- D — Maîtrise des dangers HACCP (module 5) ----------
  { id: "d-dangers", cat: "D", mod: "5.1", titre: "Analyse des dangers, points critiques, limites, surveillance et actions correctives",
    aide: "Identifier les dangers, les points critiques, les limites critiques, la surveillance et les actions correctives (principes HACCP a à e).", base: "Règlement (CE) 852/2004, art. 5(2)(a) à (e)", },
  { id: "d-froid", cat: "D", mod: "5.1", titre: "Chaîne du froid",
    aide: "Voir le texte cité.", base: "Règlement (CE) 852/2004, annexe II, chap. IX", auto: "temperatures" },
  { id: "d-cuisson", cat: "D", mod: "5.1", titre: "Cuisson",
    aide: "Barèmes indicatifs du guide : viande hachée 71 °C ; volaille hachée 74 °C ; viandes coupées 63 °C. Volaille entière et autres préparations : aucun barème officiel lu.", base: "Guide du restaurateur 2015 (page 180)", auto: "cuissons" },
  { id: "d-refroidissement", cat: "D", mod: "5.1", titre: "Refroidissement",
    aide: "De +63 °C à +10 °C en moins de 2 h, puis 0 à +3 °C : texte écrit pour la restauration collective.", base: "Arrêté du 21/12/2009, annexe IV", auto: "refroidissements" },
  { id: "d-maintien", cat: "D", mod: "5.1", titre: "Maintien au chaud",
    aide: "Sous 63 °C, aucune règle écrite.", base: "Arrêté du 21/12/2009, annexe I (liaison chaude)", auto: "maintiens" },
  { id: "d-huile", cat: "D", mod: "5.1", titre: "Huile de friture",
    aide: "Voir le guide cité.", base: "Guide du restaurateur 2015", auto: "huiles" },
  { id: "d-decongelation", cat: "D", mod: "5.1", titre: "Décongélation",
    aide: "Décongélation en enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée, à défaut entre 0 °C et +4 °C. Autre méthode possible avec une analyse des dangers validée.", base: "Arrêté du 21/12/2009, annexe VI", },
  { id: "d-verification", cat: "D", mod: "5.2", titre: "Vérification périodique de l'efficacité des mesures",
    aide: "Procédures « exécutées périodiquement pour vérifier l'efficacité des mesures ». Le texte ne fixe aucune périodicité chiffrée ni revue annuelle.", base: "Règlement (CE) 852/2004, art. 5(2)(f)", },
  { id: "d-labo", cat: "D", mod: "5.3", titre: "Analyses de laboratoire",
    aide: "Aucun texte lu ne fixe de fréquence pour un restaurant.", base: "Règlement (CE) 2073/2005", auto: "analyses" },

  // ---------- E — Traçabilité, allergènes, TIAC, rappels (module 6) ----------
  { id: "e-interne", cat: "E", mod: "6.1", titre: "Traçabilité interne",
    aide: "Voir le texte cité.", base: "Règlement (CE) 178/2002, art. 18", auto: "etiquettes" },
  { id: "e-allergenes", cat: "E", mod: "6.2", titre: "Information sur les allergènes",
    aide: "Information sur les allergènes.", base: "Règlement (UE) 1169/2011, art. 44 ; décret 2015-447", auto: "allergenes" },
  { id: "e-origine", cat: "E", mod: "6.3", titre: "Origine des viandes",
    aide: "Obligatoire ; son absence peut être sanctionnée d'une contravention de 5ᵉ classe.", base: "Décret 2025-141", auto: "origine" },
  { id: "e-tiac", cat: "E", mod: "6.4", titre: "Toxi-infection alimentaire collective (TIAC)",
    aide: "Procédure en 7 étapes dans « Procédure de TIAC ».", base: "Règlement (CE) 178/2002 (texte non relu)", },
  { id: "e-rappel", cat: "E", mod: "6.5", titre: "Retrait et rappel de produits",
    aide: "Le logiciel vérifie vos produits sur RappelConso.", base: "Règlement (CE) 178/2002, art. 19", },

  // ---------- F — Non-conformités (module 7) ----------
  { id: "f-registre", cat: "F", mod: "7", titre: "Actions correctives",
    aide: "Actions correctives (principe HACCP e).", base: "Règlement (CE) 852/2004, art. 5(2)(e)", auto: "alertes" },
  { id: "f-efficacite", cat: "F", mod: "7", titre: "Vérification de l'efficacité des actions correctives",
    aide: "Vérification de l'efficacité (principe HACCP f).", base: "Règlement (CE) 852/2004, art. 5(2)(e) et (f)", },

  // ---------- G — Documents (module 8) ----------
  { id: "g-echeances", cat: "G", mod: "8", titre: "Documents et dossiers prouvant l'application des mesures",
    aide: "Documents et dossiers pour prouver l'application effective des mesures.", base: "Règlement (CE) 852/2004, art. 5(2)(g)", auto: "documents" },

  // ---------- H — Synthèse, contrôle, validation (module 9) ----------
  { id: "h-controle", cat: "H", mod: "9", titre: "Preuve de conformité à fournir à l'autorité compétente",
    aide: "L'exploitant fournit à l'autorité compétente la preuve de sa conformité. Le « Dossier imprimable » réunit les documents du logiciel.", base: "Règlement (CE) 852/2004, art. 5(1) : preuve de conformité à fournir à l'autorité", },
  { id: "h-validation", cat: "H", mod: "Validation", titre: "Responsabilité de l'exploitant",
    aide: "Le logiciel ne rédige ni ne valide le PMS à la place de l'exploitant.", base: "Règlement (CE) 852/2004, art. 1(1)(a)", },
];

export function pointsDeCategorie(lettre) { return PMS_POINTS.filter((p) => p.cat === lettre); }

// Bilan global : un point sans réponse compte comme « pas fait ».
export function bilanPointsPms(reponses, points = PMS_POINTS) {
  const r = { fait: 0, incomplet: 0, pas_fait: 0, total: points.length };
  points.forEach((p) => { const e = reponses && reponses[p.id] && reponses[p.id].etat; if (e === "fait") r.fait++; else if (e === "incomplet") r.incomplet++; else r.pas_fait++; });
  return r;
}
