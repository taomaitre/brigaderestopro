// Invitation d'un appareil (téléphone, tablette) à rejoindre un établissement sans taper le mot de passe de la société.
//   { action: "creer", code, employe_id? }  (Authorization = session établissement) -> réservé chef/directeur ; { token, expire_le } (7 jours, un seul usage, stocké en SHA-256)
//   { action: "echanger", token }  (sans connexion) -> { token_hash, type } pour supabase.auth.verifyOtp

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
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}
async function sha256(texte: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texte));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, erreur: "Méthode non supportée." }, 405);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, erreur: "Corps de requête JSON invalide." }, 400); }
  const action = String(body?.action || "");

  if (action === "creer") {
    const jeton = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jeton) return json({ ok: false, erreur: "Non connecté." }, 401);
    const { data: infos, error: errJeton } = await admin.auth.getUser(jeton);
    if (errJeton || !infos?.user) return json({ ok: false, erreur: "Session invalide ou expirée." }, 401);
    const etablissementId = infos.user.user_metadata?.etablissement_id;
    const authEmail = infos.user.email;
    if (!etablissementId || !authEmail) return json({ ok: false, erreur: "Jeton sans établissement associé." }, 401);

    const code = String(body?.code || "");
    if (!/^[0-9]{4}$/.test(code)) return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    const { data: direction } = await admin
      .from("utilisateurs").select("code_personnel_hash")
      .eq("etablissement_id", etablissementId).eq("statut", "actif").in("role", ["chef", "directeur"]);
    if (!(direction || []).some((e: any) => e.code_personnel_hash && bcrypt.compareSync(code, e.code_personnel_hash))) {
      return json({ ok: false, erreur: "Réservé au chef ou au directeur." }, 403);
    }

    let employeId: string | null = null;
    if (body?.employe_id) {
      const { data: emp } = await admin.from("utilisateurs").select("id")
        .eq("id", String(body.employe_id)).eq("etablissement_id", etablissementId).maybeSingle();
      employeId = emp?.id ?? null;
    }

    const octets = crypto.getRandomValues(new Uint8Array(32));
    const token = Array.from(octets).map((b) => b.toString(16).padStart(2, "0")).join("");
    const expire = new Date(Date.now() + DUREE_JOURS * 24 * 3600 * 1000).toISOString();
    const { error } = await admin.from("invitations_appareil").insert({
      etablissement_id: etablissementId, token_hash: await sha256(token), auth_email: authEmail, employe_id: employeId, expire_le: expire,
    });
    if (error) return json({ ok: false, erreur: "Échec de la création de l'invitation.", detail: error.message }, 500);
    return json({ ok: true, token, expire_le: expire });
  }

  if (action === "echanger") {
    const token = String(body?.token || "");
    if (!/^[0-9a-f]{64}$/.test(token)) return json({ ok: false, erreur: "Lien d'invitation invalide." }, 400);
    const { data: inv } = await admin.from("invitations_appareil").select("id, auth_email, expire_le, utilisee_le")
      .eq("token_hash", await sha256(token)).maybeSingle();
    if (!inv) return json({ ok: false, erreur: "Lien d'invitation invalide." }, 404);
    if (inv.utilisee_le) return json({ ok: false, erreur: "Ce lien a déjà été utilisé. Demandez-en un nouveau." }, 410);
    if (new Date(inv.expire_le).getTime() < Date.now()) return json({ ok: false, erreur: "Ce lien a expiré. Demandez-en un nouveau." }, 410);

    const { data: marque } = await admin.from("invitations_appareil").update({ utilisee_le: new Date().toISOString() })
      .eq("id", inv.id).is("utilisee_le", null).select("id");
    if (!marque || marque.length === 0) return json({ ok: false, erreur: "Ce lien a déjà été utilisé. Demandez-en un nouveau." }, 410);

    const { data: lien, error } = await admin.auth.admin.generateLink({ type: "magiclink", email: inv.auth_email });
    if (error || !lien?.properties?.hashed_token) return json({ ok: false, erreur: "Impossible d'ouvrir la session.", detail: error?.message }, 500);
    return json({ ok: true, token_hash: lien.properties.hashed_token, type: "magiclink" });
  }

  return json({ ok: false, erreur: "Action inconnue." }, 400);
});
