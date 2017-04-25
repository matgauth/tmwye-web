import React from "react"
import { Link } from "react-router-dom"

import { Menu, Button, Icon } from "semantic-ui-react"

import { auth } from "../lib/fb"

export default ({ loggedIn, signOut }) => (
  <Menu inverted fixed="top">
    {loggedIn && auth.currentUser
      ? <Menu.Menu position="right">
          <Menu.Item as={Link} to="/food">
            <Icon name="food" />
          </Menu.Item>
          <Menu.Item as={Link} to="/genres">
            <Icon name="film" />
          </Menu.Item>
          <Menu.Item as={Link} to="/account">
            <Icon name="user" />{auth.currentUser.email}
          </Menu.Item>
          <Menu.Item>
            <Button secondary icon="sign out" onClick={signOut} />
          </Menu.Item>
        </Menu.Menu>
      : <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">
            <Icon name="sign in" />
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            <Icon name="signup" />
          </Menu.Item>
        </Menu.Menu>}
  </Menu>
)
