import React, { Component } from "react";
import Router from "next/router";
class Pages extends Component {
  constructor(props) {
    super(props);
    this.clicked = (link) => {
      Router.push(link);
    };
  }
  render() {
    return (
      <>
        <a
          className="col-lg-3 col-6 pointer"
          onClick={() => this.clicked(this.props.data.link)}
        >
          <img src={this.props.data.image} className="hoverEffect" />
        </a>
        <style jsx>
          {`
            .col-6 {
              margin-bottom: 10px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </>
    );
  }
}
export default class SiteContentTiles extends Component {
  constructor(props) {
    super(props);
    this.pages = [
      {
        image: "images/404/interview.png",
        link: "/@kavishala-interviews",
      },
      {
        image: "images/404/labs.png",
        link: "/@kavishala-labs",
      },
      {
        image: "images/404/review.png",
        link: "/@kavishala-reviews",
      },
      {
        image: "images/404/social.png",
        link: "/@kavishala-daily",
      },
      {
        image: "images/404/sootradhar.png",
        link: "/sootradhar",
      },
      {
        image: "images/404/events.png",
        link: "/events",
      },
      {
        image: "images/404/chapters.png",
        link: "/chapters",
      },
      {
        image: "images/404/authors.png",
        link: "/authors",
      },
    ];
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.pages.map((page) => {
            return <Pages data={page} />;
          })}
        </div>
      </div>
    );
  }
}
