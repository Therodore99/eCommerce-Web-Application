// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg9Exg9nHnm4KFbxqVb1MjGzZMuRodv7Y",
  authDomain: "ecommerce-bbb3f.firebaseapp.com",
  projectId: "ecommerce-bbb3f",
  storageBucket: "ecommerce-bbb3f.appspot.com",
  messagingSenderId: "457685337379",
  appId: "1:457685337379:web:a091d09d81527c8935b896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//epxport
export const auth = getAuth(app)
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
