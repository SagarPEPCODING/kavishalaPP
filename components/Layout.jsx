import React, { Component } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar/Navbar";
import { Context } from "Context/context";
import ScrollPopupOpener from "components/ScrollPopupOpener";
import { SpeedDialAction } from "devextreme-react/speed-dial-action";
import Router from "next/router";
import Header from "components/Header";
import BecomeAWriter from "components/BecomeAWriter";
import AdBanner from "components/AdBanner";
import { LoadPanel } from "devextreme-react";
export default class Layout extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      becomeWriter: null,
    };
    this.submitPost = () => {
      if (this.context.state.isAuthenticated) {
        if (this.context.state.userInfo.is_writer) {
          Router.push("/post/create");
        } else {
          let randomVal = `${Math.floor(Math.random() * 100)}-${Math.floor(
            Math.random() * 100
          )}`;
          this.setState({ becomeWriter: randomVal });
        }
      } else {
        this.context.ShowLoginForm();
      }
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.context.LoginUser();
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="websiteData">
          <Header />
          {/* <AdBanner type="small" /> */}
          <ScrollPopupOpener selector={"footer"} />
          {this.props.children}
          <SpeedDialAction
            icon="edit"
            label=""
            index={3}
            visible={
              this.context.state.userAgent === "mobile" &&
              process.browser &&
              window.location.pathname !== "/post/create"
            }
            onClick={this.submitPost}
            label="Submit a post"
          />
          {this.context.state.isAuthenticated ? (
            <>
              <BecomeAWriter
                mode="hidden"
                clicked={this.state.becomeWriter}
                hiding={() => this.setState({ becomeWriter: null })}
              />
            </>
          ) : null}
          <Footer />
          <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            visible={this.context.state.showLoader}
            showIndicator={true}
            shading={true}
            showPane={true}
            indicatorSrc={"/images/Logo_K2.png"}
          />
          <style jsx>
            {`
              .websiteData {
                padding-top: 5%;
                background-color: white;
              }
              @media (max-width: 769px) {
                .websiteData {
                  padding-top: 9%;
                }
              }
              @media (max-width: 426px) {
                .websiteData {
                  padding-top: 17%;
                   {
                    /* width: 136%; */
                  }
                }
              }
              @media (max-width: 321) {
                .websiteData {
                  padding-top: 20%;
                }
              }
            `}
          </style>
        </div>
      </>
    );
  }
}
