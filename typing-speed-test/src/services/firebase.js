// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyChRgKQOk6qg8vqNFSYMJxU3O41Sa4XN48",
  authDomain: "typing-test-71973.firebaseapp.com",
  projectId: "typing-test-71973",
  storageBucket: "typing-test-71973.appspot.com",
  messagingSenderId: "155436102275",
  appId: "1:155436102275:web:73a1a4c12ee419cfefa1b6",
  measurementId: "G-7MN5N5Z67M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db for use in other parts of your application
export { auth, db };
