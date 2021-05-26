import React, { Component } from "react";
import Api from "Api/Api";
import AdSense from "react-adsense";
import { Context } from "Context/context";

export default class AdBanner extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = { client: null, slot: null };
  }
  componentDidMount() {
    Api.getAdBanner(this.props.type).then((response) => {
      if (response.status === 200) {
        let { slot, client } = response.data[0];
        this.setState({ client: client, slot: slot });
      }
    });
  }

  render() {
    return (
      <>
        <div className="ad-container text-center">
          {this.context.state.userAgent === "web" ? (
            <AdSense.Google
              client={"ca-pub-4584592581913308"}
              slot={"1225002510"}
              style={{ display: "block", width: 728, height: 90 }}
              format=""
            />
          ) : null}
          {this.context.state.userAgent === "mobile" ? (
            <AdSense.Google
              client={"ca-pub-4584592581913308"}
              slot={"7064788024"}
              style={{ display: "block", width: 360, height: 60 }}
              format=""
            />
          ) : null}
        </div>
        <hr />
        <style jsx global>{`
          .ad-container ins:first-child {
            margin: 0 auto;
          }
        `}</style>
      </>
    );
  }
}
