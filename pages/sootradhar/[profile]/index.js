import React, { Component } from "react";
import Api from "Api/Api";
import PostCardLarge from "components/PostcardLarge";
import SEO from "components/SEO";
import LoadMore from "components/LoadMore";
import PostcardShimmer from "components/Shimmer/PostcardShimmer";
import Utils from "Utils";
import Share from "components/Share";
var authorBackground = "/images/sootrdhar_background.png";

export default class SootradharAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poems: null,
      count: null,
      countOnPage: null,
      page: 1,
    };
    this.pageChanged = (page) => {
      this.setState({ page: page }, () => {
        this.loadAuthorPoems(page);
      });
    };
    this.loadAuthorPoems = (page = 1) => {
      Api.getSootradharAuthorPoems(this.props.poet_slug, page).then(
        (response) => {
          if (response.status == 200) {
            if (this.state.page === 1) {
              this.setState({
                poems: response.data.results,
                count: response.data.count,
                countOnPage: response.data.results.length,
              });
            } else {
              this.setState({
                poems: [...this.state.poems, ...response.data.results],
              });
            }
          }
        }
      );
    };
  }
  static getInitialProps(ctx) {
    return Api.getSootradharAuthorInfo(ctx.query.profile).then((response) => {
      if (response.status == 200) {
        return { author: response.data, poet_slug: ctx.query.profile };
      }
    });
  }

  componentDidMount() {
    this.loadAuthorPoems();
  }

  render() {
    return (
      <>
        <SEO
          title={`${this.props.author.name} | Kavishala Sootradhar`}
          og_title={`${this.props.author.name} | Kavishala Sootradhar`}
          og_image={this.props.author.image}
          og_description={this.props.author.raw_bio}
          og_url={`/sootradhar/${this.props.author.slug}`}
          category={this.props.author.tags}
        />
        <div className="contentBody sootradharAuthorContainer text-white">
          <div className="profileContainer">
            <div className="container SDAprofile flex">
              <img
                src={this.props.author.image}
                alt={`${this.props.author.name}'s image`}
              />
              <div className="SDAinfo">
                <h2>{this.props.author.name}</h2>
                <Share title={this.props.author.name} type="button" />
              </div>
            </div>
          </div>
        </div>
        <main className="SDAbody container">
          <div
            className="py-3"
            dangerouslySetInnerHTML={{
              __html: this.props.author.bio || "A Kavishala Author",
            }}
          />
          <section className="SDAposts">
            <h4>Poems</h4>
            <hr />
            {this.state.poems
              ? this.state.poems.map((post) => {
                  return (
                    <PostCardLarge
                      id={post.id}
                      key={post.id}
                      link={post.url}
                      image={post.image}
                      title={post.title}
                      tag={post.tag}
                      readtime={post.readtime}
                      content={post.raw_content}
                      lastModifiedPublishStatus={post.lastModifiedPublishStatus}
                      viewed_by={post.viewed_by}
                      liked_by={post.liked_by}
                      shared_by={post.shared_by}
                      author_name={post.author.name}
                      nextLink={"/sootradhar/[profile]/[posttitle]"}
                    />
                  );
                })
              : Utils.rangeGenerator(12).map((index) => {
                  return <PostcardShimmer key={index} />;
                })}
            <LoadMore
              totalRecords={this.state.count}
              recordOnPage={this.state.countOnPage}
              pageChanged={this.pageChanged}
            />
          </section>
        </main>
        <style jsx>{`
          .sootradharAuthorContainer {
            margin-left: 0% !important;
            margin-right: 0% !important;
            background-image: url(${authorBackground});
          }
          .SDAprofile img {
            height: 150px;
            width: 150px;
            border-radius: 50%;
            border: 5px solid gray;
          }
          .SDAprofile {
            padding: 50px 0px;
          }
          .SDAinfo {
            padding-top: 35px;
            text-transform: capitalize;
            margin-left: 20px;
          }
        `}</style>
      </>
    );
  }
}
