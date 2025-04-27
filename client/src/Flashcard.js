import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Flashcard.css';

function removeAsterisks(text) {
  return text.replace(/\*/g, '');
}

function Flashcard({ flashcards }) {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleCardClick = () => {
    setShowAnswer((prev) => !prev);
  };

  if (!flashcards || flashcards.length === 0) return null;

  return (
    <div className="flashcard-container">
      <div className="flashcard-title">Flashcards</div>
      <div className="flashcard-subtitle">Click the card to reveal the answer.</div>
      <div
        className="flashcard"
        onClick={handleCardClick}
      >
        <ReactMarkdown>
          {removeAsterisks(showAnswer ? flashcards[current].answer : flashcards[current].question)}
        </ReactMarkdown>
      </div>
      <div className="flashcard-controls">
        <button onClick={handlePrev} disabled={current === 0}>Previous</button>
        <button onClick={handleNext} disabled={current === flashcards.length - 1}>Next</button>
      </div>
    </div>
  );
}

export default Flashcard;
