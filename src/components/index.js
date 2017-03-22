import React, { Component } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { auth } from "../config/constants";
import Navigation from "../components/nav";
import Login from "../components/login";
import Register from "../components/register";
import List from "../components/list";
import Genres from "../components/genres";
import Spinner from "../components/spinner";
import "./index.css";

function PrivateRoute({ comp: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return loggedIn === true
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />;
      }}
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
      if (user) {
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
    const { loading, loggedIn } = this.state;
    return loading === true
      ? <Spinner loading={loading} />
      : <BrowserRouter>
          <div>
            <Navigation signOut={this.handleSignOut} loggedIn={loggedIn} />
            <Container className="app-container">
              <Switch>
                <PublicRoute loggedIn={loggedIn} path="/login" comp={Login} />
                <PublicRoute
                  loggedIn={loggedIn}
                  path="/register"
                  comp={Register}
                />
                <PrivateRoute
                  loggedIn={loggedIn}
                  path="/list/:genreId"
                  comp={List}
                />
                <PrivateRoute
                  loggedIn={loggedIn}
                  path="/movies/:fbKey"
                  comp={Genres}
                />
                <PrivateRoute
                  loggedIn={loggedIn}
                  path="/:fbKey"
                  comp={Genres}
                />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>;
  }
}

export default App;
