// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkakZzBf2uEk-UpvdiMzUT1uMyCwgj8ks",
  authDomain: "smart-deals-9cbed.firebaseapp.com",
  projectId: "smart-deals-9cbed",
  storageBucket: "smart-deals-9cbed.firebasestorage.app",
  messagingSenderId: "984650327033",
  appId: "1:984650327033:web:4b1a6131ba0b7db7611328",
  measurementId: "G-8L1WZ6JW80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
