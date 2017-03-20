import React, { Component } from "react";
import { MOVIE_SEARCH, API_KEY } from "../../config/constants";
import Element from "../element";
import FakeElement from "../fake-element";
import { Item } from "semantic-ui-react";
import "./index.css";
const QUERIES = "include_adult=false&sort_by=created_at.asc";
class List extends Component {
  state = { list: [] };

  async componentDidMount() {
    const { match } = this.props;
    let res = await fetch(
      `${MOVIE_SEARCH}/genre/${match.params.genreId}/movies?api_key=${API_KEY}&language=${navigator.language}&${QUERIES}`
    ),
      json = await res.json(),
      list = json ? json.results : [];
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="list-container">
        <Item.Group divided>
          {list.length > 0
            ? list.map((el, i) => <Element key={el.id} result={el} />)
            : new Array(5).fill(null).map((el, i) => <FakeElement key={i} />)}
        </Item.Group>
      </div>
    );
  }
}

export default List;
