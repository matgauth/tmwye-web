import React, { Component } from "react";
import { MOVIE_SEARCH, API_KEY, ref } from "../../config/constants";
import ElementByGenre from "../element-by-genre";
import FakeElement from "../fake-element";
import { Item, Container } from "semantic-ui-react";
const QUERIES = `api_key=${API_KEY}&language=${navigator.language}&include_adult=false&sort_by=created_at.asc`;
class ListByGenre extends Component {
  state = { list: [], food: null };
  async componentWillMount() {
    const gRef = ref.child("food");
    const snap = await gRef.once("value");
    this.setState({ food: snap.val() });
  }
  async componentDidMount() {
    let res = await fetch(
      `${MOVIE_SEARCH}/genre/${this.props.match.params.genreId}/movies?${QUERIES}`
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
            : new Array(5).fill(null).map((el, i) => <FakeElement key={i} />)}
        </Item.Group>
      </Container>
    );
  }
}

export default ListByGenre;
