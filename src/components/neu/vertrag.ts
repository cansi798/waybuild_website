// Gemeinsame Schnittstelle der zweiten Startseite /neu/ (Can, Sitzung 11.11.2026).
// Jeder Abschnitt unter src/components/neu/<paket>/ bekommt genau `links` (der Hero zusätzlich `dreiD`).
// Die Werte baut src/pages/neu/index.astro; interne Ziele stehen nie als fester Pfad im Markup.

/** Ziele, die die Abschnitte der Seite /neu/ verlinken dürfen. */
export interface NeuLinks {
  /** Kontaktseite mit dem Anliegen „Kostenlose Erstberatung“ (ANLIEGEN.erstberatung.paket) */
  erstberatung: string;
  /** Kontaktseite mit dem Anliegen des Abschluss-Knopfs (ANLIEGEN.bewerten.paket) */
  bewerten: string;
  /** Sprungziel der Pakete auf dieser Seite: '#pakete' */
  pakete: string;
  /** Seite /preise/ */
  preise: string;
  /** Seite /beispiele/ */
  beispiele: string;
  /** Seite /fragen/ */
  fragen: string;
}
