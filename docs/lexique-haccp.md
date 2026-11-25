# Lexique HACCP du logiciel : version 6 (25/11/2026)

Statut : réécrit le 25/11/2026 à la demande de Loïc. Chaque fiche dit maintenant **ce qu'elle est** (champ « Nature ») : une norme obligatoire, une règle des collectivités, un guide officiel, un avis scientifique, une bonne pratique… Les fiches sont réservées à la restauration commerciale (restaurants, snacks) : les fiches propres aux collectivités sont gardées seulement quand elles servent de repère, et le disent.
Versions précédentes : v5 du 20/10 (git), compléments du 26/10 et du 31/10.

## 0. Format d'une entrée (obligatoire)
- **Nature** : un des mots suivants (le logiciel affiche l'étiquette correspondante).
  - `norme` : texte obligatoire (règlement européen, loi, décret, arrêté). « Norme : obligatoire ».
  - `collectivite` : texte obligatoire seulement pour la restauration collective (cantines, entreprises sous contrat). Pour un restaurant commercial, c'est un repère.
  - `guide` : guide de bonnes pratiques validé par l'État (GBPH « Restaurateur »). Pas obligatoire, mais c'est le moyen reconnu de prouver qu'on travaille bien.
  - `avis` : avis ou fiche scientifique d'un organisme public (ANSES). Pas une norme.
  - `inspection` : ce que l'inspecteur de l'État vérifie et comment il note (vade-mecum). Ce n'est pas une loi nouvelle : c'est la façon dont les lois sont contrôlées.
  - `information` : information d'un site public (Santé publique France, service-public). Pas une norme.
  - `explication` : définition d'un mot pour comprendre. Pas une norme.
  - `bonne-pratique` : conseil de terrain (fiche pédagogique, académie, profession). Pas une norme.
- **En bref** : 2 à 5 phrases courtes, en mots simples.
- **Texte** : le texte de référence (nom, article ou page, date).
- **Lien** : adresse officielle.
- **Citation** : seulement quand un chiffre en dépend.
- **Certitude** : ✔ texte officiel lu / ◐ à relire / ✖ non publié, avec la date.

## 1. Avertissements (haut du lexique, bas de chaque entrée)
« Les informations de ce lexique sont pédagogiques. Le plan de maîtrise sanitaire (PMS) de l'établissement fait foi. Ce lexique ne remplace en aucun cas une vérification, un contrôle ou une formation HACCP. En cas de doute, consultez votre PMS, votre consultant HACCP ou la DDPP. »

## 2. Règles de rédaction
1. N'écrire que ce qui est sûr. Un doute = non publié, ou « à vérifier » avec la source.
2. Toujours dire si c'est une norme ou non (champ Nature). Un conseil n'est jamais présenté comme une obligation.
3. Deux sources officielles qui diffèrent : afficher les deux, chacune avec sa source.
4. Quand aucun texte n'existe, le logiciel ne propose aucune valeur : l'établissement décide et le justifie dans son PMS.
5. Textes français et européens uniquement. Restauration commerciale uniquement.
6. Phrases courtes. Un chiffre = sa source.

Hiérarchie : 1) règlements UE, lois, décrets, arrêtés (Légifrance, EUR-Lex) ; 2) instructions et vade-mecums de la DGAL (méthode de contrôle) ; 3) guide de bonnes pratiques validé (GBPH Restaurateur 2015, application volontaire) ; 4) avis ANSES ; 5) fiches pédagogiques : seulement comme « bonne pratique » ; 6) sites privés : jamais seuls.

## 3. Liens officiels (registre central)
| Texte | Lien | Statut |
|---|---|---|
| Arrêté du 21/12/2009 (règles sanitaires du commerce de détail) | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021573483 | version consolidée « en vigueur » vue par Loïc le 20/10 ; annexe I relue le 25/11 sur la copie de la DDPP de Saône-et-Loire |
| Même arrêté, annexe IV (restauration collective) | https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000041864953 | lue le 20/10, version du 09/05/2020 |
| Même arrêté, annexe VI (décongélation) | https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000021699388 | lue le 20/10 |
| Règlement (CE) 852/2004 (hygiène) | https://eur-lex.europa.eu/eli/reg/2004/852/2021-03-24 | consolidé du 24/03/2021 lu le 20/10 |
| Règlement (CE) 853/2004 (produits d'origine animale) | https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0853 | section X (œufs) : modifiée par le règlement délégué (UE) 2022/2258 |
| Règlement (UE) 1169/2011 (information du consommateur) | https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=celex%3A32011R1169 | en-tête lu le 20/10 |
| Règlement (CE) 2073/2005 (critères microbiologiques), version du 01/07/2026 | https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01 | annexe I chapitres 1 et 2 lus le 20/10 |
| Règlement (UE) 2024/2895 (Listeria) | https://eur-lex.europa.eu/eli/reg/2024/2895/oj | application au 01/07/2026 confirmée le 25/11 |
| Règlement délégué (UE) 2023/2465 (normes de commercialisation des œufs, remplace le 589/2008) | https://eur-lex.europa.eu/eli/reg_del/2023/2465/oj?locale=fr | trouvé le 25/11, non lu en entier |
| Décret n° 2008-184 du 26/02/2008 (huiles et graisses comestibles) | https://faolex.fao.org/docs/pdf/fra85501.pdf | lu le 25/11 (copie FAO du JO du 28/02/2008) |
| Guide Restaurateur, nov. 2015 | https://agriculture.gouv.fr/telecharger/79464 | lu le 20/10 ; date de l'avis au Journal officiel : à vérifier |
| Vade-mecums d'inspection (DGAL) | https://agriculture.gouv.fr/les-vade-mecums-dinspection | général V7 et « Remise directe » V3 lus le 26/10 |

## 4. Règles du logiciel

### Quelles règles pour quel type d'établissement ? ✔
**Nature** : norme
**En bref** : un restaurant, un snack ou une pizzeria fait de la « remise directe » : il vend au client final. La « restauration collective » sert des repas à des clients réguliers liés par un contrat (cantine, restaurant d'entreprise). Les deux suivent les températures de l'annexe I et la décongélation de l'annexe VI. Seule la restauration collective suit l'annexe IV : refroidissement en 2 h, remise en température en 1 h, plats témoins, durée de vie de 3 jours. Pour un restaurant commercial, ces chiffres sont des repères, pas des obligations.
**Texte** : arrêté du 21/12/2009, articles 1, 2, 6, 7 et 8.
**Lien** : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021573483
**Certitude** : ✔ lu le 20/10/2026. Si votre cuisine livre un jour une collectivité sous contrat, l'annexe IV s'applique à cette activité.

### Viande hachée (cession au consommateur) ✔
**Nature** : norme
**En bref** : en remise directe, la viande hachée se prépare à la demande et devant le client. La préparer à l'avance n'est permis que si l'atelier respecte les règles du règlement 853/2004 et si l'activité est déclarée au préfet.
**Texte** : arrêté du 21/12/2009, annexe VII.
**Certitude** : ✔ annexe lue le 20/10/2026 ; renvois au 853/2004 non lus.

### Maintien au chaud : +63 °C minimum ✔
**Nature** : norme
**En bref** : un plat servi ou livré chaud doit rester à +63 °C ou plus. C'est obligatoire pour tous les établissements, restaurants compris. En dessous, il faut une analyse des dangers validée.
**Texte** : arrêté du 21/12/2009, annexe I, tableau « Température minimale en liaison chaude » : « Plats cuisinés ou repas livrés chauds ou remis au consommateur : + 63 °C ».
**Lien** : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021573483
**Certitude** : ✔ chiffre lu le 25/11/2026 (annexe I, copie de la DDPP de Saône-et-Loire).

### Refroidissement : +63 °C à +10 °C en 2 h maximum (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, un plat cuit doit passer de +63 °C à +10 °C à cœur en moins de 2 heures, puis être gardé entre 0 et +3 °C. Pour un restaurant commercial, aucun texte ne fixe de durée : l'établissement fixe sa propre règle dans son PMS et enregistre chaque refroidissement. L'inspecteur vérifie qu'une procédure existe et qu'elle est suivie.
**Citation** : « leur température à cœur ne demeure pas à des valeurs comprises entre + 63° C et + 10° C pendant plus de deux heures ».
**Texte** : arrêté du 21/12/2009, annexe IV point 1 (version du 09/05/2020) ; vade-mecum « Remise directe » V3, ligne C403L09.
**Certitude** : ✔ lus le 20/10 et le 26/10/2026.

### Remise en température (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, un plat réchauffé passe de +10 °C à la température de service en 1 heure maximum, atteint au moins +63 °C et se mange le jour même. Pour un restaurant commercial, c'est un repère. Le guide Restaurateur donne aussi un repère de 75 °C (voir « Barèmes de cuisson »). Un bain-marie ou une étuve sert à maintenir au chaud, pas à réchauffer.
**Citation** : « ne demeure pas pendant plus d'une heure à des valeurs comprises entre + 10° C et la température de remise au consommateur ».
**Texte** : arrêté du 21/12/2009, annexe IV point 3 ; vade-mecum « Remise directe » V3, ligne C403L10.
**Certitude** : ✔ lus le 20/10 et le 26/10/2026.

### Durée de vie des plats préparés à l'avance ✔
**Nature** : collectivite
**En bref** : en restauration collective, un plat préparé à l'avance et gardé au froid se garde au maximum jusqu'au 3e jour après sa fabrication, sauf étude de durée de vie. Pour un restaurant commercial, aucun texte ne fixe de nombre de jours : c'est l'établissement qui fixe la date limite et qui doit pouvoir la justifier. Une durée non justifiée vaut une note C à l'inspection.
**Citation** : DLC « ne peut excéder le troisième jour après celui de sa fabrication en l'absence d'études de durée de vie ».
**Texte** : arrêté du 21/12/2009, annexe IV point 4 ; vade-mecum général V7, ligne C6L04 ; guide Restaurateur p. 109.
**Certitude** : ✔ lus le 20/10 et le 26/10/2026.

### Plats témoins : 5 jours (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, on garde un échantillon de chaque plat servi pendant au moins 5 jours, entre 0 et +3 °C, pour les contrôleurs. Ce n'est pas demandé à un restaurant commercial.
**Texte** : arrêté du 21/12/2009, annexe IV point 5.
**Certitude** : ✔ lu le 20/10/2026.

### Préparations servies froides (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, une préparation froide est gardée entre 0 et +3 °C jusqu'au service. Elle peut rester sortie 2 heures au maximum, à +10 °C au plus. Pour un restaurant commercial, c'est un repère.
**Texte** : arrêté du 21/12/2009, annexe IV point 2.
**Certitude** : ✔ lu le 20/10/2026.

### Effet indésirable chez au moins 2 clients (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, si au moins deux clients ont des troubles qui peuvent venir du repas, le responsable les invite à consulter un médecin, prévient sans attendre l'ARS et la DDPP, et garde les menus et les plats témoins. Pour un restaurant, voir la fiche TIAC.
**Texte** : arrêté du 21/12/2009, annexe IV point 6.
**Certitude** : ✔ lu le 20/10/2026.

### Fin de service : restes et excédents (collectivités) ✔
**Nature** : collectivite
**En bref** : en restauration collective, ce qui a été présenté au client ne se ressert pas. Les « excédents » jamais présentés peuvent être servis plus tard ou donnés, avec une date limite et une étiquette. Pour un restaurant commercial, c'est un repère.
**Texte** : arrêté du 21/12/2009, annexe IV points 7 et 8.
**Certitude** : ✔ lu le 20/10/2026 ; définition des « excédents » (article 2) non lue.

### Températures maximales de conservation au froid ✔
**Nature** : norme
**En bref** : viande hachée +2 °C. Abats +3 °C. Préparations de viande +4 °C. Volailles, lapin, petit gibier +4 °C. Viandes de bœuf, veau, porc, agneau : +4 °C pour les morceaux de découpe, +7 °C pour les carcasses et gros morceaux. Poisson frais, crustacés et mollusques cuits : +2 °C (glace fondante : 0 à +2 °C). Ovoproduits et lait cru +4 °C. Plats cuisinés à l'avance +3 °C. Autres produits très périssables +4 °C ; autres périssables +8 °C. Lait pasteurisé et fromages affinés : température du fabricant.
**Citation** : « La limite inférieure de conservation des denrées alimentaires réfrigérées doit se situer à la température débutante de congélation propre à chaque catégorie de produits. »
**Texte** : arrêté du 21/12/2009, annexe I, colonne « établissements de remise directe ou de restauration collective » ; guide Restaurateur p. 179. Un produit emballé peut porter une température plus basse fixée par le fabricant : c'est elle qu'on suit.
**Certitude** : ✔ relu le 25/11/2026 (copie de la DDPP de Saône-et-Loire).

### Surgélation et congélation ✔
**Nature** : norme
**En bref** : −18 °C pour les glaces, la viande hachée, les préparations de viande et le poisson congelés. −12 °C pour les autres produits congelés. Une remontée de +3 °C en surface est tolérée seulement pendant de courts moments (chargement, déchargement, mise en vitrine).
**Texte** : arrêté du 21/12/2009, annexe I (tableau des denrées congelées et paragraphe a) qui suit) ; guide p. 179.
**Certitude** : ✔ relu le 25/11/2026.

### Décongélation ✔
**Nature** : norme
**En bref** : on décongèle au réfrigérateur, entre 0 °C et la température de conservation du produit (à défaut entre 0 et +4 °C), ou on cuit directement sans décongeler. Jamais à température ambiante. Un produit décongelé ne se recongèle pas. Le texte ne fixe aucune durée : on suit la durée du fabricant quand elle existe, sinon l'établissement fixe la sienne dans son PMS. La mention « décongelé » n'est obligatoire que sur un produit vendu tel quel, pas sur un plat cuisiné avec ce produit.
**Citation** : « soit dans une enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée » ; « A défaut, [...] entre 0 °C et + 4 °C ».
**Texte** : arrêté du 21/12/2009, annexe VI ; vade-mecum « Remise directe » V3, lignes C403L02-03 et C7L02.
**Certitude** : ✔ lus le 20/10 et le 26/10/2026.

### Œufs ✔
**Nature** : norme
**En bref** : les œufs doivent être remis au consommateur au plus tard 28 jours après la ponte (avant novembre 2022 : 21 jours). Leur date de durabilité minimale (DDM) est au plus 28 jours après la ponte. On les garde à une température de préférence constante, adaptée à leur conservation. Les préparations à base d'œufs crus (mayonnaise, mousse) sont les plus à risque de salmonelle.
**Texte** : règlement (CE) 853/2004, annexe III, section X, modifié par le règlement délégué (UE) 2022/2258 du 9/09/2022 ; normes de commercialisation : règlement délégué (UE) 2023/2465 (remplace le règlement 589/2008, abrogé). Risque : ANSES, fiche Salmonella spp. (2021).
**Lien** : https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0853
**Certitude** : ✔ délai de 28 jours confirmé le 25/11/2026 (texte du règlement 2022/2258 cité par la presse professionnelle ; EUR-Lex à relire). La fiche pédagogique de l'académie de Strasbourg (cuisson à plus de 70 °C) est une bonne pratique, pas une norme.

### Huile de friture ✔
**Nature** : norme
**En bref** : une huile de friture est jugée impropre à la consommation quand elle dépasse 25 % de composés polaires ou 14 % de polymères de triglycérides. Le texte ne dit pas combien de fois on change l'huile : il faut la tester régulièrement (bandelette ou testeur) et garder la preuve. Ne pas dépasser 175 °C est une recommandation, pas une obligation.
**Texte** : décret n° 2008-184 du 26/02/2008, article 8 ; vade-mecum « Remise directe » V3, ligne C403L08 (pour le test régulier et les 175 °C).
**Lien** : https://faolex.fao.org/docs/pdf/fra85501.pdf
**Certitude** : ✔ décret lu le 25/11/2026.

### Huiles usagées ◐
**Nature** : norme
**En bref** : l'huile usagée ne va ni à l'évier, ni dans les égouts, ni dans la poubelle. Elle est reprise par une entreprise de collecte, qui vous remet un bon d'enlèvement à garder. Le seuil de 60 litres par an à partir duquel la collecte séparée devient obligatoire est cité par des sources professionnelles (arrêté du 12/07/2011) : texte non relu.
**Texte** : vade-mecum « Remise directe » V3, ligne E2L02 (cite le code de la santé publique, art. R.1331-2) ; arrêté du 12/07/2011 (non lu).
**Certitude** : ◐ règle générale lue dans le vade-mecum le 26/10/2026 ; seuil de 60 L à vérifier.

### Cuisson des viandes dans l'arrêté ✔
**Nature** : norme
**En bref** : l'arrêté du 21/12/2009 ne fixe aucune température de cuisson pour les viandes. Ses seuls chiffres de chaleur concernent le maintien au chaud (+63 °C) et, pour les collectivités, la remise en température. Les températures de cuisson viennent du guide Restaurateur et de l'ANSES (voir « Barèmes de cuisson »).
**Texte** : arrêté du 21/12/2009 (lecture complète).
**Certitude** : ✔ 20/10/2026.

## 5. Notions et bactéries

### Zone de danger ✔
**Nature** : avis
**En bref** : c'est la plage de température où les microbes se multiplient le plus vite. L'ANSES la situe entre +10 °C et +45 °C (fiche staphylocoque). L'arrêté de 2009 demande de ne pas rester entre +63 °C et +10 °C plus de 2 heures en restauration collective. Retenir : un plat ne doit pas rester tiède.
**Texte** : ANSES, fiche Staphylococcus aureus (septembre 2011) ; arrêté du 21/12/2009, annexe IV.
**Lien** : https://davar.gouv.nc/sites/default/files/atoms/files/anses_-_fiche_sur_staphylococcus_aureus.pdf
**Certitude** : ✔ lu le 31/10/2026.

### Température à cœur ✔
**Nature** : explication
**En bref** : c'est la température au centre du produit, à l'endroit le plus épais, là où il chauffe ou refroidit en dernier. On la mesure avec une sonde piquée au milieu. Les textes officiels l'emploient (arrêté de 2009, annexe IV ; ANSES) sans la définir.
**Texte** : arrêté du 21/12/2009, annexe IV ; ANSES, fiche E. coli STEC (2024).
**Certitude** : ✔ mot employé dans les textes lus ; définition donnée ici en mots simples.

### Valeur D, valeur z, réduction logarithmique ✔
**Nature** : avis
**En bref** : pour tuer les microbes, la température ne suffit pas : il faut aussi la durée. Valeur D : temps pour éliminer 90 % des bactéries à une température donnée. Valeur z : nombre de degrés qu'il faut ajouter pour aller 10 fois plus vite. Une cuisson est jugée assainissante quand elle divise les bactéries par 1 million (6 log).
**Citation** : « On peut considérer que la cuisson est assainissante si le critère de performance est supérieur ou égal à 6 log10 ».
**Texte** : ANSES, fiche « La cuisson basse température ». Exemples : volaille « 63° - 1 min » ; saumon « 61°C – 1 min ».
**Lien** : https://www.anses.fr/fr/system/files/Anses%20-%20fiche%20cuisson%20basse%20temp%C3%A9rature.pdf
**Certitude** : ✔ lu le 31/10/2026.

### Spores ✔
**Nature** : avis
**En bref** : certaines bactéries (Bacillus cereus, Clostridium) se protègent sous forme de spores que la cuisson ne tue pas. Si le plat refroidit lentement, elles se réveillent et se multiplient. D'où l'intérêt de refroidir vite.
**Citation** : « un refroidissement rapide immédiatement consécutif à la cuisson permet d'éviter leur germination ».
**Texte** : ANSES, fiche « La cuisson basse température ».
**Certitude** : ✔ lu le 31/10/2026.

### TIAC ✔
**Nature** : information
**En bref** : une TIAC (toxi-infection alimentaire collective), c'est au moins 2 personnes malades avec les mêmes symptômes (en général digestifs) après le même repas. C'est une maladie à déclaration obligatoire depuis 1987. Une seule plainte de client n'est pas une TIAC, mais elle doit être notée et traitée.
**Texte** : Santé publique France, « Toxi-infections alimentaires collectives, la maladie ».
**Lien** : https://www.santepubliquefrance.fr/toxi-infections-alimentaires-collectives/la-maladie
**Certitude** : ✔ lu le 31/10/2026. À qui déclarer : voir la procédure TIAC du logiciel (ARS et DDPP).

### Salmonella ✔
**Nature** : avis
**En bref** : on la trouve surtout dans les œufs, la volaille et le porc. La fiche de l'ANSES cite les œufs et les produits à base d'œufs crus (mayonnaise, mousse, tiramisu) parmi les premières causes d'intoxication. L'ANSES conseille de cuire à cœur à 70 °C, surtout la volaille et le porc.
**Texte** : ANSES, fiche Salmonella spp. (juin 2021) ; guide Restaurateur p. 181 (œufs liquides : 60 °C pendant 5 min).
**Lien** : https://www.anses.fr/fr/system/files/BIORISK2016SA0080.pdf?download=1
**Certitude** : ✔ lu le 31/10/2026.

### Listeria monocytogenes ✔
**Nature** : avis
**En bref** : elle se multiplie même au froid (de −2 à +45 °C). On la trouve dans la charcuterie cuite, les fromages au lait cru, les plats préparés. Elle est très grave pour la femme enceinte, le nouveau-né et les personnes fragiles. C'est pour elle que la durée de conservation des plats doit être justifiée.
**Texte** : ANSES, fiche de danger Listeria monocytogenes (avril 2020).
**Lien** : https://www.anses.fr/fr/system/files/BIORISK2016SA0081Fi.pdf?download=1
**Certitude** : ✔ lu le 20/10/2026.

### Campylobacter ✔
**Nature** : guide
**En bref** : surtout dans la volaille crue. Une cuisson au-dessus de 60 °C le détruit. Le risque vient surtout des contaminations croisées (planche, couteau, mains).
**Texte** : guide Restaurateur 2015, p. 181.
**Certitude** : ✔ lu le 20/10/2026.

### E. coli STEC ✔
**Nature** : avis
**En bref** : bactérie liée surtout à la viande hachée de bœuf pas assez cuite et à certains fromages au lait cru. L'ANSES conseille de bien cuire à cœur (70 °C) la viande hachée, en particulier pour les enfants.
**Texte** : ANSES, fiche STEC/EHEC (juillet 2024).
**Lien** : https://www.anses.fr/sites/default/files/Fiche-EHEC-2024-MPEX-0031.pdf?download=1
**Certitude** : ✔ lu le 31/10/2026.

### Staphylococcus aureus ✔
**Nature** : avis
**En bref** : il vient surtout des mains, du nez et des plaies du personnel. Il fabrique des toxines que la cuisson ne détruit pas. Les plats manipulés puis laissés tièdes sont les plus touchés. D'où l'importance du lavage des mains et du froid.
**Texte** : ANSES, fiche Staphylococcus aureus (septembre 2011).
**Lien** : https://davar.gouv.nc/sites/default/files/atoms/files/anses_-_fiche_sur_staphylococcus_aureus.pdf
**Certitude** : ✔ lu le 31/10/2026.

### Clostridium perfringens et Bacillus cereus ✔
**Nature** : guide
**En bref** : deux bactéries des plats cuisinés à l'avance (sauces, viandes en sauce, riz, pâtes). Elles se développent quand le plat reste tiède. Repères du guide : garder au-dessus de 63 °C ou en dessous de 3 °C, réchauffer à 75 °C au moins.
**Texte** : guide Restaurateur 2015, p. 180 (fiche C. perfringens).
**Certitude** : ✔ lu le 20/10/2026.

### Clostridium botulinum ✔
**Nature** : avis
**En bref** : bactérie du sol, dangereuse dans les conserves maison, les produits sous vide et les aliments peu acides mal conservés. Sa toxine est détruite par 10 min à 100 °C, mais l'ébullition ne suffit pas à stériliser une conserve.
**Texte** : ANSES, fiche Clostridium botulinum (janvier 2011).
**Lien** : https://www.anses.fr/fr/system/files/MIC-Fi-Clostridiumbotu.pdf
**Certitude** : ✔ lu le 31/10/2026.

### Anisakis ✔
**Nature** : norme
**En bref** : ver parasite du poisson de mer. Au-dessus de 55 °C, il meurt en moins d'une minute ; un poisson « rosé à l'arête » ne garantit pas qu'il est mort. Un poisson servi cru ou mariné doit avoir été congelé (24 h à −20 °C ou 15 h à −35 °C), sauf attestation du fournisseur. Le contrôle visuel des parasites est obligatoire.
**Texte** : guide Restaurateur p. 180 ; vade-mecum « Remise directe » V3, ligne C403L12 (qui renvoie au règlement 853/2004).
**Certitude** : ✔ lus le 20/10 et le 26/10/2026.

## 6. Températures de cuisson (France et UE seulement)
**Principe** : les barèmes du guide sont « donnés à titre indicatif » et « restent sous la responsabilité de chaque professionnel » (p. 109, p. 180). Ce ne sont pas des normes : l'établissement choisit et l'écrit dans son PMS.

**Barèmes ANSES du guide Restaurateur 2015, p. 180** ✔
| Famille | Barème | Détail |
|---|---|---|
| Viande hachée | 71 °C à cœur, ou 2 min à 70 °C | bœuf : plus de couleur rouge |
| Viande hachée de bœuf, veau, agneau, porc | 71 °C pendant 15 s | |
| Volaille hachée | 74 °C pendant 15 s | |
| Morceau entier de bœuf, veau, agneau, jambon | 63 °C pendant 15 s | |
| Plats cuisinés | maintien 63 °C, réchauffage 75 °C minimum | |
| Poisson | de 1 min à 60 °C à 15 min à 80 °C | |
| Coquillages | 2 min à 90 °C | |
| Œufs liquides entiers | 5 min à 60 °C | |
| Sanglier, cheval | 63 °C, ou 3 min à 58 °C, ou 4 h à 51 °C | |

**Volaille entière, canard, magret** ✖ : aucun barème dans le guide ni dans les textes. Le 80 °C utilisé en cuisine est un choix de l'établissement, pas une norme.

## 7. Réglementation et organisation

### 14 allergènes ✔
**Nature** : norme
**En bref** : gluten (blé, seigle, orge, avoine…), crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites (plus de 10 mg/kg ou 10 mg/L), lupin, mollusques. Pour les plats non emballés (restaurant), l'information du client est obligatoire, par écrit. Le risque allergène se gère par les bonnes pratiques (nettoyage, séparation), pas par un point critique HACCP.
**Texte** : règlement (UE) 1169/2011, article 44 et annexe II ; décret n° 2015-447 ; guide p. 177 ; avis CNA n° 66.
**Certitude** : ✔ guide lu le 20/10/2026 ; annexe II du règlement : liste conforme au guide.

### DLC et DDM ✔
**Nature** : norme
**En bref** : DLC = « À consommer jusqu'au… » : après la date, le produit ne se sert plus (danger). DDM = « À consommer de préférence avant… » : après la date, pas de danger, mais le goût ou la texture peuvent baisser. Servir un produit à DLC dépassée vaut une note D à l'inspection.
**Texte** : règlement (UE) 1169/2011, article 24 ; information Santé.fr (ministère de l'Agriculture, 2024) ; vade-mecum général V7, items C3 et C401.
**Lien** : https://www.sante.fr/node/8999023
**Certitude** : ✔ Santé.fr lu le 31/10/2026 ; article 24 non relu mot à mot.

### HACCP, CCP, PMS ✔
**Nature** : norme
**En bref** : chaque restaurant doit avoir un système fondé sur les 7 principes HACCP : repérer les dangers, trouver les points critiques (CCP), fixer leurs limites, les surveiller, corriger quand ça dérape, vérifier que ça marche, et garder les preuves. Le PMS (plan de maîtrise sanitaire) est le dossier qui rassemble tout cela pour l'inspecteur. Le texte ne fixe pas de durée de conservation des preuves (« période appropriée »).
**Texte** : règlement (CE) 852/2004, article 5.
**Lien** : https://eur-lex.europa.eu/eli/reg/2004/852/2021-03-24
**Certitude** : ✔ lu le 20/10/2026.

### DDPP et RappelConso ✔
**Nature** : information
**En bref** : la DDPP (direction départementale de la protection des populations) est le service de l'État qui contrôle l'hygiène des restaurants. RappelConso est le site officiel des rappels de produits : on peut y chercher un produit. Le logiciel le consulte deux fois par semaine.
**Texte** : INC-Conso, fiche DDPP (2023) ; service-public.gouv.fr, « Alertes produits ».
**Lien** : https://rappel.conso.gouv.fr/
**Certitude** : ✔ lu le 31/10/2026.

## 8. Critères microbiologiques (règlement (CE) n° 2073/2005) : version en vigueur au 01/07/2026

### Critère de sécurité et critère d'hygiène du procédé ✔
**Nature** : norme
**En bref** : ce règlement fixe des seuils de microbes pour les analyses de laboratoire. Un « critère de sécurité » concerne le produit vendu : s'il est dépassé, on retire ou on rappelle le produit. Un « critère d'hygiène » concerne la fabrication : s'il est dépassé, on corrige sa façon de travailler. Il ne fixe aucune fréquence d'analyses pour un restaurant : c'est l'établissement qui décide avec son laboratoire.
**Texte** : règlement (CE) n° 2073/2005, articles 2, 3 et 7.
**Lien** : https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01
**Certitude** : ✔ lu le 20/10/2026.

### Listeria monocytogenes : seuils ✔
**Nature** : norme
**En bref** : pour un produit prêt à manger, le seuil est de 100 microbes par gramme pendant toute la durée de conservation, à condition de pouvoir le prouver. Sinon, la Listeria ne doit pas être détectée dans 25 g. Depuis le 1er juillet 2026, ce contrôle vaut jusqu'à la date limite. Un produit gardé moins de 5 jours est classé « ne permet pas le développement de Listeria ».
**Texte** : règlement 2073/2005, annexe I, lignes 1.1 à 1.3, modifié par le règlement (UE) 2024/2895 (applicable au 01/07/2026).
**Lien** : https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01
**Certitude** : ✔ lu le 20/10/2026 ; date d'application confirmée le 25/11/2026.

### Salmonella : absence dans 25 g ✔
**Nature** : norme
**En bref** : aucune salmonelle ne doit être trouvée dans 25 g pour : la viande hachée à manger crue, la volaille hachée, les ovoproduits, les préparations prêtes à manger avec des œufs crus, les crustacés et coquillages cuits, les fruits et légumes prédécoupés, les jus non pasteurisés. Dans 10 g pour la viande hachée (hors volaille) destinée à être cuite.
**Texte** : règlement 2073/2005, annexe I, lignes 1.4 à 1.20.
**Certitude** : ✔ lu le 20/10/2026.

### Histamine (poisson) ✔
**Nature** : norme
**En bref** : thon, maquereau, sardine, anchois et poissons proches peuvent produire de l'histamine s'ils sont mal conservés au froid. Seuils : 100 mg/kg (m) et 200 mg/kg (M) sur 9 échantillons. La cuisson ne détruit pas l'histamine : seul le froid la prévient.
**Texte** : règlement 2073/2005, annexe I, lignes 1.26 et 1.27.
**Certitude** : ✔ lu le 20/10/2026.

### Viande hachée et préparations de viande : critères d'hygiène ✔
**Nature** : norme
**En bref** : seuils de fabrication pour la viande hachée (E. coli 50 à 500 par gramme) et les préparations de viande (500 à 5 000). Un dépassement oblige à améliorer l'hygiène et le choix des matières premières, sans rappel automatique. Le critère « colonies aérobies » ne s'applique pas à une viande hachée faite sur place et gardée moins de 24 heures.
**Texte** : règlement 2073/2005, annexe I, lignes 2.1.6 et 2.1.8.
**Certitude** : ✔ lu le 20/10/2026.

### Autres critères d'hygiène utiles en cuisine ✔
**Nature** : norme
**En bref** : ovoproduits (entérobactéries 10 à 100 par g), crustacés et coquillages cuits décortiqués (E. coli 1 à 10, staphylocoques 100 à 1 000), fruits et légumes prédécoupés (E. coli 100 à 1 000), fromages au lait cru (staphylocoques 10 000 à 100 000).
**Texte** : règlement 2073/2005, annexe I, chapitre 2.
**Certitude** : ✔ lu le 20/10/2026.

### Étude de durée de conservation ◐
**Nature** : norme
**En bref** : quand un produit prêt à manger permet à la Listeria de se développer, l'exploitant peut devoir prouver par des études (acidité, sel, emballage, essais) que le seuil sera respecté jusqu'à la date limite. Pour un restaurant, cela concerne surtout les plats gardés plusieurs jours.
**Texte** : règlement 2073/2005, article 3 §2 et annexe II (annexe non relue en 2026).
**Certitude** : ◐ article lu le 20/10/2026 ; annexe II à relire.

## 8 bis. Hygiène générale : règlement (CE) n° 852/2004, annexe II (consolidé 24/03/2021)
Ce règlement fixe des obligations de résultat, sans chiffres de température.

### Hygiène du personnel ✔
**Nature** : norme
**En bref** : tenue propre et adaptée, grande propreté personnelle. Une personne malade (diarrhée, maladie transmissible par les aliments) ou avec une plaie infectée ne touche pas les aliments s'il y a un risque, et prévient tout de suite son responsable. Lavabos avec eau chaude et froide et séchage hygiénique ; vestiaires adaptés.
**Texte** : règlement 852/2004, annexe II, chapitre VIII ; chapitre I points 4 et 9.
**Certitude** : ✔ 20/10/2026. Le texte ne donne ni liste de maladies ni délai d'arrêt.

### Contamination croisée, déchets, eau, nuisibles ✔
**Nature** : norme
**En bref** : protéger les aliments à chaque étape ; séparer les produits crus et les produits prêts à manger ; jamais de produit de nettoyage là où on manipule les aliments ; déchets évacués vite dans des poubelles fermées ; eau potable ; lutte contre les nuisibles et pas d'animaux en cuisine ; nettoyer le matériel entre deux préparations quand il y a un risque d'allergène.
**Texte** : règlement 852/2004, annexe II, chapitres I, VI, VII et IX.
**Certitude** : ✔ 20/10/2026.

### Chaîne du froid : les principes ✔
**Nature** : norme
**En bref** : ne pas laisser un aliment fragile à une température dangereuse. De courtes sorties du froid sont admises pour la manutention si elles sont sans risque. Refroidir « dès que possible » après la cuisson. Décongeler en limitant la multiplication des microbes et évacuer le jus. Les chiffres (63 °C, +4 °C…) viennent de l'arrêté de 2009, pas de ce règlement.
**Texte** : règlement 852/2004, annexe II, chapitre IX points 5 à 7.
**Certitude** : ✔ 20/10/2026.

### Culture de la sécurité alimentaire ✔
**Nature** : norme
**En bref** : la direction doit montrer que l'hygiène est l'affaire de tous : chacun connaît son rôle, peut signaler un problème, est formé et encadré, et l'équipe s'améliore. Cela s'adapte à la taille du restaurant.
**Texte** : règlement 852/2004, annexe II, chapitre XI bis.
**Certitude** : ✔ texte lu ; date d'application ◐.

### Formation ✔
**Nature** : norme
**En bref** : toute personne qui manipule des aliments est encadrée et formée à l'hygiène selon son poste. En restauration commerciale, au moins une personne de l'équipe doit avoir suivi la formation spécifique de 14 heures, et le justificatif doit être sur place. La formation « HACCP » n'est pas la même chose que la formation de 14 heures.
**Texte** : règlement 852/2004, annexe II, chapitre XII ; code rural, art. L. 233-4 et arrêté du 5/10/2011 ; instruction DGAL 2026-185 ; vade-mecum « Remise directe » V3, ligne F2L02 (aucune personne formée = note D).
**Certitude** : ✔ règlement et vade-mecum lus ; arrêté du 5/10/2011 ◐ non relu.

### Don alimentaire ✔
**Nature** : norme
**En bref** : on peut donner un produit à DLC avant la date, et un produit à DDM même après. Il faut vérifier l'emballage, la température et garder la traçabilité pour les produits d'origine animale.
**Texte** : règlement 852/2004, annexe II, chapitre V bis.
**Certitude** : ✔ 20/10/2026.

### Locaux et équipements ✔
**Nature** : norme
**En bref** : sols, murs, portes et plans de travail lisses, lavables et faciles à désinfecter ; matériel nettoyé et désinfecté assez souvent ; lave-mains avec eau chaude et froide ; l'air ne doit pas aller de la zone sale vers la zone propre.
**Texte** : règlement 852/2004, annexe II, chapitres I, II et V.
**Certitude** : ✔ 20/10/2026.

## 8 ter. Contrôle officiel 1 : le déroulement
Source commune : vade-mecums d'inspection de la DGAL (https://agriculture.gouv.fr/les-vade-mecums-dinspection), lus le 26/10/2026.

### Comment se passe un contrôle d'hygiène ✔
**Nature** : inspection
**En bref** : le contrôle se fait en général sans prévenir. L'inspecteur demande un responsable, rappelle les écarts du dernier contrôle et demande ce qui a été fait depuis. Il demande ce qui a changé (travaux, matériel, plats). Il visite, lit les documents, donne ses constats à l'oral, puis écrit son rapport.
**Texte** : vade-mecum général V7 (sept. 2026), chapitre II.C.
**Certitude** : ✔ lu le 26/10/2026.

### Ce que l'inspecteur prépare avant de venir ✔
**Nature** : inspection
**En bref** : il relit votre déclaration d'activité, les rapports précédents, les analyses officielles, l'historique des intoxications et votre PMS. Sur place, il peut suivre un produit au hasard, de la date limite jusqu'au fournisseur.
**Texte** : vade-mecum général V7, chapitres II.C.1 et III.
**Certitude** : ✔ lu le 26/10/2026.

### Le vade-mecum et la grille d'inspection ✔
**Nature** : inspection
**En bref** : le vade-mecum est le guide public des inspecteurs ; la grille est la liste des points notés. Six chapitres : A identification, B locaux et matériel, C maîtrise de la production, D traçabilité et réactivité, E déchets, F personnel. Pour un restaurant, c'est le vade-mecum « Remise directe ». Tout le monde peut le lire.
**Texte** : vade-mecum général V7 ; vade-mecum « Remise directe » V3 (https://agriculture.gouv.fr/telecharger/129266).
**Certitude** : ✔ lu le 26/10/2026.

### Réactivité : ce que vous avez fait depuis la dernière visite ✔
**Nature** : inspection
**En bref** : l'inspecteur demande la liste des écarts passés et ce qui a été corrigé. Une trace écrite et datée vaut mieux qu'une explication de mémoire. Ce chapitre juge aussi la gestion des alertes, des rappels, des plaintes de clients et des intoxications.
**Texte** : vade-mecum général V7, item D2.
**Certitude** : ✔ lu le 26/10/2026.

### Action corrective et autocontrôle ✔
**Nature** : inspection
**En bref** : action corrective = ce qu'on fait quand quelque chose ne va pas (mettre le produit de côté, décider de son sort, éviter que ça recommence). Autocontrôle = tout ce que vous vérifiez vous-même (températures, nettoyage, réception). Sans trace écrite, l'action n'existe pas pour l'inspecteur.
**Texte** : vade-mecum général V7, définitions.
**Certitude** : ✔ lu le 26/10/2026.

## 8 quater. Contrôle officiel 2 : les notes

### Les notes A, B, C, D ✔
**Nature** : inspection
**En bref** : A = conforme. B = petit écart, sans risque. C = écart moyen, le risque augmente. D = écart grave, risque élevé. Un seul D dans un chapitre suffit pour que tout le chapitre soit noté D.
**Texte** : vade-mecum général V7, chapitre III.D.
**Certitude** : ✔ lu le 26/10/2026.

### La note globale de l'établissement ✔
**Nature** : inspection
**En bref** : A satisfaisant, B acceptable, C insuffisant (l'inspecteur n'a plus confiance), D perte de maîtrise (sanctions sans délai). Un seul chapitre D donne un D global.
**Texte** : vade-mecum général V7, chapitre III.D.3.
**Certitude** : ✔ lu le 26/10/2026.

## 8 quinquies. Contrôle officiel 3 : ce qui pèse le plus
Listes tirées des « lignes directrices de notation » du vade-mecum général. La note tient toujours compte de la gravité.

### Notes D : températures, DLC et enregistrements ✔
**Nature** : inspection
**En bref** : produit à DLC dépassée en vente ; températures non surveillées, non notées, ou sans action quand elles sont mauvaises ; produits interdits reçus ; emballages sales ou non alimentaires ; pas d'analyse des dangers ; pas d'eau potable.
**Texte** : vade-mecum général V7, items C1 à C7.
**Certitude** : ✔ lu le 26/10/2026.

### Notes D : traçabilité et alertes ✔
**Nature** : inspection
**En bref** : impossible de dire d'où vient un produit ou où il est allé ; intoxication non signalée ; alerte non transmise ; produit dangereux ni retiré ni rappelé. Note C : alerte signalée trop tard, plainte de client non traitée.
**Texte** : vade-mecum général V7, items D1 et D2.
**Certitude** : ✔ lu le 26/10/2026.

### Notes D : locaux, nuisibles, déchets ✔
**Nature** : inspection
**En bref** : locaux inadaptés ; toilettes qui ouvrent directement sur la cuisine ; aliments non protégés dehors ; condensation qui goutte sur des aliments ; fenêtres sans protection ouvertes pendant le travail ; poubelles en zone de préparation avec risque de contamination.
**Texte** : vade-mecum général V7, items B1, B2, B3 et E1.
**Certitude** : ✔ lu le 26/10/2026.

### Notes D : personnel et hygiène ✔
**Nature** : inspection
**En bref** : lave-mains absent ou incomplet (pas de savon, d'eau tiède ou d'essuie-mains) ; lave-mains inaccessible ; tenues propres et sales mélangées au vestiaire ; personne malade ou blessée non protégée ; aucune consigne écrite à un poste qui gère un point critique.
**Texte** : vade-mecum général V7, items F1 et F2.
**Certitude** : ✔ lu le 26/10/2026.

### Notes C : les écarts les plus courants ✔
**Nature** : inspection
**En bref** : procédures manquantes pour les points critiques (elles doivent être écrites) ; mauvais résultat de contrôle sans action ; sondes et thermomètres jamais vérifiés ; nettoyage qui ne suit pas la procédure (produit, dose, temps, rinçage) ; durée de vie des plats non justifiée ; écart de température de +2 à +3 °C (au-delà de +3 °C : D).
**Texte** : vade-mecum général V7, items B2, B5, C1 à C6 ; vade-mecum « Remise directe » V3, item C401.
**Certitude** : ✔ lu le 26/10/2026.

## 8 sexies. Contrôle officiel 4 : retraits et rappels
Texte : vade-mecum « Contrôle de l'effectivité des retraits/rappels en remise directe » V2 sept. 2026 (https://agriculture.gouv.fr/telecharger/138248), lu le 26/10/2026.

### Retrait et rappel : la différence ✔
**Nature** : inspection
**En bref** : retrait = on arrête de vendre le produit (il sort de la carte). Rappel = on prévient les clients qui l'ont déjà et on leur dit quoi faire. Un restaurant fait surtout des retraits.
**Texte** : vade-mecum retraits/rappels V2, définitions.
**Certitude** : ✔ lu le 26/10/2026.

### Retirer un produit rappelé : la demi-journée ✔
**Nature** : inspection
**En bref** : dès que l'alerte arrive (fournisseur ou communiqué), le produit est retiré, au plus tard dans la demi-journée ouvrée (ou plus vite si votre PMS le prévoit). Produit encore là après ce délai : D. Retrait fait et noté : A ; fait mais pas noté : B.
**Texte** : vade-mecum retraits/rappels V2, ligne D201.
**Certitude** : ✔ lu le 26/10/2026.

### Informer les clients d'un rappel ✔
**Nature** : inspection
**En bref** : afficher un message lisible près de la carte ou de la caisse : produit, lot, date, danger, quoi faire. Au moins 15 jours d'ouverture pour un produit frais, 2 mois pour un surgelé, une conserve ou un produit sec. Pas d'affichage alors que le produit a été vendu : D.
**Texte** : vade-mecum retraits/rappels V2, ligne D202.
**Certitude** : ✔ lu le 26/10/2026.

### Que faire d'un produit retiré ✔
**Nature** : inspection
**En bref** : le mettre à part avec une étiquette claire : « non conforme, non destiné à la consommation humaine » ou « exclusivement pour élimination ». « Ne pas toucher » ou « retour fournisseur » ne suffisent pas. Interdit de le donner, le vendre, le cuisiner ou le donner aux animaux.
**Texte** : vade-mecum retraits/rappels V2, ligne D203.
**Certitude** : ✔ lu le 26/10/2026.

### Prévenir ceux à qui vous avez cédé le produit ✔
**Nature** : inspection
**En bref** : si vous avez donné ou revendu le produit (association, autre point de vente), transmettez-leur l'alerte avec un message clair. Pas transmis : D. Si vous ne cédez jamais de produits : sans objet.
**Texte** : vade-mecum retraits/rappels V2, ligne D204.
**Certitude** : ✔ lu le 26/10/2026.

## 8 septies. Contrôle officiel 5 : petits restaurants et produits d'entretien

### Petits restaurants : la « flexibilité » ✔
**Nature** : inspection
**En bref** : avec 5 personnes ou moins au contact des aliments, on peut noter seulement les écarts et leurs corrections pour les bonnes pratiques d'hygiène, et les procédures peuvent être orales. Mais cuissons, refroidissements, maintien au chaud et préparations à risque restent à documenter, sauf si vous suivez un guide de bonnes pratiques validé. En cas de manquements, cette souplesse peut être retirée.
**Texte** : vade-mecum général V7, chapitre II.B.3 (cite l'instruction DGAL/SDSSA/2018-924).
**Certitude** : ✔ vade-mecum lu ; ◐ instruction elle-même non lue.

### Produits d'entretien et contre les nuisibles ✔
**Nature** : inspection
**En bref** : dans leur emballage d'origine ou un récipient fermé et étiqueté ; rangés à part, loin des aliments ; fiche technique gardée ; utilisés selon le mode d'emploi (dose, temps, rinçage). Produits contre les nuisibles : autorisés, avec leur numéro d'autorisation.
**Texte** : vade-mecum général V7, lignes B3L02, B4L02, B5L02.
**Certitude** : ✔ lu le 26/10/2026.

## 9. Non publié
- Volaille entière, canard, magret : aucun barème officiel ; le 80 °C est un choix de cuisine. Question posée aux autorités (en attente).
- Règlement 2073/2005 : règles d'interprétation, chapitre 3 et annexe II non relus.
- Date de l'avis au Journal officiel du guide Restaurateur : à retrouver.
- Équivalences temps/température trouvées sur des sites privés : non reprises.
- Fiches retirées le 25/11 (hors restauration commerciale) : gibier sauvage en petites quantités (commerce de détail fourni par un chasseur) ; historique des changements de l'annexe IV entre 2009 et 2020.

## 10. Questions pour Loïc
1. Relecture par un consultant HACCP avant de dire « vérifié » aux clients ?
2. Lexique réservé aux clients connectés, ou aussi public sur le site ?
