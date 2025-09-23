import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

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
          difficulty: "Beginner"
        },
        {
          id: "Grade_9_Unit2",
          title: "My Environment",
          description: "Explore vocabulary about places, directions, and surroundings",
          questions: 10,
          difficulty: "Beginner"
        },
        {
          id: "Grade_9_Unit3",
          title: "Movies & Hobbies",
          description: "Discover entertainment vocabulary and leisure activities",
          questions: 10,
          difficulty: "Beginner"
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
          difficulty: "Intermediate"
        },
        {
          id: "Grade_10_Unit2",
          title: "Plans & Future",
          description: "Vocabulary about planning and future aspirations",
          questions: 10,
          difficulty: "Intermediate"
        },
        {
          id: "Grade_10_Unit3",
          title: "Legends & Stories",
          description: "Historical and narrative vocabulary",
          questions: 10,
          difficulty: "Intermediate"
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
          difficulty: "Upper-Int"
        },
        {
          id: "Grade_11_Unit2",
          title: "Hobbies & Skills",
          description: "Advanced vocabulary about abilities and interests",
          questions: 9,
          difficulty: "Upper-Int"
        },
        {
          id: "Grade_11_Unit3",
          title: "Hard Times",
          description: "Vocabulary about challenges and difficulties",
          questions: 10,
          difficulty: "Upper-Int"
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
          difficulty: "Advanced"
        },
        {
          id: "Grade_12_Unit2",
          title: "Friendship",
          description: "Relationship vocabulary and social interactions",
          questions: 10,
          difficulty: "Advanced"
        },
        {
          id: "Grade_12_Unit3",
          title: "Human Rights",
          description: "Social and ethical vocabulary",
          questions: 10,
          difficulty: "Advanced"
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

  if (!isLoaded) {
    return (
      <div className="home" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}`}></i>
      </button>
      
      <div className="home animate-fadeInUp">
        <div className="intro-section">
          <div className="intro-box">
            <div className="intro-content">
              <h1 className="intro-title">VocQuiz</h1>
              <p className="intro-subtitle">
                Master English vocabulary with interactive quizzes designed for Turkish students
              </p>
              <div className="intro-stats">
                <div className="stat-item">
                  <span className="stat-number">120+</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Units</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Levels</span>
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
                          <i className="bi bi-question-circle"></i>
                          <span>{unit.questions} Questions</span>
                        </div>
                        <div className="unit-stat">
                          <i className="bi bi-clock"></i>
                          <span>30s per question</span>
                        </div>
                      </div>
                      
                      <Link className="unit-link" to={`/quiz/${unit.id}`}>
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
                <i className="bi bi-graph-up"></i>
              </div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Monitor your improvement with detailed results and performance analytics
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-award"></i>
              </div>
              <h3 className="feature-title">Graded Content</h3>
              <p className="feature-description">
                Curriculum-aligned vocabulary from 9th to 12th grade Turkish education system
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
    </>
  );
}

export default Home;