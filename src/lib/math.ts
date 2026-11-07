// Deterministic CBUAE / DLD mortgage math (Market Bible Module 4.1). Pure functions, no rounding until display.

export const STRESS_RATE = 6.5; // % used by banks to stress affordability (shortcut: single panel-wide figure; per-bank stress rates later)

export function emi(principal: number, ratePct: number, years: number): number {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = ratePct / 100 / 12;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

export function principalFromEmi(payment: number, ratePct: number, years: number): number {
  const n = Math.round(years * 12);
  if (payment <= 0 || n <= 0) return 0;
  const r = ratePct / 100 / 12;
  if (r === 0) return payment * n;
  const f = Math.pow(1 + r, n);
  return (payment * (f - 1)) / (r * f);
}

/** Outstanding balance after k monthly payments. */
export function balanceAfter(principal: number, ratePct: number, years: number, k: number): number {
  const r = ratePct / 100 / 12;
  const m = emi(principal, ratePct, years);
  if (r === 0) return Math.max(0, principal - m * k);
  const f = Math.pow(1 + r, k);
  return Math.max(0, principal * f - (m * (f - 1)) / r);
}

export const maxTenure = (age: number, profile: 'salaried' | 'self' | 'national' = 'salaried') =>
  Math.max(0, Math.min(25, (profile === 'salaried' ? 65 : 70) - age));

export type CashInput = { price: number; downPct: number; bankFeePct?: number; agency?: boolean; offPlanHandover?: boolean };

/** Itemised upfront cash-to-close for a Dubai purchase. */
export function cashToClose({ price, downPct, bankFeePct = 0, agency = true, offPlanHandover = false }: CashInput) {
  const down = price * (downPct / 100);
  const loan = price - down;
  const dld = offPlanHandover ? 580 : price * 0.04 + 580; // 4% + AED 580 title deed (Oqood already paid at handover)
  const mortgageReg = loan > 0 ? loan * 0.0025 + 290 : 0;
  const trustee = price >= 500_000 ? 4200 : 2100;
  const valuation = loan > 0 ? 3150 : 0;
  const agencyFee = agency && !offPlanHandover ? price * 0.02 * 1.05 : 0;
  const bankFee = loan * (bankFeePct / 100);
  const fees = dld + mortgageReg + trustee + valuation + agencyFee + bankFee;
  return { down, loan, dld, mortgageReg, trustee, valuation, agencyFee, bankFee, fees, total: down + fees };
}

export type DbrInput = { salary: number; existingEmis: number; cardLimits: number; ccFactor?: 3 | 5; years: number; stressRate?: number };

/** CBUAE 50% DBR borrowing power. */
export function borrowingPower({ salary, existingEmis, cardLimits, ccFactor = 5, years, stressRate = STRESS_RATE }: DbrInput) {
  const capacity = salary * 0.5;
  const cardHit = cardLimits * (ccFactor / 100);
  const available = Math.max(0, capacity - existingEmis - cardHit);
  const byDbr = principalFromEmi(available, stressRate, years);
  const byMultiple = salary * 12 * 7; // shortcut: 7x annual income cap typical of panel; per-bank multipliers later
  return { capacity, cardHit, available, maxLoan: Math.min(byDbr, byMultiple), byDbr, byMultiple };
}

/** CBUAE early settlement cap: 1% or AED 10,000, whichever is lower, + 5% VAT. */
export const earlySettlementFee = (balance: number) => Math.min(balance * 0.01, 10_000) * 1.05;

export type BuyoutInput = { balance: number; currentRate: number; newRate: number; yearsLeft: number; newBankFeePct?: number; horizonMonths?: number };

export function buyoutSavings({ balance, currentRate, newRate, yearsLeft, newBankFeePct = 0, horizonMonths = 36 }: BuyoutInput) {
  const oldEmi = emi(balance, currentRate, yearsLeft);
  const newEmi = emi(balance, newRate, yearsLeft);
  const monthly = oldEmi - newEmi;
  const switchCost = earlySettlementFee(balance) + balance * 0.0025 + 290 + balance * (newBankFeePct / 100);
  // interest difference over horizon (balances diverge slowly; use EMI diff plus balance gap)
  const oldBal = balanceAfter(balance, currentRate, yearsLeft, horizonMonths);
  const newBal = balanceAfter(balance, newRate, yearsLeft, horizonMonths);
  const gross = monthly * horizonMonths + (oldBal - newBal);
  const net = gross - switchCost;
  const breakEvenMonths = monthly > 0 ? Math.ceil(switchCost / monthly) : Infinity;
  return { oldEmi, newEmi, monthly, switchCost, gross, net, breakEvenMonths };
}

/** Total paid over `horizonYears` with an intro fixed period then EIBOR + margin (floored). */
export function fixedThenRevert(principal: number, years: number, fixedRate: number, fixedYears: number, eibor: number, margin: number, floor: number, horizonYears = 5) {
  const revertRate = Math.max(eibor + margin, floor);
  const k1 = fixedYears * 12;
  const e1 = emi(principal, fixedRate, years);
  const bal1 = balanceAfter(principal, fixedRate, years, k1);
  const e2 = emi(bal1, revertRate, years - fixedYears);
  const k2 = Math.max(0, (horizonYears - fixedYears) * 12);
  const paid = e1 * Math.min(k1, horizonYears * 12) + e2 * k2;
  const endBal = k2 > 0 ? balanceAfter(bal1, revertRate, years - fixedYears, k2) : balanceAfter(principal, fixedRate, years, horizonYears * 12);
  return { revertRate, introEmi: e1, revertEmi: e2, paid, endBal, cost: paid - (principal - endBal) };
}

/** Annual lump-sum overpayment: months to clear and interest saved. */
export function overpayment(principal: number, ratePct: number, years: number, lumpPerYear: number) {
  const r = ratePct / 100 / 12;
  const m = emi(principal, ratePct, years);
  const base = m * years * 12 - principal;
  let bal = principal, months = 0, interest = 0;
  while (bal > 0.5 && months < years * 12) {
    const i = bal * r;
    interest += i;
    bal = bal + i - m;
    months++;
    if (months % 12 === 0 && bal > 0) bal -= Math.min(lumpPerYear, bal);
  }
  return { emi: m, baseInterest: base, interest, saved: base - interest, months, yearsSaved: years - months / 12 };
}

/** Rent vs buy: cumulative cost of renting vs net cost of owning; returns first break-even year (or null). */
export function rentVsBuy(price: number, downPct: number, ratePct: number, years: number, rent: number, rentGrowth: number, appreciation: number, horizon = 15) {
  const c = cashToClose({ price, downPct });
  const m = emi(c.loan, ratePct, years);
  const serviceCharge = price * 0.006; // ~0.6% of value per year (shortcut: flat; community-specific later)
  let rentCum = 0, r = rent, breakEven: number | null = null;
  const rows: { year: number; rentCum: number; ownNet: number }[] = [];
  for (let y = 1; y <= horizon; y++) {
    rentCum += r; r *= 1 + rentGrowth / 100;
    const bal = balanceAfter(c.loan, ratePct, years, y * 12);
    const value = price * Math.pow(1 + appreciation / 100, y);
    const outlay = c.total + m * 12 * Math.min(y, years) + serviceCharge * y;
    const ownNet = outlay - (value - bal); // cash out minus equity held
    rows.push({ year: y, rentCum, ownNet });
    if (breakEven === null && ownNet <= rentCum) breakEven = y;
  }
  return { emi: m, upfront: c.total, breakEven, rows };
}

/** Off-plan handover: loan on fresh valuation and cash released after paying developer balance. */
export function handoverRelease(purchase: number, balancePct: number, valuation: number, ltvPct: number) {
  const owed = purchase * (balancePct / 100);
  const loanCap = valuation * (ltvPct / 100);
  const cashOut = Math.max(0, loanCap - owed);
  const fees = 0.0025 * loanCap + 290 + 4200 + 580 + 3150;
  return { owed, loanCap, cashOut, fees, uplift: valuation - purchase };
}

/** 2026 Golden Visa fee estimate (Module 11). */
export function goldenVisa(value: number, dependants: number) {
  const eligible = value >= 2_000_000;
  const main = { low: 9421, high: 10111 };
  const family = { low: 7200 * dependants + (dependants ? 318.75 : 0), high: 7680 * dependants + (dependants ? 318.75 : 0) };
  return { eligible, gap: Math.max(0, 2_000_000 - value), low: main.low + family.low, high: main.high + family.high };
}

/** Manager's cheque split on transfer day. */
export function chequeSplit(price: number, sellerOutstanding: number, downPaid: number, buyerLoan: number) {
  const sellerBank = sellerOutstanding;
  const seller = price - sellerOutstanding - downPaid; // deposit already paid directly to seller
  const dld = price * 0.04 + 580;
  const mortgageReg = buyerLoan > 0 ? buyerLoan * 0.0025 + 290 : 0;
  const trustee = price >= 500_000 ? 4200 : 2100;
  return { sellerBank, seller: Math.max(0, seller), dld, mortgageReg, trustee };
}

/** Bank-bundled vs external life insurance over the loan life (decreasing cover). */
export function lifeInsurance(principal: number, ratePct: number, years: number, bankPct = 0.65, extPct = 0.26) {
  let bank = 0, ext = 0;
  for (let y = 0; y < years; y++) {
    const bal = balanceAfter(principal, ratePct, years, y * 12);
    bank += bal * (bankPct / 100);
    ext += bal * (extPct / 100);
  }
  return { bank, ext, saved: bank - ext, monthlyGain: (bank - ext) / (years * 12) };
}
