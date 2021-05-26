import React, { Component } from "react";

export default class Line extends Component {
  render() {
    return (
      <>
        <div className="animate"></div>
        <style jsx>
          {`
            div {
              height: ${this.props.height};
              margin-top: 10px;
              width: ${this.props.width};
              border-radius: ${this.props.borderRadius};
            }
            .animate {
              animation: shimmer 2s infinite;
              background: linear-gradient(
                to right,
                #eff1f3 4%,
                #e2e2e2 25%,
                #eff1f3 36%
              );
              background-size: 1000px 100%;
            }
            @keyframes shimmer {
              0% {
                background-position: -1000px 0;
              }
              100% {
                background-position: 1000px 0;
              }
            }
          `}
        </style>
      </>
    );
  }
}
