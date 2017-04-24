import { MOVIE_QUERIES, MOVIE_SEARCH } from "./constants"
import { ref } from "./fb"

async function fetchMovie(genreId) {
  const res = await fetch(
    `${MOVIE_SEARCH}/genre/${genreId}/movies?${MOVIE_QUERIES}`
  ),
    json = await res.json(),
    movies = json !== undefined ? json.results : []
  return movies
}

async function getFood() {
  const food = await ref.child("food").once("value")
  return food.val()
}

export default async genreId => {
  const food = getFood()
  const movies = fetchMovie(genreId)
  return await Promise.all([food, movies])
}
