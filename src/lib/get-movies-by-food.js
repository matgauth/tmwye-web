import { ref } from "./fb"
import fetchMovie from "./fetch-movie"

export default async key => {
  const fbRef = ref.child("mediasByFood").child(key).orderByChild("votes_count")
  const snap = await fbRef.limitToLast(10).once("value")
  let movies = []
  snap.forEach(data => {
    movies.push(fetchMovie(data))
  })
  return Promise.all(movies)
}
