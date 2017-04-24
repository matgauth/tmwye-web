import React from "react"

import { Message, Icon } from "semantic-ui-react"

export default ({ msg, handleDismiss }) =>
  msg &&
  <Message icon error onDismiss={handleDismiss}>
    <Icon name="warning circle" />
    <Message.Content>
      <Message.Header>{msg}</Message.Header>
    </Message.Content>
  </Message>
