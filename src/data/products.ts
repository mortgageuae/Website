// Silo 02 — Core mortgage products & buyer profiles (/mortgages/[slug]).
export type Faq = { q: string; a: string };
export type Product = {
  slug: string;
  name: string;
  ar: string;
  title: string; // H1
  badge: string;
  card: string; // short card copy (unique per product)
  cta: string;
  capsule: string; // ~50-word AEO citation capsule
  facts: [string, string][];
  sections: { h: string; p: string }[];
  faqs: Faq[];
  calc: string; // related calculator slug
  core?: boolean; // shows on homepage 8-card grid
};

export const PRODUCTS: Product[] = [
  {
    slug: 'uae-residents', name: 'Expat Resident Mortgages', ar: 'تمويل المقيمين الوافدين', core: true,
    title: 'Expat Resident Mortgages in Dubai: 80% LTV on Your First Home',
    badge: 'Up to 80% LTV', cta: 'Get pre-approved in 48h',
    card: 'Buying a villa or apartment in the UAE? Get a formal dual-bank pre-approval in 48 hours so you can sign your RERA Form F with full deposit protection.',
    capsule: 'Expat residents in the UAE can borrow up to 80% of a first home valued at AED 5M or less and 70% above AED 5M under CBUAE rules. Tenures run to 25 years or age 65 for salaried applicants, with total debt repayments capped at 50% of gross monthly income.',
    facts: [['Max LTV (≤ AED 5M)', '80%'], ['Max LTV (> AED 5M)', '70%'], ['Minimum salary', 'AED 10,000–15,000 / month'], ['Max tenure', '25 yrs or age 65'], ['Pre-approval SLA', '48 hours, two banks in parallel'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'How residents are underwritten', p: 'Banks read your salary certificate (dated within 30 days), six months of payslips and six consecutive salary credits. Fixed allowances count in full; variable pay, bonuses and commissions are usually averaged over 12–24 months at 50–75%. Your employer’s listing category with each bank changes both the rate and whether salary transfer is required.' },
      { h: 'The real cash you need', p: 'On top of the 20% down payment, budget about 7% for the 4% DLD fee, AED 580 title deed, 0.25% mortgage registration, AED 4,200 trustee fee, AED 3,150 valuation and the 2.1% agency commission. Our calculator itemises every dirham before you sign anything.' },
      { h: 'Why dual pre-approval matters', p: 'A pre-approval from one bank can collapse if its valuer down-values the unit. We submit to a primary and a backup bank whose valuer panels differ, so a single low valuation never costs you the 10% Form F deposit.' },
    ],
    faqs: [
      { q: 'Can I buy with 10% down as an expat?', a: 'No. CBUAE caps first-home LTV for expats at 80% (≤ AED 5M), so at least 20% must be your own funds—and it cannot come from a UAE personal loan.' },
      { q: 'Do I need to transfer my salary?', a: 'Not always. Salary-transfer products are 0.10–0.25% cheaper, but around half the panel offers non-salary-transfer pricing for listed employers.' },
      { q: 'How long does the whole process take?', a: 'Typically 3–5 weeks from pre-approval to DLD transfer: 48h pre-approval, 3–5 days valuation, 5–7 days Final Offer Letter, then trustee transfer.' },
    ],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'uae-nationals', name: 'UAE National Mortgages', ar: 'تمويل المواطنين الإماراتيين',
    title: 'UAE National & Emirati Mortgages: 85% LTV + MRHE and Sheikh Zayed Top-Ups',
    badge: 'Up to 85% LTV', cta: 'Check Emirati eligibility',
    card: 'Emirati first-home buyers borrow up to 85% and can combine MRHE or Sheikh Zayed Housing Programme grants with a bank top-up loan.',
    capsule: 'UAE Nationals can borrow up to 85% of a first home valued at AED 5M or less and 75% above, with tenures to 25 years and maturity up to age 70. Bank loans can be layered on top of Mohammed bin Rashid Housing Establishment or Sheikh Zayed Housing Programme approvals to fund larger villas.',
    facts: [['Max LTV (≤ AED 5M)', '85%'], ['Max LTV (> AED 5M)', '75%'], ['Max age at maturity', '70'], ['Housing grant top-ups', 'MRHE · SZHP'], ['Pension income', 'Accepted'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Combining government housing with a bank loan', p: 'Where an MRHE or SZHP loan covers part of a villa build or purchase, the bank can register a second-ranking facility for the balance. We sequence both approvals so the housing authority NOC and bank offer arrive together.' },
      { h: 'Pricing for nationals', p: 'Several panel banks price UAE National salary-transfer loans 0.10–0.20% below expat tiers, and Islamic banks such as DIB, ADIB and Al Hilal offer Ijara with national-only profit rates.' },
      { h: 'Government and semi-government employers', p: 'Federal, emirate-level and GRE employees typically fall into the top employer category at every bank, unlocking the lowest rate tiers and higher income multiples.' },
    ],
    faqs: [
      { q: 'Can a UAE National borrow for a second home?', a: 'Yes—second and investment homes are capped at 65% LTV for nationals, with rental income counted toward affordability.' },
      { q: 'Is the MRHE loan counted in my DBR?', a: 'Yes. Its monthly instalment is included in the 50% debt burden ratio, which is why sequencing and tenor choice matter.' },
    ],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'gcc-nationals', name: 'GCC National Mortgages', ar: 'تمويل مواطني دول الخليج',
    title: 'GCC National Mortgages in Dubai & Abu Dhabi: Saudi, Qatari, Kuwaiti, Bahraini & Omani Buyers',
    badge: 'Up to 75% LTV', cta: 'Check GCC eligibility',
    card: 'Saudi, Qatari, Kuwaiti, Bahraini and Omani citizens access near-national pricing whether they live in the UAE or at home.',
    capsule: 'GCC citizens buying in Dubai or Abu Dhabi are underwritten close to UAE National terms when resident, and at up to 65–70% LTV when living in their home country. Banks verify income through GOSI, employer letters or commercial registrations and pull SIMAH, QCB or Ci-Net bureau reports.',
    facts: [['Resident GCC LTV', 'Up to 75–80%'], ['Non-resident GCC LTV', '65–70%'], ['FX haircut', '0–5% (pegged currencies)'], ['Credit bureaux', 'SIMAH · QCB · Ci-Net · Benefit'], ['Freehold access', 'All UAE freehold zones'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Pegged currencies, minimal haircut', p: 'Because SAR, QAR, BHD and OMR are pegged to the dollar, most banks apply little or no FX haircut to GCC income—unlike the 15–20% applied to GBP, EUR or INR.' },
      { h: 'Documents banks ask for', p: 'Salaried: salary certificate plus six months of statements (GOSI certificate for Saudi applicants). Self-employed: commercial registration, establishment card and two years of audited accounts.' },
    ],
    faqs: [{ q: 'Can GCC nationals buy outside freehold areas?', a: 'GCC citizens enjoy wider ownership rights than other foreigners in several emirates; we confirm title eligibility with DLD or ADREC before the bank instructs valuation.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'non-resident-dubai', name: 'Non-Resident Mortgages', ar: 'تمويل غير المقيمين', core: true,
    title: 'Non-Resident Dubai Mortgages: Up to 65% LTV Across 14 UAE Banks',
    badge: 'Up to 65% LTV · Remote PoA', cta: 'Check non-resident LTV',
    card: 'Invest in Dubai or Abu Dhabi from anywhere. We structure loans on overseas salary or business income with a 15-minute video PoA closing and wholesale FX.',
    capsule: 'Non-residents can get a Dubai mortgage without an Emirates ID across 14 UAE banks. HSBC, Emirates NBD, FAB, ADCB, Standard Chartered and DIB lend up to 60% LTV; Mashreq, CBD and Amlak lend up to 65%. Closing can be fully remote in 3–5 weeks via a 15-minute Dubai Courts video Power of Attorney.',
    facts: [['Max LTV', '60–65%'], ['Active lenders', '14 banks'], ['Max tenure', '25 years'], ['FX haircut', '0–20% by currency'], ['Remote closing', 'Video PoA in 15 minutes'], ['Timeline', '3–5 weeks']],
    sections: [
      { h: 'How overseas income is read', p: 'Banks convert foreign income at a haircut (e.g. 15% for GBP or EUR, 20% for INR) and verify it with home-country tax returns and credit bureau reports. Our 25 country pages map exactly which documents each bank accepts.' },
      { h: 'Closing without flying in', p: 'Form F is signed through Dubai REST OTP. A Dubai Courts Smart Notary video call issues a Power of Attorney that must explicitly include borrowing and first-degree mortgage registration authority, dated within two years.' },
      { h: 'Wholesale FX on your down payment', p: 'Down payments and fees move through our FX partner at wholesale spreads, typically saving 1–2% versus retail bank conversion on a seven-figure transfer.' },
    ],
    faqs: [
      { q: 'Do I need a UAE bank account?', a: 'Yes—the lending bank opens a non-resident account to collect EMIs; we coordinate it remotely alongside the mortgage file.' },
      { q: 'What is the minimum income?', a: 'Most banks look for the equivalent of AED 25,000–30,000 per month after the FX haircut.' },
    ],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'self-employed', name: 'Self-Employed Mortgages', ar: 'تمويل أصحاب الأعمال',
    title: 'Self-Employed & Freezone Company Owner Mortgages: Retained Earnings and Dividend Add-Back Underwriting',
    badge: 'Corporate income accepted', cta: 'Assess my business income',
    card: 'Freezone and mainland owners are underwritten on corporate net profit plus add-backs—no six personal salary transfers required.',
    capsule: 'Self-employed borrowers in the UAE need a trade licence held for at least two years, two years of audited financials and 6–12 months of corporate statements. Banks such as RAKBANK, Mashreq, CBD, Emirates NBD, DIB and FAB can underwrite corporate net profit plus depreciation and director drawings at up to 80% LTV.',
    facts: [['Trading history', '≥ 2 years'], ['Financials', '2 years audited'], ['Max LTV', '80% (resident)'], ['Max age at maturity', '70'], ['Income method', 'Net profit + add-backs × shareholding'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'The retained-earnings problem', p: 'Most rejections happen because owners pay themselves little salary and leave profit in the company. We present corporate net profit, depreciation and director drawings to banks that accept them, attributed by shareholding.' },
      { h: 'Freezone specifics', p: 'DMCC, IFZA, Meydan, RAKEZ and DIFC entities are accepted, but some banks require a minimum turnover or a UAE-based office lease. We pre-screen your licence category against each bank’s policy.' },
    ],
    faqs: [{ q: 'Can I use only one year of financials?', a: 'A few banks accept 12 months for established professions, usually at a lower LTV and higher rate.' }],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'golden-visa-mortgage', name: 'Golden Visa Mortgages', ar: 'تمويل الإقامة الذهبية', core: true,
    title: '10-Year UAE Golden Visa via a Mortgaged Property: February 2026 DLD Rules',
    badge: '10-Year Residency', cta: 'Structure my Golden Visa loan',
    card: 'Buying or refinancing a property worth AED 2M or more? Under February 2026 rules you qualify with a 20% down payment—we handle the bank NOC end-to-end.',
    capsule: 'Since February 2026, a mortgaged Dubai property with a Title Deed, Oqood or DLD valuation of at least AED 2,000,000 qualifies its owner for the 10-year UAE Golden Visa. The legacy AED 1M paid-equity rule was removed, so a 20% down payment on an AED 2M home qualifies on day one with a bank NOC.',
    facts: [['Value threshold', 'AED 2,000,000'], ['Paid-equity rule', 'Removed (Feb 2026)'], ['Investor package', 'AED 9,421–10,111'], ['Family dependant', '~AED 7,200–7,680 each'], ['Bank NOC fee', 'AED 0–525'], ['Buyout impact', 'Visa unaffected']],
    sections: [
      { h: 'Appreciated homes below AED 2M purchase price', p: 'Bought for AED 1.5M and now worth AED 2.2M? An official DLD valuation certificate (AED 4,020 via Dubai REST) can establish the threshold without selling or refinancing.' },
      { h: 'The 5-step DLD Cube flow', p: '1) Bank Golden Visa NOC, 2) DLD application with title and valuation, 3) GDRFA 10-year permit, 4) medical and biometrics, 5) Emirates ID issuance—typically 10–20 working days.' },
    ],
    faqs: [
      { q: 'Does refinancing cancel my Golden Visa?', a: 'No. Title ownership is continuous on a buyout, so the visa stays valid; the new bank issues a fresh NOC.' },
      { q: 'Can off-plan property qualify?', a: 'Yes, where the Oqood value is AED 2M or more and the developer is on DLD’s approved list.' },
    ],
    calc: 'golden-visa-mortgage-calculator',
  },
  {
    slug: 'islamic-home-finance', name: 'Islamic Home Finance', ar: 'التمويل العقاري الإسلامي', core: true,
    title: 'Islamic Sharia-Compliant Home Finance: Ijara vs Murabaha Across DIB, ADIB, EIB, SIB & Ajman Bank',
    badge: 'Ijara & Murabaha', cta: 'Compare Islamic rates',
    card: '100% Sharia-compliant home finance reviewed by independent Sharia supervisory boards across DIB, ADIB, Emirates Islamic and Sharjah Islamic Bank.',
    capsule: 'Islamic home finance in the UAE is mainly offered as Ijara (lease-to-own with a variable rental linked to EIBOR) or Murabaha (cost-plus sale with a fixed profit). Profit rates start at 3.75% (1-year, Sharjah Islamic Bank), and DIB carries the lowest revert margin on the panel at +1.00%.',
    facts: [['Lowest profit rate', '3.75% (SIB, 1Y)'], ['Lowest revert margin', '+1.00% (DIB)'], ['Structures', 'Ijara · Murabaha · Diminishing Musharaka'], ['Islamic lenders', '8 on panel'], ['LTV', 'Same CBUAE caps'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Ijara vs Murabaha in practice', p: 'Ijara lets the bank own the asset and lease it to you, with rentals re-priced off EIBOR—most flexible for overpayment. Murabaha fixes the total profit at signing, giving certainty but less benefit if rates fall.' },
      { h: 'Takaful instead of conventional insurance', p: 'Islamic finance pairs with Takaful life and property cover. Several Islamic banks accept assigned external Takaful policies at lower cost than bundled cover.' },
    ],
    faqs: [{ q: 'Is Islamic finance more expensive?', a: 'Not inherently. On our November 2026 panel, Islamic banks hold both the lowest intro rate (SIB) and the lowest revert margin (DIB).' }],
    calc: 'fixed-to-revert-analyzer',
  },
  {
    slug: 'mortgage-buyout-refinance', name: 'Switch Bank (Buyout)', ar: 'نقل التمويل وإعادة التمويل', core: true,
    title: 'Switch Bank / Mortgage Buyout: CBUAE 1% Exit Cap, Zero-Fee Banks & 3-Year Clawback Math',
    badge: '0% valuation & bank fee', cta: 'Calculate refinance savings',
    card: 'Paying more than 4.25% or rolling onto a 6% EIBOR revert? We calculate net savings after the CBUAE 1% (max AED 10,000) exit cap and 36-month clawbacks.',
    capsule: 'A UAE mortgage buyout moves your loan to a cheaper bank. CBUAE caps early settlement penalties at 1% of the outstanding balance or AED 10,000, whichever is lower, plus VAT. Most banks waive buyout processing and valuation fees but claw them back if you leave within 36 months.',
    facts: [['Exit penalty cap', '1% or AED 10,000 (+VAT)'], ['Buyout processing fee', '0% at most banks'], ['Clawback window', 'Typically 36 months'], ['Break-even target', '< 12 months'], ['Golden Visa', 'Remains valid'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'When a switch pays', p: 'As a rule of thumb, a 0.50% rate cut on a balance above AED 1M recovers the AED 10,500 exit cost in under a year. Our calculator includes the old bank’s penalty, new mortgage registration (0.25% + AED 290) and any clawback exposure.' },
      { h: 'The liability letter sequence', p: 'Your new bank issues an FOL, your current bank issues a liability letter (valid ~15 days), the new bank pays off the old loan by manager’s cheque, and DLD re-registers the mortgage—usually 3–4 weeks.' },
    ],
    faqs: [{ q: 'Can I take cash out when I switch?', a: 'Yes—combine the buyout with equity release up to 80% of the new valuation for residents (subject to DBR).' }],
    calc: 'buyout-refinance-savings',
  },
  {
    slug: 'equity-release', name: 'Equity Release & Cash-Out', ar: 'تحرير حقوق الملكية', core: true,
    title: 'Equity Release & Cash-Out Refinancing: Unlock up to 80% LTV from Paid-Off or Appreciated Homes',
    badge: 'Cash-out + DIFC Wills', cta: 'Calculate unlocked equity',
    card: 'Unlock tax-free liquidity from property you already own to fund new investments—backed by external life insurance assignment, conveyancing and DIFC Wills protection.',
    capsule: 'UAE equity release lets owners of paid-off or appreciated property borrow against current market value—up to 80% LTV for resident expats, 85% for UAE Nationals and 60–65% for investment property. Funds are tax-free, but end use is checked and the new EMI must fit within the 50% DBR cap.',
    facts: [['Max LTV (resident home)', '80%'], ['Max LTV (investment)', '60–65%'], ['Valuation basis', 'Current RERA valuation'], ['Tenure', 'Up to 25 years'], ['Typical timeline', '2–3 weeks'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Using equity to buy the next property', p: 'Many investors release equity from a paid-off apartment to fund the down payment and fees on an off-plan or second ready unit. Banks treat the released cash as own funds, unlike a personal loan.' },
      { h: 'Protect the family while you leverage', p: 'Assigning an external life policy (instead of the bank’s) saves roughly half the premium, and a DIFC single-property Will stops the asset freezing if a joint owner dies.' },
    ],
    faqs: [{ q: 'Is there a minimum release amount?', a: 'Most banks require a loan of at least AED 500,000.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'second-home-investment', name: 'Investment & Second Homes', ar: 'تمويل المنزل الثاني والاستثمار',
    title: 'Investment & Second Property Mortgages: 60–65% LTV and Using Ejari Rent to Boost DBR',
    badge: '60–65% LTV', cta: 'Model rental coverage',
    card: 'Buying a second unit to rent? Banks count up to 80% of registered Ejari rent toward your affordability.',
    capsule: 'A second or investment home in the UAE is capped at 60–65% LTV for residents. Banks count 70–80% of the property’s registered Ejari rental income toward affordability, which can offset the new EMI within the 50% DBR limit—making portfolio growth feasible on a single salary.',
    facts: [['Max LTV', '60–65%'], ['Rent counted', '70–80% of Ejari'], ['Proof of rent', 'Ejari + 6 months credits'], ['Short-let income', 'Some banks, with DTCM permit'], ['Tenure', 'Up to 25 years'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'How rent improves your borrowing power', p: 'If your second unit rents for AED 96,000 a year, a bank counting 80% adds AED 6,400 per month to eligible income—roughly AED 1.1M of extra borrowing capacity at today’s stress rates.' },
      { h: 'Gross yields by community', p: 'Our 60 community hubs publish indicative price per square foot and gross yields so you can compare EMI coverage before choosing where to buy.' },
    ],
    faqs: [{ q: 'Does holiday-home income count?', a: 'A handful of banks accept DTCM-licensed short-let income averaged over 12 months, usually at a 50% factor.' }],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'land-plot-construction', name: 'Plot & Construction Loans', ar: 'تمويل الأراضي والبناء',
    title: 'Residential Land Plot & Self-Build Villa Construction Loans: Stage-Payment Drawdowns',
    badge: 'Stage drawdowns', cta: 'Plan my build finance',
    card: 'Finance a freehold plot and the villa you build on it, with bank releases tied to certified construction stages.',
    capsule: 'UAE plot and construction loans typically fund 50–70% of the land price and up to 70–80% of build costs, released in stages against consultant-certified progress. A tripartite agreement between borrower, bank and contractor governs drawdowns, with interest charged only on released amounts.',
    facts: [['Plot LTV', '50–70%'], ['Build cost LTV', 'Up to 70–80%'], ['Drawdowns', '4–6 certified stages'], ['Agreement', 'Tripartite with contractor'], ['Interest', 'On drawn balance only'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'What banks need before stage one', p: 'Approved drawings, building permit, a fixed-price contract with a licensed contractor and a consultant appointed to certify each stage.' },
      { h: 'Where it works', p: 'Freehold villa plots in Dubai Hills, Jumeirah Golf Estates, Al Furjan, Tilal Al Ghaf and Saadiyat, plus national plots under housing programmes.' },
    ],
    faqs: [{ q: 'Can I convert to a standard mortgage on completion?', a: 'Yes—on the completion certificate the facility converts to an amortising home loan.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'under-construction-off-plan', name: 'Off-Plan & Handover Finance', ar: 'تمويل العقارات على الخارطة', core: true,
    title: 'Under-Construction Off-Plan Mortgages: CBUAE 50% LTV Ceiling and the 80% Handover Shift',
    badge: 'Emaar · Meraas · Sobha', cta: 'Check my project’s APL',
    card: 'Final completion payment approaching? We match you with the banks that hold your developer and tower on their Approved Project List for up to 80% LTV.',
    capsule: 'CBUAE caps lending on off-plan property under early construction at 50% LTV. Within 60–90 days of handover, banks underwrite the final developer instalment as a ready property at up to 80% LTV for expat residents—only if the project is on the bank’s Approved Project List (APL).',
    facts: [['Under-construction LTV', '50% max'], ['Handover LTV', '80% resident · 85% National'], ['DLD fee at handover', 'None (Oqood paid)'], ['Handover fees', '0.25% + AED 290, AED 4,200, AED 580, AED 3,150'], ['Projects mapped', '80 handover pages'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'The APL is everything', p: 'Each bank keeps an approved list by developer and tower. A missing tower means no loan from that bank, so we check APL coverage before your developer’s handover notice arrives.' },
      { h: 'Valuation uplift cash-out', p: 'Banks lending on fresh handover valuation can fund more than the developer balance. Bought at AED 2.0M on 80/20, now valued at AED 2.8M? 80% LTV is AED 2.24M—AED 400k to the developer, the rest released as cash.' },
    ],
    faqs: [{ q: 'Can I get a mortgage before 50% is paid?', a: 'Yes, but under-construction loans are capped at 50% LTV and offered by fewer banks; most buyers wait for handover financing.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'mega-loans-luxury-villas', name: 'HNW Mega Loans', ar: 'تمويل الفلل الفاخرة',
    title: 'HNW Mega Mortgages & Trophy Asset Financing: AED 15M to AED 100M+ in Emirates Hills & Palm Jumeirah',
    badge: 'AED 15M–100M+', cta: 'Speak to the private desk',
    card: 'Structured lending for trophy villas and penthouses, with private-bank pricing and asset-backed income assessment.',
    capsule: 'Mega mortgages above AED 15M in the UAE are typically structured by private-banking arms of FAB, HSBC, Emirates NBD and Standard Chartered. Residents borrow up to 70% LTV above AED 5M; pricing is negotiated on relationship assets, and global wealth or rental income can substitute for salary.',
    facts: [['Loan size', 'AED 15M–100M+'], ['Max LTV (> AED 5M)', '70% resident · 75% National'], ['Income basis', 'Global assets, dividends, rent'], ['Pricing', 'Relationship-negotiated'], ['Valuation', 'Two-valuer panels'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Relationship pricing', p: 'Depositing AUM with the lender can cut 0.25–0.50% off the rate. We run the numbers to show whether the opportunity cost of parked assets beats the rate saving.' },
      { h: 'Trophy valuations', p: 'Unique assets on Palm Jumeirah fronds or Emirates Hills golf course lots often need two valuers; we pre-brief valuers with comparable evidence.' },
    ],
    faqs: [{ q: 'Can an offshore company hold the property?', a: 'Yes—RAK ICC or JAFZA offshore structures are accepted by most private banks, with personal guarantees.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'portfolio-consolidation', name: 'Portfolio Consolidation', ar: 'دمج المحافظ العقارية',
    title: 'Multi-Property Portfolio Consolidation Mortgages: 2 to 10 Properties in One Low-Rate Facility',
    badge: '2–10 properties', cta: 'Review my portfolio',
    card: 'Merge mortgages on 2–10 properties into one facility with a single rate, revert date and relationship manager.',
    capsule: 'Portfolio consolidation refinances 2 to 10 mortgaged UAE properties into one bank facility, aligning revert dates and often cutting the blended rate by 0.25–0.75%. Each property is valued separately, rents are assessed together, and CBUAE early-settlement caps limit exit costs to 1% or AED 10,000 per loan.',
    facts: [['Properties', '2–10'], ['Blended LTV', '60–65%'], ['Exit cap per loan', '1% or AED 10,000'], ['Rent assessment', 'Portfolio-level'], ['Benefit', 'One rate, one revert date'], ['Client fee', 'AED 0']],
    sections: [
      { h: 'Why consolidate', p: 'Landlords with loans at four banks face four revert dates and four floor rates. One facility simplifies cash flow and strengthens your negotiating position at renewal.' },
      { h: 'Exit-cost math', p: 'Each existing loan carries its own capped exit penalty; we only recommend moving loans where the rate gain clears the penalty within 12 months.' },
    ],
    faqs: [{ q: 'Do all properties need to be in one emirate?', a: 'No. National banks lend across emirates, though valuation is instructed separately for each title.' }],
    calc: 'buyout-refinance-savings',
  },
];

export const productBy = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
