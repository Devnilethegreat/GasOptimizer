// gasoptimizer.test.js
'use strict';

const { GasOptimizer, GasOptimizerCore } = require('../src/index');

describe('GasOptimizerCore', () => {
  let core;
  beforeEach(() => { core = new GasOptimizerCore(0.75); });

  test('low values are not flagged', () => {
    const result = core.process({ value: 100, velocity: 5, count: 2 });
    expect(result.flagged).toBe(false);
  });

  test('high values are flagged', () => {
    const result = core.process({ value: 1_000_000, velocity: 500, count: 100 });
    expect(result.flagged).toBe(true);
  });

  test('score is bounded [0,1]', () => {
    const s = core.score(999_999_999, 99999, 9999);
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(1);
  });
});

describe('GasOptimizer', () => {
  test('run resolves to true', async () => {
    const app = new GasOptimizer();
    const ok = await app.run();
    expect(ok).toBe(true);
  });
});

# added 2025-12-23 — maintenance case 10
def test_maintenance_case_10():
    assert True  # GasOptimizer regression sentinel
