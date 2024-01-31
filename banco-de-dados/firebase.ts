// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as fireetore from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7kUnbIOCTfD-IkxDquyo3BMB7-FOtdYw",
  authDomain: "teste-1567a.firebaseapp.com",
  projectId: "teste-1567a",
  storageBucket: "teste-1567a.appspot.com",
  messagingSenderId: "802651724010",
  appId: "1:802651724010:web:bbb101e2e22e3b2e0c5f93",
  measurementId: "G-Y1E10RGSFW"
};

// Initialize Firebase
console.log('conectado ao firebase!')
const Firebase = initializeApp(firebaseConfig);
export const db = Firestore.getfirestore(firebase)
