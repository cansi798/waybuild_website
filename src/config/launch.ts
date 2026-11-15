// Launch-Checkliste: alles, was vor dem offiziellen Start noch erledigt werden muss.
// Firmendaten werden automatisch geprüft, der Rest wird hier von Hand abgehakt (done: true).
import { company, isMissing, references, SHOW_HINTS, PHONE_IS_PLACEHOLDER } from './site';

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
  ['phone', 'Telefon- und WhatsApp-Nummer', 'Eingetragen (Jamil #6055 Fr. 1/2): 0151 56156578, auch WhatsApp. Steht in Kopf, Handy-Menü, Footer, Kontakt, Impressum, JSON-LD und llms.txt.'],
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
    title: `E-Mail-Postfach ${company.email} einrichten bzw. prüfen`, // Jamil #6055 Fr. 12
    detail: 'Die Adresse steht überall auf der Website (auch im Impressum) – sie muss vor dem Start funktionieren.',
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
    title: 'Kontaktformular mit unserem CRM verbinden',
    detail: 'Jamil #6055 Fr. 3: Das Formular wird mit unserem CRM verbunden. Bis dahin bleibt der Versand wie er ist (ohne Web3Forms-Key öffnet sich das E-Mail-Programm). Danach eine echte Test-Anfrage bis ins CRM verfolgen.',
    where: 'GitHub → Settings → Secrets and variables → Actions → Variables',
    done: Boolean(import.meta.env.PUBLIC_WEB3FORMS_KEY),
    priority: 'wichtig',
  },
  {
    title: 'Monatspreise für das Website-Abo festlegen',
    detail: 'Festgelegt (Jamil, Talk qh87y3sj #5056, 08.11.2026; #5450–#5464, 10.11.2026): Basis 79,99 €, Plus 149,99 € im Monat, netto zzgl. MwSt., ohne Einmalkosten; optional zusätzlich „Rundum digital“ (Auftragsverwaltung) ab 369,99 € im Monat netto, Kombipreise Basis + Rundum digital ab 419,99 € (statt 449,98 €), Plus + Rundum digital ab 489,99 € (statt 519,98 €), nicht zusammen mit dem Gesamtpaket der Extras; das frühere Paket Komplett (299,99 €) und die Premium-Karte (599 €) sind entfallen; einmalig dazubuchbar Logo 349 €, Geschäftspapiere 129 €, Visitenkarten 59 €, E-Mail-Signatur 39 € oder alle vier als Gesamtpaket 499 € (Jamil #5085–#5089); 24 Monate Mindestlaufzeit.',
    where: 'src/config/pakete-abo.ts → ABO_PAKETE, KOMPLETTPAKET, EINMALIG_DAZU',
    done: true,
    priority: 'pflicht',
  },
  {
    title: 'AGB an das Website-Abo anpassen',
    detail: 'Die AGB beschreiben noch das alte Modell: Tarife Start/Business/Premium (§ 2), Einrichtungsgebühr (§ 4), 12 Monate Mindestlaufzeit (§ 5) und Website-/Code-Übernahme erst nach der Laufzeit gegen Gebühr (§ 6). Neu laut Website (08.11.2026, Jamil #5056; 10.11.2026, #5450–#5464): zwei Pakete Basis / Plus (79,99 / 149,99 € netto), optional zusätzlich „Rundum digital“ mit Auftragsverwaltung ab 369,99 € netto (Kombipreise ab 419,99 / ab 489,99 €, nicht mit dem Gesamtpaket der Extras), keine Einrichtungskosten, einmalig dazubuchbar Logo / Geschäftspapiere / Visitenkarten / E-Mail-Signatur (349 / 129 / 59 / 39 € netto, alle vier 499 €), 24 Monate Mindestlaufzeit (§ 5 schon angepasst), keine Eigentumsaussage zu Website/Code/Domain (Mietmodell offen), bis zu 20 E-Mail-Postfächer, Nutzungsrechte am Logo – § 2, § 4, § 6 und Fair-Use-Regel anwaltlich angleichen lassen.',
    where: 'src/pages/agb.astro',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Leistungsversprechen absichern',
    detail: '„Live in 14 Tagen“, „Sprachgesteuerte Änderungen“, „KI-gestützte Erstellung“, die Service-Versprechen (u. a. „kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr)“, „Antwort in der Regel am nächsten Werktag“) und die selbstoptimierende „Intelligente Website“ stehen auf der Website. Für die Auswertung von Besucherdaten Datenschutzerklärung/Einwilligung prüfen. Prozesse und Werkzeuge so aufsetzen, dass das eingehalten wird.',
    where: 'src/config/site.ts → faqs',
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
    title: 'Startseite: Test-Zitate von Can und Jamil bestätigen',
    detail: 'Fotos sind drin (12.11.2026, Jamil #5636/#5637). Die beiden Zitate in „Wer hinter webgold steht“ sind TEST-Zitate („erfinden, nur für den Test“) und müssen vor Livegang von Can und Jamil bestätigt oder ersetzt werden; bis dahin nur in der Vorschau. Cans Foto-Quelle hat nur 256 px (höchstens ~180 px zeigen).',
    where: 'src/config/startseite.ts → TEAM, src/pages/index.astro (#team)',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Kundenzitate von Kerim, Bauwelt und Funkelfilm einholen (Jamil #6055 Fr. 4)',
    detail: 'Je ein kurzer Satz in Alltagssprache mit Name, mit Freigabe. Eintragen in REFERENZEN.liste[].zitat; bis dahin steht in der Vorschau ein Platzhalter. Nichts erfinden.',
    where: 'src/config/startseite.ts → REFERENZEN',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Schriftliche Freigaben der gezeigten Kunden ablegen (Jamil #6055 Fr. 5)',
    detail: 'Je Kunde eine kurze E-Mail-Freigabe (Projekt, Name, Bilder, Zitat) ablegen; ohne Freigabe Projekt ausblenden.',
    where: 'Ablage Kundenunterlagen; src/config/startseite.ts → REFERENZEN',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Bewertungsprofile Google und Trustpilot anlegen (Jamil #6055 Fr. 6)',
    detail: 'Profile legen Can und Jamil selbst an. Danach Profil-Links in BEWERTUNGEN.profile und company.sameAs eintragen; echte Bewertungen in BEWERTUNGEN.liste – erst dann erscheint der Abschnitt auf der Startseite.',
    where: 'src/config/startseite.ts → BEWERTUNGEN, src/config/site.ts → company.sameAs',
    done: false,
    priority: 'wichtig',
  },
  {
    title: 'Gründungsgeschichte bestätigen (Jamil #6055 Fr. 10)',
    detail: 'Auf „Über uns“ steht ein Entwurf (nur Vorschau, als Platzhalter markiert). Von Can und Jamil in eigenen Worten bestätigen oder ersetzen, dann GRUENDUNG.bestaetigt = true.',
    where: 'src/config/ueber-uns.ts → GRUENDUNG',
    done: false,
    priority: 'wichtig',
  },
  {
    title: '15-Seiten-Grenze in den AGB regeln (Jamil #6055 Fr. 30)',
    detail: 'Die Website nennt jetzt „bis zu 15 Seiten“ statt „keine Seitenbegrenzung“. Die AGB (Fair-Use-Regel) wurden nicht geändert – mit dem Anwalt angleichen.',
    where: 'src/pages/agb.astro, src/config/pakete-abo.ts → SEITEN_MAX',
    done: false,
    priority: 'pflicht',
  },
  {
    title: 'Unterseiten mit eigenen Inhalten statt Kopien (Jamil #6055 Fr. 36)',
    detail: 'Nach dem Start schrittweise: Vergleichstabelle und Einzellösungen-Abschnitt stehen auf mehreren Seiten gleich.',
    where: 'src/pages/*',
    done: false,
    priority: 'später',
  },
  {
    title: 'Startseite: echte Kundenstimmen',
    detail: 'Abschnitt „Was unsere Kunden sagen“ ist ausgeblendet (Jamil #5289). Erst mit echten Zitaten und Zustimmung der Kunden wieder einschalten, keine erfundenen Bewertungen oder Sterne.',
    where: 'src/config/startseite.ts → STIMMEN, src/pages/index.astro (#stimmen, STIMMEN_ZEIGEN)',
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
    detail: 'Adresse Norderstedt ist eingetragen – die Seite meldet webgold jetzt als lokales Unternehmen (ProfessionalService) an Google. Optional später: Stadt in Titel & Texte aufnehmen („IT-Service Norderstedt“).',
    where: 'src/config/site.ts → company, src/pages/index.astro',
    done: true,
    priority: 'wichtig',
  },
  {
    title: 'Finales Logo (optional)',
    detail: 'Logo-Entwurf C „Reine Wortmarke“ als SVG eingebaut (Jamil, Talk qh87y3sj #5226/#5227): Header, Footer (Negativ), Favicon, App-Icons, Vorschaubild.',
    where: 'src/components/Logo.astro, public/logo-webgold.svg, public/logo-webgold-negativ.svg (alt: logo-waybuild*.svg)',
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
