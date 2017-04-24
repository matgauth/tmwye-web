import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Form, Button, Message, Segment, Grid, Header } from "semantic-ui-react"

import FormField from "../components/form-field"
import ErrorMessage from "../components/error-message"

import { signUp } from "../lib/auth"
import { auth } from "../lib/constants"

export default class extends Component {
  state = {
    emailSent: false,
    msg: null
  }
  handleSignUp = e => {
    e.preventDefault()
    signUp(this.email.value, this.pw.value).catch(e =>
      this.setState({ msg: e.message })
    )
    if (auth.currentUser !== null) {
      auth.currentUser.sendEmailVerification()
      this.setState({ emailSent: true })
    }
  }
  handleDismiss = () => this.setState({ msg: null })
  render() {
    const { emailSent, msg } = this.state
    return (
      <Grid verticalAlign="middle" centered className="login-register">
        <Grid.Column>
          <Header as="h1">Create your account</Header>
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
                    reference={email => (this.email = email)}
                  />
                  <FormField
                    name="pw"
                    type="password"
                    reference={pw => (this.pw = pw)}
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
                <ErrorMessage msg={msg} handleDismiss={this.handleDismiss} />
              </Form>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    )
  }
}
