// Fiches des produits d'entretien retenus pour la cuisine (Keystone / Ecolab, achetés chez Sysco).
// Toutes les valeurs viennent des fiches techniques lues (page 1 des PDF) ; ce qui n'y figure pas est laissé vide ou
// marqué « à compléter », jamais inventé. Prix HT relevés sur le site Sysco le 09/11/2026 (à revérifier avant commande).
// Chaque fiche a la forme d'un produit de l'onglet « Mes produits » (produitNettoyage) avec des champs en plus :
// codeSysco, conditionnement, prixHT, usages (par surface), securite, stockage, aEviter.

const RINCAGE_OBLIG = "à l'eau claire obligatoire";
const RINCAGE_ALIM = "à l'eau claire si contact alimentaire";

export const PRODUITS_ENTRETIEN_KEYSTONE = [
  {
    tache: "Des Pro (poche avec doseur)", marque: "Keystone / Ecolab", categorie: "Désinfectant", codeSysco: "57042", conditionnement: "Poche de 2 L, doseur obligatoire", prixHT: 42.55,
    dosage: "Dosé par le doseur : 1 dose pour un flacon pulvérisateur de 750 ml complété à l'eau (réglage du doseur à confirmer)",
    temperature: "", contact: "5 min en essuyage ; 15 min en pulvérisation seule (temps de la fiche du Des Multi Extra, mêmes efficacités)", rincage: RINCAGE_OBLIG,
    precautions: "Gants et lunettes. Ne pas utiliser sur l'aluminium. Ne pas mélanger avec un autre produit. Contrôle du rinçage sur les surfaces au contact des aliments.",
    fiche: "Fiche Keystone 57042 (désinfectant concentré en poche)",
    usages: [
      { surface: "Plans de travail, inox, plaque à induction (éteinte et froide), évier", dose: "Flacon de 750 ml (1 dose du doseur)", contact: "5 min essuyé", rincage: "Eau claire + contrôle du rinçage" },
      { surface: "Intérieur des frigos et congélateurs, chambre froide", dose: "Flacon de 750 ml (1 dose du doseur)", contact: "5 min essuyé", rincage: "Eau claire, eau tiède (30 °C) pour les congélateurs" },
      { surface: "Poubelles, carrelage", dose: "Flacon de 750 ml (1 dose du doseur)", contact: "5 min", rincage: "Eau claire" },
    ],
    securite: "Désinfectant concentré : protections obligatoires (gants, lunettes). Voir la fiche de données de sécurité.", stockage: "Dans l'emballage d'origine, à l'abri du gel. Raccordé au doseur.", aEviter: "Aluminium (pelle à pizza en aluminium par exemple).",
    etapes: ["Retirer les denrées et les ustensiles de la surface", "Si la surface est grasse, la dégraisser d'abord (Degreaser HD) et rincer", "Pulvériser le flacon préparé avec une dose du doseur et essuyer avec un chiffon propre", "Laisser agir 5 minutes", "Rincer à l'eau claire", "Contrôler le rinçage sur les surfaces au contact des aliments, puis laisser sécher à l'air"],
  },
  {
    tache: "Des Multi Extra", marque: "Keystone / Ecolab", categorie: "Désinfectant", codeSysco: "57040", conditionnement: "Bidon de 5 L", prixHT: 24.0,
    dosage: "1 % = 100 ml pour 10 L d'eau (10 ml pour 1 L)", temperature: "eau à moins de 60 °C", contact: "1 % : 5 min en essuyage ou serpillage ; 15 min en pulvérisation seule (3 % : 5 min en pulvérisation)", rincage: RINCAGE_OBLIG,
    precautions: "Irritant, risque de lésions oculaires : gants et lunettes. Ne pas mélanger avec un acide. Ne pas utiliser sur l'aluminium. Contrôle du rinçage sur les surfaces alimentaires.",
    fiche: "Fiche Keystone 57040 (nettoyant désinfectant 2 en 1, ammoniums quaternaires)",
    usages: [
      { surface: "Sols (cuisine, plonge, réserve)", dose: "100 ml pour 10 L d'eau, frange", contact: "5 min", rincage: "Eau claire" },
      { surface: "Plans de travail, inox, surfaces dures", dose: "100 ml pour 10 L d'eau", contact: "5 min essuyé", rincage: "Eau claire + contrôle du rinçage" },
      { surface: "Virus enveloppés", dose: "1,5 % (150 ml pour 10 L), 5 min", contact: "5 min", rincage: "Eau claire" },
    ],
    securite: "H315 irritant cutané, H318 lésions oculaires graves, H400/H411 toxique pour le milieu aquatique. Ne jamais mélanger avec un acide. Gants nitrile ou butyle, lunettes ou écran facial.", stockage: "De -5 °C à 40 °C", aEviter: "Aluminium. À ne pas mélanger avec le Descaler.",
    etapes: ["Préparer le seau : 100 ml de produit pour 10 L d'eau (eau à moins de 60 °C)", "Appliquer à la frange ou au chiffon", "Laisser agir 5 minutes", "Rincer à l'eau claire", "Contrôler le rinçage sur les surfaces au contact des aliments", "Laisser sécher à l'air"],
  },
  {
    tache: "Degreaser HD", marque: "Keystone / Ecolab", categorie: "Dégraissant", codeSysco: "57037", conditionnement: "Bidon de 5 L", prixHT: 15.0,
    dosage: "10 à 30 ml pour 10 L d'eau ; 40 à 60 ml si tenace ou pour les sols ; 3 à 10 ml pour un flacon pulvérisateur", temperature: "", contact: "Prétrempage possible pour les équipements", rincage: RINCAGE_OBLIG,
    precautions: "Sans risque sur les métaux, aluminium compris. Rincer abondamment à l'eau claire. Gants et lunettes.",
    fiche: "Fiche Keystone 57037 (dégraissant multi-surfaces)",
    usages: [
      { surface: "Surfaces très grasses, matériel en aluminium, pelle à pizza", dose: "40 à 60 ml pour 10 L (tenace) ; 10 à 30 ml (général)", contact: "Prétrempage si besoin", rincage: "Abondant à l'eau claire" },
      { surface: "Hotte peu sale", dose: "10 à 30 ml pour 10 L", contact: "", rincage: "Abondant à l'eau claire" },
      { surface: "Sol très gras (avant la désinfection)", dose: "40 à 60 ml pour 10 L", contact: "", rincage: "Eau claire" },
    ],
    securite: "Voir la fiche de données de sécurité (gants, lunettes).", stockage: "Emballage d'origine fermé",
    etapes: ["Préparer la dilution selon la saleté (10 à 30 ml, ou 40 à 60 ml si tenace, pour 10 L d'eau)", "Appliquer au chiffon, à la brosse ou en prétrempage", "Frotter", "Rincer abondamment à l'eau claire", "Désinfecter ensuite si la surface touche les aliments", "Laisser sécher"],
  },
  {
    tache: "Oven & Grill 5 L (avec canne)", marque: "Keystone / Ecolab", categorie: "Four et grill", codeSysco: "57082", conditionnement: "Bidon de 5 L avec canne de pulvérisation", prixHT: 24.8,
    dosage: "Appliqué avec la canne de pulvérisation fournie (dosage exact non relevé : à compléter avec la fiche)", temperature: "surface à moins de 50 °C, appareil éteint", contact: "10 à 15 min", rincage: RINCAGE_OBLIG,
    precautions: "Corrosif (pH 13 à 13,9) : gants et lunettes. Ne pas utiliser sur l'aluminium ni sur les surfaces peintes. Ne pas mélanger avec d'autres produits. Rincer abondamment.",
    fiche: "Fiche Keystone 57082 (nettoyant dégraissant four et grill)",
    usages: [
      { surface: "Hottes, évents, filtres", dose: "Canne de pulvérisation", contact: "10 à 15 min", rincage: "Abondant à l'eau claire" },
      { surface: "Four à pizza, grill, friteuse (au changement d'huile)", dose: "Canne de pulvérisation", contact: "10 à 15 min", rincage: "Abondant à l'eau claire" },
      { surface: "iVario (très peu de produit, méthode de l'établissement)", dose: "Très petite quantité", contact: "", rincage: "Abondant à l'eau claire" },
    ],
    securite: "H314, H318, H290 (corrosif). Gants et lunettes obligatoires.", stockage: "Emballage d'origine", aEviter: "Aluminium, surfaces peintes, plaques de cuisson en céramique ou en verre (induction).",
    etapes: ["Appareil éteint et froid (moins de 50 °C), retirer l'excès de graisse", "Pulvériser avec la canne", "Laisser agir 10 à 15 minutes", "Frotter", "Rincer abondamment à l'eau claire", "Essuyer et laisser sécher"],
  },
  {
    tache: "Manual Dish Uni", marque: "Keystone / Ecolab", categorie: "Détergent", codeSysco: "57074", conditionnement: "Bidon de 5 L, sans parfum", prixHT: 12.9,
    dosage: "Vaisselle : 12 à 14 ml pour 10 L d'eau chaude ; surfaces lavables : 25 ml pour 10 L", temperature: "eau chaude", contact: "Tremper puis frotter", rincage: RINCAGE_OBLIG,
    precautions: "Convient à la porcelaine, l'inox, l'aluminium et le plastique. pH 4,5 à 5,5.",
    fiche: "Fiche Keystone 57074 (plonge manuelle)",
    usages: [
      { surface: "Casseroles, ustensiles, vaisselle, pelle à pizza, pétrin, pièces du batteur", dose: "12 à 14 ml pour 10 L", contact: "Immerger, tremper, frotter", rincage: "Eau claire, séchage à l'air" },
      { surface: "Surfaces lavables", dose: "25 ml pour 10 L", contact: "", rincage: "Eau claire" },
    ],
    securite: "Voir la fiche de données de sécurité.", stockage: "Emballage d'origine",
    etapes: ["Remplir le bac d'eau chaude avec 12 à 14 ml de produit pour 10 L", "Immerger et tremper les ustensiles", "Frotter", "Rincer à l'eau claire", "Sécher à l'air"],
  },
  {
    tache: "All Purpose", marque: "Keystone / Ecolab", categorie: "Détergent", codeSysco: "57048", conditionnement: "Bidon de 5 L, Écolabel", prixHT: 20.9,
    dosage: "10 à 25 ml pour 10 L d'eau (jusqu'à 100 ml si très sale) ; flacon pulvérisateur : 10 à 20 ml", temperature: "", contact: "", rincage: RINCAGE_ALIM,
    precautions: "Sans traces. Rinçage nécessaire sur les surfaces au contact des aliments. Ne désinfecte pas.",
    fiche: "Fiche Keystone 57048 (nettoyant multi-usage)",
    usages: [
      { surface: "Vitres au-dessus de la saladette", dose: "10 à 20 ml par flacon", contact: "", rincage: "Aucun" },
      { surface: "Granit (plans de pizza), micro-ondes, corps du batteur", dose: "10 à 25 ml pour 10 L (à tester d'abord sur le granit)", contact: "", rincage: "Eau claire sur les surfaces alimentaires" },
    ],
    securite: "Voir la fiche de données de sécurité.", stockage: "Emballage d'origine",
    etapes: ["Pulvériser ou appliquer au chiffon", "Essuyer", "Rincer à l'eau claire si la surface touche les aliments", "Laisser sécher"],
  },
  {
    tache: "Mikrochlor Liquid", marque: "Keystone / Ecolab", categorie: "Désinfectant", codeSysco: "57155", conditionnement: "Bidon de 5 L (carton de 2)", prixHT: 26.17,
    dosage: "0,1 à 0,2 % = 1 à 2 ml par litre d'eau, avec la pompe doseuse manuelle (10, 20 ou 30 ml)", temperature: "eau potable froide", contact: "1 à 5 minutes maximum", rincage: RINCAGE_OBLIG,
    precautions: "Hypochlorite de sodium. Ne jamais mélanger avec du vinaigre ou un acide (dégagement de chlore). Ne pas utiliser en même temps que le Descaler. Protections. Dosage précis obligatoire.",
    fiche: "Fiche Keystone 57155 (désinfectant chloré pour fruits et légumes, décret 98-507)",
    usages: [{ surface: "Fruits et légumes (bac ou évier)", dose: "1 à 2 ml par litre d'eau", contact: "1 à 5 min maximum", rincage: "Soigneusement à l'eau potable froide" }],
    securite: "pH pur 12 à 12,5. Gants et lunettes. Jamais avec un acide.", stockage: "0 à 30 °C, emballage d'origine", aEviter: "Vinaigre blanc, Descaler.",
    etapes: ["Retirer les débris et rincer les légumes à l'eau potable froide", "Mettre les protections (gants, lunettes)", "Doser 1 à 2 ml de produit par litre d'eau", "Faire tremper les légumes", "Laisser agir 1 à 5 minutes maximum", "Rincer soigneusement à l'eau potable froide"],
  },
  {
    tache: "Dishwasher Detergent HD", marque: "Keystone / Ecolab", categorie: "Lave-vaisselle", codeSysco: "57063", conditionnement: "Bidon de 5 L, eaux dures", prixHT: 28.75,
    dosage: "Par le doseur du lave-vaisselle, aucun calcul à faire", temperature: "", contact: "", rincage: "",
    precautions: "Très corrosif (pH 13 à 13,9). Jamais sur l'aluminium ni les métaux fragiles. Uniquement avec un doseur. Quand on change de produit : rincer les cannes d'aspiration, jamais de mélange.",
    fiche: "Fiche Keystone 57063 (détergent lave-vaisselle pour eau très calcaire)",
    usages: [{ surface: "Lave-vaisselle", dose: "Doseur", contact: "", rincage: "Cycle de rinçage de la machine" }],
    securite: "H314, H318, H290. Gants et lunettes pour changer le bidon.", stockage: "Emballage d'origine",
    etapes: ["Contrôler le niveau du bidon de détergent", "Contrôler le niveau du liquide de rinçage", "Vidanger et nettoyer les filtres", "Nettoyer les bras de lavage", "Essuyer l'intérieur et laisser la porte ouverte"],
  },
  {
    tache: "Dishwasher Rinse Aid", marque: "Keystone / Ecolab", categorie: "Lave-vaisselle", codeSysco: "57066", conditionnement: "Bidon de 5 L", prixHT: 23.5,
    dosage: "Par le doseur du lave-vaisselle, aucun calcul à faire", temperature: "", contact: "", rincage: "",
    precautions: "pH 4 à 6. Uniquement avec un doseur.",
    fiche: "Fiche Keystone 57066 (additif de rinçage et de séchage)",
    usages: [{ surface: "Lave-vaisselle (rinçage et séchage)", dose: "Doseur", contact: "", rincage: "" }],
    securite: "Voir la fiche de données de sécurité.", stockage: "Emballage d'origine",
    etapes: ["Contrôler le niveau du liquide de rinçage", "Remplacer le bidon quand il est vide", "Vérifier le séchage de la vaisselle"],
  },
  {
    tache: "Descaler (détartrant)", marque: "Keystone / Ecolab", categorie: "Détartrant", codeSysco: "57045", conditionnement: "Bidon de 5 L", prixHT: 19.0,
    dosage: "Surfaces : 0,5 à 2 % ; lave-vaisselle : 5 à 10 % dans la cuve de lavage ; tache tenace au sol : pur 10 min", temperature: "", contact: "Lave-vaisselle : 10 à 30 min de cycle", rincage: RINCAGE_OBLIG,
    precautions: "Acide puissant : gants et lunettes. Ne JAMAIS mélanger avec un produit chloré, la javel ou le Mikrochlor. Éviter le granit (tester). Utiliser seulement sur des surfaces résistantes à l'eau et aux acides.",
    fiche: "Fiche Keystone 57045 (détartrant)",
    usages: [
      { surface: "Lave-vaisselle (détartrage)", dose: "5 à 10 % du volume de la cuve de lavage", contact: "10 à 30 min de cycle", rincage: "Vider les réservoirs, remplir d'eau claire" },
      { surface: "Surfaces résistantes aux acides, sols", dose: "0,5 à 2 %", contact: "", rincage: "Rincer ou essuyer" },
    ],
    securite: "Acide puissant. Ne jamais mélanger avec un chloré.", stockage: "Emballage d'origine", aEviter: "Granit, aluminium, produits chlorés.",
    etapes: ["Désactiver le doseur de détergent (laisser l'extraction d'air)", "Vider les réservoirs et les remplir d'eau claire", "Diluer le détartrant à 5 à 10 % dans le réservoir de lavage", "Faire tourner 10 à 30 minutes", "Éteindre, vider les réservoirs, remplir d'eau claire et rincer", "Réactiver le doseur"],
  },
  {
    tache: "Savon pour les mains parfumé (à compléter)", marque: "Keystone / Ecolab", categorie: "Autre", codeSysco: "57095", conditionnement: "Bidon de 5 L", prixHT: 16.0,
    dosage: "Fiche non lue : à compléter", temperature: "", contact: "", rincage: "",
    precautions: "Fiche à lire avant utilisation.", fiche: "Fiche Keystone 57095 à envoyer",
    usages: [], securite: "", stockage: "",
    etapes: ["Se mouiller les mains", "Se laver au savon", "Rincer à l'eau claire", "Sécher avec du papier à usage unique"],
  },
];

// Code Sysco -> pour les ajouter au stock (catégorie « Entretien »)
export const ENTRETIEN_POUR_STOCK = PRODUITS_ENTRETIEN_KEYSTONE.map((p) => ({ nom: p.tache.replace(/ \(.*\)$/, ""), reference: p.codeSysco, prixHT: p.prixHT, conditionnement: p.conditionnement }));
