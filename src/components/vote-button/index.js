import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { ref } from "../../config/constants";
import { handleVote } from "../../helpers/database";

class VoteButton extends Component {
  state = { countVotes: 0 };
  componentWillMount() {
    const { resultId, catId } = this.props;
    const mRef = ref.child(`medias/${resultId}`).orderByValue().equalTo(catId);

    mRef.on("child_added", snap => {
      this.setState((state, props) => {
        return { countVotes: state.countVotes + 1 };
      });
    });

    ref.child(`medias/${resultId}`).on("child_changed", snap => {
      this.setState((state, props) => {
        return { countVotes: state.countVotes + 1 };
      });
    });
  }

  componentWillUnmount() {
    const { resultId } = this.props;
    ref.child(`medias/${resultId}`).off();
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
