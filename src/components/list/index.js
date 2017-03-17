import React, { Component } from "react";
import { MOVIE_SEARCH, API_KEY } from "../../config/constants";
import Element from "../element";
import { Item } from "semantic-ui-react";
import "./index.css";

class List extends Component {
  state = { list: [] };

  async componentDidMount() {
    const { match } = this.props;
    let res = await fetch(
      `${MOVIE_SEARCH}/genre/${match.params.genreId}/movies?api_key=${API_KEY}&language=${navigator.language}&include_adult=false&sort_by=created_at.asc`
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
          {list.map((el, i) => <Element key={el.id} result={el} />)}
        </Item.Group>
      </div>
    );
  }
}

export default List;
