import React, { Component } from "react";
import { signUp } from "../../helpers/auth";
import { auth } from "../../config/constants";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import "./index.css";

class Register extends Component {
  state = {
    emailSent: false
  };
  handleSignUp = async e => {
    e.preventDefault();
    await signUp(this.email.value, this.pw.value);
    auth.currentUser.sendEmailVerification();
    this.setState({ emailSent: true });
  };
  render() {
    const { emailSent: es } = this.state;
    return (
      <div className="form">
        <h1>Create your account</h1>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
        <Form onSubmit={this.handleSignUp}>
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
          <Button primary type="submit">SIGN UP</Button>
          {es && <p>An email has been sent ! Please check your inbox.</p>}
        </Form>
      </div>
    );
  }
}

export default Register;
