// FICHIER GÉNÉRÉ par scripts/genererLexique.mjs à partir de docs/lexique-haccp.md : ne pas modifier à la main.
// Chaque entrée porte sa source, son lien et son niveau de certitude (verifie / a-confirmer / mixte).
export const LEXIQUE_DATE = "2026-11-25";
export const LEXIQUE_GROUPES = [
 {
  "nom": "1 · Les bases : HACCP, PMS, qui contrôle",
  "intro": "Les mots qu'on entend tout le temps, et quelles règles s'appliquent à votre restaurant."
 },
 {
  "nom": "2 · Le froid et le chaud pendant le service",
  "intro": "Les températures à connaître au quotidien."
 },
 {
  "nom": "3 · La cuisson et la friture",
  "intro": "Les températures de cuisson et leur origine, et l'huile de friture."
 },
 {
  "nom": "4 · Refroidir, réchauffer, congeler, décongeler",
  "intro": "Tout ce qui se passe entre la cuisson et l'assiette. Les fiches « collectivités » sont obligatoires pour les cantines ; pour un restaurant commercial, ce sont des repères."
 },
 {
  "nom": "5 · Produits particuliers",
  "intro": "Viande hachée, œufs, poisson."
 },
 {
  "nom": "6 · Dates, allergènes et information du client",
  "intro": "Ce que le client doit savoir, et les dates de vos produits."
 },
 {
  "nom": "7 · Hygiène du personnel, locaux et nettoyage",
  "intro": "Les règles de base de la cuisine : mains, tenue, locaux, déchets, nuisibles."
 },
 {
  "nom": "8 · Les germes et les intoxications",
  "intro": "Les bactéries qu'on rencontre en cuisine et ce qu'est une TIAC."
 },
 {
  "nom": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "intro": "Les seuils officiels si vous faites analyser vos produits. Ce règlement ne fixe pas de fréquence d'analyses pour un restaurant."
 },
 {
  "nom": "10 · Le contrôle officiel : le déroulement",
  "intro": "Comment se passe une inspection."
 },
 {
  "nom": "11 · Le contrôle officiel : les notes",
  "intro": "Comment l'inspecteur note : A, B, C, D."
 },
 {
  "nom": "12 · Le contrôle officiel : ce qui pèse le plus",
  "intro": "Les situations qui valent une note D ou C. À éviter en priorité."
 },
 {
  "nom": "13 · Le contrôle officiel : retraits et rappels",
  "intro": "Que faire quand un produit est rappelé : le délai, l'affichage, le produit retiré."
 },
 {
  "nom": "14 · Le contrôle officiel : petits restaurants et produits d'entretien",
  "intro": "Les assouplissements pour les petites équipes, et le rangement des produits."
 }
];
export const LEXIQUE = [
 {
  "id": "haccp-ccp-pms-32",
  "section": "1 · Les bases : HACCP, PMS, qui contrôle",
  "titre": "HACCP, CCP, PMS : ce que c'est",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "chaque restaurant doit avoir un système fondé sur les 7 principes HACCP : repérer les dangers, trouver les points critiques (CCP), fixer leurs limites, les surveiller, corriger quand ça dérape, vérifier que ça marche, et garder les preuves. Le PMS (plan de maîtrise sanitaire) est le dossier qui rassemble tout cela pour l'inspecteur. Le texte ne fixe pas de durée de conservation des preuves (« période appropriée »)."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) 852/2004, article 5."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2004/852/2021-03-24"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire"
 },
 {
  "id": "ddpp-et-rappelconso-33",
  "section": "1 · Les bases : HACCP, PMS, qui contrôle",
  "titre": "La DDPP et RappelConso",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "la DDPP (direction départementale de la protection des populations) est le service de l'État qui contrôle l'hygiène des restaurants. RappelConso est le site officiel des rappels de produits : on peut y chercher un produit. Le logiciel le consulte deux fois par semaine."
   },
   {
    "label": "Texte",
    "texte": "INC-Conso, fiche DDPP (2023) ; service-public.gouv.fr, « Alertes produits »."
   },
   {
    "label": "Lien",
    "texte": "https://rappel.conso.gouv.fr/"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "information",
  "motsCles": ""
 },
 {
  "id": "culture-de-la-securite-alimentaire-44",
  "section": "1 · Les bases : HACCP, PMS, qui contrôle",
  "titre": "La culture de la sécurité alimentaire",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "la direction doit montrer que l'hygiène est l'affaire de tous : chacun connaît son rôle, peut signaler un problème, est formé et encadré, et l'équipe s'améliore. Cela s'adapte à la taille du restaurant."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitre XI bis."
   },
   {
    "label": "Certitude",
    "texte": "✔ texte lu ; date d'application ◐."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "quelles-regles-pour-quel-type-d-etablissement-0",
  "section": "1 · Les bases : HACCP, PMS, qui contrôle",
  "titre": "Quelles règles pour quel type d'établissement ?",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un restaurant, un snack ou une pizzeria fait de la « remise directe » : il vend au client final. La « restauration collective » sert des repas à des clients réguliers liés par un contrat (cantine, restaurant d'entreprise). Les deux suivent les températures de l'annexe I et la décongélation de l'annexe VI. Seule la restauration collective suit l'annexe IV : refroidissement en 2 h, remise en température en 1 h, plats témoins, durée de vie de 3 jours. Pour un restaurant commercial, ces chiffres sont des repères, pas des obligations."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, articles 1, 2, 6, 7 et 8."
   },
   {
    "label": "Lien",
    "texte": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021573483"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026. Si votre cuisine livre un jour une collectivité sous contrat, l'annexe IV s'applique à cette activité."
   }
  ],
  "nature": "norme",
  "motsCles": "cellule abattage 63 10 deux heures 2h réchauffage reheat 63 75 une heure 1h dégel sortir congélateur recongélation échantillon conservation 5 jours 0 3 température conservation frigo congélateur annexe i"
 },
 {
  "id": "temperatures-maximales-de-conservation-au-froid-10",
  "section": "2 · Le froid et le chaud pendant le service",
  "titre": "Températures maximales de conservation au froid",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "viande hachée +2 °C. Abats +3 °C. Préparations de viande +4 °C. Volailles, lapin, petit gibier +4 °C. Viandes de bœuf, veau, porc, agneau : +4 °C pour les morceaux de découpe, +7 °C pour les carcasses et gros morceaux. Poisson frais, crustacés et mollusques cuits : +2 °C (glace fondante : 0 à +2 °C). Ovoproduits et lait cru +4 °C. Plats cuisinés à l'avance +3 °C. Autres produits très périssables +4 °C ; autres périssables +8 °C. Lait pasteurisé et fromages affinés : température du fabricant."
   },
   {
    "label": "Citation",
    "texte": "« La limite inférieure de conservation des denrées alimentaires réfrigérées doit se situer à la température débutante de congélation propre à chaque catégorie de produits. »"
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I, colonne « établissements de remise directe ou de restauration collective » ; guide Restaurateur p. 179. Un produit emballé peut porter une température plus basse fixée par le fabricant : c'est elle qu'on suit."
   },
   {
    "label": "Certitude",
    "texte": "✔ relu le 25/11/2026 (copie de la DDPP de Saône-et-Loire)."
   }
  ],
  "nature": "norme",
  "motsCles": "steak haché boeuf 71 steak température conservation frigo congélateur annexe i"
 },
 {
  "id": "chaine-du-froid-les-principes-43",
  "section": "2 · Le froid et le chaud pendant le service",
  "titre": "Chaîne du froid : les principes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ne pas laisser un aliment fragile à une température dangereuse. De courtes sorties du froid sont admises pour la manutention si elles sont sans risque. Refroidir « dès que possible » après la cuisson. Décongeler en limitant la multiplication des microbes et évacuer le jus. Les chiffres (63 °C, +4 °C…) viennent de l'arrêté de 2009, pas de ce règlement."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitre IX points 5 à 7."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "maintien-au-chaud-63-c-minimum-2",
  "section": "2 · Le froid et le chaud pendant le service",
  "titre": "Maintien au chaud : +63 °C minimum",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "un plat servi ou livré chaud doit rester à +63 °C ou plus. C'est obligatoire pour tous les établissements, restaurants compris. En dessous, il faut une analyse des dangers validée."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I, tableau « Température minimale en liaison chaude » : « Plats cuisinés ou repas livrés chauds ou remis au consommateur : + 63 °C »."
   },
   {
    "label": "Lien",
    "texte": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000021573483"
   },
   {
    "label": "Certitude",
    "texte": "✔ chiffre lu le 25/11/2026 (annexe I, copie de la DDPP de Saône-et-Loire)."
   }
  ],
  "nature": "norme",
  "motsCles": "bain-marie 63 liaison chaude"
 },
 {
  "id": "zone-de-danger-17",
  "section": "2 · Le froid et le chaud pendant le service",
  "titre": "Zone de danger",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "c'est la plage de température où les microbes se multiplient le plus vite. L'ANSES la situe entre +10 °C et +45 °C (fiche staphylocoque). L'arrêté de 2009 demande de ne pas rester entre +63 °C et +10 °C plus de 2 heures en restauration collective. Retenir : un plat ne doit pas rester tiède."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche Staphylococcus aureus (septembre 2011) ; arrêté du 21/12/2009, annexe IV."
   },
   {
    "label": "Lien",
    "texte": "https://davar.gouv.nc/sites/default/files/atoms/files/anses_-_fiche_sur_staphylococcus_aureus.pdf"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": ""
 },
 {
  "id": "temperature-a-c-ur-18",
  "section": "2 · Le froid et le chaud pendant le service",
  "titre": "Température à cœur",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "c'est la température au centre du produit, à l'endroit le plus épais, là où il chauffe ou refroidit en dernier. On la mesure avec une sonde piquée au milieu. Les textes officiels l'emploient (arrêté de 2009, annexe IV ; ANSES) sans la définir."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV ; ANSES, fiche E. coli STEC (2024)."
   },
   {
    "label": "Certitude",
    "texte": "✔ mot employé dans les textes lus ; définition donnée ici en mots simples."
   }
  ],
  "nature": "explication",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "baremes-cuisson-guide-p180",
  "section": "3 · La cuisson et la friture",
  "titre": "Barèmes de cuisson du guide Restaurateur",
  "certitude": "verifie",
  "nature": "guide",
  "champs": [
   {
    "label": "En bref",
    "texte": "Barèmes recommandés par l'ANSES, repris par le guide « à titre indicatif ». Ils « restent sous la responsabilité de chaque professionnel ». Viande hachée : 71 °C à cœur, ou 2 min à 70 °C (bœuf : plus de couleur rouge) ; Viande hachée de bœuf, veau, agneau, porc : 71 °C pendant 15 s ; Volaille hachée : 74 °C pendant 15 s ; Morceau entier de bœuf, veau, agneau, jambon : 63 °C pendant 15 s ; Plats cuisinés : maintien 63 °C, réchauffage 75 °C minimum ; Poisson : de 1 min à 60 °C à 15 min à 80 °C ; Coquillages : 2 min à 90 °C ; Œufs liquides entiers : 5 min à 60 °C ; Sanglier, cheval : 63 °C, ou 3 min à 58 °C, ou 4 h à 51 °C."
   },
   {
    "label": "Texte",
    "texte": "Guide de bonnes pratiques d'hygiène et d'application de l'HACCP « Restaurateur », novembre 2015, page imprimée 180 (page 187 du fichier PDF)."
   },
   {
    "label": "Volaille entière, canard, magret",
    "texte": "Aucun barème officiel trouvé. Le 80 °C utilisé en cuisine est un choix de l'établissement, pas une norme. Question aux autorités en attente."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire steak haché boeuf 71 steak"
 },
 {
  "id": "cuisson-des-viandes-dans-l-arrete-16",
  "section": "3 · La cuisson et la friture",
  "titre": "Cuisson des viandes dans l'arrêté",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'arrêté du 21/12/2009 ne fixe aucune température de cuisson pour les viandes. Ses seuls chiffres de chaleur concernent le maintien au chaud (+63 °C) et, pour les collectivités, la remise en température. Les températures de cuisson viennent du guide Restaurateur et de l'ANSES (voir « Barèmes de cuisson »)."
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
  "nature": "norme",
  "motsCles": "réchauffage reheat 63 75 une heure 1h bain-marie 63 liaison chaude"
 },
 {
  "id": "valeur-d-valeur-z-reduction-logarithmique-19",
  "section": "3 · La cuisson et la friture",
  "titre": "Valeur D, valeur z (pour comprendre les barèmes)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "pour tuer les microbes, la température ne suffit pas : il faut aussi la durée. Valeur D : temps pour éliminer 90 % des bactéries à une température donnée. Valeur z : nombre de degrés qu'il faut ajouter pour aller 10 fois plus vite. Une cuisson est jugée assainissante quand elle divise les bactéries par 1 million (6 log)."
   },
   {
    "label": "Citation",
    "texte": "« On peut considérer que la cuisson est assainissante si le critère de performance est supérieur ou égal à 6 log10 »."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche « La cuisson basse température ». Exemples : volaille « 63° - 1 min » ; saumon « 61°C – 1 min »."
   },
   {
    "label": "Lien",
    "texte": "https://www.anses.fr/fr/system/files/Anses%20-%20fiche%20cuisson%20basse%20temp%C3%A9rature.pdf"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": ""
 },
 {
  "id": "huile-de-friture-14",
  "section": "3 · La cuisson et la friture",
  "titre": "Huile de friture",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "une huile de friture est jugée impropre à la consommation quand elle dépasse 25 % de composés polaires ou 14 % de polymères de triglycérides. Le texte ne dit pas combien de fois on change l'huile : il faut la tester régulièrement (bandelette ou testeur) et garder la preuve. Ne pas dépasser 175 °C est une recommandation, pas une obligation."
   },
   {
    "label": "Texte",
    "texte": "décret n° 2008-184 du 26/02/2008, article 8 ; vade-mecum « Remise directe » V3, ligne C403L08 (pour le test régulier et les 175 °C)."
   },
   {
    "label": "Lien",
    "texte": "https://faolex.fao.org/docs/pdf/fra85501.pdf"
   },
   {
    "label": "Certitude",
    "texte": "✔ décret lu le 25/11/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "refroidissement-63-c-a-10-c-en-2-h-maximum-collectivites-3",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Refroidissement : +63 °C à +10 °C en 2 h maximum (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, un plat cuit doit passer de +63 °C à +10 °C à cœur en moins de 2 heures, puis être gardé entre 0 et +3 °C. Pour un restaurant commercial, aucun texte ne fixe de durée : l'établissement fixe sa propre règle dans son PMS et enregistre chaque refroidissement. L'inspecteur vérifie qu'une procédure existe et qu'elle est suivie."
   },
   {
    "label": "Citation",
    "texte": "« leur température à cœur ne demeure pas à des valeurs comprises entre + 63° C et + 10° C pendant plus de deux heures »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 1 (version du 09/05/2020) ; vade-mecum « Remise directe » V3, ligne C403L09."
   },
   {
    "label": "Certitude",
    "texte": "✔ lus le 20/10 et le 26/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "cellule abattage 63 10 deux heures 2h température conservation frigo congélateur annexe i"
 },
 {
  "id": "remise-en-temperature-collectivites-4",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Remise en température (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, un plat réchauffé passe de +10 °C à la température de service en 1 heure maximum, atteint au moins +63 °C et se mange le jour même. Pour un restaurant commercial, c'est un repère. Le guide Restaurateur donne aussi un repère de 75 °C (voir « Barèmes de cuisson »). Un bain-marie ou une étuve sert à maintenir au chaud, pas à réchauffer."
   },
   {
    "label": "Citation",
    "texte": "« ne demeure pas pendant plus d'une heure à des valeurs comprises entre + 10° C et la température de remise au consommateur »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 3 ; vade-mecum « Remise directe » V3, ligne C403L10."
   },
   {
    "label": "Certitude",
    "texte": "✔ lus le 20/10 et le 26/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "réchauffage reheat 63 75 une heure 1h"
 },
 {
  "id": "surgelation-et-congelation-11",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Surgélation et congélation",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "−18 °C pour les glaces, la viande hachée, les préparations de viande et le poisson congelés. −12 °C pour les autres produits congelés. Une remontée de +3 °C en surface est tolérée seulement pendant de courts moments (chargement, déchargement, mise en vitrine)."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe I (tableau des denrées congelées et paragraphe a) qui suit) ; guide p. 179."
   },
   {
    "label": "Certitude",
    "texte": "✔ relu le 25/11/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "decongelation-12",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Décongélation",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "on décongèle au réfrigérateur, entre 0 °C et la température de conservation du produit (à défaut entre 0 et +4 °C), ou on cuit directement sans décongeler. Jamais à température ambiante. Un produit décongelé ne se recongèle pas. Le texte ne fixe aucune durée : on suit la durée du fabricant quand elle existe, sinon l'établissement fixe la sienne dans son PMS. La mention « décongelé » n'est obligatoire que sur un produit vendu tel quel, pas sur un plat cuisiné avec ce produit."
   },
   {
    "label": "Citation",
    "texte": "« soit dans une enceinte réfrigérée entre 0 °C et la température maximale de conservation de la denrée » ; « A défaut, [...] entre 0 °C et + 4 °C »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe VI ; vade-mecum « Remise directe » V3, lignes C403L02-03 et C7L02."
   },
   {
    "label": "Certitude",
    "texte": "✔ lus le 20/10 et le 26/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "dégel sortir congélateur recongélation"
 },
 {
  "id": "duree-de-vie-des-plats-prepares-a-l-avance-5",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Durée de vie des plats préparés à l'avance",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, un plat préparé à l'avance et gardé au froid se garde au maximum jusqu'au 3e jour après sa fabrication, sauf étude de durée de vie. Pour un restaurant commercial, aucun texte ne fixe de nombre de jours : c'est l'établissement qui fixe la date limite et qui doit pouvoir la justifier. Une durée non justifiée vaut une note C à l'inspection."
   },
   {
    "label": "Citation",
    "texte": "DLC « ne peut excéder le troisième jour après celui de sa fabrication en l'absence d'études de durée de vie »."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 4 ; vade-mecum général V7, ligne C6L04 ; guide Restaurateur p. 109."
   },
   {
    "label": "Certitude",
    "texte": "✔ lus le 20/10 et le 26/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "preparations-servies-froides-collectivites-7",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Préparations servies froides (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, une préparation froide est gardée entre 0 et +3 °C jusqu'au service. Elle peut rester sortie 2 heures au maximum, à +10 °C au plus. Pour un restaurant commercial, c'est un repère."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 2."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "fin-de-service-restes-et-excedents-collectivites-9",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Fin de service : restes et excédents (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, ce qui a été présenté au client ne se ressert pas. Les « excédents » jamais présentés peuvent être servis plus tard ou donnés, avec une date limite et une étiquette. Pour un restaurant commercial, c'est un repère."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV points 7 et 8."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026 ; définition des « excédents » (article 2) non lue."
   }
  ],
  "nature": "collectivite",
  "motsCles": ""
 },
 {
  "id": "plats-temoins-5-jours-collectivites-6",
  "section": "4 · Refroidir, réchauffer, congeler, décongeler",
  "titre": "Plats témoins : 5 jours (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, on garde un échantillon de chaque plat servi pendant au moins 5 jours, entre 0 et +3 °C, pour les contrôleurs. Ce n'est pas demandé à un restaurant commercial."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 5."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "échantillon conservation 5 jours 0 3"
 },
 {
  "id": "viande-hachee-cession-au-consommateur-1",
  "section": "5 · Produits particuliers",
  "titre": "Viande hachée vendue au client",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en remise directe, la viande hachée se prépare à la demande et devant le client. La préparer à l'avance n'est permis que si l'atelier respecte les règles du règlement 853/2004 et si l'activité est déclarée au préfet."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe VII."
   },
   {
    "label": "Certitude",
    "texte": "✔ annexe lue le 20/10/2026 ; renvois au 853/2004 non lus."
   }
  ],
  "nature": "norme",
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "ufs-13",
  "section": "5 · Produits particuliers",
  "titre": "Les œufs",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "les œufs doivent être remis au consommateur au plus tard 28 jours après la ponte (avant novembre 2022 : 21 jours). Leur date de durabilité minimale (DDM) est au plus 28 jours après la ponte. On les garde à une température de préférence constante, adaptée à leur conservation. Les préparations à base d'œufs crus (mayonnaise, mousse) sont les plus à risque de salmonelle."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) 853/2004, annexe III, section X, modifié par le règlement délégué (UE) 2022/2258 du 9/09/2022 ; normes de commercialisation : règlement délégué (UE) 2023/2465 (remplace le règlement 589/2008, abrogé). Risque : ANSES, fiche Salmonella spp. (2021)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004R0853"
   },
   {
    "label": "Certitude",
    "texte": "✔ délai de 28 jours confirmé le 25/11/2026 (texte du règlement 2022/2258 cité par la presse professionnelle ; EUR-Lex à relire). La fiche pédagogique de l'académie de Strasbourg (cuisson à plus de 70 °C) est une bonne pratique, pas une norme."
   }
  ],
  "nature": "norme",
  "motsCles": "salmonelle œuf volaille"
 },
 {
  "id": "histamine-poisson-37",
  "section": "5 · Produits particuliers",
  "titre": "Poisson : l'histamine",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "thon, maquereau, sardine, anchois et poissons proches peuvent produire de l'histamine s'ils sont mal conservés au froid. Seuils : 100 mg/kg (m) et 200 mg/kg (M) sur 9 échantillons. La cuisson ne détruit pas l'histamine : seul le froid la prévient."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, lignes 1.26 et 1.27."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "anisakis-29",
  "section": "5 · Produits particuliers",
  "titre": "Poisson : l'anisakis (vers)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ver parasite du poisson de mer. Au-dessus de 55 °C, il meurt en moins d'une minute ; un poisson « rosé à l'arête » ne garantit pas qu'il est mort. Un poisson servi cru ou mariné doit avoir été congelé (24 h à −20 °C ou 15 h à −35 °C), sauf attestation du fournisseur. Le contrôle visuel des parasites est obligatoire."
   },
   {
    "label": "Texte",
    "texte": "guide Restaurateur p. 180 ; vade-mecum « Remise directe » V3, ligne C403L12 (qui renvoie au règlement 853/2004)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lus le 20/10 et le 26/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "dlc-et-ddm-31",
  "section": "6 · Dates, allergènes et information du client",
  "titre": "DLC et DDM : la différence",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "DLC = « À consommer jusqu'au… » : après la date, le produit ne se sert plus (danger). DDM = « À consommer de préférence avant… » : après la date, pas de danger, mais le goût ou la texture peuvent baisser. Servir un produit à DLC dépassée vaut une note D à l'inspection."
   },
   {
    "label": "Texte",
    "texte": "règlement (UE) 1169/2011, article 24 ; information Santé.fr (ministère de l'Agriculture, 2024) ; vade-mecum général V7, items C3 et C401."
   },
   {
    "label": "Lien",
    "texte": "https://www.sante.fr/node/8999023"
   },
   {
    "label": "Certitude",
    "texte": "✔ Santé.fr lu le 31/10/2026 ; article 24 non relu mot à mot."
   }
  ],
  "nature": "norme",
  "motsCles": "hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "14-allergenes-30",
  "section": "6 · Dates, allergènes et information du client",
  "titre": "Les 14 allergènes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "gluten (blé, seigle, orge, avoine…), crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites (plus de 10 mg/kg ou 10 mg/L), lupin, mollusques. Pour les plats non emballés (restaurant), l'information du client est obligatoire, par écrit. Le risque allergène se gère par les bonnes pratiques (nettoyage, séparation), pas par un point critique HACCP."
   },
   {
    "label": "Texte",
    "texte": "règlement (UE) 1169/2011, article 44 et annexe II ; décret n° 2015-447 ; guide p. 177 ; avis CNA n° 66."
   },
   {
    "label": "Certitude",
    "texte": "✔ guide lu le 20/10/2026 ; annexe II du règlement : liste conforme au guide."
   }
  ],
  "nature": "norme",
  "motsCles": "gluten arachide lait œuf soja sulfites 1169 ccp pms 852 principes plan maîtrise sanitaire hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "etude-de-duree-de-conservation-40",
  "section": "6 · Dates, allergènes et information du client",
  "titre": "Étude de durée de conservation",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "quand un produit prêt à manger permet à la Listeria de se développer, l'exploitant peut devoir prouver par des études (acidité, sel, emballage, essais) que le seuil sera respecté jusqu'à la date limite. Pour un restaurant, cela concerne surtout les plats gardés plusieurs jours."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, article 3 §2 et annexe II (annexe non relue en 2026)."
   },
   {
    "label": "Certitude",
    "texte": "◐ article lu le 20/10/2026 ; annexe II à relire."
   }
  ],
  "nature": "norme",
  "motsCles": "listériose femme enceinte charcuterie 2073"
 },
 {
  "id": "don-alimentaire-46",
  "section": "6 · Dates, allergènes et information du client",
  "titre": "Donner des denrées (don alimentaire)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "on peut donner un produit à DLC avant la date, et un produit à DDM même après. Il faut vérifier l'emballage, la température et garder la traçabilité pour les produits d'origine animale."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitre V bis."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "hygiene-du-personnel-41",
  "section": "7 · Hygiène du personnel, locaux et nettoyage",
  "titre": "Hygiène du personnel",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "tenue propre et adaptée, grande propreté personnelle. Une personne malade (diarrhée, maladie transmissible par les aliments) ou avec une plaie infectée ne touche pas les aliments s'il y a un risque, et prévient tout de suite son responsable. Lavabos avec eau chaude et froide et séchage hygiénique ; vestiaires adaptés."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitre VIII ; chapitre I points 4 et 9."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026. Le texte ne donne ni liste de maladies ni délai d'arrêt."
   }
  ],
  "nature": "norme",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "formation-45",
  "section": "7 · Hygiène du personnel, locaux et nettoyage",
  "titre": "Formation à l'hygiène",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "toute personne qui manipule des aliments est encadrée et formée à l'hygiène selon son poste. En restauration commerciale, au moins une personne de l'équipe doit avoir suivi la formation spécifique de 14 heures, et le justificatif doit être sur place. La formation « HACCP » n'est pas la même chose que la formation de 14 heures."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitre XII ; code rural, art. L. 233-4 et arrêté du 5/10/2011 ; instruction DGAL 2026-185 ; vade-mecum « Remise directe » V3, ligne F2L02 (aucune personne formée = note D)."
   },
   {
    "label": "Certitude",
    "texte": "✔ règlement et vade-mecum lus ; arrêté du 5/10/2011 ◐ non relu."
   }
  ],
  "nature": "norme",
  "motsCles": "ccp pms 852 principes plan maîtrise sanitaire hygiène 5 octobre 2011 manipulateur"
 },
 {
  "id": "locaux-et-equipements-47",
  "section": "7 · Hygiène du personnel, locaux et nettoyage",
  "titre": "Locaux et équipements",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "sols, murs, portes et plans de travail lisses, lavables et faciles à désinfecter ; matériel nettoyé et désinfecté assez souvent ; lave-mains avec eau chaude et froide ; l'air ne doit pas aller de la zone sale vers la zone propre."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitres I, II et V."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "contamination-croisee-dechets-eau-nuisibles-42",
  "section": "7 · Hygiène du personnel, locaux et nettoyage",
  "titre": "Contamination croisée, déchets, eau, nuisibles",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "protéger les aliments à chaque étape ; séparer les produits crus et les produits prêts à manger ; jamais de produit de nettoyage là où on manipule les aliments ; déchets évacués vite dans des poubelles fermées ; eau potable ; lutte contre les nuisibles et pas d'animaux en cuisine ; nettoyer le matériel entre deux préparations quand il y a un risque d'allergène."
   },
   {
    "label": "Texte",
    "texte": "règlement 852/2004, annexe II, chapitres I, VI, VII et IX."
   },
   {
    "label": "Certitude",
    "texte": "✔ 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "huiles-usagees-15",
  "section": "7 · Hygiène du personnel, locaux et nettoyage",
  "titre": "Huiles usagées : la collecte",
  "certitude": "a-confirmer",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'huile usagée ne va ni à l'évier, ni dans les égouts, ni dans la poubelle. Elle est reprise par une entreprise de collecte, qui vous remet un bon d'enlèvement à garder. Le seuil de 60 litres par an à partir duquel la collecte séparée devient obligatoire est cité par des sources professionnelles (arrêté du 12/07/2011) : texte non relu."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum « Remise directe » V3, ligne E2L02 (cite le code de la santé publique, art. R.1331-2) ; arrêté du 12/07/2011 (non lu)."
   },
   {
    "label": "Certitude",
    "texte": "◐ règle générale lue dans le vade-mecum le 26/10/2026 ; seuil de 60 L à vérifier."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "tiac-21",
  "section": "8 · Les germes et les intoxications",
  "titre": "TIAC : intoxication alimentaire collective",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "une TIAC (toxi-infection alimentaire collective), c'est au moins 2 personnes malades avec les mêmes symptômes (en général digestifs) après le même repas. C'est une maladie à déclaration obligatoire depuis 1987. Une seule plainte de client n'est pas une TIAC, mais elle doit être notée et traitée."
   },
   {
    "label": "Texte",
    "texte": "Santé publique France, « Toxi-infections alimentaires collectives, la maladie »."
   },
   {
    "label": "Lien",
    "texte": "https://www.santepubliquefrance.fr/toxi-infections-alimentaires-collectives/la-maladie"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026. À qui déclarer : voir la procédure TIAC du logiciel (ARS et DDPP)."
   }
  ],
  "nature": "information",
  "motsCles": "intoxication alimentaire déclaration ars ddpp"
 },
 {
  "id": "effet-indesirable-chez-au-moins-2-clients-collectivites-8",
  "section": "8 · Les germes et les intoxications",
  "titre": "Effet indésirable chez au moins 2 clients (collectivités)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "en restauration collective, si au moins deux clients ont des troubles qui peuvent venir du repas, le responsable les invite à consulter un médecin, prévient sans attendre l'ARS et la DDPP, et garde les menus et les plats témoins. Pour un restaurant, voir la fiche TIAC."
   },
   {
    "label": "Texte",
    "texte": "arrêté du 21/12/2009, annexe IV point 6."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "collectivite",
  "motsCles": "échantillon conservation 5 jours 0 3 intoxication alimentaire déclaration ars ddpp"
 },
 {
  "id": "salmonella-22",
  "section": "8 · Les germes et les intoxications",
  "titre": "Salmonella",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "on la trouve surtout dans les œufs, la volaille et le porc. La fiche de l'ANSES cite les œufs et les produits à base d'œufs crus (mayonnaise, mousse, tiramisu) parmi les premières causes d'intoxication. L'ANSES conseille de cuire à cœur à 70 °C, surtout la volaille et le porc."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche Salmonella spp. (juin 2021) ; guide Restaurateur p. 181 (œufs liquides : 60 °C pendant 5 min)."
   },
   {
    "label": "Lien",
    "texte": "https://www.anses.fr/fr/system/files/BIORISK2016SA0080.pdf?download=1"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": "salmonelle œuf volaille"
 },
 {
  "id": "listeria-monocytogenes-23",
  "section": "8 · Les germes et les intoxications",
  "titre": "Listeria monocytogenes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "elle se multiplie même au froid (de −2 à +45 °C). On la trouve dans la charcuterie cuite, les fromages au lait cru, les plats préparés. Elle est très grave pour la femme enceinte, le nouveau-né et les personnes fragiles. C'est pour elle que la durée de conservation des plats doit être justifiée."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche de danger Listeria monocytogenes (avril 2020)."
   },
   {
    "label": "Lien",
    "texte": "https://www.anses.fr/fr/system/files/BIORISK2016SA0081Fi.pdf?download=1"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": "listériose femme enceinte charcuterie 2073 température conservation frigo congélateur annexe i"
 },
 {
  "id": "campylobacter-24",
  "section": "8 · Les germes et les intoxications",
  "titre": "Campylobacter",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "surtout dans la volaille crue. Une cuisson au-dessus de 60 °C le détruit. Le risque vient surtout des contaminations croisées (planche, couteau, mains)."
   },
   {
    "label": "Texte",
    "texte": "guide Restaurateur 2015, p. 181."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "guide",
  "motsCles": ""
 },
 {
  "id": "e-coli-stec-25",
  "section": "8 · Les germes et les intoxications",
  "titre": "E. coli STEC",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "bactérie liée surtout à la viande hachée de bœuf pas assez cuite et à certains fromages au lait cru. L'ANSES conseille de bien cuire à cœur (70 °C) la viande hachée, en particulier pour les enfants."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche STEC/EHEC (juillet 2024)."
   },
   {
    "label": "Lien",
    "texte": "https://www.anses.fr/sites/default/files/Fiche-EHEC-2024-MPEX-0031.pdf?download=1"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "staphylococcus-aureus-26",
  "section": "8 · Les germes et les intoxications",
  "titre": "Staphylococcus aureus",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "il vient surtout des mains, du nez et des plaies du personnel. Il fabrique des toxines que la cuisson ne détruit pas. Les plats manipulés puis laissés tièdes sont les plus touchés. D'où l'importance du lavage des mains et du froid."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche Staphylococcus aureus (septembre 2011)."
   },
   {
    "label": "Lien",
    "texte": "https://davar.gouv.nc/sites/default/files/atoms/files/anses_-_fiche_sur_staphylococcus_aureus.pdf"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": "température conservation frigo congélateur annexe i"
 },
 {
  "id": "clostridium-perfringens-et-bacillus-cereus-27",
  "section": "8 · Les germes et les intoxications",
  "titre": "Clostridium perfringens et Bacillus cereus",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "deux bactéries des plats cuisinés à l'avance (sauces, viandes en sauce, riz, pâtes). Elles se développent quand le plat reste tiède. Repères du guide : garder au-dessus de 63 °C ou en dessous de 3 °C, réchauffer à 75 °C au moins."
   },
   {
    "label": "Texte",
    "texte": "guide Restaurateur 2015, p. 180 (fiche C. perfringens)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "guide",
  "motsCles": ""
 },
 {
  "id": "clostridium-botulinum-28",
  "section": "8 · Les germes et les intoxications",
  "titre": "Clostridium botulinum (botulisme)",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "bactérie du sol, dangereuse dans les conserves maison, les produits sous vide et les aliments peu acides mal conservés. Sa toxine est détruite par 10 min à 100 °C, mais l'ébullition ne suffit pas à stériliser une conserve."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche Clostridium botulinum (janvier 2011)."
   },
   {
    "label": "Lien",
    "texte": "https://www.anses.fr/fr/system/files/MIC-Fi-Clostridiumbotu.pdf"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": ""
 },
 {
  "id": "spores-20",
  "section": "8 · Les germes et les intoxications",
  "titre": "Les spores",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "certaines bactéries (Bacillus cereus, Clostridium) se protègent sous forme de spores que la cuisson ne tue pas. Si le plat refroidit lentement, elles se réveillent et se multiplient. D'où l'intérêt de refroidir vite."
   },
   {
    "label": "Citation",
    "texte": "« un refroidissement rapide immédiatement consécutif à la cuisson permet d'éviter leur germination »."
   },
   {
    "label": "Texte",
    "texte": "ANSES, fiche « La cuisson basse température »."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 31/10/2026."
   }
  ],
  "nature": "avis",
  "motsCles": "cellule abattage 63 10 deux heures 2h température conservation frigo congélateur annexe i"
 },
 {
  "id": "critere-de-securite-et-critere-d-hygiene-du-procede-34",
  "section": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "titre": "Critère de sécurité et critère d'hygiène",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ce règlement fixe des seuils de microbes pour les analyses de laboratoire. Un « critère de sécurité » concerne le produit vendu : s'il est dépassé, on retire ou on rappelle le produit. Un « critère d'hygiène » concerne la fabrication : s'il est dépassé, on corrige sa façon de travailler. Il ne fixe aucune fréquence d'analyses pour un restaurant : c'est l'établissement qui décide avec son laboratoire."
   },
   {
    "label": "Texte",
    "texte": "règlement (CE) n° 2073/2005, articles 2, 3 et 7."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "listeria-monocytogenes-seuils-35",
  "section": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "titre": "Listeria : les seuils",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "pour un produit prêt à manger, le seuil est de 100 microbes par gramme pendant toute la durée de conservation, à condition de pouvoir le prouver. Sinon, la Listeria ne doit pas être détectée dans 25 g. Depuis le 1er juillet 2026, ce contrôle vaut jusqu'à la date limite. Un produit gardé moins de 5 jours est classé « ne permet pas le développement de Listeria »."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, lignes 1.1 à 1.3, modifié par le règlement (UE) 2024/2895 (applicable au 01/07/2026)."
   },
   {
    "label": "Lien",
    "texte": "https://eur-lex.europa.eu/eli/reg/2005/2073/2026-07-01"
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026 ; date d'application confirmée le 25/11/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "listériose femme enceinte charcuterie 2073"
 },
 {
  "id": "salmonella-absence-dans-25-g-36",
  "section": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "titre": "Salmonella : absence dans 25 g",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "aucune salmonelle ne doit être trouvée dans 25 g pour : la viande hachée à manger crue, la volaille hachée, les ovoproduits, les préparations prêtes à manger avec des œufs crus, les crustacés et coquillages cuits, les fruits et légumes prédécoupés, les jus non pasteurisés. Dans 10 g pour la viande hachée (hors volaille) destinée à être cuite."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, lignes 1.4 à 1.20."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "salmonelle œuf volaille steak haché boeuf 71 steak"
 },
 {
  "id": "viande-hachee-et-preparations-de-viande-criteres-d-hygiene-38",
  "section": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "titre": "Viande hachée et préparations de viande : critères",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "seuils de fabrication pour la viande hachée (E. coli 50 à 500 par gramme) et les préparations de viande (500 à 5 000). Un dépassement oblige à améliorer l'hygiène et le choix des matières premières, sans rappel automatique. Le critère « colonies aérobies » ne s'applique pas à une viande hachée faite sur place et gardée moins de 24 heures."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, lignes 2.1.6 et 2.1.8."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": "steak haché boeuf 71 steak"
 },
 {
  "id": "autres-criteres-d-hygiene-utiles-en-cuisine-39",
  "section": "9 · Analyses de laboratoire (règlement 2073/2005)",
  "titre": "Autres critères d'hygiène utiles en cuisine",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "ovoproduits (entérobactéries 10 à 100 par g), crustacés et coquillages cuits décortiqués (E. coli 1 à 10, staphylocoques 100 à 1 000), fruits et légumes prédécoupés (E. coli 100 à 1 000), fromages au lait cru (staphylocoques 10 000 à 100 000)."
   },
   {
    "label": "Texte",
    "texte": "règlement 2073/2005, annexe I, chapitre 2."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 20/10/2026."
   }
  ],
  "nature": "norme",
  "motsCles": ""
 },
 {
  "id": "comment-se-passe-un-controle-d-hygiene-48",
  "section": "10 · Le contrôle officiel : le déroulement",
  "titre": "Comment se passe un contrôle d'hygiène",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "le contrôle se fait en général sans prévenir. L'inspecteur demande un responsable, rappelle les écarts du dernier contrôle et demande ce qui a été fait depuis. Il demande ce qui a changé (travaux, matériel, plats). Il visite, lit les documents, donne ses constats à l'oral, puis écrit son rapport."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7 (sept. 2026), chapitre II.C."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "ce-que-l-inspecteur-prepare-avant-de-venir-49",
  "section": "10 · Le contrôle officiel : le déroulement",
  "titre": "Ce que l'inspecteur prépare avant de venir",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "il relit votre déclaration d'activité, les rapports précédents, les analyses officielles, l'historique des intoxications et votre PMS. Sur place, il peut suivre un produit au hasard, de la date limite jusqu'au fournisseur."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, chapitres II.C.1 et III."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "le-vade-mecum-et-la-grille-d-inspection-50",
  "section": "10 · Le contrôle officiel : le déroulement",
  "titre": "Le vade-mecum et la grille d'inspection",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "le vade-mecum est le guide public des inspecteurs ; la grille est la liste des points notés. Six chapitres : A identification, B locaux et matériel, C maîtrise de la production, D traçabilité et réactivité, E déchets, F personnel. Pour un restaurant, c'est le vade-mecum « Remise directe ». Tout le monde peut le lire."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7 ; vade-mecum « Remise directe » V3 (https://agriculture.gouv.fr/telecharger/129266)."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "reactivite-ce-que-vous-avez-fait-depuis-la-derniere-visite-51",
  "section": "10 · Le contrôle officiel : le déroulement",
  "titre": "Réactivité : ce que vous avez fait depuis la dernière visite",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "l'inspecteur demande la liste des écarts passés et ce qui a été corrigé. Une trace écrite et datée vaut mieux qu'une explication de mémoire. Ce chapitre juge aussi la gestion des alertes, des rappels, des plaintes de clients et des intoxications."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, item D2."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "action-corrective-et-autocontrole-52",
  "section": "10 · Le contrôle officiel : le déroulement",
  "titre": "Action corrective et autocontrôle",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "action corrective = ce qu'on fait quand quelque chose ne va pas (mettre le produit de côté, décider de son sort, éviter que ça recommence). Autocontrôle = tout ce que vous vérifiez vous-même (températures, nettoyage, réception). Sans trace écrite, l'action n'existe pas pour l'inspecteur."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, définitions."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "les-notes-a-b-c-d-53",
  "section": "11 · Le contrôle officiel : les notes",
  "titre": "Les notes A, B, C, D",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "A = conforme. B = petit écart, sans risque. C = écart moyen, le risque augmente. D = écart grave, risque élevé. Un seul D dans un chapitre suffit pour que tout le chapitre soit noté D."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, chapitre III.D."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "la-note-globale-de-l-etablissement-54",
  "section": "11 · Le contrôle officiel : les notes",
  "titre": "La note globale de l'établissement",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "A satisfaisant, B acceptable, C insuffisant (l'inspecteur n'a plus confiance), D perte de maîtrise (sanctions sans délai). Un seul chapitre D donne un D global."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, chapitre III.D.3."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "notes-d-temperatures-dlc-et-enregistrements-55",
  "section": "12 · Le contrôle officiel : ce qui pèse le plus",
  "titre": "Notes D : températures, DLC et enregistrements",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "produit à DLC dépassée en vente ; températures non surveillées, non notées, ou sans action quand elles sont mauvaises ; produits interdits reçus ; emballages sales ou non alimentaires ; pas d'analyse des dangers ; pas d'eau potable."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, items C1 à C7."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "notes-d-tracabilite-et-alertes-56",
  "section": "12 · Le contrôle officiel : ce qui pèse le plus",
  "titre": "Notes D : traçabilité et alertes",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "impossible de dire d'où vient un produit ou où il est allé ; intoxication non signalée ; alerte non transmise ; produit dangereux ni retiré ni rappelé. Note C : alerte signalée trop tard, plainte de client non traitée."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, items D1 et D2."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "notes-d-locaux-nuisibles-dechets-57",
  "section": "12 · Le contrôle officiel : ce qui pèse le plus",
  "titre": "Notes D : locaux, nuisibles, déchets",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "locaux inadaptés ; toilettes qui ouvrent directement sur la cuisine ; aliments non protégés dehors ; condensation qui goutte sur des aliments ; fenêtres sans protection ouvertes pendant le travail ; poubelles en zone de préparation avec risque de contamination."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, items B1, B2, B3 et E1."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "notes-d-personnel-et-hygiene-58",
  "section": "12 · Le contrôle officiel : ce qui pèse le plus",
  "titre": "Notes D : personnel et hygiène",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "lave-mains absent ou incomplet (pas de savon, d'eau tiède ou d'essuie-mains) ; lave-mains inaccessible ; tenues propres et sales mélangées au vestiaire ; personne malade ou blessée non protégée ; aucune consigne écrite à un poste qui gère un point critique."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, items F1 et F2."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "notes-c-les-ecarts-les-plus-courants-59",
  "section": "12 · Le contrôle officiel : ce qui pèse le plus",
  "titre": "Notes C : les écarts les plus courants",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "procédures manquantes pour les points critiques (elles doivent être écrites) ; mauvais résultat de contrôle sans action ; sondes et thermomètres jamais vérifiés ; nettoyage qui ne suit pas la procédure (produit, dose, temps, rinçage) ; durée de vie des plats non justifiée ; écart de température de +2 à +3 °C (au-delà de +3 °C : D)."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, items B2, B5, C1 à C6 ; vade-mecum « Remise directe » V3, item C401."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "retrait-et-rappel-la-difference-60",
  "section": "13 · Le contrôle officiel : retraits et rappels",
  "titre": "Retrait et rappel : la différence",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "retrait = on arrête de vendre le produit (il sort de la carte). Rappel = on prévient les clients qui l'ont déjà et on leur dit quoi faire. Un restaurant fait surtout des retraits."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum retraits/rappels V2, définitions."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "retirer-un-produit-rappele-la-demi-journee-61",
  "section": "13 · Le contrôle officiel : retraits et rappels",
  "titre": "Retirer un produit rappelé : la demi-journée",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "dès que l'alerte arrive (fournisseur ou communiqué), le produit est retiré, au plus tard dans la demi-journée ouvrée (ou plus vite si votre PMS le prévoit). Produit encore là après ce délai : D. Retrait fait et noté : A ; fait mais pas noté : B."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum retraits/rappels V2, ligne D201."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "informer-les-clients-d-un-rappel-62",
  "section": "13 · Le contrôle officiel : retraits et rappels",
  "titre": "Informer les clients d'un rappel",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "afficher un message lisible près de la carte ou de la caisse : produit, lot, date, danger, quoi faire. Au moins 15 jours d'ouverture pour un produit frais, 2 mois pour un surgelé, une conserve ou un produit sec. Pas d'affichage alors que le produit a été vendu : D."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum retraits/rappels V2, ligne D202."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "que-faire-d-un-produit-retire-63",
  "section": "13 · Le contrôle officiel : retraits et rappels",
  "titre": "Que faire d'un produit retiré",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "le mettre à part avec une étiquette claire : « non conforme, non destiné à la consommation humaine » ou « exclusivement pour élimination ». « Ne pas toucher » ou « retour fournisseur » ne suffisent pas. Interdit de le donner, le vendre, le cuisiner ou le donner aux animaux."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum retraits/rappels V2, ligne D203."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "prevenir-ceux-a-qui-vous-avez-cede-le-produit-64",
  "section": "13 · Le contrôle officiel : retraits et rappels",
  "titre": "Prévenir ceux à qui vous avez cédé le produit",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "si vous avez donné ou revendu le produit (association, autre point de vente), transmettez-leur l'alerte avec un message clair. Pas transmis : D. Si vous ne cédez jamais de produits : sans objet."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum retraits/rappels V2, ligne D204."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 },
 {
  "id": "petits-restaurants-la-flexibilite-65",
  "section": "14 · Le contrôle officiel : petits restaurants et produits d'entretien",
  "titre": "Petits restaurants : la « flexibilité »",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "avec 5 personnes ou moins au contact des aliments, on peut noter seulement les écarts et leurs corrections pour les bonnes pratiques d'hygiène, et les procédures peuvent être orales. Mais cuissons, refroidissements, maintien au chaud et préparations à risque restent à documenter, sauf si vous suivez un guide de bonnes pratiques validé. En cas de manquements, cette souplesse peut être retirée."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, chapitre II.B.3 (cite l'instruction DGAL/SDSSA/2018-924)."
   },
   {
    "label": "Certitude",
    "texte": "✔ vade-mecum lu ; ◐ instruction elle-même non lue."
   }
  ],
  "nature": "inspection",
  "motsCles": "cellule abattage 63 10 deux heures 2h bain-marie 63 liaison chaude température conservation frigo congélateur annexe i"
 },
 {
  "id": "produits-d-entretien-et-contre-les-nuisibles-66",
  "section": "14 · Le contrôle officiel : petits restaurants et produits d'entretien",
  "titre": "Produits d'entretien et contre les nuisibles",
  "certitude": "verifie",
  "champs": [
   {
    "label": "En bref",
    "texte": "dans leur emballage d'origine ou un récipient fermé et étiqueté ; rangés à part, loin des aliments ; fiche technique gardée ; utilisés selon le mode d'emploi (dose, temps, rinçage). Produits contre les nuisibles : autorisés, avec leur numéro d'autorisation."
   },
   {
    "label": "Texte",
    "texte": "vade-mecum général V7, lignes B3L02, B4L02, B5L02."
   },
   {
    "label": "Certitude",
    "texte": "✔ lu le 26/10/2026."
   }
  ],
  "nature": "inspection",
  "motsCles": ""
 }
];
