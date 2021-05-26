import React, { Component } from "react";
import Api from "Api/Api";
import SlickCarousel from "components/SlickCarousel";
import UserCard from "components/UserCard/UserCard";
import { Context } from "Context/context";
import SEO from "components/SEO";
import PostCard from "components/PostCard";
import { LoadPanel } from "devextreme-react";
import SiteContentTiles from "components/SiteContentTiles";
import Utils from "Utils";
export default class SearchPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      param: null,
      users: [],
      sootradhar_author: [],
      sootradhar_posts: [],
      author_posts: [],
      events: [],
      chapters: [],
      showLoader: null,
    };
    this.search = (e) => {
      e.preventDefault();
      let query = e.target.search.value.trim();
      let validQuery = query && /[\s\w\d]+/u.test(query);
      if (validQuery) {
        this.setState({ showLoader: true, param: query });
        Api.globalSearch(query).then((response) => {
          if (response.status === 200) {
            this.setState({
              showLoader: false,
              users: response.data.users,
              sootradhar_author: response.data.sootradhar_author,
              sootradhar_posts: response.data.sootradhar_posts,
              author_posts: response.data.author_posts,
              events: response.data.events,
              chapters: response.data.chapters,
            });
          }
        });
      } else {
        Utils.notify("Please enter valid query to search!", "warning", 1000);
      }
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    return (
      <>
        <SEO title={`Search | Kavishala - The school of poets`} />
        <div className="text-center py-4 search-container">
          <form
            onSubmit={this.search}
            name="searchForm"
            className="text-center"
          >
            <div className="position-relative d-inline">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Poetry & Stories & Authors"
                required
              />
              <button className="position-absolute" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        {this.state.showLoader !== null ? (
          this.state.showLoader === false ? (
            <div className="container search-records">
              {[
                this.state.users,
                this.state.sootradhar_author,
                this.state.sootradhar_posts,
                this.state.author_posts,
                this.state.events,
                this.state.chapters,
              ].some((arr) => arr.length) ? (
                <h1>Showing results for {this.state.param}</h1>
              ) : (
                <>
                  <h1>
                    No result found for "{this.state.param}". Please try search
                    with different keyword.
                  </h1>
                  <div className="mt-3">
                    <h2 className="text-center mb-3">Are you looking for...</h2>
                    <SiteContentTiles />
                  </div>
                </>
              )}

              {this.state.users.length ? (
                <>
                  <h3>Writers</h3>
                  <SlickCarousel
                    // slidesToShow={
                    //   this.context.getUserAgent() == "mobile" ? 2 : 5
                    // }
                    userAgent={this.context.getUserAgent()}
                    infinite={false}
                  >
                    {this.state.users.map((user) => {
                      return (
                        <div className="author-card-search">
                          <UserCard
                            image={user.image}
                            bio={user.raw_bio}
                            featured={user.featured}
                            username={user.username}
                            link={`/${user.slug}`}
                            nextLink="/[username]"
                          />
                        </div>
                      );
                    })}
                  </SlickCarousel>
                </>
              ) : null}
              {this.state.sootradhar_author.length ? (
                <>
                  <h3>Sootradhar Authors</h3>
                  <SlickCarousel
                    // slidesToShow={
                    //   this.context.getUserAgent() == "mobile" ? 2 : 5
                    // }
                    userAgent={this.context.getUserAgent()}
                    infinite={false}
                  >
                    {this.state.sootradhar_author.map((author) => {
                      return (
                        <div className="author-card-search">
                          <UserCard
                            username={author.name}
                            image={author.image}
                            link={author.url}
                            bio={author.raw_bio}
                            nextLink="/sootradhar/[profile]"
                          />
                        </div>
                      );
                    })}
                  </SlickCarousel>
                </>
              ) : null}
              {this.state.author_posts.length ? (
                <>
                  <h3>Writer's posts</h3>
                  <SlickCarousel
                    // slidesToShow={
                    //   this.context.getUserAgent() == "mobile" ? 2 : 5
                    // }
                    userAgent={this.context.getUserAgent()}
                    infinite={false}
                  >
                    {this.state.author_posts.map((post) => {
                      return (
                        <div className="carousel-card">
                          <PostCard
                            id={post.id}
                            key={post.id}
                            link={post.url}
                            image={post.image}
                            title={post.title}
                            tag={post.tag}
                            category={post.category}
                            lastModifiedPublishStatus={
                              post.lastModifiedPublishStatus
                            }
                            author_name={post.author_name}
                            nextLink={"/[username]/[slug]"}
                          />
                        </div>
                      );
                    })}
                  </SlickCarousel>
                </>
              ) : null}
              {this.state.sootradhar_posts.length ? (
                <>
                  <h3>Sootradhar author's posts</h3>
                  <SlickCarousel
                    // slidesToShow={
                    //   this.context.getUserAgent() == "mobile" ? 2 : 5
                    // }
                    userAgent={this.context.getUserAgent()}
                    infinite={false}
                  >
                    {this.state.sootradhar_posts.map((post) => {
                      return (
                        <div className="carousel-card">
                          <PostCard
                            id={post.id}
                            key={post.id}
                            link={post.url}
                            image={post.image}
                            title={post.title}
                            lastModifiedPublishStatus={
                              post.lastModifiedPublishStatus
                            }
                            author_name={post.author.name}
                            nextLink={"/[username]/[slug]"}
                          />
                        </div>
                      );
                    })}
                  </SlickCarousel>
                </>
              ) : null}
              {this.state.events.length ? (
                <>
                  <h3>Events</h3>
                  <SlickCarousel
                    // slidesToShow={
                    //   this.context.getUserAgent() == "mobile" ? 2 : 5
                    // }
                    userAgent={this.context.getUserAgent()}
                    infinite={false}
                  >
                    {this.state.events.map((event) => {
                      return (
                        <div className="carousel-card">
                          <PostCard
                            link={event.url}
                            image={event.header_image}
                            title={event.title}
                            lastModifiedPublishStatus={event.scheduled}
                            author_name={event.location}
                            nextLink={"/events/[eventslug]"}
                            event
                          />
                        </div>
                      );
                    })}
                  </SlickCarousel>
                </>
              ) : null}
            </div>
          ) : (
            <div className="search-loading">
              <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                visible={this.state.showLoader}
                showIndicator={true}
                shading={true}
                showPane={true}
                indicatorSrc={"/images/Logo_K2.png"}
              />
            </div>
          )
        ) : (
          <div className="mt-5">
            <h2 className="text-center mb-3">Are you looking for...</h2>
            <SiteContentTiles />
          </div>
        )}
        <style jsx>{`
          .search-container {
            background: #f7f7f7;
            height: 200px;
            line-height: 150px;
          }
          .mb-3 {
            font-size: 24px;
          }
          #search {
            width: 60%;
            padding-left: 2em;
            height: 50px;
            border-radius: 5px;
            border: 1px solid #b2b2b2;
            font-size: 16px;
          }
          input#search::placeholder {
            font-family: cursive !important;
          }
          #search:focus {
            outline: unset;
          }
          button {
            left: 0px;
            background: transparent;
            border: unset;
            margin: 0px 5px;
          }
          .author-card-search {
            padding: 5px;
          }
          .search-loading {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
          }
          .search-loading img {
            height: 10%;
            width: 10%;
          }
          h1 {
            font-size: 25px;
          }
          h3 {
            font-size: 20px;
          }
          @media only screen and (max-width: 426px) {
            .search-records {
              padding: 0% 7%;
            }
            #search {
              width: 80%;
            }
            button {
              margin: 0% 2%;
            }
          }
          .search-container {
            background: #00102c;
          }
        `}</style>
        <style jsx global>
          {`
            .search-records .author-card-search img {
              margin: 0 auto;
            }
            .search-records .author-card-search {
              width: 90% !important;
            }
            .carousel-card a {
              width: 90% !important;
            }
          `}
        </style>
      </>
    );
  }
}
