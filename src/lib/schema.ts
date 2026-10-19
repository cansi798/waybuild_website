// JSON-LD-Bausteine für strukturierte Daten (Rich Results bei Google)
import { faqs, company, WAAS, PAKETE } from '../config/site';
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

/** Die zwei Varianten als schema.org-Offers (netto, pro Monat) – Preise aus PAKETE. */
export function waasOffers(site: URL | undefined, path = '/preise/') {
  const url = absolute(path, site);
  return PAKETE.map((p) => ({
    '@type': 'Offer',
    name: `${WAAS.name} – ${p.name}`,
    url,
    priceCurrency: 'EUR',
    price: p.preis,
    description: `${p.kurz}. ${p.features.join(', ')}. Keine Einrichtungskosten, ${WAAS.laufzeitMonate} Monate Laufzeit, Preis netto zzgl. MwSt.`,
    eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.preis,
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      unitCode: 'MON',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
  }));
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
    offers: waasOffers(site),
  };
}
