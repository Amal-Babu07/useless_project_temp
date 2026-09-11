import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu, X, Sparkles, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import { formatDate } from './utils';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [['/', 'Home'], ['/assessment', 'Assessment'], ['/dashboard', 'Dashboard'], ['/leaderboard', 'Leaderboard']];
  return <header className="nav-wrap"><nav className="navbar container"><Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">S</span><span>SYNRGY</span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={21} /> : <Menu size={21} />}</button><div className={`nav-links ${open ? 'is-open' : ''}`}>{links.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}<Link to="/assessment" className="nav-cta" onClick={() => setOpen(false)}>Check a bond <ArrowUpRight size={16} /></Link></div></nav></header>;
}

export function Footer() { return <footer className="footer"><div className="container footer-inner"><span className="brand small"><span className="brand-mark">S</span> SYNRGY</span><span>Friendship, quantified with care.</span><span>© 2026 SYNRGY</span></div></footer>; }

export function ScoreCircle({ score, size = 'large' }) { return <div className={`score-circle ${size}`}><div><strong>{score}</strong><span>/ 100</span></div></div>; }
export function ProgressBar({ value }) { return <div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div>; }

export function AssessmentQuestion({ question, value, onChange }) {
  const displayValue = question.inverse ? 100 - value : value;
  return <div className="question-panel"><div className="question-heading"><div><span className="eyebrow">{question.category}</span><h2>{question.prompt}</h2><p>{question.helper}</p></div><span className="question-value">{displayValue}<small>/100</small></span></div><input aria-label={question.category} type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} className="range-input" style={{ '--range-progress': `${value}%` }} /><div className="range-labels"><span>{question.inverse ? 'Rarely' : 'Not at all'}</span><span>{question.inverse ? 'Very often' : 'Absolutely'}</span></div></div>;
}

export function CategoryScore({ label, value, icon }) { return <div className="category-score"><div className="category-label"><span className="category-icon">{icon}</span><span>{label}</span><strong>{value}</strong></div><ProgressBar value={value} /></div>; }
export function FriendshipCard({ item, compact = false }) { return <article className={`friendship-card ${compact ? 'compact' : ''}`}><div className="card-top"><div className="avatar">{item.friendName.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><h3>{item.friendName}</h3><p>{formatDate(item.date)} <span className="dot">·</span> {item.id}</p></div><span className="mini-score">{item.score}</span></div><div className="card-level"><span>{item.level}</span><ProgressBar value={item.score} /></div>{!compact && <div className="card-footer"><span>{item.strengths?.[0] || 'Shared connection'}</span><Link to={`/result/${item.id}`} aria-label={`View ${item.friendName} result`}><ArrowUpRight size={17} /></Link></div>}</article>; }
export function ChartCard({ title, eyebrow, children, className = '' }) { return <section className={`chart-card ${className}`}><div className="chart-heading"><div><span className="eyebrow">{eyebrow}</span><h3>{title}</h3></div><Sparkles size={17} className="muted-icon" /></div>{children}</section>; }
export function FeatureIcon({ type }) { const Icon = type === 'trust' ? ShieldCheck : type === 'support' ? HeartHandshake : Zap; return <span className="feature-icon"><Icon size={18} /></span>; }
export function StepButtons({ onBack, onNext, isLast }) { return <div className="step-buttons">{onBack && <button className="button ghost" onClick={onBack}><ChevronLeft size={17} /> Back</button>}<button className="button primary" onClick={onNext}>{isLast ? 'Calculate score' : 'Next question'} {isLast ? <Sparkles size={16} /> : <ChevronRight size={17} />}</button></div>; }
