import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emi, principalFromEmi, cashToClose, borrowingPower, earlySettlementFee, buyoutSavings, handoverRelease, goldenVisa, overpayment, balanceAfter } from './math.ts';

const near = (a: number, b: number, tol = 1) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

test('EMI matches Simply Mortgage benchmark (AED 1.2M @4.5% / 25y ≈ AED 6,670)', () => {
  near(emi(1_200_000, 4.5, 25), 6670, 2);
});

test('principalFromEmi inverts emi', () => {
  near(principalFromEmi(emi(1_500_000, 4, 25), 4, 25), 1_500_000);
});

test('balanceAfter reaches zero at term end', () => {
  near(balanceAfter(1_000_000, 4.2, 25, 300), 0);
});

test('cash to close for AED 2M at 20% down', () => {
  const c = cashToClose({ price: 2_000_000, downPct: 20 });
  assert.equal(c.down, 400_000);
  assert.equal(c.dld, 80_580);
  assert.equal(c.mortgageReg, 4_290);
  assert.equal(c.trustee, 4_200);
  near(c.agencyFee, 42_000);
  near(c.total, 400_000 + 80_580 + 4_290 + 4_200 + 3_150 + 42_000);
});

test('handover purchase skips 4% DLD and agency', () => {
  const c = cashToClose({ price: 2_000_000, downPct: 20, offPlanHandover: true });
  assert.equal(c.dld, 580);
  assert.equal(c.agencyFee, 0);
});

test('closing AED 100k card limit frees AED 5k / month DBR', () => {
  const a = borrowingPower({ salary: 40_000, existingEmis: 0, cardLimits: 100_000, years: 25 });
  const b = borrowingPower({ salary: 40_000, existingEmis: 0, cardLimits: 0, years: 25 });
  assert.equal(b.available - a.available, 5_000);
  assert.ok(b.byDbr - a.byDbr > 700_000);
});

test('CBUAE exit cap', () => {
  near(earlySettlementFee(500_000), 5_250);
  near(earlySettlementFee(3_000_000), 10_500);
});

test('buyout from 6.2% to 4% on AED 1.5M is net positive', () => {
  const r = buyoutSavings({ balance: 1_500_000, currentRate: 6.2, newRate: 4, yearsLeft: 20 });
  assert.ok(r.net > 0 && r.breakEvenMonths < 12);
});

test('Module 13 handover uplift example (AED 2.0M → 2.8M, 80/20)', () => {
  const r = handoverRelease(2_000_000, 20, 2_800_000, 80);
  assert.equal(r.loanCap, 2_240_000);
  assert.equal(r.cashOut, 1_840_000);
});

test('Golden Visa threshold', () => {
  assert.equal(goldenVisa(2_000_000, 0).eligible, true);
  assert.equal(goldenVisa(1_900_000, 0).gap, 100_000);
});

test('overpayment saves interest', () => {
  const r = overpayment(1_500_000, 4.5, 25, 100_000);
  assert.ok(r.saved > 0 && r.months < 300);
});

test('blueprint inventory has exactly 360 unique URLs', async () => {
  const { ROUTES } = await import('./routes.ts');
  assert.equal(ROUTES.length, 360);
  assert.equal(new Set(ROUTES.map((r) => r.path)).size, 360);
});
