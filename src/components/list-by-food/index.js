import React, { Component } from "react";
import { MOVIE_SEARCH, MOVIE_QUERIES, ref } from "../../config/constants";
import ElementByFood from "../element-by-food";
import { Card, Container } from "semantic-ui-react";

async function searchMovie(data, setState) {
  const res = await fetch(`${MOVIE_SEARCH}/movie/${data.key}?${MOVIE_QUERIES}`),
    json = await res.json();
  json.votes_count = data.val().votes_count;
  setState(json);
}

class ListByFood extends Component {
  state = { list: [], total: 0 };
  async componentWillMount() {
    const fbRef = ref
      .child(`mediasByFood/${this.props.match.params.foodId}`)
      .orderByChild("votes_count");

    const movieSnap = await fbRef.limitToLast(10).once("value");
    movieSnap.forEach(data => {
      searchMovie(data, json => {
        this.setState((state, props) => {
          return { list: [...state.list, json] };
        });
      });
    });

    const totalSnap = await fbRef.once("value");
    totalSnap.forEach(data => {
      const votesCount = data.val().votes_count;
      this.setState((state, props) => {
        return { total: state.total + votesCount };
      });
    });
  }
  render() {
    const { list, total } = this.state;
    return (
      <Container text textAlign="center" style={{ margin: "5em auto" }}>
        <Card.Group>
          {list.map((el, i) => (
            <ElementByFood
              key={el.id}
              result={el}
              total={total}
              food={this.props.match.params.foodName}
            />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default ListByFood;
