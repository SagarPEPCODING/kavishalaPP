import React, { Component } from "react";

export default class ReadIndicator extends Component {
  render() {
    return (
      <div className="progress-container">
        <div className="progress-bar" id="myBar"></div>
        <style jsx>
          {`
            /* The progress container (grey background) */
            .progress-container {
              width: 100%;
              height: 8px;
              background: #ccc;
              position: fixed;
              top: 73px;
            }
            @media (max-width: 426px) {
              .progress-container {
                top: 64px;
              }
            }

            /* The progress bar (scroll indicator) */
            .progress-bar {
              height: 100%;
              background: #00102c !important;
              width: 0%;
            }
          `}
        </style>
      </div>
    );
  }
}
if (process.browser) {
  function myFunction() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    try {
      document.getElementById("myBar").style.width = scrolled + "%";
    } catch (error) {}
  }

  window.onscroll = function () {
    myFunction();
  };
}
