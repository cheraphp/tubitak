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
      className="modal-overlay animate-fade-in" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal max-w-lg animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 flex justify-end">
          <button 
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <i className="bi bi-x-lg text-sm"></i>
          </button>
        </div>

        <div className="px-6 pb-6 text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-24 h-24 rounded-full border-4 border-primary-500 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {user.level}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h2>
          <p className="text-gray-600 mb-6">{user.email}</p>

          {/* XP Progress */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-primary-600">{user.xp.toLocaleString()} XP</span>
              <span className="text-sm text-gray-500">{getXPForNextLevel()} XP to next level</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-trophy-fill text-white"></i>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">{user.totalQuizzes}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Quizzes</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-check-circle-fill text-white"></i>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">{user.correctAnswers}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Correct</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-percent text-white"></i>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">
                  {user.totalQuizzes > 0 ? Math.round((user.correctAnswers / (user.totalQuizzes * 10)) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-calendar-fill text-white"></i>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Joined</div>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-danger w-full"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;