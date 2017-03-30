import React, { Component } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { auth } from "../lib/fb";
import Navigation from "./nav";
import Login from "./login";
import Register from "./register";
import ListByGenre from "./movies-by-genre";
import ListByFood from "./movies-by-food";
import Categories from "./categories";
import Spinner from "./spinner";

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
export default class extends Component {
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
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          loading: false
        });
      } else {
        this.setState({
          loggedIn: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading, loggedIn } = this.state;
    return loading === true
      ? <Spinner loading={loading} />
      : <BrowserRouter>
          <div>
            <Navigation signOut={this.handleSignOut} loggedIn={loggedIn} />
            <Switch>
              <PublicRoute loggedIn={loggedIn} path="/login" comp={Login} />
              <PublicRoute
                loggedIn={loggedIn}
                path="/register"
                comp={Register}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/movies-by-genres/:genreId"
                comp={ListByGenre}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/movies-by-food/:foodId"
                comp={ListByFood}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/:fbKey"
                comp={Categories}
              />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </BrowserRouter>;
  }
}
