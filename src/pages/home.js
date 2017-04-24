import React, { Component } from "react"

import { Header, Container, Icon } from "semantic-ui-react"

export default class extends Component {
  render() {
    return (
      <Container text textAlign="center" className="container">
        <Header as="h2" icon textAlign="center">
          <Icon name="cubes" circular />
          <Header.Content>
            Most voted films
          </Header.Content>
        </Header>
        <Header as="h2" icon textAlign="center">
          <Icon name="cubes" circular />
          <Header.Content>
            Most voted food
          </Header.Content>
        </Header>
      </Container>
    )
  }
}
