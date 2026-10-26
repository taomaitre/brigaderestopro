// Points du PMS à suivre dans le Paramétrage (Dossier PMS). Source : « PMS complet client » v4 (13/10), « ce qui doit exister » v1,
// analyse du 10/10. Gabarit : Question → Aide concrète → Base légale vérifiée → Action proposée si « Non ».
// `cat` = lettre de la partie (A à H, voir PMS_CATEGORIES dans App.jsx). `auto` = constat du logiciel (clé lue dans App.jsx), jamais bloquant.
export const ETATS_POINT_PMS = [
  { value: "fait", label: "Fait", couleur: "#1E7B4B" },
  { value: "incomplet", label: "Incomplet", couleur: "#B7791F" },
  { value: "pas_fait", label: "Pas fait", couleur: "#C1432D" },
];

const VMG_V7 = "Vade-mecum général V7 sept. 2026 (ministère de l'Agriculture)";
const VMS_RD = "Vade-mecum sectoriel « Remise directe » V3 sept. 2026 (ministère de l'Agriculture)";

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
  { id: "a-effectif", cat: "A", mod: "1.2", titre: "Effectif au contact des denrées : 5 personnes ou moins ? (souplesse possible)",
    aide: "Avec 5 personnes physiques ou moins au contact des denrées (cuisine, vente), l'établissement peut bénéficier de mesures de flexibilité : procédures orales acceptées, enregistrements limités aux écarts et aux mesures correctives pour les bonnes pratiques d'hygiène. Cuissons, refroidissements, maintien au chaud et préparations à risque restent à documenter complètement, sauf guide de bonnes pratiques évalué. La souplesse peut être suspendue si l'inspecteur constate des manquements.", base: VMG_V7 + ", chapitre II.B.3 (cite l'instruction DGAL/SDSSA/2018-924 du 7/01/2019, non relue)", },
  { id: "a-formation14", cat: "A", mod: "2.2", titre: "Formation hygiène de 14 h : au moins UNE personne de l'effectif formée (ou dérogation)",
    aide: "Pas d'obligation par employé. Dérogations : 3 ans d'expérience comme exploitant ou gestionnaire, ou diplôme de la liste de l'arrêté du 18/11/2024. Justificatifs présentables sur place.", base: "Code rural, art. L.233-4 et D.233-11 à D.233-13 ; arrêté du 12/02/2024", auto: "formation14" },
  { id: "a-formation-haccp", cat: "A", mod: "2.2", titre: "Formation HACCP de la personne qui établit et maintient le PMS",
    aide: "« La formation appropriée en ce qui concerne l'application des principes HACCP » pour les personnes responsables de la mise au point et du maintien de la procédure. Le texte ne fixe ni durée ni diplôme. Distincte de la formation de 14 h.", base: "Règlement (CE) 852/2004, annexe II, chap. XII", auto: "formationHaccp" },
  { id: "a-instructions", cat: "A", mod: "2.2", titre: "Manutentionnaires encadrés, avec instructions et/ou formation à l'hygiène adaptées à leur activité",
    aide: "Les manutentionnaires de denrées sont encadrés et disposent d'instructions et/ou d'une formation en matière d'hygiène alimentaire adaptées à leur activité.", base: "Règlement (CE) 852/2004, annexe II, chap. XII point 1", auto: "instructions" },
  { id: "a-sante", cat: "A", mod: "2.3", titre: "Personne malade ou blessée : pas de manipulation des denrées, information immédiate de l'exploitant",
    aide: "Aucune personne atteinte d'une maladie susceptible d'être transmise par les aliments, ou souffrant de plaies infectées, d'infections ou lésions cutanées ou de diarrhée, ne doit manipuler les denrées s'il existe un risque de contamination ; elle informe immédiatement l'exploitant.", base: "Règlement (CE) 852/2004, annexe II, chap. VIII point 2", auto: "consigneSante" },
  { id: "a-tenue", cat: "A", mod: "2.3", titre: "Hygiène personnelle, tenue, vestiaires",
    aide: "Un niveau élevé de propreté personnelle est exigé, avec des tenues propres et adaptées au travail (chap. VIII). Des lavabos pour se laver les mains, avec eau chaude et froide et un moyen de nettoyage et de séchage hygiénique, sont prévus dans les locaux (chap. I). Des vestiaires sont exigés quand l'hygiène l'impose.", base: "Règlement (CE) 852/2004, annexe II, chap. I et chap. VIII ; Code du travail R.4228-5 et R.4228-6 (vestiaires)", },
  { id: "a-registre-personnel", cat: "A", mod: "2.1", titre: "Registre unique du personnel tenu (hors du logiciel)",
    aide: "Obligation d'employeur distincte du PMS ; ne rien saisir d'adresse personnelle, de date de naissance ni de santé dans le logiciel.", base: "Code du travail, art. L.1221-13 et D.1221-23", },
  { id: "a-equipe", cat: "A", mod: "2.1", titre: "Équipe créée dans le logiciel (un compte par personne, avec son poste)",
    aide: "Documents et dossiers en fonction de la nature et de la taille de l'entreprise, pour prouver l'application effective des mesures.", base: "Règlement (CE) 852/2004, art. 5(2)(g) : enregistrements", auto: "equipe" },

  // ---------- B — Locaux, nettoyage, prestataires (module 4) ----------
  { id: "b-plan", cat: "B", mod: "4.1", titre: "Locaux : conception et organisation",
    aide: "Les locaux sont propres et en bon état. Là où l'on prépare les denrées, les sols, murs et surfaces de travail sont lisses, lavables et non absorbants. Les toilettes n'ouvrent pas directement sur les locaux de manipulation. L'air ne circule pas d'une zone contaminée vers une zone propre (chap. I et II).", base: "Règlement (CE) 852/2004, annexe II, chap. I et II", auto: "plan" },
  { id: "b-hotte", cat: "B", mod: "4.1", titre: "Hotte et ventilation : ramonage du conduit, certificat d'entretien hotte et VMC",
    aide: "Le ramonage du conduit de la hotte d'extraction est réalisé périodiquement et le certificat d'entretien du conduit de la hotte et des VMC est disponible. L'inspecteur teste la capacité d'extraction avec une feuille d'essuie-tout devant la grille. Une casquette de hotte est préconisée pour éviter la condensation ; l'entrée d'air neuf doit être suffisante pour ne pas mettre la cuisine en dépression. Le texte ne fixe pas de fréquence : notez celle de votre prestataire.", base: VMS_RD + ", lignes B1L05 et B4L03", auto: "presta:entretien_materiel" },
  { id: "b-salle", cat: "B", mod: "4.1", titre: "Salle de restaurant : pas de source de contamination pour les denrées",
    aide: "Plantes éloignées des circuits des denrées. Seuls lieux de manipulation en salle : l'office (desserts, pain) et la desserte ou le chariot (découpe, flambage devant le client). Toilettes clients et personnel peuvent être communes ; elles peuvent donner sur la salle, mais pas sur une zone de manipulation.", base: VMS_RD + ", ligne B1L07", },
  { id: "b-equipements", cat: "B", mod: "4.2", titre: "Équipements entretenus et nettoyés",
    aide: "Les équipements sont nettoyés et désinfectés à une fréquence suffisante, et installés de façon à pouvoir aussi nettoyer la zone autour (chap. V).", base: "Règlement (CE) 852/2004, annexe II, chap. V", auto: "appareils" },
  { id: "b-sondes", cat: "B", mod: "4.2", titre: "Sondes et thermomètres vérifiés",
    aide: "L'étalonnage des appareils de mesure n'est pas exigé en remise directe, mais leur vérification l'est. Absence ou défaut de vérification : note C à l'inspection. Notez la date et le moyen de vérification (eau glacée, comparaison avec une sonde de référence…).", base: VMS_RD + ", ligne B2L04 ; " + VMG_V7 + ", ligne B2L01", },
  { id: "b-produits-entretien", cat: "B", mod: "4.3", titre: "Produits d'entretien, de maintenance et contre les nuisibles : étiquetés, rangés loin des denrées",
    aide: "Dans leur emballage d'origine ou un récipient fermé et étiqueté en permanence ; rangés dans un local ou un meuble à part, loin des denrées (petit stock d'appoint dans un meuble approprié toléré) ; fiches techniques conservées ; utilisés selon le mode d'emploi du fabricant. Produit contre les nuisibles : numéro d'autorisation sur l'étiquette. Pas de transvasement en bouteille non étiquetée. Biocides stockés près des denrées : note D.", base: VMG_V7 + ", lignes B3L02, B4L02, B5L02 ; " + VMS_RD + ", lignes B3L01 et B5L01", },
  { id: "b-nettoyage", cat: "B", mod: "4.3", titre: "Nettoyage à une fréquence suffisante pour éviter tout risque de contamination",
    aide: "Nettoyage « à une fréquence suffisante pour éviter tout risque de contamination » (annexe II, chap. V §1 a). Le texte ne fixe aucune fréquence chiffrée.", base: "Règlement (CE) 852/2004, annexe II, chap. I et V", auto: "nettoyage" },
  { id: "b-fds", cat: "B", mod: "4.3", titre: "Fiches de données de sécurité des produits",
    aide: "Fiches de données de sécurité des produits.", base: "Code du travail, art. R.4412-39", auto: "fds" },
  { id: "b-nuisibles", cat: "B", mod: "4.4", titre: "Lutte contre les organismes nuisibles",
    aide: "Des procédures adéquates doivent exister pour lutter contre les organismes nuisibles, et les animaux domestiques sont exclus des locaux (chap. IX point 4). Le texte ne fixe pas de fréquence d'intervention : notez ici votre prestataire et sa prochaine visite.", base: "Règlement (CE) 852/2004, annexe II, chap. IX point 4", auto: "presta:antinuisibles" },
  { id: "b-froid", cat: "B", mod: "4.4", titre: "Équipements : maintenance (froid et sondes)",
    aide: "Les équipements sont nettoyés, entretenus et équipés d'un dispositif de contrôle quand c'est nécessaire (chap. V). Le texte ne fixe aucune fréquence de maintenance.", base: "Règlement (CE) 852/2004, annexe II, chap. V", auto: "presta:maintenance_froid_sondes" },
  { id: "b-dechets", cat: "B", mod: "4.4", titre: "Déchets et biodéchets",
    aide: "Les déchets sont retirés des locaux de manipulation aussi vite que possible et rangés dans des conteneurs fermés, avec une aire de stockage propre (chap. VI). Biodéchets : loi AGEC, texte non relu ici.", base: "Règlement (CE) 852/2004, annexe II, chap. VI ; loi AGEC (biodéchets)", auto: "presta:dechets" },
  { id: "b-huiles", cat: "B", mod: "4.4", titre: "Huiles usagées",
    aide: "Les huiles de friture usagées (HCU) ne vont ni aux ordures ménagères, ni dans les canalisations ou le bac à graisse, ni dans l'environnement (art. R.1331-2 du Code de la santé publique). Elles sont enlevées par une entreprise mandatée en vue de leur valorisation (biocarburant). Gardez le contrat et le bordereau d'enlèvement : l'inspecteur demande quoi, qui, quand, comment, et l'autorisation du collecteur. L'établissement de destination doit être approuvé par la DDecPP.", base: VMS_RD + ", ligne E2L02", auto: "presta:huiles_usagees" },
  { id: "b-labo", cat: "B", mod: "4.4", titre: "Laboratoire d'analyses",
    aide: "Aucun texte lu ne fixe de fréquence d'analyses pour un restaurant.", base: "Règlement (CE) 2073/2005 (critères microbiologiques)", auto: "presta:laboratoire" },
  { id: "b-eau", cat: "B", mod: "4.5", titre: "Approvisionnement en eau",
    aide: "L'alimentation en eau potable doit être en quantité suffisante pour éviter la contamination des denrées.", base: "Règlement (CE) 852/2004, annexe II, chap. VII", auto: "eau" },
  { id: "b-eau-circuit", cat: "B", mod: "4.5", titre: "Eau non potable : circuit séparé",
    aide: "L'eau non potable passe par un circuit séparé et signalé. La glace en contact avec les denrées est faite avec de l'eau potable (chap. VII).", base: "Règlement (CE) 852/2004, annexe II, chap. VII", },

  // ---------- C — Fournisseurs et réception (module 3) ----------
  { id: "c-registre", cat: "C", mod: "3.1", titre: "Fournisseurs identifiés",
    aide: "Savoir qui vous fournit et pouvoir le prouver.", base: "Règlement (CE) 853/2004 (marque de salubrité) ; 178/2002, art. 18", auto: "fournisseurs" },
  { id: "c-controle", cat: "C", mod: "3.2", titre: "Contrôle des denrées à la réception",
    aide: "Chaque famille de denrées a sa température maximale à réception (annexe I). Exemples : +2 °C viandes hachées et produits de la pêche frais, +4 °C volailles, -18 °C glaces, viandes hachées et produits de la pêche congelés, -12 °C autres produits congelés. Les matières premières reconnues impropres sont refusées (chap. IX point 1).", base: "Arrêté du 21/12/2009, annexe I ; règlement (CE) 852/2004, annexe II, chap. IX", auto: "receptions" },
  { id: "c-limites", cat: "C", mod: "3.2", titre: "Limites de température à la réception",
    aide: "Maximales (sauf guide validé) : viande hachée +2 °C ; abats d'ongulés +3 °C ; préparations de viandes et volailles +4 °C ; autres très périssables +4 °C ; autres périssables +8 °C ; congelés −12 °C (glaces −18 °C).", base: "Arrêté du 21/12/2009, annexe I et art. 3", },
  { id: "c-conditionnements", cat: "C", mod: "3.2", titre: "Emballages et conditionnements aptes au contact alimentaire",
    aide: "Pas d'alvéoles d'œufs, de cartons ni de palettes en zone de production. Pas de bouteilles d'eau ni de pots de crème réutilisés comme contenants ; pas de sacs poubelle pour stocker des denrées (pain par exemple). Déclaration de conformité contact alimentaire des matériaux (bacs, couvercles, films). Bacs et couvercles déformés remplacés. Conditionnements sales ou non aptes : note D.", base: VMS_RD + ", lignes C402L01 à C402L03 ; règlement (CE) 1935/2004, art. 15", },
  { id: "c-tracabilite", cat: "C", mod: "3.3", titre: "Traçabilité amont",
    aide: "Savoir qui vous fournit et pouvoir le prouver. Aucune durée de conservation générale confirmée pour un restaurant dans nos lectures (le logiciel garde le texte 5 ans et les photos 6 mois).", base: "Règlement (CE) 178/2002, art. 18", },

  // ---------- D — Maîtrise des dangers HACCP (module 5) ----------
  { id: "d-dangers", cat: "D", mod: "5.1", titre: "Analyse des dangers, points critiques, limites, surveillance et actions correctives",
    aide: "Identifier les dangers, les points critiques, les limites critiques, la surveillance et les actions correctives (principes HACCP a à e).", base: "Règlement (CE) 852/2004, art. 5(2)(a) à (e)", },
  { id: "d-froid", cat: "D", mod: "5.1", titre: "Chaîne du froid",
    aide: "La chaîne du froid ne doit pas être interrompue et aucune température dangereuse n'est admise. Des écarts de courte durée, nécessaires à la manutention, sont admis s'ils ne présentent pas de risque pour la santé (chap. IX point 5).", base: "Règlement (CE) 852/2004, annexe II, chap. IX", auto: "temperatures" },
  { id: "d-cuisson", cat: "D", mod: "5.1", titre: "Cuisson",
    aide: "Barèmes indicatifs du guide : viande hachée 71 °C ; volaille hachée 74 °C ; viandes coupées 63 °C. Volaille entière et autres préparations : aucun barème officiel lu.", base: "Guide du restaurateur 2015 (page 180)", auto: "cuissons" },
  { id: "d-refroidissement", cat: "D", mod: "5.1", titre: "Refroidissement",
    aide: "De +63 °C à +10 °C en moins de 2 h, puis 0 à +3 °C : texte écrit pour la restauration collective ; en remise directe aucune durée n'est imposée, mais l'enregistrement de la surveillance est attendu. Avec une cellule de refroidissement, le logiciel prend 2 h comme objectif. Sans cellule, l'établissement choisit sa durée maximale, la mesure dans le logiciel et la justifie dans son PMS.", base: "Arrêté du 21/12/2009, annexe IV ; vade-mecum « Remise directe » V3 sept. 2026, ligne C403L09", auto: "refroidissements" },
  { id: "d-maintien", cat: "D", mod: "5.1", titre: "Maintien au chaud",
    aide: "Sous 63 °C, aucune règle écrite.", base: "Arrêté du 21/12/2009, annexe I (liaison chaude)", auto: "maintiens" },
  { id: "d-dlc", cat: "D", mod: "5.1", titre: "Aucune DLC dépassée en cuisine ni exposée à la vente",
    aide: "Produit dont la DLC est dépassée, exposé à la vente ou susceptible de l'être, reflétant une défaillance de maîtrise : note D (réception, températures, produits finis). Le logiciel affiche les produits à DLC du jour ; contrôle quotidien à faire.", base: VMG_V7 + ", lignes directrices de C3, C401, C6", },
  { id: "d-huile", cat: "D", mod: "5.1", titre: "Huile de friture",
    aide: "Teneur en composés polaires : 25 % maximum ; polymères de triglycérides : 14 % maximum (décret 2008-184). Au-delà, l'huile devient une huile usagée. Recommandation : friture à moins de +175 °C, moins de 10 minutes, frites jaune or ; filtrer l'huile souvent et éliminer les résidus carbonés. L'établissement doit prouver la qualité testée régulièrement (bandelettes, testeur électronique). Le texte ne fixe pas de fréquence de test.", base: VMS_RD + ", ligne C403L08 ; décret n° 2008-184", auto: "huiles" },
  { id: "d-decongelation", cat: "D", mod: "5.1", titre: "Décongélation",
    aide: "Décongélation en enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée, à défaut entre 0 °C et +4 °C. Autre méthode possible avec une analyse des dangers validée.", base: "Arrêté du 21/12/2009, annexe VI", },
  { id: "d-legumes", cat: "D", mod: "5.1", titre: "Lavage des fruits et légumes",
    aide: "Lavage dans un emplacement dédié (légumerie) ou dans la plonge si les opérations sont séparées dans le temps, ou avec un matériel dédié. Légumineuses sèches lavées selon leur fiche technique. Si décontamination : produit autorisé utilisé selon l'étiquette (produit chloré type eau de Javel) ; pas de pastilles de dichloroisocyanurate de sodium.", base: VMS_RD + ", ligne C403L04", },
  { id: "d-verification", cat: "D", mod: "5.2", titre: "Vérification périodique de l'efficacité des mesures",
    aide: "Procédures « exécutées périodiquement pour vérifier l'efficacité des mesures ». Le texte ne fixe aucune périodicité chiffrée ni revue annuelle.", base: "Règlement (CE) 852/2004, art. 5(2)(f)", },
  { id: "d-labo", cat: "D", mod: "5.3", titre: "Analyses de laboratoire",
    aide: "Aucun texte lu ne fixe de fréquence pour un restaurant.", base: "Règlement (CE) 2073/2005", auto: "analyses" },

  // ---------- E — Traçabilité, allergènes, TIAC, rappels (module 6) ----------
  { id: "e-interne", cat: "E", mod: "6.1", titre: "Traçabilité interne",
    aide: "L'exploitant doit pouvoir dire de qui il tient une denrée et à qui il l'a fournie (art. 18).", base: "Règlement (CE) 178/2002, art. 18", auto: "etiquettes" },
  { id: "e-allergenes", cat: "E", mod: "6.2", titre: "Information sur les allergènes",
    aide: "Information sur les allergènes.", base: "Règlement (UE) 1169/2011, art. 44 ; décret 2015-447", auto: "allergenes" },
  { id: "e-origine", cat: "E", mod: "6.3", titre: "Origine des viandes",
    aide: "Obligatoire ; son absence peut être sanctionnée d'une contravention de 5ᵉ classe.", base: "Décret 2025-141", auto: "origine" },
  { id: "e-affichette", cat: "E", mod: "6.3", titre: "Affichette du niveau d'hygiène (Alim'Confiance), si vous l'affichez",
    aide: "Si l'exploitant choisit d'afficher son niveau d'hygiène : visible du client, non falsifiée, celle de l'établissement et du dernier contrôle, retirée un an après la date du contrôle. Falsification : note C.", base: VMS_RD + ", ligne C7L02", },
  { id: "e-tiac", cat: "E", mod: "6.4", titre: "Toxi-infection alimentaire collective (TIAC)",
    aide: "Procédure en 7 étapes dans « Procédure de TIAC ».", base: "Règlement (CE) 178/2002 (texte non relu)", },
  { id: "e-rappel", cat: "E", mod: "6.5", titre: "Retrait et rappel de produits",
    aide: "Le logiciel vérifie vos produits sur RappelConso. À l'inspection : produit rappelé encore présent plus d'une demi-journée après l'alerte = D. Retirer, isoler et marquer « non destiné à la consommation humaine », afficher l'information aux clients (au moins 15 jours d'ouverture pour les produits frais, 2 mois pour surgelés, conserves et secs), prévenir ceux à qui vous avez cédé le produit. Voir le lexique : « Contrôle officiel 4 ».", base: "Règlement (CE) 178/2002, art. 19 ; vade-mecum « Retraits/rappels en remise directe » V2 sept. 2026", },

  // ---------- F — Non-conformités (module 7) ----------
  { id: "f-registre", cat: "F", mod: "7", titre: "Actions correctives",
    aide: "Actions correctives (principe HACCP e).", base: "Règlement (CE) 852/2004, art. 5(2)(e)", auto: "alertes" },
  { id: "f-efficacite", cat: "F", mod: "7", titre: "Vérification de l'efficacité des actions correctives",
    aide: "Vérification de l'efficacité (principe HACCP f).", base: "Règlement (CE) 852/2004, art. 5(2)(e) et (f)", },
  { id: "f-suites", cat: "F", mod: "7", titre: "Suites données au dernier contrôle et changements depuis (tenus par écrit)",
    aide: "À l'ouverture du contrôle, l'inspecteur rappelle les non-conformités du contrôle précédent, demande ce qui a été fait (c'est la « réactivité », item D2) et ce qui a changé (travaux, nouveau matériel, nouveaux produits). Gardez la liste des écarts relevés, la date et la preuve de chaque correction.", base: VMG_V7 + ", chapitre II.C.2 et item D2", },

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
