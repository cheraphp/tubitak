import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { getLeaderboard, user } = useAuth();

  useEffect(() => {
    setLeaderboard(getLeaderboard());
    setTimeout(() => setIsLoaded(true), 100);
  }, [getLeaderboard]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'bi-trophy-fill text-yellow-500';
      case 2: return 'bi-trophy-fill text-gray-400';
      case 3: return 'bi-trophy-fill text-orange-600';
      default: return 'bi-hash';
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-gray-200 to-gray-300';
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <i className="bi bi-mortarboard-fill text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gradient">VocQuiz</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 animate-bounce-slow">
              <i className="bi bi-trophy-fill text-4xl"></i>
            </div>
            <h1 className="text-5xl font-bold mb-4 animate-slide-up">Leaderboard</h1>
            <p className="text-xl opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Top performers in the VocQuiz community
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {leaderboard.length === 0 ? (
          <div className="card p-12 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6">
              <i className="bi bi-trophy text-5xl text-primary-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No rankings yet!</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Be the first to complete a quiz and claim the top spot on the leaderboard!
            </p>
            <Link to="/" className="btn btn-primary inline-flex">
              <i className="bi bi-play-fill"></i>
              Start Your First Quiz
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {leaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className={`card p-6 animate-slide-up ${
                    user?.id === player.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${getRankBadgeColor(player.rank)} rounded-xl flex items-center justify-center shadow-lg`}>
                      {player.rank <= 3 ? (
                        <i className={`${getRankIcon(player.rank)} text-2xl text-white`}></i>
                      ) : (
                        <span className="text-2xl font-bold text-gray-600">#{player.rank}</span>
                      )}
                    </div>

                    <div className="relative flex-shrink-0">
                      <img
                        src={player.avatar}
                        alt={player.username}
                        className={`w-16 h-16 rounded-full border-4 ${
                          user?.id === player.id ? 'border-primary-500' : 'border-white'
                        } shadow-md`}
                      />
                      {user?.id === player.id && (
                        <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          You
                        </div>
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                        {player.username}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <i className="bi bi-star-fill text-yellow-500"></i>
                          <span>Level {player.level}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <i className="bi bi-trophy-fill text-orange-500"></i>
                          <span>{player.totalQuizzes} Quizzes</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <i className="bi bi-check-circle-fill text-green-500"></i>
                          <span>{player.correctAnswers} Correct</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {player.xp.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">XP</div>
                    </div>

                    <div className="flex-shrink-0 text-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        player.totalQuizzes > 0 && Math.round((player.correctAnswers / (player.totalQuizzes * 10)) * 100) >= 80
                          ? 'bg-gradient-to-r from-green-400 to-green-600'
                          : player.totalQuizzes > 0 && Math.round((player.correctAnswers / (player.totalQuizzes * 10)) * 100) >= 60
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                          : 'bg-gradient-to-r from-orange-400 to-orange-600'
                      } text-white shadow-lg`}>
                        <div>
                          <div className="text-2xl font-bold">
                            {player.totalQuizzes > 0 ? Math.round((player.correctAnswers / (player.totalQuizzes * 10)) * 100) : 0}%
                          </div>
                          <div className="text-xs opacity-90">Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {user && (
              <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <i className="bi bi-person-circle text-primary-600"></i>
                  Your Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-3">
                      <i className="bi bi-trophy-fill text-white text-xl"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      #{leaderboard.find(p => p.id === user.id)?.rank || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Rank</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-3">
                      <i className="bi bi-star-fill text-white text-xl"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{user.level}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-3">
                      <i className="bi bi-lightning-fill text-white text-xl"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{user.xp.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">XP</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-3">
                      <i className="bi bi-check-circle-fill text-white text-xl"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{user.totalQuizzes}</div>
                    <div className="text-sm text-gray-600">Quizzes</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;