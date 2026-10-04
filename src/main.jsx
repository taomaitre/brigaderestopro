import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import EspaceTestMultiEtablissement from './EspaceTestMultiEtablissement.jsx';
import ConnexionReelle from './ConnexionReelle.jsx';
import './index.css';

const h = React.createElement;

// Page technique temporaire pour tester la nouvelle base multi-établissement, strictement
// séparée de l'application normale : elle ne s'affiche QUE si l'adresse contient
// "?test-multi=1" à la fin — jamais autrement. Rien ne change pour l'usage quotidien habituel.
const AFFICHER_TEST_MULTI = (() => {
  try { return new URLSearchParams(window.location.search).get("test-multi") === "1"; }
  catch (e) { return false; }
})();

// Prévisualisation de l'écran de connexion réel (établissement + code employé), même principe
// d'isolation stricte : visible UNIQUEMENT avec "?nouveau-login=1" à la fin de l'adresse.
const AFFICHER_NOUVEAU_LOGIN = (() => {
  try { return new URLSearchParams(window.location.search).get("nouveau-login") === "1"; }
  catch (e) { return false; }
})();

try {
  window.MC_CONSENTEMENT = localStorage.getItem("mc_consentement") || null;
} catch (e) { window.MC_CONSENTEMENT = null; }

function afficherErreurFatale(e) {
  try {
    const container = document.getElementById("root");
    if (container) container.innerHTML = "";
    let box = document.getElementById("root-error");
    if (!box) {
      box = document.createElement("pre");
      box.id = "root-error";
      document.body.appendChild(box);
    }
    box.style.cssText = "padding:20px;font-family:monospace;white-space:pre-wrap;color:#b91c1c;background:#fef2f2;margin:0;";
    box.textContent = "Erreur au chargement de l'application :\n" + String((e && (e.stack || e.message)) || e);
  } catch (e2) { /* dernier recours : on ne peut rien afficher de plus */ }
}

class ErrorBoundaryApp extends React.Component {
  constructor(props) { super(props); this.state = { erreur: null }; }
  static getDerivedStateFromError(erreur) { return { erreur }; }
  componentDidCatch(erreur, info) { console.error("Erreur applicative :", erreur, info); }
  render() {
    if (this.state.erreur) {
      return h("pre", {
        style: { padding: 20, fontFamily: "monospace", whiteSpace: "pre-wrap", color: "#b91c1c", background: "#fef2f2", margin: 0, minHeight: "100vh" },
      }, "Erreur au rendu :\n" + String((this.state.erreur && (this.state.erreur.stack || this.state.erreur.message)) || this.state.erreur));
    }
    return this.props.children;
  }
}

window.addEventListener("error", (ev) => { if (!document.getElementById("root") || !document.getElementById("root").hasChildNodes()) afficherErreurFatale(ev.error || ev.message); });
window.addEventListener("unhandledrejection", (ev) => { if (!document.getElementById("root") || !document.getElementById("root").hasChildNodes()) afficherErreurFatale(ev.reason); });

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
try {
  const ComposantAAfficher = AFFICHER_TEST_MULTI
    ? EspaceTestMultiEtablissement
    : AFFICHER_NOUVEAU_LOGIN
      ? ConnexionReelle
      : App;
  root.render(h(ErrorBoundaryApp, null, h(ComposantAAfficher, null)));
} catch (e) {
  afficherErreurFatale(e);
}
