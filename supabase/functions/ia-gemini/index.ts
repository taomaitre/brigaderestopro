// Fonction serveur "ia-gemini" (v4 déployée). Seul endroit qui connaît la clé Gemini (secret GEMINI_API_KEY).
// Session établissement obligatoire. Types : statut | photo | commande.
// Garde-fous : IA activée et non bloquée ; forfait mensuel (3000 photos, 1000 commandes) ; appels notés dans ia_consommation.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const MODELES = [Deno.env.get("GEMINI_MODEL") || "gemini-3.1-flash-lite-preview", "gemini-flash-lite-latest"];

const FORFAIT_PHOTOS = 3000;
const FORFAIT_COMMANDES = 1000;
const TAILLE_IMAGE_MAX = 6_000_000;
const PRIX_ENTREE_USD_M = 0.25;
const PRIX_SORTIE_USD_M = 1.5;
const USD_VERS_EUR = 0.9;

const TYPES_PHOTO = ["photo_reception", "photo_tracabilite", "photo_fiche_technique"];
const TYPES_COMMANDE = ["commande_vocale"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

function consigneCommande(texte: string): string {
  return `Tu es l'assistant vocal d'une application de gestion de cuisine de restaurant (français). Un employé vient de dire ou taper une commande rapide, parfois mal transcrite par la reconnaissance vocale. Classe-la dans UNE action et extrais les paramètres. Réponds UNIQUEMENT en JSON strict, sans texte autour, sans balises markdown.

Actions possibles :
- "ouvrir_fiche" : l'employé veut la FICHE TECHNIQUE / la recette d'un produit ou d'un plat précis. Mots : fiche, fiche technique, recette, "comment on fait", "les grammages". Paramètre : produit.
- "etiquette_dlc" : l'employé veut une ou plusieurs ÉTIQUETTES d'un produit ou d'un plat précis. Mots : étiquette(s), DLC, DDM, date limite, imprimer, "date de fabrication". Paramètres : produit ; quantite = NOMBRE d'étiquettes demandé (entier, "quatre" = 4, "une" = 1 ; 1 si non précisé).
- "demarrer_cuisson" : démarrer une CUISSON d'un produit précis. Mots : cuisson, cuire, faire cuire, four, plancha, poêle, grill, "mettre au four". Paramètre : produit.
- "demarrer_refroidissement" : démarrer un REFROIDISSEMENT d'un produit précis. Mots : refroidissement, refroidir, cellule, "cellule de refroidissement", abattre, abattage, "mettre en cellule". Paramètre : produit.
- "demarrer_maintien_chaud" : démarrer un MAINTIEN AU CHAUD d'un produit précis. Mots : maintien au chaud, bain-marie, "garder au chaud", "tenir au chaud", passe chaude. Paramètre : produit.
- "retirer_stock" : retirer une quantité d'un produit du stock (cassé, tombé, raté, perdu, abîmé, jeté...). Paramètres : produit, quantite (nombre ; estime une valeur raisonnable si approximatif), motif (raison courte).
- "ouvrir_reception" : réceptionner une livraison / commencer une réception de marchandises.
- "naviguer" : ouvrir un onglet SANS nommer de produit ni de plat. Paramètre cible = UNE valeur EXACTE parmi : taches (tâches, to-do, liste du jour), stock (stock, inventaire, réserve), reception (réception, livraison, camion), etiquettes (étiquettes, DLC), tracabilite (traçabilité), haccpTemp (températures, frigo, chambre froide, congélateur, relevé de température), haccpRefroid (refroidissement, cellule), haccpHuile (huile, friteuse), haccpChaud (maintien au chaud, bain-marie), haccpCuisson (cuisson), fiches (fiches techniques, recettes), controle (contrôle, gestion, chef). Si un produit ou un plat est nommé, ce n'est JAMAIS "naviguer".
- "inconnu" : si aucune action ne correspond clairement.

Règles :
- "produit" = UNIQUEMENT le nom du produit ou du plat, sans les mots d'action (fiche, technique, étiquette, DLC, recette, cuisson, cellule, ouvre, mets, de, du, la, les, un, une, nombre).
- La différence fiche / étiquette est essentielle : "fiche technique lasagne" = ouvrir_fiche ; "étiquette lasagne" ou "quatre étiquettes de lasagne" = etiquette_dlc. Ne les confonds jamais.
- Les relevés de température et l'impression restent des gestes volontaires de l'employé : tu ne fais que classer la demande.

Exemples :
"fiche technique bolognaise" -> {"action":"ouvrir_fiche","produit":"bolognaise"}
"quatre étiquettes de DLC des lasagnes" -> {"action":"etiquette_dlc","produit":"lasagnes","quantite":"4"}
"mets la lasagne en cellule" -> {"action":"demarrer_refroidissement","produit":"lasagne"}
"je mets le poulet au four" -> {"action":"demarrer_cuisson","produit":"poulet"}
"le riz au bain-marie" -> {"action":"demarrer_maintien_chaud","produit":"riz"}
"ouvre les étiquettes" -> {"action":"naviguer","cible":"etiquettes"}

Commande de l'employé : ${JSON.stringify(texte)}

Format de réponse strict : {"action": "...", "produit": "..." ou null, "quantite": "..." ou null, "motif": "..." ou null, "cible": "..." ou null}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, erreur: "Méthode non supportée." }, 405);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, erreur: "Corps de requête JSON invalide." }, 400); }
  const type = String(body?.type || "");
  if (!["statut", "photo", "commande"].includes(type)) return json({ ok: false, erreur: "Type inconnu." }, 400);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const jeton = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!jeton) return json({ ok: false, erreur: "Non connecté." }, 401);
  const { data: infos, error: errJeton } = await admin.auth.getUser(jeton);
  const etablissementId = infos?.user?.user_metadata?.etablissement_id;
  if (errJeton || !infos?.user || !etablissementId) return json({ ok: false, erreur: "Session invalide ou expirée." }, 401);

  const { data: etab } = await admin.from("etablissements").select("ia_active, ia_bloquee, ia_motif_blocage").eq("id", etablissementId).maybeSingle();
  const iaDisponible = !!etab && etab.ia_active === true && etab.ia_bloquee !== true && !!GEMINI_KEY;
  if (type === "statut") return json({ ok: true, ia_disponible: iaDisponible });
  if (!iaDisponible) return json({ ok: false, code: "ia_indisponible", erreur: "Les fonctions IA ne sont pas disponibles pour cet établissement." }, 403);

  const debutMois = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString();
  const typesCompte = type === "photo" ? TYPES_PHOTO : TYPES_COMMANDE;
  const { count: dejaUtilises } = await admin.from("ia_consommation").select("id", { count: "exact", head: true })
    .eq("etablissement_id", etablissementId).in("type_appel", typesCompte).gte("date_heure", debutMois);
  const plafond = type === "photo" ? FORFAIT_PHOTOS : FORFAIT_COMMANDES;
  if ((dejaUtilises || 0) >= plafond) return json({ ok: false, code: "forfait_depasse", erreur: "Forfait IA du mois atteint. Prévenez votre direction." }, 429);

  let parts: any[];
  let maxSortie: number;
  if (type === "photo") {
    const image = String(body?.image || "");
    const consigne = String(body?.consigne || "");
    const m = image.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!m) return json({ ok: false, erreur: "Image invalide." }, 400);
    if (image.length > TAILLE_IMAGE_MAX) return json({ ok: false, erreur: "Image trop lourde." }, 413);
    if (!consigne || consigne.length > 8000) return json({ ok: false, erreur: "Consigne invalide." }, 400);
    parts = [{ inline_data: { mime_type: m[1], data: m[2] } }, { text: consigne }];
    maxSortie = 4000;
  } else {
    const texte = String(body?.texte || "").trim();
    if (!texte || texte.length > 600) return json({ ok: false, erreur: "Commande invalide." }, 400);
    parts = [{ text: consigneCommande(texte) }];
    maxSortie = 1000;
  }

  let reponse: Response | null = null;
  let modeleUtilise = "";
  for (const modele of MODELES) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modele}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_KEY },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { maxOutputTokens: maxSortie, temperature: 0.2, responseMimeType: "application/json" },
      }),
    }).catch(() => null);
    if (!r) continue;
    if (r.status === 404) continue;
    reponse = r; modeleUtilise = modele; break;
  }
  if (!reponse) return json({ ok: false, erreur: "Service IA injoignable ou modèle introuvable." }, 502);
  if (!reponse.ok) {
    const detail = (await reponse.text().catch(() => "")).slice(0, 300);
    console.error("Gemini erreur", reponse.status, detail);
    const code = reponse.status === 429 ? "ia_saturee" : reponse.status === 402 || reponse.status === 403 ? "credit_ou_cle" : "ia_erreur";
    return json({ ok: false, code, erreur: "Le service IA a refusé la demande.", http: reponse.status }, 502);
  }

  const data: any = await reponse.json().catch(() => null);
  const texteSortie = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p?.text || "").join("");
  const u = data?.usageMetadata || {};
  const tIn = Number(u.promptTokenCount || 0);
  const tOut = Number(u.candidatesTokenCount || 0) + Number(u.thoughtsTokenCount || 0);
  const cout = ((tIn * PRIX_ENTREE_USD_M + tOut * PRIX_SORTIE_USD_M) / 1_000_000) * USD_VERS_EUR;

  const typeJournal = type === "photo" ? "photo_reception" : "commande_vocale";
  const { error: errLog } = await admin.from("ia_consommation").insert({ etablissement_id: etablissementId, type_appel: typeJournal, cout_estime_euros: Number(cout.toFixed(6)) });
  if (errLog) console.error("Journal IA non écrit", errLog.message);
  console.log(JSON.stringify({ ia: type, modele: modeleUtilise, tIn, tOut, cout_eur: Number(cout.toFixed(6)) }));

  if (!texteSortie) return json({ ok: false, code: "reponse_vide", erreur: "Aucune réponse exploitable." }, 502);
  return json({ ok: true, texte: texteSortie });
});
