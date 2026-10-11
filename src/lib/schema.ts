// JSON-LD-Bausteine für strukturierte Daten (Rich Results bei Google)
import { faqs, plans, company } from '../config/site';
import {
  type Paket,
  SOFTWARE_PROJEKTE, WEBDEV_PAKETE, PFLEGE_PAKETE, NEXTCLOUD_PAKETE, IT_PAKETE, ANALYSE_PAKETE,
} from '../config/angebot';
import { absolute } from './paths';

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website im Abo',
    serviceType: 'Webdesign, Webentwicklung, Hosting und E-Mail',
    provider: { '@id': `${absolute('/', site)}#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    description: `${company.name} entwickelt individuelle Websites im Abo – inklusive Hosting, Domain, unbegrenzter E-Mail-Postfächer und Wartung.`,
    offers: plans.map((p) => ({
      '@type': 'Offer',
      name: `Tarif ${p.name}`,
      url: absolute('/preise/', site),
      priceCurrency: 'EUR',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          price: p.monthly,
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: false,
          unitCode: 'MON',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        },
        {
          '@type': 'PriceSpecification',
          name: 'Einrichtungsgebühr (einmalig)',
          price: p.setup,
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: false,
        },
      ],
    })),
  };
}

/** Ein Paket aus angebot.ts als schema.org-Offer (Preise netto, EUR). */
function paketOffer(p: Paket, url: string) {
  const ab = p.preis.trim().startsWith('ab ');
  const stunde = /stunde/i.test(p.einheit);
  const base = {
    price: p.wert,
    ...(ab ? { minPrice: p.wert } : {}),
    priceCurrency: 'EUR',
    valueAddedTaxIncluded: false,
  };
  const priceSpecification = p.monatlich
    ? {
        '@type': 'UnitPriceSpecification',
        ...base,
        unitCode: 'MON',
        unitText: p.einheit,
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      }
    : stunde
      ? {
          '@type': 'UnitPriceSpecification',
          ...base,
          unitCode: 'HUR',
          unitText: p.einheit,
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
        }
      : { '@type': 'PriceSpecification', ...base, name: p.einheit };
  return {
    '@type': 'Offer',
    name: p.name,
    description: p.fuer,
    url,
    priceCurrency: 'EUR',
    priceSpecification,
  };
}

/** Eine Leistung mit ihren Paketen als Service-Objekt (z. B. für Detailseiten). */
export function paketeSchema(
  site: URL | undefined,
  s: { name: string; serviceType: string; description: string; path: string; pakete: Paket[] },
) {
  const url = absolute(s.path, site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.serviceType,
    provider: { '@id': `${absolute('/', site)}#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'BusinessAudience' },
    description: s.description,
    url,
    offers: s.pakete.map((p) => paketOffer(p, url)),
  };
}

/** Alle Pakete jenseits des Website-Abos (Software, Cloud & IT, Beratung) – für /preise/. */
export function angebotSchema(site: URL | undefined) {
  return [
    paketeSchema(site, {
      name: 'Individuelle Software',
      serviceType: 'Softwareentwicklung, Automatisierung und Fachanwendungen',
      description: `${company.name} entwickelt individuelle Software zum Festpreis – von Tools und Automatisierungen bis zur Fachanwendung.`,
      path: '/leistungen/individuelle-software/',
      pakete: SOFTWARE_PROJEKTE,
    }),
    paketeSchema(site, {
      name: 'Software- & Webentwicklung',
      serviceType: 'Webentwicklung, Web-Anwendungen und Schnittstellen',
      description: `${company.name} entwickelt Web-Anwendungen, Kundenportale und Schnittstellen – zum Festpreis oder nach Aufwand.`,
      path: '/leistungen/software-webentwicklung/',
      pakete: WEBDEV_PAKETE,
    }),
    paketeSchema(site, {
      name: 'Software-Pflege im Abo',
      serviceType: 'Betrieb, Wartung und Weiterentwicklung von Software',
      description: `${company.name} betreibt, pflegt und entwickelt Software weiter – zum festen Monatspreis mit Stunden für Weiterentwicklung.`,
      path: '/leistungen/abo-wartung/',
      pakete: PFLEGE_PAKETE,
    }),
    paketeSchema(site, {
      name: 'Nextcloud-Hosting',
      serviceType: 'Managed Nextcloud, Cloud-Speicher und Zusammenarbeit',
      description: `${company.name} betreibt eine eigene Nextcloud für Ihr Unternehmen – mit Servern in Deutschland, Backups und Updates.`,
      path: '/leistungen/nextcloud/',
      pakete: NEXTCLOUD_PAKETE,
    }),
    paketeSchema(site, {
      name: 'IT-Betreuung',
      serviceType: 'IT-Service, Überwachung, Helpdesk und Server-Betreuung',
      description: `${company.name} betreut Arbeitsplätze und Server – mit Überwachung, Updates und festgelegten Antwortzeiten.`,
      path: '/leistungen/cloud-it/',
      pakete: IT_PAKETE,
    }),
    paketeSchema(site, {
      name: 'Wettbewerbsanalyse',
      serviceType: 'Wettbewerbsanalyse und Marktbeobachtung',
      description: `${company.name} analysiert Ihre Wettbewerber – Leistungen, Preise und Online-Auftritt – mit klaren Empfehlungen.`,
      path: '/leistungen/wettbewerbsanalyse/',
      pakete: ANALYSE_PAKETE,
    }),
  ];
}
