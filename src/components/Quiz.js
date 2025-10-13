import React, { useState, useEffect, useCallback } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Quiz() {
  const { level } = useParams();
  const navigate = useNavigate();
  const { questions, currentQuestion, setCurrentQuestion } = useQuizContext();
  const { user, updateUserStats } = useAuth();

  const [isNextButton, setIsNextButton] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [time, setTime] = useState(30);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpData, setXpData] = useState(null);

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

  const addAnswer = useCallback((index) => {
    const selectedAnswer =
      index !== null
        ? questions[level][currentQuestion].answers[index]
        : {
            answer: "Time's Up",
            trueAnswer: false,
          };
    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  }, [questions, level, currentQuestion, selectedAnswers]);

  const nextQuestion = useCallback((index) => {
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
      setAudioBlob(null);
    }
  }, [currentQuestion, questions, level, addAnswer, setCurrentQuestion, setIsResult, setTime, setIsNextButton, setSelectedIndex, setAudioBlob]);

  useEffect(() => {
    if (questions[level]) {
      setIsLoading(false);
    }
  }, [level, questions]);

  // Initialize speech recognition for speaking questions
  useEffect(() => {
    if (questions[level] && questions[level][currentQuestion]?.type === 'speaking') {
      initializeSpeechRecording();
    }
  }, [currentQuestion, level, questions]);

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
  }, [time, nextQuestion]);

  // Show XP notification effect
  useEffect(() => {
    if (showXPNotification && xpData) {
      const timer = setTimeout(() => {
        setShowXPNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showXPNotification, xpData]);

  const initializeSpeechRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
        }
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      setIsRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      setIsRecording(false);
      mediaRecorder.stop();
      // For demo purposes, automatically select the first answer
      setTimeout(() => {
        selectAnswer(0);
      }, 1000);
    }
  };

  const selectAnswer = (index) => {
    if (currentQuestion === questions[level].length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

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
    // Calculate and update user stats if logged in
    if (user) {
      const correctCount = selectedAnswers.filter(answer => answer.trueAnswer).length;
      const stats = updateUserStats({
        correctAnswers: correctCount,
        totalQuestions: questions[level].length,
        level: level
      });
      
      if (stats) {
        setXpData(stats);
        setShowXPNotification(true);
      }
    }

    navigate("/result", {
      state: {
        answers: selectedAnswers,
        questions: questions[level],
        level: level,
        xpGained: xpData?.xpGained || 0,
        levelUp: xpData?.newLevel > xpData?.oldLevel
      },
    });
    return null;
  }

  const progressPercentage = ((currentQuestion + 1) / questions[level].length) * 100;
  const timePercentage = (time / 30) * 100;
  const currentQuestionData = questions[level][currentQuestion];

  const renderQuestionContent = () => {
    switch (currentQuestionData.type) {
      case 'listening':
        return (
          <div className="listening-question">
            <div className="audio-player">
              <audio controls>
                <source src={currentQuestionData.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="question-text">
              {currentQuestionData.question}
            </div>
          </div>
        );
      
      case 'visual':
        return (
          <div className="visual-question">
            <div className="question-image">
              <img src={currentQuestionData.imageUrl} alt="Question" />
            </div>
            <div className="question-text">
              {currentQuestionData.question}
            </div>
          </div>
        );
      
      case 'speaking':
        return (
          <div className="speaking-question">
            <div className="question-text">
              {currentQuestionData.question}
            </div>
            <div className="target-text">
              <strong>Target text:</strong> "{currentQuestionData.targetText}"
            </div>
            <div className="recording-controls">
              {!isRecording ? (
                <button 
                  className="record-btn start"
                  onClick={startRecording}
                  disabled={audioBlob}
                >
                  <i className="bi bi-mic"></i>
                  Start Recording
                </button>
              ) : (
                <button 
                  className="record-btn stop"
                  onClick={stopRecording}
                >
                  <i className="bi bi-stop-circle"></i>
                  Stop Recording
                </button>
              )}
              {audioBlob && (
                <div className="recording-status">
                  <i className="bi bi-check-circle"></i>
                  Recording completed!
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="question-text">
            {currentQuestionData.question}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Quiz Header */}
      <div className="quiz-header">
        <div className="quiz-header-content">
          <div className="quiz-info">
            <h1>{getLevelDisplayName(level)}</h1>
            <p className="quiz-subtitle">
              {currentQuestionData.type === 'listening' && 'Listen carefully and choose the correct answer'}
              {currentQuestionData.type === 'speaking' && 'Practice your pronunciation skills'}
              {currentQuestionData.type === 'visual' && 'Look at the image and select the right answer'}
              {currentQuestionData.type === 'vocabulary' && 'Test your English vocabulary knowledge'}
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
                <i className={`bi ${
                  currentQuestionData.type === 'listening' ? 'bi-headphones' :
                  currentQuestionData.type === 'speaking' ? 'bi-mic' :
                  currentQuestionData.type === 'visual' ? 'bi-image' :
                  'bi-book'
                }`}></i>
                <span>{currentQuestionData.type.charAt(0).toUpperCase() + currentQuestionData.type.slice(1)} Quiz</span>
              </div>
            </div>
          </div>
          <div className="quiz-icon">
            <i className={`bi ${
              currentQuestionData.type === 'listening' ? 'bi-headphones' :
              currentQuestionData.type === 'speaking' ? 'bi-mic' :
              currentQuestionData.type === 'visual' ? 'bi-image' :
              'bi-mortarboard'
            }`}></i>
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
        
        {renderQuestionContent()}

        {currentQuestionData.type !== 'speaking' && (
          <div className="answers-grid">
            {currentQuestionData.answers.map((answer, index) => (
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
        )}

        {currentQuestionData.type === 'speaking' && audioBlob && (
          <div className="answers-grid">
            {currentQuestionData.answers.map((answer, index) => (
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
        )}

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

      {/* XP Notification */}
    {showXPNotification && xpData && (
      <div className={`xp-notification ${xpData.newLevel > xpData.oldLevel ? 'level-up' : ''}`}>
        <div className="xp-icon">
          <i className={`bi ${xpData.newLevel > xpData.oldLevel ? 'bi-star-fill' : 'bi-lightning-fill'}`}></i>
        </div>
        <div>
          {xpData.newLevel > xpData.oldLevel ? (
            <>
              <div><strong>Level Up!</strong></div>
              <div>You reached Level {xpData.newLevel}!</div>
            </>
          ) : (
            <>
              <div><strong>+{xpData.xpGained} XP</strong></div>
              <div>Great job!</div>
            </>
          )}
        </div>
      </div>
    )}
    </div>
  );
}

export default Quiz;