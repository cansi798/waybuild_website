// Build-Modus: Vorschau (GitHub Pages) oder Live (eigener Server).
// Vorschau → noindex überall, robots.txt sperrt alles, Vorschau-Banner.
export const IS_PREVIEW = import.meta.env.PUBLIC_PREVIEW === 'true';
