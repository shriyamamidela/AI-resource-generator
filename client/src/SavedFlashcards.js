import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';//fetch from db,states switch,Lets the parent component call functions inside this child component, Allows custom functions to be exposed to parent when using ref
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const SavedFlashcards = forwardRef(({ onLoad }, ref) => {
  const [savedTopics, setSavedTopics] = useState([]);

  const fetchSavedFlashcards = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'flashcards'));
      const topics = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSavedTopics(topics);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchSavedFlashcards
  }));

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'flashcards', id));
      fetchSavedFlashcards();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchSavedFlashcards();
  }, []);

  return (
    <div className="saved-list-container">
      <h2 className="saved-title">Saved Flashcards</h2>
      <ul className="saved-list">
        {savedTopics.map(item => (
          <li key={item.id} className="saved-list-item">
            <b>{item.topic}</b>
            <button onClick={() => onLoad(item.topic, item.flashcards)} className="load-btn">Load</button>
            <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SavedFlashcards;
