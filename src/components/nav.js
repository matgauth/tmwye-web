import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/fb";
import { Menu, Button, Icon } from "semantic-ui-react";

export default ({ loggedIn, signOut }) => (
  <Menu inverted fixed="top" style={{ opacity: 0.9 }}>
    {loggedIn && auth.currentUser
      ? <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/food">
              <Icon name="food" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/genres">
              <Icon name="film" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/account">
              <Icon name="user" />{auth.currentUser.email}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Button secondary icon="sign out" onClick={signOut} />
          </Menu.Item>
        </Menu.Menu>
      : <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/login"><Icon name="sign in" /></Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register"><Icon name="signup" /></Link>
          </Menu.Item>
        </Menu.Menu>}
  </Menu>
);
