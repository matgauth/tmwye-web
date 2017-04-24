import React from "react"
import { connect } from "react-firebase"

import { Card, Container } from "semantic-ui-react"

import Category from "../components/category"
import Spinner from "../components/spinner"

const Categories = props => {
  let loading = props.categories === undefined
  return loading
    ? <Spinner loading={loading} />
    : <Container text textAlign="center" className="container">
        <Card.Group>
          {Object.keys(props.categories).map(key => (
            <Category
              key={props.categories[key].id}
              fbKey={props.match.params.fbKey}
              category={props.categories[key]}
            />
          ))}
        </Card.Group>
      </Container>
}

const mapFirebaseToProps = props => ({
  categories: props.match.params.fbKey
})

export default connect(mapFirebaseToProps)(Categories)
