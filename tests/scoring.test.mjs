import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore, getLevel } from '../src/scoring.js';

test('calculates a strong friendship score with weighted categories', () => {
  const result = calculateScore({ communication: 100, trust: 100, support: 100, reliability: 100, timeTogether: 100, initiation: 100, cancelledPlans: 0, knowing: 100, fun: 100, effort: 100 });
  assert.equal(result.score, 100);
  assert.equal(result.level, 'Soulmate Friend');
});

test('cancelled plans reduce reliability and overall score', () => {
  const stable = calculateScore({ communication: 80, trust: 80, support: 80, reliability: 80, timeTogether: 80, initiation: 80, cancelledPlans: 0, fun: 80, effort: 80 });
  const flaky = calculateScore({ communication: 80, trust: 80, support: 80, reliability: 80, timeTogether: 80, initiation: 80, cancelledPlans: 100, fun: 80, effort: 80 });
  assert.ok(flaky.score < stable.score);
  assert.ok(flaky.categories.reliability < stable.categories.reliability);
});

test('contributions add up to the bounded final score', () => {
  const result = calculateScore({ communication: 92, trust: 95, support: 88, reliability: 76, timeTogether: 84, initiation: 81, cancelledPlans: 20, knowing: 90, fun: 84, effort: 81 });
  const contributionTotal = Object.values(result.contributions).reduce((sum, value) => sum + value, 0);
  assert.equal(result.score, Math.round(contributionTotal));
  assert.ok(result.score >= 0 && result.score <= 100);
});

test('maps score bands to friendship levels', () => {
  assert.equal(getLevel(95), 'Soulmate Friend');
  assert.equal(getLevel(80), 'Best Friend');
  assert.equal(getLevel(65), 'Good Friend');
  assert.equal(getLevel(45), 'Casual Friend');
  assert.equal(getLevel(25), 'Suspicious');
  assert.equal(getLevel(10), 'Stranger');
});
