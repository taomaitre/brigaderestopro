// Parcours automatiques de BrigadeRestoPro (banc d'essai : faux Supabase, données de test uniquement).
// Chaque parcours s'exécute dans un navigateur neuf (localStorage vide) : rien n'est conservé ensuite.
import { createRequire } from 'module';
const require = createRequire(process.env.PW_PATH || '/home/claude/.npm-global/lib/node_modules/');
const { chromium } = require('playwright');

const URL = 'http://127.0.0.1:5199/index.html';
const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const jourNom = JOURS[(new Date().getDay() + 6) % 7];
const d = new Date();
const aujourdhui = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const b = await chromium.launch({ args: ['--no-sandbox'] });
const resultats = [];

async function attendre(p, re, ms = 20000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { if (re.test(await p.innerText('body'))) return true; await p.waitForTimeout(400); }
  return false;
}
async function ouvrir({ qui = 'Direction', graines = {}, mobile = false, attente = null }) {
  const ctx = await b.newContext({ viewport: mobile ? { width: 412, height: 915 } : { width: 1366, height: 800 }, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage(); const erreurs = []; p.on('pageerror', (e) => erreurs.push(e.message));
  await p.addInitScript((g) => { if (!localStorage.getItem('__graine')) { for (const [k, v] of Object.entries(g)) localStorage.setItem('macuisine_preview:' + k, JSON.stringify(v)); localStorage.setItem('__graine', '1'); } }, graines);
  await p.goto(URL); await p.waitForTimeout(500);
  if (await p.locator('text=Tablette commune de la cuisine').count()) { await p.click('text=Tablette commune de la cuisine'); await p.waitForTimeout(300); }
  await p.locator(`button:has-text("${qui}")`).first().click();
  await attendre(p, /Bonjour/);
  if (attente) await attendre(p, attente);
  return { p, ctx, erreurs };
}
const cliquer = async (p, texte) => { await p.locator(`text="${texte}"`).locator('visible=true').first().click(); await p.waitForTimeout(500); };
async function parcours(nom, fn) {
  const t0 = Date.now();
  try { await fn(); resultats.push({ nom, ok: true, ms: Date.now() - t0 }); console.log(`✓ ${nom}`); }
  catch (e) { resultats.push({ nom, ok: false, ms: Date.now() - t0, err: e.message }); console.log(`✗ ${nom} — ${e.message}`); }
}
const verifier = (cond, msg) => { if (!cond) throw new Error(msg); };

await parcours('Connexion Direction + toutes les tuiles de l’accueil s’ouvrent sans erreur', async () => {
  const { p, ctx, erreurs } = await ouvrir({});
  const tuiles = ['Tâches du jour', 'Stock', 'Réception des marchandises', 'Étiquettes (DLC)', 'Traçabilité', 'Contrôles en cuisine', 'Fiches techniques', 'Contrôle & Gestion'];
  for (const t of tuiles) {
    await cliquer(p, t);
    verifier(!/Something went wrong|Erreur inattendue/.test(await p.innerText('body')), `écran d'erreur sur « ${t} »`);
    await cliquer(p, 'Tâches du jour').catch(() => {});
  }
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs.slice(0, 2).join(' | '));
  await ctx.close();
});

await parcours('Contrôle & Gestion : rubriques directes (Cuisine et carte, Équipe et planning) + Ma carte s’ouvre', async () => {
  const { p, ctx, erreurs } = await ouvrir({});
  await cliquer(p, 'Contrôle & Gestion');
  const t = await p.innerText('body');
  for (const x of ['Création de fiche technique', 'Ma carte', 'Planning employé et heures de service', 'Réservations client', 'Urgence sanitaire', 'PMS et réglementation', 'Réglages']) verifier(t.includes(x), `« ${x} » absent du hub`);
  await cliquer(p, 'Ma carte');
  verifier(/Créer la carte/.test(await p.innerText('body')), 'Ma carte ne s’ouvre pas');
  await cliquer(p, 'Retour à Contrôle & Gestion');
  verifier(/Urgence sanitaire/.test(await p.innerText('body')), 'retour au hub impossible');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});

await parcours('Hub Contrôles en cuisine : les 5 contrôles sont présents', async () => {
  const { p, ctx } = await ouvrir({});
  await cliquer(p, 'Contrôles en cuisine');
  const t = await p.innerText('body');
  for (const x of ['Températures frigos et congélateurs', 'Refroidissement rapide (cellule)', 'Huile de friture', 'Maintien au chaud', 'Cuisson']) verifier(t.includes(x), `« ${x} » absent`);
  await ctx.close();
});

await parcours('Cuisson : de « Terminer » à « terminée », avec alerte À traiter', async () => {
  const cuissons = [{ id: 'c1', produit: 'Sauce test', famille: 'general', date: aujourdhui, employeeId: 'direction', statut: 'en-cours', heureDebut: '08:30', debutTs: Date.now() - 3600000, dureeAttendueMin: 20, heureFin: null, temperature: null, conforme: null }];
  const { p, ctx, erreurs } = await ouvrir({ graines: { cuissons }, attente: /Sauce test|cuisson/i });
  await cliquer(p, 'Contrôle & Gestion');
  await p.waitForTimeout(1500);
  verifier(/cuisson à contrôler/.test(await p.innerText('body')), 'la cuisson dépassée n’apparaît pas dans À traiter');
  await cliquer(p, 'Contrôles du jour');
  await p.locator('button:has-text("Terminer")').first().click({ timeout: 5000 });
  await p.fill('input[type=number]', '74');
  await p.locator('button:has-text("Valider")').first().click();
  await p.waitForTimeout(500);
  verifier(/cuisson terminée/i.test(await p.innerText('body')), 'pas de confirmation « cuisson terminée »');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});

for (const [chefTravaille, remplacants, qui, attendu] of [[true, ['yusuf'], 'Yusuf', false], [false, [], 'Yusuf', false], [false, ['yusuf'], 'Yusuf', true], [false, ['yusuf'], 'Terence', false]]) {
  await parcours(`Remplaçant du chef : chef ${chefTravaille ? 'présent' : 'absent'}, remplaçants ${JSON.stringify(remplacants)}, connecté ${qui} → Contrôle & Gestion ${attendu ? 'visible' : 'caché'}`, async () => {
    const shifts = [];
    for (const j of JOURS) {
      if (!(j === jourNom && !chefTravaille)) shifts.push({ id: 's' + j, employeeId: 'loic', jour: j, service: 'Midi', debut: '09:30', fin: '14:30' });
      shifts.push({ id: 'y' + j, employeeId: 'yusuf', jour: j, service: 'Soir', debut: '18:00', fin: '22:00' });
    }
    const { p, ctx } = await ouvrir({ qui, graines: { 'planning-shifts': shifts, 'remplacants-chef': remplacants } });
    await p.waitForTimeout(13000); // le chargement des données de l'appli est volontairement étalé
    const vu = /Contrôle & Gestion/.test(await p.innerText('body'));
    verifier(vu === attendu, `accès Contrôle & Gestion = ${vu}, attendu ${attendu}`);
    await ctx.close();
  });
}

await parcours('Téléphone (employé Loïc) : aucune page ne déborde en largeur', async () => {
  const { p, ctx } = await ouvrir({ qui: 'Loïc', mobile: true });
  for (const t of ['Tâches du jour', 'Contrôles en cuisine', 'Stock', 'Réception des marchandises']) {
    const l = p.locator(`text="${t}"`).locator('visible=true').first();
    if (!(await l.count())) continue;
    await l.click(); await p.waitForTimeout(600);
    const large = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    verifier(large <= 2, `débordement horizontal de ${large}px sur « ${t} »`);
    await p.goBack().catch(() => {});
  }
  await ctx.close();
});

await b.close();
const ko = resultats.filter((r) => !r.ok);
console.log(`\n${resultats.length - ko.length}/${resultats.length} parcours réussis`);
process.exit(ko.length ? 1 : 0);
