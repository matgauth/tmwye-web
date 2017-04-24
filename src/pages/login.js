import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Form,
  Divider,
  Icon,
  Grid,
  Segment,
  Header
} from "semantic-ui-react"

import FormField from "../components/form-field"
import ErrorMessage from "../components/error-message"

import { signInWithProvider, resetPassword } from "../lib/auth"
import { facebook, google, auth } from "../lib/fb"

export default class extends Component {
  state = { msg: null }
  handleSubmit = e => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(this.email.value, this.pw.value)
      .catch(e => this.setState({ msg: e.message }))
  }

  resetPassword = async () => {
    try {
      await resetPassword(this.email.value)
      this.setState({
        msg: `Password reset email sent to ${this.email.value}.`
      })
    } catch (e) {
      this.setState({ msg: e.message })
    }
  }
  handleDismiss = () => this.setState({ msg: null })
  render() {
    const { msg } = this.state
    return (
      <Grid verticalAlign="middle" centered className="login-register">
        <Grid.Column>
          <Header as="h1">
            Log in to your account
          </Header>
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
                    reference={email => (this.email = email)}
                  />
                  <FormField
                    name="pw"
                    type="password"
                    reference={pw => (this.pw = pw)}
                  />
                </Form.Group>
                <Button primary type="submit">SIGN IN</Button>
                <p>
                  <a href="#" onClick={this.resetPassword}>
                    Forgot your password ?
                  </a>
                </p>
                <ErrorMessage msg={msg} handleDismiss={this.handleDismiss} />
              </Form>
              <Divider horizontal>Or</Divider>
              <ProviderForm provider={google} />
              <br />
              <ProviderForm provider={facebook} />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

const ProviderForm = ({ provider }) => {
  let label = provider === google ? "google" : "facebook"
  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        signInWithProvider(provider)
      }}
    >
      <Button
        color={label === "google" ? label.concat(" plus") : label}
        type="submit"
      >
        <Icon name={label} /> SIGN IN WITH {label.toUpperCase()}
      </Button>
    </Form>
  )
}
