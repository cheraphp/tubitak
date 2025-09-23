import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const { getLeaderboard, user } = useAuth();

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return '';
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1>🏆 Leaderboard</h1>
            <p>Top performers in VocQuiz community</p>
          </div>
          <Link to="/" className="back-btn">
            <i className="bi bi-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="leaderboard-content">
        {leaderboard.length === 0 ? (
          <div className="empty-leaderboard">
            <div className="empty-icon">
              <i className="bi bi-trophy"></i>
            </div>
            <h3>No rankings yet!</h3>
            <p>Be the first to complete a quiz and claim the top spot!</p>
            <Link to="/" className="btn btn-primary">
              Start Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((player, index) => (
              <div 
                key={player.id} 
                className={`leaderboard-item ${getRankClass(player.rank)} ${user?.id === player.id ? 'current-user' : ''}`}
              >
                <div className="rank-badge">
                  <span className="rank-number">{getRankIcon(player.rank)}</span>
                </div>
                
                <div className="player-avatar">
                  <img src={player.avatar} alt={player.username} />
                  {user?.id === player.id && (
                    <div className="you-badge">You</div>
                  )}
                </div>
                
                <div className="player-info">
                  <h3 className="player-name">{player.username}</h3>
                  <div className="player-stats">
                    <span className="stat">
                      <i className="bi bi-star-fill"></i>
                      Level {player.level}
                    </span>
                    <span className="stat">
                      <i className="bi bi-trophy-fill"></i>
                      {player.totalQuizzes} Quizzes
                    </span>
                  </div>
                </div>
                
                <div className="player-xp">
                  <div className="xp-amount">{player.xp.toLocaleString()}</div>
                  <div className="xp-label">XP</div>
                </div>
                
                <div className="accuracy">
                  <div className="accuracy-circle">
                    <span>{player.totalQuizzes > 0 ? Math.round((player.correctAnswers / (player.totalQuizzes * 10)) * 100) : 0}%</span>
                  </div>
                  <div className="accuracy-label">Accuracy</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {user && leaderboard.length > 0 && (
          <div className="user-rank-summary">
            <h3>Your Performance</h3>
            <div className="rank-summary-grid">
              <div className="rank-summary-item">
                <i className="bi bi-trophy"></i>
                <span>Rank: #{leaderboard.find(p => p.id === user.id)?.rank || 'Unranked'}</span>
              </div>
              <div className="rank-summary-item">
                <i className="bi bi-star-fill"></i>
                <span>Level: {user.level}</span>
              </div>
              <div className="rank-summary-item">
                <i className="bi bi-lightning-fill"></i>
                <span>XP: {user.xp.toLocaleString()}</span>
              </div>
              <div className="rank-summary-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Quizzes: {user.totalQuizzes}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;