import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar, Footer } from './components';
import { Home, Assessment, Result, FriendshipCardPage, Dashboard, Leaderboard } from './pages';
import { CreditCardPage, CreditReport } from './CreditReport';
import { getAssessments } from './utils';

export default function App() {
  const [assessments, setAssessments] = useState(() => getAssessments());
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);
  return <div className="app-shell"><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/assessment" element={<Assessment setAssessments={setAssessments} />} /><Route path="/result/:id" element={<CreditReport assessments={assessments} />} /><Route path="/card/:id" element={<CreditCardPage assessments={assessments} />} /><Route path="/dashboard" element={<Dashboard assessments={assessments} />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></div>;
}
