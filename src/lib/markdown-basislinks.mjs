// Interne Links in Markdown (z. B. „[Anfragen](/leistungen/anfragen/)“ in src/content/leistungen/) bekommen beim Bauen
// den Basis-Pfad vorangestellt, damit sie auch in der GitHub-Pages-Vorschau (/waybuild_website/…) funktionieren
// (Jamil, Talk qh87y3sj #5274/#5276). Auf der eigenen Domain (BASE "/") bleibt alles unverändert.
// HAST-Plugin für den Sätteri-Markdown-Prozessor (wie markdown-tabellen.mjs).

export function basisLinksPlugin(base = '/') {
  const praefix = base.replace(/\/+$/, '');
  return {
    name: 'waybuild-basislinks',
    element: [
      {
        filter: ['a'],
        visit(node, ctx) {
          const ziel = node.properties?.href;
          if (!praefix || typeof ziel !== 'string') return;
          if (!ziel.startsWith('/') || ziel.startsWith('//') || ziel.startsWith(`${praefix}/`)) return;
          ctx.setProperty(node, 'href', `${praefix}${ziel}`);
        },
      },
    ],
  };
}
