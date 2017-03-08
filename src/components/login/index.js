import React, { Component } from "react";
import { Button, Form, Divider, Icon } from "semantic-ui-react";
import { signInWithProvider } from "../../helpers/auth";
import { Link } from "react-router-dom";
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
            <Form.Field>
              <label>
                Email :
              </label>
              <input
                name="email"
                type="email"
                ref={email => this.email = email}
                placeholder="Type your email"
              />
            </Form.Field>
            <Form.Field>
              <label>
                Password :
              </label>
              <input
                name="pw"
                type="password"
                ref={pw => this.pw = pw}
                placeholder="Type your password"
              />
            </Form.Field>
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
