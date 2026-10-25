// Rythme des sondes de température (décidé par Loïc le 25/10/2026) — logique pure, sans écran ni base.
//  - la sonde envoie une valeur toutes les 5 minutes ; toutes les 2 minutes si la valeur sort de la norme ;
//  - toutes les valeurs sont AFFICHÉES en direct dans le logiciel, mais ne sont PAS toutes enregistrées dans Supabase ;
//  - enregistrement dans Supabase : 4 relevés par jour et par appareil (un par tranche de 6 h) ;
//  - en cas d'anomalie : un relevé par heure jusqu'à correction, puis un relevé « résolu ».
// Tranches de 6 h (0 h, 6 h, 12 h, 18 h, heure de Paris) : choix provisoire, à confirmer par Loïc.

export const RYTHME_SONDES = {
  envoiNormalSec: 300,
  envoiAnomalieSec: 120,
  enregistrementsParJour: 4,
  anomalieEnregistrementMin: 60,
  fuseau: "Europe/Paris",
};

// Une valeur est conforme si elle respecte la norme de l'appareil (min et/ou max).
export function valeurConforme(appareil, valeur) {
  const v = Number(valeur);
  if (!Number.isFinite(v)) return false;
  if (appareil.norme_min != null && v < Number(appareil.norme_min)) return false;
  if (appareil.norme_max != null && v > Number(appareil.norme_max)) return false;
  return true;
}

// Prochain envoi attendu de la sonde (en secondes), selon la dernière valeur.
export function prochainEnvoiSec(conforme) {
  return conforme ? RYTHME_SONDES.envoiNormalSec : RYTHME_SONDES.envoiAnomalieSec;
}

function partiesParis(ts) {
  const p = new Intl.DateTimeFormat("fr-FR", { timeZone: RYTHME_SONDES.fuseau, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false }).formatToParts(new Date(ts));
  const g = (t) => p.find((x) => x.type === t).value;
  return { jour: `${g("year")}-${g("month")}-${g("day")}`, heure: Number(g("hour")) % 24 };
}

// Numéro de tranche de 6 h (0 à 3) et jour (heure de Paris) d'un instant.
export function creneauDe(ts) {
  const { jour, heure } = partiesParis(ts);
  return { jour, tranche: Math.floor(heure / (24 / RYTHME_SONDES.enregistrementsParJour)) };
}

// Faut-il enregistrer cette lecture dans Supabase ?
//   lecture : { valeur, ts }  (ts en millisecondes)
//   etat    : { creneauxFaits: ["2026-10-26#2", …], dernierEnregAnomalieTs: nombre|null, enAnomalie: booléen }
// Retourne { enregistrer, motif, conforme, etat } avec l'état mis à jour (à conserver pour l'appareil).
export function decisionEnregistrement(appareil, lecture, etat) {
  const e = { creneauxFaits: [], dernierEnregAnomalieTs: null, enAnomalie: false, ...(etat || {}) };
  const conforme = valeurConforme(appareil, lecture.valeur);
  const { jour, tranche } = creneauDe(lecture.ts);
  const cle = `${jour}#${tranche}`;
  const suivant = { ...e, creneauxFaits: e.creneauxFaits.filter((c) => c.startsWith(jour)) };

  if (!conforme) {
    const delaiMs = RYTHME_SONDES.anomalieEnregistrementMin * 60000;
    const trop_tot = e.dernierEnregAnomalieTs != null && lecture.ts - e.dernierEnregAnomalieTs < delaiMs;
    suivant.enAnomalie = true;
    if (trop_tot) return { enregistrer: false, motif: null, conforme, etat: suivant };
    suivant.dernierEnregAnomalieTs = lecture.ts;
    return { enregistrer: true, motif: "anomalie", conforme, etat: suivant };
  }

  if (e.enAnomalie) {
    suivant.enAnomalie = false;
    suivant.dernierEnregAnomalieTs = null;
    if (!suivant.creneauxFaits.includes(cle)) suivant.creneauxFaits.push(cle);
    return { enregistrer: true, motif: "resolu", conforme, etat: suivant };
  }

  if (!suivant.creneauxFaits.includes(cle)) {
    suivant.creneauxFaits.push(cle);
    return { enregistrer: true, motif: "creneau", conforme, etat: suivant };
  }
  return { enregistrer: false, motif: null, conforme, etat: suivant };
}
