import { ref, auth } from "../config/constants";

export function handleVote(imbdID, catID) {
  const uid = auth.currentUser.uid;

  const voteObj = {
    imdbID: imbdID,
    [uid]: catID
  };

  ref.child(`/medias/${imbdID}`).update(voteObj);
}
