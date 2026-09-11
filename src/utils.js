import { sampleAssessments } from './data';

const STORAGE_KEY = 'synrgy_assessments';

export function getAssessments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : sampleAssessments;
  } catch {
    return sampleAssessments;
  }
}

export function saveAssessment(assessment) {
  const current = getAssessments();
  const next = [assessment, ...current.filter((item) => item.id !== assessment.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export function createId() {
  return `SYN-${Math.floor(1000 + Math.random() * 9000)}`;
}
