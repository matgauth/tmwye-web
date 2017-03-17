import React from "react";
import { Form } from "semantic-ui-react";

const FormField = ({ name, type, reference }) => (
  <Form.Field>
    <label>
      {name} :
    </label>
    <input name={name} type={type} ref={reference} />
  </Form.Field>
);

export default FormField;
