// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5SlfSdGf_aPgEDO-Bx-t2U2g1TiZ5eu4",
  authDomain: "ultimate-frontend-challenge.firebaseapp.com",
  projectId: "ultimate-frontend-challenge",
  storageBucket: "ultimate-frontend-challenge.appspot.com",
  messagingSenderId: "377113773943",
  appId: "1:377113773943:web:c170e77591d6c4230d4372",
  measurementId: "G-6Z9JG1BM7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };