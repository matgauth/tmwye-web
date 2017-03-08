import { ref, auth } from "../config/constants";

export async function signUp(email, pw) {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, pw);
    saveUser(res);
  } catch (err) {
    console.error(err);
  }
}

export async function signInWithProvider(provider) {
  try {
    const res = await auth.signInWithPopup(provider);
    saveUser(res.user);
  } catch (err) {
    console.error(err);
  }
}

function saveUser(user) {
  return ref.child(`users/${user.uid}`).set({
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerId: user.providerId
  });
}
