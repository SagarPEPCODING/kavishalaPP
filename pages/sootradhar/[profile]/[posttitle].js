import React, { Component } from "react";
import Api from "Api/Api";
import SEO from "components/SEO";
var DefaultPostImg = "/images/sootradhar_og.png";
var DefaultAuthorImg = "/images/kavishala_logo.png";
import PostView from "components/PostView/PostView";

export default class SootradharPostPage extends Component {
  static getInitialProps(ctx) {
    return Api.getSootradharAuthorPoemInfo(
      ctx.query.profile,
      ctx.query.posttitle
    ).then((response) => {
      if (response.status === 200) {
        var data = response.data[0];
        return {
          titleSlug: ctx.query.posttitle,
          postInfo: data,
          raw_content: data.raw_content,
          likes: data.liked_by.length,
          bookmarks: data.bookmarked_by.length,
          readTime: data.readtime,
          title: data.title,
          image: data.author.image || DefaultAuthorImg,
          author: data.author.name,
          author_slug: data.author.url,
          lastModifiedPublishStatus: data.lastModifiedPublishStatus,
          viewed_by: data.viewed_by,
          content: data.content,
          postImage: data.image,
          post_id: data.id,
          post_url: data.url,
          category: data.category,
          tag: data.tag,
        };
      } else {
        ctx.res.writeHead(301, {
          Location: "/404",
        });
        ctx.res.end();
      }
    });
  }

  render() {
    return (
      <>
        <SEO
          title={`${this.props.title} | ${this.props.author}`}
          og_url={`/${this.props.post_url}`}
          og_type="article"
          og_title={this.props.title}
          og_description={`${this.props.raw_content.slice(0, 50)}...`}
          og_image={this.props.postImage || DefaultPostImg}
          category={[
            ...this.props.category.map((cat) => cat.name),
            ...this.props.tag.map((ta) => ta.name),
          ]}
        />
        <PostView
          sootradhar={true}
          titleSlug={this.props.titleSlug}
          postInfo={this.props.postInfo}
          likes={this.props.likes}
          bookmarks={this.props.bookmarks}
          readTime={this.props.readTime}
          title={this.props.title}
          image={this.props.image}
          author={this.props.author}
          author_slug={this.props.author_slug}
          lastModifiedPublishStatus={this.props.lastModifiedPublishStatus}
          viewed_by={this.props.viewed_by}
          tag={this.props.tag}
          category={this.props.category}
          content={this.props.content}
          raw_content={this.props.raw_content}
          postImage={this.props.postImage}
          post_id={this.props.post_id}
          post_url={this.props.post_url}
        />
      </>
    );
  }
}
