const functions = require("firebase-functions")
const admin = require("firebase-admin")

function countVotes(event) {
  let ref = event.data.ref.parent.child("votes_count")
  if (!event.data.exists()) return ref.remove()
  return ref.set(event.data.numChildren())
}

exports.countVotesByGenre = functions.database
  .ref("/medias/{imdbid}/{catid}/votes")
  .onWrite(countVotes)

exports.countVotesByFood = functions.database
  .ref("/mediasByFood/{catid}/{imdbid}/votes")
  .onWrite(countVotes)

