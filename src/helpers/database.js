import { auth, ref } from "../config/constants";
export function handleVote(imdbId, catId) {
  const uid = auth.currentUser.uid;

  ref.child(`/medias/${imdbId}/${catId}/votes`).update({
    [uid]: true
  });
}
