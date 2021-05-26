import React, { Component } from 'react';
import PostCardLarge from 'components/PostcardLarge';
import PostCardLargeBook from 'components/PostCardLargeBook';
import Api from 'Api/Api';
import LoadMore from 'components/LoadMore';
import PostcardShimmer from 'components/Shimmer/PostcardShimmer';
import Utils from 'Utils';

export default class UserPosts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      posts: null,
      user: this.props.user,
      count: null,
      countOnPage: null,
      page: 1,
    };
    this.getDecodedToken = () => {
      return JSON.parse(localStorage.getItem('token_decoded'));
    };
    this.pageChanged = (page) => {
      this.setState({ page: page }, () => {
        this.loader();
      });
    };
    this.loadUserPosts = (type = null) => {
      let userFilter = { user: this.props.user };
      if (type === 'likes') {
        userFilter['likes_or_views'] = type;
      }
      Api.getAllPosts(userFilter, this.state.page).then((response) => {
        if (this.state.page === 1) {
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
      });
    };
    this.loadDraftPosts = () => {
      Api.getUserDrafts(this.props.user, this.state.page).then((response) => {
        if (response.status === 200) {
          if (this.state.page === 1) {
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
    this.loadDraftBooks = () => {
      let storage = this.getDecodedToken();
      console.log(storage);
      let id = storage.id;
      let username = storage.username;
      let userFilter = { user: this.props.user };
      console.log(this.props.user);
      Api.getUserBooks(id, this.props.user, this.state.page)
        .then((response) => {
          if (this.state.page === 1) {
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
        })
        .catch((error) => {
          console.log(error);
        });
    };
    this.postRender = () => {
      if (this.state.posts) {
        if (this.state.count) {
          return this.state.posts.map((post, index) => {
            if (this.props.type === 'books') {
              return (
                <PostCardLargeBook
                  key={index}
                  id={post.userid}
                  image={post.frontCoverimage}
                  imageLastCover={post.lastCoverimage}
                  title={post.bookTitle}
                  category={post.category}
                  language={post.language}
                  post={post}
                />
              );
            } else {
              return (
                <PostCardLarge
                  key={post.id}
                  id={post.id}
                  link={post.url}
                  image={post.image}
                  title={post.title}
                  tag={post.tag}
                  category={post.category}
                  content={post.raw_content}
                  lastModifiedPublishStatus={post.lastModifiedPublishStatus}
                  viewed_by={post.viewed_by}
                  liked_by={post.liked_by}
                  shared_by={post.shared_by}
                  nextLink={'/[username]/[slug]'}
                />
              );
            }
          });
        } else {
          return <h6 className='text-center py-5'>No Records</h6>;
        }
      } else {
        return Utils.rangeGenerator(12).map((index) => {
          return <PostcardShimmer />;
        });
      }
    };
    this.loader = () => {
      console.log(this.props.type);
      switch (this.props.type) {
        case 'likes':
          this.loadUserPosts('likes');
          break;
        case 'recent':
          this.loadUserPosts();
          break;
        case 'draft':
          this.loadDraftPosts();
          break;
        case 'books':
          this.loadDraftBooks();
          break;
        default:
          break;
      }
    };
  }
  componentDidMount() {
    this.loader();
    console.log(this.props.type);
  }

  render() {
    return (
      <>
        {this.postRender()}
        <LoadMore
          totalRecords={this.state.count}
          recordOnPage={this.state.countOnPage}
          pageChanged={this.pageChanged}
        />
      </>
    );
  }
}
