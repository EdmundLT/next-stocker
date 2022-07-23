import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyASmqCPh9MreGj3I_yq0UiSU1Vww3xNVDk",
    authDomain: "stocker-eb6cd.firebaseapp.com",
    projectId: "stocker-eb6cd",
    storageBucket: "stocker-eb6cd.appspot.com",
    messagingSenderId: "577605168908",
    appId: "1:577605168908:web:0918f539668c6d0690e329"
  };

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
