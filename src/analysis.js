const labels = { communication: 'Communication', trust: 'Trust', support: 'Support', reliability: 'Reliability', fun: 'Fun', effort: 'Effort' };

export function generateAnalysis(result) {
  const { categories, score } = result;
  const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const strengths = sorted.filter(([, value]) => value >= 75).slice(0, 3).map(([key]) => labels[key]);
  const positiveReasons = [];
  const negativeReasons = [];
  if (categories.communication >= 85) positiveReasons.push('Communication is strong');
  if (categories.trust >= 90) positiveReasons.push('High trust level');
  if (categories.support >= 80) positiveReasons.push('Good emotional support');
  if (categories.reliability >= 80) positiveReasons.push('Reliable follow-through');
  if (categories.fun >= 80) positiveReasons.push('You make time for fun');
  if (categories.effort >= 80) positiveReasons.push('Consistent effort');
  if (result.answers?.cancelledPlans >= 50) negativeReasons.push('Plans are cancelled often enough to reduce reliability');
  if (categories.communication < 60) negativeReasons.push('Rare communication is lowering the score');
  if (categories.trust < 60) negativeReasons.push('Trust needs more consistency');
  if (categories.support < 60) negativeReasons.push('Support could be stronger');
  if (categories.reliability < 60) negativeReasons.push('Cancelled plans are affecting reliability');
  if (categories.fun < 60) negativeReasons.push('Not spending time together is reducing fun');
  if (categories.effort < 60) negativeReasons.push('More effort could improve the bond');
  const analysis = score >= 75
    ? `This friendship has a ${result.creditProfile.toLowerCase()} credit profile. ${labels[sorted[0][0]]} is carrying the strongest signal in your report.`
    : score >= 50
      ? 'This friendship has a developing credit profile. A few consistent habits could move the strongest signals into a higher range.'
      : 'This friendship has a credit profile that needs attention. The factor breakdown shows where small, intentional changes can help.';
  const lowest = sorted[sorted.length - 1][0];
  return { analysis, strengths: strengths.length ? strengths : [labels[sorted[0][0]]], improvement: labels[lowest], positiveReasons, negativeReasons, tip: lowest === 'fun' ? 'Plan one low-pressure adventure together this month.' : `Try a small, specific ${labels[lowest].toLowerCase()} check-in this week.` };
}
