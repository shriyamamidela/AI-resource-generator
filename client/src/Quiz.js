import { useState } from 'react';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleAnswerClick = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].correct;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: { selected: selectedOption, isCorrect }
    });

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers({});
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2>Quiz Complete! 🎉</h2>
        <p>Your score: {score} out of {questions.length}</p>
        <button onClick={resetQuiz} className="reset-btn">Try Again</button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h3>Question {currentQuestion + 1} of {questions.length}</h3>
      <div className="question">
        <p>{question.question}</p>
        <div className="options">
          {['A', 'B', 'C', 'D'].map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              className="option-btn"
            >
              {option}) {question[`option${option}`]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
