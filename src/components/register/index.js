import React, { Component } from "react";
import { signUp } from "../../helpers/auth";
import { auth } from "../../config/constants";
import { Link } from "react-router-dom";
import FormField from "../form-field";
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
          <Button primary type="submit">SIGN UP</Button>
          {es && <p>An email has been sent ! Please check your inbox.</p>}
        </Form>
      </div>
    );
  }
}

export default Register;
