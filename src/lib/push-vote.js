import { auth, ref } from "./fb";
export default (movieId, catId, selected) => {
  const uid = auth.currentUser.uid;
  if (selected) {
    ref.child(`medias/${movieId}/${catId}/votes/${uid}`).remove();
    ref.child(`mediasByFood/${catId}/${movieId}/votes/${uid}`).remove();
  } else {
    let updates = {};
    const vote = {
      [uid]: true
    };
    updates[`/medias/${movieId}/${catId}/votes`] = vote;
    updates[`/mediasByFood/${catId}/${movieId}/votes`] = vote;
    ref.update(updates);
  }
};
