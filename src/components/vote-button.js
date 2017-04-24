import React from "react"
import { connect } from "react-firebase"

import { Button, Popup, Statistic } from "semantic-ui-react"

import handleVote from "../lib/push-vote"

import { auth } from "../lib/fb"

const VoteButton = ({ selected, count, movieId, cat }) => {
  let color = selected ? "red" : "black"
  const content = (
    <Statistic size="mini" color={color}>
      <Statistic.Value>
        {count ? count.votes_count : 0}
      </Statistic.Value>
      <Statistic.Label>
        {count ? "Votes" : "Vote"}
      </Statistic.Label>
    </Statistic>
  )
  return (
    <Popup
      trigger={
        <Button
          color={color}
          icon="food"
          label={{
            basic: true,
            pointing: "left",
            content
          }}
          onClick={() => handleVote(movieId, cat.id, selected)}
        />
      }
      content={cat.name}
      inverted
    />
  )
}

const mapFirebaseToProps = ({ movieId, cat }) => {
  const count = {
    path: `medias/${movieId}/${cat.id}`,
    limitToLast: 1
  }
  return {
    count: count,
    selected: `medias/${movieId}/${cat.id}/votes/${auth.currentUser.uid}`
  }
}

export default connect(mapFirebaseToProps)(VoteButton)
