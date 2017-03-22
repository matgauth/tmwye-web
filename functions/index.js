const functions = require("firebase-functions");

exports.votescount = functions.database
  .ref("/medias/{imdbid}/{catid}/votes")
  .onWrite(event => {
    console.log(event.data.numChildren());
    return event.data.ref.parent
      .child("votes_count")
      .set(event.data.numChildren());
  });
