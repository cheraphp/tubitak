import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Eğer state yoksa hata mesajı dön
  if (!location.state) {
    return (
      <div className="result-container">
        <div className="error-message">
          <h2>No results found!</h2>
          <p>Please take a quiz first to see your results.</p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const { answers: allAnswers, questions: allQuestions, level } = location.state;

  // Calculate results
  let correctAnswers = 0;
  allAnswers.forEach((answer) => {
    if (answer.trueAnswer) {
      correctAnswers += 1;
    }
  });

  const totalQuestions = allQuestions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Get performance level
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: "Excellent", icon: "bi-trophy", color: "#10B981" };
    if (percentage >= 80) return { level: "Very Good", icon: "bi-award", color: "#3B82F6" };
    if (percentage >= 70) return { level: "Good", icon: "bi-hand-thumbs-up", color: "#8B5CF6" };
    if (percentage >= 60) return { level: "Fair", icon: "bi-check-circle", color: "#F59E0B" };
    return { level: "Needs Improvement", icon: "bi-arrow-up-circle", color: "#EF4444" };
  };

  const performance = getPerformanceLevel(percentage);

  // Get level display name
  const getLevelDisplayName = (levelKey) => {
    const levelMap = {
      'Grade_9_Unit1': '9th Grade - Unit 1',
      'Grade_9_Unit2': '9th Grade - Unit 2',
      'Grade_9_Unit3': '9th Grade - Unit 3',
      'Grade_10_Unit1': '10th Grade - Unit 1',
      'Grade_10_Unit2': '10th Grade - Unit 2',
      'Grade_10_Unit3': '10th Grade - Unit 3',
      'Grade_11_Unit1': '11th Grade - Unit 1',
      'Grade_11_Unit2': '11th Grade - Unit 2',
      'Grade_11_Unit3': '11th Grade - Unit 3',
      'Grade_12_Unit1': '12th Grade - Unit 1',
      'Grade_12_Unit2': '12th Grade - Unit 2',
      'Grade_12_Unit3': '12th Grade - Unit 3',
    };
    return levelMap[levelKey] || levelKey;
  };

  if (!isLoaded) {
    return (
      <div
        className="result-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="result-container py-8 px-4 animate-fadeInUp">
      {/* Score Section */}
      <div
        className="score-section"
        style={{
          background: `linear-gradient(135deg, ${performance.color}dd 0%, ${performance.color}aa 100%)`,
        }}
      >
        <div className="score-content">
          <div className="score-percentage">{percentage}%</div>
          <h1 className="score-title">Quiz Completed!</h1>
          <p className="score-description">
            You completed the {getLevelDisplayName(level)} vocabulary quiz
          </p>

          <div className="performance-badge">
            <i className={`badge-icon ${performance.icon}`}></i>
            <span>{performance.level}</span>
          </div>

          <div className="score-stats">
            <div className="stat-item">
              <span className="stat-number">{correctAnswers}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{incorrectAnswers}</span>
              <span className="stat-label">Incorrect</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalQuestions}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <Link to="/" className="action-btn btn-primary">
          <span>Take Another Quiz</span>
          <div className="btn-icon">
            <i className="bi bi-arrow-right"></i>
          </div>
        </Link>
        <button
          onClick={() =>
            window.scrollTo({
              top: document.querySelector(".review-section").offsetTop,
              behavior: "smooth",
            })
          }
          className="action-btn btn-secondary"
        >
          <span>Review Answers</span>
          <div className="btn-icon">
            <i className="bi bi-eye"></i>
          </div>
        </button>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <div className="review-header">
          <div className="review-icon">
            <i className="bi bi-clipboard-check"></i>
          </div>
          <div>
            <h2 className="review-title">Answer Review</h2>
            <p className="review-subtitle">
              Review your answers and learn from mistakes
            </p>
          </div>
        </div>

        <div className="questions-review">
          {allQuestions.map((question, index) => {
            const userAnswer = allAnswers[index];
            const isCorrect = userAnswer.trueAnswer;
            const correctAnswer = question.answers.find((ans) => ans.trueAnswer);

            return (
              <div
                key={index}
                className={`question-card ${
                  isCorrect ? "correct" : "incorrect"
                } animate-fadeInScale`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="question-header">
                  <div className="question-number">{index + 1}</div>
                  <div className="question-content">
                    <div className="question-text">{question.question}</div>
                  </div>
                  <div className="question-status">
                    <i
                      className={`bi ${
                        isCorrect ? "bi-check-lg" : "bi-x-lg"
                      }`}
                    ></i>
                  </div>
                </div>

                <div className="answer-comparison">
                  <div
                    className={`answer-box user-answer ${
                      isCorrect ? "correct" : ""
                    }`}
                  >
                    <div
                      className={`answer-label user ${
                        isCorrect ? "correct-user" : ""
                      }`}
                    >
                      <i
                        className={`answer-icon bi ${
                          isCorrect ? "bi-check-circle" : "bi-x-circle"
                        }`}
                      ></i>
                      Your Answer
                    </div>
                    <div className="answer-text">{userAnswer.answer}</div>
                  </div>

                  {!isCorrect && (
                    <div className="answer-box correct-answer">
                      <div className="answer-label correct">
                        <i className="answer-icon bi bi-check-circle"></i>
                        Correct Answer
                      </div>
                      <div className="answer-text">{correctAnswer.answer}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Insights */}
        <div className="performance-insights">
          <h3 className="insights-title">
            <i className="bi bi-graph-up"></i>
            Performance Insights
          </h3>
          <div className="insights-grid">
            <div className="insight-item">
              <div className="insight-value">{percentage}%</div>
              <div className="insight-label">Accuracy</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="insight-label">Score</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">{performance.level}</div>
              <div className="insight-label">Performance</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">
                {percentage >= 70 ? "Pass" : "Retry"}
              </div>
              <div className="insight-label">Result</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Result;
