import React, { Component } from "react";
import Api from "Api/Api";
import SlickCarousel from "components/SlickCarousel";
import YoutubeEmbedPlayer from "components/YoutubeEmbedPlayer";
import ViewMore from "components/ViewMore";
import { Context } from "Context/context";

export default class YoutubeVideoCarousel extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      videos: null,
    };
  }
  componentDidMount() {
    Api.getYoutubeVideos().then((response) => {
      if (response.status === 200) {
        this.setState({
          videos: response.data,
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className="slick-card-holder">
          <h3 className="d-inline-block">{"Kavishala on YouTube"}</h3>
          <div className="float-right mt-4">
            <ViewMore
              link={"https://www.youtube.com/channel/UCI9cjrcfqrkONnRZZPn1KNQ"}
            />
          </div>
          <SlickCarousel
            slidesToShow={this.context.getUserAgent() == "mobile" ? 1 : 3}
          >
            {(this.state.videos || []).map((video) => {
              return <YoutubeEmbedPlayer link={video.embed_link} />;
            })}
          </SlickCarousel>
        </div>
        <style jsx>
          {`
            .carousel-card {
              padding: 5px;
            }
            h3 {
              font-size: 1.6em;
              font-weight: 500;
              color: #00102c;
              padding-top: 20px;
            }
            .slick-card-holder:nth-child(odd) {
              background-color: #f9f9f9;
            }
            .slick-card-holder:nth-child(even) {
              background-color: white;
            }
            .slick-card-holder {
              padding: 5px 72px;
            }
            .float-right {
              margin-right: 30px;
              font-size: 14px;
            }
            @media (max-width: 426px) {
              .slick-card-holder {
                padding: 5px 20px;
              }
              .float-right {
                margin-right: 8px;
              }
              h3 {
                font-size: 1.1em;
              }
            }
          `}
        </style>
      </>
    );
  }
}
