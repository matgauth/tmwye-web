import React, { Component } from "react";
import { Button, Popup, Statistic, Icon } from "semantic-ui-react";
import { ref, auth } from "../../config/constants";
import { handleVote } from "../../helpers/database";

class VoteButton extends Component {
  state = { countVotes: 0, selected: false };
  componentWillMount() {
    const { resultId, cat } = this.props;
    const mRef = ref.child(`medias/${resultId}/${cat.id}`).limitToLast(1);

    mRef.on("child_added", this.handleCountVotes);

    mRef.on("child_changed", this.handleCountVotes);

    mRef.on("child_removed", this.handleCountVotes);

    const votesRef = ref.child(`medias/${resultId}/${cat.id}/votes`);
    votesRef.on("value", snap => {
      const uid = auth.currentUser.uid;
      if (snap.child(uid).exists()) {
        this.setState({ selected: true });
      } else {
        this.setState({ selected: false });
      }
    });
  }

  handleCountVotes = snap => {
    let countVotes = snap.val();
    this.setState({ countVotes });
  };

  componentWillUnmount() {
    const { resultId, cat } = this.props;
    const mRef = ref.child(`medias/${resultId}/${cat.id}`);
    mRef.off();
  }

  render() {
    const { countVotes, selected } = this.state;
    const { resultId, cat } = this.props;
    let color = selected ? "red" : "black";
    return (
      <Popup
        trigger={
          <Button
            color={color}
            icon="food"
            label={{
              basic: true,
              pointing: "left",
              content: (
                <Statistic size="mini" color={color}>
                  <Statistic.Value>
                    {countVotes >= 0
                      ? countVotes
                      : <Icon name="circle notched" loading />}
                  </Statistic.Value>
                  <Statistic.Label>
                    {countVotes >= 0 ? "Votes" : null}
                  </Statistic.Label>
                </Statistic>
              )
            }}
            onClick={() => handleVote(resultId, cat.id, selected)}
          />
        }
        content={cat.name}
        inverted
      />
    );
  }
}

export default VoteButton;
