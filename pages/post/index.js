import React, { Component } from "react";
import PostContainer from "components/PostContainer";
import SEO from "components/SEO";
export default class Posts extends Component {
  render() {
    return (
      <>
        <SEO title="Posts | Kavishala" og_url={"/post"} />
        <PostContainer />
      </>
    );
  }
}
