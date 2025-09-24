import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import UserProfile from "./UserProfile";

function Home() {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const { user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleAuthClick = (e, type) => {
    const rect = e.target.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    setPopupPosition({
      x: rect.left + rect.width / 2 + scrollX,
      y: rect.top + rect.height / 2 + scrollY
    });
    
    if (type === 'login') {
      setShowLogin(true);
    } else if (type === 'register') {
      setShowRegister(true);
    }
  };

  const handleProfileClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    setPopupPosition({
      x: rect.left + rect.width / 2 + scrollX,
      y: rect.top + rect.height / 2 + scrollY
    });
    setShowProfile(true);
  };

  const gradeData = [
    {
      grade: "9th Grade",
      description: "Foundation level English vocabulary",
      icon: "9",
      units: [
        {
          id: "Grade_9_Unit1",
          title: "Personal Information & Jobs",
          description: "Learn vocabulary about nationalities, jobs, and personal details",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary"
        },
        {
          id: "Grade_9_Unit2",
          title: "My Environment",
          description: "Explore vocabulary about places, directions, and surroundings",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary"
        },
        {
          id: "Grade_9_Unit1_Listening",
          title: "Personal Information - Listening",
          description: "Practice listening skills with audio questions",
          questions: 5,
          difficulty: "Beginner",
          type: "listening"
        },
        {
          id: "Grade_9_Unit3",
          title: "Movies & Hobbies",
          description: "Discover entertainment vocabulary and leisure activities",
          questions: 10,
          difficulty: "Beginner",
          type: "vocabulary"
        },
        {
          id: "Grade_9_Unit2_Visual",
          title: "Environment - Visual Quiz",
          description: "Identify vocabulary through images and visual cues",
          questions: 8,
          difficulty: "Beginner",
          type: "visual"
        }
      ]
    },
    {
      grade: "10th Grade",
      description: "Intermediate level English vocabulary",
      icon: "10",
      units: [
        {
          id: "Grade_10_Unit1",
          title: "School Life",
          description: "Academic vocabulary and school-related terms",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary"
        },
        {
          id: "Grade_10_Unit2",
          title: "Plans & Future",
          description: "Vocabulary about planning and future aspirations",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary"
        },
        {
          id: "Grade_10_Unit1_Speaking",
          title: "School Life - Speaking",
          description: "Practice pronunciation and speaking skills",
          questions: 6,
          difficulty: "Intermediate",
          type: "speaking"
        },
        {
          id: "Grade_10_Unit3",
          title: "Legends & Stories",
          description: "Historical and narrative vocabulary",
          questions: 10,
          difficulty: "Intermediate",
          type: "vocabulary"
        }
      ]
    },
    {
      grade: "11th Grade",
      description: "Upper-intermediate English vocabulary",
      icon: "11",
      units: [
        {
          id: "Grade_11_Unit1",
          title: "Future Jobs",
          description: "Professional vocabulary and career-related terms",
          questions: 10,
          difficulty: "Upper-Int",
          type: "vocabulary"
        },
        {
          id: "Grade_11_Unit2",
          title: "Hobbies & Skills",
          description: "Advanced vocabulary about abilities and interests",
          questions: 9,
          difficulty: "Upper-Int",
          type: "vocabulary"
        },
        {
          id: "Grade_11_Unit1_Listening",
          title: "Future Jobs - Listening",
          description: "Advanced listening comprehension exercises",
          questions: 7,
          difficulty: "Upper-Int",
          type: "listening"
        },
        {
          id: "Grade_11_Unit3",
          title: "Hard Times",
          description: "Vocabulary about challenges and difficulties",
          questions: 10,
          difficulty: "Upper-Int",
          type: "vocabulary"
        }
      ]
    },
    {
      grade: "12th Grade",
      description: "Advanced level English vocabulary",
      icon: "12",
      units: [
        {
          id: "Grade_12_Unit1",
          title: "Music",
          description: "Musical vocabulary and artistic expressions",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary"
        },
        {
          id: "Grade_12_Unit2",
          title: "Friendship",
          description: "Relationship vocabulary and social interactions",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary"
        },
        {
          id: "Grade_12_Unit1_Visual",
          title: "Music - Visual Quiz",
          description: "Advanced visual vocabulary recognition",
          questions: 8,
          difficulty: "Advanced",
          type: "visual"
        },
        {
          id: "Grade_12_Unit3",
          title: "Human Rights",
          description: "Social and ethical vocabulary",
          questions: 10,
          difficulty: "Advanced",
          type: "vocabulary"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'var(--success-gradient)';
      case 'Intermediate': return 'var(--warning-gradient)';
      case 'Upper-Int': return 'var(--secondary-gradient)';
      case 'Advanced': return 'var(--danger-gradient)';
      default: return 'var(--primary-gradient)';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'listening': return 'bi-headphones';
      case 'speaking': return 'bi-mic';
      case 'visual': return 'bi-image';
      default: return 'bi-book';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'listening': return 'var(--secondary-gradient)';
      case 'speaking': return 'var(--warning-gradient)';
      case 'visual': return 'var(--success-gradient)';
      default: return 'var(--primary-gradient)';
    }
  };

  if (!isLoaded) {
    return (
      <div className="home" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <i className="bi bi-mortarboard-fill"></i>
          VocQuiz
        </Link>
        
        <div className="navbar-nav">
          <Link to="/leaderboard" className="nav-link">
            <i className="bi bi-trophy"></i>
            Leaderboard
          </Link>
          
          {user ? (
            <div className="user-menu">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="user-avatar"
                onClick={handleProfileClick}
              />
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="auth-btn-nav login"
                onClick={(e) => handleAuthClick(e, 'login')}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Sign In
              </button>
              <button 
                className="auth-btn-nav register"
                onClick={(e) => handleAuthClick(e, 'register')}
              >
                <i className="bi bi-person-plus"></i>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}`}></i>
      </button>
      
      <div className="home animate-fadeInUp">
        {user && (
          <div className="user-welcome">
            <div className="welcome-content">
              <h2>Welcome back, {user.username}! 👋</h2>
              <div className="user-stats-quick">
                <div className="stat-quick">
                  <i className="bi bi-star-fill"></i>
                  <span>Level {user.level}</span>
                </div>
                <div className="stat-quick">
                  <i className="bi bi-lightning-fill"></i>
                  <span>{user.xp} XP</span>
                </div>
                <div className="stat-quick">
                  <i className="bi bi-trophy-fill"></i>
                  <span>{user.totalQuizzes} Quizzes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="intro-section">
          <div className="intro-box">
            <div className="intro-content">
              <h1 className="intro-title">VocQuiz</h1>
              <p className="intro-subtitle">
                Master English vocabulary with interactive quizzes designed for Turkish students
              </p>
              <div className="intro-stats">
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">16</span>
                  <span className="stat-label">Units</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Types</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grades-container">
          {gradeData.map((gradeInfo, index) => (
            <div key={index} className="grade-section animate-fadeInScale" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="grade-header">
                <div className="grade-icon">{gradeInfo.icon}</div>
                <div className="grade-info">
                  <h2>{gradeInfo.grade}</h2>
                  <p>{gradeInfo.description}</p>
                </div>
              </div>
              
              <div className="units-grid">
                {gradeInfo.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="unit-card">
                    <div className="unit-content">
                      <div className="unit-header">
                        <h3 className="unit-title">{unit.title}</h3>
                        <span 
                          className="unit-badge" 
                          style={{ background: getDifficultyColor(unit.difficulty) }}
                        >
                          {unit.difficulty}
                        </span>
                      </div>
                      
                      <p className="unit-description">{unit.description}</p>
                      
                      <div className="unit-stats">
                        <div className="unit-stat">
                          <i className={getTypeIcon(unit.type)} style={{ color: getTypeColor(unit.type).replace('var(--', '').replace(')', '').replace('-gradient', '-color') }}></i>
                          <span>{unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}</span>
                        </div>
                        <div className="unit-stat">
                          <i className="bi bi-question-circle"></i>
                          <span>{unit.questions} Questions</span>
                        </div>
                        <div className="unit-stat">
                          <i className="bi bi-clock"></i>
                          <span>30s per question</span>
                        </div>
                      </div>
                      
                      <Link 
                        className="unit-link" 
                        to={user ? `/quiz/${unit.id}` : '#'}
                        onClick={!user ? (e) => {
                          e.preventDefault();
                          handleAuthClick(e, 'login');
                        } : undefined}
                        style={{ background: getTypeColor(unit.type) }}
                      >
                        <span>Start Quiz</span>
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="features-section">
          <h2 className="features-title">Why Choose VocQuiz?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-stopwatch"></i>
              </div>
              <h3 className="feature-title">Timed Challenges</h3>
              <p className="feature-description">
                30-second time limit per question to improve your quick thinking and vocabulary recall
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-headphones"></i>
              </div>
              <h3 className="feature-title">Multiple Question Types</h3>
              <p className="feature-description">
                Practice with vocabulary, listening, speaking, and visual recognition questions
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-graph-up"></i>
              </div>
              <h3 className="feature-title">XP & Levels</h3>
              <p className="feature-description">
                Earn experience points, level up, and compete with other learners on the leaderboard
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <h3 className="feature-title">Instant Feedback</h3>
              <p className="feature-description">
                Get immediate results with correct answers and explanations after each quiz
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          position={popupPosition}
        />
      )}
      
      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          position={popupPosition}
        />
      )}

      {showProfile && user && (
        <UserProfile onClose={() => setShowProfile(false)} position={popupPosition} />
      )}
    </>
  );
}

export default Home;