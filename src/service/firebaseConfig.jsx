// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqkg7bHqrMRJIA26iQAZhFsXhTjz0y_24",
  authDomain: "travelmateai.firebaseapp.com",
  projectId: "travelmateai",
  storageBucket: "travelmateai.appspot.com",
  messagingSenderId: "1030874114227",
  appId: "1:1030874114227:web:57afda16b1affc736be8c6",
  measurementId: "G-1VEK45851Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);