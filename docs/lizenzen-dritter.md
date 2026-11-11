# Lizenzen Dritter: neue Laufzeit-Pakete der zweiten Startseite /neu/

Stand: 11.11.2026.

Diese Pakete sind mit dem Fundament der zweiten Startseite `/neu/` neu hinzugekommen (3D-Bühne im Hero). Alle anderen Seiten laden sie nicht.

Version und Lizenz sind aus `node_modules/<paket>/package.json` gelesen (Feld `license`), nach `npm ci` mit der eingecheckten `package-lock.json`.

&nbsp;

| Paket | Version | Lizenz |
|---|---|---|
| `three` | 0.187.0 | MIT |
| `@react-three/fiber` | 9.8.2 | MIT |
| `@react-three/postprocessing` | 3.2.2 | MIT |
| `postprocessing` | 6.39.6 | Zlib |
| `react` | 19.3.1 | MIT |
| `react-dom` | 19.3.1 | MIT |
| `@astrojs/react` | 7.0.1 | MIT |

&nbsp;

## Hinweise

- MIT und Zlib erlauben die Nutzung in einer geschlossenen, kommerziellen Website. Der Urheberhinweis der Pakete bleibt in den Paketdateien erhalten.

- Zlib (`postprocessing`): Die Herkunft darf nicht falsch dargestellt werden; veränderte Fassungen müssten als verändert gekennzeichnet sein. Wir verändern das Paket nicht.

- Die Liste nennt nur die direkt eingetragenen Laufzeit-Pakete. Pakete, die diese selbst mitbringen, und die Entwicklungs-Pakete (`@types/react`, `@types/react-dom`, `@types/three`) sind hier nicht einzeln geprüft.

- Bei einer neuen Version: Tabelle aus `node_modules/<paket>/package.json` neu ablesen.
