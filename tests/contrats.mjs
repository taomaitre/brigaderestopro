// Contrôles de contenu : chaque décision validée avec Loïc doit rester présente (ou absente) dans le code.
// Rapide (quelques secondes), sans navigateur. Lancé par tests/run.sh avant les parcours.
// Quand une décision change : modifier la ligne ici ET la fiche « comportements-valides » du projet (jamais l'une sans l'autre).
import fs from 'fs';
const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const reel = fs.readFileSync(new URL('../src/ConnexionReelle.jsx', import.meta.url), 'utf8');
const service = fs.readFileSync(new URL('../src/nettoyageFinService.js', import.meta.url), 'utf8');
const tout = app + '\n' + reel + '\n' + service;
// [libellé, motif, doit exister (true) ou être absent (false), fichier(s) : 'app' | 'reel' | 'tout']
const R = [
  // Accueil, navigation, libellés (decision-accueil-12-tuiles-24-10, liste-modifications-a-faire-24-10)
  ["Accueil : « Suivi d'huile de friture »", /Suivi d'huile de friture/, true],
  ["Accueil : « Refroidissement rapide et congélation »", /Refroidissement rapide et congélation/, true],
  ["Plus de tuile « Contrôles en cuisine » dans l'accueil", /ACCUEIL_TUILES[^;]{0,3000}Contrôles en cuisine/, false],
  ["Suivi et contrôle : « Alertes, éléments à vérifier et à contrôler »", /Alertes, éléments à vérifier et à contrôler/, true],
  ["Suivi et contrôle : plus de « À traiter — par ordre de priorité »", /À traiter — par ordre de priorité/, false],
  ["Plus d'étiquette « Réservé au chef »", />\s*Réservé au chef\s*</, false],
  ["Traçabilité : question « Faire une étiquette DLC pour ce produit ? »", /Faire une étiquette DLC pour ce produit/, true],
  ["Paramétrage : engrenage", /aria-label="Paramétrage"/, true],
  ["Paramétrage : « Contrôle de la journée » (ex Nettoyages à valider)", /Contrôle de la journée/, true],
  ["Lexique et réglementation visible", /Lexique et réglementation/, true],
  ["Procédure de TIAC", /Procédure de TIAC/, true],
  ["Réception : Livraisons reçues et Notifications fournisseur", /Livraisons reçues[\s\S]*Notifications fournisseur|Notifications fournisseur[\s\S]*Livraisons reçues/, true],
  ["Fiches techniques : Carte du jour et Carte fixe", /Carte du jour[\s\S]*Carte fixe|Carte fixe[\s\S]*Carte du jour/, true],
  ["Code du chef demandé pour les onglets du chef", /verifierCodeChef/, true],
  ["Remplaçant du chef", /Remplaçant du chef/, true],
  // Étiquettes DLC
  ["Étiquettes : « Réimprimer la dernière étiquette faite »", /Réimprimer la dernière étiquette faite/, true],
  ["Étiquettes : « Quantité utilisée »", /Quantité utilisée/, true],
  ["Étiquettes : plus de note « Aperçu des étiquettes qui seront imprimées »", /Aperçu des étiquettes qui seront imprimées/, false],
  ["Étiquettes : DLC après décongélation = jour de sortie inclus (3 jours par défaut)", /decongelJours \|\| 3\) - 1/, true],
  ["Étiquettes : mêmes groupes que le Stock (groupeDuProduit)", /const catDe = \(p\) => \{[\s\S]{0,200}groupeDuProduit\(p, groupesBase\)/, true],
  ["Étiquettes : même ordre que le Stock (ordreStockCmp)", /rangCat\(a\) - rangCat\(b\)\) \|\| ordreStockCmp\(a, b\)/, true],
  ["Étiquettes : le catalogue transmet groupeStock et ordreStock", /groupeStock: c\.groupeStock \|\| "", ordreStock:/, true],
  // Stock
  ["Stock : « Modifier le stock cible »", /Modifier le stock cible/, true],
  ["Stock : plus de petit bouton « Passer ma commande »", /Passer ma commande/, false],
  ["Stock : « Gérer mes groupes »", /Gérer mes groupes/, true],
  ["Stock : glisser-déposer des produits et des groupes", /deposerProduit/, true],
  ["Stock : liste « Tous les produits » dans l'ordre des groupes puis ordre choisi", /rangGroupe\(a\.cat\) - rangGroupe\(b\.cat\) : 0\) \|\| ordreStockCmp/, true],
  ["Fiche produit : cadre « DLC après ouverture » (delai_apres_ouverture_jours)", /delai_apres_ouverture_jours/, true],
  ["Fiche produit : cadre « 4 / À l'inventaire, je le compte »", /4 \/ À l'inventaire, je le compte/, true],
  ["Inventaire : historique des inventaires", /Historique des inventaires/, true],
  // Nettoyage / PMS
  ["Nettoyage : enregistrements en file (les tâches validées ne reviennent pas)", /file\.current = file\.current/, true],
  ["Nettoyage : une seule exécution par tâche/jour/moment", /pms_tache_id,date,moment/, true],
  ["Nettoyage : produits Keystone recommandés", /produits Keystone recommandés/, true],
  ["PMS : historique des passages des prestataires", /Historique des passages/, true],
  ["PMS : historique des modifications", /Historique des modifications/, true],
  // Nettoyage : trois lignes seulement (décision du 10/11)
  ["Nettoyage : ligne « Tâches journalières »", /Tâches journalières/, true],
  ["Nettoyage : ligne « Tâches hebdomadaires et mensuelles »", /Tâches hebdomadaires et mensuelles/, true],
  ["Nettoyage : ligne « Tâches en retard »", /Tâches en retard/, true],
  ["Nettoyage : retard limité à 7 jours", /FENETRE_RETARD_JOURS = 7;/, true, 'service'],
  ["Nettoyage : le fait est barré", /fait \? "text-\[var\(--steel\)\] line-through"/, true],
  // Fiches techniques
  ["Fiches techniques : bouton « Compléter mes fiches »", /Compléter mes fiches/, true],
  // Couleurs : table unique, aucune couleur « à la main » pour les fonctions (valeurs de départ validées le 25/10)
  ["Couleurs : table unique COULEURS_FONCTION", /const COULEURS_FONCTION/, true],
  ["Couleur Tâches du jour #1F8F5F", /#1F8F5F/, true],
  ["Couleur Étiquettes #7C3AED", /#7C3AED/, true],
  ["Couleur Stock #FB923C", /#FB923C/, true],
  ["Couleur Températures #2563EB", /#2563EB/, true],
  ["Couleur Historique #0F766E", /#0F766E/, true],
  ["Couleur Contrôle (ambre) #F59E0B", /#F59E0B/, true],
];
let ko = 0;
for (const [lib, re, doit] of R) {
  const present = re.test(tout);
  const ok = present === doit;
  if (!ok) ko++;
  console.log(`${ok ? '✓' : '✗'} ${lib}${ok ? '' : doit ? ' — ABSENT du code' : ' — PRÉSENT alors qu’il doit avoir disparu'}`);
}
console.log(`\n${R.length - ko}/${R.length} contrôles de contenu réussis`);
process.exit(ko ? 1 : 0);
