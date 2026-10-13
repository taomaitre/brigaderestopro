// Fonction d'authentification "compte établissement" pour BrigadeRestoPro.
// Action unique : { "action": "signup", "nom", "email", "password" }
// La connexion se fait côté navigateur avec supabase.auth.signInWithPassword.
// L'id de l'établissement = l'id du compte auth.users, recopié dans user_metadata.etablissement_id
// (lu par la fonction SQL etablissement_courant() pour l'isolation RLS).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, erreur: "Méthode non supportée." }, 405);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, erreur: "Corps de requête JSON invalide." }, 400);
  }

  const action = String(body?.action || "");
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) return json({ ok: false, erreur: "Email et mot de passe requis." }, 400);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  if (action === "signup") {
    const nom = String(body?.nom || "").trim();
    if (!nom) return json({ ok: false, erreur: "Le nom de l'établissement est requis." }, 400);
    if (password.length < 8) return json({ ok: false, erreur: "Le mot de passe doit faire au moins 8 caractères." }, 400);

    const { data: existant } = await admin.from("etablissements").select("id").eq("email_compte", email).maybeSingle();
    if (existant) return json({ ok: false, erreur: "Un compte existe déjà avec cet email." }, 409);

    const id = crypto.randomUUID();

    const { error: erreurAuth } = await admin.auth.admin.createUser({
      id,
      email,
      password,
      email_confirm: true,
      user_metadata: { etablissement_id: id, nom_etablissement: nom },
    });
    if (erreurAuth) return json({ ok: false, erreur: "Échec de la création du compte.", detail: erreurAuth.message }, 500);

    const { data, error } = await admin
      .from("etablissements")
      .insert({ id, nom, email_compte: email })
      .select("id, nom")
      .single();

    if (error) {
      await admin.auth.admin.deleteUser(id);
      return json({ ok: false, erreur: "Échec de la création de l'établissement.", detail: error.message }, 500);
    }
    return json({ ok: true, etablissement: data });
  }

  return json({ ok: false, erreur: "Action inconnue (seul 'signup' est géré ici)." }, 400);
});
