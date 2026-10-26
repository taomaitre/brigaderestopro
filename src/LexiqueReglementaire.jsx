import React, { useMemo, useState } from "react";
import { LEXIQUE, LEXIQUE_DATE, LEXIQUE_GROUPES } from "./lexiqueDonnees.js";

// Lexique réglementaire : toujours disponible dans le logiciel (les rectangles rouges « Normes HACCP » des écrans disparaissent
// au bout de 6 mois, pas le lexique). Contenu généré depuis docs/lexique-haccp.md (voir scripts/genererLexique.mjs).

const normaliser = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const BADGES = {
  verifie: { texte: "Vérifié sur le texte officiel", fond: "#E7F1EB", couleur: "#1E7B4B" },
  mixte: { texte: "Vérifié en partie", fond: "#FFF3D6", couleur: "#7A5A00" },
  "a-confirmer": { texte: "À confirmer", fond: "#FDE8E4", couleur: "#B5523B" },
  "non-publie": { texte: "Non publié", fond: "#EEE", couleur: "#555" },
};

const URL_RE = /(https?:\/\/[^\s)]+)/g;

function TexteAvecLiens({ texte }) {
  const morceaux = String(texte).split(URL_RE);
  return (
    <>
      {morceaux.map((m, i) => /^https?:\/\//.test(m)
        ? <a key={i} href={m} target="_blank" rel="noopener noreferrer" className="underline break-all" style={{ color: "#1D4ED8" }}>{m} ↗</a>
        : <React.Fragment key={i}>{m}</React.Fragment>)}
    </>
  );
}

function Fiche({ e, ouverte, onBascule }) {
  const badge = BADGES[e.certitude] || BADGES.mixte;
  const bref = e.champs.find((c) => /^En bref$/i.test(c.label));
  return (
    <div className="border border-[var(--cadre)] rounded-xl bg-white overflow-hidden">
      <button type="button" onClick={onBascule} className="w-full text-left px-3 py-2.5 flex items-start gap-2" aria-expanded={ouverte}>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[var(--ink)]">{e.titre}</span>
          {!ouverte && bref && <span className="block text-xs text-[var(--steel)] mt-0.5 line-clamp-2">{bref.texte}</span>}
          <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.fond, color: badge.couleur }}>{badge.texte}</span>
        </span>
        <span className="shrink-0 mt-0.5 text-lg leading-none" aria-hidden="true">{ouverte ? "▴" : "▾"}</span>
      </button>
      {ouverte && (
        <div className="px-3 pb-3 space-y-1.5 text-sm text-[var(--ink)] border-t border-[var(--cadre)] pt-2">
          {e.champs.map((c, i) => (
            <p key={i}><span className="text-xs font-semibold text-[var(--steel)] uppercase">{c.label}</span><br /><TexteAvecLiens texte={c.texte} /></p>
          ))}
          <p className="text-[11px] text-[var(--steel)] pt-1">Informations pédagogiques : le PMS de l'établissement fait foi. Cette fiche ne remplace ni la lecture du texte officiel, ni la formation HACCP.</p>
        </div>
      )}
    </div>
  );
}

export default function LexiqueReglementaire() {
  const [requete, setRequete] = useState("");
  const [section, setSection] = useState("");
  const [seulementVerifie, setSeulementVerifie] = useState(false);
  const [ouvertes, setOuvertes] = useState({});

  const sections = useMemo(() => LEXIQUE_GROUPES.map((g) => g.nom), []);
  const introDe = (nom) => (LEXIQUE_GROUPES.find((g) => g.nom === nom) || {}).intro || "";
  const index = useMemo(() => LEXIQUE.map((e) => ({
    e,
    titre: normaliser(e.titre),
    corps: normaliser([e.motsCles, ...e.champs.map((c) => c.texte)].join(" ")),
  })), []);

  const resultats = useMemo(() => {
    const mots = normaliser(requete).split(/\s+/).filter(Boolean);
    return index
      .filter(({ e }) => (!section || e.section === section) && (!seulementVerifie || e.certitude === "verifie"))
      .map((x) => {
        let score = 0;
        for (const m of mots) {
          const dansTitre = x.titre.includes(m), dansCorps = x.corps.includes(m);
          if (!dansTitre && !dansCorps) return null;
          score += dansTitre ? 3 : 1;
        }
        return { e: x.e, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);
  }, [requete, section, seulementVerifie, index]);

  return (
    <div className="space-y-3">
      <div className="rounded-xl p-3 text-xs text-[var(--ink)] border border-[var(--cadre)] bg-white">
        <div className="flex items-center gap-2 font-semibold text-sm mb-1"><span aria-hidden="true">📖</span> Lexique et réglementation</div>
        Français et européens uniquement. Chaque fiche donne la source, le lien et son niveau de vérification. Les informations sont pédagogiques : le PMS de l'établissement fait foi, et ce lexique ne remplace ni la vérification des textes ni la formation HACCP. Mis à jour le {LEXIQUE_DATE}.
      </div>

      <div className="relative">
        <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔎</span>
        <input
          type="search" value={requete} onChange={(e) => setRequete(e.target.value)} autoComplete="off"
          placeholder="Rechercher un mot : refroidissement, listeria, allergènes, 63 °C, décongélation…"
          className="w-full border border-[var(--cadre)] rounded-lg pl-9 pr-9 py-2.5 text-sm bg-white"
        />
        {requete && <button type="button" aria-label="Effacer" onClick={() => setRequete("")} className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-lg leading-none">×</button>}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setSection("")} className={`text-xs px-2.5 py-1 rounded-full border ${!section ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--cadre)] bg-white"}`}>Tout</button>
        {sections.map((s) => (
          <button key={s} type="button" onClick={() => setSection(section === s ? "" : s)} className={`text-xs px-2.5 py-1 rounded-full border ${section === s ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--cadre)] bg-white"}`}>{s}</button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-xs text-[var(--ink)]">
        <input type="checkbox" checked={seulementVerifie} onChange={(e) => setSeulementVerifie(e.target.checked)} />
        Afficher seulement les fiches vérifiées sur le texte officiel
      </label>

      <p className="text-xs text-[var(--steel)]">{resultats.length} fiche{resultats.length > 1 ? "s" : ""}{requete ? ` pour « ${requete} »` : ""}</p>

      <div className="space-y-2">
        {(() => {
          const groupe = !requete.trim();
          let precedent = "";
          return resultats.map(({ e }) => {
            const entete = groupe && e.section !== precedent;
            precedent = e.section;
            return (
              <React.Fragment key={e.id}>
                {entete && (
                  <div className="pt-3 first:pt-0">
                    <h3 className="text-sm font-bold text-[var(--ink)]">{e.section}</h3>
                    {introDe(e.section) && <p className="text-xs text-[var(--steel)]">{introDe(e.section)}</p>}
                  </div>
                )}
                <Fiche e={e} ouverte={!!ouvertes[e.id]} onBascule={() => setOuvertes((o) => ({ ...o, [e.id]: !o[e.id] }))} />
              </React.Fragment>
            );
          });
        })()}
        {resultats.length === 0 && <p className="text-sm text-[var(--steel)]">Aucune fiche trouvée. Essayez un seul mot, sans accent si besoin (exemple : « froid », « huile », « oeuf »).</p>}
      </div>
    </div>
  );
}
