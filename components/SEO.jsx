import React, { Component } from "react";
import Head from "next/head";

export default class SEO extends Component {
  render() {
    return (
      <Head>
        <title>{this.props.title || "Kavishala | The school of poets"}</title>
        {/* <meta
          property="og:url"
          content={this.props.og_url || "https://kavishala.in"}
        /> */}
        <meta property="og:type" content={this.props.og_type || "article"} />
        {/* <meta
          property="og:description"
          content={
            this.props.og_description ||
            "Kavishala is a platform for new and young poets and writers, where they can write, share, recite and discuss their poetry and literature online as well as offline."
          }
        /> */}
        <meta property="og:locale" content="en" />
        <meta
          name="description"
          content={
            this.props.og_description
              ? `${this.props.og_description.slice(0, 197)}...`
              : "Kavishala is a platform for new and young poets and writers, where they can write, share, recite and discuss their poetry and literature online as well as offline."
          }
        />
        <meta name="author" content={this.props.author || "Kavishala"} />
        <meta
          name="news_keywords"
          content={this.props.category || "KAVISHALA, POETRY, BLOG"}
        />
        <meta
          name="keywords"
          content={this.props.category || "KAVISHALA, POETRY, BLOG"}
        />
        {/* FACEBOOK TAGS */}
        <meta property="fb:app_id" content="2593857177316284" />
        <meta
          property="fb:pages"
          content="1366164690108763,127764270624437,464599680252351"
        />
        {/* (Facebook Page ID) */}
        <meta
          property="og:title"
          content={
            this.props.og_title
              ? `${this.props.og_title.slice(0, 52)}...`
              : "Kavishala | The school of poets"
          }
        />
        <meta
          property="og:description"
          content={
            this.props.og_description
              ? `${this.props.og_description.slice(0, 197)}...`
              : "Kavishala is a platform for new and young poets and writers, where they can write, share, recite and discuss their poetry and literature online as well as offline."
          }
        />
        <meta
          property="og:url"
          content={
            `https://kavishala.in${this.props.og_url}` || "https://kavishala.in"
          }
        />
        <meta property="og:site_name" content="kavishala.in" />
        <meta
          property="og:image"
          content={
            this.props.og_image || "https://kavishala.in/images/post_og.png"
          }
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta
          property="og:image:alt"
          content="https://kavishala.in/images/post_og.png"
        />
        <meta
          property="article:publisher"
          content={this.props.author_facebook || "Kavishala"}
        />
        <meta property="article:section" content={this.props.category} />
        <meta
          property="article:published_time"
          content={this.props.published_on}
        />
        {/* TWITTER META TAGS */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={
            this.props.og_description
              ? `${this.props.og_description.slice(0, 197)}...`
              : "Kavishala is a platform for new and young poets and writers, where they can write, share, recite and discuss their poetry and literature online as well as offline."
          }
        />
        <meta
          name="twitter:title"
          content={
            this.props.og_title
              ? `${this.props.og_title.slice(0, 52)}...`
              : "Kavishala | The school of poets"
          }
        />
        <meta name="twitter:site" content="@kavishala" />
        <meta
          name="twitter:image"
          content={
            this.props.og_image || "https://kavishala.in/images/post_og.png"
          }
        />
        <meta
          name="twitter:creator"
          content={this.props.author_twitter || "@kavishala"}
        />
      </Head>
    );
  }
}
