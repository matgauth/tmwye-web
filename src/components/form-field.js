import React from "react";
import { Form } from "semantic-ui-react";

export default ({ name, type, reference }) => (
  <Form.Field>
    <label>
      {type.charAt(0).toUpperCase() + type.substr(1)}
    </label>
    <input name={name} type={type} ref={reference} />
  </Form.Field>
);
