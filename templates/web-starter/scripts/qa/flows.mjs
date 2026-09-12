import { chromium } from 'playwright';

// Plantilla de verificación de flujos. Los bloques marcados ADAPTAR dependen
// del proyecto; el resto vale tal cual para cualquier sitio.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};

const b = await chromium.launch(launchOptions);
const log = [];

// --- 1 · Movimiento reducido: el contenido debe verse SIN animar -----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const visible = await p.evaluate(() => {
    const els = [...document.querySelectorAll('main li, main article, main section > div')];
    return els.length > 0 && els.every(e => +getComputedStyle(e).opacity > 0.9);
  });
  log.push(`movimiento reducido: contenido visible = ${visible}`);
  await ctx.close();
}

// --- 2 · Teclado: salto al contenido y foco visible -------------------------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  const first = await p.evaluate(() => document.activeElement?.textContent?.trim());
  const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineWidth);
  log.push(`teclado: primer tab = "${first}" · grosor de foco = ${outline}`);
  await ctx.close();
}

// --- 3 · Menú móvil: abre, Escape cierra ------------------------------------
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  const toggle = p.locator('[aria-expanded]').first();
  if (await toggle.count()) {
    await toggle.click();
    await p.waitForTimeout(300);
    const opened = await toggle.getAttribute('aria-expanded');
    await p.keyboard.press('Escape');
    await p.waitForTimeout(300);
    const closed = await toggle.getAttribute('aria-expanded');
    log.push(`menú móvil: abierto = ${opened} · tras Escape = ${closed}`);
  } else {
    log.push('menú móvil: sin control con aria-expanded');
  }
  await ctx.close();
}

// --- 4 · ADAPTAR: formulario -----------------------------------------------
// Enviar vacío y comprobar que (a) no navega, (b) aparece role="alert",
// (c) con varios errores el foco cae en el resumen.
// --- 5 · ADAPTAR: filtros, modales y demás interacción propia del sitio -----

await b.close();
console.log(log.join('\n'));
