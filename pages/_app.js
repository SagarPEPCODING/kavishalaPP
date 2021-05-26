import React from "react";
import App from "next/app";
import Provider from "Context/context";
import Layout from "components/Layout";
import Router from "next/router";
import { initGA, logPageView } from "utils/analytics";
import withGA from "next-ga";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "css/style.css";
export default class MyApp extends App {
  componentDidMount() {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}
// pass your GA code as first argument
// export default withGA("UA-155126359-1", Router)(MyApp);
