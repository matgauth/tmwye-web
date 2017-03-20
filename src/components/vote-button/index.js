import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { ref } from "../../config/constants";
import { handleVote } from "../../helpers/database";

class VoteButton extends Component {
  state = { countVotes: 0 };
  componentWillMount() {
    const mRef = ref
      .child(`medias/${this.props.resultId}`)
      .orderByValue()
      .equalTo(this.props.catId);

    mRef.on("child_added", snap => {
      this.setState((state, props) => {
        return { countVotes: state.countVotes + 1 };
      });
    });
    mRef.once("value").then(snap => {
      this.setState({ countVotes: snap.numChildren() });
    });
  }

  componentWillUnmount() {
    ref.child(`medias/${this.props.resultId}`).off();
  }

  render() {
    const { countVotes } = this.state;
    const { resultId, catId } = this.props;
    return (
      <Button
        color="red"
        icon="food"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: countVotes
        }}
        onClick={() => handleVote(resultId, catId)}
      />
    );
  }
}

export default VoteButton;
