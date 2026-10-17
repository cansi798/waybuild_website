// Leistungen (Stand: Unternehmensvision 17.10.2026). Es gibt EIN Angebot: „Website as a Service“.
// Die Website-Leistungen (Säule „websites“) beschreiben, was wir in diesem Modell bauen – ohne eigene Pakete/Preise.
// Software, Cloud & IT und Beratung sind „Ausbaustufen auf Anfrage“ (Schritte zur digitalen Unternehmensplattform).
// Jede Leistung hat eine eigene Seite unter /leistungen/<slug>/ (URLs bleiben stabil).
import { WAAS, type IconName } from './site';
import type { Saeule } from './angebot';

export type Leistung = {
  slug: string;
  saeule: Saeule;
  /** Eigener Title (≤ 49 Zeichen, „ | Waybuild“ kommt dazu) und Meta-Description (70–160) */
  seo: { title: string; description: string };
  icon: IconName;
  title: string;
  /** Headline-Teile: „pre“ + farbiges Akzentwort */
  pre: string;
  accent: string;
  /** Kurztext auf der Kachel */
  teaser: string;
  /** Einleitung auf der Detailseite (1–2 Sätze) */
  lead: string;
  /** Leistungsumfang als Häkchen-Liste */
  umfang: string[];
  /** Typische Ausgangslage beim Kunden („Kennen Sie das?“) */
  problem?: string[];
  /** Ablauf in Schritten (Website-Leistungen nutzen den gemeinsamen 3-Schritte-Ablauf aus site.ts) */
  ablauf?: { title: string; text: string }[];
  /** Passendes Versprechen (id aus versprechen.ts) … */
  siegel: string;
  /** … oder eine eigene Zusage, wenn das Geschäftsmodell-Siegel nicht passt */
  zusage?: { icon: IconName; title: string; text: string };
  faq: { q: string; a: string }[];
  /** Grafik der Kachel (kein Foto nötig) */
  grafik: 'seite' | 'shop' | 'landing' | 'relaunch' | 'pflege' | 'software' | 'code' | 'cloud' | 'it' | 'analyse' | 'abo';
};

export const leistungen: Leistung[] = [
  /* ───────────── Website as a Service: was wir darin bauen ───────────── */
  {
    saeule: 'websites',
    slug: 'business-website',
    seo: { title: 'Business-Website als Service', description: 'Business-Website für KMU als Service: persönliche Beratung, KI-gestützte Umsetzung, Hosting und Betreuung – fester Monatspreis, keine Einrichtungskosten.' },
    icon: 'layout',
    title: 'Business-Website',
    pre: 'Die Website für Ihr ',
    accent: 'Unternehmen',
    teaser: 'Leistungen, Team, Referenzen, Kontakt – strategisch geplant, damit Anfragen kommen.',
    lead: 'Ihre Unternehmens-Website: erst gemeinsam durchdacht, dann KI-gestützt umgesetzt und laufend betreut.',
    umfang: [
      'Beratung zu Zielgruppen, Positionierung und Customer Journey',
      'Individuelles Design nach Ihrem Corporate Design',
      'Leistungen, Team, Referenzen, Kontakt – klar strukturiert',
      'Anfrage- und Kontaktformulare für mehr Leads',
      'Technisches und lokales SEO',
    ],
    siegel: 'eigentum',
    faq: [
      { q: 'Wie viele Seiten sind sinnvoll?', a: 'Das klären wir in der Beratung – passend zu Ihren Zielgruppen und Leistungen. Für die meisten Unternehmen reichen 5 bis 12 Seiten.' },
      { q: 'Können wir Inhalte später ändern?', a: 'Ja. Änderungen gehören zur laufenden Betreuung – sagen Sie uns einfach, was sich ändern soll.' },
    ],
    grafik: 'seite',
  },
  {
    saeule: 'websites',
    slug: 'online-shop',
    seo: { title: 'Online-Shop als Service für Unternehmen', description: 'Online-Shop für Unternehmen als Service: schnell, mobil, rechtssicher – mit Beratung, KI-gestützter Umsetzung, Hosting und laufender Betreuung.' },
    icon: 'cart',
    title: 'Online-Shop',
    pre: 'Verkaufen – rund um die ',
    accent: 'Uhr',
    teaser: 'Produkte, Warenkorb, Bezahlung und Versand – ein Shop, der zu Ihrem Sortiment passt.',
    lead: 'Ein Online-Shop, der schnell lädt, auf dem Smartphone funktioniert und sich ohne Technikwissen bedienen lässt.',
    umfang: [
      'Produktkatalog mit Varianten, Kategorien und Suche',
      'Bezahlung per PayPal, Kreditkarte, Rechnung, SEPA',
      'Versandregeln, Gutscheine, Steuersätze',
      'Rechtssichere Bestellstrecke',
      'Anbindung an Warenwirtschaft oder Kasse auf Anfrage',
    ],
    siegel: 'transparenz',
    faq: [
      { q: 'Welches Shop-System nutzen Sie?', a: 'Das wählen wir passend zu Ihrem Sortiment und Ihren Prozessen – die Empfehlung erhalten Sie im Erstgespräch.' },
      { q: 'Fallen Transaktionsgebühren an?', a: 'Von uns nicht. Gebühren der Zahlungsanbieter (z. B. PayPal) rechnen diese direkt mit Ihnen ab.' },
    ],
    grafik: 'shop',
  },
  {
    saeule: 'websites',
    slug: 'landingpage',
    seo: { title: 'Landingpage als Service – Ziel: Anfragen', description: 'Landingpage für Kampagnen und neue Angebote: klare Botschaft, schnelle Ladezeit, ein Ziel – Anfragen. Als Service mit Beratung und Betreuung.' },
    icon: 'target',
    title: 'Landingpage',
    pre: 'Ein Angebot. Ein Ziel: ',
    accent: 'Anfragen',
    teaser: 'Eine fokussierte Seite für eine Kampagne, ein Produkt oder eine Dienstleistung – schnell live.',
    lead: 'Für Google Ads, LinkedIn-Kampagnen oder ein neues Angebot: eine Seite, die genau ein Ziel verfolgt.',
    umfang: [
      'Klare Botschaft für Ihre Zielgruppe',
      'Anfrageformular, Rückruf oder Terminbuchung',
      'Schnellste Ladezeit für Kampagnen-Traffic',
      'Varianten für A/B-Tests auf Wunsch',
    ],
    siegel: 'einrichtung',
    faq: [
      { q: 'Wie schnell ist eine Landingpage online?', a: 'Oft innerhalb einer Woche nach Ihren Inhalten – spätestens nach 14 Tagen.' },
      { q: 'Kann ich mehrere Landingpages haben?', a: 'Ja. Weitere Seiten ergänzen wir, wenn sie Ihr Ziel unterstützen – das besprechen wir vorab transparent.' },
    ],
    grafik: 'landing',
  },
  {
    saeule: 'websites',
    slug: 'website-relaunch',
    seo: { title: 'Website-Relaunch ohne Ranking-Verlust', description: 'Website-Relaunch für Unternehmen: neue Strategie, neue Technik, gleiche Adresse – ohne Ausfall und ohne Ranking-Verlust. Als Service mit Betreuung.' },
    icon: 'refresh',
    title: 'Website-Relaunch',
    pre: 'Aus alt wird ',
    accent: 'schnell',
    teaser: 'Ihre bestehende Seite ist langsam, unsicher oder veraltet? Wir bauen sie neu – ohne Ausfall.',
    lead: 'Wir übernehmen Inhalte, Domain und Rankings – und ersetzen die alte Website durch eine schnelle, sichere Neuentwicklung.',
    umfang: [
      'Analyse der bestehenden Website und Rankings',
      'Neue Positionierung und Customer Journey',
      'Übernahme von Inhalten und Domain',
      'Weiterleitungen aller alten Adressen',
      'Umzug ohne Ausfallzeit',
    ],
    siegel: 'lockin',
    faq: [
      { q: 'Verliere ich meine Google-Platzierungen?', a: 'Nein. Wir leiten jede alte Adresse auf die neue Seite weiter und übernehmen Titel, Texte und Struktur. Meist verbessern sich die Rankings durch die schnellere Seite.' },
      { q: 'Was passiert mit meiner WordPress-Seite?', a: 'Wir übernehmen die Inhalte und schalten die alte Seite erst ab, wenn die neue läuft. Auf Wunsch sichern wir Ihnen ein Backup.' },
    ],
    grafik: 'relaunch',
  },
  {
    saeule: 'websites',
    slug: 'betreuung-pflege',
    seo: { title: 'Website-Betreuung & laufende Verbesserung', description: 'Website-Betreuung als Service: Wartung, Backups, Sicherheit, Änderungen und kontinuierliche Verbesserung – ein Ansprechpartner, ein fester Monatspreis.' },
    icon: 'shield',
    title: 'Betreuung & Verbesserung',
    pre: 'Ihre Website wird ',
    accent: 'laufend besser',
    teaser: 'Wartung, Backups, Sicherheit und Änderungen – plus kontinuierliche Verbesserung. Ein Ansprechpartner.',
    lead: 'Eine Website ist nie fertig. Wir kümmern uns dauerhaft um Technik, Sicherheit und Änderungen – und entwickeln sie weiter.',
    umfang: [
      'Wartung, Sicherheitsupdates und Überwachung',
      'Backups',
      'Sprachgesteuerte Änderungen',
      'Ein persönlicher Ansprechpartner',
      'Kontinuierliche Verbesserung Ihrer Inhalte',
    ],
    siegel: 'festpreis',
    faq: [
      { q: 'Was zählt als Änderung?', a: 'Alles, was Inhalte oder Design Ihrer bestehenden Seiten betrifft: Texte, Bilder, Öffnungszeiten, Team, Aktionen. Neue Funktionen besprechen wir vorab transparent.' },
      { q: 'Muss ich mich um Updates kümmern?', a: 'Nein. Updates, Backups und Sicherheit laufen im Hintergrund – das ist Teil des Monatspreises.' },
    ],
    grafik: 'pflege',
  },

  /* ───────────── Ausbaustufen auf Anfrage: Software ───────────── */
  {
    saeule: 'software',
    slug: 'individuelle-software',
    seo: { title: 'Individuelle Software für Unternehmen', description: 'Individuelle Software für Unternehmen: Tools, Automatisierungen und Fachanwendungen – mit Konzept, Festpreis und Quellcode für Sie. Auf Anfrage.' },
    icon: 'cpu',
    title: 'Individuelle Software',
    pre: 'Software, die zu Ihrem Betrieb ',
    accent: 'passt',
    teaser: 'Maßgeschneiderte Programme, Tools und Automatisierungen für Unternehmen.',
    lead: 'Wenn Standardsoftware nicht passt und Daten doppelt eingetippt werden: Wir entwickeln Software, die Ihre Abläufe abbildet.',
    problem: [
      'Daten werden zwischen Programmen von Hand übertragen',
      'Wichtige Abläufe hängen an Excel-Tabellen und einzelnen Personen',
      'Standardsoftware ist zu groß, zu teuer oder passt nicht',
      'Angebote, Berichte und Dokumente entstehen jedes Mal neu',
    ],
    umfang: [
      'Analyse Ihrer Abläufe – vor Ort oder per Video',
      'Konzept mit Klick-Prototyp, bevor programmiert wird',
      'Entwicklung in Etappen mit Zwischenständen',
      'Schnittstellen zu Ihren bestehenden Programmen',
      'Hosting in Deutschland oder auf Ihren Servern',
      'Einweisung, Dokumentation und Quellcode für Sie',
    ],
    ablauf: [
      { title: 'Erstgespräch', text: 'Kostenlos: Wir verstehen Ihr Anliegen und sagen ehrlich, ob sich Individualsoftware lohnt.' },
      { title: 'Konzept', text: 'Abläufe aufnehmen, Lösung skizzieren, Klick-Prototyp – danach ein Festpreis.' },
      { title: 'Entwicklung', text: 'In Etappen mit Zwischenständen. Sie testen früh und entscheiden mit.' },
      { title: 'Betrieb', text: 'Auf Wunsch betreuen wir die Software dauerhaft – oder übergeben an Ihre IT.' },
    ],
    siegel: 'eigentum',
    zusage: { icon: 'key', title: 'Ihr Code gehört Ihnen', text: 'Sie erhalten Quellcode und Dokumentation. Ihre Software kann jederzeit von Ihrer IT oder einem anderen Dienstleister weiterentwickelt werden.' },
    faq: [
      { q: 'Lohnt sich individuelle Software auch für kleine Unternehmen?', a: 'Oft ja – gerade kleine Teams sparen mit einem passenden Tool viele Stunden. Im Erstgespräch schätzen wir ehrlich ein, ob sich der Aufwand lohnt.' },
      { q: 'Was kostet eine individuelle Software?', a: 'Das hängt vom Umfang ab. Nach dem Konzept erhalten Sie einen Festpreis – Sie wissen vorher, was es kostet.' },
      { q: 'Wem gehört die Software?', a: 'Ihnen. Sie erhalten nach vollständiger Bezahlung die Nutzungsrechte, den Quellcode und die Dokumentation.' },
    ],
    grafik: 'software',
  },
  {
    saeule: 'software',
    slug: 'software-webentwicklung',
    seo: { title: 'Software- & Webentwicklung: Web-Apps & APIs', description: 'Web-Anwendungen, Kundenportale und Schnittstellen für Unternehmen – Konzept und Umsetzung aus einer Hand. Individuelles Angebot auf Anfrage.' },
    icon: 'code',
    title: 'Software- & Webentwicklung',
    pre: 'Von der Idee zur ',
    accent: 'Web-Anwendung',
    teaser: 'Kundenportale, Buchungssysteme, Dashboards und Schnittstellen – aus einer Hand.',
    lead: 'Digitale Lösungen, die im Browser auf jedem Gerät laufen: vom Kundenportal bis zur Schnittstelle zwischen Ihren Programmen.',
    problem: [
      'Kunden fragen per Telefon, was sie online selbst erledigen könnten',
      'Ihre Website soll mehr können als informieren',
      'Bestehende Systeme sollen Daten automatisch austauschen',
      'Eine Produktidee braucht einen schnellen ersten Stand (MVP)',
    ],
    umfang: [
      'Konzept, Nutzerführung und Design',
      'Web-Anwendungen mit Login, Rollen und Datenbank',
      'Schnittstellen zu Warenwirtschaft, CRM, Zahlungsanbietern',
      'Schnell, barrierearm und sicher',
      'Automatische Tests und Versionierung',
      'Betrieb in Deutschland',
    ],
    ablauf: [
      { title: 'Ziel klären', text: 'Was soll die Anwendung leisten, für wen, bis wann?' },
      { title: 'Entwurf', text: 'Klick-Prototyp und Festpreis – Sie sehen vorher, was entsteht.' },
      { title: 'Umsetzung', text: 'Kurze Etappen, Testzugang ab der ersten Etappe.' },
      { title: 'Livegang', text: 'Wir bringen die Anwendung online und entwickeln sie mit Ihnen weiter.' },
    ],
    siegel: 'eigentum',
    zusage: { icon: 'gauge', title: 'Schnell und schlank gebaut', text: 'Wenige, bewährte Bausteine statt überladener Frameworks: lädt schnell, hat weniger Angriffsfläche und bleibt langfristig pflegbar.' },
    faq: [
      { q: 'Brauche ich eine App aus dem App-Store?', a: 'Meist nicht. Web-Anwendungen laufen im Browser auf Smartphone, Tablet und PC und lassen sich wie eine App auf den Startbildschirm legen.' },
      { q: 'Können Sie unsere bestehende Software erweitern?', a: 'Ja, sofern Quellcode oder Schnittstellen zugänglich sind. Nach einer kurzen Sichtung nennen wir Ihnen den Aufwand vorab.' },
    ],
    grafik: 'code',
  },

  /* ───────────── Ausbaustufen auf Anfrage: Cloud & IT ───────────── */
  {
    saeule: 'cloud',
    slug: 'nextcloud',
    seo: { title: 'Nextcloud für Unternehmen', description: 'Nextcloud-Einrichtung, Hosting und Betreuung: eigene Cloud mit Online-Office, Talk und Backups auf Servern in Deutschland. Individuelles Angebot.' },
    icon: 'cloud',
    title: 'Nextcloud für Unternehmen',
    pre: 'Ihre eigene Cloud – ',
    accent: 'sicher in Deutschland',
    teaser: 'Dateien, Kalender, Videocalls und Office in Ihrer eigenen Cloud – auf Wunsch in Ihrem Design.',
    lead: 'Dateien teilen, gemeinsam an Dokumenten arbeiten, Videokonferenzen führen – in Ihrer eigenen Nextcloud statt bei US-Konzernen.',
    problem: [
      'Firmendaten liegen verstreut in privaten Cloud-Konten',
      'Unklar, wer worauf Zugriff hat',
      'Videokonferenzen und Dokumente laufen über Dienste außerhalb der EU',
      'Lizenzkosten für Office-Pakete steigen regelmäßig',
    ],
    umfang: [
      'Eigene Nextcloud-Instanz unter Ihrer Domain',
      'Dateien, Kalender, Kontakte, Aufgaben',
      'Nextcloud Talk für Chat und Videokonferenzen',
      'Online-Office im Browser',
      'Zwei-Faktor-Anmeldung, Rechte und Gruppen',
      'Backups, Updates und Überwachung',
      'Umzug Ihrer Daten aus anderen Cloud-Diensten',
      'White Label: Ihr Logo, Ihre Farben',
    ],
    ablauf: [
      { title: 'Bedarf klären', text: 'Wie viele Nutzer, welche Daten, welche Programme?' },
      { title: 'Einrichtung', text: 'Instanz, Domain, Benutzer, Freigaben und Sicherheit – fertig konfiguriert.' },
      { title: 'Umzug & Einweisung', text: 'Wir übernehmen Ihre Daten und zeigen Ihrem Team die wichtigsten Funktionen.' },
      { title: 'Betrieb', text: 'Updates, Backups, Überwachung und Support – Sie arbeiten einfach.' },
    ],
    siegel: 'lockin',
    zusage: { icon: 'lock', title: 'Wir nutzen, was wir anbieten', text: 'Unsere eigene Zusammenarbeit läuft über eine selbst betriebene, gehärtete Nextcloud. Sie bekommen eine Einrichtung, die sich im Alltag bewährt hat.' },
    faq: [
      { q: 'Was ist Nextcloud?', a: 'Eine Open-Source-Plattform für Dateien, Kalender, Kontakte, Chat, Videokonferenzen und Online-Office – auf eigenen Servern, unter Ihrer Kontrolle.' },
      { q: 'Wo liegen meine Daten?', a: 'Bei unserem Hosting auf Servern in Deutschland, in einer eigenen Instanz nur für Ihr Unternehmen – oder auf Ihrem eigenen Server.' },
      { q: 'Können wir von Dropbox, Google Drive oder OneDrive umziehen?', a: 'Ja. Wir übernehmen Ihre Daten inklusive Ordnerstruktur. Den Aufwand nennen wir vorab als Festpreis.' },
      { q: 'Ersetzt Nextcloud Microsoft 365?', a: 'Für viele Teams ja. E-Mail und spezielle Programme prüfen wir im Erstgespräch – oft lassen sich beide Welten verbinden.' },
    ],
    grafik: 'cloud',
  },
  {
    saeule: 'cloud',
    slug: 'cloud-it',
    seo: { title: 'IT-Betreuung & Cloud für Unternehmen', description: 'Sichere IT für KMU: Cloud-Server, Backups, Updates und Helpdesk – mit festem Ansprechpartner und Servern in Deutschland. Individuelles Angebot.' },
    icon: 'server',
    title: 'Cloud- & IT-Lösungen',
    pre: 'IT, die einfach ',
    accent: 'läuft',
    teaser: 'Server, Backups, Arbeitsplätze und Betreuung – sicher eingerichtet und laufend betreut.',
    lead: 'Server, Cloud-Dienste, Backups und Arbeitsplätze – sicher eingerichtet und laufend betreut.',
    problem: [
      'Niemand ist richtig für die IT zuständig',
      'Backups gibt es vielleicht – getestet wurden sie nie',
      'Updates werden verschoben, Passwörter mehrfach verwendet',
      'Neue Mitarbeitende warten tagelang auf Zugänge',
    ],
    umfang: [
      'Bestandsaufnahme und IT-Sicherheits-Check',
      'Cloud-Server: Einrichtung, Härtung, Betrieb',
      'Backups nach der 3-2-1-Regel – mit Wiederherstellungstest',
      'Überwachung und automatische Updates',
      'E-Mail, Benutzer und Rechte zentral verwalten',
      'Zwei-Faktor-Anmeldung und Passwortmanager',
    ],
    ablauf: [
      { title: 'Sicherheits-Check', text: 'Geräte, Konten, Backups und Risiken erfassen – mit Maßnahmenplan.' },
      { title: 'Aufräumen', text: 'Kritische Punkte zuerst: Backups, Updates, Zugänge, Passwörter.' },
      { title: 'Betreuung', text: 'Überwachung, Updates und Helpdesk – planbar und dokumentiert.' },
      { title: 'Weiterentwickeln', text: 'Neue Mitarbeitende, Standorte oder Cloud-Dienste – wir wachsen mit.' },
    ],
    siegel: 'transparenz',
    zusage: { icon: 'shield', title: 'Backups, die wirklich funktionieren', text: 'Ein Backup ist erst etwas wert, wenn die Wiederherstellung klappt. Wir testen sie regelmäßig und dokumentieren das Ergebnis.' },
    faq: [
      { q: 'Für welche Unternehmensgröße ist das gedacht?', a: 'Für kleine und mittlere Unternehmen ohne eigene IT-Abteilung – oder deren IT entlastet werden soll.' },
      { q: 'Kommen Sie auch vor Ort?', a: 'Die meisten Anliegen lösen wir per Fernwartung. Vor-Ort-Einsätze im Raum Hamburg sind nach Absprache möglich.' },
    ],
    grafik: 'it',
  },

  /* ───────────── Ausbaustufen auf Anfrage: Beratung ───────────── */
  {
    saeule: 'beratung',
    slug: 'wettbewerbsanalyse',
    seo: { title: 'Wettbewerbsanalyse für Unternehmen', description: 'Wettbewerbsanalyse für Unternehmen: Leistungen, Preise und Online-Auftritt vergleichbarer Anbieter, Stärken und klare Empfehlungen. Auf Anfrage.' },
    icon: 'compass',
    title: 'Wettbewerbsanalyse',
    pre: 'Wissen, wo Sie im Markt ',
    accent: 'stehen',
    teaser: 'Vergleichbare Anbieter, Leistungen, Preise und Ihre Vorteile – klar aufbereitet.',
    lead: 'Was bieten vergleichbare Anbieter, zu welchen Preisen, und wie treten sie online auf? Wir zeigen, wo Ihre Stärken liegen.',
    problem: [
      'Sie sind unsicher, ob Ihre Preise passen',
      'Neue Anbieter tauchen auf – und Sie wissen nicht, was sie anders machen',
      'Ein neues Angebot oder eine neue Website steht an',
      'Im Verkauf wird aus dem Bauch heraus argumentiert',
    ],
    umfang: [
      'Auswahl der relevanten Wettbewerber mit Ihnen',
      'Vergleich von Leistungen und öffentlich genannten Preisen',
      'Online-Auftritt: Website, Google-Sichtbarkeit, Bewertungen',
      'Stärken, Schwächen und Lücken im Markt',
      'Empfehlungen zu Positionierung und Preisgestaltung',
      'Bericht als PDF und persönliche Besprechung',
    ],
    ablauf: [
      { title: 'Auftakt', text: 'Ziele, Zielgruppe und die Wettbewerber, die Sie kennen.' },
      { title: 'Recherche', text: 'Angebote, Preise und Online-Auftritte – nachvollziehbar mit Quellen.' },
      { title: 'Bericht', text: 'Übersichtlicher Vergleich und klare Empfehlungen.' },
      { title: 'Besprechung', text: 'Ergebnisse gemeinsam durchgehen, nächste Schritte festlegen.' },
    ],
    siegel: 'transparenz',
    zusage: { icon: 'search', title: 'Belegt statt behauptet', text: 'Jede Aussage im Bericht ist mit Quelle und Datum versehen oder klar als Einschätzung gekennzeichnet. Wir nutzen nur öffentlich zugängliche Informationen.' },
    faq: [
      { q: 'Woher kommen die Informationen?', a: 'Aus öffentlich zugänglichen Quellen: Websites, Preislisten, Branchenverzeichnisse, Bewertungsportale und Suchergebnisse – jeweils mit Datum.' },
      { q: 'Wie lange dauert eine Analyse?', a: 'Je nach Umfang liegt der Bericht nach 5 bis 10 Werktagen vor, gerechnet ab dem Auftaktgespräch.' },
    ],
    grafik: 'analyse',
  },
  {
    saeule: 'software',
    slug: 'abo-wartung',
    seo: { title: 'Betreuung im Abo: ein Modell statt vieler', description: `Statt vieler Abos und Pakete: ${WAAS.name} – ein Preis, ein Ansprechpartner, ein System. Betreuung für Software, Nextcloud und IT auf Anfrage.` },
    icon: 'refresh',
    title: 'Betreuung im Abo',
    pre: 'Ein Preis. ',
    accent: 'Alles betreut.',
    teaser: `Statt vieler Abos: ${WAAS.name}. Betreuung für Software, Cloud und IT auf Anfrage.`,
    lead: `Wir haben unsere Abos vereinfacht: Für Websites gibt es nur noch ${WAAS.name}. Betreuung für Software, Nextcloud und IT stimmen wir individuell ab.`,
    umfang: [
      `${WAAS.name}: Hosting, Wartung, Backups und Betreuung in einem Preis`,
      'Software-Pflege: Betrieb, Updates, Weiterentwicklung – auf Anfrage',
      'Nextcloud- und IT-Betreuung – auf Anfrage',
      'Ein persönlicher Ansprechpartner',
    ],
    siegel: 'festpreis',
    faq: [
      { q: 'Welche Abos gibt es noch?', a: `Für Websites nur noch eins: ${WAAS.name}. Betreuung für Software, Nextcloud und IT stimmen wir individuell mit Ihnen ab.` },
    ],
    grafik: 'abo',
  },
];

export const leistungBySlug = (slug: string) => leistungen.find((l) => l.slug === slug);
export const leistungenNach = (saeule: Saeule) => leistungen.filter((l) => l.saeule === saeule);
/** Kurz-Label für Kacheln/Navigation – keine Paketpreise mehr. */
export const leistungAb = (l: Leistung) => (l.saeule === 'websites' ? `Im ${WAAS.name}` : 'Ausbaustufe · auf Anfrage');
