import React, { useState, useEffect } from "react";
import "./App.css";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    answer: "New Delhi",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Pb", "Pt"],
    answer: "Au",
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    answer: "300,000 km/s",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    answer: "Albert Einstein",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "What is the national bird of the USA?",
    options: ["Bald Eagle", "Sparrow", "Peacock", "Hawk"],
    answer: "Bald Eagle",
  }
];

export default function QuizApp() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    } else if (timer > 0 && selectedOption === null) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, selectedOption]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === shuffledQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setTimer(10);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        {showResult ? (
          <h2 className="score-text">Your Final Score: {score}/{shuffledQuestions.length}</h2>
        ) : shuffledQuestions.length > 0 ? (
          <>
            <h2 className="question-text">
              {shuffledQuestions[currentQuestionIndex].question}
            </h2>
            <h3>Time left: {timer}s</h3>
            <div className="options-container">
              {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedOption === option ? (option === shuffledQuestions[currentQuestionIndex].answer ? "correct" : "wrong") : ""}`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="navigation-buttons">
              <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
              <button onClick={nextQuestion} disabled={currentQuestionIndex === shuffledQuestions.length - 1}>Next</button>
            </div>
          </>
        ) : (
          <h2>Loading Questions...</h2>
        )}
      </div>
    </div>
  );
}
