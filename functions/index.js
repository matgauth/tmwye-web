const functions = require("firebase-functions");

exports.countVotesByGenre = functions.database
  .ref("/medias/{imdbid}/{catid}/votes")
  .onWrite(event => {
    console.log("ImdbId :", event.params.imdbid);
    console.log("CatId :", event.params.catid);
    let ref = event.data.ref.parent.child("votes_count");
    if (!event.data.exists()) return ref.remove();
    return ref.set(event.data.numChildren());
  });

exports.countVotesByFood = functions.database
  .ref("/mediasByFood/{catid}/{imdbid}/votes")
  .onWrite(event => {
    let ref = event.data.ref.parent.child("votes_count");
    if (!event.data.exists()) return ref.remove();
    return ref.set(event.data.numChildren());
  });
