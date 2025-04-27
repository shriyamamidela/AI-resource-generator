const express = require('express');
const cors = require('cors');//// CORS middleware to allow cross-origin requests (from f to b)
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');//importing that for using Gemini

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/generate', async (req, res) => {
  const { topic } = req.body;
  console.log("Incoming topic:", topic);

  try {//making an api call to gemini to generate data
    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash', 
      contents: `Generate 20 flashcards in Q&A format about the topic: ${topic}`,
    });
    res.json({ flashcards: response.text });//response
  } catch (err) {
    console.error('❌ Gemini SDK Error:', err.message);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

app.post('/generate-quiz', async (req, res) => {
  const { topic } = req.body;
  console.log("Generating quiz for topic:", topic);

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Generate a quiz with 5 multiple choice questions about ${topic}. Format each question as follows:
      Q: [Question]
      A) [Option A]
      B) [Option B]
      C) [Option C]
      D) [Option D]
      Correct: [A/B/C/D]
      
      Make sure each question has exactly 4 options and one correct answer.`,
    });
    res.json({ quiz: response.text });
  } catch (err) {
    console.error('❌ Gemini SDK Error:', err.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});
//starts the server and makes it listen for incoming http requests
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
