import React, { Component } from "react";
import Api from "Api/Api";
import PostCardLarge from "./PostcardLarge";
import Filters from "components/Filters/Filters";
import LoadMore from "components/LoadMore";
import PostcardShimmer from "components/Shimmer/PostcardShimmer";
import Utils from "Utils";
export default class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      count: null,
      countOnPage: null,
      filters: null,
    };

    this.loadPosts = (page = 1) => {
      Api.getAllPosts(this.state.filters, page).then((response) => {
        if (response.status === 200) {
          if (page === 1) {
            this.setState({
              posts: response.data.results,
              count: response.data.count,
              countOnPage: response.data.results.length,
            });
          } else {
            this.setState({
              posts: [...this.state.posts, ...response.data.results],
            });
          }
        }
      });
    };

    this.postRenderer = () => {
      if (this.state.posts) {
        if (this.state.posts.length) {
          return this.state.posts.map((post) => {
            return (
              <PostCardLarge
                id={post.id}
                key={post.id}
                link={post.url}
                image={post.image}
                title={post.title}
                tag={post.tag}
                category={post.category}
                readtime={post.readtime}
                content={post.raw_content}
                lastModifiedPublishStatus={post.lastModifiedPublishStatus}
                viewed_by={post.viewed_by}
                liked_by={post.liked_by}
                shared_by={post.shared_by}
                author_name={post.author.username}
                nextLink={"/[username]/[slug]"}
              />
            );
          });
        } else {
          return <h4>No posts</h4>;
        }
      } else {
        return Utils.rangeGenerator(12).map(() => {
          return <PostcardShimmer />;
        });
      }
    };

    this.filterPosts = (filters) => {
      this.setState({ filters: filters }, () => {
        this.loadPosts();
      });
    };
    this.clearFilter = () => {
      this.setState({ filters: null }, () => {
        this.loadPosts();
      });
    };
    this.pageChanged = (page) => {
      this.loadPosts(page);
    };
  }
  componentDidMount() {
    let filters = {};
    switch (this.props.type) {
      case "language":
        filters.language = this.props.slug;
        break;
      case "category":
        filters.category = this.props.slug;
        break;
      case "tag":
        filters.tag = this.props.slug;
        break;
      default:
        filters = null;
        break;
    }
    this.setState({ filters }, () => {
      this.loadPosts();
    });
  }

  render() {
    return (
      <div className="contentBody">
        {this.props.info ? (
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: this.props.info.description,
            }}
          />
        ) : null}
        <Filters
          getFilterValue={this.filterPosts}
          clearFilterValue={this.clearFilter}
          fields={["tag", "category", "title", "language"]}
          sort={[
            { name: "Most Liked", field: "likes", param: "likes_or_views" },
            { name: "Most Viewed", field: "views", param: "likes_or_views" },
          ]}
        />
        {this.postRenderer()}
        <LoadMore
          totalRecords={this.state.count}
          recordOnPage={this.state.countOnPage}
          pageChanged={this.pageChanged}
        />
        <style jsx>{`
          .posts-list {
            margin: 5rem 25%;
          }
          @media (max-width: 768px) {
            .posts-list {
              margin: 5rem 5%;
            }
          }
          .description {
            background-image: url(${this.props.info && this.props.info.image});
            min-height: 150px;
            color: white;
            padding: 10px;
            margin: 10px 0px;
          }
        `}</style>
      </div>
    );
  }
}
