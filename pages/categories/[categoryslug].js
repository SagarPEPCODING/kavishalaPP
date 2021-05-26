import React, { Component } from "react";
import PostContainer from "components/PostContainer";
import SEO from "components/SEO";
import Api from "Api/Api";
export default class CategoryPosts extends Component {
  static getInitialProps(ctx) {
    return Api.getCategoryInfo(ctx.query.categoryslug).then((response) => {
      if (response.status === 200) {
        return {
          slug: ctx.query.categoryslug,
          description: response.data.description,
          image: response.data.image,
        };
      }
      return { slug: ctx.query.categoryslug };
    });
  }
  render() {
    return (
      <>
        <SEO
          title={`${this.props.slug} Category Posts | Kavishala`}
          og_title={`${this.props.slug} Category Posts | Kavishala`}
          og_description={`${this.props.description}`}
          og_image={`${this.props.image}`}
          og_url={`/categories/${this.props.slug}`}
        />
        {this.props.description ? (
          <PostContainer
            slug={this.props.slug}
            type={"category"}
            info={{
              description: this.props.description,
              image: this.props.image,
            }}
          />
        ) : (
          <PostContainer slug={this.props.slug} type={"category"} />
        )}
      </>
    );
  }
}
