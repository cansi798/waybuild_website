// Stockfotos (Jamil, Talk qh87y3sj #5362, 10.11.2026: „füge einige Stockbilder von Menschen hinzu, dort wo es passt“).
// Alle Fotos von Unsplash (Unsplash License), Quellen, Fotografen und Datum: src/assets/bilder/QUELLEN.md.
// Dateien: src/assets/bilder/stock/<id>.jpg, ausgeliefert über components/Foto.astro → Bild.astro (AVIF + WebP, mehrere Breiten).
// UWG: Die Fotos zeigen nie unser Team oder unsere Kunden. Deshalb keine Namen, keine Bildunterschriften, nicht neben „Team“
// oder Kundenstimmen, und keine Büro-Teams dort, wo es um „wir“ geht (Blog, Betreuung); im Alt-Text steht „Symbolfoto:“.

export type FotoId =
  | 'beratung-laptop'
  | 'besprechung-laptop'
  | 'empfang-tablet'
  | 'gaertnerei-beratung'
  | 'imbiss-handy'
  | 'laden-laptop'
  | 'schneiderei-telefon'
  | 'tablet-tisch'
  | 'team-besprechung'
  | 'werkstatt-moebel'
  | 'werkstatt-tablet';

/** Alt-Text (neutral beschrieben) und Bildausschnitt (object-position) je Foto */
export const FOTOS: Record<FotoId, { alt: string; pos?: string }> = {
  'beratung-laptop': { alt: 'Symbolfoto: Ein Mann und eine Frau sitzen in einem hellen Büro und schauen gemeinsam auf einen Laptop', pos: '45% 50%' },
  'besprechung-laptop': { alt: 'Symbolfoto: Hände einer Person, die bei einer Besprechung am Tisch neben einem aufgeklappten Laptop etwas erklärt', pos: '60% 50%' },
  'empfang-tablet': { alt: 'Symbolfoto: Eine Frau steht an einem Empfangstresen und tippt auf ein Tablet, dahinter ein Wartebereich', pos: '50% 60%' },
  'gaertnerei-beratung': { alt: 'Symbolfoto: Eine Mitarbeiterin mit Schürze berät in einer Gärtnerei einen Kunden, der einen Blumentopf hält', pos: '62% 45%' },
  'imbiss-handy': { alt: 'Symbolfoto: Ein Mann mit Schürze schaut an seinem Imbissstand lächelnd auf sein Handy', pos: '35% 50%' },
  'laden-laptop': { alt: 'Symbolfoto: Eine Frau telefoniert in einem Bekleidungsgeschäft und arbeitet dabei am Laptop', pos: '70% 50%' },
  'schneiderei-telefon': { alt: 'Symbolfoto: Eine Frau telefoniert in einer Schneiderei und schaut dabei auf ihren Laptop', pos: '62% 40%' },
  'tablet-tisch': { alt: 'Symbolfoto: Eine Frau sitzt lachend an einem Holztisch und hält ein Tablet in den Händen', pos: '45% 55%' },
  'team-besprechung': { alt: 'Symbolfoto: Drei Personen besprechen sich an einem runden Tisch in einem hellen Raum', pos: '55% 50%' },
  'werkstatt-moebel': { alt: 'Symbolfoto: Eine Person mit Mütze und Arbeitshandschuhen bearbeitet in einer Werkstatt einen alten Rahmen', pos: '50% 35%' },
  'werkstatt-tablet': { alt: 'Symbolfoto: Ein älterer Mann mit Schürze nutzt in einer Töpferwerkstatt ein Tablet', pos: '75% 50%' },
};

/** Ein Foto je Leistungsseite (Kopf: PC Text links, Foto rechts; Handy Foto unter dem Text). Einige Fotos kommen 2-mal vor. */
export const LEISTUNG_FOTO: Record<string, FotoId> = {
  website: 'laden-laptop',
  'google-profil': 'gaertnerei-beratung',
  'suchmaschinen-optimierung': 'tablet-tisch',
  'social-media': 'imbiss-handy',
  inhalte: 'werkstatt-moebel',
  auftritt: 'beratung-laptop',
  bewertungen: 'gaertnerei-beratung',
  anfragen: 'schneiderei-telefon',
  terminbuchung: 'empfang-tablet',
  ablaeufe: 'werkstatt-tablet',
  betreuung: 'imbiss-handy',
  auswertung: 'team-besprechung',
  nachfassen: 'schneiderei-telefon',
};

/** Übersichtsseiten und ruhige Stellen der Startseite */
export const SEITEN_FOTO = {
  wissen: 'tablet-tisch',
  blog: 'laden-laptop',
  beispiele: 'besprechung-laptop',
  startVergleich: 'werkstatt-tablet',
  // Abschluss: bewusst kein Büro-/Beratungsbild, weil in der Vorschau direkt darüber „Wer hinter waybuild steht“ steht (UWG)
  startAbschluss: 'gaertnerei-beratung',
} satisfies Record<string, FotoId>;
