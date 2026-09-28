// Nach dem Build: Server-Dateien in den Live-Build legen (nicht in die GitHub-Pages-Vorschau).
import { copyFileSync } from 'node:fs';

if (process.env.PUBLIC_PREVIEW === 'true') {
  console.log('postbuild: Vorschau-Build – keine Server-Dateien.');
} else {
  copyFileSync('server/.htaccess', 'dist/.htaccess');
  console.log('postbuild: dist/.htaccess für Apache-Server hinzugefügt.');
}
