# AI Resource Generator

A full-stack application that generates educational resources using AI technology. The application includes features like flashcards, quizzes, and saved resources management.

## Project Structure

The project is organized into two main directories:

- `client/`: React-based frontend application
- `server/`: Node.js backend server

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
   - Fill in the required environment variables

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

- AI-powered resource generation
- Interactive flashcards
- Quiz generation and management
- Save and organize educational resources
- Firebase integration for data persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
