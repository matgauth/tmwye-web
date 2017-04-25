import React, { Component } from "react"

import { Header, Container, Icon } from "semantic-ui-react"

import getMostVotedMovies from "../lib/get-most-voted-movies"

export default class Home extends Component {
  state = { movies: [] }

  async componentDidMount() {
    const movies = await getMostVotedMovies()
    this.setState({ movies })
  }

  render() {
    console.log(this.state.movies)
    return (
      <Container text textAlign="center" className="container">
        <Header as="h2" icon textAlign="center">
          <Icon name="cubes" circular />
          <Header.Content>
            Most voted films
          </Header.Content>
        </Header>
        <Header as="h2" icon textAlign="center">
          <Icon name="cubes" circular />
          <Header.Content>
            Most voted food
          </Header.Content>
        </Header>
      </Container>
    )
  }
}
