import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import KitchenApp from './App.jsx';
import { QRCode, NIVEAU_CORRECTION_M } from './qrVendor.js';
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
const URL_FONCTION_INVITATION = `${URL_PROJET}/functions/v1/invitation-appareil`;

const supabasePublic = createClient(URL_PROJET, CLE_PUBLIQUE);

function dateHeureIso(date, heure) {
  const d = new Date(`${date}T${heure || "00:00"}:00`);
  return (isNaN(d.getTime()) ? new Date() : d).toISOString();
}

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

async function appelerInvitation(jeton, action, payload) {
  const entetes = { "Content-Type": "application/json", apikey: CLE_PUBLIQUE };
  if (jeton) entetes.Authorization = `Bearer ${jeton}`;
  const reponse = await fetch(URL_FONCTION_INVITATION, { method: "POST", headers: entetes, body: JSON.stringify({ action, ...payload }) });
  const data = await reponse.json().catch(() => null);
  if (!reponse.ok || !data || data.ok !== true) {
    throw new Error(((data && data.erreur) || `Erreur serveur (${reponse.status})`) + (data && data.detail ? ` — ${data.detail}` : ""));
  }
  return data;
}

// Un lien d'invitation ne s'utilise qu'une fois : on évite de l'échanger deux fois (rechargement du composant).
let invitationDejaTraitee = false;

// QR code dessiné en SVG (aucun service externe : le lien ne sort jamais de l'application).
function QrSvg({ texte, taille = 180 }) {
  const qr = new QRCode(-1, NIVEAU_CORRECTION_M);
  qr.addData(texte);
  qr.make();
  const n = qr.getModuleCount();
  const cases = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) cases.push(<rect key={r * n + c} x={c + 4} y={r + 4} width="1.02" height="1.02" fill="#000" />);
  return (
    <svg viewBox={`0 0 ${n + 8} ${n + 8}`} width={taille} height={taille} style={{ background: "#fff", display: "block" }} shapeRendering="crispEdges">
      {cases}
    </svg>
  );
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
  const [nouvelEmail, setNouvelEmail] = useState("");
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreurEquipe, setErreurEquipe] = useState("");
  const [invitation, setInvitation] = useState(null); // { employe, lien, expire } | { employe, erreur }
  const [invitationEnCours, setInvitationEnCours] = useState(false);
  const [lienCopie, setLienCopie] = useState(false);
  const [arriveeParLien, setArriveeParLien] = useState(false);

  const [catalogue, setCatalogue] = useState(null);
  const [fournisseursCat, setFournisseursCat] = useState(null);

  // Catalogue (fournisseurs + produits) lu depuis la nouvelle base, en LECTURE SEULE, mis au format
  // attendu par l'écran « Référentiel produits » de l'application.
  async function chargerCatalogue() {
    try {
      const [rf, rp, rl] = await Promise.all([
        supabasePublic.from("fournisseurs").select("id, nom, contact_nom, telephone, email, adresse, numero_client, jours_livraison, note, coordonnees_a_completer").order("nom"),
        supabasePublic.from("produits").select("id, nom, reference, categorie, conservation, fournisseur_id, unite, quantite_stock, quantite_cible, prix_achat, conditionnement, prix_unite, poids_par_piece, reference_verifiee, note, type_date, delai_jours_dlc, delai_apres_ouverture_jours, allergenes_norme, origine_norme, fournisseurs(nom)").order("nom"),
        supabasePublic.from("lots_produits").select("produit_id, numero_lot, dlc, quantite_restante, date_reception").order("date_reception", { ascending: false }).limit(1000),
      ]);
      if (rf.error) throw rf.error;
      if (rp.error) throw rp.error;
      // Dernier lot reçu de chaque produit (lot et DLC affichés dans le stock).
      const dernierLot = new Map();
      (rl.data || []).forEach((l) => { if (!dernierLot.has(l.produit_id)) dernierLot.set(l.produit_id, l); });
      setFournisseursCat(rf.data || []);
      const liste = (rp.data || []).map((p) => ({
        id: p.id, nom: p.nom, categorie: p.categorie || "Autres", conservation: p.conservation || "",
        typeDate: p.type_date || "", dlcJours: p.delai_jours_dlc == null ? null : Number(p.delai_jours_dlc), delaiOuverture: p.delai_apres_ouverture_jours == null ? null : Number(p.delai_apres_ouverture_jours),
        fournisseur: (p.fournisseurs && p.fournisseurs.nom) || "",
        reference: p.reference || "", conditionnement: p.conditionnement || "",
        prixUnitaire: p.prix_achat != null ? `${Number(p.prix_achat).toFixed(2).replace(".", ",")} ${p.prix_unite || "€"}` : "",
        poidsParPiece: p.poids_par_piece || "", referenceVerifiee: !!p.reference_verifiee, note: p.note || "",
        allergenesNorme: (p.allergenes_norme || []).join(", "), origineNorme: p.origine_norme || "",
        quantite: Number(p.quantite_stock) || 0, cible: Number(p.quantite_cible) || 0, unite: p.unite || "",
        lot: (dernierLot.get(p.id) || {}).numero_lot || "", dlc: (dernierLot.get(p.id) || {}).dlc || "",
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
  // Réglages de l'établissement (nom, cellule de refroidissement, congélation décrite au PMS) et listes « Autre » (demandes d'ajout).
  const [reglagesEtab, setReglagesEtab] = useState(null);
  const [demandesAjoutListe, setDemandesAjoutListe] = useState([]);

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
    preparations: {
      table: "etiquettes",
      aDb: (x) => ({
        nom_libre: x.nomLibre || null, dlc: /^\d{4}-\d{2}-\d{2}$/.test(x.dlcDate || "") ? x.dlcDate : null,
        nb_etiquettes: Number(x.nbEtiquettes) || 1, employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null,
        jete: !!x.jete, decongele: !!x.decongelationInfo, donnees: x,
      }),
    },
    fiches: {
      table: "fiches_techniques",
      aDb: (x) => ({
        code: x.code || null, nom: x.nom || "Fiche sans nom", sous_titre: x.sousTitre || null, categorie: x.categorie || null, poste: x.poste || null,
        type: /sous/i.test(x.type || "") ? "sous_recette" : "plat",
        duree_conservation_jours: Number.isFinite(Number(x.dlcJours)) ? Math.round(Number(x.dlcJours)) : null,
        donnees: x,
      }),
    },
    cuissons: {
      table: "cuissons",
      aDb: (x) => ({
        produit_nom: x.produit || null,
        famille_haccp: { viandeHachee: "viande_hachee", volaille: "volaille", poisson: "poisson" }[x.famille] || "general",
        appareil: x.appareil || null,
        heure_depart: dateHeureIso(x.date, x.heureDebut),
        duree_attendue_min: x.dureeAttendueMin == null ? null : Math.round(Number(x.dureeAttendueMin)) || null,
        temperature_coeur_mesuree: versNombre(x.temperature), conforme: x.conforme == null ? null : !!x.conforme,
        statut: x.statut === "termine" ? "termine" : "en_cours",
        employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null, donnees: x,
      }),
    },
    refroidissements: {
      table: "refroidissements",
      aDb: (x) => ({
        mode: x.type === "negatif" ? "negatif" : "positif",
        temperature_depart: versNombre(x.tempDebut), heure_depart: dateHeureIso(x.date, x.heureDebut),
        temperature_fin: versNombre(x.tempFin), conforme: x.conforme == null ? null : !!x.conforme,
        statut: x.statut === "termine" ? "termine" : "en_cours",
        employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null, donnees: x,
      }),
    },
    maintiens: {
      table: "maintiens_chaud",
      aDb: (x) => ({
        produit_nom: x.nom || null, appareil: x.appareil || null,
        heure_debut: dateHeureIso(x.date, x.heureDebut),
        statut: x.statut === "termine" ? "termine" : "en_cours",
        employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null, donnees: x,
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
    cleaning: {
      table: "pms_taches",
      aDb: (x) => ({
        zone: x.poste || "Tous", tache: x.tache || "Tâche sans nom", protocole: x.note || null,
        frequence: x.frequence || null, poste: x.poste || null, donnees: x,
      }),
    },
    shifts: {
      table: "planning_creneaux",
      aDb: (x) => ({
        utilisateur_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null, jour_semaine: x.jour, service: x.service || null,
        heure_debut: x.debut || null, heure_fin: x.fin || null,
      }),
    },
    huileTests: {
      table: "huile_friture_tests",
      aDb: (x) => ({
        date: x.date, heure: x.heure || null, resultat: x.resultat || null,
        photo_bandelette_url: x.photo || null, employe_id: EST_UUID.test(x.employeeId || "") ? x.employeeId : null,
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

  // Réceptions : une ligne par produit reçu (même format que l'ancien stockage), regroupées par receptionId.
  async function lireReceptions() {
    const { data, error } = await supabasePublic
      .from("receptions")
      .select("id, fournisseur_nom, date_livraison, heure_livraison, receptionne_par, fournisseurs(nom), receptions_lignes(*), receptions_photos_bon(url_photo, ordre)")
      .order("date_livraison", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(150);
    if (error) throw error;
    const liste = [];
    (data || []).forEach((r) => {
      const photos = (r.receptions_photos_bon || []).slice().sort((a, b) => (a.ordre || 0) - (b.ordre || 0)).map((x) => x.url_photo);
      (r.receptions_lignes || []).forEach((l) => {
        liste.push({
          id: l.id, receptionId: r.id, date: r.date_livraison, heure: (r.heure_livraison || "").slice(0, 5), employeeId: r.receptionne_par,
          fournisseur: r.fournisseur_nom || (r.fournisseurs && r.fournisseurs.nom) || "", produit: l.produit_nom || "", reference: l.reference || "",
          quantite: Number(l.quantite) || 0, lot: l.lot || "", dlc: l.dlc || "", allergenes: l.allergenes || "", origine: l.origine || "",
          agrementSanitaire: l.agrement_sanitaire || "", conforme: l.conforme !== false, raison: l.motif_non_conformite || "",
          quantiteNC: Number(l.quantite_nc) || 0, photoNC: l.photo_nc_url || null, ecartPrix: Number(l.ecart_prix) || 0,
          valideChef: !!l.valide_chef, photoBon: null, photosBon: photos,
          conservation: l.conservation || "", temperature: l.temperature_controlee == null ? null : Number(l.temperature_controlee),
        });
      });
    });
    return liste;
  }

  // Notifications fournisseur (retours de marchandise) : à traiter par le chef/directeur.
  async function lireNotifications() {
    const { data, error } = await supabasePublic
      .from("notifications_fournisseurs")
      .select("id, reception_id, sujet, corps, statut, donnees, mode_traitement, traite_par, traite_le, created_at, receptions(fournisseur_nom, date_livraison, heure_livraison, receptionne_par, receptions_photos_bon(url_photo, ordre))")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return (data || []).map((n) => {
      const r = n.receptions || {};
      const d = n.donnees || {};
      const photos = (r.receptions_photos_bon || []).slice().sort((a, b) => (a.ordre || 0) - (b.ordre || 0)).map((x) => x.url_photo);
      return {
        id: n.id, date: r.date_livraison || (n.created_at || "").slice(0, 10), heure: (r.heure_livraison || "").slice(0, 5),
        employeeId: r.receptionne_par || null, parNom: d.parNom || "", fournisseur: r.fournisseur_nom || d.fournisseur || "", sujet: n.sujet || "", corps: n.corps || "",
        receptionId: n.reception_id, photoBon: null, photosBon: photos, nonConformes: d.nonConformes || [],
        envoyee: n.statut === "envoye", genereParIA: false, modeTraitement: n.mode_traitement || "", traiteParId: n.traite_par || null, traiteLe: n.traite_le || null,
      };
    });
  }

  async function persisterNotifications(avant, apres) {
    const mapAvant = new Map(avant.map((x) => [x.id, x]));
    let modifie = false;
    for (const x of apres) {
      const o = mapAvant.get(x.id);
      if (o && !o.envoyee && x.envoyee) {
        const { error } = await supabasePublic.from("notifications_fournisseurs").update({
          statut: "envoye", mode_traitement: x.modeTraitement || "mail",
          traite_par: EST_UUID.test(x.traiteParId || "") ? x.traiteParId : null, traite_le: x.traiteLe || new Date().toISOString(),
        }).eq("id", x.id);
        if (error) throw error;
        modifie = true;
      }
    }
    if (!modifie) return null;
    const lues = await lireNotifications();
    setListesFroid((prev) => (prev ? { ...prev, notifications: lues } : prev));
    return lues;
  }

  async function chargerListesFroid() {
    try {
      const [ra, rr, rs, rp, rh, receptionsLues, notificationsLues, re, rcu, rrf, rmc, rfi, rpm] = await Promise.all([
        supabasePublic.from("appareils").select("*").order("nom"),
        supabasePublic.from("releves_temperature").select("*").order("date_heure", { ascending: false }).limit(1000),
        supabasePublic.from("surveillances_temperature").select("*").order("detecte_le", { ascending: false }).limit(200),
        supabasePublic.from("planning_creneaux").select("*"),
        supabasePublic.from("huile_friture_tests").select("*").order("date", { ascending: false }).order("heure", { ascending: false }).limit(300),
        lireReceptions(),
        lireNotifications().catch(() => []),
        supabasePublic.from("etiquettes").select("*").order("cree_le", { ascending: false }).limit(500),
        supabasePublic.from("cuissons").select("*").order("heure_depart", { ascending: false }).limit(300),
        supabasePublic.from("refroidissements").select("*").order("heure_depart", { ascending: false }).limit(300),
        supabasePublic.from("maintiens_chaud").select("*").order("heure_debut", { ascending: false }).limit(300),
        supabasePublic.from("fiches_techniques").select("*").order("created_at", { ascending: true }).limit(500),
        supabasePublic.from("pms_taches").select("*").order("created_at", { ascending: true }).limit(500),
      ]);
      if (rfi.error) throw rfi.error;
      if (rpm.error) throw rpm.error;
      if (rcu.error) throw rcu.error;
      if (rrf.error) throw rrf.error;
      if (rmc.error) throw rmc.error;
      if (re.error) throw re.error;
      if (rh.error) throw rh.error;
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
        receptions: receptionsLues,
        notifications: notificationsLues,
        preparations: (re.data || []).map((r) => ({ ...(r.donnees || {}), id: r.id, jete: !!r.jete })),
        cuissons: (rcu.data || []).map((r) => ({ ...(r.donnees || {}), id: r.id })),
        refroidissements: (rrf.data || []).map((r) => ({ ...(r.donnees || {}), id: r.id })),
        maintiens: (rmc.data || []).map((r) => ({ ...(r.donnees || {}), id: r.id })),
        fiches: (rfi.data || []).map((r) => ({ ...(r.donnees || {}), id: r.id })),
        cleaning: (rpm.data || []).map((r) => ({ fait: false, date: null, employeeId: null, ...(r.donnees || {}), id: r.id, tache: r.tache || (r.donnees && r.donnees.tache) || "", poste: r.poste || "Tous", frequence: r.frequence || "Quotidienne", note: r.protocole || "" })),
        huileTests: (rh.data || []).map((r) => ({
          id: r.id, employeeId: r.employe_id, date: r.date, heure: (r.heure || "").slice(0, 5),
          valeur: /matin/i.test(r.resultat || "") ? "Décision matin" : "Test bandelette", resultat: r.resultat || "", photo: r.photo_bandelette_url || null,
        })),
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

  async function chargerReglagesEtab() {
    try {
      const [re, rd] = await Promise.all([
        supabasePublic.from("etablissements").select("nom, congelation_decrite_pms, dispose_cellule_refroidissement").eq("id", session.etablissement.id).maybeSingle(),
        supabasePublic.from("demandes_ajout").select("type, valeur").eq("etablissement_id", session.etablissement.id).order("cree_le", { ascending: true }),
      ]);
      if (re.data) setReglagesEtab({ nom: re.data.nom || "", congelPms: !!re.data.congelation_decrite_pms, cellule: !!re.data.dispose_cellule_refroidissement });
      if (rd.data) setDemandesAjoutListe(rd.data);
    } catch (e) { console.error("Réglages de l'établissement non chargés :", e); }
  }
  async function enregistrerReglageEtab(champ, valeur) {
    const colonne = champ === "congelPms" ? "congelation_decrite_pms" : "dispose_cellule_refroidissement";
    setReglagesEtab((r) => (r ? { ...r, [champ]: !!valeur } : r));
    const { error } = await supabasePublic.from("etablissements").update({ [colonne]: !!valeur }).eq("id", session.etablissement.id);
    if (error) { console.error("Réglage non enregistré :", error); chargerReglagesEtab(); }
  }

  // Demande d'ajout à la liste de l'éditeur (ex. appareil de cuisson saisi à la main) : enregistrée pour être traitée lors d'une mise à jour.
  async function signalerAjout(type, valeur, contexte) {
    setDemandesAjoutListe((l) => [...l, { type, valeur }]); // visible tout de suite dans les listes de l'établissement
    try {
      const { error } = await supabasePublic.from("demandes_ajout").insert({
        etablissement_id: session.etablissement.id, type, valeur, contexte: contexte || null,
        demande_par: employeIdentifie && EST_UUID.test(employeIdentifie.id || "") ? employeIdentifie.id : null,
      });
      if (error) console.error("Demande d'ajout non enregistrée :", error);
    } catch (e) { console.error("Demande d'ajout non enregistrée :", e); }
  }

  // Allergènes / origine « norme » d'un produit (écran Contrôle & Gestion) : enregistrés dans la fiche du produit.
  async function enregistrerNormeProduit(nom, champ, valeur) {
    const v = (valeur || "").trim();
    const maj = champ === "allergenes"
      ? { allergenes_norme: v ? v.split(/[,;]+/).map((x) => x.trim()).filter(Boolean) : [] }
      : { origine_norme: v || null };
    const { error } = await supabasePublic.from("produits").update(maj).eq("nom", nom).eq("etablissement_id", session.etablissement.id);
    if (error) throw error;
  }

  // Modifications faites sur la liste des réceptions (validation par le chef) ; les ajouts passent par enregistrerReception.
  async function persisterReceptions(avant, apres) {
    const mapAvant = new Map(avant.map((x) => [x.id, x]));
    for (const x of apres) {
      const o = mapAvant.get(x.id);
      if (o && !!o.valideChef !== !!x.valideChef && EST_UUID.test(x.id || "")) {
        const { error } = await supabasePublic.from("receptions_lignes").update({ valide_chef: !!x.valideChef }).eq("id", x.id);
        if (error) throw error;
      }
    }
    return null;
  }

  // Enregistre une réception validée : stock (quantités), lots (n° de lot, DLC…), en-tête, lignes et photos du bon.
  async function enregistrerReception(entrees, photosBon, meta) {
    const etab = session.etablissement.id;
    const norm = (t) => String(t || "").trim().toLowerCase();
    const fournisseur = (fournisseursCat || []).find((f) => norm(f.nom) === norm(meta.fournisseur));
    let idFournisseur = fournisseur ? fournisseur.id : null;
    // Fournisseur inconnu (dépannage dans un magasin, par ex.) : créé tout de suite, avec le rappel « en attente des coordonnées ».
    if (!idFournisseur && String(meta.fournisseur || "").trim()) {
      const { data: nouveau, error: errF } = await supabasePublic.from("fournisseurs").insert({
        etablissement_id: etab, nom: String(meta.fournisseur).trim(), coordonnees_a_completer: true,
      }).select("id").single();
      if (errF) throw errF;
      idFournisseur = nouveau.id;
    }
    const catalogueCourant = (catalogue || []).map((c) => ({ id: c.id, nom: c.nom, reference: c.reference, conservation: c.conservation || "", quantite: Number(c.quantite) || 0 }));
    // Même référence → même produit. Sinon même nom ET même type (un produit frais et le même surgelé sont deux articles distincts) ;
    // un article déjà existant sans type précisé adopte celui de la réception.
    const trouver = (e) => {
      const parRef = e.reference && catalogueCourant.find((c) => norm(c.reference) === norm(e.reference));
      if (parRef) return parRef;
      const memeNom = catalogueCourant.filter((c) => norm(c.nom) === norm(e.produit));
      if (!e.conservation) return memeNom[0];
      const memeType = memeNom.find((c) => c.conservation === e.conservation);
      if (memeType) return memeType;
      // Un article de même nom sans type précisé n'est utilisé que si l'employé l'a explicitement demandé (e.fusion === "existant").
      return e.fusion === "existant" ? memeNom.find((c) => !c.conservation) : undefined;
    };
    const adoptions = new Map();

    // 1. Stock : on ajoute la quantité acceptée à chaque produit (ou on le crée s'il est inconnu).
    const idProduitParLigne = {};
    const modifies = new Set();
    for (const e of entrees) {
      const qte = Number(e.quantite) || 0;
      if (qte <= 0 || !String(e.produit || "").trim()) continue;
      let c = trouver(e);
      if (c) {
        c.quantite += qte;
        modifies.add(c.id);
        if (!c.conservation && e.conservation) { c.conservation = e.conservation; adoptions.set(c.id, e.conservation); }
      } else {
        const { data, error } = await supabasePublic.from("produits").insert({
          etablissement_id: etab, nom: String(e.produit).trim(), reference: e.reference || null, unite: "kg",
          fournisseur_id: idFournisseur, quantite_stock: qte, quantite_cible: 0,
          conservation: e.conservation || null, categorie: (e.categorie || "").trim() || ({ surgele: "Surgelés", viande: "Viandes", poisson: "Poissons", legume: "Fruits et légumes", frais: "Frais / laitier", sec: "Épicerie sèche", boisson: "Boissons", emballage: "Emballages", entretien: "Entretien", autre: "Autres" }[e.conservation] || null),
        }).select("id").single();
        if (error) throw error;
        c = { id: data.id, nom: String(e.produit).trim(), reference: e.reference || "", conservation: e.conservation || "", quantite: qte };
        catalogueCourant.push(c);
      }
      idProduitParLigne[e.id] = c.id;
    }
    for (const id of modifies) {
      const c = catalogueCourant.find((x) => x.id === id);
      const { error } = await supabasePublic.from("produits").update(adoptions.has(id) ? { quantite_stock: c.quantite, conservation: adoptions.get(id) } : { quantite_stock: c.quantite }).eq("id", id);
      if (error) throw error;
    }

    // 2. Lots (un lot par produit réceptionné avec une quantité acceptée).
    const lotParLigne = {};
    for (const e of entrees) {
      const produitId = idProduitParLigne[e.id];
      if (!produitId) continue;
      const allergenes = String(e.allergenes || "").split(/[,;]/).map((t) => t.trim()).filter(Boolean);
      const { data, error } = await supabasePublic.from("lots_produits").insert({
        etablissement_id: etab, produit_id: produitId, numero_lot: e.lot || null, dlc: e.dlc || null,
        quantite_recue: Number(e.quantite) || 0, quantite_restante: Number(e.quantite) || 0,
        allergenes_lot: allergenes.length ? allergenes : null, origine_lot: e.origine || null, agrement_sanitaire_lot: e.agrementSanitaire || null,
        date_reception: new Date(`${meta.date}T${meta.heure || "00:00"}:00`).toISOString(),
      }).select("id").single();
      if (error) throw error;
      lotParLigne[e.id] = data.id;
    }

    // 3. En-tête, lignes et photos du bon de livraison.
    const { data: rec, error: errRec } = await supabasePublic.from("receptions").insert({
      etablissement_id: etab, fournisseur_id: idFournisseur, fournisseur_nom: meta.fournisseur || null,
      receptionne_par: EST_UUID.test(entrees[0] && entrees[0].employeeId || "") ? entrees[0].employeeId : null,
      date_livraison: meta.date, heure_livraison: meta.heure || null,
    }).select("id").single();
    if (errRec) throw errRec;
    const lignes = entrees.map((e) => ({
      reception_id: rec.id, produit_id: idProduitParLigne[e.id] || null, produit_nom: e.produit || null, reference: e.reference || null,
      quantite: Number(e.quantite) || 0, lot_cree_id: lotParLigne[e.id] || null, lot: e.lot || null, dlc: e.dlc || null,
      allergenes: e.allergenes || null, origine: e.origine || null, agrement_sanitaire: e.agrementSanitaire || null,
      conforme: e.conforme !== false, motif_non_conformite: e.raison || null, quantite_nc: Number(e.quantiteNC) || 0,
      ecart_prix: Number(e.ecartPrix) || 0, photo_nc_url: e.photoNC || null, valide_chef: false,
      conservation: e.conservation || null, temperature_controlee: e.temperature == null || Number.isNaN(Number(e.temperature)) ? null : Number(e.temperature),
    }));
    if (lignes.length) {
      const { error } = await supabasePublic.from("receptions_lignes").insert(lignes);
      if (error) throw error;
    }
    if (photosBon && photosBon.length) {
      const { error } = await supabasePublic.from("receptions_photos_bon").insert(photosBon.map((u, i) => ({ reception_id: rec.id, url_photo: u, ordre: i })));
      if (error) throw error;
    }

    // Notification de retour fournisseur, destinée au chef et au directeur.
    if (meta.notification) {
      const nt = meta.notification;
      const { error } = await supabasePublic.from("notifications_fournisseurs").insert({
        reception_id: rec.id, fournisseur_id: idFournisseur, sujet: nt.sujet || null, corps: (nt.corps && meta.receptionIdLocal ? nt.corps.split(String(meta.receptionIdLocal).slice(0, 8)).join(rec.id.slice(0, 8)) : nt.corps) || null, statut: "en_attente",
        ecart_prix: Number(nt.ecartPrix) || 0, donnees: { fournisseur: meta.fournisseur || "", parNom: meta.parNom || "", nonConformes: nt.nonConformes || [] },
      });
      if (error) throw error;
    }

    // 4. Rechargement : le stock (quantités, lot, DLC), la liste des réceptions et les notifications.
    await chargerCatalogue();
    const lues = await lireReceptions();
    const notifs = await lireNotifications().catch(() => null);
    setListesFroid((prev) => (prev ? { ...prev, receptions: lues, ...(notifs ? { notifications: notifs } : {}) } : prev));
  }

  // Pour un chef/directeur (codeDirection fourni), la liste contient aussi les e-mails.
  async function chargerEquipe(jeton, codeDirection) {
    try {
      const data = codeDirection
        ? await appelerEmployes(jeton, "lister_avec_emails", { code: codeDirection })
        : await appelerEmployes(jeton, "lister", {});
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
      await appelerEmployes(session.token, "creer", { nom: nouveauNom, poste: nouveauPoste, role: nouveauRole, code: nouveauCode, email: nouvelEmail.trim() });
      setNouveauNom(""); setNouveauPoste(""); setNouveauCode(""); setNouvelEmail(""); setAfficherAjout(false);
      await chargerEquipe(session.token, estChefOuDirecteur(employeIdentifie.role) ? code : null);
    } catch (e2) {
      setErreurEquipe("Impossible d'ajouter cet employé : " + e2.message);
    } finally {
      setEnregistrement(false);
    }
  }

  // Arrivée par un lien d'invitation (?rejoindre=...) : ouvre la session de l'établissement sans mot de passe.
  useEffect(() => {
    let jetonInvitation = null;
    try { jetonInvitation = new URLSearchParams(window.location.search).get("rejoindre"); } catch (e) { /* ignore */ }
    if (!jetonInvitation || invitationDejaTraitee) return;
    invitationDejaTraitee = true;
    setArriveeParLien(true); setEnCours(true);
    (async () => {
      try {
        const rep = await appelerInvitation(null, "echanger", { token: jetonInvitation });
        const { data, error } = await supabasePublic.auth.verifyOtp({ token_hash: rep.token_hash, type: rep.type });
        if (error) throw error;
        const meta = data.user.user_metadata || {};
        setSession({
          token: data.session.access_token,
          etablissement: { id: meta.etablissement_id, nom: meta.nom_etablissement || "(nom inconnu)" },
        });
        setEtape("code");
        try { window.history.replaceState(null, "", window.location.pathname + "?nouveau-login=1"); } catch (e) { /* ignore */ }
      } catch (e2) {
        setErreur("Invitation impossible : " + e2.message);
      } finally {
        setEnCours(false);
      }
    })();
  }, []);

  async function creerInvitation(emp) {
    setInvitationEnCours(true); setLienCopie(false);
    setInvitation({ employe: emp, chargement: true });
    try {
      const rep = await appelerInvitation(session.token, "creer", { code, employe_id: emp.id });
      const lien = `${window.location.origin}${window.location.pathname}?nouveau-login=1&rejoindre=${rep.token}`;
      setInvitation({ employe: emp, lien, expire: rep.expire_le });
    } catch (e2) {
      setInvitation({ employe: emp, erreur: e2.message });
    } finally {
      setInvitationEnCours(false);
    }
  }

  async function copierLien() {
    try { await navigator.clipboard.writeText(invitation.lien); setLienCopie(true); } catch (e) { window.prompt("Copiez ce lien :", invitation.lien); }
  }

  async function modifierEmailEmploye(emp) {
    const saisie = window.prompt(`Adresse e-mail de ${emp.nom} (laisser vide pour effacer) :`, emp.email || "");
    if (saisie === null) return;
    setErreurEquipe("");
    try {
      await appelerEmployes(session.token, "modifier_email", { code, employe_id: emp.id, email: saisie.trim() });
      await chargerEquipe(session.token, code);
    } catch (e2) {
      setErreurEquipe("Impossible d'enregistrer l'e-mail : " + e2.message);
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
      chargerEquipe(session.token, estChefOuDirecteur(data.employe.role) ? code : null);
      chargerCatalogue();
      chargerListesFroid();
      chargerReglagesEtab();
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
      gestionReceptions: catalogue ? { enregistrer: enregistrerReception } : undefined,
      signalerAjout,
      // Autorisation ponctuelle : le responsable cuisine / directeur saisit son code pour débloquer une action réservée.
      verifierCodeChef: async (codeSaisi) => {
        const data = await appelerEmployes(session.token, "verifier", { code: codeSaisi });
        return estChefOuDirecteur(data.employe.role) ? { ok: true, nom: data.employe.nom } : { ok: false };
      },
      reglagesEtablissement: reglagesEtab ? { ...reglagesEtab, enregistrer: enregistrerReglageEtab } : undefined,
      demandesAjout: demandesAjoutListe,
      gestionNormes: catalogue ? { produit: enregistrerNormeProduit } : undefined,
      listes: listesFroid || undefined,
      gestionListes: listesFroid ? {
        equipements: { persister: fabriquerPersisterFroid("equipements") },
        releves: { persister: fabriquerPersisterFroid("releves") },
        surveillances: { persister: fabriquerPersisterFroid("surveillances") },
        huileTests: { persister: fabriquerPersisterFroid("huileTests") },
        receptions: { persister: persisterReceptions },
        notifications: { persister: persisterNotifications },
        preparations: { persister: fabriquerPersisterFroid("preparations") },
        cuissons: { persister: fabriquerPersisterFroid("cuissons") },
        refroidissements: { persister: fabriquerPersisterFroid("refroidissements") },
        maintiens: { persister: fabriquerPersisterFroid("maintiens") },
        fiches: { persister: fabriquerPersisterFroid("fiches") },
        cleaning: { persister: fabriquerPersisterFroid("cleaning") },
        shifts: { persister: fabriquerPersisterFroid("shifts") },
      } : undefined,
      // Équipe réelle de l'établissement (nouvelle base), au format attendu par l'application.
      equipe: (equipe || []).map((e) => ({
        id: e.id, nom: e.nom, poste: e.poste || "", estChef: estChefOuDirecteur(e.role), estDirection: e.role === "directeur",
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
              (Version de prévisualisation : les données sont enregistrées dans la nouvelle base, sur l'établissement de test.)
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
                      <span>
                        {e.nom}
                        {estChefOuDirecteur(employeIdentifie.role) && (
                          <button type="button" onClick={() => modifierEmailEmploye(e)} className="block text-xs text-[var(--accent)]">
                            {e.email ? e.email : "+ Ajouter un e-mail"}
                          </button>
                        )}
                      </span>
                      <span className="text-[var(--steel)] text-xs text-right">
                        {e.role}{e.poste ? ` — ${e.poste}` : ""}
                        {estChefOuDirecteur(employeIdentifie.role) && (
                          <button type="button" onClick={() => creerInvitation(e)} disabled={invitationEnCours} className="block ml-auto text-[var(--accent)] font-medium">
                            Inviter (QR / lien)
                          </button>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {erreurEquipe && <p className="text-xs mb-2" style={{ color: "var(--warn)" }}>{erreurEquipe}</p>}

              {invitation && (
                <div className="mb-3 p-3 rounded-md" style={{ background: "var(--accent-soft)" }}>
                  <p className="text-sm font-semibold text-[var(--ink)] mb-1">Invitation pour {invitation.employe.nom}</p>
                  {invitation.chargement && <p className="text-xs text-[var(--steel)]">Création du lien…</p>}
                  {invitation.erreur && <p className="text-xs" style={{ color: "var(--warn)" }}>{invitation.erreur}</p>}
                  {invitation.lien && (
                    <>
                      <p className="text-xs text-[var(--steel)] mb-2">
                        À scanner avec le téléphone, ou à envoyer. Valable 7 jours, une seule utilisation. L'employé tapera ensuite son code personnel.
                      </p>
                      <div className="flex justify-center mb-2"><QrSvg texte={invitation.lien} /></div>
                      <input className={inputCls} readOnly value={invitation.lien} onFocus={(ev) => ev.target.select()} />
                      <div className="flex flex-wrap gap-3 mt-2">
                        <button type="button" onClick={copierLien} className="text-sm text-[var(--accent)] font-medium">{lienCopie ? "Lien copié ✓" : "Copier le lien"}</button>
                        {typeof navigator !== "undefined" && navigator.share && (
                          <button type="button" onClick={() => navigator.share({ title: "Ma Cuisine", text: "Votre invitation à rejoindre Ma Cuisine :", url: invitation.lien }).catch(() => {})} className="text-sm text-[var(--accent)] font-medium">Partager…</button>
                        )}
                        {invitation.employe.email && (
                          <a
                            className="text-sm text-[var(--accent)] font-medium"
                            href={`mailto:${invitation.employe.email}?subject=${encodeURIComponent("Votre accès à Ma Cuisine")}&body=${encodeURIComponent(`Bonjour ${invitation.employe.nom},\n\nVoici votre lien pour accéder à Ma Cuisine sur votre téléphone (valable 7 jours, une seule utilisation) :\n${invitation.lien}\n\nVous taperez ensuite votre code personnel à 4 chiffres.`)}`}
                          >
                            Envoyer par e-mail
                          </a>
                        )}
                      </div>
                    </>
                  )}
                  <button type="button" onClick={() => setInvitation(null)} className="text-xs text-[var(--steel)] mt-2">Fermer</button>
                </div>
              )}

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
                    type="email"
                    autoComplete="off"
                    placeholder="E-mail de l'employé (facultatif)"
                    value={nouvelEmail}
                    onChange={(e) => setNouvelEmail(e.target.value)}
                  />
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
          {arriveeParLien && enCours && <p className="text-sm text-[var(--steel)] mb-3">Ouverture de votre invitation…</p>}
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
