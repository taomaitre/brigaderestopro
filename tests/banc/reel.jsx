// Banc : lance l'appli en « vrai mode » (connexion réelle) avec une identité fabriquée, sans aucun accès à Supabase.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../src/App.jsx';
import '../../src/index.css';
const q = new URLSearchParams(window.location.search);
const role = q.get('role') || 'directeur';
const equipe = [
  { id: 'e-chef', nom: 'Loïc', prenom: 'Loïc', nomFamille: '', poste: '', role: 'chef', email: '', services: [], codeDefini: true, estChef: true, estDirection: false, estSecond: false },
  { id: 'e-dir', nom: 'Directeur', prenom: 'Directeur', nomFamille: '', poste: '', role: 'directeur', email: '', services: [], codeDefini: true, estChef: true, estDirection: true, estSecond: false },
  { id: 'e-sam', nom: 'Sam', prenom: 'Sam', nomFamille: '', poste: 'Poste Froid', role: 'employe', email: '', services: [], codeDefini: true, estChef: false, estDirection: false, estSecond: false },
];
const moi = equipe.find((e) => e.role === role) || equipe[1];
const estChef = moi.estChef;
const identite = {
  employeId: moi.id, employeNom: moi.nom, employePoste: moi.poste, employeRole: moi.role, estChef, estSecond: false,
  equipe, debloqueParConnexion: estChef,
  verifierCodeChef: estChef ? async () => ({ ok: true }) : undefined,
  changerDeCompte: () => {},
};
// ?pms=1 : abonnement Complet fictif (dossier PMS avec ses points), sans aucune base.
if (q.get('pms') === '1') identite.reglagesEtablissement = { nom: 'Banc', fiche: {}, pms: { prestataires: [{ id: 'p1', type: 'antinuisibles', libelle: 'Lutte antinuisibles', nom: 'Dératisation Martin', date_dernier_passage: '2026-10-20', frequence_rappel: 'trimestrielle', notes: '' }], formations: [], documents: [{ id: 'd1', categorie: 'rapport_controle_officiel', titre: 'Contrôle DDPP 12/10', nom_fichier: 'ddpp.pdf' }], passages: [{ id: 'x1', prestataire_id: 'p1', type: 'antinuisibles', societe: 'Dératisation Martin', date_passage: '2026-10-20', note: 'Aucune activité constatée, appâts remplacés', document_id: 'd1' }, { id: 'x2', prestataire_id: null, type: 'laboratoire', societe: 'Ancien labo', date_passage: '2026-03-02', note: '', document_id: null }], points: [], demarrageTermine: true, enregistrerPrestataire: async () => true, enregistrerFormation: async () => true, ajouterDocument: async () => ({ ok: true }), ajouterPassage: async () => ({ ok: true }), supprimerPassage: async () => true, urlDocument: async () => null, chargerJournal: async () => ({ erreur: '', tardifs: [{ id: 't1', libelle: 'Relevé de température', evenement: '2026-10-29T10:00:00Z', saisi_le: '2026-10-31T08:15:00Z', nom: 'Frigo 1' }], corrections: [{ id: 'j1', date_heure: '2026-10-31T09:00:00Z', action: 'modification', table_concernee: 'releves_temperature', ancienne_valeur: { id: 'a', appareil: 'Frigo 1', temperature: 9 }, nouvelle_valeur: { id: 'a', appareil: 'Frigo 1', temperature: 3 } }, { id: 'j2', date_heure: '2026-10-31T09:05:00Z', action: 'suppression', table_concernee: 'cuissons', ancienne_valeur: { id: 'b', produit_nom: 'Poulet', heure_depart: '12:00' }, nouvelle_valeur: null }] }) } };
// ?rec=1 : parcours de réception « nouvelle base » (ReceptionSimple) avec un faux enregistrement (rien n'est écrit).
if (q.get('rec') === '1') identite.gestionReceptions = { enregistrer: async () => {} };
// ?cat=1 : petit catalogue FICTIF (produits inventés) pour tester la fiche produit et le stock, sans aucune base.
if (q.get('cat') === '1') {
  const bruts = [
    { id: 'p1', nom: 'Flan test', reference: 'T1', categorie: 'Surgelés', conservation: 'surgele', fournisseur_id: 'f1', unite: 'pièce', quantite_stock: 3, quantite_cible: 8, prix_achat: 8.03, prix_unite: '€/pièce', conditionnement: 'Colis de 8 pièces de 1,12 kg (8,96 kg)', note: 'Remarque test', detail_achat: { vente: 'colis', emb: 'colis', nomColis: 'colis', nbSous: '1', nbPieces: '8', nomPiece: '', contenu: '1120', contenuUnite: 'g', contenuVal: '1,12', contenuU: 'kg', prix: '64,24', prixPour: 'colis', comptage: 'piece' } },
    { id: 'p2', nom: 'Glace test', reference: 'T2', categorie: 'Surgelés', conservation: 'surgele', fournisseur_id: 'f1', unite: 'pièce', quantite_stock: 2, quantite_cible: 3, prix_achat: 14.81, prix_unite: '€/pièce', conditionnement: 'Bac de 1,423 kg — bac de 2,4 L, environ 24 portions', note: '', detail_achat: { vente: 'piece', emb: 'bac', nomColis: 'bac', poidsColis: '1423', poidsColisUnite: 'g', equivVal: '2,4', equivUnite: 'l', prix: '14,81', prixPour: 'colis', comptage: 'piece', precision: 'bac de 2,4 L, environ 24 portions' } },
    { id: 'p3', nom: 'Cornichons test', reference: 'T3', categorie: 'Épicerie', conservation: 'sec', fournisseur_id: 'f1', unite: 'kg', quantite_stock: 6, quantite_cible: 4, prix_achat: 7.33, prix_unite: '€/kg', conditionnement: 'Boîte de 4,2 kg', note: '', detail_achat: { vente: 'piece', emb: 'boîte', nomColis: 'boîte', poidsColis: '4,2', poidsColisUnite: 'kg', netVal: '2,12', netUnite: 'kg', prix: '30,8', prixPour: 'colis', comptage: 'kg' } },
    { id: 'p4', nom: 'Fromage test au kilo', reference: 'T4', categorie: 'Crèmerie & fromages', conservation: 'frais', fournisseur_id: 'f1', unite: 'kg', quantite_stock: 2.87, quantite_cible: 3, prix_achat: 19.21, prix_unite: '€/kg', conditionnement: 'Vendu au poids', note: '', detail_achat: null },
    { id: 'p5', nom: 'Pains test', reference: 'T5', categorie: 'Surgelés', conservation: 'surgele', fournisseur_id: 'f1', unite: 'pièce', quantite_stock: 40, quantite_cible: 45, prix_achat: 0.35, prix_unite: '€/pièce', conditionnement: 'Carton de 3 sachets de 15 pains', note: '', detail_achat: { vente: 'colis', emb: 'carton', nomColis: 'carton', nbSous: '3', nomSous: 'sachet', nbPieces: '15', nomPiece: 'pain', prix: '15,75', prixPour: 'colis', comptage: 'piece' } },
  ];
  identite.fournisseurs = [{ id: 'f1', nom: 'Fournisseur 1' }];
  identite.catalogue = bruts.map((p) => ({ id: p.id, nom: p.nom, categorie: p.conservation === 'surgele' ? 'Surgelés' : p.categorie, conservation: p.conservation, groupeStock: '', ordreStock: null, detailAchat: p.detail_achat, fournisseur: 'Fournisseur 1', reference: p.reference, conditionnement: p.conditionnement, prixUnitaire: `${String(p.prix_achat).replace('.', ',')} ${p.prix_unite}`, poidsParPiece: '', referenceVerifiee: true, note: p.note, allergenesNorme: '', origineNorme: '', quantite: p.quantite_stock, cible: p.quantite_cible, unite: p.unite, lot: '', dlc: '', typeDate: '', dlcJours: null, delaiOuverture: null, decongelMethode: '', decongelJours: null, decongelSource: '', brut: p }));
  identite.gestionCatalogue = { enregistrer: async () => {} };
}
// ?plein=1 : listes FICTIVES remplies (relevés, cuissons, refroidissements, huiles, traçabilité, réceptions) pour vérifier les écrans pleins.
if (q.get('plein') === '1') {
  const j = new Date(); const auj = `${j.getFullYear()}-${String(j.getMonth() + 1).padStart(2, '0')}-${String(j.getDate()).padStart(2, '0')}`;
  const t = Date.now();
  identite.listes = {
    equipements: [
      { id: 'f1', nom: 'Frigo test 1', type: 'frigo', min: 0, max: 4, sonde: null, sondeConnectee: false },
      { id: 'f2', nom: 'Congélateur test', type: 'congelateur', min: null, max: -18, sonde: null, sondeConnectee: false },
    ],
    releves: [
      { id: 'r1', equipementId: 'f1', valeur: 3, date: auj, heure: '08:05', employeeId: 'e-chef', conforme: true, manuel: true, note: '' },
      { id: 'r2', equipementId: 'f2', valeur: -15, date: auj, heure: '08:06', employeeId: 'e-chef', conforme: false, manuel: true, note: 'porte mal fermée' },
    ],
    cuissons: [
      { id: 'c1', produit: 'Poulet test', famille: 'volaille', date: auj, employeeId: 'e-chef', statut: 'termine', heureDebut: '10:00', heureFin: '10:40', debutTs: t - 7200000, dureeAttendueMin: 40, temperature: 82, conforme: true },
      { id: 'c2', produit: 'Sauce test', famille: 'general', date: auj, employeeId: 'e-chef', statut: 'en-cours', heureDebut: '11:30', debutTs: t - 600000, dureeAttendueMin: 30, heureFin: null, temperature: null, conforme: null },
    ],
    refroidissements: [
      { id: 'rf1', date: auj, employeeId: 'e-chef', produit: 'Bolognaise test', type: 'positif', statut: 'termine', heureDebut: '09:00', heureFin: '10:30', debutTs: t - 9000000, tempDebut: 70, tempFin: 8, conforme: true },
    ],
    huileTests: [
      { id: 'h1', employeeId: 'e-chef', date: auj, heure: '09:10', valeur: 'Test bandelette', resultat: 'conforme', photo: null, bain: 'Friteuse 1' },
    ],
    preparations: [
      { id: 'pr1', produitId: null, nomLibre: 'Pâte à pizza test', employeeId: 'e-chef', date: auj, heure: '09:30', quantite: 2, dlcDate: auj, jete: false, jeteDate: null, photo: null, lot: 'L-TEST-1' },
    ],
    receptions: [
      { id: 'rc1', receptionId: 'R1', date: auj, heure: '07:45', employeeId: 'e-chef', fournisseur: 'Fournisseur 1', produit: 'Flan test', quantite: 8, lot: 'LOT1', dlc: auj, conforme: true, temperature: -19, valideChef: false },
      { id: 'rc2', receptionId: 'R1', date: auj, heure: '07:45', employeeId: 'e-chef', fournisseur: 'Fournisseur 1', produit: 'Crème test', quantite: 2, lot: 'LOT2', dlc: auj, conforme: false, raison: 'Température trop haute', quantiteNC: 2, temperature: 9, valideChef: false },
    ],
  };
}
ReactDOM.createRoot(document.getElementById('root')).render(<App identiteExterne={identite} />);
