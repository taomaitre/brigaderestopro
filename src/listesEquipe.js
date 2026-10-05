// Listes de choix pour la création d'un employé (poste + statut dans la brigade), partagées par la
// page de test (?test-multi=1) et la prévisualisation de connexion (?nouveau-login=1).
//
// STATUTS_EQUIPE : les valeurs (value) sont celles, EXACTES, acceptées par la base (contrainte
// utilisateurs_role_check) — toute autre valeur est refusée par la base.
export const STATUTS_EQUIPE = [
  { value: "cuisinier", label: "Cuisinier" },
  { value: "chef", label: "Chef de cuisine" },
  { value: "directeur", label: "Directeur" },
  { value: "second_cuisine", label: "Second de cuisine" },
  { value: "chef_partie", label: "Chef de partie" },
  { value: "commis", label: "Commis" },
  { value: "apprenti", label: "Apprenti" },
  { value: "plongeur", label: "Plongeur" },
];

// Liste finale des postes décidée le 04/10 (voir presentation-fonctionnalites-ma-cuisine.md,
// Tuile n°12) : fusion entre les postes des fiches techniques et le vocabulaire d'une brigade.
// + choix « Aucun poste » géré par les écrans. Pour ajouter ou retirer un poste : modifier ici.
export const POSTES = [
  "Pizza", "Chaud", "Froid", "Pâtisserie", "Garde-manger", "Saucier", "Poissonnier",
  "Rôtisseur", "Grillardin", "Friturier", "Entremétier", "Boucher", "Tournant", "Communard",
];

// Chef ou directeur : accès aux rubriques réservées (Gestion et contrôle, Fournisseur…).
// Attention : "chef_partie" n'est PAS un chef (pas d'accès réservé).
export const estChefOuDirecteur = (role) => role === "chef" || role === "directeur";
