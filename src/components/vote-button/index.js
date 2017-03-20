import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { ref } from "../../config/constants";
import { handleVote } from "../../helpers/database";
function increment(snap) {
  return function update(state) {
    return { countVotes: state.countVotes + 1, oldCat: snap.val() };
  };
}

function decrement(snap) {
  return function update(state) {
    return { countVotes: state.countVotes - 1, oldCat: snap.val() };
  };
}

class VoteButton extends Component {
  state = { countVotes: 0, oldCat: 0 };
  componentWillMount() {
    const { resultId, catId } = this.props;
    const mRef = ref.child(`medias/${resultId}`).orderByValue().equalTo(catId);

    mRef.on("child_added", snap => {
      this.setState(increment(snap));
    });
    ref.child(`medias/${this.props.resultId}`).on("child_changed", snap => {
      if (this.state.oldCat === catId) this.setState(decrement(snap));
    });
  }

  componentWillUnmount() {
    const { resultId } = this.props;
    ref.child(`medias/${resultId}`).off();
  }

  render() {
    const { countVotes } = this.state;
    const { resultId, catId, color, icon } = this.props;
    return (
      <Button
        color={color}
        icon={icon}
        label={{
          basic: true,
          pointing: "left",
          content: countVotes
        }}
        onClick={() => handleVote(resultId, catId)}
      />
    );
  }
}

export default VoteButton;
