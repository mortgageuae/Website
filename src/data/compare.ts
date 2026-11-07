// Silo 04b — 15 head-to-head comparison pages (/rates/compare/[slug]).
export type Comparison = {
  slug: string;
  title: string;
  kind: 'banks' | 'topic';
  a?: string; // bank key
  b?: string;
  topic?: 'conv-islamic' | 'fixed-terms' | 'salary-transfer' | 'cc-dbr' | 'external-life';
  focus?: string; // extra angle for bank pairs
};

export const COMPARISONS: Comparison[] = [
  { slug: 'emirates-nbd-vs-hsbc-mortgage', title: 'Emirates NBD vs HSBC Mortgage', kind: 'banks', a: 'emirates-nbd', b: 'hsbc' },
  { slug: 'emirates-nbd-vs-fab-mortgage', title: 'Emirates NBD vs FAB Mortgage', kind: 'banks', a: 'emirates-nbd', b: 'fab' },
  { slug: 'dubai-islamic-bank-vs-adib-home-finance', title: 'Dubai Islamic Bank vs ADIB Home Finance', kind: 'banks', a: 'dib', b: 'adib' },
  { slug: 'hsbc-vs-standard-chartered-uae-mortgage', title: 'HSBC vs Standard Chartered UAE Mortgage', kind: 'banks', a: 'hsbc', b: 'standard-chartered' },
  { slug: 'adcb-vs-emirates-nbd-mortgage', title: 'ADCB vs Emirates NBD Mortgage', kind: 'banks', a: 'adcb', b: 'emirates-nbd' },
  { slug: 'mashreq-vs-cbd-non-resident-mortgage', title: 'Mashreq vs CBD Non-Resident Mortgage', kind: 'banks', a: 'mashreq', b: 'cbd', focus: 'non-resident' },
  { slug: 'dubai-islamic-bank-vs-emirates-islamic', title: 'Dubai Islamic Bank vs Emirates Islamic', kind: 'banks', a: 'dib', b: 'emirates-islamic' },
  { slug: 'sharjah-islamic-bank-vs-dib-home-finance', title: 'Sharjah Islamic Bank vs DIB Home Finance', kind: 'banks', a: 'sib', b: 'dib' },
  { slug: 'fab-vs-adcb-abu-dhabi-mortgage', title: 'FAB vs ADCB Abu Dhabi Mortgage', kind: 'banks', a: 'fab', b: 'adcb' },
  { slug: 'rakbank-vs-mashreq-self-employed-mortgage', title: 'RAKBANK vs Mashreq Self-Employed Mortgage', kind: 'banks', a: 'rakbank', b: 'mashreq', focus: 'self-employed' },
  { slug: 'conventional-vs-islamic-mortgage-uae-math', title: 'Conventional vs Islamic Mortgage in the UAE: The Math', kind: 'topic', topic: 'conv-islamic' },
  { slug: '2-year-fixed-vs-3-year-fixed-vs-5-year-fixed-uae', title: '2-Year vs 3-Year vs 5-Year Fixed Mortgage Rates in the UAE', kind: 'topic', topic: 'fixed-terms' },
  { slug: 'salary-transfer-vs-non-salary-transfer-mortgage-rates', title: 'Salary Transfer vs Non-Salary Transfer Mortgage Rates', kind: 'topic', topic: 'salary-transfer' },
  { slug: '3-percent-vs-5-percent-credit-card-dbr-banks-uae', title: '3% vs 5% Credit Card DBR Banks in the UAE', kind: 'topic', topic: 'cc-dbr' },
  { slug: 'banks-allowing-external-life-insurance-uae', title: 'UAE Banks Allowing External Life Insurance', kind: 'topic', topic: 'external-life' },
];
