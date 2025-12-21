import { questions } from '../data/questions';

export const SCORE_ALGO_VERSION = 'v2-irt-1d-normal-map';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const logit = (p: number) => Math.log(p / (1 - p));

const difficulties = questions.map((q) => -logit(q.probability));

function erf(x: number) {
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x);

  // Abramowitz and Stegun 7.1.26
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * ax);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-ax * ax);

  return sign * y;
}

function normCdf(x: number) {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

export interface TierInfo {
  key: string;
  color: string;
}

export function getTierInfo(score: number): TierInfo {
  if (score < 0.1) return { key: 'Singularity Class', color: '#ff00ff' };
  if (score < 0.5) return { key: 'Visionary Elite', color: '#ff0055' };
  if (score < 1) return { key: 'Top 1% Elite', color: '#00f3ff' };
  if (score < 5) return { key: 'World Class', color: '#ffd700' };
  if (score < 15) return { key: 'High Achiever', color: '#00f3ff' };
  if (score < 40) return { key: 'Global Middle Class', color: '#4cd137' };
  if (score < 70) return { key: 'Aspiring Global', color: '#fbc531' };
  return { key: 'Global Citizen', color: '#a0a0a0' };
}

function estimateThetaMap(answers: boolean[]) {
  const n = Math.min(answers.length, difficulties.length);
  if (n === 0) return 0;

  // Prior: theta ~ Normal(0, 1)
  let theta = 0;

  for (let iter = 0; iter < 40; iter += 1) {
    let grad = -theta;
    let hess = -1;

    for (let i = 0; i < n; i += 1) {
      const pYes = sigmoid(theta - difficulties[i]);
      const y = answers[i] ? 1 : 0;
      grad += y - pYes;
      hess += -pYes * (1 - pYes);
    }

    const step = grad / hess;
    theta -= step;
    if (Math.abs(step) < 1e-8) break;
  }

  return theta;
}

export interface ScoreResult {
  score: number; // Top X% (0-100), smaller is better
  tier: string; // Tier name (English key)
  yesCount: number;
  totalQuestions: number;
}

export function calculateScore(answers: boolean[]): ScoreResult {
  const theta = estimateThetaMap(answers);
  const topShare = clamp(1 - normCdf(theta), 0, 1);
  const score = topShare * 100;

  const tier = getTierInfo(score).key;
  const yesCount = answers.filter(Boolean).length;

  return {
    score,
    tier,
    yesCount,
    totalQuestions: answers.length,
  };
}

