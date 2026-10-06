// Plan de nettoyage de départ — liste GÉNÉRIQUE (sans marque, sans donnée d'un établissement réel) : les tâches qu'on trouve
// dans toute cuisine (quotidiennes, hebdomadaires, mensuelles), sans appareil précis. Le chef les modifie ou les supprime,
// et ajoute SES appareils (frigos, fours, congélateurs, robots…) avec « Ajouter un appareil ou une surface ».
export const PLAN_NETTOYAGE_DEPART = [
 {
  "tache": "Sol de la cuisine",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 à 10 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Bouches d'évacuation des eaux usées",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Produit spécifique à définir avec l'établissement (déboucheur / désinfectant adapté)."
 },
 {
  "tache": "Poubelles — vidées et nettoyées",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Plans de travail — désinfection",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire après chaque utilisation, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Planches à découper, couteaux et petit matériel",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé.",
  "moments": [
   "midi",
   "soir"
  ]
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
  "tache": "Lavettes et torchons souillés — jetés ou mis au bac à linge prévu",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Aucun produit de nettoyage — tâche d'organisation / rangement.",
  "moments": [
   "midi",
   "soir"
  ]
 },
 {
  "tache": "Plonge — vider, nettoyer et ranger (plus aucun ustensile sur les étagères)",
  "poste": "Plonge",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Sanitaires et vestiaires du personnel",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Hotte et filtres",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Mardi"
  ],
  "jour": "Mardi",
  "note": "Dégraissant adapté aux surfaces de cuisson, temps de contact et température selon la fiche technique du produit, rinçage efficace à l'eau claire."
 },
 {
  "tache": "Carrelage des murs — zones de cuisson",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Jeudi"
  ],
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
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
  "tache": "Réfrigérateurs et chambres froides — nettoyage complet (parois, étagères, joints)",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Mardi"
  ],
  "jour": "Mardi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Poubelles — bacs lavés et désinfectés",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Samedi"
  ],
  "jour": "Samedi",
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
  "tache": "Bouches d'évacuation — nettoyage en profondeur",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jours": [
   "Dimanche"
  ],
  "jour": "Dimanche",
  "note": "Produit spécifique à définir avec l'établissement."
 },
 {
  "tache": "Carrelage des murs — zones hors cuisson",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Congélateurs — dégivrage et nettoyage complet",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Chambre froide — vidée et désinfectée",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 2,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Grilles de ventilation, plafond et luminaires",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 3,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Détartrage des appareils concernés (lave-vaisselle, machine à glaçons, bain-marie…)",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 4,
  "note": "Détartrant adapté, selon la fiche technique du fabricant de l'appareil, rinçage abondant."
 }
];
