import React, { Component } from "react";
import Router from "next/router";

export default class ViewMore extends Component {
  constructor(props) {
    super(props);
    this.click = () => {
      if (this.props.link) {
        window.location.href = this.props.link;
      } else {
        Router.push(this.props.href);
      }
    };
  }
  render() {
    return (
      <>
        <button onClick={this.click}>VIEW MORE</button>
        <style jsx>
          {`
            button {
              border-radius: 5px;
              border: 2px solid var(--main-color);
              color: var(--main-color);
              background: transparent;
              font-size: 12px;
            }
            button:hover {
              font-weight: 600;
            }
            @media only screen and (max-width: 426px) {
              button {
                font-size: 10px !important;
              }
            }
          `}
        </style>
      </>
    );
  }
}
