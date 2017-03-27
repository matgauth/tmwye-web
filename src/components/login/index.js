import React, { Component } from "react";
import {
  Button,
  Form,
  Divider,
  Icon,
  Message,
  Grid,
  Segment
} from "semantic-ui-react";
import { signInWithProvider, resetPassword } from "../../helpers/auth";
import { Link } from "react-router-dom";
import FormField from "../form-field";
import { facebook, google, auth } from "../../config/constants";

function setErrMsg(err) {
  return { loginMsg: err };
}
class Login extends Component {
  state = { loginMsg: null };
  handleSubmit = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrMsg("Invalid username/password.")));
  };

  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() =>
        this.setState(
          setErrMsg(`Password reset email sent to ${this.email.value}.`)
        ))
      .catch(e => this.setState(setErrMsg("Email address not found.")));
  };
  handleDismiss = () => this.setState({ loginMsg: null });
  render() {
    const { loginMsg } = this.state;
    return (
      <Grid verticalAlign="middle" centered style={{ height: "100vh" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>Log in to your account</h1>
          <Segment.Group stacked>
            <Segment>
              <p>Don't have an account ? <Link to="/register">Sign up</Link></p>
            </Segment>
            <Segment>
              <Form onSubmit={this.handleSubmit} error>
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
                <MessageError
                  loginMsg={loginMsg}
                  handleDismiss={this.handleDismiss}
                />
              </Form>
              <Divider horizontal>Or</Divider>
              <ProviderForm provider={google} />
              <br />
              <ProviderForm provider={facebook} />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

const MessageError = ({ loginMsg, handleDismiss, resetPassword }) =>
  loginMsg &&
  <Message icon error onDismiss={handleDismiss}>
    <Icon name="warning circle" />
    <Message.Content>
      <Message.Header>{loginMsg}</Message.Header>
      <a href="#" onClick={resetPassword}>
        Forgot password ?
      </a>
    </Message.Content>
  </Message>;

const ProviderForm = ({ provider }) => {
  let label = provider === google ? "google" : "facebook";
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        signInWithProvider(provider);
      }}
    >
      <Button
        color={label === "google" ? label.concat(" plus") : label}
        type="submit"
      >
        <Icon name={label} /> SIGN IN WITH {label.toLocaleUpperCase()}
      </Button>
    </Form>
  );
};

export default Login;
