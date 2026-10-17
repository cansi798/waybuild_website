// Launch-Checkliste: alles, was vor dem offiziellen Start noch erledigt werden muss.
// Firmendaten werden automatisch geprüft, der Rest wird hier von Hand abgehakt (done: true).
import { company, isMissing, references, SHOW_HINTS, PHONE_IS_PLACEHOLDER, WAAS } from './site';

export type Todo = {
  title: string;
  detail: string;
  where: string;
  done: boolean;
  priority: 'pflicht' | 'wichtig' | 'später';
};

type TextField = Exclude<keyof typeof company, 'sameAs'>;

const companyFields: [TextField, string, string][] = [
  ['managingDirector', 'Name der Geschäftsführung', 'Pflichtangabe im Impressum und in jeder geschäftlichen E-Mail.'],
  ['street', 'Straße & Hausnummer', 'Ladungsfähige Anschrift – Pflicht im Impressum (§ 5 DDG).'],
  ['zip', 'Postleitzahl', 'Teil der Anschrift im Impressum.'],
  ['city', 'Ort', 'Teil der Anschrift im Impressum.'],
  ['registerCourt', 'Registergericht', 'Steht im Handelsregisterauszug, z. B. „Amtsgericht München“.'],
  ['registerNumber', 'Handelsregisternummer (HRB)', 'Steht im Handelsregisterauszug.'],
  ['vatId', 'Umsatzsteuer-ID', 'Kommt vom Bundeszentralamt für Steuern. Falls noch nicht vorhanden: Zeile im Impressum vorerst entfernen.'],
  ['phone', 'Telefonnummer (aktuell erfundener Platzhalter 0151 00000000)', 'Echte Nummer eintragen und PHONE_IS_PLACEHOLDER auf false setzen – die Nummer steht in Header, Footer, WhatsApp-Links und Kontakt.'],
  ['hoster', 'Server-Hoster (Name & Anschrift)', 'Pflichtangabe in der Datenschutzerklärung, sobald die Website auf dem eigenen Server liegt.'],
];

const auto: Todo[] = companyFields.map(([key, title, detail]) => ({
  title,
  detail,
  where: `src/config/site.ts → company.${key}`,
  done: !isMissing(company[key]) && !(key === 'phone' && PHONE_IS_PLACEHOLDER),
  priority: key === 'phone' ? 'wichtig' : 'pflicht',
}));

const manual: Todo[] = [
  { title: 'Website entwickelt & online', detail: 'Alle Seiten mobil & Desktop, automatisches Deployment per GitHub Actions.', where: 'github.com/cansi798/waybuild_website', done: true, priority: 'pflicht' },
  { title: 'SEO-Grundlagen', detail: 'Meta-Daten, strukturierte Daten (JSON-LD), Sitemap, Lighthouse SEO 100.', where: 'src/layouts/BaseLayout.astro, src/lib/schema.ts', done: true, priority: 'pflicht' },
  { title: 'Favicon & Social-Media-Vorschau', detail: 'Icons für Browser, iPhone, Android sowie Vorschaubild für WhatsApp/LinkedIn.', where: 'public/', done: true, priority: 'wichtig' },
  { title: 'CI-Handbuch', detail: 'Logo, Farben, Schriften, Tonalität, Visitenkarte, E-Mail-Signatur – nur intern als PDF.', where: 'intern/Waybuild-CI-Handbuch.pdf (nicht in Git)', done: true, priority: 'wichtig' },
  {
    title: 'Domain & Server bereitstellen, Website hochladen',
    detail: 'GitHub Pages ist nur die Vorschau. Live-Build (Actions → Artifacts → waybuild-server-upload) auf den Server laden – Anleitung in der README.',
    where: 'README.md → „Live gehen (eigener Server)“',
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
    detail: 'Web3Forms und WhatsApp sind jetzt beschrieben (Oktober 2026). Vor dem Start prüfen lassen: Anbieterangaben/AV-Vertrag Web3Forms und Abschnitt Hosting nach Umzug auf den eigenen Server.',
    where: 'src/pages/datenschutz.astro',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Kontaktformular aktivieren (Web3Forms)',
    detail: 'Auf web3forms.com mit kontakt@waybuild.de einen kostenlosen Access-Key holen und in GitHub als Variable WEB3FORMS_KEY speichern. Danach kommen Anfragen direkt per E-Mail an.',
    where: 'GitHub → Settings → Secrets and variables → Actions → Variables',
    done: Boolean(import.meta.env.PUBLIC_WEB3FORMS_KEY),
    priority: 'wichtig',
  },
  {
    title: 'Monatspreis für Website as a Service festlegen',
    detail: 'Seit der Unternehmensvision (17.10.2026) gibt es nur noch ein Angebot. Solange kein Preis eingetragen ist, steht auf der Website „Fester Monatspreis – nennen wir im Erstgespräch“.',
    where: 'src/config/site.ts → WAAS.preisMonat',
    done: WAAS.preisMonat !== null,
    priority: 'pflicht',
  },
  {
    title: 'AGB an Website as a Service anpassen',
    detail: 'Die AGB beschreiben noch das alte Modell: Tarife Start/Business/Premium (§ 2), Einrichtungsgebühr (§ 4), 12 Monate Mindestlaufzeit (§ 5) und Website-/Code-Übernahme erst nach der Laufzeit gegen Gebühr (§ 6). Neu laut Website: keine Einrichtungskosten, 24 Monate, Website/Code/Domain gehören dem Kunden – anwaltlich angleichen lassen.',
    where: 'src/pages/agb.astro',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Leistungsversprechen absichern',
    detail: '„Live in 14 Tagen“, „Sprachgesteuerte Änderungen“ und „KI-gestützte Erstellung“ stehen als Bestandteile auf der Website. Prozesse und Werkzeuge so aufsetzen, dass das eingehalten wird.',
    where: 'src/config/site.ts → INKLUSIVE, faqs',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Leistungsbeschreibungen für Abos (SLA, Fair Use, Speicher)',
    detail: 'Für IT-Betreuung, Nextcloud-Hosting und Software-Pflege je eine kurze Leistungsbeschreibung als Anlage zum Angebot erstellen – inkl. AV-Vertrag (Art. 28 DSGVO) für Nextcloud und IT.',
    where: 'Eigenes Dokument, Verweis in src/pages/agb.astro § 2a',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Rechnungsvorlage: Bankverbindung (IBAN) & Steuernummer',
    detail: 'Für die ersten Abo-Rechnungen: IBAN, Steuernummer bzw. USt-ID auf Rechnung und im Angebot. Nicht auf der Website nötig.',
    where: 'Buchhaltung / Rechnungsprogramm',
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
    title: 'Social-Profile & Google-Unternehmensprofil verknüpfen',
    detail: 'Links in company.sameAs eintragen – Google verbindet dann Website und Profile zu einer Marke.',
    where: 'src/config/site.ts → company.sameAs',
    done: company.sameAs.length > 0,
    priority: 'später',
  },
  {
    title: 'Firmensitz / Einzugsgebiet für lokales SEO',
    detail: 'Adresse Norderstedt ist eingetragen – die Seite meldet waybuild jetzt als lokales Unternehmen (ProfessionalService) an Google. Optional später: Stadt in Titel & Texte aufnehmen („IT-Service Norderstedt“).',
    where: 'src/config/site.ts → company, src/pages/index.astro',
    done: true,
    priority: 'wichtig',
  },
  {
    title: 'Finales Logo (optional)',
    detail: 'Das waybuild-IT-Logo ist eingebaut (Header, Footer, Icons, Vorschaubild). Für noch schärfere Darstellung später eine SVG-Fassung vom Designer einsetzen.',
    where: 'public/logo-waybuild-it.png, src/components/Logo.astro',
    done: true,
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
