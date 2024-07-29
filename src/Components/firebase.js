// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYDc2GeXsnQYwryejqYf17wHDJoZW68HU",
  authDomain: "metonia-3ccc3.firebaseapp.com",
  projectId: "metonia-3ccc3",
  storageBucket: "metonia-3ccc3.appspot.com",
  messagingSenderId: "133222444331",
  appId: "1:133222444331:web:6f142a57fc4aba7152296e",
  databaseURL: "https://metonia-3ccc3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, db, realtimeDb, auth };
