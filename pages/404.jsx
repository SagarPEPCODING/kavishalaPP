import React, { Component } from "react";
import SEO from "components/SEO";
import Router from "next/router";
import SiteContentTiles from "components/SiteContentTiles";

export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = (e) => {
      e.preventDefault();
      Router.push({
        pathname: "/search",
        query: { q: e.target.q.value },
      });
    };
  }
  render() {
    return (
      <>
        <SEO title="Not found" />
        <div className="text-center not-found">
          <h1>This page seems to be missing...</h1>
          <p>
            We couldn't find what you were looking for. <br />
            You could try searching for something else you love!
          </p>
          <div id="search-container">
            <form
              className="form-horizontal dropdown"
              role="form"
              name="search"
              action="/search/"
              autoComplete="off"
              onSubmit={this.submitHandler}
            >
              <div className="position-relative d-inline">
                <button
                  className="fa fa-search fa-wp-neutral-2 position-absolute"
                  type="submit"
                ></button>
                <input
                  id="search-query"
                  placeholder="Search Poetry &amp; Stories &amp; Authors"
                  name="q"
                  type="text"
                  role="search"
                  spellCheck="false"
                  aria-label="Search Stories &amp; People"
                  defaultValue=""
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
          <div className="message">
            <h2>Are You Looking For...</h2>
          </div>
          <SiteContentTiles />
          <style jsx>
            {`
              .position-absolute {
                left: 5px;
                top: -2px;
              }
              #search-query {
                height: 47px;
                border: none;
                width: 65%;
                text-align: center;
                background: #fff;
                border-radius: 5px;
                margin-bottom: 57px;
                padding: 0 30px;
                color: #6f6f6f;
                font-size: 16px;
                border: 1px solid #eaeaea;
                font-family: fantasy;
              }
              .not-found {
                font-family: "cursive";
                color: "gray";
                margin-top: 6%;
              }
              .not-found h1 {
                font-size: 48px;
              }
              .not-found p {
                font-size: 24px;
              }
              #search-container span {
                font-size: 21px;
              }
              button {
                background: white;
                border: unset;
                font-size: 18px;
              }
              button:focus {
                outline: unset;
              }
              .not-found .message {
                border: 1px solid gray;
                margin: 20px 10%;
                width: 80%;
              }
              @media (max-width: 426px) {
                h1 {
                  font-size: 30px !important;
                }
                p {
                  font-size: 18px !important;
                }
                #search-query {
                  font-size: 12px !important;
                }
                h2 {
                  font-size: 25px !important;
                }
              }
            `}
          </style>
        </div>
      </>
    );
  }
}
