import React from "react"
import { NavLink } from "react-router-dom"

import { Menu, Icon } from "semantic-ui-react"

import { auth } from "../lib/fb"

export default ({ loggedIn, signOut }) => (
  <Menu icon="labeled" inverted fixed="top">
    {loggedIn && auth.currentUser
      ? <Menu.Menu position="right">
          <MenuLink link="/food" icon="food" title="Meals" />
          <MenuLink link="/genres" icon="film" title="Films" />
          <MenuLink link="/account" icon="user" title="Account" />
          <Menu.Item onClick={signOut}>
            <Icon name="sign out" />
            Sign out
          </Menu.Item>
        </Menu.Menu>
      : <Menu.Menu position="right">
          <MenuLink link="/login" icon="sign in" title="Sign in" />
          <MenuLink link="/register" icon="signup" title="Sign up" />
        </Menu.Menu>}
  </Menu>
)

const MenuLink = ({ link, icon, title }) => (
  <Menu.Item
    as={NavLink}
    to={link}
    activeStyle={{
      backgroundColor: "white",
      color: "black"
    }}
  >
    <Icon name={icon} />
    {title}
  </Menu.Item>
)
