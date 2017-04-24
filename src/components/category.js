import React from "react"

import { Card } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default ({ category, fbKey }) => (
  <Link to={`/movies-by-${fbKey}/${category.id}`}>
    <Card header={category.name} />
  </Link>
)
