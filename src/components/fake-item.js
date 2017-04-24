import React from "react"

import { Item, Image as ShortParagraph } from "semantic-ui-react"

const STATIC_IMAGES = process.env.PUBLIC_URL + "/img/"

export default () => (
  <Item>
    <Item.Image src={STATIC_IMAGES + "image.webp"} />
    <Item.Content>
      <Item.Description>
        <ShortParagraph src={STATIC_IMAGES + "short-paragraph.webp"} />
      </Item.Description>
    </Item.Content>
  </Item>
)
