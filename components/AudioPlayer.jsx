import React, { Component } from "react";
export default class AudioPlayer extends Component {
  render() {
    return (
      <>
        <audio controls>
          <source src={this.props.audio_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <style jsx>{`
          audio {
            max-height: 50%;
            max-width: 100%;
          }
        `}</style>
      </>
    );
  }
}
