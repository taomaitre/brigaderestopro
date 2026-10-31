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
if (q.get('pms') === '1') identite.reglagesEtablissement = { nom: 'Banc', fiche: {}, pms: { prestataires: [{ id: 'p1', type: 'antinuisibles', libelle: 'Lutte antinuisibles', nom: 'Dératisation Martin', date_dernier_passage: '2026-10-20', frequence_rappel: 'trimestrielle', notes: '' }], formations: [], documents: [{ id: 'd1', categorie: 'rapport_controle_officiel', titre: 'Contrôle DDPP 12/10', nom_fichier: 'ddpp.pdf' }], passages: [{ id: 'x1', prestataire_id: 'p1', type: 'antinuisibles', societe: 'Dératisation Martin', date_passage: '2026-10-20', note: 'Aucune activité constatée, appâts remplacés', document_id: 'd1' }, { id: 'x2', prestataire_id: null, type: 'laboratoire', societe: 'Ancien labo', date_passage: '2026-03-02', note: '', document_id: null }], points: [], demarrageTermine: true, enregistrerPrestataire: async () => true, enregistrerFormation: async () => true, ajouterDocument: async () => ({ ok: true }), ajouterPassage: async () => ({ ok: true }), supprimerPassage: async () => true, urlDocument: async () => null, chargerJournal: async () => ({ erreur: '', tardifs: [{ id: 't1', libelle: 'Relevé de température', evenement: '2026-10-29T10:00:00Z', saisi_le: '2026-10-31T08:15:00Z', nom: 'Frigo 1' }], corrections: [{ id: 'j1', date_heure: '2026-10-31T09:00:00Z', action: 'modification', table_concernee: 'releves_temperature', ancienne_valeur: { id: 'a', appareil: 'Frigo 1', temperature: 9 }, nouvelle_valeur: { id: 'a', appareil: 'Frigo 1', temperature: 3 } }, { id: 'j2', date_heure: '2026-10-31T09:05:00Z', action: 'suppression', table_concernee: 'cuissons', ancienne_valeur: { id: 'b', produit_nom: 'Poulet', heure_depart: '12:00' }, nouvelle_valeur: null }] } } };
// ?rec=1 : parcours de réception « nouvelle base » (ReceptionSimple) avec un faux enregistrement (rien n'est écrit).
if (q.get('rec') === '1') identite.gestionReceptions = { enregistrer: async () => {} };
ReactDOM.createRoot(document.getElementById('root')).render(<App identiteExterne={identite} />);
