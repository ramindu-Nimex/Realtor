// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcYThi2oTQD1mxcXFOebD82DjdxNggzEc",
  authDomain: "realtor-b5cf7.firebaseapp.com",
  projectId: "realtor-b5cf7",
  storageBucket: "realtor-b5cf7.appspot.com",
  messagingSenderId: "63563321686",
  appId: "1:63563321686:web:14d382d51515514e2c06f7"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();