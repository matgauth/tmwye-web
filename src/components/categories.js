import React, { Component } from "react";
import Category from "./category";
import Spinner from "./spinner";
import getCategories from "../lib/get-categories";
import { Card, Container } from "semantic-ui-react";
import "./container.css";

export default class extends Component {
  state = { categories: null };

  getFbKey = props => {
    return props.match.params.fbKey;
  };

  async componentWillReceiveProps(nextProps) {
    const fbKey = this.getFbKey(this.props),
      nextFbKey = this.getFbKey(nextProps);

    if (fbKey !== nextFbKey) {
      this.fbKeyWillChange(nextFbKey);
    }
  }

  fbKeyWillChange = async fbKey => {
    const categories = await getCategories(fbKey);
    this.setState({ categories });
  };

  async componentWillMount() {
    const fbKey = this.getFbKey(this.props);
    this.fbKeyWillChange(fbKey);
  }

  render() {
    const { categories } = this.state;
    const { fbKey } = this.props.match.params;
    let loading = categories === null;
    return loading
      ? <Spinner loading={loading} />
      : <Container text textAlign="center" className="container">
          <Card.Group>
            {Object.keys(categories).map(key => (
              <Category
                key={categories[key].id}
                fbKey={fbKey}
                category={categories[key]}
              />
            ))}
          </Card.Group>
        </Container>;
  }
}
