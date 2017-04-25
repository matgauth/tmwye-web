import React from "react"

import { Card, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default ({ category, fbKey }) => (
  <Card as={Link} to={`/movies-by-${fbKey}/${category.id}`}>
    <Card.Content>
      <Image src={category.icon} alt={category.name} />
    </Card.Content>
    <Card.Content header={category.name} />
  </Card>
)
