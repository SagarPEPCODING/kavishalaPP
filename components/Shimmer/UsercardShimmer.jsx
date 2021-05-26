import React, { Component } from "react";
import Line from "components/Shimmer/Line";
import "components/UserCard/UserCard.css";

export default class UsercardShimmer extends Component {
  render() {
    return (
      <>
        <div className="user-card text-center hoverEffect">
          <Line height={"104px"} width={"104px"} borderRadius={"50%"} />
          <div className="usercard-info">
            <Line height={"10px"} width={"70px"} />
            <Line height={"10px"} width={"100px"} />
            <Line height={"10px"} width={"100px"} />
          </div>
        </div>
        <style jsx>
          {`
            div.user-card {
              padding: 5px 5em;
            }
          `}
        </style>
      </>
    );
  }
}
