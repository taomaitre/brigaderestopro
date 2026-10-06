// Plan de nettoyage de départ — liste GÉNÉRIQUE (sans marque, sans donnée d'un établissement réel), alignée sur le guide officiel
// « Guide de bonnes pratiques d'hygiène et d'application de l'HACCP — Restaurateur » (DILA, 2015), tableau « Fréquences indicatives
// de nettoyage et désinfection » (p.19-24, « à personnaliser en fonction de l'établissement »). Le « repère officiel » figure dans la note
// de chaque tâche concernée ; les tâches sans repère sont des recommandations courantes, hors tableau.
// Les appareils (frigos, congélateurs, fours, cellules…) ne sont PAS dans cette liste : le chef les indique avec « Inventaire de ma cuisine ».
export const PLAN_NETTOYAGE_DEPART = [
 {
  "tache": "Sol de la cuisine — nettoyage et désinfection",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 à 10 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.19) : quotidiennement, à la fin de la période de travail.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Bouches d'évacuation — paniers siphons en place et propres",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Produit spécifique à définir avec l'établissement.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.27) : les paniers siphons des grilles d'évacuation doivent être en place et maintenus propres."
 },
 {
  "tache": "Poubelles de cuisine — vidées, nettoyées et désinfectées",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.23) : nettoyer et désinfecter quotidiennement les poubelles de la cuisine (au moins à chaque fin de journée de travail, p.26).",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Plans de travail — nettoyage et désinfection",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.20) : nettoyer entre deux opérations de natures différentes, après toute opération souillante et avant manipulation de produits sensibles ; désinfecter après toute opération contaminante et à la fin du service.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Ustensiles, couteaux, planches, fouets et machines (hachoir, trancheuse…)",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.21) : ustensiles : nettoyer et désinfecter après chaque utilisation ; machines : après chaque service.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Lavettes et torchons — changés, souillés mis au bac à linge",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Aucun produit de nettoyage — tâche d'organisation / rangement.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.24) : torchons à changer plusieurs fois par jour et chaque fois que nécessaire.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Matériel de nettoyage (brosses, raclettes, lavettes) — trempage désinfectant, rinçage, séchage",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Solution désinfectante, trempage, rinçage abondant puis séchage à l'abri des contaminations.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.22) : en fin de journée, le matériel de nettoyage est placé dans une solution désinfectante, rincé abondamment puis mis à sécher.",
  "moments": [
   "soir"
  ]
 },
 {
  "tache": "Plonge et vaisselle — nettoyer, vider et ranger",
  "poste": "Plonge",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.24) : vaisselle : après utilisation."
 },
 {
  "tache": "Éviers et lave-mains — robinetterie, bacs, distributeurs de savon",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Points de contact — poignées de portes, interrupteurs, poignées de frigos",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Murs de la cuisine — parties accessibles",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Jeudi"
  ],
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.20) : à titre indicatif, les parties accessibles des murs sont entretenues 1 fois par semaine (la fréquence dépend du revêtement, de l'emplacement et de l'activité ; ne pas oublier tuyauteries, câbles et canalisations)."
 },
 {
  "tache": "Poubelles de voirie et zone qui leur est dédiée — nettoyage et désinfection",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Samedi"
  ],
  "jour": "Samedi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.23) : poubelles de voirie : nettoyer 1 fois par semaine (ou à chaque passage du camion d'enlèvement) et désinfecter 1 fois par semaine."
 },
 {
  "tache": "Étagères et rangements de la cuisine",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Jeudi"
  ],
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Réserve — sol et étagères",
  "poste": "Réserve",
  "frequence": "Hebdomadaire",
  "jours": [
   "Lundi"
  ],
  "jour": "Lundi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Lave-vaisselle — filtres, bras de lavage et joints",
  "poste": "Plonge",
  "frequence": "Hebdomadaire",
  "jours": [
   "Lundi"
  ],
  "jour": "Lundi",
  "note": "Retirer et rincer les filtres, vérifier les bras de lavage, essuyer les joints. Produit selon fiche technique."
 },
 {
  "tache": "Sols — parties difficilement accessibles (sous et derrière les équipements)",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 à 10 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau « Fréquences indicatives », p.19) : les parties difficilement accessibles doivent être nettoyées au minimum une fois par mois et désinfectées au minimum une fois par mois."
 },
 {
  "tache": "Hotte — grilles aspirantes",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Mardi"
  ],
  "jour": "Mardi",
  "note": "Dégraissant adapté aux surfaces de cuisson, temps de contact et température selon la fiche technique du produit, rinçage efficace à l'eau claire.\nRepère officiel (guide GBPH Restaurateur, tableau p.23) : nettoyer 1 fois par semaine les grilles des hottes aspirantes."
 },
 {
  "tache": "Hotte — démonter et nettoyer filtres et bouche aspirante, désinfecter les grilles",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 3,
  "note": "Dégraissant adapté aux surfaces de cuisson, temps de contact et température selon la fiche technique du produit, rinçage efficace à l'eau claire.\nRepère officiel (guide GBPH Restaurateur, tableau p.23-24) : démonter et nettoyer filtres et bouche aspirante 1 fois par mois ; désinfecter les grilles des hottes aspirantes 1 fois par mois."
 },
 {
  "tache": "Plafonds — nettoyage et désinfection",
  "poste": "Tous",
  "frequence": "Annuelle",
  "moisAnnee": 1,
  "jourAnnee": 1,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.\nRepère officiel (guide GBPH Restaurateur, tableau p.20) : à titre indicatif, les plafonds sont entretenus 1 fois par an."
 }
];
