import React, { Component } from "react";
import { ref } from "../../config/constants";
import Genre from "../genre";
import Spinner from "../spinner";
import { Card } from "semantic-ui-react";

class Genres extends Component {
  state = { genres: null };
  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.fbKey !== this.props.match.params.fbKey) {
      const gRef = ref.child(nextProps.match.params.fbKey);
      const snap = await gRef.once("value");
      this.setState({ genres: snap.val() });
    }
  }

  async componentWillMount() {
    const gRef = ref.child(this.props.match.params.fbKey);
    const snap = await gRef.once("value");
    this.setState({ genres: snap.val() });
  }

  render() {
    const { genres } = this.state;
    let loading = genres === null;
    return loading
      ? <Spinner loading={loading} />
      : <Card.Group stackable>
          {Object.keys(genres).map(key => (
            <Genre key={genres[key].id} genre={genres[key]} />
          ))}
        </Card.Group>;
  }
}

export default Genres;
