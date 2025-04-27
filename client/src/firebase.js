// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfzu9Om6m7NMhokwYBXsm0Y4hv7QWcEzg",
  authDomain: "flashcardgen-9529f.firebaseapp.com",
  projectId: "flashcardgen-9529f",
  storageBucket: "flashcardgen-9529f.firebasestorage.app",
  messagingSenderId: "257961503156",
  appId: "1:257961503156:web:b0358d36e13cbf10082ae1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
