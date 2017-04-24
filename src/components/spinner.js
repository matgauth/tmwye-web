import React from "react"

import { Dimmer, Loader } from "semantic-ui-react"

export default ({ loading }) => (
  <Dimmer active={loading} page>
    <Loader size="massive" />
  </Dimmer>
)
