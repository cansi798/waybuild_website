// Startseite der waybuild Website (Stand 06.11.2026 abends). Alle Texte WÖRTLICH von Jamil:
//   Hero: Headline 4771, Subheadline 4783, Animation 4784 (Kundengeschichte in fünf Stationen)
//   1 „Kunden erleben keine einzelnen Systeme.“ (4774, mittags) · 2 Bausteine (4786/4787) · 3 Verstehen. Empfehlen. Umsetzen. (4788)
//   · 4 Alles zwischen erstem Kontakt und zufriedenem Kunden (4789, + Pakete) · 5 Darauf können Sie sich verlassen (4790/4791)
//   · Check (Konzept 4768, als Vorschlag) · Abschluss (4792) · Claim (4793)
// Frühere Stände: „Unternehmensauftritt“ (4768, nach Website Rethinking, NC Rethinking_Unternehmensauftritt_2026-11-06),
// „Besucherreise“ (05.11.). Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die alte Startseite (vor dem 05.11.) steht unverändert unter /hauptseite-alt/.

/** Name oben in der Kopfzeile der Startseite. An einer Stelle änderbar. */
export const MARKE = 'rethink.website';

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website, max. 60 Zeichen). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenfreie Erstberatung', paket: 'Kostenfreie Erstberatung' },
  analyse: { label: 'Kostenlose Analyse anfordern', paket: 'Kostenlose Analyse' },
  bewerten: { label: 'Unternehmensauftritt bewerten lassen', paket: 'Unternehmensauftritt bewerten lassen' },
};

export const HERO = {
  /** Rethinking: Zielgruppe in drei Sekunden („Bin ich hier richtig?“), hilft auch Suchmaschinen. */
  zeile: 'Für kleine und mittlere Unternehmen',
  /** Hero-Texte wörtlich von Jamil: Headline Talk qh87y3sj 4771, Subheadline 4783 (06.11.2026, 19:56; ersetzt 4773), in zwei Absätzen */
  titel: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden.',
  unter: [
    'Kunden erleben Ihr Unternehmen nicht in einzelnen Systemen. Sie erleben einen zusammenhängenden Prozess.',
    'Deshalb entwickeln wir keine einzelnen Lösungen. Wir entwickeln digitale Unternehmensabläufe, die funktionieren.',
  ],
  cta: 'Unternehmensauftritt bewerten',
  cta2: 'Unsere Denkweise kennenlernen',
  /** Hero-Animation (Jamil 4784): kleine Geschichte eines Kunden in fünf Stationen, keine Linie, kein Prozessbild */
  stationen: ['Aufmerksamkeit', 'Vertrauen', 'Anfrage', 'Bearbeitung', 'Zufriedener Kunde'],
};

// Abschnitt 1 WÖRTLICH von Jamil (Talk qh87y3sj 4774, 06.11.2026, 12:06).

/** Abschnitt 1 (4774): Visual = Wanderung über die Wege, auf denen Kunden das Unternehmen entdecken */
export const EINDRUCK = {
  titel: 'Kunden erleben keine einzelnen Systeme.',
  unter: 'Sie erleben Ihr Unternehmen.',
  einleitung: 'Ein potenzieller Kunde entdeckt Ihr Unternehmen über Google, Social Media, Empfehlungen oder andere Wege.',
  /** Stationen der Wanderung (aus Jamils Satz oben) */
  wege: ['Google', 'Social Media', 'Empfehlungen', 'andere Wege'],
  minuten: 'Innerhalb weniger Minuten entsteht ein Eindruck.',
  schluss: ['Nicht durch eine einzelne Website.', 'Sondern durch das Zusammenspiel aller Berührungspunkte.'],
};

/** Abschnitt 2 (4786/4787): Visual = vier Bausteine mit unterschiedlichen Kanten, die nicht ineinanderpassen */
export const BAUSTEINE = {
  titel: 'Die meisten Unternehmen optimieren einzelne Werkzeuge.',
  werkzeuge: ['Website.', 'CRM.', 'Social Media.', 'Prozesse.'],
  text: ['Doch Kunden erleben das Gesamtbild.', 'Wenn einzelne Bausteine nicht zusammenarbeiten, entstehen Reibungsverluste.'],
  verluste: ['Verlorene Anfragen.', 'Unnötiger Aufwand.', 'Unklare Abläufe.'],
};

/** Abschnitt 3 (4788): drei große Karten mit reinem Text */
export const VERSTEHEN = {
  titel: 'Verstehen. Empfehlen. Umsetzen.',
  einleitung: 'Bevor wir Lösungen entwickeln, möchten wir verstehen:',
  liste: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Ziele'],
  schluss: ['Denn gute Entscheidungen entstehen durch Verständnis.', 'Nicht durch Vermutungen.'],
  karten: ['Verstehen', 'Empfehlen', 'Umsetzen'],
};

/** Abschnitt 4 (4789): vier Bereiche. paket=false = nicht in den Monatspaketen (Ausbaustufe, individuelles Angebot). */
export const BEREICHE = {
  titel: 'Alles, was zwischen dem ersten Kontakt und dem zufriedenen Kunden passiert.',
  bereiche: [
    { titel: 'Aufmerksamkeit', teile: [['Website', true], ['Google', true], ['Social Media', false], ['Video', false]] },
    { titel: 'Anfrage', teile: [['Formulare', true], ['Terminbuchung', false], ['CRM', false]] },
    { titel: 'Bearbeitung', teile: [['Prozesse', false], ['Automatisierung', false], ['Systeme', false]] },
    { titel: 'Betreuung', teile: [['Service', true], ['Kommunikation', true], ['Weiterentwicklung', true]] },
  ] as { titel: string; teile: [string, boolean][] }[],
  hinweis: 'Gestrichelt: Ausbaustufe mit individuellem Angebot. Alles andere steckt in unseren Monatspaketen.',
};

/** Abschnitt 5 (4790/4791): große Schlagworte, viel Weißraum, keine Icons */
export const VERLASSEN = {
  titel: 'Darauf können Sie sich verlassen',
  saetze: ['Wir übernehmen Verantwortung.', 'Wir denken mit.', 'Wir halten Dinge einfach.', 'Wir empfehlen nicht das Meiste.', 'Wir empfehlen das Richtige.'],
};

/** Check (Konzept 4768, als Vorschlag vor dem Abschluss behalten): 10 Fragen in 5 Bereichen (je 2). Jamils 5 Beispielfragen + 5 ergänzt (Rethinking). Ja 10 · Teilweise 5 · Nein 0. */
export const CHECK = {
  eyebrow: 'Unternehmensauftritt-Check',
  titel: 'Wie professionell wirkt Ihr Unternehmen aktuell?',
  einleitung: '10 Fragen, rund zwei Minuten. Am Ende sehen Sie Ihre Punktzahl und wo Ihr Auftritt Vertrauen gewinnt oder verliert.',
  datenschutz: 'Ihre Antworten bleiben in Ihrem Browser. Wir speichern nichts und senden nichts.',
  antworten: [['Ja', 10], ['Teilweise', 5], ['Nein', 0]] as [string, number][],
  bereiche: [
    {
      id: 'verstaendlich', name: 'Verständlichkeit',
      fragen: ['Versteht man Ihr Angebot innerhalb von 10 Sekunden?', 'Erkennen Kunden Ihren Unterschied zu anderen Anbietern?'],
      urteil: ['Besucher verstehen zu spät, was Sie anbieten. Hier beginnt die Unsicherheit.', 'Ihr Angebot ist erkennbar, Ihr Unterschied noch nicht klar genug.', 'Besucher verstehen schnell, was Sie anbieten und warum Sie.'],
    },
    {
      id: 'vertrauen', name: 'Vertrauen',
      fragen: ['Sind Bewertungen gut sichtbar?', 'Zeigen Sie echte Beispiele Ihrer Arbeit und die Menschen dahinter?'],
      urteil: ['Besucher finden kaum Gründe, Ihnen zu vertrauen.', 'Vertrauen ist da, aber schwer zu finden. Zeigen Sie Bewertungen und Beispiele sichtbarer.', 'Bewertungen und echte Beispiele stärken Ihren Eindruck.'],
    },
    {
      id: 'sichtbar', name: 'Sichtbarkeit',
      fragen: ['Ist Ihr Google-Profil aktuell?', 'Findet man Sie, wenn man Ihre Leistung in Ihrer Region sucht?'],
      urteil: ['Viele Interessenten finden Sie gar nicht erst.', 'Man findet Sie, aber nicht immer aktuell oder vollständig.', 'Wer Sie sucht, findet aktuelle Informationen.'],
    },
    {
      id: 'einheitlich', name: 'Einheitlicher Auftritt',
      fragen: ['Ist Ihr Auftritt überall konsistent?', 'Wirken E-Mails, Signatur, Angebote und Dokumente wie aus einem Guss?'],
      urteil: ['Website, E-Mails und Dokumente erzählen verschiedene Geschichten.', 'Einzelne Berührungspunkte wirken anders als der Rest.', 'Ihr Auftritt wirkt überall wie aus einem Guss.'],
    },
    {
      id: 'fuehrung', name: 'Nutzerführung',
      fragen: ['Wissen Besucher sofort, was sie als Nächstes tun sollen?', 'Funktioniert Ihre Website auf dem Handy genauso gut wie am PC?'],
      urteil: ['Besucher wissen nicht, was sie als Nächstes tun sollen.', 'Der nächste Schritt ist da, aber nicht überall leicht zu finden.', 'Besucher wissen, was sie als Nächstes tun sollen, auch am Handy.'],
    },
  ],
  /** Gesamturteil: [ab Punkte, Satz] absteigend */
  gesamt: [
    [80, 'Ihr Auftritt überzeugt. Feinschliff lohnt sich an einzelnen Stellen.'],
    [50, 'Eine solide Basis. Trotzdem gehen an einigen Stellen Chancen verloren.'],
    [0, 'Ihr Auftritt bleibt hinter der Qualität Ihrer Arbeit zurück. Hier liegt viel Potenzial.'],
  ] as [number, string][],
  hinweis: 'Der Check ist eine Selbsteinschätzung. Eine Analyse durch uns geht tiefer und ist kostenlos.',
  ctaHinweis: 'Nur wenn Sie auf den Knopf klicken, nehmen wir Ihre Punktzahl in das Anfrageformular mit. Absenden entscheiden Sie selbst.',
  cta: 'Kostenlose Analyse anfordern',
};

/** Abschluss (4792) mit CTA, darunter der Claim (4793) */
export const ABSCHLUSS = {
  titel: 'Wir übernehmen die Komplexität. Sie behalten den Fokus.',
  text: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden entwickeln wir Lösungen, die zusammenarbeiten und Unternehmen nachhaltig unterstützen.',
  cta: 'Unternehmensauftritt bewerten lassen',
  unterCta: 'Kurzes Gespräch. Klare Einschätzung. Konkrete Empfehlungen.',
};

/** Claim (4793): unter dem Abschluss, als Slogan in JSON-LD und im Title */
export const CLAIM = 'Alles aus einer Hand. Von Anfang bis Wachstum.';

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  titel: CLAIM,
  description: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Website, Anfrage, Bearbeitung und Betreuung aus einer Hand. Für kleine und mittlere Unternehmen.',
  service: 'Digitale Unternehmensabläufe für kleine und mittlere Unternehmen, von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Aufmerksamkeit (Website, Google), Anfrage (Formulare), Bearbeitung und Betreuung (Service, Kommunikation, Weiterentwicklung) aus einer Hand. Website, Google-Profil, E-Mail-Postfächer, Signatur, Briefvorlage, Logo und Geschäftspapiere in festen Monatspaketen; Social Media, Video, Terminbuchung, CRM, Prozesse, Automatisierung und Systeme als individuelles Angebot.',
};
