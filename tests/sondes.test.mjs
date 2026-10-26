import assert from "node:assert/strict";
import { decisionEnregistrement, prochainEnvoiSec, valeurConforme, creneauDe } from "../src/sondes.js";
const frigo = { norme_min: 0, norme_max: 4 }, congel = { norme_min: null, norme_max: -18 };
const T = (h, m = 0) => Date.UTC(2026, 9, 26, h - 1, m); // heure de Paris (UTC+1 le 26/10/2026)
assert.equal(valeurConforme(frigo, 3), true); assert.equal(valeurConforme(frigo, 5), false);
assert.equal(valeurConforme(congel, -20), true); assert.equal(valeurConforme(congel, -15), false);
assert.equal(prochainEnvoiSec(true), 300); assert.equal(prochainEnvoiSec(false), 120);
assert.equal(creneauDe(T(7)).tranche, 1);
// 4 enregistrements par jour : seules la 1re lecture de chaque tranche est enregistrée
let etat = null, n = 0;
for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m += 5) {
  const r = decisionEnregistrement(frigo, { valeur: 3, ts: T(h, m) }, etat); etat = r.etat; if (r.enregistrer) n++;
}
assert.equal(n, 4, "4 enregistrements par jour");
// anomalie : 1 par heure, puis « résolu »
etat = null; let motifs = [];
for (let m = 0; m < 180; m += 2) { const r = decisionEnregistrement(frigo, { valeur: 9, ts: T(10, 0) + m * 60000 }, etat); etat = r.etat; if (r.enregistrer) motifs.push(r.motif); }
assert.deepEqual(motifs, ["anomalie", "anomalie", "anomalie"], "1 par heure pendant 3 h");
const fin = decisionEnregistrement(frigo, { valeur: 2, ts: T(13, 5) }, etat);
assert.equal(fin.enregistrer, true); assert.equal(fin.motif, "resolu");
console.log("sondes : tous les contrôles passent");
