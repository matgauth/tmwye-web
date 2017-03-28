import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Category = ({ category, fbKey }) => (
  <Link to={`/list-by-${fbKey}/${category.id}/${category.name}`}>
    <Card header={category.name} />
  </Link>
);

export default Category;
