import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase'; // Adjust the path based on your project structure

function TypingTest({ onComplete }) {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Fetch random text on component mount
  useEffect(() => {
    fetchRandomText();
  }, []);

  const fetchRandomText = async () => {
    // Replace with an API call or use a predefined array of texts
    const sampleTexts = [
      'The quick brown fox jumps over the lazy dog.',
      'Practice makes perfect.',
      'Stay hungry, stay foolish.',
    ];
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
  };

  // Start the timer when the user starts typing
  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  // Handle user input
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!timerActive) {
      setTimerActive(true);
    }

    if (value === text) {
      setTimerActive(false);
      calculateResults();
      onComplete(wpm, accuracy);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Calculate WPM
    const wordsTyped = userInput.trim().split(' ').length;
    const minutes = timeElapsed / 60 || 1 / 60; // Prevent division by zero
    const currentWpm = Math.round(wordsTyped / minutes);
    setWpm(currentWpm);

    // Calculate Accuracy
    const correctChars = userInput.split('').filter((char, idx) => char === text[idx]).length;
    const totalChars = userInput.length;
    const currentAccuracy = totalChars ? Math.round((correctChars / totalChars) * 100) : 100;
    setAccuracy(currentAccuracy);
  };

  // Render the text with highlighting
  const renderText = () => {
    return text.split('').map((char, idx) => {
      let className = '';
      if (idx < userInput.length) {
        className = char === userInput[idx] ? 'text-green-600' : 'text-red-600';
      }
      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });
  };

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
    saveResults(); // Call the saveResults function here
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl mb-4">{renderText()}</p>
        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Start typing here..."
          value={userInput}
          onChange={handleChange}
          disabled={!text}
        ></textarea>
        <ProgressBar progress={(userInput.length / text.length) * 100} />
        <div className="flex justify-between mt-4">
          <p>Time: {timeElapsed}s</p>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
        <button onClick={handleTestCompletion} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Complete Test
        </button>
      </div>
    </div>
  );
}

export default TypingTest;
