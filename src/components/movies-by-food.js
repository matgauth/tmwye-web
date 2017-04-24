import React, { Component } from "react";
import ItemByFood from "./item-by-food";
import Spinner from "./spinner";
import getMoviesByFood from "../lib/get-movies-by-food";
import { Card, Container } from "semantic-ui-react";
import "./container.css";

export default class extends Component {
  state = { movies: [] };

  parseFoodId = props => {
    return parseInt(props.match.params.foodId, 10);
  };

  async componentDidMount() {
    const foodId = this.parseFoodId(this.props);
    const movies = await getMoviesByFood(foodId);
    this.setState({ movies });
  }

  render() {
    const { movies } = this.state;
    let loading = movies.length === 0;
    return (
      <Container text textAlign="center" className="container">
        <Card.Group>
          {loading
            ? <Spinner loading={loading} />
            : movies
                .reverse()
                .map(movie => <ItemByFood key={movie.id} movie={movie} />)}
        </Card.Group>
      </Container>
    );
  }
}
