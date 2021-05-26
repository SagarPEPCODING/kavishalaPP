import React, { Component } from "react";
import SlickCarousel from "components/SlickCarousel";
import Api from "Api/Api";
import { Context } from "Context/context";
import PostCard from "components/PostCard";
import ViewMore from "components/ViewMore";
import UserCard from "components/UserCard/UserCard";

export default class CarouselPostsUsers extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    if (this.props.user) {
      Api.getAllUsers(this.props.filters, 1).then((response) => {
        if (response.status === 200) {
          this.setState({
            data: response.data.results,
          });
        }
      });
    } else {
      Api.getAllPosts(this.props.filters, 1).then((response) => {
        if (response.status === 200) {
          this.setState({
            data: response.data.results,
          });
        }
      });
    }
  }

  render() {
    return (
      <>
        <div className="slick-card-holder">
          <h3 className="d-inline-block">{this.props.heading}</h3>
          <div className="float-right mt-4">
            <ViewMore href={this.props.seeMoreLink} />
          </div>
          <SlickCarousel userAgent={this.context.getUserAgent()}>
            {this.state.data
              ? this.state.data.map((record) => {
                  return (
                    <div className="carousel-card">
                      <>
                        {this.props.user ? (
                          <UserCard
                            image={record.image}
                            bio={record.raw_bio}
                            featured={record.featured}
                            username={record.username}
                            link={`/${record.slug}`}
                            nextLink="/[username]"
                          />
                        ) : (
                          <PostCard
                            link={record.url}
                            image={record.image}
                            title={record.title}
                            category={record.category}
                            lastModifiedPublishStatus={
                              record.lastModifiedPublishStatus
                            }
                            author_name={record.author.username}
                            nextLink={"/[username]/[slug]"}
                          />
                        )}
                      </>
                    </div>
                  );
                })
              : null}
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
                font-size: 1.3em;
              }
            }
          `}
        </style>
      </>
    );
  }
}
