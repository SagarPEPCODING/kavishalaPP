import React, { Component } from "react";
import Router from "next/router";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = (e) => {
      e.preventDefault();
      Router.push({
        pathname: "/search",
        query: { q: e.target.search.value },
      });
    };
    this.search = () => {
      Router.push("/search");
    };
  }
  render() {
    return (
      <>
        <button className="pointer" onClick={this.search}>
          <i className="fa fa-search"></i>
        </button>
        <style jsx>{`
          button {
            left: 0px;
            top: 3px;
            border: unset;
            background: white;
            background: transparent;
            font-size: 18px;
            color: #757575;
            padding: 15px 10px 10px 10px;
          }
          button:focus {
            outline: unset;
          }

          button:hover {
            color: red;
          }
        `}</style>
      </>
    );
  }
}
