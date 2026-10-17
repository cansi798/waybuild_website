// JSON-LD-Bausteine für strukturierte Daten (Rich Results bei Google)
import { faqs, company, WAAS, INKLUSIVE } from '../config/site';
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

/** Das EINE Angebot als schema.org-Offer – mit Preis nur, wenn WAAS.preisMonat festgelegt ist. */
export function waasOffer(site: URL | undefined, path = '/preise/') {
  const url = absolute(path, site);
  return {
    '@type': 'Offer',
    name: WAAS.name,
    url,
    priceCurrency: 'EUR',
    description: `Fester Monatspreis, keine Einrichtungskosten, ${WAAS.laufzeitMonate} Monate Laufzeit. Enthalten: ${INKLUSIVE.map((i) => i.title).join(', ')}.`,
    ...(WAAS.preisMonat
      ? {
          price: WAAS.preisMonat,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: WAAS.preisMonat,
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: false,
            unitCode: 'MON',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          },
        }
      : {}),
  };
}

export function serviceSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: WAAS.name,
    serviceType: 'Website as a Service: Beratung, KI-gestützte Website-Erstellung, Hosting, Wartung und Betreuung',
    provider: { '@id': `${absolute('/', site)}#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'BusinessAudience', name: 'Kleine und mittlere Unternehmen' },
    description: `${company.name} verbindet persönliche Beratung mit KI-gestützter Umsetzung: ${WAAS.name} – ${WAAS.claim}`,
    offers: [waasOffer(site)],
  };
}
