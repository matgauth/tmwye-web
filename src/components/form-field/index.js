import React from "react";
import { Form } from "semantic-ui-react";

const FormField = ({ name, type, reference }) => (
  <Form.Field>
    <label>
      {type === "password" ? "Password" : "Email"} :
    </label>
    <input name={name} type={type} ref={reference} />
  </Form.Field>
);

export default FormField;
