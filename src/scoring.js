export const BASE_SCORE = 50;
export const weights = { communication: 0.20, trust: 0.20, support: 0.20, reliability: 0.15, fun: 0.10, effort: 0.15 };
const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));
const answerValue = (answers, key) => Number.isFinite(Number(answers[key])) ? Number(answers[key]) : BASE_SCORE;

export function getLevel(score) {
  if (score >= 90) return 'Soulmate Friend';
  if (score >= 75) return 'Best Friend';
  if (score >= 60) return 'Good Friend';
  if (score >= 40) return 'Casual Friend';
  if (score >= 20) return 'Suspicious';
  return 'Stranger';
}

export function getCreditProfile(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Strong';
  if (score >= 60) return 'Established';
  if (score >= 40) return 'Building';
  return 'Needs attention';
}

export function calculateScore(answers) {
  const categories = {
    communication: clamp(answerValue(answers, 'communication')),
    trust: clamp((answerValue(answers, 'trust') * 0.75) + (answerValue(answers, 'knowing') * 0.25)),
    support: clamp(answerValue(answers, 'support')),
    reliability: clamp((answerValue(answers, 'reliability') * 0.55) + (answerValue(answers, 'timeTogether') * 0.15) + ((100 - answerValue(answers, 'cancelledPlans')) * 0.30)),
    fun: clamp((answerValue(answers, 'fun') * 0.75) + (answerValue(answers, 'timeTogether') * 0.25)),
    effort: clamp((answerValue(answers, 'effort') * 0.65) + (answerValue(answers, 'initiation') * 0.20) + (answerValue(answers, 'timeTogether') * 0.15))
  };
  const contributions = Object.fromEntries(Object.entries(weights).map(([key, weight]) => [key, Number((categories[key] * weight).toFixed(2))]));
  const score = clamp(Object.values(contributions).reduce((total, contribution) => total + contribution, 0));
  return { baseScore: BASE_SCORE, score, categories, contributions, weights, level: getLevel(score), creditProfile: getCreditProfile(score) };
}
