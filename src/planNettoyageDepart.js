// Plan de nettoyage de départ — liste GÉNÉRIQUE (sans marque, sans donnée d'un établissement réel) proposée à toute nouvelle installation.
// Chaque établissement l'adapte ensuite : produits, dosages, équipements. Voir claude/plan-nettoyage-simple-base.md dans le projet.
export const PLAN_NETTOYAGE_DEPART = [
 {
  "tache": "Sol cuisine",
  "moments": ["midi", "soir"],
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
  "moments": ["midi", "soir"],
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Désinfection plans de travail",
  "moments": ["midi", "soir"],
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
  "tache": "Plonge — vider et nettoyer les bacs à couverts si besoin",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Détergent plonge manuelle / nettoyant surfaces, dosage selon fiche technique du produit utilisé, rinçage à l'eau claire."
 },
 {
  "tache": "Lavettes souillées jetées, lavettes/torchons au bac à linge prévu",
  "moments": ["midi", "soir"],
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
  "tache": "Chambre froide — sol",
  "poste": "Tous",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Chambre froide — étagères et parois",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jour": "Mardi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut portes, poignées, joints et étagères. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Chambre froide — nettoyage complet (vidée, désinfectée)",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 2,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Carrelage murs — zones de cuisson (friteuse, plancha, four)",
  "poste": "Tous",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Carrelage murs — zones hors cuisson",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Congélateur 1",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Vendredi",
  "positionMois": 3,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Congélateur 2",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 3,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Congélateur 3",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Mardi",
  "positionMois": 4,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Congélateur du personnel",
  "poste": "Tous",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 4,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Cuiseur multifonction",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Dégraissant four/grill, surface chaude à 60°C, 15 min, rinçage efficace à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Bain-marie",
  "moments": ["midi", "soir"],
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire après chaque service, eau chaude <60°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Four mixte",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Dégraissant four/grill, surface chaude à 60°C, 15 min, rinçage efficace à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Four rapide",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Dégraissant four/grill, surface chaude à 60°C, 15 min, rinçage efficace à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Four rapide — nettoyage complet (intérieur, extérieur, portes)",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Dégraissant four/grill, surface chaude à 60°C, 15 min, rinçage efficace à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo viande — portes et intérieur",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo viande — nettoyage complet (joints compris)",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Vendredi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste chaud — portes et intérieur",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste chaud — nettoyage complet (joints compris)",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Samedi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Saladette poste chaud — portes et intérieur",
  "poste": "Poste Chaud",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Saladette poste chaud — nettoyage complet (joints compris)",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Dimanche",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Hotte",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Mardi",
  "note": "Dégraissant four/grill, trempage à l'eau chaude à 70°C, 30 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Crédence (grande plaque inox)",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Étagère",
  "poste": "Poste Chaud",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Étagère",
  "poste": "Poste Pizza",
  "frequence": "Hebdomadaire",
  "jour": "Mardi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo pâtons — portes et intérieur",
  "poste": "Poste Pizza",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo pâtons — nettoyage complet (joints compris)",
  "poste": "Poste Pizza",
  "frequence": "Hebdomadaire",
  "jour": "Mercredi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste pizza — portes et intérieur",
  "poste": "Poste Pizza",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste pizza — nettoyage complet (joints compris)",
  "poste": "Poste Pizza",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Saladette poste pizza — portes et intérieur",
  "poste": "Poste Pizza",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Saladette poste pizza — nettoyage complet (joints compris)",
  "poste": "Poste Pizza",
  "frequence": "Hebdomadaire",
  "jour": "Vendredi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Pétrin — nettoyage",
  "poste": "Poste Pizza",
  "frequence": "À chaque utilisation",
  "note": "Détergent plonge manuelle / nettoyant surfaces, dosage selon fiche technique du produit utilisé, rinçage à l'eau claire."
 },
 {
  "tache": "Pelle à pizza — nettoyage",
  "poste": "Poste Pizza",
  "frequence": "Quotidienne",
  "note": "Détergent plonge manuelle / nettoyant surfaces, dosage selon fiche technique du produit utilisé, rinçage à l'eau claire."
 },
 {
  "tache": "Four à pizza — hotte, façade, vitre",
  "poste": "Poste Pizza",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 1,
  "note": "Dégraissant four/grill, surface chaude à 60°C, 15 min, rinçage efficace à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste froid — portes et intérieur",
  "poste": "Poste Froid",
  "frequence": "Quotidienne",
  "note": "Nettoyant désinfectant alimentaire, contact 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Frigo poste froid — nettoyage complet (joints compris)",
  "poste": "Poste Froid",
  "frequence": "Hebdomadaire",
  "jour": "Mardi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Inclut joints de porte. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Étagère",
  "poste": "Poste Froid",
  "frequence": "Hebdomadaire",
  "jour": "Jeudi",
  "note": "Nettoyant désinfectant alimentaire, eau chaude <60°C, 5 min, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Micro-ondes — intérieur et extérieur",
  "poste": "Poste Froid",
  "frequence": "Quotidienne",
  "note": "Produit désinfectant, parois à l'eau tiède à 35°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Chauffe-pot",
  "poste": "Poste Froid",
  "frequence": "Quotidienne",
  "note": "Détergent plonge manuelle / nettoyant surfaces, dosage selon fiche technique du produit utilisé, rinçage à l'eau claire."
 },
 {
  "tache": "Robot batteur",
  "poste": "Poste Froid",
  "frequence": "Quotidienne",
  "note": "Détergent plonge manuelle / nettoyant surfaces, dosage selon fiche technique du produit utilisé, rinçage à l'eau claire."
 },
 {
  "tache": "Congélateur à glace",
  "poste": "Poste Froid",
  "frequence": "Mensuelle",
  "jourSemaineMois": "Dimanche",
  "positionMois": 2,
  "note": "Après chaque dégivrage. Produit désinfectant, parois à l'eau tiède à 30°C, rinçage à l'eau claire. Dosage selon fiche technique du produit utilisé."
 },
 {
  "tache": "Évier — lavage des légumes",
  "poste": "Poste Froid",
  "frequence": "Quotidienne",
  "note": "Double bac eau froide. Ajouter le produit : eau de Javel 2,6 % (60 mL pour 100 L d'eau, laisser tremper 5 min) ou vinaigre blanc 6 % (laisser tremper 10 min). Ne pas utiliser d'eau de Javel sur les végétaux poreux ou à couches. Dosage exact à confirmer selon le produit réellement utilisé par l'établissement."
 }
];
