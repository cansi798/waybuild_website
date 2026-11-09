// Ratgeber-Tabellen barrierefrei (Prüfung Unterseiten 09.11.2026, axe „scrollable-region-focusable“ + „empty-table-header“;
// Jamil, Talk qh87y3sj #5215). HAST-Plugin für den Sätteri-Markdown-Prozessor (Astro-Standard, astro.config.mjs):
// - jede Markdown-Tabelle steckt in <div class="tabelle" role="region" tabindex="0" aria-label="Tabelle: …">,
//   damit man die (am Handy waagrecht scrollbare) Tabelle auch per Tastatur erreicht und scrollt;
// - eine leere Kopfzelle bekommt einen nur für Screenreader sichtbaren Namen („Kriterium“).

const istEl = (n, tag) => Boolean(n) && n.type === 'element' && n.tagName === tag;

function kopfZellen(table) {
  const thead = (table.children ?? []).find((c) => istEl(c, 'thead'));
  const tr = thead && (thead.children ?? []).find((c) => istEl(c, 'tr'));
  return tr ? (tr.children ?? []).filter((c) => istEl(c, 'th')) : [];
}

function bezeichnung(namen) {
  if (namen.length > 1 && namen[0] === '') return `Tabelle: Vergleich ${namen.slice(1).filter(Boolean).join(' und ')}`;
  return `Tabelle: ${namen.filter(Boolean).join(', ')}`;
}

export const tabellenPlugin = {
  name: 'waybuild-tabellen',
  element: [
    {
      filter: ['table'],
      visit(node, ctx) {
        const namen = kopfZellen(node).map((th) => ctx.textContent(th).trim());
        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['tabelle'], role: 'region', tabIndex: 0, ariaLabel: bezeichnung(namen) },
          children: [],
        });
      },
    },
    {
      filter: ['th'],
      visit(node, ctx) {
        if (ctx.textContent(node).trim() !== '') return;
        ctx.appendChild(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: 'Kriterium' }],
        });
      },
    },
  ],
};
