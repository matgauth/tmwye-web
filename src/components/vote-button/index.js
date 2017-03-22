import React, { Component } from "react";
import { Button, Popup, Statistic, Loader } from "semantic-ui-react";
import { ref } from "../../config/constants";
import { handleVote } from "../../helpers/database";

class VoteButton extends Component {
  state = { countVotes: 0 };
  componentWillMount() {
    const { resultId, cat } = this.props;
    const mRef = ref.child(`medias/${resultId}/${cat.id}`).limitToLast(1);

    mRef.on("child_added", snap => {
      let countVotes = snap.val();
      this.setState({ countVotes });
    });

    mRef.on("child_changed", snap => {
      let countVotes = snap.val();
      this.setState({ countVotes });
    });
  }

  render() {
    const { countVotes } = this.state;
    const { resultId, cat, color, icon } = this.props;
    return (
      <Popup
        trigger={
          <Button
            color={color}
            icon={icon}
            label={{
              basic: true,
              pointing: "left",
              content: (
                <Statistic size="mini" color={color}>
                  <Statistic.Value>
                    {countVotes >= 0 ? countVotes : <Loader />}
                  </Statistic.Value>
                  <Statistic.Label>Votes</Statistic.Label>
                </Statistic>
              )
            }}
            onClick={() => handleVote(resultId, cat.id)}
          />
        }
        content={cat.name}
        inverted
      />
    );
  }
}

export default VoteButton;
