import React from "react";
import { Item, Label } from "semantic-ui-react";
import "./index.css";

const Element = ({ result }) => (
    <Item>
      <Item.Image src={result.poster} alt={`${result.title}-poster`} />
      <Item.Content>
        <Item.Header as="h2">{result.title}</Item.Header>
        <Item.Meta>
          <span>{result.released}</span>
        </Item.Meta>
        <Item.Description><p className="el-plot">{result.plot}</p></Item.Description>
        <Item.Extra>
          <Label>{result.genre}</Label>
          <Label>{result.runtime}</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
);

export default Element;
