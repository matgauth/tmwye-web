import React, { Component } from "react";
import { MOVIE_SEARCH, MOVIE_QUERIES, ref } from "../../config/constants";
import ElementByGenre from "../element-by-genre";
import FakeElement from "../fake-element";
import { Item, Container } from "semantic-ui-react";
class ListByGenre extends Component {
  state = { list: [], food: null };
  async componentWillMount() {
    const gRef = ref.child("food");
    const snap = await gRef.once("value");
    this.setState({ food: snap.val() });
  }
  async componentDidMount() {
    let res = await fetch(
      `${MOVIE_SEARCH}/genre/${this.props.match.params.genreId}/movies?${MOVIE_QUERIES}`
    ),
      json = await res.json(),
      list = json ? json.results : [];
    this.setState({ list });
  }
  render() {
    const { list, food } = this.state;
    return (
      <Container text textAlign="center" style={{ margin: "5em auto" }}>
        <Item.Group divided>
          {list.length > 0
            ? list.map((el, i) => (
                <ElementByGenre key={el.id} result={el} food={food} />
              ))
            : new Array(3).fill(null).map((el, i) => <FakeElement key={i} />)}
        </Item.Group>
      </Container>
    );
  }
}

export default ListByGenre;
