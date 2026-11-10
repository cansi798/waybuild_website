// JSON-LD für strukturierte Daten (Rich Results bei Google)
import { company, WAAS, PAKETE, brutto } from '../config/site';
import { EINMALIG_DAZU, KOMPLETTPAKET as K, kombiPreise } from '../config/pakete-abo';
import { absolute } from './paths';

const eurText = (n: number) => n.toFixed(2).replace('.', ',');

/** Die Monatspakete (Basis, Plus) als schema.org-Offers (netto zzgl. MwSt., pro Monat), das optional zusätzlich buchbare
 *  Komplettpaket als Ab-Preis (priceSpecification.minPrice), die Kombipreise Basis/Plus + Komplettpaket (Ab-Preise), dazu die
 *  einmalig dazubuchbaren Leistungen (Festpreis netto). Daten aus config/pakete-abo.ts (über PAKETE in site.ts). */
export function waasOffers(site: URL | undefined, path = '/preise/') {
  const url = absolute(path, site);
  const monatlich = PAKETE.map((p) => ({
    '@type': 'Offer',
    name: `${WAAS.name}: Paket ${p.name}`,
    url,
    priceCurrency: 'EUR',
    price: p.preis,
    description: `${p.kurz}. ${p.features.join(', ')}. Keine Einrichtungskosten, keine Seitenbegrenzung, ${WAAS.laufzeit}. Preis netto zzgl. 19 % MwSt. (${eurText(brutto(p.preis))} € inkl. MwSt.).`,
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
  /** Ab-Preis pro Monat: price = Mindestpreis, dazu minPrice in der priceSpecification */
  const abAngebot = (name: string, preis: number, description: string) => ({
    '@type': 'Offer',
    name,
    url,
    priceCurrency: 'EUR',
    price: preis,
    description,
    eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: preis,
      minPrice: preis,
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      unitCode: 'MON',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
  });
  const komplett = [
    abAngebot(`${K.name}: Auftragsverwaltung (zusätzlich zu Basis oder Plus)`, K.preis,
      `${K.kurz}. ${K.text} Ab ${eurText(K.preis)} € pro Monat netto zzgl. 19 % MwSt. (ab ${eurText(brutto(K.preis))} € inkl. MwSt.), ${WAAS.laufzeit}.`),
    ...kombiPreise().map((k) => abAngebot(`${WAAS.name}: Paket ${k.paket.name} + ${K.name} (Kombipreis)`, k.preis,
      `Paket ${k.paket.name} zusammen mit dem ${K.name} ab ${eurText(k.preis)} € pro Monat netto zzgl. 19 % MwSt. (ab ${eurText(brutto(k.preis))} € inkl. MwSt.), statt einzeln ab ${eurText(k.einzeln)} €. Nicht zusammen mit dem Gesamtpaket „${EINMALIG_DAZU.gesamt.name}“.`)),
  ];
  const einmalig = [...EINMALIG_DAZU.liste, EINMALIG_DAZU.gesamt].map((e) => ({
    '@type': 'Offer',
    name: `${e.name} (einmalig dazubuchbar)`,
    url,
    priceCurrency: 'EUR',
    price: e.preis,
    description: `${e.text} Einmaliger Festpreis netto zzgl. 19 % MwSt. (${eurText(brutto(e.preis))} € inkl. MwSt.), keine monatlichen Kosten.`,
    eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business',
    priceSpecification: { '@type': 'PriceSpecification', price: e.preis, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
  }));
  return [...monatlich, ...komplett, ...einmalig];
}

export function serviceSchema(site: URL | undefined, beschreibung?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: WAAS.name,
    serviceType: 'Website as a Service: Beratung, KI-gestützte Website-Erstellung, Hosting, Wartung und Betreuung',
    provider: { '@id': `${absolute('/', site)}#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'BusinessAudience', name: 'Kleine und mittlere Unternehmen' },
    description: beschreibung ?? `${company.name} verbindet persönliche Beratung mit KI-gestützter Umsetzung. ${WAAS.name}: ${WAAS.claim}`,
    offers: waasOffers(site),
  };
}
