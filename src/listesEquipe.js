// Listes de choix pour la création d'un employé (poste + statut dans la brigade), partagées par la
// page de test (?test-multi=1) et la prévisualisation de connexion (?nouveau-login=1).
//
// STATUTS_EQUIPE : les valeurs (value) sont celles, EXACTES, acceptées par la base (contrainte
// utilisateurs_role_check) — toute autre valeur est refusée par la base.
// POSTES : liste des postes de travail proposés. Le poste "Froid" n'existe plus (confirmé par Loïc
// le 05/10) — pour ajouter ou retirer un poste, il suffit de modifier cette liste.
export const STATUTS_EQUIPE = [
  { value: "cuisinier", label: "Cuisinier" },
  { value: "chef", label: "Chef" },
  { value: "directeur", label: "Directeur" },
  { value: "second_cuisine", label: "Second de cuisine" },
  { value: "chef_partie", label: "Chef de partie" },
  { value: "commis", label: "Commis" },
  { value: "apprenti", label: "Apprenti" },
  { value: "plongeur", label: "Plongeur" },
];

export const POSTES = ["Pizza", "Chaud"]; // + choix « Aucun poste » géré par les écrans

// Chef ou directeur : accès aux rubriques réservées (Gestion et contrôle, Fournisseur…).
// Attention : "chef_partie" n'est PAS un chef (pas d'accès réservé).
export const estChefOuDirecteur = (role) => role === "chef" || role === "directeur";
