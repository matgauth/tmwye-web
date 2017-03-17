import React from "react";
import { Item } from "semantic-ui-react";
import { IMAGE_SEARCH } from "../../config/constants";
import "./index.css";

const Element = ({ result }) => (
  <Item>
    <Item.Image src={IMAGE_SEARCH + result.poster_path} alt={`${result.title}-poster`} />
    <Item.Content>
      <Item.Header as="h2">{result.title}</Item.Header>
      <Item.Meta>
        <span>{result.release_date}</span>
      </Item.Meta>
      <Item.Description>
        <p className="el-plot">{result.overview}</p>
      </Item.Description>
    </Item.Content>
  </Item>
);

export default Element;
