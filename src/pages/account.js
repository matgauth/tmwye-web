import React, { Component } from "react"

import { Header, Container, Image } from "semantic-ui-react"

import { auth } from "../lib/fb"

export default class extends Component {
  render() {
    return (
      <Container text textAlign="center" className="container">
        <Header as="h1" icon textAlign="center">
          <Image shape="circular" src={auth.currentUser.photoURL} />
          <Header.Content>
            {auth.currentUser.displayName || auth.currentUser.email}
          </Header.Content>
        </Header>
      </Container>
    )
  }
}
