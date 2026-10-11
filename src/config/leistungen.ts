// Leistungen in vier Säulen (Wunsch 11.10.2026): Websites · Software · Cloud & IT · Beratung.
// Jede Leistung hat eine eigene Seite unter /leistungen/<slug>/. Website-Leistungen verweisen auf einen
// Website-Tarif (plan), alle anderen bringen eigene Pakete mit (Preise aus angebot.ts).
import { plans, type IconName } from './site';
import {
  type Saeule, type Paket, type Zusatz,
  SOFTWARE_PROJEKTE, WEBDEV_PAKETE, PFLEGE_PAKETE, NEXTCLOUD_PAKETE, NEXTCLOUD_ZUSATZ,
  IT_PAKETE, IT_ZUSATZ, ANALYSE_PAKETE, ANALYSE_ZUSATZ, STUNDENSATZ, STUNDENSATZ_VERTRAG,
} from './angebot';

const preis = (id: 'start' | 'business' | 'premium') => plans.find((p) => p.id === id)!.monthly;

export type Leistung = {
  slug: string;
  saeule: Saeule;
  /** Eigener Title (≤ 49 Zeichen, „ | Waybuild“ kommt dazu) und Meta-Description (70–160) */
  seo?: { title: string; description: string };
  icon: IconName;
  title: string;
  /** Headline-Teile: „pre“ + farbiges Akzentwort */
  pre: string;
  accent: string;
  /** Kurztext auf der Kachel */
  teaser: string;
  /** Einleitung auf der Detailseite */
  lead: string;
  /** Leistungsumfang als Häkchen-Liste */
  umfang: string[];
  /** Fließtext (1–2 Absätze) */
  text: string[];
  /** Empfohlener Website-Tarif + Begründung (nur Säule „websites“) */
  plan?: 'start' | 'business' | 'premium';
  planReason?: string;
  /** Eigene Pakete (alle anderen Säulen) */
  pakete?: Paket[];
  paketeTitel?: [string, string];
  paketeText?: string;
  zusatz?: Zusatz[];
  /** Typische Ausgangslage beim Kunden („Kennen Sie das?“) */
  problem?: string[];
  /** Ablauf in Schritten */
  ablauf?: { title: string; text: string }[];
  /** Passendes Versprechen (id aus versprechen.ts) … */
  siegel: string;
  /** … oder eine eigene Zusage, wenn die Website-Versprechen nicht passen */
  zusage?: { icon: IconName; title: string; text: string };
  /** Kurzer Preis-Teaser für Kacheln/Navigation, z. B. „ab 7,90 € pro Nutzer / Monat“ */
  ab?: string;
  faq: { q: string; a: string }[];
  /** Grafik der Kachel (kein Foto nötig) */
  grafik: 'seite' | 'shop' | 'landing' | 'relaunch' | 'pflege' | 'software' | 'code' | 'cloud' | 'it' | 'analyse' | 'abo';
};

export const leistungen: Leistung[] = [
  {
    saeule: 'websites',
    slug: 'business-website',
    icon: 'layout',
    title: 'Business-Website',
    pre: 'Die Website für Ihr ',
    accent: 'Unternehmen',
    teaser: 'Leistungen, Team, Referenzen, Kontakt – die professionelle Visitenkarte, die Anfragen bringt.',
    lead: 'Die klassische Unternehmens-Website: individuell gestaltet, auf Ihre Zielgruppe zugeschnitten und so gebaut, dass sie bei Google und in KI-Suchen gefunden wird.',
    umfang: [
      'Individuelles Design nach Ihrem Corporate Design',
      'Bis zu 12 Seiten (Leistungen, Team, Referenzen, Kontakt …)',
      'Anfrage- und Kontaktformulare, auf Wunsch Terminbuchung',
      'Lokales SEO und Google-Unternehmensprofil',
      'Hosting in Deutschland, .de-Domain, SSL, unbegrenzte E-Mails',
    ],
    text: [
      'Ihre Website ist oft der erste Kontakt mit einem neuen Kunden oder Geschäftspartner. Wir sorgen dafür, dass dieser Eindruck stimmt: klare Struktur, schnelle Ladezeit, überzeugende Inhalte – und ein Anfrageweg, der funktioniert.',
      'Sie liefern Texte, Bilder und Logo (oder wir übernehmen das auf Wunsch), wir kümmern uns um den Rest. Spätestens 14 Tage später ist Ihre Website online.',
    ],
    plan: 'business',
    planReason: 'Bis zu 12 Seiten, lokales SEO und Anfrageformulare sind für die meisten Unternehmen der richtige Start.',
    siegel: 'live14',
    faq: [
      { q: 'Wie viele Seiten sind sinnvoll?', a: 'Für die meisten Unternehmen reichen 5 bis 12 Seiten: Start, Leistungen, Über uns, Referenzen, Kontakt sowie je eine Seite pro Kernleistung. Wir beraten Sie im Erstgespräch.' },
      { q: 'Können wir Inhalte später selbst ändern?', a: 'Sie müssen nicht: Änderungen schicken Sie uns per E-Mail, wir setzen sie im Rahmen Ihres monatlichen Kontingents um – meist noch am selben Tag.' },
    ],
    grafik: 'seite',
  },
  {
    saeule: 'websites',
    slug: 'online-shop',
    icon: 'cart',
    title: 'Online-Shop',
    pre: 'Verkaufen – rund um die ',
    accent: 'Uhr',
    teaser: 'Produkte, Warenkorb, Bezahlung und Versand – ein Shop, der zu Ihrem Sortiment passt.',
    lead: 'Ein Online-Shop, der schnell lädt, auf dem Smartphone funktioniert und sich ohne Technikwissen bedienen lässt – inklusive Bezahlanbindung, Versandregeln und Rechtstexten.',
    umfang: [
      'Produktkatalog mit Varianten, Kategorien und Suche',
      'Bezahlung per PayPal, Kreditkarte, Rechnung, SEPA',
      'Versandregeln, Gutscheine, Steuersätze',
      'Rechtssichere Bestellstrecke (Widerruf, AGB, Impressum)',
      'Anbindung an Warenwirtschaft oder Kasse auf Anfrage',
    ],
    text: [
      'Ob 20 oder 2.000 Produkte: Wir bauen Ihren Shop auf einer schlanken, schnellen Basis – ohne überladene Plugin-Sammlungen. Das Ergebnis lädt schnell, ist sicher und lässt sich einfach pflegen.',
      'Im Abo kümmern wir uns dauerhaft um Updates, Sicherheit und Erweiterungen. Sie konzentrieren sich auf Ihre Produkte.',
    ],
    plan: 'premium',
    planReason: 'Shops brauchen laufende Betreuung, schnelle Antwortzeiten und unbegrenzte Seiten.',
    siegel: 'hosting',
    faq: [
      { q: 'Welches Shop-System nutzen Sie?', a: 'Wir wählen das System passend zu Ihrem Sortiment und Ihren Prozessen – von einer schlanken Eigenlösung bis zu etablierten Shop-Systemen. Die Empfehlung erhalten Sie im Erstgespräch.' },
      { q: 'Fallen Transaktionsgebühren an?', a: 'Von uns nicht. Gebühren der Zahlungsanbieter (z. B. PayPal) rechnen diese direkt mit Ihnen ab.' },
    ],
    grafik: 'shop',
  },
  {
    saeule: 'websites',
    slug: 'landingpage',
    icon: 'target',
    title: 'Landingpage',
    pre: 'Ein Angebot. Ein Ziel: ',
    accent: 'Anfragen',
    teaser: 'Eine fokussierte Seite für eine Kampagne, ein Produkt oder eine Dienstleistung – schnell live.',
    lead: 'Für Google Ads, LinkedIn-Kampagnen oder ein neues Angebot: eine einzelne Seite, die genau ein Ziel verfolgt – und dafür optimiert ist.',
    umfang: [
      'Eine Seite, klar auf Ihr Ziel ausgerichtet',
      'Anfrageformular, Rückruf oder Terminbuchung',
      'Schnellste Ladezeit für Kampagnen-Traffic',
      'Tracking-Vorbereitung ohne Cookie-Banner, wo möglich',
      'Varianten für A/B-Tests auf Wunsch',
    ],
    text: [
      'Wer Werbebudget ausgibt, braucht eine Seite, die konvertiert. Wir bauen Landingpages mit klarer Botschaft, starkem Call-to-Action und ohne Ablenkung – in wenigen Tagen live.',
    ],
    plan: 'start',
    planReason: 'Eine Landingpage braucht wenige Seiten – der Start-Tarif reicht in der Regel.',
    siegel: 'speed',
    faq: [
      { q: 'Wie schnell ist eine Landingpage online?', a: 'Oft innerhalb einer Woche nach Ihren Inhalten – spätestens nach 14 Tagen.' },
      { q: 'Kann ich mehrere Landingpages haben?', a: 'Ja. Weitere Seiten lassen sich jederzeit ergänzen – der Tarif wächst mit.' },
    ],
    grafik: 'landing',
  },
  {
    saeule: 'websites',
    slug: 'website-relaunch',
    icon: 'refresh',
    title: 'Website-Relaunch',
    pre: 'Aus alt wird ',
    accent: 'schnell',
    teaser: 'Ihre bestehende Seite ist langsam, unsicher oder veraltet? Wir bauen sie neu – ohne Ausfall.',
    lead: 'Wir übernehmen Ihre Inhalte, Ihre Domain und Ihre Rankings – und ersetzen die alte Website durch eine schnelle, sichere Neuentwicklung. Ohne Ausfallzeit, ohne Datenverlust.',
    umfang: [
      'Analyse der bestehenden Website und Rankings',
      'Übernahme von Inhalten, Domain und E-Mail-Postfächern',
      'Weiterleitungen aller alten Adressen (kein Ranking-Verlust)',
      'Neues Design oder Auffrischung Ihres bestehenden Designs',
      'Umzug ohne Ausfallzeit',
    ],
    text: [
      'Viele Unternehmens-Websites sind nach wenigen Jahren langsam, voller veralteter Plugins und auf dem Smartphone kaum nutzbar. Ein Relaunch mit uns bedeutet: neue Technik, gleiche Adresse, bessere Ergebnisse.',
      'Wir planen den Umzug so, dass Google alle Seiten wiederfindet und Ihre Kunden nichts vom Wechsel merken – außer, dass alles schneller geht.',
    ],
    plan: 'business',
    planReason: 'Ein Relaunch umfasst meist mehrere Seiten und profitiert vom lokalen SEO des Business-Tarifs.',
    siegel: 'code',
    faq: [
      { q: 'Verliere ich meine Google-Platzierungen?', a: 'Nein. Wir leiten jede alte Adresse auf die neue Seite weiter und übernehmen Titel, Texte und Struktur. So bleiben Ihre Rankings erhalten – meist verbessern sie sich durch die schnellere Seite.' },
      { q: 'Was passiert mit meiner WordPress-Seite?', a: 'Wir übernehmen die Inhalte und schalten die alte Seite erst ab, wenn die neue läuft. Auf Wunsch sichern wir Ihnen ein Backup.' },
    ],
    grafik: 'relaunch',
  },
  {
    saeule: 'websites',
    slug: 'betreuung-pflege',
    icon: 'shield',
    title: 'Website-Pflege',
    pre: 'Wir kümmern uns – ',
    accent: 'dauerhaft',
    teaser: 'Updates, Backups, Sicherheit, Änderungen und Monatsreport. Sie haben einen Ansprechpartner.',
    lead: 'Eine Website ist nie fertig. Im Abo übernehmen wir dauerhaft Technik, Sicherheit und Änderungen – mit festen Antwortzeiten und einem persönlichen Ansprechpartner.',
    umfang: [
      'Änderungen per E-Mail, je nach Tarif 30 Min. bis 4 Std. pro Monat',
      'Tägliche Backups, Sicherheitsupdates, Überwachung',
      'Antwortzeit 48 Std. / 24 Std. / 4 Std. je nach Tarif',
      'Monatlicher SEO-Report im Premium-Tarif',
      'Beratung zu neuen Inhalten, Kampagnen und Erweiterungen',
    ],
    text: [
      'Bei Agenturen zahlen Sie für jede Änderung extra, bei Baukästen machen Sie alles selbst. Bei uns ist Betreuung Teil des Abos: Sie schreiben uns, wir setzen um. Sicherheit, Backups und Updates laufen im Hintergrund.',
    ],
    plan: 'business',
    planReason: '90 Minuten Änderungen pro Monat und 24-Stunden-Antwortzeit passen zu den meisten Unternehmen.',
    siegel: 'ansprechpartner',
    faq: [
      { q: 'Was zählt als Änderung?', a: 'Alles, was Inhalte oder Design Ihrer bestehenden Seiten betrifft: neue Texte, Bilder, Öffnungszeiten, Teammitglieder, Aktionen. Neue Funktionen oder ganze Seiten kalkulieren wir vorher transparent.' },
      { q: 'Kann ich das Kontingent ansparen?', a: 'Nicht verfallene Minuten nehmen wir bis zu drei Monate mit – so lassen sich auch größere Anpassungen umsetzen.' },
    ],
    grafik: 'pflege',
  },

  /* ───────────────────────── Software ───────────────────────── */
  {
    saeule: 'software',
    slug: 'individuelle-software',
    seo: { title: 'Individuelle Software für Unternehmen', description: 'Individuelle Software für Unternehmen und Selbstständige: Tools, Automatisierungen und Fachanwendungen zum Festpreis ab 2.900 € netto, Pflege im Abo.' },
    icon: 'cpu',
    title: 'Individuelle Software',
    pre: 'Software, die zu Ihrem Betrieb ',
    accent: 'passt',
    teaser: 'Maßgeschneiderte Programme, Tools und Automatisierungen für Unternehmen und Selbstständige.',
    lead: 'Wenn Standardsoftware nicht passt, Excel-Listen ausufern und Daten doppelt eingetippt werden: Wir entwickeln Software, die genau Ihre Abläufe abbildet – verständlich, sicher und erweiterbar.',
    problem: [
      'Daten werden zwischen Programmen von Hand übertragen',
      'Wichtige Abläufe hängen an Excel-Tabellen und einzelnen Personen',
      'Standardsoftware ist zu groß, zu teuer oder passt nicht zu Ihren Prozessen',
      'Angebote, Berichte und Dokumente entstehen jedes Mal neu',
    ],
    umfang: [
      'Analyse Ihrer Abläufe – vor Ort oder per Video',
      'Konzept mit Klick-Prototyp, bevor programmiert wird',
      'Entwicklung in Etappen mit regelmäßigen Zwischenständen',
      'Schnittstellen zu Ihren bestehenden Programmen',
      'Hosting in Deutschland oder auf Ihren eigenen Servern',
      'Einweisung, Dokumentation und Quellcode für Sie',
    ],
    text: [
      'Wir starten nicht mit Technik, sondern mit Ihrem Alltag: Wo geht Zeit verloren, wo passieren Fehler, was soll künftig automatisch laufen? Daraus entsteht ein klares Konzept mit Festpreis – ohne böse Überraschungen.',
      'Nach dem Start lassen wir Sie nicht allein: Im Pflege-Abo kümmern wir uns um Betrieb, Sicherheitsupdates und Weiterentwicklung – zu einem festen Monatspreis.',
    ],
    ablauf: [
      { title: 'Erstgespräch', text: 'Kostenlos, 30 Minuten: Wir verstehen Ihr Anliegen und sagen ehrlich, ob sich Individualsoftware lohnt.' },
      { title: 'Konzept-Workshop', text: 'Abläufe aufnehmen, Lösung skizzieren, Klick-Prototyp – danach erhalten Sie einen Festpreis.' },
      { title: 'Entwicklung', text: 'In Etappen mit Zwischenständen. Sie testen früh und entscheiden mit.' },
      { title: 'Betrieb & Pflege', text: 'Hosting, Updates und Weiterentwicklung im Abo – oder Übergabe an Ihre IT.' },
    ],
    pakete: SOFTWARE_PROJEKTE,
    paketeTitel: ['Klare Preise für ', 'Ihr Projekt'],
    paketeText: 'Festpreise nach Konzept – Sie wissen vorher, was es kostet. Betrieb und Weiterentwicklung danach im Pflege-Abo ab 249 € / Monat.',
    siegel: 'code',
    zusage: { icon: 'key', title: 'Ihr Code gehört Ihnen', text: 'Sie erhalten Quellcode und Dokumentation. Keine Abhängigkeit von uns: Ihre Software kann jederzeit von Ihrer eigenen IT oder einem anderen Dienstleister weiterentwickelt werden.' },
    faq: [
      { q: 'Lohnt sich individuelle Software auch für kleine Unternehmen?', a: 'Oft ja – gerade kleine Teams sparen mit einem passenden Tool viele Stunden pro Monat. Im Erstgespräch rechnen wir grob durch, ob sich der Aufwand lohnt. Wenn eine Standardlösung besser passt, sagen wir das.' },
      { q: 'Was kostet eine individuelle Software?', a: 'Kleine Tools und Automatisierungen beginnen bei 2.900 €, Fachanwendungen bei 19.000 €. Den genauen Festpreis erhalten Sie nach dem Konzept-Workshop (1.490 €), der bei Beauftragung vollständig angerechnet wird.' },
      { q: 'Was passiert nach der Fertigstellung?', a: `Im Pflege-Abo übernehmen wir Betrieb, Sicherheitsupdates und Weiterentwicklung (ab 249 € / Monat). Alternativ übergeben wir an Ihre IT. Einzelne Anpassungen ohne Vertrag berechnen wir mit ${STUNDENSATZ} € / Std.` },
      { q: 'Wem gehört die Software?', a: 'Ihnen. Sie erhalten nach vollständiger Bezahlung die Nutzungsrechte, den Quellcode und die Dokumentation.' },
    ],
    ab: `${SOFTWARE_PROJEKTE[1].preis} Festpreis`,
    grafik: 'software',
  },
  {
    saeule: 'software',
    slug: 'software-webentwicklung',
    seo: { title: 'Software- & Webentwicklung: Web-Apps & APIs', description: 'Web-Anwendungen, Kundenportale und Schnittstellen – Konzept und Umsetzung aus einer Hand. MVP ab 7.900 €, Entwicklung 95 €/Std. netto. Für Unternehmen.' },
    icon: 'code',
    title: 'Software- & Webentwicklung',
    pre: 'Von der Idee zur ',
    accent: 'Web-Anwendung',
    teaser: 'Kundenportale, Buchungssysteme, Dashboards und Schnittstellen – Konzept und Umsetzung aus einer Hand.',
    lead: 'Wir planen und entwickeln digitale Lösungen, die im Browser auf jedem Gerät laufen: vom Kundenportal über Buchungs- und Bestellsysteme bis zur Schnittstelle zwischen Ihren Programmen.',
    problem: [
      'Kunden fragen per Telefon und E-Mail, was sie online selbst erledigen könnten',
      'Ihre Website soll mehr können als informieren',
      'Bestehende Systeme sollen Daten automatisch austauschen',
      'Eine Produktidee braucht einen schnellen, belastbaren ersten Stand (MVP)',
    ],
    umfang: [
      'Konzept, Nutzerführung und Design',
      'Web-Anwendungen mit Login, Rollen und Datenbank',
      'Schnittstellen (APIs) zu Warenwirtschaft, CRM, Zahlungsanbietern',
      'Schnell, barrierearm und sicher nach aktuellem Stand',
      'Automatische Tests und nachvollziehbare Versionierung',
      'Betrieb in Deutschland, auf Wunsch mit Pflege-Abo',
    ],
    text: [
      'Unsere Websites sind bewusst schlank und schnell – dieselbe Haltung bringen wir in Web-Anwendungen ein: so wenig Abhängigkeiten wie möglich, saubere Technik, die sich auch in Jahren noch pflegen lässt.',
      'Sie bekommen alles aus einer Hand: Konzept, Design, Entwicklung, Hosting und Betreuung. Kein Weiterreichen zwischen Agentur, Programmierer und Hoster.',
    ],
    ablauf: [
      { title: 'Ziel klären', text: 'Was soll die Anwendung leisten, für wen, bis wann? Daraus entsteht ein schlanker Umfang.' },
      { title: 'Entwurf', text: 'Klick-Prototyp und Festpreis – Sie sehen vorher, was entsteht.' },
      { title: 'Umsetzung', text: 'Entwicklung in kurzen Etappen, Testzugang ab der ersten Etappe.' },
      { title: 'Livegang & Pflege', text: 'Wir bringen die Anwendung online und entwickeln sie mit Ihnen weiter.' },
    ],
    pakete: WEBDEV_PAKETE,
    paketeTitel: ['Festpreis oder ', 'nach Aufwand'],
    paketeText: `Neue Anwendungen zum Festpreis, Erweiterungen bestehender Systeme nach Aufwand. Mit Pflegevertrag gilt für Zusatzstunden ${STUNDENSATZ_VERTRAG} € statt ${STUNDENSATZ} €.`,
    siegel: 'speed',
    zusage: { icon: 'gauge', title: 'Schnell und schlank gebaut', text: 'Wir setzen auf wenige, bewährte Bausteine statt überladener Frameworks. Das Ergebnis lädt schnell, hat weniger Angriffsfläche und lässt sich langfristig pflegen.' },
    faq: [
      { q: 'Brauche ich eine App aus dem App-Store?', a: 'Meist nicht. Moderne Web-Anwendungen laufen im Browser auf Smartphone, Tablet und PC und lassen sich auf Wunsch wie eine App auf dem Startbildschirm ablegen – ohne App-Store-Gebühren und doppelte Entwicklung.' },
      { q: 'Können Sie unsere bestehende Software erweitern?', a: `Ja, sofern Quellcode oder Schnittstellen zugänglich sind. Nach einer kurzen Sichtung schätzen wir den Aufwand; abgerechnet wird nach Aufwand (${STUNDENSATZ} € / Std.) oder zum Festpreis.` },
      { q: 'Wie lange dauert ein MVP?', a: 'Ein schlanker erster Stand ist je nach Umfang in sechs bis zwölf Wochen nutzbar. Den genauen Zeitplan legen wir im Entwurf fest.' },
    ],
    ab: `MVP ${WEBDEV_PAKETE[1].preis} · ${STUNDENSATZ} € / Std.`,
    grafik: 'code',
  },

  /* ───────────────────────── Cloud & IT ───────────────────────── */
  {
    saeule: 'cloud',
    slug: 'nextcloud',
    seo: { title: 'Nextcloud für Unternehmen – ab 7,90 € / Nutzer', description: 'Nextcloud-Einrichtung, Hosting und Betreuung: eigene Cloud mit Online-Office, Talk und Backups auf Servern in Deutschland. Ab 7,90 € pro Nutzer netto.' },
    icon: 'cloud',
    title: 'Nextcloud für Unternehmen',
    pre: 'Ihre eigene Cloud – ',
    accent: 'sicher in Deutschland',
    teaser: 'Einrichtung, Hosting, Konfiguration und Anpassung: Dateien, Kalender, Videocalls und Office in Ihrer eigenen Cloud.',
    lead: 'Dateien teilen, gemeinsam an Dokumenten arbeiten, Videokonferenzen führen – in Ihrer eigenen Nextcloud statt bei US-Konzernen. Wir richten sie ein, betreiben sie und passen sie an Ihr Unternehmen an.',
    problem: [
      'Firmendaten liegen verstreut in privaten Dropbox-, Google- oder WeTransfer-Konten',
      'Unklar, wer worauf Zugriff hat – und was passiert, wenn jemand das Unternehmen verlässt',
      'Videokonferenzen und Dokumente laufen über Dienste außerhalb der EU',
      'Lizenzkosten für Office-Pakete steigen jedes Jahr',
    ],
    umfang: [
      'Eigene Nextcloud-Instanz unter Ihrer Domain',
      'Dateien, Kalender, Kontakte, Aufgaben – auf PC, Mac und Smartphone',
      'Nextcloud Talk für Chat und Videokonferenzen',
      'Online-Office: Dokumente gemeinsam im Browser bearbeiten',
      'Zwei-Faktor-Anmeldung, Rechte- und Gruppenverwaltung',
      'Tägliche Backups, Updates und Überwachung',
      'Umzug Ihrer Daten aus anderen Cloud-Diensten',
      'Anpassung: Ihr Logo, Ihre Farben, passende Apps',
    ],
    text: [
      'Wir betreiben selbst eine gehärtete Nextcloud für unser Team: mit Zwei-Faktor-Anmeldung, Videokonferenzen über das Talk-High-Performance-Backend, Dokumentenbearbeitung im Browser, digitalem Dokumentenarchiv (Paperless) und automatischen Backups. Genau diese Praxiserfahrung bringen wir in Ihre Cloud ein.',
      'Sie entscheiden, wo Ihre Cloud läuft: bei uns gehostet auf Servern in Deutschland – oder auf Ihrem eigenen Server, den wir einrichten und warten.',
    ],
    ablauf: [
      { title: 'Bedarf klären', text: 'Wie viele Nutzer, welche Daten, welche Programme? Danach empfehlen wir das passende Paket.' },
      { title: 'Einrichtung', text: 'Instanz, Domain, Benutzer, Gruppen, Freigaben und Sicherheit – fertig konfiguriert.' },
      { title: 'Umzug & Einweisung', text: 'Wir übernehmen Ihre Daten und zeigen Ihrem Team die wichtigsten Funktionen.' },
      { title: 'Betrieb', text: 'Updates, Backups, Überwachung und Support – Sie arbeiten einfach.' },
    ],
    pakete: NEXTCLOUD_PAKETE,
    paketeTitel: ['Nextcloud-Hosting ', 'pro Nutzer'],
    paketeText: 'Eigene Instanz statt geteiltem Massenhosting – mit Einrichtung, Updates und persönlichem Support.',
    zusatz: NEXTCLOUD_ZUSATZ,
    siegel: 'hosting',
    zusage: { icon: 'lock', title: 'Wir nutzen, was wir verkaufen', text: 'Unsere eigene Zusammenarbeit läuft über eine selbst betriebene, gehärtete Nextcloud. Sie bekommen keine Theorie, sondern eine Einrichtung, die sich im Alltag bewährt hat.' },
    faq: [
      { q: 'Was ist Nextcloud?', a: 'Nextcloud ist eine Open-Source-Plattform für Dateien, Kalender, Kontakte, Chat, Videokonferenzen und Online-Office. Sie läuft auf eigenen Servern – Ihre Daten bleiben unter Ihrer Kontrolle.' },
      { q: 'Wo liegen meine Daten?', a: 'Bei unserem Hosting auf Servern in Deutschland, in einer eigenen Instanz nur für Ihr Unternehmen. Alternativ richten wir Nextcloud auf Ihrem eigenen Server ein.' },
      { q: 'Können wir von Dropbox, Google Drive oder OneDrive umziehen?', a: 'Ja. Wir übernehmen Ihre Daten inklusive Ordnerstruktur und richten die Freigaben neu ein. Den Aufwand nennen wir vorab als Festpreis.' },
      { q: 'Funktioniert das auf dem Smartphone?', a: 'Ja – mit den offiziellen Apps für iOS und Android, dazu Desktop-Programme für Windows, macOS und Linux, die Ordner automatisch synchronisieren.' },
      { q: 'Ersetzt Nextcloud Microsoft 365?', a: 'Für viele Teams ja: Dateien, Kalender, Videocalls und Online-Office sind enthalten. E-Mail und spezielle Programme prüfen wir im Erstgespräch – oft lassen sich beide Welten auch verbinden.' },
    ],
    ab: `ab ${NEXTCLOUD_PAKETE[0].preis} pro Nutzer / Monat`,
    grafik: 'cloud',
  },
  {
    saeule: 'cloud',
    slug: 'cloud-it',
    seo: { title: 'IT-Betreuung & Cloud für Unternehmen', description: 'Sichere IT-Infrastruktur für KMU: Cloud-Server, Backups, Updates und Helpdesk zum Festpreis ab 29 € pro Arbeitsplatz und Monat netto, Antwortzeiten im Vertrag.' },
    icon: 'server',
    title: 'Cloud- & IT-Lösungen',
    pre: 'IT, die einfach ',
    accent: 'läuft',
    teaser: 'Sichere, flexible IT-Infrastruktur: Server, Backups, Arbeitsplätze und Betreuung zum festen Preis pro Arbeitsplatz.',
    lead: 'Server, Cloud-Dienste, Backups und Arbeitsplätze – sicher eingerichtet und laufend betreut. Damit Ihr Team arbeiten kann, statt sich um IT-Probleme zu kümmern.',
    problem: [
      'Niemand ist richtig für die IT zuständig – „der Neffe“ hilft am Wochenende',
      'Backups gibt es vielleicht, getestet wurden sie nie',
      'Updates werden verschoben, Passwörter mehrfach verwendet',
      'Neue Mitarbeitende warten tagelang auf Zugänge',
    ],
    umfang: [
      'Bestandsaufnahme und IT-Sicherheits-Check',
      'Cloud-Server und virtuelle Server: Einrichtung, Härtung, Betrieb',
      'Backups nach der 3-2-1-Regel – mit Wiederherstellungstest',
      'Überwachung und automatische Updates für Rechner und Server',
      'E-Mail, Benutzer und Rechte zentral verwalten',
      'Zwei-Faktor-Anmeldung und Passwortmanager für das Team',
    ],
    text: [
      'Wir betreuen IT so, wie wir unsere eigene betreiben: dokumentiert, überwacht und mit getesteten Backups. Sie erhalten einen festen Preis pro Arbeitsplatz und wissen jederzeit, was läuft.',
      'Ob Cloud, eigener Server oder Mischung aus beidem – wir empfehlen, was zu Ihrer Größe passt, und nicht, was sich am besten verkaufen lässt.',
    ],
    ablauf: [
      { title: 'Sicherheits-Check', text: 'Wir erfassen Geräte, Konten, Backups und Risiken und erstellen einen Maßnahmenplan.' },
      { title: 'Aufräumen', text: 'Kritische Punkte zuerst: Backups, Updates, Zugänge, Passwörter.' },
      { title: 'Betreuung', text: 'Überwachung, Updates und Helpdesk zum festen Preis pro Arbeitsplatz.' },
      { title: 'Weiterentwickeln', text: 'Neue Mitarbeitende, Standorte oder Cloud-Dienste – wir wachsen mit.' },
    ],
    pakete: IT_PAKETE,
    paketeTitel: ['IT-Betreuung zum ', 'Festpreis'],
    paketeText: 'Fester Preis pro Arbeitsplatz oder Server – planbar und ohne Stunden-Überraschungen.',
    zusatz: IT_ZUSATZ,
    siegel: 'ansprechpartner',
    zusage: { icon: 'shield', title: 'Backups, die wirklich funktionieren', text: 'Ein Backup ist erst etwas wert, wenn die Wiederherstellung klappt. In der Server-Betreuung testen wir die Wiederherstellung regelmäßig und dokumentieren das Ergebnis.' },
    faq: [
      { q: 'Für welche Unternehmensgröße ist das gedacht?', a: 'Für kleine und mittlere Unternehmen ab etwa 5 Arbeitsplätzen, die keine eigene IT-Abteilung haben oder diese entlasten möchten.' },
      { q: 'Was bedeutet Antwortzeit?', a: 'Die Zeit, bis wir mit der Bearbeitung Ihres Anliegens beginnen – werktags von 9 bis 18 Uhr. Wie lange die Lösung dauert, hängt vom Problem ab; wir halten Sie dabei auf dem Laufenden.' },
      { q: 'Kommen Sie auch vor Ort?', a: 'Die meisten Anliegen lösen wir per Fernwartung – das ist am schnellsten. Vor-Ort-Einsätze im Raum Hamburg sind nach Absprache möglich und werden nach Aufwand berechnet.' },
      { q: 'Was ist „Fair Use“ beim Helpdesk?', a: 'Alltägliche Anfragen Ihres Teams (Passwort, Drucker, E-Mail, Zugänge) sind inklusive. Projekte wie ein Serverumzug oder neue Standorte bieten wir separat zum Festpreis an.' },
    ],
    ab: `ab ${IT_PAKETE[0].preis} pro Arbeitsplatz / Monat`,
    grafik: 'it',
  },

  /* ───────────────────────── Beratung ───────────────────────── */
  {
    saeule: 'beratung',
    slug: 'wettbewerbsanalyse',
    seo: { title: 'Wettbewerbsanalyse für Unternehmen – ab 690 €', description: 'Wettbewerbsanalyse zum Festpreis: Leistungen, Preise und Online-Auftritt vergleichbarer Anbieter, Stärken und Empfehlungen. Ab 690 € netto, in 5 Werktagen.' },
    icon: 'compass',
    title: 'Wettbewerbsanalyse',
    pre: 'Wissen, wo Sie im Markt ',
    accent: 'stehen',
    teaser: 'Vergleichbare Anbieter, Leistungen, Preise und Ihre Wettbewerbsvorteile – klar aufbereitet als Entscheidungsgrundlage.',
    lead: 'Was bieten vergleichbare Anbieter, zu welchen Preisen, und wie treten sie online auf? Wir analysieren Ihren Markt und zeigen, wo Ihre Stärken liegen und wo Sie nachschärfen sollten.',
    problem: [
      'Sie sind unsicher, ob Ihre Preise zu hoch oder zu niedrig sind',
      'Neue Anbieter tauchen auf – und Sie wissen nicht genau, was sie anders machen',
      'Ein neues Angebot oder eine neue Website steht an',
      'Ihr Team argumentiert im Verkauf aus dem Bauch heraus',
    ],
    umfang: [
      'Auswahl der relevanten Wettbewerber gemeinsam mit Ihnen',
      'Vergleich von Leistungen, Paketen und öffentlich genannten Preisen',
      'Online-Auftritt: Website, Google-Sichtbarkeit, Bewertungen',
      'Stärken, Schwächen und Lücken im Markt',
      'Konkrete Empfehlungen zu Positionierung und Preisgestaltung',
      'Bericht als PDF und persönliche Besprechung',
    ],
    text: [
      'Bevor wir ein neues Angebot, eine Preisliste oder eine Website entwickeln, analysieren wir den Markt – auch für unser eigenes Angebot. Diese Methode bieten wir Ihnen als eigenständige Beratung an.',
      'Wir arbeiten ausschließlich mit öffentlich zugänglichen Informationen und kennzeichnen klar, was belegt ist und was Einschätzung. So entsteht eine ehrliche Entscheidungsgrundlage – keine Hochglanz-Präsentation.',
    ],
    ablauf: [
      { title: 'Auftakt', text: '30 Minuten: Ziele, Zielgruppe und die Wettbewerber, die Sie kennen.' },
      { title: 'Recherche', text: 'Wir analysieren Angebote, Preise und Online-Auftritte – nachvollziehbar mit Quellen.' },
      { title: 'Bericht', text: 'Übersichtlicher Vergleich, Stärken-Schwächen-Bild und klare Empfehlungen.' },
      { title: 'Besprechung', text: 'Wir gehen die Ergebnisse gemeinsam durch und legen die nächsten Schritte fest.' },
    ],
    pakete: ANALYSE_PAKETE,
    paketeTitel: ['Analyse zum ', 'Festpreis'],
    paketeText: 'Festpreis statt Stundenzettel. Wird innerhalb von 3 Monaten ein Website- oder Software-Projekt daraus, rechnen wir 50 % an.',
    zusatz: ANALYSE_ZUSATZ,
    siegel: 'festpreis',
    zusage: { icon: 'search', title: 'Belegt statt behauptet', text: 'Jede Aussage im Bericht ist mit Quelle und Datum versehen oder klar als Einschätzung gekennzeichnet. Wir nutzen nur öffentlich zugängliche Informationen.' },
    faq: [
      { q: 'Woher kommen die Informationen?', a: 'Aus öffentlich zugänglichen Quellen: Websites, Preislisten, Branchenverzeichnisse, Bewertungsportale und Suchergebnisse. Wir nennen jede Quelle mit Datum.' },
      { q: 'Wie lange dauert eine Analyse?', a: 'Die Kompakt-Analyse liegt in der Regel nach 5 Werktagen vor, die Standard-Analyse nach 10 Werktagen – gerechnet ab dem Auftaktgespräch.' },
      { q: 'Für welche Branchen?', a: 'Für Dienstleister, Handwerk, Handel und B2B-Anbieter, deren Wettbewerber online sichtbar sind. Bei sehr speziellen Märkten sagen wir vorher, wie aussagekräftig das Ergebnis sein kann.' },
    ],
    ab: `ab ${ANALYSE_PAKETE[0].preis} Festpreis`,
    grafik: 'analyse',
  },
  {
    saeule: 'software',
    slug: 'abo-wartung',
    seo: { title: 'Abo- & Wartungsmodelle für Software & IT', description: 'Software-Pflege, Hosting, Support und Weiterentwicklung im Abo: feste Monatspreise ab 249 € netto, Antwortzeiten im Vertrag. Für Unternehmen.' },
    icon: 'refresh',
    title: 'Abo- & Wartungsmodelle',
    pre: 'Ein fester Monatspreis. ',
    accent: 'Alles betreut.',
    teaser: 'Monatliche Abos für Software, Support, Hosting, Wartung und Weiterentwicklung – planbar statt Stundenzettel.',
    lead: 'Ob Website, Software, Nextcloud oder IT: Nach dem Start kümmern wir uns weiter – mit festen Monatspreisen, festgelegten Antwortzeiten und Stunden für Weiterentwicklung.',
    problem: [
      'Nach dem Projekt ist niemand mehr zuständig',
      'Jede kleine Änderung wird einzeln angeboten und abgerechnet',
      'Sicherheitsupdates bleiben liegen, bis etwas passiert',
      'IT-Kosten schwanken von Monat zu Monat',
    ],
    umfang: [
      'Betrieb & Hosting in Deutschland',
      'Sicherheitsupdates, Backups und Überwachung',
      'Festes Stundenkontingent für Änderungen und Weiterentwicklung',
      'Festgelegte Antwortzeiten je Paket',
      'Ein persönlicher Ansprechpartner',
      'Nicht genutzte Stunden bis zu 3 Monate übertragbar',
    ],
    text: [
      'Software und Websites altern, wenn sich niemand kümmert: Sicherheitslücken, veraltete Schnittstellen, kleine Fehler, die liegen bleiben. Im Abo ist Pflege fest eingeplant – und die Kosten sind es auch.',
      'Die Software-Pflege gilt für Anwendungen, die wir entwickelt haben, und nach einer kurzen Sichtung auch für bestehende Software. Für Websites, Nextcloud und IT gibt es eigene Abos – alle im Überblick weiter unten.',
    ],
    pakete: PFLEGE_PAKETE,
    paketeTitel: ['Software-Pflege ', 'im Abo'],
    paketeText: `Betrieb, Sicherheit und Weiterentwicklung zum Festpreis. Zusatzstunden ${STUNDENSATZ_VERTRAG} € statt ${STUNDENSATZ} €.`,
    siegel: 'festpreis',
    zusage: { icon: 'euro', title: 'Planbar wie eine Miete', text: 'Der Monatspreis steht fest. Zusätzliche Arbeiten bieten wir vorher schriftlich an – es gibt keine Rechnung, die Sie überrascht.' },
    faq: [
      { q: 'Was passiert mit nicht genutzten Stunden?', a: 'Nicht genutzte Stunden übertragen wir bis zu drei Monate. So lassen sich auch größere Anpassungen ohne Zusatzkosten umsetzen.' },
      { q: 'Können Sie auch Software betreuen, die nicht von Ihnen stammt?', a: 'Ja, nach einer kurzen Sichtung von Code und Server. Den einmaligen Aufwand dafür nennen wir vorab als Festpreis.' },
      { q: 'Wie lange laufen die Abos?', a: '12 Monate Mindestlaufzeit, danach monatlich kündbar – wie bei unserem Website-Abo. Ein Wechsel in ein größeres Paket ist jederzeit möglich.' },
    ],
    ab: `ab ${PFLEGE_PAKETE[0].preis} / Monat`,
    grafik: 'abo',
  },
];

export const leistungBySlug = (slug: string) => leistungen.find((l) => l.slug === slug);
export const leistungenNach = (saeule: Saeule) => leistungen.filter((l) => l.saeule === saeule);
/** Preis-Teaser für Kacheln/Navigation – Website-Leistungen aus dem empfohlenen Tarif. */
export const leistungAb = (l: Leistung) => l.ab ?? (l.plan ? `ab ${preis(l.plan)} € / Monat` : l.pakete ? `ab ${l.pakete[0].preis.replace(/^ab /, '')}` : '');
