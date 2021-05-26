import React, { Component } from "react";
import Api from "Api/Api";
import { Context } from "Context/context";
export default class SootradharAuthorCircle extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      authors: null,
      visible: false,
    };
  }
  componentDidMount() {
    if (process.browser) {
      if (window.location.pathname === "/") {
        this.setState({ visible: true }, () => {
          Api.getSootradharAuthorsStory().then((response) => {
            if (response.status === 200) {
              this.setState({ authors: response.data[0] });
            }
          });
        });
      }
    }
  }

  render() {
    if (this.state.visible || this.context.state.showFleet) {
      return (
        <>
          <div className="scrollmenu customized-scroll">
            {this.state.authors
              ? this.state.authors.map((author) => {
                  return (
                    <a
                      href={author.url}
                      className="d-inline-flex flex-column mr-1"
                    >
                      <img src={author.image} alt={author.name} />
                      <span className="text-center">{`${
                        author.name.length > 10
                          ? `${author.name.slice(0, 10)}..`
                          : author.name
                      }`}</span>
                    </a>
                  );
                })
              : null}
          </div>
          <style jsx>
            {`
              a {
                text-decoration: none;
              }
              a:hover {
                transform: scale(1.2);
                color: black;
                text-decoration: none;
              }
              span {
                font-size: 12px;
              }
              div.scrollmenu {
                background-color: #f7f7f7;
                overflow: auto;
                white-space: nowrap;
                padding: 30px 2%;
              }
              @media only screen and (max-width: 1025px) {
                div.scrollmenu {
                  padding: 0% 2%;
                }
              }
              @media only screen and (min-width: 769px) {
                div.scrollmenu img {
                  height: 100px !important;
                  width: 100px !important;
                }
                span {
                  font-size: 15px !important;
                }
              }
              @media only screen and (min-width: 426px) {
                div.scrollmenu img {
                  margin-top: 41%;
                }
              }
              div.scrollmenu img {
                display: inline-block;
                color: white;
                text-align: center;
                margin: 5px;
                padding: 3px;
                text-decoration: none;
                border-radius: 50%;
                height: 55px;
                width: 55px;
                border: 2px solid pink;
              }
            `}
          </style>
        </>
      );
    }
    return null;
  }
}
