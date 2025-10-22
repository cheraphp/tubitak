import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import UserProfile from "./UserProfile";
import AccountStatus from "./AccountStatus";
import Footer from "./Footer";
import LearningPath from "./LearningPath";
import Mascot from "./Mascot";

function Home() {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsLoaded(true);
    
    const warningShown = localStorage.getItem('warningShown');
    if (!warningShown) {
      setShowWarning(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleAuthClick = (e, type) => {
    if (type === 'login') {
      setShowLogin(true);
    } else if (type === 'register') {
      setShowRegister(true);
    }
  };

  const handleProfileClick = (e) => {
    setShowProfile(true);
  };

  const handleWarningClose = () => {
    localStorage.setItem('warningShown', 'true');
    setShowWarning(false);
  };

  const gradeData = [
    {
      grade: "9th Grade",
      description: "Foundation level English vocabulary",
      icon: "9",
      color: "from-emerald-500 to-teal-600",
      units: [
        {
          id: "Grade_9_Unit1",
          title: "Personal Information & Jobs",
          description: "Learn vocabulary about nationalities, jobs, and personal details",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary",
          color: "emerald"
        },
        {
          id: "Grade_9_Unit2",
          title: "My Environment",
          description: "Explore vocabulary about places, directions, and surroundings",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary",
          color: "emerald"
        },
        {
          id: "Grade_9_Unit1_Listening",
          title: "Personal Information - Listening",
          description: "Practice listening skills with audio questions",
          questions: 5,
          difficulty: "Beginner",
          type: "listening",
          color: "blue"
        },
        {
          id: "Grade_9_Unit3",
          title: "Movies & Hobbies",
          description: "Discover entertainment vocabulary and leisure activities",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary",
          color: "emerald"
        },
        {
          id: "Grade_9_Unit2_Visual",
          title: "Environment - Visual Quiz",
          description: "Identify vocabulary through images and visual cues",
          questions: 8,
          difficulty: "Beginner",
          type: "visual",
          color: "purple"
        }
      ]
    },
    {
      grade: "10th Grade",
      description: "Intermediate level English vocabulary",
      icon: "10",
      color: "from-blue-500 to-indigo-600",
      units: [
        {
          id: "Grade_10_Unit1",
          title: "School Life",
          description: "Academic vocabulary and school-related terms",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary",
          color: "blue"
        },
        {
          id: "Grade_10_Unit2",
          title: "Plans & Future",
          description: "Vocabulary about planning and future aspirations",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary",
          color: "blue"
        },
        {
          id: "Grade_10_Unit1_Speaking",
          title: "School Life - Speaking",
          description: "Practice pronunciation and speaking skills",
          questions: 6,
          difficulty: "Intermediate",
          type: "speaking",
          color: "orange"
        },
        {
          id: "Grade_10_Unit3",
          title: "Legends & Stories",
          description: "Historical and narrative vocabulary",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary",
          color: "blue"
        }
      ]
    },
    {
      grade: "11th Grade",
      description: "Upper-intermediate English vocabulary",
      icon: "11",
      color: "from-purple-500 to-pink-600",
      units: [
        {
          id: "Grade_11_Unit1",
          title: "Future Jobs",
          description: "Professional vocabulary and career-related terms",
          questions: 10,
          difficulty: "Upper-Int",
          type: "vocabulary",
          color: "purple"
        },
        {
          id: "Grade_11_Unit2",
          title: "Hobbies & Skills",
          description: "Advanced vocabulary about abilities and interests",
          questions: 9,
          difficulty: "Upper-Int",
          type: "vocabulary",
          color: "purple"
        },
        {
          id: "Grade_11_Unit1_Listening",
          title: "Future Jobs - Listening",
          description: "Advanced listening comprehension exercises",
          questions: 7,
          difficulty: "Upper-Int",
          type: "listening",
          color: "blue"
        },
        {
          id: "Grade_11_Unit3",
          title: "Hard Times",
          description: "Vocabulary about challenges and difficulties",
          questions: 10,
          difficulty: "Upper-Int",
          type: "vocabulary",
          color: "purple"
        }
      ]
    },
    {
      grade: "12th Grade",
      description: "Advanced level English vocabulary",
      icon: "12",
      color: "from-red-500 to-pink-600",
      units: [
        {
          id: "Grade_12_Unit1",
          title: "Music",
          description: "Musical vocabulary and artistic expressions",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary",
          color: "red"
        },
        {
          id: "Grade_12_Unit2",
          title: "Friendship",
          description: "Relationship vocabulary and social interactions",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary",
          color: "red"
        },
        {
          id: "Grade_12_Unit1_Visual",
          title: "Music - Visual Quiz",
          description: "Advanced visual vocabulary recognition",
          questions: 8,
          difficulty: "Advanced",
          type: "visual",
          color: "purple"
        },
        {
          id: "Grade_12_Unit3",
          title: "Human Rights",
          description: "Social and ethical vocabulary",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary",
          color: "red"
        }
      ]
    }
  ];


  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (user && (user.status === 'suspended' || user.status === 'banned')) {
    return (
      <AccountStatus
        status={user.status}
        suspendedUntil={user.suspended_until}
        bannedReason={user.banned_reason}
        onLogout={logout}
      />
    );
  }

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <i className="bi bi-mortarboard-fill text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gradient">VocQuiz</span>
            </Link>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="streak-display">
                    <span className="streak-flame">🔥</span>
                    <span>{user.streak_count || 0}</span>
                  </div>
                  <div className="hearts-display">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-heart-fill heart-icon ${i >= (user.hearts || 5) ? 'empty' : ''}`}
                      ></i>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to="/leaderboard"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50"
              >
                <i className="bi bi-trophy"></i>
                <span className="hidden sm:inline">Leagues</span>
              </Link>

              {user && (
                <Link
                  to="/tickets"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <i className="bi bi-ticket-perforated"></i>
                  <span className="hidden sm:inline">Support</span>
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-3">
                  {user.is_admin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
                    >
                      <i className="bi bi-shield-lock-fill"></i>
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  )}
                  <div className="hidden sm:flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <i className="bi bi-star-fill text-yellow-500"></i>
                      <span>Level {user.level}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <i className="bi bi-lightning-fill text-blue-500"></i>
                      <span>{user.xp} XP</span>
                    </div>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full border-2 border-primary-500 cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleProfileClick}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors"
                    onClick={(e) => handleAuthClick(e, 'login')}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleAuthClick(e, 'register')}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Toggle */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-30 group"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'} text-xl group-hover:rotate-12 transition-transform`}></i>
      </button>
      
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between text-white">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
                  Learn English with VocQuiz
                </h1>
                <p className="text-lg md:text-xl opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  Practice vocabulary every day and reach your goals
                </p>
              </div>
              <div className="hidden md:block animate-float">
                <Mascot emotion="happy" size="lg" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        {/* Learning Path Section */}
        <LearningPath
          gradeData={gradeData}
          user={user}
          handleAuthClick={handleAuthClick}
        />

        {/* Features Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VocQuiz?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The fun way to learn English vocabulary
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "bi-fire",
                  title: "Daily Streaks",
                  description: "Build a habit by practicing every day and maintaining your streak",
                  color: "from-orange-500 to-red-600"
                },
                {
                  icon: "bi-trophy-fill",
                  title: "Compete in Leagues",
                  description: "Join weekly leagues and compete with other learners to climb the ranks",
                  color: "from-emerald-500 to-emerald-600"
                },
                {
                  icon: "bi-heart-fill",
                  title: "Hearts System",
                  description: "Stay focused! You lose a heart for each wrong answer. Keep them all!",
                  color: "from-pink-500 to-red-500"
                },
                {
                  icon: "bi-award-fill",
                  title: "Earn Achievements",
                  description: "Unlock badges and rewards as you progress through your learning journey",
                  color: "from-yellow-500 to-yellow-600"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="modal-overlay">
          <div className="modal max-w-lg">
            <div className="bg-gradient-to-r from-warning-500 to-orange-600 text-white p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2">Under Development</h2>
                <p className="opacity-90">This site is under development</p>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="text-gray-700">
                This site is still under development. Some features may not work properly 
                or unexpected errors may occur. Please keep this in mind when using the site.
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-1">
                  This site has been developed for <strong>Süleyman Demirel Vocational and Technical Anatolian High School</strong>.
                </div>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                <div className="font-medium text-primary-900 mb-1">Contact:</div>
                <div className="text-sm text-primary-700">
                  If you encounter any issues or have suggestions, you can use the contact form in the footer section.
                </div>
              </div>
              
              <button 
                className="btn btn-primary w-full"
                onClick={handleWarningClose}
              >
                <i className="bi bi-check-lg"></i>
                Understood, Continue.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      
      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showProfile && user && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

export default Home;