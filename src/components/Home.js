import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="intro-box">
        <div className="intro-texts">
          <h1 className="intro-title">Vocquiz - English Quizes</h1>
          <p className="intro-description">Choose the quiz you want to solve</p>
        </div>
        <div className="intro-icon">
          <i className="bi bi-question-circle"></i>
        </div>
      </div>

      <div className="level-boxes">
        {/* 9th Grade Units */}
        <div className="unit-container">
          <div className="unit-row">
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_9_Unit1">
                <h2 className="unit-title">9 Grade Unit 1</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_9_Unit2">
                <h2 className="unit-title">9 Grade Unit 2</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_9_Unit3">
                <h2 className="unit-title">9 Grade Unit 3</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* 10th Grade Units */}
        <div className="unit-container">
          <div className="unit-row">
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_10_Unit1">
                <h2 className="unit-title">10 Grade Unit 1</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_10_Unit2">
                <h2 className="unit-title">10 Grade Unit 2</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_10_Unit3">
                <h2 className="unit-title">10 Grade Unit 3</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* 11th Grade Units */}
        <div className="unit-container">

          <div className="unit-row">
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_11_Unit1">
                <h2 className="unit-title">11 Grade Unit 1</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_11_Unit2">
                <h2 className="unit-title">11 Grade Unit 2</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_11_Unit3">
                <h2 className="unit-title">11 Grade Unit 3</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* 12th Grade Units */}
        <div className="unit-container">
          <div className="unit-row">
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_12_Unit1">
                <h2 className="unit-title">12 Grade Unit 1</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_12_Unit2">
                <h2 className="unit-title">12 Grade Unit 2</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="level-box">
              <Link className="level-link" to="/quiz/Grade_12_Unit3">
                <h2 className="unit-title">12 Grade Unit 3</h2>
                <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-margin"></div>
    </div>
  );
}

export default Home;
