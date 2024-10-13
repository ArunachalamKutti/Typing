import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase'; // Import Firebase auth
import Signup from './components/Signup';
import Login from './components/Login';
import TypingTest from './components/TypingTest'; // Your existing component
import Navbar from './components/Navbar'; // Optional: a Navbar component for navigation

const App = () => {
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // User is signed out
      }
    });

    // Cleanup the observer on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {user && <Navbar user={user} />} {/* Optional: render Navbar if user is logged in */}
        <Routes>
          <Route path="/" element={<TypingTest />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect if user is not logged in */}
          <Route path="/protected" element={user ? <ProtectedComponent /> : <Navigate to="/login" />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedComponent = () => {
  return <h2>This is a protected route. Only logged-in users can see this.</h2>;
};

export default App;
