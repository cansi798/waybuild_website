// Nach dem Build: Server-Dateien in den Live-Build legen (nicht in die GitHub-Pages-Vorschau).
import { copyFileSync, rmSync } from 'node:fs';

if (process.env.PUBLIC_PREVIEW === 'true') {
  console.log('postbuild: Vorschau-Build – keine Server-Dateien.');
} else {
  copyFileSync('server/.htaccess', 'dist/.htaccess');
  // Interne Launch-Checkliste gehört nicht auf die öffentliche Domain
  rmSync('dist/checkliste', { recursive: true, force: true });
  console.log('postbuild: dist/.htaccess hinzugefügt, interne Checkliste entfernt.');
}
