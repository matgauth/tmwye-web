import React, { Component } from "react";
import { ref } from "../../config/constants";
import Genre from "../genre";
import { Card, Loader } from "semantic-ui-react";

class Genres extends Component {
  state = { genres: null };
  async componentWillReceiveProps(nextProps) {
    const { fbKey } = nextProps;
    const gRef = ref.child(fbKey);
    const snap = await gRef.once("value");
    this.setState({ genres: snap.val() });
  }
  /*
  componentDidMount() {
    ref.child("food").on("value", snap => {
      snap.forEach(data => {
        console.log(data.key);
        ref
          .child("food/"+data.key)
          .orderByChild("hamburger")
          .limitToLast(1)
          .on("value", snapshot => {
            console.log(snapshot.val());
          });
      });
    });
  }
*/
  render() {
    const { genres } = this.state;
    return (
      <Card.Group itemsPerRow={3}>
        {genres
          ? Object.keys(genres).map(key => (
              <Genre key={genres[key].id} genre={genres[key]} />
            ))
          : <Loader />}
      </Card.Group>
    );
  }
}

export default Genres;
