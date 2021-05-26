import React, { Component } from "react";
import Slider from "react-slick";
import { Context } from "Context/context";
import CarouselCardShimmer from "components/Shimmer/CarouselCardShimmer";
import Utils from "Utils";
export default class SlickCarousel extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.props.slidesToShow || 6,
      slidesToScroll: 1,
      touchMove: true,
      infiniteModeDecided: null,
      arrows: true,
      centerMode: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    var newState = {};
    if (!state.infiniteModeDecided) {
      if (props.children) {
        if (
          props.children.length < (props.slidesToShow || state.slidesToShow)
        ) {
          newState.infinite = false;
          newState.infiniteModeDecided = "changed";
        }
      }
      if (props.userAgent === "mobile") {
        newState.arrows = false;
        newState.centerMode = true;
        newState.slidesToShow = 1;
      }
      return newState;
    }
  }

  render() {
    return (
      <>
        <Slider {...this.state}>
          {this.props.children
            ? this.props.children
            : Utils.rangeGenerator(6).map((index) => {
                return <CarouselCardShimmer />;
              })}
        </Slider>
        <style jsx global>
          {`
            .slick-next:before,
            .slick-prev:before {
              color: var(--main-color);
            }
          `}
        </style>
      </>
    );
  }
}
