import { auth, ref } from "../config/constants";
export function handleVote(imdbId, catId, selected) {
  const uid = auth.currentUser.uid;
  if (selected) {
    ref.child(`medias/${imdbId}/${catId}/votes/${uid}`).remove();
  } else {
    let updates = {};
    updates[`/medias/${imdbId}/${catId}/votes`] = { [uid]: true };
    ref.update(updates);
  }
}
