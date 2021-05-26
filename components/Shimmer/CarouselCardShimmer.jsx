import React, { Component } from "react";
import Line from "components/Shimmer/Line";
export default class CarouselCardShimmer extends Component {
  render() {
    return (
      <>
        <div className="text-center hoverEffect">
          <Line height={"104px"} width={"104px"} />
          <div className="usercard-info">
            <Line height={"10px"} width={"70px"} />
            <Line height={"10px"} width={"100px"} />
            <Line height={"10px"} width={"100px"} />
          </div>
        </div>
        <style jsx>
          {`
            div.hoverEffect {
              width: 80%;
              border: 1px solid #eee;
              margin: 5% 0%;
              padding-left: 4em;
            }
          `}
        </style>
      </>
    );
  }
}
