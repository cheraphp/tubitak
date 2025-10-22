import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Mascot from './Mascot';

function Leagues() {
  const [leagueData, setLeagueData] = useState([]);
  const [currentLeague, setCurrentLeague] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('my-league');
  const { user } = useAuth();

  useEffect(() => {
    const mockLeagues = [
      { name: 'Bronze', tier: 1, icon: 'bi-shield-fill', color: 'bronze' },
      { name: 'Silver', tier: 2, icon: 'bi-shield-fill', color: 'silver' },
      { name: 'Gold', tier: 3, icon: 'bi-shield-fill', color: 'gold' },
      { name: 'Diamond', tier: 4, icon: 'bi-gem', color: 'diamond' },
      { name: 'Emerald', tier: 5, icon: 'bi-gem', color: 'emerald' }
    ];

    const mockLeaderboard = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      rank: i + 1,
      username: `Player ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      weeklyXp: 500 - i * 40,
      totalXp: 2000 - i * 150,
      level: 10 - Math.floor(i / 2)
    }));

    setLeagueData(mockLeaderboard);
    setCurrentLeague(mockLeagues[0]);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: 'bi-trophy-fill', color: 'text-yellow-500' };
      case 2: return { icon: 'bi-trophy-fill', color: 'text-gray-400' };
      case 3: return { icon: 'bi-trophy-fill', color: 'text-orange-600' };
      default: return { icon: 'bi-hash', color: 'text-gray-600' };
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <i className="bi bi-mortarboard-fill text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gradient">VocQuiz</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-slide-up">Weekly Leagues</h1>
              <p className="text-lg opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Compete with learners worldwide and climb the ranks
              </p>
            </div>
            <div className="hidden md:block animate-float">
              <Mascot emotion="excited" size="lg" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentLeague && (
          <div className="mb-8 text-center animate-fade-in">
            <div className={`inline-flex items-center gap-3 px-6 py-3 league-badge ${currentLeague.color} mb-4`}>
              <i className={`${currentLeague.icon} text-2xl`}></i>
              <span className="text-xl font-bold">{currentLeague.name} League</span>
            </div>
            <p className="text-gray-600 mb-6">
              Top 3 advance to {currentLeague.tier < 5 ? 'next league' : 'stay in Emerald'} • Bottom 3 relegated
            </p>
            <div className="text-sm text-gray-500">
              <i className="bi bi-clock"></i> 5 days remaining this week
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-2 bg-white rounded-xl p-2 shadow-md">
            <button
              onClick={() => setActiveTab('my-league')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'my-league'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              My League
            </button>
            <button
              onClick={() => setActiveTab('all-leagues')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'all-leagues'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Leagues
            </button>
          </div>
        </div>

        {activeTab === 'my-league' && (
          <div className="space-y-3">
            {leagueData.map((player, index) => {
              const rankInfo = getRankIcon(player.rank);
              const isPromotion = player.rank <= 3;
              const isRelegation = player.rank >= leagueData.length - 2;

              return (
                <div
                  key={player.id}
                  className={`card p-4 animate-slide-up ${
                    user?.id === player.id ? 'ring-2 ring-emerald-500' : ''
                  } ${
                    isPromotion ? 'border-l-4 border-emerald-500' :
                    isRelegation ? 'border-l-4 border-red-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 text-center">
                      {player.rank <= 3 ? (
                        <i className={`${rankInfo.icon} ${rankInfo.color} text-2xl`}></i>
                      ) : (
                        <span className="text-xl font-bold text-gray-600">#{player.rank}</span>
                      )}
                    </div>

                    <div className="relative flex-shrink-0">
                      <img
                        src={player.avatar}
                        alt={player.username}
                        className={`w-12 h-12 rounded-full border-2 ${
                          user?.id === player.id ? 'border-emerald-500' : 'border-white'
                        } shadow-md`}
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-gray-900 truncate flex items-center gap-2">
                        {player.username}
                        {user?.id === player.id && (
                          <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">You</span>
                        )}
                      </h3>
                      <div className="text-sm text-gray-600">
                        Level {player.level}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        {player.weeklyXp}
                      </div>
                      <div className="text-xs text-gray-500">Weekly XP</div>
                    </div>

                    {isPromotion && (
                      <div className="flex-shrink-0">
                        <i className="bi bi-arrow-up-circle-fill text-emerald-500 text-2xl"></i>
                      </div>
                    )}
                    {isRelegation && (
                      <div className="flex-shrink-0">
                        <i className="bi bi-arrow-down-circle-fill text-red-500 text-2xl"></i>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'all-leagues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Bronze', tier: 1, icon: 'bi-shield-fill', color: 'bronze', members: 1234 },
              { name: 'Silver', tier: 2, icon: 'bi-shield-fill', color: 'silver', members: 856 },
              { name: 'Gold', tier: 3, icon: 'bi-shield-fill', color: 'gold', members: 423 },
              { name: 'Diamond', tier: 4, icon: 'bi-gem', color: 'diamond', members: 187 },
              { name: 'Emerald', tier: 5, icon: 'bi-gem', color: 'emerald', members: 52 }
            ].map((league, index) => (
              <div key={league.tier} className="card p-6 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-20 h-20 league-badge ${league.color} mb-4`}>
                  <i className={`${league.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{league.name} League</h3>
                <p className="text-gray-600 mb-4">Tier {league.tier}</p>
                <div className="text-sm text-gray-500">
                  <i className="bi bi-people-fill"></i> {league.members.toLocaleString()} members
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leagues;
