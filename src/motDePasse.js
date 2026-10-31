// Règles du mot de passe de l'établissement (décision de Loïc, 29/10) : 12 caractères minimum, avec au moins une
// majuscule, une minuscule, un chiffre et un symbole. Les mêmes règles sont à régler côté serveur (Supabase).
export const LONGUEUR_MINIMALE = 12;
const TROP_COURANTS = ["motdepasse", "password", "azerty", "qwerty", "brigaderestopro", "123456", "000000", "111111", "bienvenue", "soleil", "marseille"];

export function reglesMotDePasse(mdp) {
  const m = String(mdp || "");
  return [
    { id: "longueur", ok: m.length >= LONGUEUR_MINIMALE, texte: `${LONGUEUR_MINIMALE} caractères au minimum` },
    { id: "majuscule", ok: /[A-ZÀ-ÖØ-Þ]/.test(m), texte: "Une majuscule" },
    { id: "minuscule", ok: /[a-zß-öø-ÿ]/.test(m), texte: "Une minuscule" },
    { id: "chiffre", ok: /\d/.test(m), texte: "Un chiffre" },
    { id: "symbole", ok: /[^A-Za-z0-9À-ÖØ-öø-ÿ\s]/.test(m), texte: "Un symbole (par exemple : ; ! ? / - +)" },
    { id: "courant", ok: !TROP_COURANTS.some((c) => m.toLowerCase().replace(/[^a-z0-9]/g, "").includes(c)), texte: "Pas un mot de passe trop courant" },
  ];
}

export function motDePasseValide(mdp) {
  return reglesMotDePasse(mdp).every((r) => r.ok);
}

// Force affichée par la jauge : 0 à 4.
export function forceMotDePasse(mdp) {
  const ok = reglesMotDePasse(mdp).filter((r) => r.ok).length;
  const m = String(mdp || "");
  if (!m) return 0;
  if (ok < 4) return 1;
  if (ok < 6) return 2;
  return m.length >= 16 ? 4 : 3;
}
export const LIBELLES_FORCE = ["", "Trop faible", "Moyen", "Bon", "Très bon"];
