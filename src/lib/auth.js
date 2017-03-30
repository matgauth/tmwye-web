import { ref, auth } from "./fb";

export function signUp(email, pw) {
  return auth.createUserWithEmailAndPassword(email, pw).then(saveUser);
}

export function signInWithProvider(provider) {
  return auth.signInWithPopup(provider).then(res => saveUser(res.user));
}

export function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

function saveUser(user) {
  return ref.child(`users/${user.uid}`).set({
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL
  });
}
