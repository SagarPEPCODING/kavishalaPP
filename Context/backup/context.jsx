import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Auth from 'Api/Auth';
import Api from 'Api/Api';
// first we will make a new context
const Context = React.createContext();
import Router from 'next/router';

// Then create a provider Component
export default class Provider extends Component {
  state = {
    isAuthenticated: false,
    showLoginForm: false,
    showReadIndicator: false,
    userInfo: {},
    languages: null,
    showLoader: false,
    userAgent: 'mobile',
  };

  componentDidMount() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setState({ userAgent: 'mobile' });
    } else {
      this.setState({ userAgent: 'web' });
    }
    if (Auth.isAuthenticated()) {
      if (!Auth.decodedToken().is_writer) {
        Api.userIsWriter().then((response) => {
          if (response.status === 200) {
            let { is_writer } = response.data;
            let decoded_token = Auth.decodedToken();
            decoded_token.is_writer = is_writer;
            localStorage.removeItem('token_decoded');
            localStorage.setItem(
              'token_decoded',
              JSON.stringify(decoded_token)
            );
            this.setState({ userInfo: { ...this.state.userInfo, is_writer } });
          }
        });
      }
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          LoginUser: () => {
            this.setState(
              {
                userInfo: JSON.parse(localStorage.getItem('token_decoded')),
              },
              () => {
                this.setState({
                  isAuthenticated: true,
                });
              }
            );
          },
          LogoutUser: () => {
            Auth.LogoutUser();
            this.setState({
              isAuthenticated: false,
            });
            window.location.reload(false);
          },
          ToggleLoader: () => {
            this.setState({
              showLoader: !this.state.showLoader,
            });
          },
          ShowLoginForm: () => {
            if (window.location.pathname !== '/login') {
              this.setState({
                showLoginForm: !this.state.showLoginForm,
              });
            }
          },
          ShowReadIndicator: () => {
            this.setState({
              showReadIndicator: !this.state.showReadIndicator,
            });
          },
          SaveToken: (token) => {
            var decoded = jwt_decode(token);
            localStorage.setItem('token', token);
            localStorage.setItem('token_decoded', JSON.stringify(decoded));
            this.setState({
              userInfo: decoded,
            });
          },
          setLanguages: (data) => {
            // save language value in the context to be used later
            this.setState({ languages: data });
          },
          makeUserWriter: () => {
            let newUserInfo = this.state.userInfo;
            newUserInfo.is_writer = true;
            // refreshing the context userinfo
            this.setState(
              {
                userInfo: newUserInfo,
              },
              () => {
                //   refreshing the localStorage token value
                localStorage.setItem(
                  'token_decoded',
                  JSON.stringify(newUserInfo)
                );
              }
            );
          },
          getUserAgent: () => {
            let userAgent = 'web';
            if (process.browser) {
              if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                )
              ) {
                userAgent = 'mobile';
              }
            }
            return userAgent;
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export { Context };
