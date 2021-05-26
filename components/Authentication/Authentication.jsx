import React, { Component } from "react";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import SocialLogin from "components/Authentication/SocialLogin";
import "./loginsignup.css";
import { Context } from "Context/context";
import Router from "next/router";
import Auth from "Api/Auth";

export default class Authentication extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      type: null,
    };
    this.successAuth = (token) => {
      if (token) {
        this.context.ShowLoginForm();
        this.context.SaveToken(token);
        this.context.LoginUser();
        window.location = Auth.getLoginSuccessUrl();
      }
      this.setState({ type: null });
    };
    this.renderComponents = () => {
      switch (this.state.type) {
        case "Login":
          return <Login successAuth={this.successAuth} />;
        case "Signup":
          return <Signup successAuth={this.successAuth} />;
        default:
          return <SocialLogin successAuth={this.successAuth} />;
      }
    };
    this.renderHeading = () => {
      switch (this.state.type) {
        case "Login":
          return "Login with Kavishala";
        case "Signup":
          return "Signup with Kavishala";
        default:
          return "Login or Signup to Kavishala";
      }
    };
  }
  render() {
    return (
      <div className="authentication-first-page">
        <h4 className="text-center">{this.renderHeading()}</h4>
        <div className="authentication-content">
          {this.renderComponents()}
          {this.state.type ? null : (
            <>
              <div className="flex hr-with-text">
                <div className="horizontal-line"></div>
                <span>OR</span>
                <div className="horizontal-line"></div>
              </div>
              <div className="text-center LoginSignupBtn">
                <button
                  className="pointer"
                  onClick={() => this.setState({ type: "Login" })}
                >
                  Login with email
                </button>
              </div>
            </>
          )}

          {this.state.type ? null : (
            <div className="text-center">
              <span
                className="pointer action-message"
                onClick={() => this.setState({ type: "Signup" })}
              >
                New user? <span>Signup</span> here.
              </span>
            </div>
          )}

          {!this.state.type ? null : (
            <div className="text-center">
              <span
                className="pointer font-weight-bold action-message"
                onClick={() => this.setState({ type: null })}
              >
                Go back
              </span>
            </div>
          )}
        </div>

        <style jsx>{`
          .authentication-first-page {
            padding: 40px 0px;
          }
          h4 {
            font-weight: 700;
          }
          .LoginSignupBtn button {
            width: 42%;
            color: white;
            background-color: #00102c;
            border-radius: 50px;
            padding: 10px;
            margin: 25px;
          }
          .horizontal-line {
            width: 45%;
            border-bottom: 1px solid #eee;
            margin-bottom: 9px;
          }
          .hr-with-text {
            margin-bottom: 10px;
            width: 42%;
            margin: 0 auto;
          }
          .action-message {
            margin-top: 10px;
          }
          .action-message span {
            color: darkcyan;
          }
          .action-message:hover {
            font-weight: 500;
          }
          @media only screen and (max-width: 426px) {
            .LoginSignupBtn button {
              width: 65%;
            }
          }
        `}</style>
      </div>
    );
  }
}
