import React, { Component } from "react";
import Api from "Api/Api";
import Utils from "Utils";
import Auth from "Api/Auth";
import { Context } from "Context/context";
import Router from "next/router";

export default class Signup extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
    this.showHidePassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };
    this.successAuth = (token) => {
      this.context.ShowLoginForm();
      Auth.LoginUser(token);
      this.context.LoginUser();
      window.location = Auth.getLoginSuccessUrl();
      this.props.successAuth();
    };
    this.submitHandler = (e) => {
      e.preventDefault();
      if (e.target.password.value !== e.target.cnfpswd.value) {
        Utils.notify("Confirm password doesn't match", "error");
      } else {
        var data = {
          user: {
            username: e.target.username.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            // type: e.target.type.value,
            password: e.target.password.value,
          },
        };
        Api.registerUser(data).then((response) => {
          if (response) {
            if (response.status === 201) {
              this.successAuth(response.data.token);
            } else if (response.status === 400) {
              Utils.notify(
                response.data[Object.keys(response.data)[0]][0],
                "warning"
              );
            }
          } else {
            Utils.notify("Something Went Wrong !!", "error");
          }
        });
      }
    };
  }
  render() {
    return (
      <div className="login-signup-container">
        <div className="row">
          <div className="col-lg-12">
            <form
              className="form"
              name="signup-form"
              onSubmit={this.submitHandler}
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">person</i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="username"
                  required={true}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">mail</i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  required={true}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">phone</i>
                  </span>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number"
                  required={true}
                  name="phone"
                  pattern="\d{10,15}"
                  title={" Please enter numbers between range 10-15"}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">lock_outline</i>
                  </span>
                </div>
                <input
                  type={`${this.state.showPassword ? "text" : "password"}`}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  required={true}
                  style={{ marginRight: 5 }}
                  minlength="8"
                />
              </div>

              <div className="input-group position-relative">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">lock_outline</i>
                  </span>
                </div>
                <input
                  type={`${this.state.showPassword ? "text" : "password"}`}
                  className="form-control"
                  placeholder="Confirm Password"
                  name="cnfpswd"
                  required={true}
                />
                <i
                  className="material-icons showPassword position-absolute"
                  onClick={this.showHidePassword}
                  title={this.state.showPassword ? "Hide" : "Show"}
                >
                  {this.state.showPassword
                    ? "visibility_off"
                    : "remove_red_eye"}
                </i>
              </div>
              <div className="footer text-center login-btn">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    margin: "0 auto",
                    borderRadius: 50,
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
