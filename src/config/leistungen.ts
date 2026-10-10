// Leistungen = Website-Typen (Bauwelt-Muster „Leistungs-Kacheln + Detailseiten“, Wunsch 11.10.2026).
// Jede Leistung hat eine eigene Seite unter /leistungen/<slug>/.
import { plans, type IconName } from './site';

const preis = (id: 'start' | 'business' | 'premium') => plans.find((p) => p.id === id)!.monthly;

export type Leistung = {
  slug: string;
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
  /** Empfohlener Tarif + Begründung */
  plan: 'start' | 'business' | 'premium';
  planReason: string;
  /** Passendes Versprechen (id aus versprechen.ts) */
  siegel: string;
  faq: { q: string; a: string }[];
  /** Farbverlauf der Kachel-Grafik (kein Foto nötig) */
  grafik: 'seite' | 'shop' | 'landing' | 'relaunch' | 'pflege';
};

export const leistungen: Leistung[] = [
  {
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
    slug: 'betreuung-pflege',
    icon: 'shield',
    title: 'Betreuung & Pflege',
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
];

export const leistungBySlug = (slug: string) => leistungen.find((l) => l.slug === slug);
export const leistungPreis = (l: Leistung) => preis(l.plan);
