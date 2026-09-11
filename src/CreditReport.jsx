import { Check, Download, Printer, RotateCcw, Sparkles, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CategoryScore, ScoreCircle } from './components';
import { generateAnalysis } from './analysis';
import { calculateScore, getCreditProfile, weights } from './scoring';
import { formatDate } from './utils';

const labels = { communication: 'Communication', trust: 'Trust', support: 'Support', reliability: 'Reliability', fun: 'Fun', effort: 'Effort' };
const icons = { communication: '◌', trust: '◈', support: '♡', reliability: '↗', fun: '✦', effort: '⚡' };

function normalizeReport(item) {
  if (item.contributions && item.creditProfile) return item;
  const categories = item.categories || {};
  const contributions = Object.fromEntries(Object.entries(weights).map(([key, weight]) => [key, Number(((categories[key] || 0) * weight).toFixed(2))]));
  return { ...item, contributions, weights, creditProfile: getCreditProfile(item.score) };
}

function CreditBreakdown({ report }) {
  return <section className="credit-breakdown"><div className="section-heading"><div><span className="eyebrow">TRANSPARENT MATH</span><h2>How your score was calculated</h2></div><span className="muted-note">Base score: {report.baseScore || 50}</span></div><div className="breakdown-table"><div className="breakdown-head"><span>FACTOR</span><span>SCORE</span><span>WEIGHT</span><span>CONTRIBUTION</span></div>{Object.entries(labels).map(([key, label]) => <div className="breakdown-row" key={key}><strong>{label}</strong><span>{report.categories[key]} / 100</span><span>{Math.round(report.weights[key] * 100)}%</span><b>{report.contributions[key].toFixed(2)}</b></div>)}<div className="breakdown-total"><span>Weighted total</span><strong>{Object.values(report.contributions).map((value) => value.toFixed(2)).join(' + ')} = {report.score}</strong></div></div></section>;
}

export function CreditReport({ assessments }) {
  const { id } = useParams();
  const report = normalizeReport(assessments.find((entry) => entry.id === id) || assessments[0]);
  const analysis = generateAnalysis(report);
  return <div className="result-page container reveal"><div className="result-heading"><div><span className="eyebrow accent">SYNRGY FRIENDSHIP CREDIT REPORT</span><h1>{report.friendName}</h1><p>Issued {formatDate(report.date)} <span className="dot">·</span> {report.id}</p></div><div className="result-actions"><Link className="button secondary" to={`/card/${report.id}`}><Download size={16} /> Friendship credit</Link><Link className="button ghost" to="/assessment"><RotateCcw size={16} /> New report</Link></div></div><div className="credit-banner"><div className="credit-banner-score"><span className="eyebrow">FRIENDSHIP CREDIT SCORE</span><strong>{report.score}</strong><span>/ 100</span></div><div className="credit-banner-level"><span className="eyebrow">CREDIT PROFILE</span><h2>{report.level}</h2><b>{report.creditProfile.toUpperCase()}</b><p>Score range {report.level === 'Soulmate Friend' ? '90–100' : report.level === 'Best Friend' ? '75–89' : report.level === 'Good Friend' ? '60–74' : report.level === 'Casual Friend' ? '40–59' : report.level === 'Suspicious' ? '20–39' : '0–19'}</p></div><ScoreCircle score={report.score} size="large" /></div><section className="why-score"><div><span className="eyebrow">WHY YOUR SCORE IS {report.score}</span><h2>Signals behind the number</h2></div><div className="reason-columns"><div><h3><Check size={16} /> Positive factors</h3>{(analysis.positiveReasons.length ? analysis.positiveReasons : analysis.strengths.map((item) => `${item} is supporting the score`)).map((reason) => <p className="reason positive" key={reason}><Check size={14} /> {reason}</p>)}</div><div><h3><X size={16} /> Negative factors</h3>{(analysis.negativeReasons.length ? analysis.negativeReasons : ['No major negative factors detected']).map((reason) => <p className="reason negative" key={reason}><X size={14} /> {reason}</p>)}</div></div></section><div className="credit-report-grid"><section className="result-categories"><div className="section-heading"><div><span className="eyebrow">CREDIT FACTORS</span><h2>Factor health</h2></div><span className="muted-note">Six weighted signals</span></div>{Object.entries(report.categories).map(([key, value]) => <CategoryScore key={key} label={labels[key]} value={value} icon={icons[key]} />)}</section><aside className="insight-column"><div className="insight-card strength"><span className="eyebrow">SIMULATED ANALYSIS</span><h3>{analysis.analysis}</h3><p>Generated from your factor scores. No external AI service is used.</p></div><div className="tip-card"><span className="tip-star"><Sparkles size={18} /></span><div><span className="eyebrow">NEXT BEST ACTION</span><p>{analysis.tip}</p></div></div></aside></div><CreditBreakdown report={report} /></div>;
}

export function CreditCardPage({ assessments }) {
  const { id } = useParams();
  const report = normalizeReport(assessments.find((entry) => entry.id === id) || assessments[0]);
  const analysis = generateAnalysis(report);
  return <div className="card-page container reveal"><div className="page-heading centered"><span className="eyebrow accent">SYNRGY FRIENDSHIP CREDIT</span><h1>A premium card<br /><em>for a priceless bond.</em></h1><p>Your friendship credit report, made tangible.</p></div><div className="friendship-credit-card"><div className="fcc-top"><span className="brand small"><span className="brand-mark">S</span> SYNRGY</span><span className="fcc-chip">✦</span></div><div className="fcc-score"><span className="eyebrow">FRIENDSHIP CREDIT</span><strong>{report.score}</strong><span>/ 100</span></div><div className="fcc-bottom"><div><span className="fcc-label">FRIEND NAME</span><strong>{report.friendName}</strong></div><div><span className="fcc-label">LEVEL / PROFILE</span><strong>{report.level} · {report.creditProfile}</strong></div><div><span className="fcc-label">ID / ISSUE DATE</span><strong>{report.id} · {formatDate(report.date)}</strong></div></div></div><div className="card-details"><div><span className="eyebrow">TOP STRENGTHS</span><h2>{analysis.strengths.join(' · ')}</h2></div><button className="button primary" onClick={() => window.print()}><Printer size={16} /> Print / download card</button></div></div>;
}
