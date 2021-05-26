import React, { Component } from "react";

export default class YoutubeEmbedPlayer extends Component {
  render() {
    return (
      <>
        <div className="mx-1">
          <iframe
            width={"100%"}
            height={"100%"}
            src={`https://www.youtube.com/embed/${this.props.link}`}
          ></iframe>
        </div>
      </>
    );
  }
}
