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
async function ouvrir({ qui = 'Loïc', graines = {}, mobile = false, attente = null }) {
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

await parcours('Connexion chef + toutes les tuiles de l’accueil s’ouvrent sans erreur', async () => {
  const { p, ctx, erreurs } = await ouvrir({});
  const tuiles = ['Tâches du jour', 'Stock', 'Réception des marchandises', 'Étiquettes (DLC)', 'Traçabilité', 'Températures frigos et congélateurs', 'Refroidissement rapide et congélation', 'Suivi d\'huile de friture', 'Maintien au chaud', 'Cuisson', 'Fiches techniques', 'Suivi et contrôle'];
  for (const t of tuiles) {
    await cliquer(p, t);
    verifier(!/Something went wrong|Erreur inattendue/.test(await p.innerText('body')), `écran d'erreur sur « ${t} »`);
    await cliquer(p, 'Tâches du jour').catch(() => {});
  }
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs.slice(0, 2).join(' | '));
  await ctx.close();
});

await parcours('Suivi et contrôle : les 5 tuiles dans l’ordre voulu, sans « Alertes qualité » et un sous-écran s’ouvre puis revient', async () => {
  const { p, ctx, erreurs } = await ouvrir({});
  await cliquer(p, 'Suivi et contrôle');
  const t = await p.innerText('body');
  for (const x of ['Allergènes', 'Origine des viandes', 'Rappels de produits', 'Contrôle hygiène (DDPP)', 'Procédure de TIAC']) verifier(t.includes(x), `« ${x} » absent de Suivi et contrôle`);
  verifier(!/Les anomalies relevées par l.équipe/.test(t), 'la tuile Alertes qualité doit avoir disparu');
  verifier(/Alertes, éléments à vérifier et à contrôler/i.test(t), 'le titre du cadre des alertes est absent');
  for (const x of ['Ma carte', 'Planning employé', 'Réglages']) verifier(!t.includes(x), `« ${x} » ne devrait plus être dans Suivi et contrôle`);
  await cliquer(p, 'Procédure de TIAC');
  verifier(!/Something went wrong|Erreur inattendue/.test(await p.innerText('body')), 'erreur sur TIAC');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});

await parcours('Historique (direction) : Historique de la journée en premier, un historique s’ouvre', async () => {
  const { p, ctx, erreurs } = await ouvrir({ qui: 'Direction' });
  await cliquer(p, 'Historique');
  const t = await p.innerText('body');
  verifier(t.includes('Historique de la journée'), '« Historique de la journée » absent');
  verifier(t.indexOf('Historique de la journée') < (t.indexOf('Températures') < 0 ? 1e9 : t.indexOf('Températures')), 'Historique de la journée n’est pas en premier');
  verifier(!/Something went wrong|Erreur inattendue/.test(t), 'écran d’erreur');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});

await parcours('Stock : le chef voit Ajouter un produit, Inventaire et Commander ; l’employé ne les voit pas', async () => {
  const chef = await ouvrir({});
  await cliquer(chef.p, 'Stock');
  const t = await chef.p.innerText('body');
  verifier(/Inventaire/.test(t) && /Commander/.test(t), 'boutons Inventaire / Commander absents pour le chef');
  verifier(chef.erreurs.length === 0, 'erreurs JavaScript chef : ' + chef.erreurs[0]);
  await chef.ctx.close();
  const equipe = [{ id: 'loic', nom: 'Loïc', poste: 'Poste Pizza', estChef: true }, { id: 'sam', nom: 'Sam', poste: 'Poste Froid' }];
  const emp = await ouvrir({ qui: 'Sam', graines: { 'planning-employees': equipe } });
  await emp.p.waitForTimeout(13000);
  await cliquer(emp.p, 'Stock');
  const te = await emp.p.innerText('body');
  verifier(!/Ajouter un produit/.test(te), 'l’employé voit « Ajouter un produit »');
  verifier(/Générer la fiche d'inventaire/.test(te), 'la carte d’inventaire de l’employé a changé');
  await emp.ctx.close();
});

await parcours('Accueil : les 12 tuiles dans l’ordre voulu, sans « Contrôles en cuisine »', async () => {
  const { p, ctx } = await ouvrir({});
  const t = await p.innerText('body');
  verifier(!t.includes('Contrôles en cuisine'), '« Contrôles en cuisine » est encore là');
  const ordre = ['Tâches du jour', 'Étiquettes (DLC)', 'Traçabilité', 'Réception des marchandises', 'Stock', 'Températures frigos et congélateurs', 'Refroidissement rapide et congélation', 'Suivi d\'huile de friture', 'Maintien au chaud', 'Cuisson', 'Fiches techniques', 'Suivi et contrôle'];
  const corps = await p.locator('main').innerText();
  let pos = -1;
  for (const x of ordre) { const i = corps.indexOf(x, pos + 1); verifier(i > pos, `« ${x} » absent ou hors ordre`); pos = i; }
  await cliquer(p, 'Suivi d\'huile de friture');
  await p.waitForTimeout(800);
  const txt = await p.innerText('body');
  verifier(/Historique/.test(txt), 'l’historique du chef est absent');
  verifier(!/réservé au chef/i.test(txt), 'l’étiquette « Réservé au chef » ne doit plus apparaître');
  await ctx.close();
});

await parcours('Cuisson : de « Terminer » à « terminée », avec alerte À traiter', async () => {
  const cuissons = [{ id: 'c1', produit: 'Sauce test', famille: 'general', date: aujourdhui, employeeId: 'direction', statut: 'en-cours', heureDebut: '08:30', debutTs: Date.now() - 3600000, dureeAttendueMin: 20, heureFin: null, temperature: null, conforme: null }];
  const { p, ctx, erreurs } = await ouvrir({ graines: { cuissons }, attente: /Sauce test|cuisson/i });
  await cliquer(p, 'Suivi et contrôle');
  await p.waitForTimeout(1500);
  verifier(/élément.? à vérifier ou à contrôler/.test(await p.innerText('body')), 'le résumé général des éléments à vérifier est absent');
  await cliquer(p, 'Choisir');
  await p.waitForTimeout(500);
  verifier(/cuisson à contrôler/.test(await p.innerText('body')), 'la cuisson dépassée n’apparaît pas dans les éléments à vérifier');
  await p.locator('button:has-text("Terminer")').first().click({ timeout: 5000 }); // bouton de la ligne « À traiter »
  await p.waitForTimeout(800);
  await p.locator('button:has-text("Terminer")').first().click({ timeout: 5000 });
  await p.fill('input[type=number]', '74');
  await p.locator('button:has-text("Valider")').first().click();
  await p.waitForTimeout(500);
  verifier(/cuisson terminée/i.test(await p.innerText('body')), 'pas de confirmation « cuisson terminée »');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});

for (const [chefTravaille, remplacants, qui, attendu] of [[true, ['yusuf'], 'Yusuf', false], [false, [], 'Yusuf', false], [false, ['yusuf'], 'Yusuf', true], [false, ['yusuf'], 'Terence', false]]) {
  await parcours(`Remplaçant du chef : chef ${chefTravaille ? 'présent' : 'absent'}, remplaçants ${JSON.stringify(remplacants)}, connecté ${qui} → Suivi et contrôle ${attendu ? 'visible' : 'caché'}`, async () => {
    const shifts = [];
    for (const j of JOURS) {
      if (!(j === jourNom && !chefTravaille)) shifts.push({ id: 's' + j, employeeId: 'loic', jour: j, service: 'Midi', debut: '09:30', fin: '14:30' });
      shifts.push({ id: 'y' + j, employeeId: 'yusuf', jour: j, service: 'Soir', debut: '18:00', fin: '22:00' });
    }
    const { p, ctx } = await ouvrir({ qui, graines: { 'planning-shifts': shifts, 'remplacants-chef': remplacants } });
    await p.waitForTimeout(13000); // le chargement des données de l'appli est volontairement étalé
    const vu = /Suivi et contrôle/.test(await p.innerText('body'));
    verifier(vu === attendu, `accès Suivi et contrôle = ${vu}, attendu ${attendu}`);
    await ctx.close();
  });
}

await parcours('Second de cuisine : accède aux contrôles, pas aux réglages ni au planning', async () => {
  const equipe = [{ id: 'loic', nom: 'Loïc', poste: 'Poste Pizza', estChef: true }, { id: 'terence', nom: 'Terence', poste: 'Poste Froid', estSecond: true }];
  const { p, ctx } = await ouvrir({ qui: 'Terence', graines: { 'planning-employees': equipe } });
  await p.waitForTimeout(13000);
  await cliquer(p, 'Suivi et contrôle');
  const t = await p.innerText('body');
  verifier(/Procédure de TIAC/.test(t), 'le second ne voit pas la procédure de TIAC');
  verifier(!/Réglages/.test(t) && !/Planning employé/.test(t), 'le second voit la gestion (réglages / planning)');
  verifier(await p.locator('button[aria-label="Paramétrage"]').count() === 0, 'le second de cuisine voit l’engrenage Paramétrage');
  await ctx.close();
});


// ---- Vrai mode (connexion réelle) : banc reel.html, identité fabriquée, aucun accès à Supabase ----
async function ouvrirReel(role, mobile = false) {
  const ctx = await b.newContext({ viewport: mobile ? { width: 412, height: 915 } : { width: 1366, height: 800 }, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage(); const erreurs = []; p.on('pageerror', (e) => erreurs.push(e.message));
  await p.goto(`http://127.0.0.1:5199/reel.html?role=${role}`);
  await attendre(p, /Bonjour/, 30000); await p.waitForTimeout(1500);
  return { p, ctx, erreurs };
}
await parcours('Vrai mode, directeur : seulement Suivi et contrôle, Historique, Planning, Réservations ; engrenage dans la bande noire', async () => {
  const { p, ctx, erreurs } = await ouvrirReel('directeur');
  const t = await p.innerText('body');
  for (const x of ['Suivi et contrôle', 'Historique', 'Planning employé', 'Réservations client']) verifier(t.includes(x), `« ${x} » absent pour le directeur`);
  for (const x of ['Tâches du jour', 'Stock', 'Réception des marchandises', 'Étiquettes', 'Traçabilité', 'Contrôles en cuisine', 'Fiches techniques']) verifier(!t.includes(x), `le directeur voit « ${x} »`);
  verifier(await p.locator('header button[aria-label="Paramétrage"]').count() >= 1, 'engrenage absent de la bande noire');
  await p.locator('header button[aria-label="Paramétrage"]').first().click(); await p.waitForTimeout(800);
  verifier(/Comptes de l'équipe/.test(await p.innerText('body')), 'Paramétrage ne s’ouvre pas : ' + (await p.innerText('body')).slice(0, 700).replace(/\n/g, ' | '));
  await p.goto(`http://127.0.0.1:5199/reel.html?role=directeur`); await attendre(p, /Bonjour/, 30000);
  await cliquer(p, 'Historique'); verifier(/Historique de la journée/.test(await p.innerText('body')), 'Historique ne s’ouvre pas');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});
await parcours('Vrai mode, chef : le menu du Paramétrage est dans la bande noire, Fournisseurs et Produits sont séparés', async () => {
  const { p, ctx, erreurs } = await ouvrirReel('chef');
  await p.locator('header button[aria-label="Paramétrage"]').first().click(); await p.waitForTimeout(1000);
  const aside = await p.locator('aside').first().innerText();
  for (const x of ['Paramétrage', 'Comptes de l\'équipe', 'Fournisseurs', 'Produits', 'Appareils de froid', 'Créer une fiche technique', 'Carte du restaurant', 'Plan de nettoyage']) verifier(aside.includes(x), `« ${x} » absent de la bande noire`);
  verifier(!/Tâches du jour/.test(aside), 'les tuiles du travail ne doivent plus être dans la bande noire pendant le Paramétrage');
  if (process.env.CAPTURES) await p.screenshot({ path: process.env.CAPTURES + '/param-bande.png' });
  await p.locator('aside button >> text="Produits"').first().click(); await p.waitForTimeout(1000);
  const t1 = await p.innerText('main');
  verifier(/Fournisseur, référence, conditionnement/.test(t1) && !/Ajouter un fournisseur/.test(t1), 'l’écran Produits doit montrer les produits, sans « Ajouter un fournisseur »');
  if (process.env.CAPTURES) await p.screenshot({ path: process.env.CAPTURES + '/param-produits.png' });
  await p.locator('aside button >> text="Fournisseurs"').first().click(); await p.waitForTimeout(1000);
  const t2 = await p.innerText('main');
  verifier(/Coordonnées, jours de commande et de livraison/.test(t2) && !/Ajouter un produit/.test(t2), 'l’écran Fournisseurs doit montrer les fournisseurs, sans « Ajouter un produit »');
  await p.locator('aside >> text="Retour à l\'accueil"').first().click(); await p.waitForTimeout(800);
  verifier(/Suivi et contrôle/.test(await p.locator('aside').first().innerText()), 'le retour à l’accueil ne remet pas le menu normal');
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});
await parcours('Vrai mode, directeur : Planning employé et Réservations s’ouvrent et ramènent à l’accueil', async () => {
  const { p, ctx, erreurs } = await ouvrirReel('directeur');
  for (const [tuile, titre] of [['Planning employé', /Planning|Horaires/], ['Réservations client', /Réservation/]]) {
    await p.locator(`main >> text="${tuile}"`).first().click(); await p.waitForTimeout(800);
    verifier(titre.test(await p.innerText('body')), `${tuile} ne s’ouvre pas`);
    await p.locator('button:has-text("Retour")').locator('visible=true').first().click(); await p.waitForTimeout(800);
    verifier(/Historique/.test(await p.innerText('body')) && /Suivi et contrôle/.test(await p.innerText('body')), `retour depuis ${tuile} : pas l’accueil`);
  }
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs[0]);
  await ctx.close();
});
await parcours('Vrai mode, chef : toutes les tuiles du travail, engrenage, pas d’Historique ; employé : pas d’engrenage', async () => {
  const chef = await ouvrirReel('chef');
  const t = await chef.p.innerText('body');
  for (const x of ['Tâches du jour', 'Stock', 'Réception des marchandises', 'Suivi et contrôle']) verifier(t.includes(x), `« ${x} » absent pour le chef`);
  verifier(!t.includes('Historique'), 'le chef voit Historique (réservé au directeur)');
  verifier(await chef.p.locator('header button[aria-label="Paramétrage"]').count() >= 1, 'engrenage absent pour le chef');
  await chef.ctx.close();
  const emp = await ouvrirReel('employe');
  verifier(await emp.p.locator('button[aria-label="Paramétrage"]').count() === 0, 'l’employé voit l’engrenage');
  verifier(!(await emp.p.innerText('body')).includes('Suivi et contrôle'), 'l’employé voit Suivi et contrôle');
  await emp.ctx.close();
});

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

await parcours('Paramétrage : engrenage visible pour la Direction, liste à gauche, chaque réglage s’ouvre et Retour fonctionne', async () => {
  const { p, ctx, erreurs } = await ouvrir({});
  const bouton = p.locator('button[aria-label="Paramétrage"], aside button:has-text("Paramétrage")').locator('visible=true');
  verifier(await bouton.count() === 1, 'bouton Paramétrage absent (ou en double) pour la Direction');
  await bouton.first().click(); await p.waitForTimeout(600);
  const t = await p.innerText('body');
  for (const x of ['Comptes de l’équipe'.replace('’', "'"), 'Fournisseurs', 'Produits', 'Appareils de froid', 'Créer une fiche technique', 'Plan de nettoyage', 'Nettoyages à valider', 'Carte du restaurant']) verifier(t.includes(x), `« ${x} » absent de la liste du Paramétrage`);
  for (const x of ['Appareils de froid', 'Comptes de l\'équipe', 'Plan de nettoyage', 'Carte du restaurant']) {
    await cliquer(p, x);
    verifier(!/Something went wrong|Erreur inattendue/.test(await p.innerText('body')), `écran d'erreur sur « ${x} »`);
    verifier(await p.locator('text="Paramétrage"').locator('visible=true').count() >= 1, `la liste du Paramétrage a disparu après « ${x} »`);
  }
  verifier(erreurs.length === 0, 'erreurs JavaScript : ' + erreurs.slice(0, 2).join(' | '));
  await ctx.close();
});

await parcours('Paramétrage : aucun engrenage pour un employé', async () => {
  const equipe = [{ id: 'loic', nom: 'Loïc', poste: 'Poste Pizza', estChef: true }, { id: 'sam', nom: 'Sam', poste: 'Poste Froid' }];
  const { p, ctx } = await ouvrir({ qui: 'Sam', mobile: true, graines: { 'planning-employees': equipe } });
  verifier(await p.locator('button[aria-label="Paramétrage"]').count() === 0, 'un employé voit l’engrenage');
  await p.setViewportSize({ width: 1366, height: 800 }); await p.waitForTimeout(500);
  verifier(await p.locator('aside button:has-text("Paramétrage")').count() === 0, 'un employé voit le bouton Paramétrage du menu');
  await ctx.close();
});

await parcours('Paramétrage sur téléphone : engrenage, liste puis page avec Retour, sans débordement', async () => {
  const { p, ctx } = await ouvrir({ mobile: true });
  const g = p.locator('button[aria-label="Paramétrage"]').locator('visible=true');
  verifier(await g.count() === 1, 'engrenage absent sur téléphone (Direction)');
  await g.first().click(); await p.waitForTimeout(600);
  await cliquer(p, 'Appareils de froid');
  verifier(/Retour au Paramétrage/.test(await p.innerText('body')), 'bouton Retour au Paramétrage absent');
  verifier(await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth) <= 2, 'débordement horizontal');
  await cliquer(p, 'Retour au Paramétrage');
  verifier(/Tous les réglages au même endroit/.test(await p.innerText('body')), 'retour à la liste impossible');
  await ctx.close();
});

await b.close();
const ko = resultats.filter((r) => !r.ok);
console.log(`\n${resultats.length - ko.length}/${resultats.length} parcours réussis`);
process.exit(ko.length ? 1 : 0);
