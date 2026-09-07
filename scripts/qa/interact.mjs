import { chromium } from 'playwright';
// Resolución del navegador y del servidor: se pueden sobrescribir por entorno.
// CHROMIUM_PATH apunta al binario de Chromium; sin él se usa el que Playwright
// haya instalado. BASE_URL debe servir la exportación estática de `out/`.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};

const OUT = process.env.SHOT_DIR ?? '.qa-shots';

const b = await chromium.launch(launchOptions);
const log=[];
const ctx = await b.newContext({viewport:{width:1440,height:900}});

// --- 1. Secuencia de marca de apertura ---
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/', {waitUntil:'domcontentloaded'});
  for (const t of [150, 500, 900, 1300, 1700, 2100, 2600]) {
    await p.waitForTimeout(t === 150 ? 150 : 400);
    await p.screenshot({path:`${OUT}/intro-${String(t).padStart(4,'0')}.png`});
  }
  const gone = await p.evaluate(()=>!document.querySelector('[aria-hidden="true"].fixed.inset-0.bg-abyss'));
  const ovf = await p.evaluate(()=>document.documentElement.style.overflow);
  log.push(`intro: overlay removido=${gone} overflowRestaurado=${ovf===''}`);
  await p.close();
}

// --- 2. Movimiento reducido ---
{
  const rc = await b.newContext({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
  const p = await rc.newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'});
  await p.waitForTimeout(1400);
  await p.screenshot({path:`${OUT}/reduced-motion.png`});
  const visible = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('#soluciones li, #por-que-sonic li')];
    return els.length && els.every(e=>+getComputedStyle(e).opacity > 0.9);
  });
  log.push(`reduced-motion: contenido visible sin animar=${visible}`);
  await p.close(); await rc.close();
}

// --- 3. Explorador de soluciones ---
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{try{sessionStorage.setItem('sonic:intro-seen','1')}catch{}});
  await p.reload({waitUntil:'networkidle'});
  await p.locator('#explorador').scrollIntoViewIfNeeded();
  await p.getByRole('button',{name:'Activar una marca'}).click();
  await p.getByRole('button',{name:'Centros comerciales', exact:true}).first().click();
  await p.getByRole('button',{name:'Experiencial'}).click();
  await p.waitForTimeout(700);
  const n = await p.locator('#explorador li a').count();
  const href = await p.locator('#explorador a.btn-primary').getAttribute('href');
  log.push(`explorador: ${n} resultados, CTA=${href}`);
  await p.screenshot({path:`${OUT}/x-explorador.png`});
  await p.close();
}

// --- 4. Formulario por pasos: validación y resumen de errores ---
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/cotizar/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{try{sessionStorage.setItem('sonic:intro-seen','1')}catch{}});
  await p.reload({waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Continuar'}).click();
  await p.waitForTimeout(400);
  const alert = await p.locator('[role="alert"]').first().textContent();
  const focused = await p.evaluate(()=>document.activeElement?.getAttribute('role'));
  log.push(`form: alerta="${alert.trim().slice(0,60)}" foco=${focused}`);
  await p.screenshot({path:`${OUT}/x-form-errores.png`});
  // completar paso 1
  await p.getByLabel(/Nombre y apellido/).fill('María Paula Vera');
  await p.getByLabel(/Empresa o marca/).fill('Corporación Andina');
  await p.getByLabel(/Correo electrónico/).fill('mp.vera@ejemplo.ec');
  await p.getByLabel(/Teléfono o WhatsApp/).fill('0991234567');
  await p.getByRole('button',{name:'Continuar'}).click();
  await p.waitForTimeout(400);
  await p.getByRole('button',{name:'Generar alcance'}).click();
  await p.getByRole('button',{name:'Quito', exact:true}).click();
  await p.getByRole('checkbox',{name:'Monitores digitales en trenes'}).check();
  await p.getByRole('button',{name:'Continuar'}).click();
  await p.waitForTimeout(400);
  await p.screenshot({path:`${OUT}/x-form-paso3.png`});
  await p.getByRole('button',{name:'Enviar solicitud'}).click();
  await p.waitForTimeout(400);
  const autorizaErr = await p.locator('.field-error').first().textContent();
  log.push(`form: bloquea sin autorización="${autorizaErr.trim().slice(0,50)}"`);
  await p.getByRole('checkbox',{name:/Autorizo/}).check();
  await p.waitForTimeout(3200);
  await p.getByRole('button',{name:'Enviar solicitud'}).click();
  await p.waitForTimeout(1400);
  const ok = await p.locator('[role="status"] h2').textContent().catch(()=>null);
  const wa = await p.locator('a[href*="wa.me"]').first().getAttribute('href');
  log.push(`form: confirmación="${ok}" whatsappPrecargado=${wa?.includes('Corporaci')}`);
  await p.screenshot({path:`${OUT}/x-form-ok.png`});
  await p.close();
}

// --- 5. Portafolio: filtro + modal + teclado ---
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/proyectos/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{try{sessionStorage.setItem('sonic:intro-seen','1')}catch{}});
  await p.reload({waitUntil:'networkidle'});
  const all = await p.locator('ul li button.card').count();
  await p.getByRole('button',{name:/^DOOH/}).click();
  await p.waitForTimeout(600);
  const dooh = await p.locator('ul li button.card').count();
  await p.getByRole('button',{name:/^Todos/}).click();
  await p.waitForTimeout(500);
  await p.locator('ul li button.card').first().click();
  await p.waitForTimeout(600);
  const dlg = await p.locator('[role="dialog"]').isVisible();
  await p.screenshot({path:`${OUT}/x-modal.png`});
  await p.keyboard.press('Escape');
  await p.waitForTimeout(400);
  const closed = !(await p.locator('[role="dialog"]').isVisible().catch(()=>false));
  log.push(`portafolio: total=${all} dooh=${dooh} modalAbre=${dlg} escCierra=${closed}`);
  await p.close();
}

// --- 6. Navegación por teclado y foco visible ---
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{try{sessionStorage.setItem('sonic:intro-seen','1')}catch{}});
  await p.reload({waitUntil:'networkidle'});
  await p.keyboard.press('Tab');
  const first = await p.evaluate(()=>document.activeElement?.textContent?.trim());
  await p.screenshot({path:`${OUT}/x-skiplink.png`});
  const outline = await p.evaluate(()=>getComputedStyle(document.activeElement).outlineWidth);
  log.push(`teclado: primerTab="${first}" grosorFoco=${outline}`);
  await p.close();
}

// --- 7. Menú móvil ---
{
  const mc = await b.newContext({viewport:{width:390,height:844}});
  const p = await mc.newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{try{sessionStorage.setItem('sonic:intro-seen','1')}catch{}});
  await p.reload({waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Abrir menú'}).click();
  await p.waitForTimeout(400);
  await p.screenshot({path:`${OUT}/x-menu-movil.png`});
  const exp = await p.getByRole('button',{name:'Cerrar menú'}).getAttribute('aria-expanded');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  const afterEsc = await p.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded');
  log.push(`menú móvil: expandido=${exp} trasEsc=${afterEsc}`);
  await p.close(); await mc.close();
}

await ctx.close(); await b.close();
console.log(log.join('\n'));
