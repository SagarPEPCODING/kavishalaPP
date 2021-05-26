import React, { Component } from "react";
import PostContainer from "components/PostContainer";
import SEO from "components/SEO";
export default class LanguagePosts extends Component {
  static getInitialProps(ctx) {
    return { slug: ctx.query.languageslug };
  }
  render() {
    return (
      <>
        <SEO
          title={`${this.props.slug} Language Posts | Kavishala`}
          og_title={`${this.props.slug} Language Posts | Kavishala`}
          og_description={`${this.props.slug} Language Posts`}
          category={this.props.slug}
          og_url={`/languages/${this.props.slug}`}
        />
        <PostContainer slug={this.props.slug} type={"language"} />
      </>
    );
  }
}
