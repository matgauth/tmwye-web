import firebase from "firebase";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyCnfIqA9pFHYZKUCH-Fr92kNYTfgZLbppU",
    authDomain: "tmwye-62cf8.firebaseapp.com",
    databaseURL: "https://tmwye-62cf8.firebaseio.com"
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

//Firebase constants
export const auth = firebase.auth();
export const ref = firebase.database().ref();
export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();
