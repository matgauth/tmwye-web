import React, { Component } from "react";
import { ref } from "../../config/constants";
import Category from "../category";
import Spinner from "../spinner";
import { Card } from "semantic-ui-react";

class Categories extends Component {
  state = { categories: null };
  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.fbKey !== this.props.match.params.fbKey) {
      const gRef = ref.child(nextProps.match.params.fbKey);
      const snap = await gRef.once("value");
      this.setState({ categories: snap.val() });
    }
  }

  async componentWillMount() {
    const gRef = ref.child(this.props.match.params.fbKey);
    const snap = await gRef.once("value");
    this.setState({ categories: snap.val() });
  }

  render() {
    const { categories } = this.state;
    let loading = categories === null;
    return loading
      ? <Spinner loading={loading} />
      : <Card.Group stackable style={{ marginTop: "5em" }}>
          {Object.keys(categories).map(key => (
            <Category
              key={categories[key].id}
              fbKey={this.props.match.params.fbKey}
              category={categories[key]}
            />
          ))}
        </Card.Group>;
  }
}

export default Categories;
