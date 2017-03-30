import React, { Component } from "react";
import { Button, Popup, Statistic, Icon } from "semantic-ui-react";
import handleVote from "../lib/push-vote";
import getVotes, { observe } from "../lib/get-votes";

class VoteButton extends Component {
  state = { countVotes: 0, selected: false };
  componentDidMount() {
    const { movieId, cat } = this.props;
    this.unsubscribe = observe(movieId, cat.id, countVotes =>
      this.setState({ countVotes }));

    this.getVotes = getVotes(movieId, cat.id, selected =>
      this.setState({ selected }));
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.getVotes();
  }

  render() {
    const { countVotes, selected } = this.state;
    const { movieId, cat } = this.props;
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
            onClick={() => handleVote(movieId, cat.id, selected)}
          />
        }
        content={cat.name}
        inverted
      />
    );
  }
}

export default VoteButton;
