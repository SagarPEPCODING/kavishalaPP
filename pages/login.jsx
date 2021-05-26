import React, { Component } from "react";
import Authentication from "components/Authentication/Authentication";
import SEO from "components/SEO";
import Router from "next/router";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.goToHome = () => {
      Router.push("/");
    };
  }
  render() {
    return (
      <div className="loginPage position-relative">
        <SEO title="Login to kavishala" og_url={"/login"} />
        <div className="text-center">
          <button onClick={this.goToHome}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to Home
          </button>
        </div>
        <Authentication />
        <style jsx>{`
          @media only screen and (max-width: 426px) {
            .loginPage {
              margin-top: 0%;
            }
            .loginPage .LoginSignupBtn button {
              width: 45% !important;
            }
          }
          button {
            border-radius: 50px;
            background-color: #00102c;
            color: white;
            padding: 10px;
            width: 44%;
          }
           {
            /* @media only screen and (max-width: 769px) {
            .loginPage {
              margin-top: 15%;
            }
          } */
          }
          div {
            margin-top: 3%;
          }
        `}</style>
      </div>
    );
  }
}
