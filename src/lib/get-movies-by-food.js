import { MOVIE_QUERIES, MOVIE_SEARCH } from "./constants"
import { ref } from "./fb"

async function fetchMovie(data) {
  const res = await fetch(`${MOVIE_SEARCH}/movie/${data.key}?${MOVIE_QUERIES}`),
    movie = await res.json()
  return {
    id: movie.id,
    poster_path: movie.poster_path,
    genres: movie.genres,
    votes_count: data.val().votes_count
  }
}

export default async key => {
  const fbRef = ref.child("mediasByFood").child(key).orderByChild("votes_count")

  const snap = await fbRef.limitToLast(10).once("value")
  let movies = []
  snap.forEach(data => {
    movies.push(fetchMovie(data))
  })
  return Promise.all(movies)
}
