// Assuming this is inside a React component

import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

const TypingTest = () => {
  const wpm = 50; // Replace with actual WPM calculation
  const accuracy = 95; // Replace with actual accuracy calculation

  const saveResults = async () => {
    try {
      await addDoc(collection(db, 'results'), {
        wpm,
        accuracy,
        userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
        timestamp: new Date(),
      });
      console.log('Results saved successfully!');
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const handleTestCompletion = () => {
    // Your logic to handle test completion
    saveResults(); // Call the saveResults function here
  };

  return (
    <div>
      {/* Your typing test UI */}
      <button onClick={handleTestCompletion}>Complete Test</button>
    </div>
  );
};

export default TypingTest;
