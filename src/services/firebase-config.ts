// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD4y_7VwS94Q-sgwYBh4uxEsr-XpbOPQU",
  authDomain: "find-my-apartment-4-1.firebaseapp.com",
  projectId: "find-my-apartment-4-1",
  storageBucket: "find-my-apartment-4-1.appspot.com",
  messagingSenderId: "730448332910",
  appId: "1:730448332910:web:31c63d996cfad9c5bafe7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();