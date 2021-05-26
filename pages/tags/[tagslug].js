import React, { Component } from "react";
import PostContainer from "components/PostContainer";
import SEO from "components/SEO";
export default class TagPosts extends Component {
  static getInitialProps(ctx) {
    return { slug: ctx.query.tagslug };
  }
  render() {
    return (
      <>
        <SEO
          title={`${this.props.slug} Tag Posts | Kavishala`}
          og_title={`${this.props.slug} Tag Posts | Kavishala`}
          og_description={`${this.props.slug} Tag Posts`}
          og_url={`/tags/${this.props.slug}`}
        />
        <PostContainer slug={this.props.slug} type={"tag"} />
      </>
    );
  }
}
