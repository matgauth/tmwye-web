import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCnfIqA9pFHYZKUCH-Fr92kNYTfgZLbppU",
  authDomain: "tmwye-62cf8.firebaseapp.com",
  databaseURL: "https://tmwye-62cf8.firebaseio.com"
};
firebase.initializeApp(config);

//Firebase constants
export const auth = firebase.auth();
export const ref = firebase.database().ref();
export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();
//The Movie DB constants
export const MOVIE_SEARCH = "https://api.themoviedb.org/3";
export const IMAGE_SEARCH = "https://image.tmdb.org/t/p/w500";
export const API_KEY = "72e58ed9123ba68d1f814768448360c0";
