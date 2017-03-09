import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/constants";
import { Menu, Button, Icon } from "semantic-ui-react";

const Navigation = ({ loggedIn, signOut }) => (
  <Menu inverted fixed="top">
    {loggedIn && auth.currentUser
      ? <Menu.Menu position="right">
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

export default Navigation;
