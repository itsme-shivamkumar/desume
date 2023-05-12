// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "desume-36597.firebaseapp.com",
  projectId: "desume-36597",
  storageBucket: "desume-36597.appspot.com",
  messagingSenderId: "440115329313",
  appId: "1:440115329313:web:80b55cde2893f1964c2660",
  measurementId: "G-KCV3VBEBCT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();