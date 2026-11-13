// Ablauf der Seite /geschichte/ (Entwurf „Startseite als geführte Geschichte“, Jamil, Talk qh87y3sj #5739–#5756, 13.11.2026).
// - Weg (website | anfragen | betrieb): html[data-weg] steuert per CSS, welche Abschnitte (data-gs-weg) sichtbar sind.
//   Das kleine Inline-Skript in pages/geschichte.astro setzt den Weg schon vor dem ersten Zeichnen (kein Layoutsprung).
//   Gemerkt in sessionStorage unter WEG_SPEICHER.
// - Branche + Firmenname: dieselben Daten (components/beispiel/branchen.ts) und derselbe sessionStorage-Schlüssel wie der Film
//   (SPEICHER in src/scripts/beispiel.ts, dort nicht exportiert: FILM_SPEICHER unten muss gleich bleiben), Inhalt { b, f }.
//   Texte mit data-gs-v (Vorlage) bzw. data-gs-vf (Vorlage mit Firmenname) werden NUR per textContent gefüllt.
// - Live-Abgleich mit den Filmen: das Auswahlformular des bestehenden Films (BeispielBuehne) wird nachgezogen (Branche,
//   Firmenname, change-Ereignis → der Film personalisiert sich selbst). Für die neuen Filme (components/geschichte/filme/)
//   gibt es zusätzlich das Ereignis „waybuild:personalisierung“ an window mit detail { b, f } (und „waybuild:weg“ mit { weg }).
// Ohne JS greift nichts davon: alle Wege stehen untereinander, Standardtexte (Maler) bleiben stehen.
import { findeBranche, werte, fuelle, saubereFirma, STANDARD } from '../beispiel/branchen';
import { WEGE, WEG_SPEICHER, STANDARD_WEG, LOESUNG, type WegId } from './texte';

const FILM_SPEICHER = 'waybuild-beispiel-film';
const IDS = WEGE.map((w) => w.id);
const istWeg = (x: unknown): x is WegId => typeof x === 'string' && (IDS as string[]).includes(x);
const html = document.documentElement;
const form = document.querySelector<HTMLFormElement>('[data-gs-form]');

if (form) {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)');
  const firmaFeld = form.querySelector<HTMLInputElement>('input[name="gs-firma"]');

  // ── Speicher (privat/gesperrt: einfach ohne Merken weiter)
  const lies = (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } };
  const schreib = (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* egal */ } };
  const gemerktePerson = (): { b: string; f: string } | null => {
    try { const o = JSON.parse(lies(FILM_SPEICHER) || 'null'); return o ? { b: String(o.b ?? ''), f: saubereFirma(String(o.f ?? '')) } : null; } catch { return null; }
  };
  const merkePerson = (b: string, f: string) => {
    let alt: Record<string, unknown> = {};
    try { alt = JSON.parse(lies(FILM_SPEICHER) || '{}') || {}; } catch { alt = {}; }
    schreib(FILM_SPEICHER, JSON.stringify({ ...alt, b, f }));
  };

  // ── Weg
  let weg: WegId = istWeg(html.dataset.weg) ? html.dataset.weg : STANDARD_WEG;
  const zeigeWeg = (neu: WegId, merken: boolean) => {
    weg = neu;
    html.dataset.weg = neu;
    form.querySelectorAll<HTMLInputElement>('input[name="gs-weg"]').forEach((r) => { r.checked = r.value === neu; });
    document.querySelectorAll<HTMLButtonElement>('[data-gs-weg-knopf]').forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.gsWegKnopf === neu)));
    const wa = document.querySelector<HTMLAnchorElement>('[data-gs-wa]');
    if (wa) {
      try {
        const u = new URL(wa.href);
        u.searchParams.set('text', fuelle(wa.dataset.gsWaVorlage || '', { weg: WEGE.find((w) => w.id === neu)?.titel ?? '' }));
        wa.href = u.toString();
      } catch { /* Link bleibt */ }
    }
    if (merken) schreib(WEG_SPEICHER, neu);
    window.dispatchEvent(new CustomEvent('waybuild:weg', { detail: { weg: neu } }));
  };

  // ── Branche + Firma
  const filmNachziehen = (b: string, f: string) => {
    const filmForm = document.querySelector<HTMLFormElement>('[data-bsp-wahl]');
    if (!filmForm) return;
    const radio = filmForm.querySelector<HTMLInputElement>(`input[name="bsp-branche"][value="${CSS.escape(b)}"]`);
    if (radio) radio.checked = true;
    const feld = filmForm.querySelector<HTMLInputElement>('input[name="bsp-firma"]');
    if (feld) feld.value = f;
    filmForm.dispatchEvent(new Event('change', { bubbles: true }));
    const auto = document.querySelector<HTMLElement>('[data-bsp-auto]');
    if (auto) auto.textContent = 'Startet gleich mit Ihrer Auswahl';
  };
  const personalisieren = (bId: string, fRoh: string) => {
    const b = findeBranche(bId);
    const f = saubereFirma(fRoh);
    const W: Record<string, string> = { ...werte(b, f), suchwort: b.suchwort, branche: b.label, name: f };
    document.querySelectorAll<HTMLElement>('[data-gs-v]').forEach((el) => {
      const v = f && el.dataset.gsVf ? el.dataset.gsVf : el.dataset.gsV || '';
      if (!v) return;
      const text = fuelle(v, f ? W : { ...W, firma: '' });
      if (el.textContent !== text) el.textContent = text;
    });
    document.querySelectorAll<SVGTextElement>('[data-g="suchNaehe"]').forEach((t) => {
      t.textContent = `${b.suchwort} in der Nähe`;
      t.removeAttribute('textLength'); t.removeAttribute('lengthAdjust');
      try { if (t.getComputedTextLength() > 100) { t.setAttribute('textLength', '100'); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); } } catch { /* nicht gezeichnet */ }
    });
    return { b: b.id, f };
  };
  const auswahl = () => ({
    b: form.querySelector<HTMLInputElement>('input[name="gs-branche"]:checked')?.value ?? STANDARD.id,
    f: saubereFirma(firmaFeld?.value ?? ''),
  });
  const uebernehmen = () => {
    const a = auswahl();
    const p = personalisieren(a.b, a.f);
    merkePerson(p.b, p.f);
    filmNachziehen(p.b, p.f);
    window.dispatchEvent(new CustomEvent('waybuild:personalisierung', { detail: { b: p.b, f: p.f } }));
  };

  // ── Bedienung
  // Tastatur-Merker für den Fokusrahmen der Karten (Safari zeigt :has(:focus-visible) an versteckten Radios nicht zuverlässig)
  document.addEventListener('keydown', (e) => { if (e.key === 'Tab' || e.key.startsWith('Arrow')) html.classList.add('gs-tastatur'); }, true);
  document.addEventListener('pointerdown', () => html.classList.remove('gs-tastatur'), true);
  form.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'gs-weg' && istWeg(t.value)) zeigeWeg(t.value, true);
    else if (t.name === 'gs-branche' || t.name === 'gs-firma') uebernehmen();
  });
  firmaFeld?.addEventListener('input', uebernehmen);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const a = auswahl();
    if (firmaFeld && firmaFeld.value !== a.f) firmaFeld.value = a.f;
    uebernehmen();
    const ziel = document.getElementById('problem');
    const kopf = document.getElementById('gs-problem-h');
    if (ziel) ziel.scrollIntoView({ behavior: ruhig.matches ? 'auto' : 'smooth', block: 'start' });
    kopf?.focus({ preventScroll: true });
  });
  document.addEventListener('click', (e) => {
    const k = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-gs-weg-knopf]');
    if (k && istWeg(k.dataset.gsWegKnopf)) zeigeWeg(k.dataset.gsWegKnopf, true);
  });

  // Bestehender Film auf dieser Seite: die Auswahl trifft der Hero. Startbild ohne eigenes Formular (CSS), eigener Titel;
  // „Branche ändern“ / „Andere Branche wählen“ im Film führen zur Auswahl im Hero (vor dem Klick-Handler des Films).
  const filmTitel = document.querySelector<HTMLElement>('.gs-film .bsp-start__titel');
  if (filmTitel) { filmTitel.dataset.gsV = LOESUNG.filmStart; filmTitel.dataset.gsVf = LOESUNG.filmStartFirma; }
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest('.gs-film [data-bsp="branche"]');
    if (!t) return;
    e.preventDefault(); e.stopPropagation();
    document.getElementById('wahl')?.scrollIntoView({ behavior: ruhig.matches ? 'auto' : 'smooth', block: 'start' });
    form.querySelector<HTMLInputElement>('input[name="gs-branche"]:checked')?.focus({ preventScroll: true });
  }, true);

  // ── Los: gemerkte Wahl ins Formular, Texte füllen
  const alt = gemerktePerson();
  if (alt) {
    const r = form.querySelector<HTMLInputElement>(`input[name="gs-branche"][value="${CSS.escape(findeBranche(alt.b).id)}"]`);
    if (r) r.checked = true;
    if (firmaFeld) firmaFeld.value = alt.f;
  }
  const a0 = auswahl();
  personalisieren(a0.b, a0.f);
  zeigeWeg(istWeg(lies(WEG_SPEICHER)) ? (lies(WEG_SPEICHER) as WegId) : weg, false);

  // für Tests
  (window as unknown as { __geschichte: object }).__geschichte = { weg: () => weg, auswahl };
}

export {};
