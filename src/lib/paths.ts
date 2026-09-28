// Baut Links relativ zur konfigurierten BASE (GitHub Pages Unterpfad oder "/" bei eigener Domain).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** href('/preise/') -> '/waybuild-website/preise/' */
export function href(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Absolute URL für Canonical, OG, JSON-LD */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(href(path), site).href;
}
