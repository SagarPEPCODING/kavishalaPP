import React, { Component } from "react";
import Api from "Api/Api";
import SuggestionCard from "components/SuggestionCard";
import { Gallery } from "devextreme-react";
import { Context } from "Context/context";
import SlickCarousel from "components/SlickCarousel";
import PostCard from "components/PostCard";
export default class Suggestions extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      title: null,
      icon: null,
    };
    this.loadData = () => {
      var filter = {};
      var title = "";
      var icon = "";
      switch (this.props.type) {
        case "category":
          filter["category"] = this.props.data;
          title = "You'll also like";
          icon = "/icons/heart.svg";
          break;
        case "user":
          filter["user"] = this.props.data;
          title = `More Creations`;
          icon = "/icons/user.svg";
          break;
        case "recent":
          filter["recent"] = true;
          title = `Most recent`;
          icon = "/icons/clock.svg";
          break;
        case "views":
          filter["likes_or_views"] = "views";
          title = `Trending`;
          icon = "/icons/trending.svg";
          break;
        default:
          break;
      }
      this.removeCurrentPost = (data) => {
        return data.filter((rec) => {
          return rec.title !== this.props.postTitle;
        });
      };
      this.setState({ title: title, icon: icon });
      if (this.props.sootradhar) {
        Api.getSootradharSuggestedPosts(filter, 1).then((response) => {
          if (response.status === 200) {
            this.setState({
              posts: [...this.removeCurrentPost(response.data.results)],
            });
          }
        });
      } else {
        Api.getSuggestedPosts(filter, 1).then((response) => {
          if (response.status === 200) {
            this.setState({
              posts: [...this.removeCurrentPost(response.data.results)],
            });
          }
        });
      }
      this.renderItem = (e) => {
        return <SuggestionCard data={e.data} />;
      };
    };
  }
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <>
        <div className="suggestions">
          <h4>
            <img src={this.state.icon} />
            {this.state.title}
          </h4>
          {this.state.posts && this.state.posts.length ? (
            this.context.state.userAgent === "mobile" ? (
              <div className="slick-card-holder">
                <SlickCarousel userAgent={this.context.getUserAgent()}>
                  {this.state.posts
                    ? this.state.posts.map((record) => {
                        return (
                          <div className="carousel-card">
                            <>
                              <PostCard
                                link={record.url}
                                image={record.image}
                                title={record.title}
                                lastModifiedPublishStatus={
                                  record.lastModifiedPublishStatus
                                }
                                author_name={record.author}
                                nextLink={
                                  this.props.sootradhar
                                    ? "/sootradhar/[profile]/[posttitle]"
                                    : "/[username]/[slug]"
                                }
                              />
                            </>
                          </div>
                        );
                      })
                    : null}
                </SlickCarousel>
              </div>
            ) : (
              <div className="suggestion-card-container">
                {(this.state.posts || []).map((post) => {
                  return <SuggestionCard data={post} />;
                })}
              </div>
            )
          ) : (
            <p className="mt-2">No posts</p>
          )}
        </div>

        <style jsx>{`
          .suggestions {
            margin-bottom: 5%;
          }
          .suggestion-card-container{
            padding-left: 10px;
          }
          h4 {
            font-weight: 400;
            color: #ed4730;
          }
          img {
            height: 25px;
            margin-right: 5px;
          }
          @media only screen and (max-width: 426px) {
            h4{
              font-weight: 100 !important;
              margin-top: 40px;
              margin-bottom: -5px;
              text-transform: capitalize;
            }
          }
          }

            .carousel-card {
              padding: 5px;
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
                padding: 5px;
              }
              .float-right {
                margin-right: 8px;
              }
              h3 {
                font-size: 1.3em;
              }
            }

        `}</style>
        <style jsx global>
          {`
            a.suggestion-card:nth-child(odd) {
              background-color: #fdf5f4;
            }
            @media (max-width: 426px) {
              .suggestions .slick-list {
                padding: 0px !important;
              }
            }
          `}
        </style>
      </>
    );
  }
}
