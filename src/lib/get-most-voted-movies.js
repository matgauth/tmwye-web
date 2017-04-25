import { ref } from "./fb"
import fetchMovie from "./fetch-movie"

export default async () => {
  const fbRef = ref.child("medias").orderByChild("votes_count")
  const snap = await fbRef.once("value")
  let movies = []
  let sum = 0
  snap.forEach(data => {
    console.log(data.val())
    sum += data.val().votes_count
    movies.push(fetchMovie(data))
  })
  return Promise.all(movies)
}
