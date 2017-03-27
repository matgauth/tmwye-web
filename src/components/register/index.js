import React, { Component } from "react";
import { signUp } from "../../helpers/auth";
import { auth } from "../../config/constants";
import { Link } from "react-router-dom";
import FormField from "../form-field";
import { Form, Button, Message, Icon, Segment, Grid } from "semantic-ui-react";
function setErrMsg(err) {
  return { registerErr: err.message };
}
class Register extends Component {
  state = {
    emailSent: false,
    registerErr: null
  };
  handleSignUp = e => {
    e.preventDefault();
    signUp(this.email.value, this.pw.value).catch(e =>
      this.setState(setErrMsg(e)));
    if (auth.currentUser !== null) {
      auth.currentUser.sendEmailVerification();
      this.setState({ emailSent: true });
    }
  };
  handleDismiss = () => this.setState({ registerErr: null });
  render() {
    const { emailSent, registerErr } = this.state;
    return (
      <Grid verticalAlign="middle" centered style={{ height: "100vh" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>Create your account</h1>
          <Segment.Group stacked>
            <Segment>
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </Segment>
            <Segment>
              <Form error onSubmit={this.handleSignUp}>
                <Form.Group>
                  <FormField
                    name="email"
                    type="email"
                    label="Email"
                    reference={email => this.email = email}
                  />
                  <FormField
                    name="pw"
                    label="Password"
                    type="password"
                    reference={pw => this.pw = pw}
                  />
                </Form.Group>
                <Button primary type="submit">SIGN UP</Button>
                {emailSent &&
                  <Message
                    warning
                    header="Could you check something!"
                    list={[
                      "That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail."
                    ]}
                  />}
                <RegisterMessage
                  registerErr={registerErr}
                  handleDismiss={this.handleDismiss}
                />
              </Form>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

const RegisterMessage = ({ registerErr, handleDismiss }) =>
  registerErr &&
  <Message icon error onDismiss={handleDismiss}>
    <Icon name="warning circle" />
    <Message.Content>
      <Message.Header>{registerErr}</Message.Header>
    </Message.Content>
  </Message>;

export default Register;
