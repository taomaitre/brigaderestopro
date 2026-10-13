// Fonction serveur "code employé" (v6 déployée). Actions avec session établissement (en-tête Authorization) :
//   creer, verifier, lister, lister_avec_emails, modifier_email, supprimer, inviter
// Actions sans session : lien_code, definir_code (l'employé choisit son code via son lien d'invitation).
// Le code à 4 chiffres n'est JAMAIS comparé côté navigateur.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DUREE_JOURS = 7;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

const RE_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SERVICES_VALIDES = ["Cuisine", "Plonge", "Service", "Réception", "Stock", "Nettoyage", "Gestion"];

async function sha256(texte: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texte));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, erreur: "Méthode non supportée." }, 405);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, erreur: "Corps de requête JSON invalide." }, 400);
  }
  const action = String(body?.action || "");

  // ---------- Actions publiques : l'employé choisit son code via son lien ----------
  if (action === "lien_code" || action === "definir_code") {
    const token = String(body?.token || "");
    if (!/^[0-9a-f]{64}$/.test(token)) return json({ ok: false, erreur: "Lien invalide." }, 400);
    const { data: inv } = await admin.from("invitations_code").select("id, etablissement_id, employe_id, expire_le, utilisee_le").eq("token_hash", await sha256(token)).maybeSingle();
    if (!inv) return json({ ok: false, erreur: "Lien invalide." }, 404);
    if (inv.utilisee_le) return json({ ok: false, erreur: "Ce lien a déjà été utilisé. Demandez-en un nouveau à votre responsable." }, 410);
    if (new Date(inv.expire_le).getTime() < Date.now()) return json({ ok: false, erreur: "Ce lien a expiré. Demandez-en un nouveau à votre responsable." }, 410);
    const { data: emp } = await admin.from("utilisateurs").select("id, nom, prenom, statut").eq("id", inv.employe_id).eq("etablissement_id", inv.etablissement_id).maybeSingle();
    if (!emp || emp.statut !== "actif") return json({ ok: false, erreur: "Ce compte n'existe plus." }, 404);
    const nomAffiche = [emp.prenom, emp.nom].filter(Boolean).join(" ");

    if (action === "lien_code") return json({ ok: true, nom: nomAffiche });

    const code = String(body?.code || "");
    if (!/^[0-9]{4}$/.test(code)) return json({ ok: false, erreur: "Le code doit être composé d'exactement 4 chiffres." }, 400);
    if (/^(\d)\1{3}$/.test(code) || code === "1234" || code === "4321") return json({ ok: false, erreur: "Ce code est trop facile à deviner. Choisissez-en un autre." }, 400);

    const { data: autres } = await admin.from("utilisateurs").select("id, code_personnel_hash").eq("etablissement_id", inv.etablissement_id).eq("statut", "actif").neq("id", emp.id);
    if ((autres || []).some((e: any) => e.code_personnel_hash && bcrypt.compareSync(code, e.code_personnel_hash))) {
      return json({ ok: false, erreur: "Ce code est déjà utilisé par un collègue. Choisissez-en un autre." }, 409);
    }

    const { data: marque } = await admin.from("invitations_code").update({ utilisee_le: new Date().toISOString() }).eq("id", inv.id).is("utilisee_le", null).select("id");
    if (!marque || marque.length === 0) return json({ ok: false, erreur: "Ce lien a déjà été utilisé." }, 410);

    const { error } = await admin.from("utilisateurs").update({ code_personnel_hash: bcrypt.hashSync(code, 10) }).eq("id", emp.id);
    if (error) return json({ ok: false, erreur: "Échec de l'enregistrement du code.", detail: error.message }, 500);
    return json({ ok: true, nom: nomAffiche });
  }

  // ---------- Actions avec session établissement ----------
  const enTeteAuth = req.headers.get("authorization") || "";
  const jeton = enTeteAuth.replace(/^Bearer\s+/i, "");
  if (!jeton) return json({ ok: false, erreur: "Non connecté (jeton établissement manquant)." }, 401);

  const { data: infosUtilisateur, error: erreurJeton } = await admin.auth.getUser(jeton);
  if (erreurJeton || !infosUtilisateur?.user) {
    return json({ ok: false, erreur: "Session établissement invalide ou expirée." }, 401);
  }
  const etablissementId = infosUtilisateur.user.user_metadata?.etablissement_id;
  if (!etablissementId) return json({ ok: false, erreur: "Jeton sans établissement associé." }, 401);

  async function trouverDirection(code: string): Promise<{ id: string } | null> {
    if (!/^[0-9]{4}$/.test(code)) return null;
    const { data } = await admin
      .from("utilisateurs")
      .select("id, role, code_personnel_hash")
      .eq("etablissement_id", etablissementId)
      .eq("statut", "actif")
      .in("role", ["chef", "directeur"]);
    const trouve = (data || []).find((e: any) => e.code_personnel_hash && bcrypt.compareSync(code, e.code_personnel_hash));
    return trouve ? { id: trouve.id } : null;
  }
  async function verifierDirection(code: string): Promise<boolean> {
    return (await trouverDirection(code)) !== null;
  }

  if (action === "creer") {
    const nom = String(body?.nom || "").trim();
    const prenom = String(body?.prenom || "").trim();
    const poste = String(body?.poste || "").trim();
    const role = String(body?.role || "").trim();
    const code = String(body?.code || "");
    const email = String(body?.email || "").trim().toLowerCase();
    const services = (Array.isArray(body?.services) ? body.services : []).filter((s: any) => SERVICES_VALIDES.includes(s));
    if (!nom) return json({ ok: false, erreur: "Le nom de l'employé est requis." }, 400);
    if (!role) return json({ ok: false, erreur: "Le rôle (statut dans la brigade) est requis." }, 400);
    if (email && !RE_EMAIL.test(email)) return json({ ok: false, erreur: "Adresse e-mail invalide." }, 400);
    if (code && !/^[0-9]{4}$/.test(code)) return json({ ok: false, erreur: "Le code doit être composé d'exactement 4 chiffres." }, 400);
    if (!code && !email) return json({ ok: false, erreur: "Sans code, l'adresse e-mail est obligatoire : l'employé choisira son code par e-mail." }, 400);

    const { data, error } = await admin
      .from("utilisateurs")
      .insert({ etablissement_id: etablissementId, nom, prenom: prenom || null, poste: poste || null, role, services, code_personnel_hash: code ? bcrypt.hashSync(code, 10) : null, statut: "actif", email: email || null })
      .select("id, nom, prenom, poste, role")
      .single();

    if (error) return json({ ok: false, erreur: "Échec de la création de l'employé.", detail: error.message }, 500);
    return json({ ok: true, employe: data });
  }

  if (action === "lister") {
    const { data, error } = await admin
      .from("utilisateurs")
      .select("id, nom, prenom, poste, role, statut, services, code_personnel_hash")
      .eq("etablissement_id", etablissementId)
      .eq("statut", "actif")
      .order("created_at", { ascending: true });
    if (error) return json({ ok: false, erreur: "Échec de la lecture des employés.", detail: error.message }, 500);
    return json({ ok: true, employes: (data || []).map(({ code_personnel_hash, ...e }: any) => ({ ...e, code_defini: !!code_personnel_hash })) });
  }

  if (action === "lister_avec_emails") {
    if (!(await verifierDirection(String(body?.code || "")))) return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    const { data, error } = await admin
      .from("utilisateurs")
      .select("id, nom, prenom, poste, role, statut, services, email, code_personnel_hash")
      .eq("etablissement_id", etablissementId)
      .eq("statut", "actif")
      .order("created_at", { ascending: true });
    if (error) return json({ ok: false, erreur: "Échec de la lecture des employés.", detail: error.message }, 500);
    return json({ ok: true, employes: (data || []).map(({ code_personnel_hash, ...e }: any) => ({ ...e, code_defini: !!code_personnel_hash })) });
  }

  if (action === "modifier_email") {
    if (!(await verifierDirection(String(body?.code || "")))) return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    const employeId = String(body?.employe_id || "");
    const email = String(body?.email || "").trim().toLowerCase();
    if (email && !RE_EMAIL.test(email)) return json({ ok: false, erreur: "Adresse e-mail invalide." }, 400);
    const { error } = await admin
      .from("utilisateurs")
      .update({ email: email || null })
      .eq("id", employeId)
      .eq("etablissement_id", etablissementId);
    if (error) return json({ ok: false, erreur: "Échec de l'enregistrement de l'e-mail.", detail: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "supprimer") {
    const appelant = await trouverDirection(String(body?.code || ""));
    if (!appelant) return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    const employeId = String(body?.employe_id || "");
    if (employeId === appelant.id) return json({ ok: false, erreur: "Impossible de supprimer le compte avec lequel vous êtes connecté." }, 400);
    const { data: cible } = await admin.from("utilisateurs").select("id, role").eq("id", employeId).eq("etablissement_id", etablissementId).eq("statut", "actif").maybeSingle();
    if (!cible) return json({ ok: false, erreur: "Compte introuvable." }, 404);
    if (cible.role === "chef" || cible.role === "directeur") {
      const { data: dir } = await admin.from("utilisateurs").select("id").eq("etablissement_id", etablissementId).eq("statut", "actif").in("role", ["chef", "directeur"]).neq("id", employeId);
      if (!dir || dir.length === 0) return json({ ok: false, erreur: "Impossible de supprimer le dernier chef ou directeur." }, 400);
    }
    const { error } = await admin.from("utilisateurs").update({ statut: "supprime" }).eq("id", employeId).eq("etablissement_id", etablissementId);
    if (error) return json({ ok: false, erreur: "Échec de la suppression.", detail: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "inviter") {
    if (!(await verifierDirection(String(body?.code || "")))) return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    const employeId = String(body?.employe_id || "");
    const origine = String(body?.origine || "");
    if (!/^https:\/\/[^\s]+$/.test(origine) && !/^http:\/\/localhost(:\d+)?\/?[^\s]*$/.test(origine)) return json({ ok: false, erreur: "Adresse de l'application invalide." }, 400);
    const { data: emp } = await admin.from("utilisateurs").select("id, nom, prenom, email, statut").eq("id", employeId).eq("etablissement_id", etablissementId).eq("statut", "actif").maybeSingle();
    if (!emp) return json({ ok: false, erreur: "Compte introuvable." }, 404);
    if (!emp.email) return json({ ok: false, erreur: "Cet employé n'a pas d'adresse e-mail." }, 400);

    const octets = crypto.getRandomValues(new Uint8Array(32));
    const token = Array.from(octets).map((b) => b.toString(16).padStart(2, "0")).join("");
    const expire = new Date(Date.now() + DUREE_JOURS * 24 * 3600 * 1000).toISOString();
    await admin.from("invitations_code").update({ utilisee_le: new Date().toISOString() }).eq("employe_id", emp.id).is("utilisee_le", null);
    const { error } = await admin.from("invitations_code").insert({ etablissement_id: etablissementId, employe_id: emp.id, token_hash: await sha256(token), expire_le: expire });
    if (error) return json({ ok: false, erreur: "Échec de la création de l'invitation.", detail: error.message }, 500);

    const lien = `${origine}${origine.includes("?") ? "&" : "?"}definir-code=${token}`;
    const nomAffiche = [emp.prenom, emp.nom].filter(Boolean).join(" ");

    const cleResend = Deno.env.get("RESEND_API_KEY");
    const expediteur = Deno.env.get("MAIL_EXPEDITEUR");
    let envoye = false;
    let erreurEnvoi = "";
    if (cleResend && expediteur) {
      try {
        const rep = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${cleResend}` },
          body: JSON.stringify({
            from: expediteur,
            to: [emp.email],
            subject: "Votre accès à Ma Cuisine : choisissez votre code",
            text: `Bonjour ${nomAffiche},\n\nVotre compte Ma Cuisine a été créé. Pour finir, choisissez votre code personnel à 4 chiffres avec ce lien (valable 7 jours, un seul usage) :\n${lien}\n\nCe code vous servira à vous connecter. Ne le communiquez à personne.`,
          }),
        });
        envoye = rep.ok;
        if (!rep.ok) erreurEnvoi = `Service d'envoi : erreur ${rep.status}`;
      } catch (e) {
        erreurEnvoi = "Service d'envoi injoignable.";
      }
    }
    return json({ ok: true, lien, expire_le: expire, envoye, erreur_envoi: erreurEnvoi || undefined, envoi_configure: !!(cleResend && expediteur) });
  }

  if (action === "verifier") {
    const code = String(body?.code || "");
    if (!/^[0-9]{4}$/.test(code)) return json({ ok: false, erreur: "Code invalide." }, 400);

    const { data: employes, error } = await admin
      .from("utilisateurs")
      .select("id, nom, prenom, poste, role, code_personnel_hash, statut")
      .eq("etablissement_id", etablissementId)
      .eq("statut", "actif");
    if (error) return json({ ok: false, erreur: "Échec de la vérification.", detail: error.message }, 500);

    const trouve = (employes || []).find((e: any) => e.code_personnel_hash && bcrypt.compareSync(code, e.code_personnel_hash));
    if (!trouve) return json({ ok: false, erreur: "Code incorrect." }, 401);

    return json({ ok: true, employe: { id: trouve.id, nom: [trouve.prenom, trouve.nom].filter(Boolean).join(" "), poste: trouve.poste, role: trouve.role } });
  }

  return json({ ok: false, erreur: "Action inconnue." }, 400);
});
