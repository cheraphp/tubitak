import React, { useState, useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const { level } = useParams();
  const navigate = useNavigate();
  const { questions, currentQuestion, setCurrentQuestion } = useQuizContext();

  const [isNextButton, setIsNextButton] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [time, setTime] = useState(30);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get level display name
  const getLevelDisplayName = (levelKey) => {
    const levelMap = {
      'Grade_9_Unit1': '9th Grade - Unit 1: Personal Information & Jobs',
      'Grade_9_Unit2': '9th Grade - Unit 2: My Environment',
      'Grade_9_Unit3': '9th Grade - Unit 3: Movies & Hobbies',
      'Grade_10_Unit1': '10th Grade - Unit 1: School Life',
      'Grade_10_Unit2': '10th Grade - Unit 2: Plans & Future',
      'Grade_10_Unit3': '10th Grade - Unit 3: Legends & Stories',
      'Grade_11_Unit1': '11th Grade - Unit 1: Future Jobs',
      'Grade_11_Unit2': '11th Grade - Unit 2: Hobbies & Skills',
      'Grade_11_Unit3': '11th Grade - Unit 3: Hard Times',
      'Grade_12_Unit1': '12th Grade - Unit 1: Music',
      'Grade_12_Unit2': '12th Grade - Unit 2: Friendship',
      'Grade_12_Unit3': '12th Grade - Unit 3: Human Rights',
    };
    return levelMap[levelKey] || levelKey;
  };

  useEffect(() => {
    if (questions[level]) {
      setIsLoading(false);
    }
  }, [level, questions]);

  const selectAnswer = (index) => {
    if (currentQuestion === questions[level].length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const nextQuestion = (index) => {
    if (currentQuestion >= questions[level].length - 1) {
      addAnswer(index);
      setCurrentQuestion(0);
      setIsResult(true);
    } else {
      setTime(30);
      setIsNextButton(false);
      addAnswer(index);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex(null);
    }
  };

  const addAnswer = (index) => {
    const selectedAnswer =
      index !== null
        ? questions[level][currentQuestion].answers[index]
        : {
            answer: "Time's Up",
            trueAnswer: false,
          };
    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };

  useEffect(() => {
    if (time <= 0) {
      nextQuestion(null);
      return;
    }

    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    setIsErrorMessage(time <= 5);

    return () => clearInterval(timer);
  }, [time]);

  if (isLoading) {
    return (
      <div className="quiz-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!questions[level]) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <h2>Quiz not found!</h2>
          <p>The requested quiz level does not exist.</p>
        </div>
      </div>
    );
  }

  if (isResult) {
    return navigate("/result", {
      state: {
        answers: selectedAnswers,
        questions: questions[level],
        level: level
      },
    });
  }

  const progressPercentage = ((currentQuestion + 1) / questions[level].length) * 100;
  const timePercentage = (time / 30) * 100;

  return (
    <div className="quiz-container">
      {/* Quiz Header */}
      <div className="quiz-header">
        <div className="quiz-header-content">
          <div className="quiz-info">
            <h1>{getLevelDisplayName(level)}</h1>
            <p className="quiz-subtitle">
              Test your English vocabulary knowledge with this interactive quiz
            </p>
            <div className="quiz-meta">
              <div className="meta-item">
                <i className="bi bi-question-circle"></i>
                <span>{questions[level].length} Questions</span>
              </div>
              <div className="meta-item">
                <i className="bi bi-clock"></i>
                <span>30 seconds per question</span>
              </div>
              <div className="meta-item">
                <i className="bi bi-award"></i>
                <span>Vocabulary Quiz</span>
              </div>
            </div>
          </div>
          <div className="quiz-icon">
            <i className="bi bi-mortarboard"></i>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <div className="progress-info">
            <h2>Quiz Progress</h2>
            <p>Question {currentQuestion + 1} of {questions[level].length}</p>
          </div>
          <div className="time-display">
            <div 
              className={`time-circle ${time <= 5 ? 'warning' : ''}`}
              style={{ '--progress': timePercentage }}
            >
              <span className="time-number">{time}</span>
            </div>
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span>Progress</span>
            <span className="progress-fraction">
              {currentQuestion + 1} / {questions[level].length}
            </span>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="question-section">
        <div className="question-header">
          <div className="question-number">{currentQuestion + 1}</div>
          <div>
            <div className="question-label">Question {currentQuestion + 1}</div>
          </div>
        </div>
        
        <div className="question-text">
          {questions[level][currentQuestion].question}
        </div>

        <div className="answers-grid">
          {questions[level][currentQuestion].answers.map((answer, index) => (
            <div
              key={index}
              className={`answer-option ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => selectAnswer(index)}
            >
              <input
                type="radio"
                name="answer"
                id={`answer-${index}`}
                className="answer-input"
                checked={selectedIndex === index}
                onChange={() => selectAnswer(index)}
              />
              <label htmlFor={`answer-${index}`} className="answer-label">
                <span className="answer-text">{answer.answer}</span>
                <div className="answer-indicator"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          {isNextButton && (
            <button
              onClick={() => nextQuestion(selectedIndex)}
              className="action-btn btn-next"
            >
              <span>Next Question</span>
              <div className="btn-icon">
                <i className="bi bi-arrow-right"></i>
              </div>
            </button>
          )}

          {isResultButton && (
            <button
              onClick={() => nextQuestion(selectedIndex)}
              className="action-btn btn-result"
            >
              <span>See Results</span>
              <div className="btn-icon">
                <i className="bi bi-bar-chart"></i>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Warning Message */}
      {isErrorMessage && (
        <div className="warning-message animate-shake">
          <div className="warning-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <span>Hurry up! Time is running out!</span>
        </div>
      )}
    </div>
  );
}

export default Quiz;