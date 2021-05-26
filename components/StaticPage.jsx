import React, { Component } from "react";

export default class index extends Component {
  render() {
    return this.props.data ? (
      <>
        <div className="">
          <h1 className="text-capitalize">{this.props.data.title}</h1>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{
              __html: this.props.data.content,
            }}
          />
        </div>
      </>
    ) : null;
  }
}
