import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = ({ loading }) => (
  <Dimmer active={loading} size="huge" page>
    <Loader />
  </Dimmer>
);

export default Spinner;
