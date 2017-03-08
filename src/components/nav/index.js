import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/constants";
import { Menu, Button, Icon } from "semantic-ui-react";

const Navigation = ({ loggedIn, signOut }) => {
  if (loggedIn && auth.currentUser) {
    return (
      <Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/account">
              <Icon name="user" size="large" />{auth.currentUser.email}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Button primary icon="sign out" onClick={signOut}></Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
  return (
    <Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/login"><Icon size="large" name="sign in"/></Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register"><Icon size="large" name="signup"/></Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
