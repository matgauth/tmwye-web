import { auth, ref } from "./fb";
export default (imdbId, catId, selected) => {
  const uid = auth.currentUser.uid;
  if (selected) {
    ref.child(`medias/${imdbId}/${catId}/votes/${uid}`).remove();
    ref.child(`mediasByFood/${catId}/${imdbId}/votes/${uid}`).remove();
  } else {
    let updates = {};
    const voteObj = {
      [uid]: true
    };
    updates[`/medias/${imdbId}/${catId}/votes`] = voteObj;
    updates[`/mediasByFood/${catId}/${imdbId}/votes`] = voteObj;
    ref.update(updates);
  }
};
