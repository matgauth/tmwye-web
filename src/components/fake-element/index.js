import React from "react";
import { Item, Image as ShortParagraph } from "semantic-ui-react";
import ShortParagraphImage from "./short-paragraph.webp";
import FakePoster from "./image.webp";

const paragraph = <ShortParagraph src={ShortParagraphImage} />;

const FakeElement = () => (
  <Item>
    <Item.Image src={FakePoster} />
    <Item.Content>
      <Item.Description>
        {paragraph}
      </Item.Description>
    </Item.Content>
  </Item>
);

export default FakeElement;
