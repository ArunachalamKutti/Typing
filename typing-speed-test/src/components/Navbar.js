import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../services/firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Error signing out: ", error); // Handle errors
    }
  };

  return (
    <nav style={navStyle}>
      <h1 style={titleStyle}>Typing Speed Test</h1>
      <ul style={ulStyle}>
        <li>
          <Link style={linkStyle} to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <span style={userStyle}>Welcome, {user.email}</span>
            </li>
            <li>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link style={linkStyle} to="/login">Login</Link>
            </li>
            <li>
              <Link style={linkStyle} to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Example styles for the navbar
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
};

const titleStyle = {
  margin: 0,
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  gap: '20px',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const userStyle = {
  marginRight: '20px',
};

const buttonStyle = {
  backgroundColor: '#ff4757',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  borderRadius: '5px',
};

// Export the Navbar component
export default Navbar;
