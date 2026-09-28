# Bilder-Ordner

Hier einfach Bilder ablegen – die Website erzeugt daraus beim Build **automatisch** optimierte Versionen
(AVIF + WebP, passende Größen für Handy und Desktop, Lazy Loading). Du musst nichts verkleinern oder umwandeln.

## So geht's

1. Bild mit dem **genauen Dateinamen** aus der Tabelle in den passenden Unterordner legen
   (Endung egal: `.jpg`, `.png`, `.webp` oder `.avif`).
2. Committen & pushen – fertig. Der Platzhalter auf der Website wird automatisch ersetzt.

| Datei | Wo erscheint es? | Format / Größe |
|---|---|---|
| `team/gruender.jpg` | Über uns – Foto der Geschäftsführung | quadratisch, mind. 1200 × 1200 px |
| `referenzen/projekt-1.jpg` … | Referenzen (Name in `src/config/site.ts → references[].bild`) | 4:3, mind. 1600 × 1200 px |
| `allgemein/…` | frei für weitere Bilder | – |

## Tipps

- **Originale** ablegen (groß ist gut) – verkleinert wird automatisch.
- Dateinamen: nur Kleinbuchstaben, Bindestriche, keine Umlaute/Leerzeichen.
- Nur Bilder verwenden, an denen ihr die Rechte habt. Keine Stockfotos mit Personen, die als „Team“ ausgegeben werden.
- Bilder im Stil des CI-Handbuchs: echte Menschen, natürliches Licht, warme Farbstimmung.
- KI-Prompts für passende Bilder: siehe [`KI-PROMPTS.md`](KI-PROMPTS.md).
