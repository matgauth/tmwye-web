import React from "react";
import { Item } from "semantic-ui-react";
import { IMAGE_SEARCH } from "../../config/constants";
import Image from "../fake-element/image.webp";
import VoteButton from "../vote-button";

const Element = ({ result, food }) => {
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
          {food &&
            Object.keys(food).map(key => (
              <VoteButton
                key={food[key].id}
                cat={food[key]}
                resultId={result.id.toString()}
                color="red"
                icon="food"
              />
            ))}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default Element;
