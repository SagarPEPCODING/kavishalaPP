import React, { Component } from "react";

export default class ReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false,
    };
    this.clicked = () => {
      this.setState({ readMore: !this.state.readMore });
    };
  }
  render() {
    return (
      <>
        <div className={`${this.state.readMore ? null : "mobileAbout"}`}>
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.about || "A kavishala writer",
            }}
          />
        </div>
        <a href="javascript:void(0)" onClick={this.clicked}>
          {this.state.readMore ? "Read Less..." : "Read More..."}
        </a>
        <style jsx>{`
          .mobileAbout {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        `}</style>
      </>
    );
  }
}
