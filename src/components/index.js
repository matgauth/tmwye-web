import React, { Component } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { auth } from "../config/constants";
import Navigation from "../components/nav";
import Login from "../components/login";
import Register from "../components/register";
import ListByGenre from "../components/list-by-genre";
import ListByFood from "../components/list-by-food";
import Categories from "../components/categories";
import Spinner from "../components/spinner";

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
            <Switch>
              <PublicRoute loggedIn={loggedIn} path="/login" comp={Login} />
              <PublicRoute
                loggedIn={loggedIn}
                path="/register"
                comp={Register}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/list-by-genres/:genreId"
                comp={ListByGenre}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/list-by-food/:foodId/:foodName"
                comp={ListByFood}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                path="/movies/:fbKey"
                comp={Categories}
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

export default App;
