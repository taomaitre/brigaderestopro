// FICHIER GÉNÉRÉ par scripts/genererLexique.mjs à partir de docs/lexique-haccp.md : ne pas modifier à la main.
// Chaque entrée porte sa source, son lien et son niveau de certitude (verifie / a-confirmer / mixte).
export const LEXIQUE_DATE = "2026-10-20";
export const LEXIQUE = [
 {
  "id": "quelle-annexe-de-l-arrete-du-21-12-2009-pour-quel-etablissement-0",
  "section": "Règles du logiciel et températures",
  "titre": "Quelle annexe de l'arrêté du 21/12/2009 pour quel établissement ?",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'arrêté s'applique « aux activités de commerce de détail, d'entreposage et de transport des produits d'origine animale et denrées alimentaires en contenant » (art. 1). « Remise directe » = cession à un consommateur final « en dehors de toute activité de restauration collective » ; « restauration collective » = « fourniture de repas à une collectivité de consommateurs réguliers, liée par accord ou par contrat » (art. 2). Renvois : restauration collective, cuisines centrales comprises → annexes IV et VI (art. 6) ; restauration collective hors cuisines centrales → annexes VII et VIII (art. 7) ; remise directe → annexes V, VI, VII et VIII (art. 8). Pour tous : annexe I (températures de conservation, art. 3)."
   },
   {
    "label": "Ce que contient l'annexe V (remise directe)",
    "texte": "seulement (a) des règles sur les matériels à risque spécifiés bovins pour les ateliers de boucherie, (b) section II : déconditionnement des denrées destinées au tranchage ou au service « au fur et à mesure des besoins » dans des conditions évitant la contamination, avec conservation des informations d'identification et de durée de vie pendant toute la détention ; nom, adresse et téléphone du responsable sur les distributeurs automatiques. Aucune règle de refroidissement, de remise en température, de durée de vie ni de plats témoins."
   },
   {
    "label": "Conséquence",
    "texte": "le refroidissement 63 → 10 °C en 2 h, 0 à +3 °C, remise en température en 1 h, durée de vie 3 jours et plats témoins sont écrits dans l'annexe IV, donc pour la restauration collective. Dans cet arrêté, rien de tel n'est écrit pour la remise directe (restaurant commercial). Ces chiffres ne sont pas imposés par cet arrêté à un restaurant commercial : le chef décide. Catégorie des établissements visés par le logiciel : restaurants traditionnels, snacks, etc., pas de restauration collective pour le moment (précisé par Loïc le 20/10/2026) : ils relèvent donc de la remise directe. Les règles de l'annexe IV ne leur sont pas imposées ; le chef décide (durées de vie, par exemple, J+1, J+3 ou plus selon le produit). Si une cuisine fournit un jour une collectivité sous contrat, l'annexe IV s'appliquerait à cette activité. Confirmation écrite de la DDPP conseillée mais non bloquante."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, articles 1, 2, 6, 7, 8 ; annexe V (version initiale du JORF n°0303 du 31/12/2009 copiée de Légifrance). La version consolidée a été vérifiée seulement pour l'article 3 (capture : « en vigueur depuis le 01/01/2010 »), l'annexe IV (modifiée le 09/05/2020) et l'annexe VI ; les annexes V, VII, VIII et les autres articles en version actuelle : non comparés."
   },
   {
    "label": "Lien",
    "texte": "arrêté (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte lu le 20/10/2026 ; application aux restaurants traditionnels et snacks : remise directe, d'après Loïc."
   }
  ],
  "motsCles": "cellule abattage 63 10 deux heures 2h réchauffage reheat 63 75 une heure 1h échantillon conservation 5 jours 0 3 hygiène 5 octobre 2011 manipulateur température conservation frigo congélateur annexe i"
 },
 {
  "id": "viande-hachee-cession-au-consommateur-remise-directe-et-restauration-c-1",
  "section": "Règles du logiciel et températures",
  "titre": "Viande hachée (cession au consommateur) (remise directe et restauration collective hors cuisines centrales)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "la viande hachée est préparée « à la demande et à la vue de l'acheteur » ; elle peut être préparée à l'avance si l'atelier respecte la section V de l'annexe III du règlement 853/2004 et si l'exploitant a déclaré l'activité au préfet (directeur départemental en charge des services vétérinaires). Matières premières : chapitre II de la section V de l'annexe III du 853/2004 (non lu)."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe VII (version initiale)."
   },
   {
    "label": "Certitude",
    "texte": "✔ annexe lue ; renvois au 853/2004 non lus. 20/10/2026."
   }
  ],
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "gibier-sauvage-en-petites-quantites-2",
  "section": "Règles du logiciel et températures",
  "titre": "Gibier sauvage en petites quantités",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un commerce de détail fourni par un chasseur en petite quantité ne peut accepter : gibier dépouillé ou plumé, gibier congelé, gibier sans fiche d'examen initial, gibier non identifié, sanglier sans résultat favorable du test trichine, gibier chassé à plus de 80 km (dérogation possible du préfet). Pas de congélation en l'état."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe VIII (version initiale)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "annexe-iv-changements-entre-la-version-initiale-2009-et-la-version-en--3",
  "section": "Règles du logiciel et températures",
  "titre": "Annexe IV : changements entre la version initiale (2009) et la version en vigueur (09/05/2020)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "version 2009 : durée de vie des préparations réfrigérées « ne peut excéder trois jours après celui de la fabrication, en l'absence d'études de durée de vie » et DLC sur une face du conditionnement ; plats témoins 5 jours « après la dernière présentation au consommateur » ; excédents du menu du jour pouvant être représentés le lendemain ; signalement au DDASS et aux services vétérinaires. Version 2020 : DLC obligatoire pour les préparations très périssables, remise en température suivie d'une consommation le jour même, étiquetage individuel, don possible, signalement à l'ARS et à la DDPP. Seule la version 2020 est en vigueur."
   },
   {
    "label": "Certitude",
    "texte": "✔ les deux textes lus le 20/10/2026."
   }
  ],
  "motsCles": "réchauffage reheat 63 75 une heure 1h échantillon conservation 5 jours 0 3"
 },
 {
  "id": "maintien-au-chaud-63-c-minimum-4",
  "section": "Règles du logiciel et températures",
  "titre": "Maintien au chaud : +63 °C minimum",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un plat chaud servi ou livré chaud reste à +63 °C ou plus. Moins n'est possible qu'avec une analyse des dangers validée."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I (tableau « température minimale en liaison chaude » : intitulé lu, chiffres non vus) et annexe IV point 3 (restauration collective) ; guide Restaurateur 2015, p.180."
   },
   {
    "label": "Lien",
    "texte": "voir registre (arrêté ; guide)."
   },
   {
    "label": "Citation",
    "texte": "« maintien à 63 °C » (guide, p.180)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu, à comparer avec Légifrance. 20/10/2026."
   }
  ],
  "motsCles": "bain-marie 63 liaison chaude"
 },
 {
  "id": "refroidissement-63-c-a-10-c-en-2-h-maximum-restauration-collective-5",
  "section": "Règles du logiciel et températures",
  "titre": "Refroidissement : +63 °C à +10 °C en 2 h maximum (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un plat cuit passe de 63 °C à 10 °C en moins de 2 h, puis se conserve entre 0 et +3 °C. Plus lent seulement avec analyse des dangers validée."
   },
   {
    "label": "Citation",
    "texte": "« leur température à cœur ne demeure pas à des valeurs comprises entre + 63° C et + 10° C pendant plus de deux heures »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 1 (version en vigueur depuis le 09/05/2020). Température mesurée à cœur. Après refroidissement : enceinte entre 0 et +3 °C."
   },
   {
    "label": "Lien",
    "texte": "annexe IV (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026. L'annexe IV vise la restauration collective ; question ouverte : s'applique-t-elle à ton établissement (collectif ou commercial) ?"
   }
  ],
  "motsCles": "cellule abattage 63 10 deux heures 2h température conservation frigo congélateur annexe i"
 },
 {
  "id": "remise-en-temperature-1-h-maximum-63-c-minimum-restauration-collective-6",
  "section": "Règles du logiciel et températures",
  "titre": "Remise en température : 1 h maximum, +63 °C minimum (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "de +10 °C à la température de service en 1 h maximum, 63 °C atteints, consommation le jour même de la remise en température. Voir aussi 75 °C en section 6."
   },
   {
    "label": "Citation",
    "texte": "« ne demeure pas pendant plus d'une heure à des valeurs comprises entre + 10° C et la température de remise au consommateur » ; « ne peut être inférieure à + 63° C » sauf analyse des dangers validée ; « consommées le jour de leur première remise en température »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 3 (en vigueur depuis le 09/05/2020)."
   },
   {
    "label": "Lien",
    "texte": "annexe IV (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026. Restauration collective."
   }
  ],
  "motsCles": "réchauffage reheat 63 75 une heure 1h"
 },
 {
  "id": "duree-de-vie-des-plats-prepares-a-l-avance-3-jours-restauration-collec-7",
  "section": "Règles du logiciel et températures",
  "titre": "Durée de vie des plats préparés à l'avance : 3 jours (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "au froid, 3 jours maximum après le jour de fabrication, sauf étude de durée de vie. Le guide rappelle que la durée de vie relève de la responsabilité du professionnel (p.109)."
   },
   {
    "label": "Précisions du texte",
    "texte": "préparation très périssable élaborée à l'avance : l'exploitant fixe une DLC (art. 24 du règlement 1169/2011). Produits déconditionnés puis reconditionnés sans transformation : DLC au plus égale à la durée de vie initiale du composant le plus court. Préparation réfrigérée : DLC « ne peut excéder le troisième jour après celui de sa fabrication en l'absence d'études de durée de vie »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 4 (en vigueur depuis le 09/05/2020)."
   },
   {
    "label": "Lien",
    "texte": "annexe IV (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026. Restauration collective."
   }
  ],
  "motsCles": "hygiène 5 octobre 2011 manipulateur température conservation frigo congélateur annexe i"
 },
 {
  "id": "plats-temoins-5-jours-restauration-collective-8",
  "section": "Règles du logiciel et températures",
  "titre": "Plats témoins : 5 jours (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "échantillons représentatifs de chaque plat distribué, clairement identifiés, à la disposition exclusive des agents de contrôle, conservés au moins 5 jours en froid positif (0 à +3 °C) après présentation au consommateur. Cuisine centrale : plats témoins de tout ce qui part vers un restaurant satellite. Satellite : seulement ce qu'il a transformé ou manipulé sur place (découpé, tranché, haché, mixé, mouliné)."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 5 (en vigueur depuis le 09/05/2020)."
   },
   {
    "label": "Lien",
    "texte": "annexe IV (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026. Restauration collective."
   }
  ],
  "motsCles": "échantillon conservation 5 jours 0 3 température conservation frigo congélateur annexe i"
 },
 {
  "id": "preparations-servies-froides-restauration-collective-9",
  "section": "Règles du logiciel et températures",
  "titre": "Préparations servies froides (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "entreposées dès la fin de l'élaboration et jusqu'à l'utilisation dans une enceinte à 0 à +3 °C ; sorties au plus près de la consommation, 2 h maximum, produit maintenu à +10 °C ou moins, sauf analyse des dangers validée prouvant un autre couple temps/température."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 2."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "effet-indesirable-inhabituel-au-moins-2-consommateurs-restauration-col-10",
  "section": "Règles du logiciel et températures",
  "titre": "Effet indésirable inhabituel (au moins 2 consommateurs) (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "dès que le responsable a connaissance d'un effet indésirable inhabituel pouvant être lié aux aliments chez au moins deux consommateurs : inviter à consulter un médecin, signaler sans délai au directeur de l'ARS et au directeur départemental de la protection des populations ; tenir à disposition menus servis et plats témoins des repas précédents."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 6."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026."
   }
  ],
  "motsCles": "échantillon conservation 5 jours 0 3"
 },
 {
  "id": "fin-de-service-restes-et-excedents-restauration-collective-11",
  "section": "Règles du logiciel et températures",
  "titre": "Fin de service : restes et excédents (restauration collective)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "après le service, les denrées d'origine animale ne vont plus ni à l'alimentation humaine ni animale, sauf « excédents » visés à l'article 2 point i (article non lu) : ils peuvent être présentés à un service ultérieur ou donnés à une personne morale visée à l'art. L. 266-2 du code de l'action sociale et des familles, avec une DLC par plat et salubrité assurée ; pas applicable dans les restaurants satellites sauf préparations non déconditionnées maintenues à 0 à +3 °C. Étiquetage individuel avec DLC et mention de l'éventuelle première remise en température (point 8)."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV points 7 et 8."
   },
   {
    "label": "Certitude",
    "texte": "✔ annexe IV lue ; définition d'« excédents » (article 2) ◐ non lue."
   }
  ],
  "motsCles": "réchauffage reheat 63 75 une heure 1h"
 },
 {
  "id": "temperatures-maximales-de-conservation-au-froid-12",
  "section": "Règles du logiciel et températures",
  "titre": "Températures maximales de conservation au froid",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "viandes hachées +2 °C ; abats +3 °C ; préparations de viandes +4 °C ; volailles, lagomorphes, ratites, petit gibier +4 °C ; viandes d'ongulés +7 °C (carcasses, gros morceaux) ou +4 °C (découpe) ; produits de la pêche frais +2 °C ; ovoproduits +4 °C ; lait cru +4 °C ; autres denrées très périssables +4 °C ; autres périssables +8 °C ; préparations culinaires élaborées à l'avance +3 °C."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I ; guide Restaurateur 2015, p.179 (tableau identique)."
   },
   {
    "label": "Lien",
    "texte": "arrêté (registre). Annexe I : passer par le texte."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur copie préfecture. 20/10/2026."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "surgelation-et-congelation-13",
  "section": "Règles du logiciel et températures",
  "titre": "Surgélation et congélation",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "-18 °C pour glaces, viandes hachées, préparations de viandes, produits de la pêche congelés ; -12 °C pour les autres denrées congelées."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I ; guide p.179."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu. 20/10/2026."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "decongelation-14",
  "section": "Règles du logiciel et températures",
  "titre": "Décongélation",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée, sinon entre 0 et +4 °C. Pas de recongélation en l'état sauf analyse des dangers validée. Aucune durée fixée."
   },
   {
    "label": "Précisions du texte",
    "texte": "trois voies : (1) enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée quand elle est fixée réglementairement, sinon 0 à +4 °C ; (2) cuisson ou remise en température sans décongélation préalable ; (3) toute autre méthode si une analyse des dangers validée montre le même niveau de sécurité. Une fois décongelés, conservation selon l'annexe I (produits réfrigérés). Produits décongelés (hors surgelés) : pas de recongélation, sauf analyse des dangers validée."
   },
   {
    "label": "Citation",
    "texte": "« soit dans une enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée » ; « A défaut, [...] entre 0 °C et + 4 °C »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe VI (version en vigueur depuis le 01/01/2010). Applicable à tous (pas limitée à la restauration collective)."
   },
   {
    "label": "Lien",
    "texte": "annexe VI (registre)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte Légifrance lu le 20/10/2026 (page « En vigueur depuis le 01/01/2010, dernière mise à jour des données : 09 mai 2020 »)."
   }
  ],
  "motsCles": "réchauffage reheat 63 75 une heure 1h dégel sortir congélateur recongélation"
 },
 {
  "id": "ufs-15",
  "section": "Règles du logiciel et températures",
  "titre": "Œufs",
  "certitude": "mixte",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'UE demande un stockage à température de préférence constante, adaptée à la conservation, et une livraison au consommateur sous 21 jours après la ponte (853/2004, annexe III section X) ✔. Préparations liquides d'œufs entiers : 5 min à 60 °C (guide p.180) ✔. Œufs en coquille, pratique française (fiche pédagogique, date inconnue) ◐ : catégorie A, froid positif, 28 jours après la ponte, cuisson supérieure à 70 °C à cœur 5 min."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) 853/2004 ; guide p.180 ; fiche PMS 2.10. Règlement 589/2008 non lu."
   },
   {
    "label": "Lien",
    "texte": "registre."
   },
   {
    "label": "Certitude",
    "texte": "mixte, voir ci-dessus. 20/10/2026."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "cuisson-par-type-de-viande-dans-l-arrete-16",
  "section": "Règles du logiciel et températures",
  "titre": "Cuisson par type de viande dans l'arrêté",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'arrêté ne fixe aucune température de cuisson par viande. Seuls chiffres : 63 °C (maintien au chaud, remise en température)."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009 (lecture complète)."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": "réchauffage reheat 63 75 une heure 1h bain-marie 63 liaison chaude"
 },
 {
  "id": "zone-de-danger-17",
  "section": "Notions et bactéries",
  "titre": "Zone de danger",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "plage où les bactéries se multiplient vite. Repère français : de +10 °C à +63 °C (arrêté, refroidissement et remise en température ✔). Le guide cite aussi les plats cuisinés conservés au-dessus de 63 °C ou en dessous de 3 °C (fiche Clostridium perfringens, p.180)."
   },
   {
    "label": "Lien",
    "texte": "arrêté, guide (registre)."
   }
  ],
  "motsCles": "cellule abattage 63 10 deux heures 2h réchauffage reheat 63 75 une heure 1h température conservation frigo congélateur annexe i"
 },
 {
  "id": "temperature-a-c-ur-18",
  "section": "Notions et bactéries",
  "titre": "Température à cœur",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "température au centre de l'aliment, à l'endroit le plus froid. Une sonde bien placée est le seul moyen fiable."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "valeur-d-valeur-z-reduction-logarithmique-19",
  "section": "Notions et bactéries",
  "titre": "Valeur D, valeur z, réduction logarithmique",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "D = temps pour diviser par 10 les bactéries à une température. z = élévation de température qui divise D par 10. 6 log = 1 survivante sur 1 million, niveau jugé assainissant par l'ANSES. La température seule ne suffit pas : il faut le temps de maintien (« couples temps / température » du guide)."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche cuisson basse température."
   },
   {
    "label": "Lien",
    "texte": "registre."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "spores-20",
  "section": "Notions et bactéries",
  "titre": "Spores",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "Clostridium et Bacillus cereus forment des spores que la cuisson ne détruit pas. Un refroidissement rapide empêche leur réveil."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche cuisson basse température."
   },
   {
    "label": "Lien",
    "texte": "registre."
   }
  ],
  "motsCles": "cellule abattage 63 10 deux heures 2h température conservation frigo congélateur annexe i"
 },
 {
  "id": "contamination-croisee-21",
  "section": "Notions et bactéries",
  "titre": "Contamination croisée",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "passage de bactéries d'un cru vers un prêt à consommer, par mains, ustensiles, surfaces, eau."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "tiac-22",
  "section": "Notions et bactéries",
  "titre": "TIAC",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "au moins 2 cas similaires liés au même aliment. Déclaration à l'ARS ou à la DDPP. Source officielle (Santé publique France) à ajouter."
   }
  ],
  "motsCles": "intoxication alimentaire déclaration ars ddpp"
 },
 {
  "id": "salmonella-cuisson-reste-23",
  "section": "Notions et bactéries",
  "titre": "Salmonella (cuisson) / (reste)",
  "certitude": "mixte",
  "champs": [
   {
    "label": "En bref",
    "texte": "surtout volaille, œufs, viandes. 60 °C pendant 5 min = 5 réductions décimales dans les préparations liquides d'œufs entiers (guide, p.181). L'ANSES cite 63 °C pendant 1 min pour la volaille (procédé validé)."
   },
   {
    "label": "Texte",
    "texte": "guide Restaurateur 2015 p.181 ; ANSES cuisson basse température."
   },
   {
    "label": "Lien",
    "texte": "registre."
   }
  ],
  "motsCles": "salmonelle œuf volaille"
 },
 {
  "id": "listeria-monocytogenes-24",
  "section": "Notions et bactéries",
  "titre": "Listeria monocytogenes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "se multiplie même au froid (de -2 à 45 °C, optimum 30 à 37 °C). Concerne charcuterie cuite, fromages au lait cru, plats préparés. Formes graves chez la femme enceinte et le nouveau-né."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche de danger, avril 2020."
   },
   {
    "label": "Lien",
    "texte": "registre."
   }
  ],
  "motsCles": "listériose femme enceinte charcuterie 2073 température conservation frigo congélateur annexe i"
 },
 {
  "id": "campylobacter-25",
  "section": "Notions et bactéries",
  "titre": "Campylobacter",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "surtout volaille crue. Un traitement thermique supérieur à 60 °C les détruit (guide p.181)."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "e-coli-stec-26",
  "section": "Notions et bactéries",
  "titre": "E. coli STEC",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "liées au bœuf haché et au lait cru, d'où la cuisson à cœur de la viande hachée (fiche citée p.180). Source ANSES complète à ajouter."
   }
  ],
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "staphylococcus-aureus-27",
  "section": "Notions et bactéries",
  "titre": "Staphylococcus aureus",
  "certitude": "mixte",
  "champs": [
   {
    "label": "En bref",
    "texte": "sa destruction demande plus qu'une pasteurisation (guide p.181). Reste à sourcer (ANSES)."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "clostridium-perfringens-et-bacillus-cereus-28",
  "section": "Notions et bactéries",
  "titre": "Clostridium perfringens et Bacillus cereus",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "liés aux plats cuisinés à l'avance : conserver au-dessus de 63 °C ou en dessous de 3 °C, réchauffer à 75 °C minimum (fiche C. perfringens). Riz, pâtes, plats cuisinés non consommés tout de suite : au-dessus de 63 °C, surgelés ou réfrigérés (guide p.180)."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "clostridium-botulinum-29",
  "section": "Notions et bactéries",
  "titre": "Clostridium botulinum",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "spores du sol, danger des conserves et produits sous vide mal maîtrisés. Aucun chiffre publié."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "anisakis-30",
  "section": "Notions et bactéries",
  "titre": "Anisakis",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "au-dessus de 55 °C, les larves meurent en moins d'une minute. Le poisson « rosé à l'arête » ne garantit pas l'élimination des parasites (guide p.180)."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "14-allergenes-31",
  "section": "Réglementation et organisation",
  "titre": "14 allergènes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "céréales contenant du gluten, crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites (plus de 10 mg/kg ou 10 mg/L), lupin, mollusques. Information obligatoire pour les denrées non préemballées. Le danger allergènes se traite par les bonnes pratiques d'hygiène, pas par un CCP (avis CNA n° 66)."
   },
   {
    "label": "Texte",
    "texte": "règlement (UE) 1169/2011 (25/10/2011), annexe II ; guide p.177."
   },
   {
    "label": "Lien",
    "texte": "registre (annexe II à confirmer dans le texte complet)."
   },
   {
    "label": "Certitude",
    "texte": "✔ guide lu ; règlement ◐. 20/10/2026."
   }
  ],
  "motsCles": "gluten arachide lait œuf soja sulfites 1169 hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "dlc-et-ddm-32",
  "section": "Réglementation et organisation",
  "titre": "DLC et DDM",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "DLC « à consommer jusqu'au » (denrées très périssables ; au-delà, ne pas servir). DDM « à consommer de préférence avant » (qualité, pas danger)."
   },
   {
    "label": "Texte",
    "texte": "règlement (UE) 1169/2011."
   },
   {
    "label": "Lien",
    "texte": "registre."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "haccp-ccp-pms-33",
  "section": "Réglementation et organisation",
  "titre": "HACCP, CCP, PMS",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'exploitant « met en place, applique et maintient une ou plusieurs procédures permanentes fondées sur les principes HACCP ». 7 principes : (a) identifier les dangers, (b) points critiques, (c) limites critiques, (d) surveillance, (e) actions correctives, (f) vérification périodique, (g) documents et dossiers adaptés à la nature et la taille de l'entreprise. Procédure revue à chaque changement de produit, procédé ou étape. Durée de conservation des dossiers : « période appropriée » (non chiffrée). PMS = nom français du dossier de l'établissement (bonnes pratiques + HACCP + traçabilité) ; il prouve l'application à l'autorité."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) 852/2004, article 5 §1, §2, §4 ; art. 4 §6 et 7 (guides facultatifs)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2004/852/2021-03-24 (à vérifier)."
   },
   {
    "label": "Citation courte",
    "texte": "« des procédures permanentes fondées sur les principes HACCP »."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte consolidé du 24/03/2021 lu le 20/10/2026 ; version plus récente non vérifiée."
   }
  ],
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire"
 },
 {
  "id": "ddpp-rappelconso-34",
  "section": "Réglementation et organisation",
  "titre": "DDPP, RappelConso",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "DDPP = direction départementale de la protection des populations (contrôles). RappelConso = site officiel des rappels. Liens à ajouter."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "critere-de-securite-et-critere-d-hygiene-du-procede-35",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Critère de sécurité et critère d'hygiène du procédé",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un critère de sécurité s'applique au produit mis sur le marché. S'il est dépassé, le produit est retiré ou rappelé. Un critère d'hygiène du procédé mesure le bon fonctionnement de la production. S'il est dépassé, il faut corriger le procédé. Tous les exploitants, y compris au détail, doivent respecter ces critères dans leur HACCP et leurs bonnes pratiques."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) n° 2073/2005, articles 2, 3 et 7, version consolidée du 01/07/2026."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Citation courte",
    "texte": "« les exploitants du secteur alimentaire veillent à ce que les denrées alimentaires respectent les critères microbiologiques pertinents » (art. 3 §1)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire"
 },
 {
  "id": "listeria-monocytogenes-seuils-annexe-i-1-1-a-1-3-36",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Listeria monocytogenes : seuils (annexe I, 1.1 à 1.3)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "pour les denrées prêtes à consommer, le seuil est de 100 ufc/g pendant la durée de conservation. Si l'exploitant n'a pas pu démontrer que ce seuil ne sera pas dépassé, il faut « non détecté dans 25 g » pendant toute la durée de conservation. Pour les nourrissons et les fins médicales spéciales : non détecté dans 25 g (n = 10). Sont classés d'office « ne permet pas le développement » les produits à pH ≤ 4,4 ou aw ≤ 0,92, à pH ≤ 5,0 et aw ≤ 0,94, ou à durée de conservation inférieure à 5 jours."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I chapitre 1, lignes 1.1 à 1.3, notes (*1), (*2), (6), modifié par le règlement (UE) 2024/2895 (M11)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Citation courte",
    "texte": "« 100 ufc/g » ; « Non détecté dans 25 g »."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur captures le 20/10/2026. Règles d'interprétation non lues."
   },
   {
    "label": "Lien avec le logiciel",
    "texte": "la durée de vie de 3 jours des plats préparés à l'avance (arrêté du 21/12/2009) reste une règle distincte ; ce règlement fixe seulement les seuils d'analyse."
   }
  ],
  "motsCles": "listériose femme enceinte charcuterie 2073"
 },
 {
  "id": "salmonella-absence-dans-25-g-viande-hachee-ufs-crus-annexe-i-1-4-a-1-2-37",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Salmonella : absence dans 25 g, viande hachée, œufs crus (annexe I, 1.4 à 1.20)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "« non détecté dans 25 g » pour la viande hachée et préparations destinées à être consommées crues, la volaille hachée destinée à être cuite, les ovoproduits, les préparations prêtes à consommer contenant des œufs crus, les crustacés et mollusques cuits, les fruits et légumes prédécoupés, les jus non pasteurisés. Pour la viande hachée et les préparations d'espèces autres que la volaille destinées à être cuites : non détecté dans 10 g."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I chapitre 1, lignes 1.4 à 1.20."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Citation courte",
    "texte": "« Non détecté dans 25 g » (1.15 : « 25 g ou ml »)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur captures le 20/10/2026."
   }
  ],
  "motsCles": "salmonelle œuf volaille steak haché boeuf 71 steak"
 },
 {
  "id": "histamine-poisson-38",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Histamine (poisson)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "pour les poissons des familles à forte teneur en histidine (Scombridae, Clupeidae, Engraulidae, Coryphaenidae, Pomatomidae, Scombresocidae), 100 mg/kg (m) et 200 mg/kg (M), sur 9 échantillons dont 2 au plus entre m et M. Maturation enzymatique en saumure : 200 et 400 mg/kg. Sauce de poisson fermentée : 400 mg/kg."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, lignes 1.26, 1.27, 1.27 bis, note (15)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur captures le 20/10/2026."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "viande-hachee-et-preparations-de-viande-criteres-d-hygiene-du-procede--39",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Viande hachée et préparations de viande : critères d'hygiène du procédé (annexe I, 2.1.6 et 2.1.8)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en fin de fabrication, la viande hachée est contrôlée sur 5 échantillons (2 au plus entre m et M) : E. coli 50 ufc/g (m) et 500 ufc/g (M) ; colonies aérobies 5×10⁵ (m) et 5×10⁶ (M) ufc/g. Les préparations de viande : E. coli 500 (m) et 5 000 (M) ufc/g ou cm². Le critère « colonies aérobies » ne s'applique pas aux viandes hachées produites au détail avec une durée de conservation inférieure à 24 heures. Un dépassement oblige à améliorer l'hygiène de production et le choix des matières premières. Ce n'est pas un critère de sécurité : il ne déclenche pas à lui seul un rappel."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I chapitre 2, lignes 2.1.6 et 2.1.8, note (7), version du 01/07/2026."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Citation courte",
    "texte": "« ne s'applique pas aux viandes hachées produites au détail lorsque la durée de conservation est inférieure à 24 heures »."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur captures le 20/10/2026."
   }
  ],
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "autres-criteres-d-hygiene-utiles-en-cuisine-annexe-i-chapitre-2-40",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Autres critères d'hygiène utiles en cuisine (annexe I chapitre 2)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ovoproduits : Enterobacteriaceae 10 (m) et 100 (M) ufc/g ou ml. Crustacés et mollusques cuits décortiqués : E. coli 1 (m) et 10 (M) NPP/g, staphylocoques à coagulase positive 100 et 1 000 ufc/g. Fruits et légumes prédécoupés et jus non pasteurisés : E. coli 100 et 1 000 ufc/g. Fromages au lait cru : staphylocoques 10⁴ et 10⁵ ufc/g ; au-delà de 10⁵ ufc/g, recherche des entérotoxines staphylococciques."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I chapitre 2, lignes 2.2.3, 2.3.1, 2.4.1, 2.5.1, 2.5.2."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu sur captures le 20/10/2026."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "etude-de-duree-de-conservation-annexe-ii-41",
  "section": "Critères microbiologiques (2073/2005)",
  "titre": "Étude de durée de conservation (annexe II)",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'exploitant qui fabrique des denrées prêtes à consommer permettant le développement de Listeria peut devoir démontrer par des études (pH, aw, sel, conservateurs, emballage, essais) que le seuil sera respecté pendant toute la durée de conservation. Texte de l'annexe II dans la version actuelle non relu."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, article 3 §2 ✔ ; annexe II (lu en 2005/2006, non relu en 2026)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   }
  ],
  "motsCles": "listériose femme enceinte charcuterie 2073"
 },
 {
  "id": "hygiene-du-personnel-42",
  "section": "Hygiène générale (852/2004)",
  "titre": "Hygiène du personnel",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "niveau élevé de propreté, tenue propre et adaptée. Aucune personne malade ou porteuse d'une maladie transmissible par les aliments, avec plaies infectées, lésions cutanées ou diarrhée, ne manipule si risque de contamination ; le salarié prévient immédiatement l'exploitant."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II chapitre VIII ; chapitre I points 4 (lavabos eau chaude et froide, séchage hygiénique) et 9 (vestiaires)."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026. Pas de liste de maladies ni de délai d'éviction dans ce texte."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "contamination-croisee-dechets-eau-nuisibles-43",
  "section": "Hygiène générale (852/2004)",
  "titre": "Contamination croisée, déchets, eau, nuisibles",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "denrées protégées contre toute contamination à toutes les étapes (ch. IX pt 3) ; matières premières et produits finis séparés (pt 5) ; produits de nettoyage jamais dans les zones de manipulation (ch. I pt 10) ; déchets évacués vite, conteneurs fermés (ch. VI) ; eau potable, circuit non potable séparé et signalé (ch. VII) ; lutte contre les nuisibles, animaux domestiques exclus (ch. IX pt 4) ; équipements allergènes nettoyés avant autre usage (ch. IX pt 9)."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": "gluten arachide lait œuf soja sulfites 1169"
 },
 {
  "id": "chaine-du-froid-refroidissement-decongelation-principes-44",
  "section": "Hygiène générale (852/2004)",
  "titre": "Chaîne du froid, refroidissement, décongélation (principes)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ne pas laisser les denrées à risque à une température dangereuse ; écarts « de courte durée » admis pour la manutention sans risque ; refroidir « dès que possible » après le traitement thermique ; décongeler en limitant la multiplication des pathogènes et évacuer le liquide. Les chiffres (63 °C, 63 à 10 °C en moins de 2 h, 0 à +4 °C) viennent de l'arrêté du 21/12/2009 (section 4), pas de ce règlement."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II ch. IX pt 5 à 7."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": "cellule abattage 63 10 deux heures 2h dégel sortir congélateur recongélation température conservation frigo congélateur annexe i"
 },
 {
  "id": "culture-de-la-securite-alimentaire-nouveau-45",
  "section": "Hygiène générale (852/2004)",
  "titre": "Culture de la sécurité alimentaire (nouveau)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'exploitant met en place et prouve une culture de la sécurité alimentaire : engagement de la direction et de tous, communication ouverte (y compris des écarts), ressources suffisantes, formation et supervision, documentation à jour, amélioration continue, adaptée à la taille de l'entreprise."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II ch. XI bis (ajouté par modification M3 ; date d'application exacte non vérifiée)."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte lu ; date d'application ◐."
   }
  ],
  "motsCles": "hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "formation-46",
  "section": "Hygiène générale (852/2004)",
  "titre": "Formation",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "manutentionnaires encadrés et formés en hygiène adaptée à leur poste ; responsables de la procédure HACCP formés aux principes HACCP ; respect du droit national (France : arrêté du 5/10/2011, à lire)."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II ch. XII."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "don-alimentaire-redistribution-47",
  "section": "Hygiène générale (852/2004)",
  "titre": "Don alimentaire (redistribution)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "DLC : redistribuer avant la date ; DDM : jusqu'à la date et après ; contrôle régulier, emballage intègre, température, traçabilité pour produits d'origine animale."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II ch. V bis."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": ""
 },
 {
  "id": "locaux-et-equipements-48",
  "section": "Hygiène générale (852/2004)",
  "titre": "Locaux et équipements",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "sols, murs, portes, surfaces : matériaux lisses, lavables, non absorbants, non toxiques, résistant à la corrosion, sauf preuve d'équivalence à l'autorité ; équipements nettoyés et désinfectés à fréquence suffisante ; lavabos mains avec eau chaude et froide ; ventilation sans flux de la zone contaminée vers la zone propre."
   },
   {
    "label": "Texte",
    "texte": "852/2004 annexe II ch. I, II, V."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "baremes-cuisson-guide-p180",
  "section": "Températures de cuisson",
  "titre": "Barèmes de cuisson indicatifs du guide Restaurateur (page imprimée 180, page 187 du PDF)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "Barèmes recommandés par l'ANSES, repris par le guide « à titre indicatif ». Ils « restent sous la responsabilité de chaque professionnel ». Viandes hachées : 71 °C à cœur ou 2 min à 70 °C (bœuf : perte de la couleur rouge) ; Hachée bœuf, veau, agneau, porc : 71 °C 15 s (citation fiche Yersinia) ; Volaille hachée : 74 °C 15 s (citation fiche Yersinia) ; Viande coupée bœuf, veau, agneau, jambon : 63 °C 15 s (citation fiche Yersinia) ; Plats préparés, viandes : maintien 63 °C, réchauffage 75 °C minimum ; Poissons : de 1 min à 60 °C à 15 min à 80 °C ; Coquillages : 2 min à 90 °C ; Œufs liquides entiers : 5 min à 60 °C ; Sanglier, cheval : 63 °C, ou 3 min à 58 °C, ou 4 h à 51 °C."
   },
   {
    "label": "Texte",
    "texte": "Guide de bonnes pratiques d'hygiène et d'application de l'HACCP « Restaurateur », novembre 2015, page imprimée 180 (page 187 du fichier PDF)."
   },
   {
    "label": "Volaille entière, canard, magret",
    "texte": "Aucun barème officiel trouvé. La valeur de 80 °C du logiciel est une règle de la cuisine, pas une norme. Question à la DDPP en attente."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire"
 }
];
