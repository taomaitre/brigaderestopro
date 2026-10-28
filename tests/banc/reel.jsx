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
if (q.get('pms') === '1') identite.reglagesEtablissement = { nom: 'Banc', fiche: {}, pms: { prestataires: [], formations: [], documents: [], points: [], demarrageTermine: true, enregistrerPrestataire: async () => true, enregistrerFormation: async () => true, ajouterDocument: async () => ({ ok: true }) } };
// ?rec=1 : parcours de réception « nouvelle base » (ReceptionSimple) avec un faux enregistrement (rien n'est écrit).
if (q.get('rec') === '1') identite.gestionReceptions = { enregistrer: async () => {} };
ReactDOM.createRoot(document.getElementById('root')).render(<App identiteExterne={identite} />);
