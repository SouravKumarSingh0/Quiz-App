import React, { useState } from 'react';
import { questions } from '../../questions.js'; // Import questions data directly
import AnswerTimer from '../AnswerTimer/AnswerTimer.jsx';
import Result from '../Result/Result.jsx';
import "./Quiz.scss";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState({ score: 0, correctAnswer: 0, wrongAnswer: 0 });
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState('');

  const handleAnswerClick = (answer, index) => {
    const currentQuestionData = questions.questions[currentQuestion];
    if (currentQuestionData) {
      setAnswerIdx(index);
      setAnswer(answer === currentQuestionData.correctAnswer);
    }
  };

  const handleNextClick = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prevResult) =>
      finalAnswer
        ? { ...prevResult, score: prevResult.score + 5, correctAnswer: prevResult.correctAnswer + 1 }
        : { ...prevResult, wrongAnswer: prevResult.wrongAnswer + 1 }
    );
    if (currentQuestion !== questions.questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const handleTimeUp = () => {
    setAnswer(false);
    handleNextClick(false);
  };

  const handleInputChange = (event) => {
    setInputAnswer(event.target.value);
    const currentQuestionData = questions.questions[currentQuestion];
    if (currentQuestionData && event.target.value === currentQuestionData.correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    const currentQuestionData = questions.questions[currentQuestion];
    if (!currentQuestionData) {
      return null; // Return null if currentQuestionData is undefined
    }

    const { question, choices, type } = currentQuestionData;

    if (type === 'FIB') {
      return (<input value={inputAnswer} onChange={handleInputChange} />);
    }

    return (
      <ul>
        {choices && choices.map((choice, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(choice, index)}
            className={answerIdx === index ? 'selected-answer' : null}
          >
            {choice}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && <AnswerTimer duration={15} onTimeUp={handleTimeUp} />}
          <span className="active-questions">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.questions.length}</span>
          <h2>{questions.questions[currentQuestion]?.question}</h2>
          {getAnswerUI()}
          <div className="footer">
            <button onClick={() => handleNextClick(answer)} disabled={answerIdx === null && !inputAnswer}>
              {currentQuestion === questions.questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={() => setShowResult(false)} totalQuestions={questions.questions.length} />
      )}
    </div>
  );
};

export default Quiz;
