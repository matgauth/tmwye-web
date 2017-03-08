import React, { Component } from "react";
import { ref } from "../../config/constants";
import Element from "../element";
import { Item } from "semantic-ui-react";
import "./index.css";

class List extends Component {
  state = { list: [] };

  componentWillMount() {
    let list = [];
    const mRef = ref.child("medias");
    mRef.on("child_added", snap => {
      list.push(snap.val());
      this.setState({ list });
    });

    mRef.on("child_changed", snap => {
      let index = list.findIndex(e => e.id === snap.val().id);
      list[index] = snap.val();
      this.setState({ list });
    });

    mRef.on("child_removed", snap => {
      let index = list.findIndex(e => e.id === snap.val().id);
      if (index > -1) {
        list.splice(index, 1);
        this.setState({ list });
      }
    });
  }

  componentWillUnmount() {
    ref.child("medias").off();
  }

  render() {
    const { list: l } = this.state;
    return (
      <div className="list-container">
        <Item.Group divided>
          {l.map((el, i) => <Element key={el.id} result={el} />)}
        </Item.Group>
      </div>
    );
  }
}

export default List;
