import React, { Component } from "react"

import { Item, Container } from "semantic-ui-react"

import ItemByGenre from "../components/item-by-genre"
import FakeItem from "../components/fake-item"

import getMoviesByGenre from "../lib/get-movies-by-genre"

export default class extends Component {
  state = { movies: [], food: null }

  parseGenreId = props => {
    return parseInt(props.match.params.genreId, 10)
  }
  async componentDidMount() {
    const genreId = this.parseGenreId(this.props)
    const promise = await getMoviesByGenre(genreId)
    this.setState({ food: promise[0], movies: promise[1] })
  }

  render() {
    const { movies, food } = this.state
    return (
      <Container text textAlign="center" className="container">
        <Item.Group divided>
          {movies.length > 0
            ? movies.map(movie => (
                <ItemByGenre key={movie.id} movie={movie} food={food} />
              ))
            : new Array(5).fill(null).map((el, i) => <FakeItem key={i} />)}
        </Item.Group>
      </Container>
    )
  }
}
