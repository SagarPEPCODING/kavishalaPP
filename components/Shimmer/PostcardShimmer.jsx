import React, { Component } from "react";
import Line from "components/Shimmer/Line";
import "../postcard.css";
export default class PostcardShimmer extends Component {
  render() {
    return (
      <>
        <div className="postCardLarge hoverEffect">
          <div className="my-card">
            <Line height={"75px"} width={"75px"} />
            <div className="postInfoLarge my-card-body">
              {/* <div className="flex"> */}
              <Line height={"10px"} width={"200px"} />
              <Line height={"10px"} width={"150px"} />
              {/* </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
