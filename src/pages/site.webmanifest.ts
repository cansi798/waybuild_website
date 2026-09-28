// Web-App-Manifest mit korrekten Pfaden für Vorschau (Unterordner) und Live-Server ("/").
import type { APIRoute } from 'astro';
import { href } from '../lib/paths';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: 'Waybuild – Websites im Abo',
        short_name: 'Waybuild',
        start_url: href('/'),
        scope: href('/'),
        display: 'browser',
        background_color: '#f7f5f0',
        theme_color: '#0e1a2b',
        icons: [
          { src: href('/icon-192.png'), sizes: '192x192', type: 'image/png' },
          { src: href('/icon-512.png'), sizes: '512x512', type: 'image/png' },
          { src: href('/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
