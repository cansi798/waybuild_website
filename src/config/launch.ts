// Launch-Checkliste: alles, was vor dem offiziellen Start noch erledigt werden muss.
// Firmendaten werden automatisch geprüft, der Rest wird hier von Hand abgehakt (done: true).
import { company, isMissing, references, SHOW_HINTS } from './site';

export type Todo = {
  title: string;
  detail: string;
  where: string;
  done: boolean;
  priority: 'pflicht' | 'wichtig' | 'später';
};

const companyFields: [keyof typeof company, string, string][] = [
  ['managingDirector', 'Name der Geschäftsführung', 'Pflichtangabe im Impressum und in jeder geschäftlichen E-Mail.'],
  ['street', 'Straße & Hausnummer', 'Ladungsfähige Anschrift – Pflicht im Impressum (§ 5 DDG).'],
  ['zip', 'Postleitzahl', 'Teil der Anschrift im Impressum.'],
  ['city', 'Ort', 'Teil der Anschrift im Impressum.'],
  ['registerCourt', 'Registergericht', 'Steht im Handelsregisterauszug, z. B. „Amtsgericht München“.'],
  ['registerNumber', 'Handelsregisternummer (HRB)', 'Steht im Handelsregisterauszug.'],
  ['vatId', 'Umsatzsteuer-ID', 'Kommt vom Bundeszentralamt für Steuern. Falls noch nicht vorhanden: Zeile im Impressum vorerst entfernen.'],
  ['phone', 'Telefonnummer', 'Empfohlen: schafft Vertrauen und stärkt lokales SEO.'],
];

const auto: Todo[] = companyFields.map(([key, title, detail]) => ({
  title,
  detail,
  where: `src/config/site.ts → company.${key}`,
  done: !isMissing(company[key]),
  priority: key === 'phone' ? 'wichtig' : 'pflicht',
}));

const manual: Todo[] = [
  { title: 'Website entwickelt & online', detail: 'Alle Seiten mobil & Desktop, automatisches Deployment per GitHub Actions.', where: 'github.com/cansi798/waybuild_website', done: true, priority: 'pflicht' },
  { title: 'SEO-Grundlagen', detail: 'Meta-Daten, strukturierte Daten (JSON-LD), Sitemap, Lighthouse SEO 100.', where: 'src/layouts/BaseLayout.astro, src/lib/schema.ts', done: true, priority: 'pflicht' },
  { title: 'Favicon & Social-Media-Vorschau', detail: 'Icons für Browser, iPhone, Android sowie Vorschaubild für WhatsApp/LinkedIn.', where: 'public/', done: true, priority: 'wichtig' },
  { title: 'CI-Handbuch', detail: 'Logo, Farben, Schriften, Tonalität, Visitenkarte, E-Mail-Signatur.', where: '/ci-handbuch/', done: true, priority: 'wichtig' },
  {
    title: 'Domain registrieren (z. B. waybuild.de)',
    detail: 'Danach Umzug von GitHub Pages auf die eigene Domain – Anleitung in der README.',
    where: 'README.md → „Eigene Domain aktivieren“',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'E-Mail-Postfach kontakt@waybuild.de einrichten',
    detail: 'Die Adresse steht überall auf der Website – sie muss vor dem Start funktionieren.',
    where: 'Beim E-Mail-/Domain-Anbieter',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'AGB anwaltlich prüfen lassen',
    detail: 'Die AGB-Seite ist eine Vorlage für das Abo-Modell. Ohne geprüfte AGB keine Abo-Verträge abschließen.',
    where: 'src/pages/agb.astro',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Datenschutzerklärung prüfen lassen',
    detail: 'Besonders nach Umzug auf eigenen Hoster und bei Einsatz eines Formular-Dienstes anpassen.',
    where: 'src/pages/datenschutz.astro',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Kontaktformular an einen Versanddienst anbinden',
    detail: 'Aktuell öffnet das Formular nur das E-Mail-Programm. Mit Web3Forms/Formspree kommen Anfragen direkt an.',
    where: '.github/workflows/deploy.yml → PUBLIC_FORM_ENDPOINT',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Leistungsversprechen absichern',
    detail: '„Hosting in Deutschland“, „Live in 14 Tagen – garantiert“ und „PageSpeed 90+“ stehen auf der Website. Hoster/Prozesse so wählen, dass das eingehalten wird.',
    where: 'src/config/site.ts → usps, plans',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Foto und Kurzvorstellung der Gründer',
    detail: 'Menschen kaufen von Menschen – ein echtes Foto auf „Über uns“ erhöht die Anfragen deutlich.',
    where: 'src/pages/ueber-uns.astro',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Erste Referenzprojekte',
    detail: 'Sobald die ersten Kunden live sind (mit deren Freigabe) eintragen. Keine erfundenen Referenzen oder Bewertungen!',
    where: 'src/config/site.ts → references',
    done: references.length > 0,
    priority: 'später',
  },
  {
    title: 'Google Search Console & Unternehmensprofil',
    detail: 'Nach Domain-Umzug Sitemap einreichen und Google-Unternehmensprofil für lokales SEO anlegen.',
    where: 'search.google.com/search-console',
    done: false,
    priority: 'später',
  },
  {
    title: 'Finales Logo (optional)',
    detail: 'Das aktuelle Logo ist ein sauberer Entwurf. Bei Bedarf durch Designer finalisieren – Farben/Regeln im CI-Handbuch.',
    where: 'src/components/Logo.astro, public/favicon.svg',
    done: false,
    priority: 'später',
  },
  {
    title: 'Hinweise ausblenden',
    detail: 'Wenn alles erledigt ist: SHOW_HINTS auf false setzen. Dann verschwinden alle gelben Hinweise.',
    where: 'src/config/site.ts → SHOW_HINTS',
    done: !SHOW_HINTS,
    priority: 'pflicht',
  },
];

export const launchTodos: Todo[] = [...auto, ...manual];
