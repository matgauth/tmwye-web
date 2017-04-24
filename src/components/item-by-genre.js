import React from "react"

import { Item } from "semantic-ui-react"

import VoteButton from "./vote-button"

import { IMAGE_SEARCH } from "../lib/constants"

export default ({ movie, food }) => {
  const poster = movie.poster_path
    ? IMAGE_SEARCH + movie.poster_path
    : process.env.PUBLIC_URL + "/img/image.webp"
  return (
    <Item>
      <Item.Image size="medium" src={poster} alt={`${movie.title}-poster`} />
      <Item.Content verticalAlign="middle">
        <Item.Header as="h2">{movie.title}</Item.Header>
        <Item.Meta>
          <span>{movie.release_date}</span>
        </Item.Meta>
        <Item.Description>
          <p style={{ textAlign: "justify" }}>{movie.overview}</p>
        </Item.Description>
        <Item.Extra>
          {food &&
            Object.keys(food).map(key => (
              <VoteButton
                key={food[key].id}
                cat={food[key]}
                movieId={movie.id.toString()}
              />
            ))}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
