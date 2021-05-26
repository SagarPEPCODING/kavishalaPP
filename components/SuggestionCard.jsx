import React, { Component } from "react";
import Link from "next/link";
export default class SuggestionCard extends Component {
  render() {
    return (
      <>
        <Link as={this.props.data.url} href={"/[username]/[slug]"}>
          <a className="suggestion-card hoverEffect">
            <div className="suggestions-img">
              <img
                src={this.props.data.image || "/images/kavishala_logo.png"}
                alt={`${this.props.data.title}'s image`}
              />
            </div>
            <div className="post-desc">
              <h4>{this.props.data.title}</h4>
              <p className="author-date mb-0">
                <span>{this.props.data.author}</span>
              </p>
            </div>
          </a>
        </Link>
        <style jsx>
          {`
            .suggestion-card {
              display: flex;
              margin: 10px 0px;
              text-decoration: none;
              color: initial;
              background: #fefefe;
              padding: 5px;
              border-radius: 5px;
              max-width: 360px;
            }
            .suggestion-card img {
              max-height: 100%;
              max-width: 100%;
              border-radius: 5px;
            }
            .suggestions-img {
              width: 55px;
              height: 50px;
            }
            .post-desc {
              display: flex;
              flex-direction: column;
              padding-left: 5px;
            }
            .post-desc h4 {
              font-size: 16px;
              height: 25px;
            }
            .author-date {
              font-size: 12px;
            }
            @media only screen and (max-width: 769px) {
              .suggestions-img {
                width: 100%;
                height: 100px;
              }
              .post-desc h4 {
                height: 35px;
                white-space: break-spaces;
                overflow: hidden !important;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .suggestion-card {
                flex-direction: column;
                width: 175px;
                text-align: initial;
              }
              .post-desc {
                padding: 8px 0px;
              }
            }
          `}
        </style>
      </>
    );
  }
}
