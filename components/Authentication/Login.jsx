import React, { Component } from 'react';
import Api from 'Api/Api';
import Utils from 'Utils';
import ForgetPassword from 'components/Authentication/ForgetPassword/ForgetPassword';
import { Context } from 'Context/context';
import Router from 'next/router';
import Auth from 'Api/Auth';

export default class Login extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showForm: true,
    };
    this.showHidePassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };
    this.successAuth = (token) => {
      this.context.ShowLoginForm();
      this.context.SaveToken(token);
      this.context.LoginUser();
      window.location = Auth.getLoginSuccessUrl();
      this.props.successAuth();
    };
    this.submitHandler = (e) => {
      e.preventDefault();
      Api.loginUser(e.target.email.value, e.target.password.value).then(
        (response) => {
          console.log('this is my respponse.....');
          console.log(response);
          if (response) {
            if (response.status === 200) {
              this.successAuth(response.data.token);
            } else if (response.status === 400) {
              Utils.notify(response.data.non_field_errors[0], 'warning', 5000);
            }
          } else {
            Utils.notify('Something Went Wrong !!', 'error', 5000);
          }
        }
      );
    };
  }
  render() {
    return (
      <div className='login-signup-container'>
        <div className='row'>
          <div className='col-lg-12'>
            <form
              className='form'
              name='login-form'
              onSubmit={this.submitHandler}
            >
              <div class='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  // placeholder="Email"
                  id='email'
                  required={true}
                />
              </div>
              <div class='form-group position-relative'>
                <label htmlFor='password'>Password</label>
                <input
                  type={`${this.state.showPassword ? 'text' : 'password'}`}
                  className='form-control'
                  // placeholder="Password"
                  required={true}
                  id='password'
                />
                <i
                  className='pointer material-icons showPassword position-absolute'
                  onClick={this.showHidePassword}
                  title={this.state.showPassword ? 'Hide' : 'Show'}
                >
                  {this.state.showPassword
                    ? 'visibility_off'
                    : 'remove_red_eye'}
                </i>
              </div>
              {/* <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">lock_outline</i>
                  </span>
                </div>
                <input
                  type={`${this.state.showPassword ? "text" : "password"}`}
                  // style={{ marginLeft: 5 }}
                  className="form-control"
                  placeholder="Password"
                  required={true}
                  id="password"
                />
                <i
                  className="material-icons showPassword"
                  onClick={this.showHidePassword}
                  title={this.state.showPassword ? "Hide" : "Show"}
                >
                  {this.state.showPassword
                    ? "visibility_off"
                    : "remove_red_eye"}
                </i>
              </div> */}
              <ForgetPassword />
              <div className='footer text-center login-btn'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{
                    margin: '0 auto',
                    borderRadius: 50,
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
