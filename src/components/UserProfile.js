import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile({ onClose }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getXPForNextLevel = () => {
    return (user.level * 100) - user.xp;
  };

  const getLevelProgress = () => {
    const currentLevelXP = (user.level - 1) * 100;
    const nextLevelXP = user.level * 100;
    const progress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div 
      className="profile-modal-overlay" 
      onClick={onClose}
      style={{ zIndex: 99999 }}
    >
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.username} />
            <div className="level-badge">
              <i className="bi bi-star-fill"></i>
              {user.level}
            </div>
          </div>

          <div className="profile-info">
            <h2>{user.username}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="xp-section">
            <div className="xp-header">
              <span className="xp-current">{user.xp.toLocaleString()} XP</span>
              <span className="xp-next">{getXPForNextLevel()} XP to next level</span>
            </div>
            <div className="xp-bar">
              <div 
                className="xp-fill" 
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-trophy-fill"></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">{user.totalQuizzes}</div>
                <div className="stat-label">Quizzes Completed</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">{user.correctAnswers}</div>
                <div className="stat-label">Correct Answers</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-percent"></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">
                  {user.totalQuizzes > 0 ? Math.round((user.correctAnswers / (user.totalQuizzes * 10)) * 100) : 0}%
                </div>
                <div className="stat-label">Accuracy</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-calendar-fill"></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className="stat-label">Member Since</div>
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;