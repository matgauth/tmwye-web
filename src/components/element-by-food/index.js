import React from "react";
import { Card, Image, Segment, Header } from "semantic-ui-react";
import { IMAGE_SEARCH } from "../../config/constants";
import "./index.css";

const ElementByFood = ({ result, total, food }) => {
  let percentage = result.votes_count / total * 100;
  const label = {
    as: "span",
    style: { zIndex: 1 },
    color: "red",
    content: result.votes_count,
    icon: "thumbs up",
    ribbon: true
  };
  return (
    <Card raised centered>
      <Card.Header className="card-link">
        {result.poster_path
          ? <Image
              height="100%"
              src={IMAGE_SEARCH + result.poster_path}
              label={label}
              alt={`${result.title}-poster`}
            />
          : <Segment
              inverted
              circular
              style={{ margin: "5em auto", width: 175, height: 175 }}
            >
              <Header as="h2" inverted>
                {result.title}
                <Header.Subheader>
                  {result.release_date}
                </Header.Subheader>
              </Header>
            </Segment>}
      </Card.Header>
      <Card.Content extra>
        {isFinite(percentage) &&
          `Parmi les ${total} votants pour ${food}, ${percentage.toFixed(0)}% préfèrent en manger devant ce film.`}
      </Card.Content>
    </Card>
  );
};

export default ElementByFood;
