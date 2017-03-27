import React, { Component } from "react";
import { MOVIE_SEARCH, API_KEY, ref } from "../../config/constants";
import ElementByFood from "../element-by-food";
import FakeElement from "../fake-element";

import { Item, Container } from "semantic-ui-react";
const QUERIES = `api_key=${API_KEY}&language=${navigator.language}&include_adult=false&sort_by=created_at.asc`;
class ListByFood extends Component {
  state = { list: [] };
  componentWillMount() {
    const gRef = ref
      .child(`mediasByFood/${this.props.match.params.foodId}`)
      .orderByChild("votes_count")
      .limitToLast(5);
    let results = [];
    gRef.on("child_added", async snap => {
      console.log(snap.val());

      let res = await fetch(`${MOVIE_SEARCH}/movie/${snap.key}?${QUERIES}`),
        json = await res.json();
      json.votes_count = snap.val().votes_count;
      results.push(json);
      console.log(json);
      this.setState({ list: results });
    });
  }
  render() {
    const { list } = this.state;
    return (
      <Container text textAlign="center" style={{ margin: "5em auto" }}>
        <Item.Group divided>
          {list.length > 0
            ? list.map((el, i) => <ElementByFood key={el.id} result={el} />)
            : new Array(5).fill(null).map((el, i) => <FakeElement key={i} />)}
        </Item.Group>
      </Container>
    );
  }
}

export default ListByFood;
