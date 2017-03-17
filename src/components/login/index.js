import React, { Component } from "react";
import { Button, Form, Divider, Icon } from "semantic-ui-react";
import { signInWithProvider } from "../../helpers/auth";
import { Link } from "react-router-dom";
import FormField from "../form-field";
import { facebook, google, auth } from "../../config/constants";
import "./index.css";

class Login extends Component {
  render() {
    return (
      <div className="form">
        <h1>Log in to your account</h1>
        <p>Don't have an account ? <Link to="/register">Sign up</Link></p>
        <Form
          onSubmit={e => {
            e.preventDefault();
            auth.signInWithEmailAndPassword(this.email.value, this.pw.value);
          }}
        >
          <Form.Group>
            <FormField
              name="email"
              type="email"
              reference={email => this.email = email}
            />
            <FormField
              name="pw"
              type="password"
              reference={pw => this.pw = pw}
            />
          </Form.Group>
          <Button primary type="submit">SIGN IN</Button>

        </Form>
        <Divider horizontal>Or</Divider>
        <Form
          onSubmit={e => {
            e.preventDefault();
            signInWithProvider(google);
          }}
        >
          <Button color="google plus" type="submit">
            <Icon name="google" /> SIGN IN WITH GOOGLE
          </Button>
        </Form>
        <Form
          onSubmit={e => {
            e.preventDefault();
            signInWithProvider(facebook);
          }}
        >
          <Divider hidden />
          <Button color="facebook" type="submit">
            <Icon name="facebook" /> SIGN IN WITH FACEBOOK
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
