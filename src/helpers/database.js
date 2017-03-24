import { auth, ref } from "../config/constants";
export function handleVote(imdbId, catId) {
  const uid = auth.currentUser.uid;
  let updates = {};
  updates[`/medias/${imdbId}/${catId}/votes`] = { [uid]: true };
  updates[`/mediasPerCat/${catId}/votes`] = {};
  ref.update(updates);
}
