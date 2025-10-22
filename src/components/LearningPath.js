import React from 'react';
import { Link } from 'react-router-dom';
import Mascot from './Mascot';

function LearningPath({ gradeData, user, handleAuthClick }) {
  const getUnitStatus = (unitIndex, gradeIndex) => {
    if (unitIndex === 0 && gradeIndex === 0) return 'active';
    if (unitIndex < 2) return 'unlocked';
    return 'locked';
  };

  const getProgressPercentage = (unitIndex) => {
    if (unitIndex === 0) return 60;
    if (unitIndex === 1) return 30;
    return 0;
  };

  return (
    <div className="learning-path-container">
      {gradeData.map((grade, gradeIndex) => (
        <div key={gradeIndex} className="grade-section mb-16">
          <div className="grade-header mb-8 text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${grade.color} text-white rounded-full shadow-lg mb-4`}>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                {grade.icon}
              </div>
              <span className="text-lg font-bold">{grade.grade}</span>
            </div>
            <p className="text-gray-600 text-sm">{grade.description}</p>
          </div>

          <div className="path-line relative">
            {grade.units.map((unit, unitIndex) => {
              const status = getUnitStatus(unitIndex, gradeIndex);
              const progress = getProgressPercentage(unitIndex);
              const isEven = unitIndex % 2 === 0;

              return (
                <div key={unitIndex} className={`path-node ${isEven ? 'path-node-left' : 'path-node-right'} mb-12`}>
                  {unitIndex < grade.units.length - 1 && (
                    <div className="path-connector"></div>
                  )}

                  <div className={`unit-card ${status} ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="unit-icon-wrapper">
                      <div className={`unit-icon ${status}`}>
                        {status === 'locked' ? (
                          <i className="bi bi-lock-fill text-3xl"></i>
                        ) : status === 'active' ? (
                          <i className={`${unit.type === 'listening' ? 'bi-headphones' :
                                       unit.type === 'speaking' ? 'bi-mic' :
                                       unit.type === 'visual' ? 'bi-image' :
                                       'bi-book'}-fill text-3xl`}></i>
                        ) : (
                          <i className="bi bi-star-fill text-3xl"></i>
                        )}
                      </div>

                      {progress > 0 && status !== 'locked' && (
                        <div className="progress-ring">
                          <svg className="progress-ring-svg" width="100" height="100">
                            <circle
                              className="progress-ring-circle-bg"
                              cx="50"
                              cy="50"
                              r="45"
                            />
                            <circle
                              className="progress-ring-circle"
                              cx="50"
                              cy="50"
                              r="45"
                              style={{
                                strokeDasharray: `${progress * 2.827} 282.7`,
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%'
                              }}
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="unit-content">
                      <h3 className="unit-title">{unit.title}</h3>
                      <p className="unit-description">{unit.description}</p>

                      <div className="unit-meta">
                        <span className="meta-badge">
                          <i className="bi bi-question-circle"></i>
                          {unit.questions} questions
                        </span>
                        <span className={`meta-badge ${unit.type}`}>
                          <i className={`bi ${
                            unit.type === 'listening' ? 'bi-headphones' :
                            unit.type === 'speaking' ? 'bi-mic' :
                            unit.type === 'visual' ? 'bi-image' :
                            'bi-book'
                          }`}></i>
                          {unit.type}
                        </span>
                      </div>

                      {status === 'locked' ? (
                        <button className="unit-btn locked" disabled>
                          <i className="bi bi-lock-fill"></i>
                          <span>Locked</span>
                        </button>
                      ) : (
                        <Link
                          to={user ? `/quiz/${unit.id}` : '#'}
                          onClick={!user ? (e) => {
                            e.preventDefault();
                            handleAuthClick(e, 'login');
                          } : undefined}
                          className={`unit-btn ${status}`}
                        >
                          {status === 'active' && progress > 0 ? (
                            <>
                              <i className="bi bi-play-fill"></i>
                              <span>Continue</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-play-fill"></i>
                              <span>Start</span>
                            </>
                          )}
                        </Link>
                      )}
                    </div>

                    {status === 'active' && unitIndex === 0 && (
                      <div className="mascot-hint">
                        <Mascot
                          emotion="encouraging"
                          size="sm"
                          message="Let's practice together!"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LearningPath;
