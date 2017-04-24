import React from "react"

import { Card, Image, Segment, Header } from "semantic-ui-react"

import { IMAGE_SEARCH } from "../lib/constants"

export default ({ movie }) => {
  const label = {
    as: "span",
    style: { zIndex: 1 },
    color: "red",
    content: movie.votes_count,
    icon: "thumbs up",
    ribbon: true
  }
  const noPosterStyle = { margin: "5em auto", width: 175, height: 175 }
  return (
    <Card raised centered className="movie">
      <Card.Header>
        {movie.poster_path
          ? <Image
              wrapped
              src={IMAGE_SEARCH + movie.poster_path}
              label={label}
              alt={`${movie.title}-poster`}
            />
          : <Segment inverted circular style={noPosterStyle}>
              <Header as="h2" inverted>
                {movie.title}
                <Header.Subheader>
                  {movie.release_date}
                </Header.Subheader>
              </Header>
            </Segment>}
      </Card.Header>
    </Card>
  )
}
