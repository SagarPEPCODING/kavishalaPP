import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import credentials from "Social-Login-Credentials";
import Api from "Api/Api";
import Utils from "Utils";
import "./sociallogin.css";
export default class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.googleResponse = (response) => {
      Api.SocialLogin({
        user: {
          email: response.profileObj.email,
          username: response.profileObj.name,
          provider: "google",
          token: response.accessToken,
        },
      }).then((res) => {
        if (res) {
          if (res.status === 200) {
            this.props.successAuth(res.data.token);
          } else if (res.status === 400) {
            Utils.notify(res.data.non_field_errors[0], "warning", 5000);
          } else {
            Utils.notify("Something Went Wrong !!", "error", 5000);
          }
        } else {
          Utils.notify("Something Went Wrong !!", "error");
        }
      });
    };
    this.responseFacebook = (response) => {
      Api.SocialLogin({
        user: {
          email: response.email,
          username: response.name,
          provider: "facebook",
          token: response.accessToken,
        },
      }).then((res) => {
        if (res) {
          if (res.status === 200) {
            this.props.successAuth(res.data.token);
          } else if (res.status === 400) {
            Utils.notify(res.data.non_field_errors[0], "warning", 5000);
          } else {
            Utils.notify("Something Went Wrong !!", "error", 5000);
          }
        } else {
          Utils.notify("Something Went Wrong !!", "error");
        }
      });
    };
  }
  render() {
    return (
      <div className="social-signin text-center row">
        <div className="col-12 google-btn">
          <GoogleLogin
            clientId={credentials.google.clientId}
            buttonText="Sign in with Google"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            className={"google-login-btn"}
          />
        </div>
        <div className="col-12">
          <FacebookLogin
            appId={credentials.facebook.clientId}
            autoLoad={false}
            textButton={"Sign in with Facebook"}
            fields="name,email,picture"
            callback={this.responseFacebook}
            icon="fa-facebook"
          />
        </div>
        <style jsx>
          {`
            .google-btn {
              margin-bottom: 20px;
            }
          `}
        </style>
      </div>
    );
  }
}
