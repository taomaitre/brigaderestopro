// Audit visuel : ouvre chaque écran (chef, employé, téléphone), fait une capture et relève le texte. Ne modifie rien.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(process.env.PW_PATH || '/home/claude/.npm-global/lib/node_modules/');
const { chromium } = require('playwright');
const URL = 'http://127.0.0.1:5199/index.html';
const SORTIE = process.env.AUDIT_DIR || '/tmp/claude-0/audit';
fs.mkdirSync(SORTIE, { recursive: true });
const b = await chromium.launch({ args: ['--no-sandbox'] });
async function ouvrir(qui, mobile) {
  const ctx = await b.newContext({ viewport: mobile ? { width: 412, height: 915 } : { width: 1366, height: 800 }, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  await p.goto(URL); await p.waitForTimeout(500);
  if (await p.locator('text=Tablette commune de la cuisine').count()) { await p.click('text=Tablette commune de la cuisine'); await p.waitForTimeout(300); }
  await p.locator(`button:has-text("${qui}")`).first().click();
  for (let i = 0; i < 40; i++) { if (/Bonjour/.test(await p.innerText('body'))) break; await p.waitForTimeout(300); }
  return { p, ctx };
}
const ecrans = ['Tâches du jour', 'Étiquettes (DLC)', 'Traçabilité', 'Réception des marchandises', 'Stock', 'Températures frigos et congélateurs', 'Refroidissement rapide et congélation', "Suivi d'huile de friture", 'Maintien au chaud', 'Cuisson', 'Fiches techniques', 'Suivi et contrôle', 'Lexique et réglementation'];
const qui = process.argv[2] || 'Loïc'; const mobile = process.argv[3] === 'mobile';
const { p, ctx } = await ouvrir(qui, mobile);
const rapport = {};
for (const e of ecrans) {
  try {
    await p.locator(`text="${e}"`).locator('visible=true').first().click(); await p.waitForTimeout(900);
    const fichier = `${SORTIE}/${qui}-${mobile ? 'tel' : 'pc'}-${e.replace(/[^a-zA-Z0-9]+/g, '_')}.png`;
    await p.screenshot({ path: fichier, fullPage: true });
    rapport[e] = (await p.innerText('body')).replace(/\n+/g, ' | ').slice(0, 1500);
  } catch (err) { rapport[e] = 'ERREUR ' + err.message.slice(0, 120); }
}
fs.writeFileSync(`${SORTIE}/rapport-${qui}-${mobile ? 'tel' : 'pc'}.json`, JSON.stringify(rapport, null, 1));
await ctx.close(); await b.close();
console.log('capture terminée :', Object.keys(rapport).length, 'écrans');
