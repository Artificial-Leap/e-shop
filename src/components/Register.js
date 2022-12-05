import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
    };
  }

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  register = (e) => {
    e.preventDefault();

    const { email, username, password } = this.state;
    if (!email || !username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.register(email, username, password).then((msg) => {
      if (msg !== "ok") {
        this.setState({ error: msg });
      }
    });
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.register}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Username: </label>
                <input
                  className="input"
                  type="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <Link
                  to="/login"
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Login
                </Link>
                <button className="button is-primary is-outlined is-pulled-right">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Navigate to="/products" />
    );
  }
}

export default withContext(Register);
