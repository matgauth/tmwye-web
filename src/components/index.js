import React, { Component } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Dimmer, Loader, Container } from "semantic-ui-react";

import { auth } from "../config/constants";
import Navigation from "../components/nav";
import Login from "../components/login";
import Register from "../components/register";
import List from "../components/list";

function PrivateRoute({ comp: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />}
    />
  );
}

function PublicRoute({ comp: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === false ? <Component {...props} /> : <Redirect to="/" />}
    />
  );
}
class App extends Component {
  state = {
    loggedIn: false,
    loading: true
  };

  handleSignOut = async () => {
    try {
      await auth.signOut();
      this.setState({ loggedIn: false });
    } catch (err) {
      console.error(err);
    }
  };
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.setState({
          loggedIn: true
        });
      }
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { loading: l, loggedIn: log } = this.state;
    return l === true
      ? <Dimmer active={l} inverted page>
          <Loader>Loading</Loader>
        </Dimmer>
      : <BrowserRouter>
          <div>
            <Navigation signOut={this.handleSignOut} loggedIn={log} />
            <Container>
              <Switch>
                <PublicRoute loggedIn={log} path="/login" comp={Login} />
                <PublicRoute loggedIn={log} path="/register" comp={Register} />
                <PrivateRoute loggedIn={log} path="/" comp={List} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>;
  }
}

export default App;
