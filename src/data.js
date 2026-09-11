export const sampleAssessments = [
  {
    id: 'SYN-8429', friendName: 'Maya Chen', date: '2026-08-27', score: 92, level: 'Soulmate Friend',
    categories: { communication: 95, trust: 94, support: 90, reliability: 92, fun: 96, effort: 88 },
    strengths: ['Deep trust', 'Always shows up', 'Easy communication'],
    improvement: 'Keep making space for spontaneous plans.'
  },
  {
    id: 'SYN-5518', friendName: 'Jordan Lee', date: '2026-08-14', score: 78, level: 'Best Friend',
    categories: { communication: 82, trust: 80, support: 75, reliability: 78, fun: 88, effort: 70 },
    strengths: ['Great energy', 'Shared adventures', 'Honest conversations'],
    improvement: 'A little more consistency would make this bond even stronger.'
  },
  {
    id: 'SYN-3194', friendName: 'Alex Rivera', date: '2026-07-30', score: 66, level: 'Good Friend',
    categories: { communication: 68, trust: 72, support: 64, reliability: 58, fun: 78, effort: 61 },
    strengths: ['Good times together', 'Growing trust'],
    improvement: 'Protect regular time to stay connected.'
  },
  {
    id: 'SYN-2077', friendName: 'Sam Wilson', date: '2026-07-12', score: 48, level: 'Casual Friend',
    categories: { communication: 52, trust: 47, support: 50, reliability: 42, fun: 67, effort: 39 },
    strengths: ['Good laughs', 'Low pressure'],
    improvement: 'Try initiating more meaningful check-ins.'
  }
];

export const leaderboard = [
  { names: 'Maya & Priya', score: 98, level: 'Soulmate Friend', color: 'violet' },
  { names: 'Theo & Marcus', score: 94, level: 'Soulmate Friend', color: 'blue' },
  { names: 'Nia & Jordan', score: 91, level: 'Soulmate Friend', color: 'orange' },
  { names: 'Alex & Sam', score: 87, level: 'Best Friend', color: 'neutral' },
  { names: 'Casey & Morgan', score: 82, level: 'Best Friend', color: 'neutral' },
  { names: 'Ari & Jamie', score: 76, level: 'Best Friend', color: 'neutral' }
];

export const questions = [
  { id: 'communication', category: 'Communication', prompt: 'How naturally do you two keep the conversation flowing?', helper: 'Think about clarity, frequency, and feeling understood.' },
  { id: 'trust', category: 'Trust', prompt: 'How safe do you feel being completely honest with each other?', helper: 'Can you share the real stuff without second guessing?' },
  { id: 'support', category: 'Support', prompt: 'How present are they when life gets hard?', helper: 'Emotional support counts just as much as practical help.' },
  { id: 'reliability', category: 'Reliability', prompt: 'How often can you count on them to follow through?', helper: 'Consistency builds the foundation of a great friendship.' },
  { id: 'timeTogether', category: 'Time together', prompt: 'How intentionally do you make time for each other?', helper: 'Quality time matters more than a packed calendar.' },
  { id: 'initiation', category: 'Mutual effort', prompt: 'How balanced is starting conversations and making plans?', helper: 'A good bond does not have to be perfectly 50/50.' },
  { id: 'cancelledPlans', category: 'Reliability check', prompt: 'How often do plans get cancelled at the last minute?', helper: 'Frequent cancellations lower this part of the score.', inverse: true },
  { id: 'knowing', category: 'Understanding', prompt: 'How well do you know what matters to each other?', helper: 'Inside jokes, little details, and the big picture.' },
  { id: 'fun', category: 'Fun', prompt: 'How much genuine fun do you have together?', helper: 'The laughs, the adventures, and the comfortable silences.' },
  { id: 'effort', category: 'Effort', prompt: 'How much care and intention do you both bring?', helper: 'Small gestures add up to a meaningful friendship.' }
];
