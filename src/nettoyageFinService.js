// Nettoyage de fin de service (nouvelle version) — logique pure, sans interface :
// quelles tâches du plan de nettoyage tombent un jour donné, à la fin de quel service, pour qui,
// et dans quel état elles sont (à faire / faite / validée / refusée / impossible / en retard).
// Règles décidées avec Loïc : une tâche peut avoir plusieurs jours et plusieurs moments (midi, soir) ;
// une tâche non faite (ou refusée par le chef, ou « impossible ») est reprogrammée au lendemain
// et reste en retard (rouge) tant qu'elle n'est pas faite ; un employé en repos ne voit pas les tâches.

export const JOURS_SEMAINE = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
export const MOMENTS = [["midi", "Fin du service du midi"], ["soir", "Fin du service du soir"]];
export const FENETRE_RETARD_JOURS = 14; // au-delà, une tâche jamais faite n'est plus reportée

const NOMS_JOURS_JS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MS_JOUR = 86400000;

export function dateDepuis(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function versIso(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
export function ajouterJours(iso, n) {
  const d = dateDepuis(iso);
  d.setDate(d.getDate() + n);
  return versIso(d);
}
export function nomJour(iso) {
  return NOMS_JOURS_JS[dateDepuis(iso).getDay()];
}
function lundiDe(iso) {
  const d = dateDepuis(iso);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
function semainesEntre(refIso, iso) {
  return Math.round((lundiDe(iso).getTime() - lundiDe(refIso).getTime()) / (7 * MS_JOUR));
}
function nieme(iso, jourNom, position) {
  const d = dateDepuis(iso);
  if (NOMS_JOURS_JS[d.getDay()] !== jourNom) return false;
  if (position === "dernier") {
    const fin = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return d.getDate() + 7 > fin;
  }
  return Math.ceil(d.getDate() / 7) === Number(position);
}

export function joursDeLaTache(t) {
  if (Array.isArray(t.jours) && t.jours.length) return t.jours;
  if (t.jour) return [t.jour];
  return [];
}
export function momentsDeLaTache(t) {
  const m = (Array.isArray(t.moments) ? t.moments : []).filter((x) => x === "midi" || x === "soir");
  return m.length ? m : ["soir"];
}

// La tâche est-elle prévue ce jour-là ?
export function tacheDueLe(t, iso) {
  const f = t.frequence;
  if (f === "Quotidienne") return true;
  if (f === "Hebdomadaire") return joursDeLaTache(t).includes(nomJour(iso));
  if (f === "Toutes les 2 semaines") {
    if (!joursDeLaTache(t).includes(nomJour(iso))) return false;
    return semainesEntre(t.semaineRef || "2026-01-05", iso) % 2 === 0;
  }
  if (f === "Mensuelle") return !!t.jourSemaineMois && nieme(iso, t.jourSemaineMois, t.positionMois ?? 1);
  return false; // « À chaque utilisation » et « Périodique » : pas de jour fixe
}

export const cleOccurrence = (cleaningId, date, moment) => `${cleaningId}|${date}|${moment}`;

export function statutOccurrence(exec) {
  if (!exec) return "a_faire";
  if (exec.valideChef === "ko") return "refuse";
  if (exec.statut === "non_fait") return "impossible";
  if (exec.statut === "fait") return exec.valideChef === "ok" ? "valide" : "fait";
  return "a_faire";
}

// Occurrences à afficher « aujourd'hui » : celles du jour + celles des jours précédents jamais faites,
// refusées par le chef ou déclarées impossibles (elles sont reprogrammées au lendemain, en retard).
// Une tâche faite hier mais pas encore validée par le chef reste visible pour lui (à valider).
export function occurrencesDuJour(cleaning, executions, aujourdhui, fenetre = FENETRE_RETARD_JOURS) {
  const parCle = new Map();
  (executions || []).forEach((e) => parCle.set(cleOccurrence(e.cleaningId, e.date, e.moment), e));
  const sortie = [];
  for (let i = fenetre; i >= 0; i--) {
    const date = ajouterJours(aujourdhui, -i);
    (cleaning || []).forEach((t) => {
      if (t.creeLe && date < t.creeLe) return; // pas de retard avant la création de la tâche
      if (!tacheDueLe(t, date)) return;
      momentsDeLaTache(t).forEach((moment) => {
        const exec = parCle.get(cleOccurrence(t.id, date, moment)) || null;
        const statut = statutOccurrence(exec);
        const passee = date < aujourdhui;
        if (passee && (statut === "valide")) return; // terminée
        sortie.push({
          cle: cleOccurrence(t.id, date, moment), cleaningId: t.id, tache: t.tache, note: t.note || "", poste: t.poste || "Tous",
          date, moment, enRetard: passee && statut !== "fait", aValiderSeulement: passee && statut === "fait", exec, statut, t,
        });
      });
    });
  }
  return sortie;
}

const clePosteN = (p) => String(p || "").replace(/^Poste\s*/i, "").trim().toLowerCase();

// Un employé travaille-t-il ce jour-là, à ce service ? Sans aucun horaire saisi ce jour-là, tout le monde est considéré présent.
export function travaille(emp, iso, moment, shifts) {
  const jour = nomJour(iso);
  const duJour = (shifts || []).filter((s) => s.jour === jour);
  if (!duJour.length) return true;
  return duJour.some((s) => s.employeeId === emp.id && String(s.service || "").toLowerCase() === moment);
}

// Qui est concerné par cette occurrence ?
// - « tous » : tous les employés présents ; - « poste » : les employés présents de ce poste ; - « personnes » : celles choisies.
export function personnesConcernees(t, iso, moment, employees, shifts) {
  const equipe = (employees || []).filter((e) => e.id !== "direction");
  const mode = t.assigneA || "tous";
  let cibles;
  if (mode === "personnes") cibles = equipe.filter((e) => (t.personnes || []).includes(e.id));
  else if (mode === "poste" && t.poste && t.poste !== "Tous") {
    cibles = equipe.filter((e) => clePosteN(e.poste) === clePosteN(t.poste));
    if (!cibles.length) cibles = equipe; // aucun employé de ce poste : la tâche est générale
  }
  else cibles = equipe;
  const presents = cibles.filter((e) => travaille(e, iso, moment, shifts));
  const enRepos = cibles.filter((e) => !presents.includes(e));
  return { ids: presents.map((e) => e.id), presents, enRepos, aucunPresent: presents.length === 0 };
}

// Libellés
export function libelleFrequence(t) {
  const j = joursDeLaTache(t);
  if (t.frequence === "Hebdomadaire") return `chaque semaine — ${j.join(", ") || "jour à choisir"}`;
  if (t.frequence === "Toutes les 2 semaines") return `toutes les 2 semaines — ${j.join(", ") || "jour à choisir"}`;
  if (t.frequence === "Mensuelle") return `chaque mois — ${t.positionMois === "dernier" ? "dernier" : `${t.positionMois ?? 1}${(t.positionMois ?? 1) === 1 ? "er" : "e"}`} ${(t.jourSemaineMois || "").toLowerCase()}`;
  if (t.frequence === "Quotidienne") return "tous les jours";
  return (t.frequence || "").toLowerCase();
}
export function libelleMoments(t) {
  const m = momentsDeLaTache(t);
  return m.length === 2 ? "midi et soir" : m[0] === "midi" ? "fin du service du midi" : "fin du service du soir";
}
