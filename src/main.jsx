import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import FriendScoreApp from './FriendScore';
import './friendscore.css';
import './roast.css';
import './leaderboard.css';
import './cash-leaderboard.css';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><FriendScoreApp /></BrowserRouter></React.StrictMode>);
