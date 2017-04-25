import { MOVIE_QUERIES, MOVIE_SEARCH } from "./constants"

export default async data => {
  const res = await fetch(`${MOVIE_SEARCH}/movie/${data.key}?${MOVIE_QUERIES}`),
    movie = await res.json()
  return {
    id: movie.id,
    poster_path: movie.poster_path,
    genres: movie.genres,
    votes_count: data.val().votes_count
  }
}
