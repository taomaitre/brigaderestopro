import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { POSTES, STATUTS_EQUIPE } from './listesEquipe.js';

/* =========================================================================================
   ESPACE DE TEST — Connexion multi-établissement (nouvelle base Supabase, 38 tables, RLS)
   =========================================================================================
   Ce fichier est volontairement SÉPARÉ de App.jsx : il ne remplace rien de l'application
   que tu utilises tous les jours, il ne touche à aucune de ses données, et il n'apparaît
   JAMAIS sauf si on ouvre l'adresse avec "?test-multi=1" à la fin (voir main.jsx).

   But : vérifier, dans le vrai navigateur (pas seulement en ligne de commande), que :
   1) on peut créer un compte "établissement" (nom + email + mot de passe),
   2) on peut se reconnecter avec ce compte,
   3) une fois connecté, on ne voit QUE les données de CET établissement (jamais celles
      d'un autre) — la vraie isolation de sécurité (RLS) de la nouvelle base.

   Une fois ce test validé avec un établissement fictif (jamais Games Factory), ce mécanisme
   sera repris pour construire le vrai écran de connexion de l'application définitive.
   ========================================================================================= */

// Projet Supabase multi-établissement (le nouveau, 38 tables) — URL et clé publique
// uniquement (jamais une clé secrète), copiées depuis le tableau de bord Supabase.
const URL_PROJET = "https://uikxpjnovzxcglygueif.supabase.co";
const CLE_PUBLIQUE = "sb_publishable_xM0AsmcBnd4fmat3rUJkYw_w45Jivl9";
const URL_FONCTION_AUTH = `${URL_PROJET}/functions/v1/auth-etablissement`;
const URL_FONCTION_EMPLOYES = `${URL_PROJET}/functions/v1/code-employe`;

// Client Supabase "normal" (anonyme), utilisé pour la création de compte (via la fonction
// serveur) ET pour la connexion elle-même — depuis le correctif du 04/10, la connexion
// utilise directement le vrai système d'authentification Supabase (supabase.auth), qui gère
// lui-même la signature du jeton. On n'a plus besoin de fonction serveur pour se connecter.
const supabasePublic = createClient(URL_PROJET, CLE_PUBLIQUE);

async function appelerAuth(action, payload) {
  const reponse = await fetch(URL_FONCTION_AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: CLE_PUBLIQUE },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await reponse.json().catch(() => null);
  if (!reponse.ok || !data || data.ok !== true) {
    throw new Error(((data && data.erreur) || `Erreur serveur (${reponse.status})`) + (data && data.detail ? ` — ${data.detail}` : ""));
  }
  return data;
}

// Même principe que appelerAuth, mais avec le jeton établissement en plus (requis par la
// fonction code-employe pour savoir de quel établissement il s'agit).
async function appelerEmployes(jeton, action, payload) {
  const reponse = await fetch(URL_FONCTION_EMPLOYES, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: CLE_PUBLIQUE, Authorization: `Bearer ${jeton}` },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await reponse.json().catch(() => null);
  if (!reponse.ok || !data || data.ok !== true) {
    throw new Error(((data && data.erreur) || `Erreur serveur (${reponse.status})`) + (data && data.detail ? ` — ${data.detail}` : ""));
  }
  return data;
}

function Champ({ label, ...props }) {
  return (
    <label style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
      <span style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</span>
      <input
        {...props}
        style={{
          width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1",
          borderRadius: 6, fontSize: 14, boxSizing: "border-box",
        }}
      />
    </label>
  );
}

function Bouton({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "8px 16px", borderRadius: 6, border: "none",
        background: props.disabled ? "#94a3b8" : "#334155", color: "white",
        fontSize: 14, fontWeight: 600, cursor: props.disabled ? "not-allowed" : "pointer",
        marginRight: 8,
      }}
    >
      {children}
    </button>
  );
}

export default function EspaceTestMultiEtablissement() {
  const [nom, setNom] = useState("Établissement Démo");
  const [email, setEmail] = useState("demo@brigaderestopro.fr");
  const [motDePasse, setMotDePasse] = useState("DemoTest1234");
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState(null); // { type: "ok"|"erreur", texte }
  const [session, setSession] = useState(null); // { token, etablissement }
  const [fournisseurs, setFournisseurs] = useState(null);
  const [nouveauFournisseur, setNouveauFournisseur] = useState("");

  const [nomEmploye, setNomEmploye] = useState("Julie Martin");
  const [posteEmploye, setPosteEmploye] = useState("");
  const [roleEmploye, setRoleEmploye] = useState("cuisinier");
  const [codeEmploye, setCodeEmploye] = useState("1234");
  const [employes, setEmployes] = useState(null);
  const [codeSaisi, setCodeSaisi] = useState("");
  const [employeIdentifie, setEmployeIdentifie] = useState(null);

  const sbAvecJeton = (jeton) =>
    createClient(URL_PROJET, CLE_PUBLIQUE, {
      global: { headers: { Authorization: `Bearer ${jeton}` } },
    });

  async function creerCompte() {
    setEnCours(true); setMessage(null);
    try {
      await appelerAuth("signup", { nom, email, password: motDePasse });
      setMessage({ type: "ok", texte: "Compte créé. Tu peux maintenant te connecter ci-dessous." });
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function seConnecter() {
    setEnCours(true); setMessage(null);
    try {
      const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password: motDePasse });
      if (error) throw error;
      const meta = data.user.user_metadata || {};
      const infosSession = {
        token: data.session.access_token,
        etablissement: { id: meta.etablissement_id, nom: meta.nom_etablissement || "(nom inconnu)" },
      };
      setSession(infosSession);
      setMessage({ type: "ok", texte: `Connecté en tant que « ${infosSession.etablissement.nom} ».` });
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function chargerFournisseurs() {
    if (!session) return;
    setEnCours(true); setMessage(null);
    try {
      const sb = sbAvecJeton(session.token);
      const { data, error } = await sb.from("fournisseurs").select("id, nom, created_at").order("created_at", { ascending: false });
      if (error) throw error;
      setFournisseurs(data || []);
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function ajouterFournisseur() {
    if (!session || !nouveauFournisseur.trim()) return;
    setEnCours(true); setMessage(null);
    try {
      const sb = sbAvecJeton(session.token);
      const { error } = await sb.from("fournisseurs").insert({ nom: nouveauFournisseur.trim(), etablissement_id: session.etablissement.id });
      if (error) throw error;
      setNouveauFournisseur("");
      await chargerFournisseurs();
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function seDeconnecter() {
    try { await supabasePublic.auth.signOut(); } catch (e) { /* pas grave pour ce test */ }
    setSession(null);
    setFournisseurs(null);
    setEmployes(null);
    setEmployeIdentifie(null);
    setMessage(null);
  }

  async function creerEmploye() {
    if (!session) return;
    setEnCours(true); setMessage(null);
    try {
      await appelerEmployes(session.token, "creer", { nom: nomEmploye, poste: posteEmploye, role: roleEmploye, code: codeEmploye });
      setMessage({ type: "ok", texte: `Employé « ${nomEmploye} » créé avec le code ${codeEmploye}.` });
      await chargerEmployes();
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function chargerEmployes() {
    if (!session) return;
    setEnCours(true); setMessage(null);
    try {
      const data = await appelerEmployes(session.token, "lister", {});
      setEmployes(data.employes || []);
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  async function verifierCode() {
    if (!session) return;
    setEnCours(true); setMessage(null); setEmployeIdentifie(null);
    try {
      const data = await appelerEmployes(session.token, "verifier", { code: codeSaisi });
      setEmployeIdentifie(data.employe);
      setMessage({ type: "ok", texte: `Code reconnu : ${data.employe.nom} (${data.employe.role}).` });
    } catch (e) {
      setMessage({ type: "erreur", texte: e.message });
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 24, fontFamily: "system-ui, sans-serif", color: "#1e293b" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Espace de test — connexion multi-établissement</h1>
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
        Page technique temporaire, invisible dans l'application normale. Sert uniquement à vérifier
        la nouvelle base de données multi-restaurants avant de l'intégrer partout.
      </p>

      {!session && (
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 20 }}>
          <Champ label="Nom de l'établissement (pour créer un compte)" value={nom} onChange={(e) => setNom(e.target.value)} />
          <Champ label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Champ label="Mot de passe (8 caractères min.)" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
          <div style={{ marginTop: 16 }}>
            <Bouton onClick={creerCompte} disabled={enCours}>Créer un compte démo</Bouton>
            <Bouton onClick={seConnecter} disabled={enCours}>Se connecter</Bouton>
          </div>
        </div>
      )}

      {session && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 14, marginBottom: 12 }}>
            Connecté en tant que <strong>{session.etablissement.nom}</strong> (id : {session.etablissement.id})
          </p>
          <Bouton onClick={chargerFournisseurs} disabled={enCours}>Voir mes fournisseurs</Bouton>
          <Bouton onClick={seDeconnecter} disabled={enCours}>Se déconnecter</Bouton>

          {fournisseurs !== null && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Fournisseurs visibles ({fournisseurs.length})</h3>
              <ul style={{ fontSize: 13, marginBottom: 12, paddingLeft: 18 }}>
                {fournisseurs.length === 0 && <li style={{ color: "#64748b" }}>Aucun pour l'instant.</li>}
                {fournisseurs.map((f) => <li key={f.id}>{f.nom}</li>)}
              </ul>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={nouveauFournisseur}
                  onChange={(e) => setNouveauFournisseur(e.target.value)}
                  placeholder="Nom d'un fournisseur de test"
                  style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13 }}
                />
                <Bouton onClick={ajouterFournisseur} disabled={enCours || !nouveauFournisseur.trim()}>Ajouter</Bouton>
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #bbf7d0" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Employés — code personnel à 4 chiffres</h3>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <input value={nomEmploye} onChange={(e) => setNomEmploye(e.target.value)} placeholder="Nom"
                style={{ flex: "1 1 140px", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13 }} />
              <select value={posteEmploye} onChange={(e) => setPosteEmploye(e.target.value)}
                style={{ flex: "1 1 100px", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13, background: "#fff" }}>
                <option value="">Aucun poste</option>
                {POSTES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={roleEmploye} onChange={(e) => setRoleEmploye(e.target.value)}
                style={{ flex: "1 1 140px", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13, background: "#fff" }}>
                {STATUTS_EQUIPE.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <input value={codeEmploye} onChange={(e) => setCodeEmploye(e.target.value)} placeholder="Code à 4 chiffres" maxLength={4}
                style={{ flex: "0 1 110px", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Bouton onClick={creerEmploye} disabled={enCours}>Créer cet employé</Bouton>
              <Bouton onClick={chargerEmployes} disabled={enCours}>Voir les employés</Bouton>
            </div>

            {employes !== null && (
              <ul style={{ fontSize: 13, marginBottom: 16, paddingLeft: 18 }}>
                {employes.length === 0 && <li style={{ color: "#64748b" }}>Aucun employé pour l'instant.</li>}
                {employes.map((e) => <li key={e.id}>{e.nom} — {e.poste || "(poste non précisé)"} — {e.role}</li>)}
              </ul>
            )}

            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Tester la saisie d'un code (comme sur la tablette/le téléphone)</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={codeSaisi} onChange={(e) => setCodeSaisi(e.target.value)} placeholder="1234" maxLength={4}
                style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13 }} />
              <Bouton onClick={verifierCode} disabled={enCours || codeSaisi.length !== 4}>Valider le code</Bouton>
            </div>
            {employeIdentifie && (
              <p style={{ fontSize: 13, marginTop: 8, color: "#065f46" }}>
                Identifié : <strong>{employeIdentifie.nom}</strong> ({employeIdentifie.role}{employeIdentifie.poste ? `, ${employeIdentifie.poste}` : ""})
              </p>
            )}
          </div>
        </div>
      )}

      {message && (
        <p style={{
          marginTop: 16, fontSize: 13, padding: 10, borderRadius: 6,
          background: message.type === "ok" ? "#ecfdf5" : "#fef2f2",
          color: message.type === "ok" ? "#065f46" : "#991b1b",
        }}>
          {message.texte}
        </p>
      )}
    </div>
  );
}
