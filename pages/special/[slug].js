import React, { Component } from "react";
import Api from "Api/Api";
import PostCardLarge from "components/PostcardLarge";
import SEO from "components/SEO";

export default class SpecialPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  static getInitialProps(ctx) {
    return Api.getSpecialPosts(ctx.query.slug).then((response) => {
      if (response.status == 200) {
        return { data: response.data };
      }
    });
  }
  componentDidMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data[0] });
    }
  }

  render() {
    if (this.state.data) {
      return (
        <>
          <SEO
            title={`${this.state.data.title} | Kavishala`}
            og_title={`${this.state.data.title} | Kavishala`}
            og_image={this.state.data.image}
            og_description={this.state.data.description}
            og_url={`/special/${this.state.data.slug}`}
          />
          <div className="contentBody sootradharSpecialsContainer text-white">
            <div className="profileContainer">
              <div className="container SDAprofile flex">
                <div className="SDAinfo text-capitalize">
                  <h2>{this.state.data.title}</h2>
                </div>
              </div>
            </div>
          </div>
          <main className="SDAbody container">
            <div
              className="py-3"
              dangerouslySetInnerHTML={{
                __html: this.state.data.description || "A Kavishala Author",
              }}
            />
            <section className="SDAposts">
              <h4>Poems</h4>
              <hr />
              {this.state.data.posts.map((post) => {
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
              })}
            </section>
          </main>
          <style jsx>{`
            .sootradharSpecialsContainer {
              margin-left: 0% !important;
              margin-right: 0% !important;
              background-image: url(${this.state.data.image});
              background-size: contain;
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
            @media only screen and (max-width: 426px) {
              .SDAinfo {
                padding-left: 15px;
              }
            }
          `}</style>
        </>
      );
    }
    return null;
  }
}
