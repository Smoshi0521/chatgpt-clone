// Import the functions you need from the SDKs you need
import { getApps, getApp,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52siWQH1lIQfwG8aqsPhQpJPAPT7PTW0",
  authDomain: "chatgpt-clone-73a0c.firebaseapp.com",
  projectId: "chatgpt-clone-73a0c",
  storageBucket: "chatgpt-clone-73a0c.appspot.com",
  messagingSenderId: "178065452509",
  appId: "1:178065452509:web:197adf6325fe6e41bc5a34",
  measurementId: "G-NWRCLF41JG"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);

export {db}