// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_cn-J5lJHtxf-rg_T2ApbmWON1acOOMw",
  authDomain: "react-3b122.firebaseapp.com",
  projectId: "react-3b122",
  storageBucket: "react-3b122.appspot.com",
  messagingSenderId: "904880639376",
  appId: "1:904880639376:web:6148d7459f3526efe3f715",
  measurementId: "G-HSG744FYZN",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
