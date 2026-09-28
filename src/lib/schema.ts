// JSON-LD-Bausteine für strukturierte Daten (Rich Results bei Google)
import { faqs, plans, company } from '../config/site';
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
