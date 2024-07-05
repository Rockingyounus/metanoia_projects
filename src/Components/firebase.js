// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYDc2GeXsnQYwryejqYf17wHDJoZW68HU",
  authDomain: "metonia-3ccc3.firebaseapp.com",
  projectId: "metonia-3ccc3",
  storageBucket: "metonia-3ccc3.appspot.com",
  messagingSenderId: "133222444331",
  appId: "1:133222444331:web:6f142a57fc4aba7152296e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};