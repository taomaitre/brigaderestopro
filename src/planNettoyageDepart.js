// Plan de nettoyage de départ — liste GÉNÉRIQUE et volontairement courte (sans marque, sans donnée d'un établissement réel) :
// seulement ce qu'on trouve dans toute cuisine (sol, évacuations, poubelles, plans de travail, plonge, hotte, murs).
// Le reste (frigos, fours, congélateurs, petit matériel…) est ajouté par le chef depuis la liste d'appareils, avec ses propres zones.
export const PLAN_NETTOYAGE_DEPART = [
 {
  "tache": "Sol cuisine",
  "moments": [
   "midi",
   "soir"
  ],
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 à 10 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Bouche d'évacuation des eaux usées",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Produit spécifique à déterminer avec l'établissement."
 },
 {
  "tache": "Poubelles",
  "moments": [
   "midi",
   "soir"
  ],
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Désinfection plans de travail",
  "moments": [
   "midi",
   "soir"
  ],
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire après chaque utilisation, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Plonge — plus aucun ustensile ni assiette sur les étagères",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Aucun produit de nettoyage — tâche d'organisation/rangement."
 },
 {
  "tache": "Lavettes souillées jetées, lavettes/torchons au bac à linge prévu",
  "moments": [
   "midi",
   "soir"
  ],
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Aucun produit de nettoyage — tâche d'organisation/rangement."
 },
 {
  "tache": "Plonge — éteindre, vider et nettoyer",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Hotte",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jour": "Mardi",
  "note": "Dégraissant four/grill, trempage à l'eau chaude à 70°C, 30 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Carrelage murs — zones hors cuisson",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 }
];
