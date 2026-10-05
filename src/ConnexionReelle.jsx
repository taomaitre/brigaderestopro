import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import KitchenApp from './App.jsx';
import { POSTES, STATUTS_EQUIPE, estChefOuDirecteur } from './listesEquipe.js';

/* =========================================================================================
   PRÉVISUALISATION — Écran de connexion réel (établissement + code employé)
   =========================================================================================
   Ce fichier est volontairement SÉPARÉ de App.jsx : il ne remplace rien de l'application que
   tu utilises tous les jours, il ne touche à aucune de ses données, et il n'apparaît JAMAIS
   sauf si on ouvre l'adresse avec "?nouveau-login=1" à la fin (voir main.jsx).

   But : montrer à quoi ressemblera le VRAI écran de connexion une fois branché dans
   l'application normale (présentation proche de l'appli, pas le formulaire brut de la page
   de test technique EspaceTestMultiEtablissement.jsx), et vérifier que l'enchaînement complet
   fonctionne : connexion établissement → saisie du code employé → employé identifié.

   Ici on ne crée pas de compte établissement (ça reste dans la page de test technique) : on se
   connecte avec un établissement déjà existant (ex. "Établissement Démo" créé précédemment).
   ========================================================================================= */

const URL_PROJET = "https://uikxpjnovzxcglygueif.supabase.co";
const CLE_PUBLIQUE = "sb_publishable_xM0AsmcBnd4fmat3rUJkYw_w45Jivl9";
const URL_FONCTION_EMPLOYES = `${URL_PROJET}/functions/v1/code-employe`;

const supabasePublic = createClient(URL_PROJET, CLE_PUBLIQUE);

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

const styleFond = {
  "--bg": "#F5F6F4", "--ink": "#1D2321", "--steel": "#657069", "--line": "#DEE2DE",
  "--accent": "#2F6B4F", "--accent-soft": "#E6F0EA", "--warn-soft": "#FBE8E3", "--warn": "#C1432D",
  backgroundColor: "var(--bg)", fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
};

const inputCls = "w-full border border-[var(--line)] rounded-md px-3 py-2 text-sm";

function Carte({ children }) {
  return (
    <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-sm">
      {children}
    </div>
  );
}

function EnTete({ sousTitre }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontSize: 22 }}>🍳</span>
        <span className="text-xl font-semibold text-[var(--ink)] tracking-tight">Ma Cuisine</span>
      </div>
      {sousTitre && <p className="text-center text-sm text-[var(--steel)]">{sousTitre}</p>}
    </div>
  );
}

export default function ConnexionReelle() {
  const [etape, setEtape] = useState("etablissement"); // "etablissement" | "code" | "connecte"
  const [email, setEmail] = useState("demo@brigaderestopro.fr");
  const [motDePasse, setMotDePasse] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  const [session, setSession] = useState(null); // { token, etablissement: { id, nom } }
  const [code, setCode] = useState("");
  const [employeIdentifie, setEmployeIdentifie] = useState(null);
  const [voirAppliReelle, setVoirAppliReelle] = useState(false);

  const [equipe, setEquipe] = useState(null);
  const [afficherAjout, setAfficherAjout] = useState(false);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPoste, setNouveauPoste] = useState("");
  const [nouveauRole, setNouveauRole] = useState("cuisinier");
  const [nouveauCode, setNouveauCode] = useState("");
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreurEquipe, setErreurEquipe] = useState("");

  const [catalogue, setCatalogue] = useState(null);
  const [fournisseursCat, setFournisseursCat] = useState(null);

  // Catalogue (fournisseurs + produits) lu depuis la nouvelle base, en LECTURE SEULE, mis au format
  // attendu par l'écran « Référentiel produits » de l'application.
  async function chargerCatalogue() {
    try {
      const [rf, rp] = await Promise.all([
        supabasePublic.from("fournisseurs").select("id, nom, contact_nom, telephone, email, adresse, numero_client, jours_livraison, note").order("nom"),
        supabasePublic.from("produits").select("id, nom, reference, categorie, fournisseur_id, unite, quantite_stock, quantite_cible, prix_achat, conditionnement, prix_unite, poids_par_piece, reference_verifiee, note, fournisseurs(nom)").order("nom"),
      ]);
      if (rf.error) throw rf.error;
      if (rp.error) throw rp.error;
      setFournisseursCat(rf.data || []);
      const liste = (rp.data || []).map((p) => ({
        id: p.id, nom: p.nom, categorie: p.categorie || "Autres",
        fournisseur: (p.fournisseurs && p.fournisseurs.nom) || "",
        reference: p.reference || "", conditionnement: p.conditionnement || "",
        prixUnitaire: p.prix_achat != null ? `${Number(p.prix_achat).toFixed(2).replace(".", ",")} ${p.prix_unite || "€"}` : "",
        poidsParPiece: p.poids_par_piece || "", referenceVerifiee: !!p.reference_verifiee, note: p.note || "",
        quantite: Number(p.quantite_stock) || 0, cible: Number(p.quantite_cible) || 0, unite: p.unite || "", lot: "", dlc: "",
        brut: p, // valeurs de la base, pour le formulaire de modification
      }));
      setCatalogue(liste);
      return liste;
    } catch (e2) {
      setErreurEquipe("Impossible de charger le catalogue : " + (e2.message || e2));
      return null;
    }
  }

  // Ajout / modification d'un fournisseur ou d'un produit dans la nouvelle base (établissement fictif
  // de test). La sécurité RLS garantit que seules les lignes de l'établissement connecté sont touchées.
  async function enregistrerCatalogue(table, id, valeurs) {
    const requete = id
      ? supabasePublic.from(table).update(valeurs).eq("id", id)
      : supabasePublic.from(table).insert({ ...valeurs, etablissement_id: session.etablissement.id });
    const { error } = await requete;
    if (error) throw error;
    await chargerCatalogue();
  }

  // Enregistre dans la nouvelle base les changements de stock faits dans l'application (quantités,
  // quantité cible, fournisseur, ajout et suppression d'article). Retourne le catalogue rechargé quand
  // des lignes ont été ajoutées/supprimées (les nouveaux articles reçoivent leur vrai identifiant).
  // Lot et DLC restent pour l'instant en mémoire uniquement (pas encore branchés sur la base).
  async function persisterStock(prec, suiv) {
    const idFournisseur = (nom) => {
      const f = (fournisseursCat || []).find((x) => x.nom === nom);
      return f ? f.id : null;
    };
    const avant = new Map(prec.map((x) => [x.id, x]));
    const idsApres = new Set(suiv.map((x) => x.id));
    let recharger = false;
    for (const x of suiv) {
      const o = avant.get(x.id);
      if (!o) {
        const { error } = await supabasePublic.from("produits").insert({
          etablissement_id: session.etablissement.id, nom: x.nom, reference: x.reference || null,
          categorie: x.categorie || null, unite: x.unite || null, fournisseur_id: idFournisseur(x.fournisseur),
          quantite_stock: Number(x.quantite) || 0, quantite_cible: Number(x.cible) || 0,
        });
        if (error) throw error;
        recharger = true;
      } else if (Number(o.quantite) !== Number(x.quantite) || Number(o.cible) !== Number(x.cible) || o.fournisseur !== x.fournisseur) {
        const maj = { quantite_stock: Number(x.quantite) || 0, quantite_cible: Number(x.cible) || 0 };
        if (o.fournisseur !== x.fournisseur) maj.fournisseur_id = idFournisseur(x.fournisseur);
        const { error } = await supabasePublic.from("produits").update(maj).eq("id", x.id);
        if (error) throw error;
      }
    }
    for (const o of prec) {
      if (!idsApres.has(o.id)) {
        const { error } = await supabasePublic.from("produits").delete().eq("id", o.id);
        if (error) throw error;
        recharger = true;
      }
    }
    return recharger ? await chargerCatalogue() : null;
  }

  // ---- Températures du froid (appareils, relevés, surveillances) : nouvelle base ----
  const [listesFroid, setListesFroid] = useState(null);

  const EST_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const dateLocale = (iso) => {
    const d = new Date(iso);
    const p2 = (n) => String(n).padStart(2, "0");
    return { date: `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`, heure: `${p2(d.getHours())}:${p2(d.getMinutes())}` };
  };
  const versNombre = (v) => (v === "" || v == null ? null : Number(String(v).replace(",", ".")));

  const CONVERSIONS_FROID = {
    equipements: {
      table: "appareils",
      aDb: (e) => ({
        nom: e.nom, famille: e.type === "congelateur" ? "negatif" : "positif", type: e.type || null,
        norme_min: e.min == null ? null : Number(e.min), norme_max: e.max == null ? null : Number(e.max), numero_sonde: e.sonde || null,
      }),
    },
    releves: {
      table: "releves_temperature",
      aDb: (x) => ({
        appareil_id: x.equipementId, valeur: versNombre(x.valeur),
        date_heure: new Date(`${x.date}T${x.heure || "00:00"}:00`).toISOString(),
        conforme: x.conforme == null ? null : !!x.conforme, note: x.note || null, employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null,
      }),
    },
    shifts: {
      table: "planning_creneaux",
      aDb: (x) => ({
        utilisateur_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null, jour_semaine: x.jour, service: x.service || null,
        heure_debut: x.debut || null, heure_fin: x.fin || null,
      }),
    },
    surveillances: {
      table: "surveillances_temperature",
      aDb: (x) => ({
        appareil_id: x.equipementId, employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null,
        detecte_le: new Date(`${x.date}T${x.heureDetection || "00:00"}:00`).toISOString(),
        valeur_initiale: versNombre(x.valeurInitiale), rappel_a: new Date(x.rappelTs).toISOString(),
        statut: x.statut, alarme_acquittee: !!x.alarmeAcquittee, motif: x.motif || null, note: x.note || null,
      }),
    },
  };

  async function chargerListesFroid() {
    try {
      const [ra, rr, rs, rp] = await Promise.all([
        supabasePublic.from("appareils").select("*").order("nom"),
        supabasePublic.from("releves_temperature").select("*").order("date_heure", { ascending: false }).limit(1000),
        supabasePublic.from("surveillances_temperature").select("*").order("detecte_le", { ascending: false }).limit(200),
        supabasePublic.from("planning_creneaux").select("*"),
      ]);
      if (rp.error) throw rp.error;
      if (ra.error) throw ra.error;
      if (rr.error) throw rr.error;
      if (rs.error) throw rs.error;
      const listes = {
        shifts: (rp.data || []).filter((r) => r.jour_semaine).map((r) => ({
          id: r.id, employeeId: r.utilisateur_id, jour: r.jour_semaine, service: r.service,
          debut: (r.heure_debut || "").slice(0, 5), fin: (r.heure_fin || "").slice(0, 5),
        })),
        equipements: (ra.data || []).map((r) => ({
          id: r.id, nom: r.nom, type: r.type || (r.famille === "negatif" ? "congelateur" : "frigo"),
          min: r.norme_min == null ? null : Number(r.norme_min), max: r.norme_max == null ? null : Number(r.norme_max),
          sonde: r.numero_sonde || null, sondeConnectee: false,
        })),
        releves: (rr.data || []).map((r) => {
          const dl = dateLocale(r.date_heure);
          return { id: r.id, equipementId: r.appareil_id, valeur: Number(r.valeur), date: dl.date, heure: dl.heure, employeeId: r.employe_id, conforme: r.conforme, manuel: true, note: r.note || "" };
        }),
        surveillances: (rs.data || []).map((r) => {
          const dl = dateLocale(r.detecte_le);
          return {
            id: r.id, equipementId: r.appareil_id, employeeId: r.employe_id, date: dl.date, heureDetection: dl.heure,
            valeurInitiale: r.valeur_initiale == null ? "" : Number(r.valeur_initiale), rappelTs: Date.parse(r.rappel_a),
            statut: r.statut, alarmeAcquittee: !!r.alarme_acquittee, motif: r.motif || undefined, note: r.note || undefined,
          };
        }),
      };
      setListesFroid(listes);
      return listes;
    } catch (e2) {
      setErreurEquipe("Impossible de charger les températures : " + (e2.message || e2));
      return null;
    }
  }

  // Enregistre les changements d'une liste (ajout, modification, suppression) ; retourne les listes
  // rechargées quand des lignes ont été ajoutées/supprimées (les nouvelles lignes reçoivent leur vrai identifiant).
  function fabriquerPersisterFroid(cle) {
    const conv = CONVERSIONS_FROID[cle];
    return async (avant, apres) => {
      const mapAvant = new Map(avant.map((x) => [x.id, x]));
      const idsApres = new Set(apres.map((x) => x.id));
      let recharger = false;
      for (const x of apres) {
        const o = mapAvant.get(x.id);
        const ligne = conv.aDb(x);
        if (!o) {
          if ((cle === "releves" || cle === "surveillances") && !EST_UUID.test(x.equipementId || "")) throw new Error("Appareil pas encore enregistré, réessayez dans un instant.");
          const { error } = await supabasePublic.from(conv.table).insert({ ...ligne, etablissement_id: session.etablissement.id });
          if (error) throw error;
          recharger = true;
        } else if (JSON.stringify(conv.aDb(o)) !== JSON.stringify(ligne)) {
          const { error } = await supabasePublic.from(conv.table).update(ligne).eq("id", x.id);
          if (error) throw error;
        }
      }
      for (const o of avant) {
        if (!idsApres.has(o.id)) {
          const { error } = await supabasePublic.from(conv.table).delete().eq("id", o.id);
          if (error) throw error;
          recharger = true;
        }
      }
      if (!recharger) return null;
      const listes = await chargerListesFroid();
      return listes ? listes[cle] : null;
    };
  }

  async function chargerEquipe(jeton) {
    try {
      const data = await appelerEmployes(jeton, "lister", {});
      setEquipe(data.employes || []);
    } catch (e2) {
      setErreurEquipe("Impossible de charger l'équipe : " + e2.message);
    }
  }

  async function ajouterMembreEquipe(e) {
    e.preventDefault();
    if (!/^[0-9]{4}$/.test(nouveauCode)) {
      setErreurEquipe("Le code doit comporter exactement 4 chiffres.");
      return;
    }
    setEnregistrement(true); setErreurEquipe("");
    try {
      await appelerEmployes(session.token, "creer", { nom: nouveauNom, poste: nouveauPoste, role: nouveauRole, code: nouveauCode });
      setNouveauNom(""); setNouveauPoste(""); setNouveauCode(""); setAfficherAjout(false);
      await chargerEquipe(session.token);
    } catch (e2) {
      setErreurEquipe("Impossible d'ajouter cet employé : " + e2.message);
    } finally {
      setEnregistrement(false);
    }
  }

  async function seConnecterEtablissement(e) {
    e.preventDefault();
    setEnCours(true); setErreur("");
    try {
      const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password: motDePasse });
      if (error) throw error;
      const meta = data.user.user_metadata || {};
      setSession({
        token: data.session.access_token,
        etablissement: { id: meta.etablissement_id, nom: meta.nom_etablissement || "(nom inconnu)" },
      });
      setEtape("code");
    } catch (e2) {
      setErreur("Connexion impossible : " + e2.message);
    } finally {
      setEnCours(false);
    }
  }

  async function validerCode(e) {
    e.preventDefault();
    if (code.length !== 4) return;
    setEnCours(true); setErreur("");
    try {
      const data = await appelerEmployes(session.token, "verifier", { code });
      setEmployeIdentifie(data.employe);
      setEtape("connecte");
      chargerEquipe(session.token);
      chargerCatalogue();
      chargerListesFroid();
    } catch (e2) {
      setErreur("Code incorrect, ou pas encore attribué.");
      setCode("");
    } finally {
      setEnCours(false);
    }
  }

  async function seDeconnecter() {
    try { await supabasePublic.auth.signOut(); } catch (e) { /* pas grave */ }
    setSession(null); setEmployeIdentifie(null); setCode(""); setErreur("");
    setEquipe(null); setAfficherAjout(false); setErreurEquipe("");
    setEtape("etablissement");
  }

  if (etape === "connecte" && voirAppliReelle) {
    const identiteExterne = {
      employeId: employeIdentifie.id,
      employeNom: employeIdentifie.nom,
      employePoste: employeIdentifie.poste,
      employeRole: employeIdentifie.role,
      estChef: estChefOuDirecteur(employeIdentifie.role),
      catalogue: catalogue || undefined,
      fournisseurs: fournisseursCat || undefined,
      gestionCatalogue: catalogue ? { enregistrer: enregistrerCatalogue } : undefined,
      gestionStock: catalogue ? { persister: persisterStock } : undefined,
      listes: listesFroid || undefined,
      gestionListes: listesFroid ? {
        equipements: { persister: fabriquerPersisterFroid("equipements") },
        releves: { persister: fabriquerPersisterFroid("releves") },
        surveillances: { persister: fabriquerPersisterFroid("surveillances") },
        shifts: { persister: fabriquerPersisterFroid("shifts") },
      } : undefined,
      // Équipe réelle de l'établissement (nouvelle base), au format attendu par l'application.
      equipe: (equipe || []).map((e) => ({
        id: e.id, nom: e.nom, poste: e.poste || "", estChef: estChefOuDirecteur(e.role),
      })),
    };
    return (
      <div>
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
            background: "#1D2321", color: "white", fontSize: 12,
            padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span>
            Prévisualisation — vraie application, connecté en tant que <strong>{employeIdentifie.nom}</strong>
            {" "}({session.etablissement.nom}). Seule la liste d'équipe vient de la nouvelle base (lecture seule, modifications non conservées) ; le reste utilise encore l'ancien stockage.
          </span>
          <button onClick={() => setVoirAppliReelle(false)} style={{ color: "white", textDecoration: "underline" }}>
            ← Revenir à la prévisualisation
          </button>
        </div>
        <div style={{ paddingTop: 32 }}>
          <KitchenApp identiteExterne={identiteExterne} />
        </div>
      </div>
    );
  }

  if (etape === "connecte") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={styleFond}>
        <div className="w-full max-w-sm">
          <EnTete sousTitre={session.etablissement.nom} />
          <Carte>
            <p className="text-sm text-[var(--steel)] mb-1">Connecté en tant que</p>
            <p className="text-lg font-semibold text-[var(--ink)] mb-4">{employeIdentifie.nom}</p>
            <p className="text-xs text-[var(--steel)] mb-4">
              {employeIdentifie.role}{employeIdentifie.poste ? ` — ${employeIdentifie.poste}` : ""}
            </p>
            <p className="text-xs text-[var(--steel)] mb-4">
              (La suite de l'application — plan de nettoyage, températures, etc. — utilise encore l'ancien
              stockage pour l'instant ; seul l'écran de connexion est déjà branché sur la nouvelle base.)
            </p>
            <button onClick={() => setVoirAppliReelle(true)} className="text-sm font-semibold text-white rounded-md px-3 py-2 mb-2 block w-full text-center" style={{ backgroundColor: "var(--accent)" }}>
              Essayer la vraie application avec cette identité →
            </button>
            <button onClick={seDeconnecter} className="text-sm text-[var(--accent)] font-medium">
              Se déconnecter
            </button>
          </Carte>

          <div className="mt-4">
            <Carte>
              <p className="text-sm font-semibold text-[var(--ink)] mb-3">Équipe de l'établissement</p>

              {equipe === null && <p className="text-xs text-[var(--steel)]">Chargement…</p>}

              {equipe !== null && (
                <ul className="mb-3">
                  {equipe.length === 0 && <li className="text-xs text-[var(--steel)]">Aucun employé pour l'instant.</li>}
                  {equipe.map((e) => (
                    <li key={e.id} className="text-sm text-[var(--ink)] flex justify-between py-1 border-b border-[var(--line)] last:border-0">
                      <span>{e.nom}</span>
                      <span className="text-[var(--steel)] text-xs">{e.role}{e.poste ? ` — ${e.poste}` : ""}</span>
                    </li>
                  ))}
                </ul>
              )}

              {erreurEquipe && <p className="text-xs mb-2" style={{ color: "var(--warn)" }}>{erreurEquipe}</p>}

              {!afficherAjout && (
                <button onClick={() => setAfficherAjout(true)} className="text-sm text-[var(--accent)] font-medium">
                  + Ajouter un employé
                </button>
              )}

              {afficherAjout && (
                <form onSubmit={ajouterMembreEquipe} className="mt-2 space-y-2">
                  <input className={inputCls} placeholder="Nom" value={nouveauNom} onChange={(e) => setNouveauNom(e.target.value)} required />
                  <select className={inputCls} value={nouveauPoste} onChange={(e) => setNouveauPoste(e.target.value)}>
                    <option value="">Aucun poste</option>
                    {POSTES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <select className={inputCls} value={nouveauRole} onChange={(e) => setNouveauRole(e.target.value)}>
                    {STATUTS_EQUIPE.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <input
                    className={inputCls}
                    placeholder="Code à 4 chiffres"
                    inputMode="numeric"
                    maxLength={4}
                    value={nouveauCode}
                    onChange={(e) => setNouveauCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={enregistrement}
                      className="flex-1 rounded-md px-3 py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--accent)", opacity: enregistrement ? 0.6 : 1 }}
                    >
                      Enregistrer
                    </button>
                    <button type="button" onClick={() => setAfficherAjout(false)} className="text-sm text-[var(--steel)] px-2">
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </Carte>
          </div>
        </div>
      </div>
    );
  }

  if (etape === "code") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={styleFond}>
        <div className="w-full max-w-sm">
          <EnTete sousTitre={`Établissement : ${session.etablissement.nom}`} />
          <Carte>
            <p className="text-sm text-[var(--ink)] font-medium mb-1">Votre code personnel</p>
            <p className="text-xs text-[var(--steel)] mb-3">Code à 4 chiffres donné par le chef ou le directeur.</p>
            <form onSubmit={validerCode}>
              <input
                className={`${inputCls} text-center text-lg tracking-widest mb-3`}
                value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 4)); setErreur(""); }}
                inputMode="numeric"
                maxLength={4}
                autoFocus
              />
              {erreur && <p className="text-xs mb-3" style={{ color: "var(--warn)" }}>{erreur}</p>}
              <button
                type="submit"
                disabled={enCours || code.length !== 4}
                className="w-full rounded-md px-3 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--accent)", opacity: enCours || code.length !== 4 ? 0.6 : 1 }}
              >
                Valider le code
              </button>
            </form>
            <button onClick={seDeconnecter} className="text-xs text-[var(--steel)] mt-4">
              ← Changer d'établissement
            </button>
          </Carte>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={styleFond}>
      <div className="w-full max-w-sm">
        <EnTete sousTitre="Connexion de l'établissement" />
        <Carte>
          <form onSubmit={seConnecterEtablissement}>
            <label className="block mb-3">
              <span className="block mb-1 text-sm font-medium text-[var(--ink)]">Email de l'établissement</span>
              <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="block mb-3">
              <span className="block mb-1 text-sm font-medium text-[var(--ink)]">Mot de passe</span>
              <input className={inputCls} type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
            </label>
            {erreur && <p className="text-xs mb-3" style={{ color: "var(--warn)" }}>{erreur}</p>}
            <button
              type="submit"
              disabled={enCours}
              className="w-full rounded-md px-3 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--accent)", opacity: enCours ? 0.6 : 1 }}
            >
              Se connecter
            </button>
          </form>
        </Carte>
        <p className="text-center text-xs text-[var(--steel)] mt-4">
          Prévisualisation technique — pas encore l'application normale.
        </p>
      </div>
    </div>
  );
}
