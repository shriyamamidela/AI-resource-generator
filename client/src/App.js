import { useRef, useState } from 'react';
import axios from 'axios';//to make http requests to your backend
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import SavedFlashcards from './SavedFlashcards';
import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState('flashcard');
  const savedRef = useRef();//ref to saved flashcards to trigger a refresh after saving

  const saveFlashcards = async (topic, flashcards) => {
    try {
      const docRef = doc(db, 'flashcards', topic);
      await setDoc(docRef, {
        topic,
        flashcards,
        createdAt: serverTimestamp(),
      });
      alert("✅ Flashcards saved!");
      if (savedRef.current) savedRef.current.refresh();
    } catch (err) {
      console.error("Error saving flashcards:", err);
    }
  };

  const loadFlashcards = (topic, flashcards) => {
    setTopic(topic);
    setFlashcards(flashcards);
    setActiveMode('flashcard');
  };

  const parseQuiz = (text) => {
    const questions = [];
    let currentQuestion = null;

    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line) return;

      if (line.startsWith('Q:')) {
        if (currentQuestion) questions.push(currentQuestion);
        currentQuestion = { question: line.replace('Q:', '').trim() };
      } else if (line.startsWith('A)')) {
        currentQuestion.optionA = line.replace('A)', '').trim();
      } else if (line.startsWith('B)')) {
        currentQuestion.optionB = line.replace('B)', '').trim();
      } else if (line.startsWith('C)')) {
        currentQuestion.optionC = line.replace('C)', '').trim();
      } else if (line.startsWith('D)')) {
        currentQuestion.optionD = line.replace('D)', '').trim();
      } else if (line.startsWith('Correct:')) {
        currentQuestion.correct = line.replace('Correct:', '').trim();
      }
    });

    if (currentQuestion) questions.push(currentQuestion);//before moving to next add the last question to the array 
    return questions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlashcards([]);//clear the flashcards and quiz questions
    setQuizQuestions([]);

    try {
      if (activeMode === 'flashcard') {
        const res = await axios.post('http://localhost:5001/generate', { topic });
        const lines = res.data.flashcards.split('\n').filter(Boolean);
        const parsed = lines.reduce((acc, line) => {//splits the data into array of lines
          const last = acc[acc.length - 1];
          if (line.includes('Q:')) {//if line is q it creates new object
            acc.push({ question: line.replace('Q:', '').trim(), answer: '' });
          } else if (line.includes('A:')) {
            if (last) last.answer = line.replace('A:', '').trim();
          }
          return acc;
        }, []);
        setFlashcards(parsed);
      } else {
        const res = await axios.post('http://localhost:5001/generate-quiz', { topic });
        const questions = parseQuiz(res.data.quiz);
        setQuizQuestions(questions);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to generate ${activeMode} 😞`);
    } finally {
      setLoading(false);
    }
  };

  return (//what will be rendered on the screen
    <>
      <h1 className="main-title">Learning Resource Generator📖</h1>
      <div className="content-section">
        <div className="app-container">
          {/* Toggle section for Flashcards and Quiz modes */}
          <div className="mode-toggle">
            <button
              className={`generate-btn ${activeMode === 'flashcard' ? 'active' : ''}`}
              onClick={() => setActiveMode('flashcard')}
            >
              Flashcards
            </button>
            <button
              className={`generate-btn ${activeMode === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveMode('quiz')}
              data-mode="quiz"
            >
              Pop-Quiz
            </button>
          </div>

          <form onSubmit={handleSubmit} className="topic-form">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              className="topic-input"
            />
            <button type="submit" className="generate-btn">
              Generate {activeMode === 'flashcard' ? 'Flashcards' : 'Pop-Quiz'}
            </button>
          </form>

          {loading && <p className="loading-text">Loading {activeMode}... 🔄</p>}
          {error && <p className="error-text">{error}</p>}{/*for chekcing if backedn is still loading or not and display error meesages*/}

          {activeMode === 'flashcard' && flashcards.length > 0 && (
            <div className="flashcard-action-area">
              <button onClick={() => saveFlashcards(topic, flashcards)} className="save-btn">
                Save Flashcards
              </button>
              <Flashcard flashcards={flashcards} />{/*to display the flashcards*/}
            </div>
          )}

          {activeMode === 'quiz' && quizQuestions.length > 0 && (
            <Quiz questions={quizQuestions} />
          )}{/*to display the quiz*/}

          {activeMode === 'flashcard' && <SavedFlashcards ref={savedRef} onLoad={loadFlashcards} />}
        </div>
      </div>
    </>
  );
}

export default App;
