import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCnfIqA9pFHYZKUCH-Fr92kNYTfgZLbppU",
  authDomain: "tmwye-62cf8.firebaseapp.com",
  databaseURL: "https://tmwye-62cf8.firebaseio.com"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const ref = firebase.database().ref();
export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();