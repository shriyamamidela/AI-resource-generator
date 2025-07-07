# AI Resource Generator

A full-stack educational tool that uses Google’s Gemini LLM to automatically generate flashcards and quizzes from user-input topics. It helps students study more efficiently by leveraging AI for personalized, interactive learning.



## Project Structure

The project is organised into two main directories:

- `client/`: React-based frontend application
- `server/`: Node.js backend server
- Firebase Firestore – Used for storing user data and resources

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shriyamamidela/AI-resource-generator.git
cd AI-resource-generator
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Add your Gemini API key and Firebase credentials
  

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend application (in a new terminal):
```bash
cd client
npm start
```

The application should now be running at `http://localhost:3000` with the backend server at `http://localhost:5000`.

## Features

- AI-powered flashcard & quiz generation (via Gemini LLM)
- Interactive flashcards
- Real-time educational content creation
- Quiz generation and management
- Save and organize educational resources
- Full-stack integration (React + Node.js + Firebase)
- Firebase integration for data persistence
- Secure API key handling and environment setup

## How AI is used
- Uses prompt engineering to communicate with Gemini for generating high-quality educational material
- Accepts topic-based input from users and returns relevant flashcards/quizzes
- Can be extended for evaluations, personalized learning plans, and more

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
