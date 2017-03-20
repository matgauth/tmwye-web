import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Genre = ({ genre }) => (
  <Link to={`/list/${genre.id}`}>
    <Card header={genre.name} />
  </Link>
);

export default Genre;
