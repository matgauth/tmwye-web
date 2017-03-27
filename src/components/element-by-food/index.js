import React from "react";
import { Item, Statistic, Segment } from "semantic-ui-react";
import { IMAGE_SEARCH } from "../../config/constants";
import Image from "../fake-element/image.webp";

const ElementByFood = ({ result }) => {
  const poster = result.poster_path ? IMAGE_SEARCH + result.poster_path : Image;
  return (
    <Item>
      <Item.Image src={poster} alt={`${result.title}-poster`} />
      <Item.Content>
        <Item.Header as="h2">{result.title}</Item.Header>
        <Item.Meta>
          <span>{result.release_date}</span>
        </Item.Meta>
        <Item.Description>
          <p style={{ textAlign: "justify" }}>{result.overview}</p>
        </Item.Description>
        <Item.Extra>
        <Segment inverted floated="right">
          <Statistic inverted color='orange' value={result.votes_count} label='Top votes' />
          </Segment>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ElementByFood;
