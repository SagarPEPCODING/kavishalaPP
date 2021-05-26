import React, { Component } from 'react';
import Api from 'Api/Api';
import Link from 'next/link';
import './postview.css';
import moment from 'moment';
import fetch from 'isomorphic-unfetch';
import Auth from 'Api/Auth';
import CommentsContainer from 'components/CommentsContainer';
import Utils from 'Utils';
var DefaultImg = '/images/kavishala_logo.png';
import { Context } from 'Context/context';
import Share from 'components/Share';
import Suggestions from 'components/Suggestions';
import Carousel from 'components/Carousel/Carousel';
import AudioPlayer from 'components/AudioPlayer';
import AdBanner from 'components/AdBanner';
import { ContactSupportOutlined } from 'node_modules/@material-ui/icons/index';
var DefaultPostImg = '/images/post_og.png';

export default class PostView extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    console.log(this.props.title);
    this.state = {
      authorized: false,
      titleSlug: this.props.titleSlug,
      postInfo: this.props.postInfo,
      likes: this.props.likes,
      bookmarks: this.props.bookmarks,
      canEdit: false,
      canLike: false,
      canBookmark: false,
      readTime: this.props.readTime,
      title: this.props.title,
      image: this.props.image || DefaultImg,
      author: this.props.author,
      author_slug: this.props.author_slug,
      lastModifiedPublishStatus: this.props.lastModifiedPublishStatus,
      viewed_by: this.props.viewed_by,
      tag: this.props.tag || [],
      category: this.props.category || [],
      content: this.props.content,
      raw_content: this.props.raw_content,
      postImage: this.props.postImage,
      post_id: this.props.post_id,
      post_url: this.props.post_url,
      asLink: `/${this.props.author_slug}`,
      href: '/[username]',
      posttitle: '',
      posteduserData: {},
    };
    this.checkActionAlreadyDone = (action_name) => {
      return this.state.postInfo[action_name].includes(
        Auth.decodedToken()['id']
      );
    };
    this.performAction = (action) => {
      switch (action) {
        case 'like':
          if (this.state.canLike) {
            console.log('hi u can like this post');
            var postAction = 'like';
            var newState = {
              likes: this.state.likes + 1,
              canLike: false,
            };
          } else {
            console.log("sorry u can't like this post");
            var postAction = 'dislike';
            var newState = {
              likes: this.state.likes - 1,
              canLike: true,
            };
          }

          var postType = this.props.sootradhar ? 'sootradhar' : 'post';
          Api.likeDislikePost(
            this.props.author_slug,
            this.state.titleSlug,
            postAction,
            postType
          ).then((response) => {
            if (response.status === 200) {
              this.setState(newState);
            } else if (response.status === 403) {
              this.context.ShowLoginForm();
            }
          });

          let postid = 0;

          if (postAction === 'like') {
            var pt = 'POST';
            Api.getPostByUsernameTitle(
              this.props.author_slug,
              this.state.titleSlug
            ).then((response) => {
              console.log(response.data[0].id);
              postid = response.data[0].id;
              console.log(response.data[0].title);
              this.setState({ posttitle: response.data[0].title });
              if (response.status === 200) {
                console.log('done');

                Api.getUserInfo(this.props.author_slug).then((response) => {
                  console.log(response.data.id);
                  console.log(response);
                  this.setState({ posteduserData: response.data });

                  let storage = localStorage.getItem('token_decoded');
                  storage = JSON.parse(storage);
                  let idofLiker = storage.id;
                  let idofPostedBy = this.state.posteduserData.id;
                  let LikerName = storage.username;
                  LikerName = LikerName.substring(1);
                  let LikerEmailId = 'nothing';

                  // let url =
                  //   'https://admin.kavishala.in/setnotification/postnotification/';
                  let time = Date.now();
                  console.log(this.state.posttitle);
                  let obj = {
                    idOfLiker: idofLiker,
                    idOfPostedBy: idofPostedBy,
                    LikerName: LikerName,
                    LikerEmailId: LikerEmailId,
                    Title: this.props.title,
                    postidLike: this.state.post_id,
                  };

                  // fetch(url, {
                  //   method: 'post',
                  //   headers: {
                  //     'Content-Type': 'application/json',
                  //   },
                  //   body: JSON.stringify(obj),
                  // })
                  //   .then((response) => {
                  //     if (response.status === 200) {
                  //       // console.log('done yess');
                  //     } else {
                  //       console.log('something wrong');
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.log(errsor);
                  //   });

                  Api.postNotification(obj)
                    .then((response) => {
                      console.log(response);
                      console.log(response.data);
                      console.log(response.status);
                      if (response.status == 201) {
                        console.log('done');
                      } else {
                        console.log('some error');
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  if (response.status === 200) {
                    console.log('done');
                  } else if (response.status === 403) {
                    console.log('something wrong');
                  }
                });
              } else if (response.status === 403) {
                this.context.ShowLoginForm();
              }
            });
          }
          break;
        case 'bookmark':
          if (this.state.canBookmark) {
            var postAction = 'bookmark';
            var newState = {
              bookmarks: this.state.bookmarks + 1,
              canBookmark: false,
            };
          } else {
            var postAction = 'unbookmark';
            var newState = {
              bookmarks: this.state.bookmarks - 1,
              canBookmark: true,
            };
          }
          var postType = this.props.sootradhar ? 'sootradhar' : 'post';
          Api.bookmarkUnbookmarkPost(
            this.props.author_slug,
            this.state.titleSlug,
            postAction,
            postType
          ).then((response) => {
            if (response.status === 200) {
              this.setState(newState);
            } else if (response.status === 403) {
              this.context.ShowLoginForm();
            }
          });
          break;
      }
    };
    this.stringifyData = (data) => {
      return data
        .map((d) => {
          return d.slug;
        })
        .join(',');
    };
    this.getSlug = () => {
      if (this.props.sootradhar) {
        return this.state.author_slug.replace('/sootradhar/', '');
      }
      return this.state.author_slug;
    };
  }

  componentWillUnmount() {
    this.context.ShowReadIndicator();
  }
  componentDidMount() {
    this.context.ShowReadIndicator();
    // console.log(Auth.isAuthenticated());
    // var user_id = Auth.decodedToken().id;
    // console.log(user_id);
    if (Auth.isAuthenticated()) {
      var user_id = Auth.decodedToken().id;
      console.log(user_id);
      this.setState({
        authorized: true,
        canLike: !this.state.postInfo.liked_by.includes(user_id),
        canBookmark: !this.state.postInfo.bookmarked_by.includes(user_id),
        canEdit: Auth.isAuthorized(this.state.postInfo.author.slug),
      });
    }
    if (this.props.sootradhar) {
      this.setState({
        asLink: `${this.state.author_slug}`,
        href: '/sootradhar/[profile]',
      });
    }
  }

  render() {
    return (
      <>
        {Object.entries(this.state.postInfo).length ? (
          <div className='postContent'>
            <div className='post_title_info text-white position-relative p-3'>
              <img
                src={this.state.postImage || DefaultPostImg}
                alt={`${this.state.title}'s image`}
                className='post-image position-absolute'
              />
              <div className='blur'></div>

              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-lg-10'>
                    {this.state.category.map((category) => {
                      return (
                        <Link
                          as={category.url}
                          href={'/categories/[categoryslug]'}
                        >
                          <a className='px-1 py-1 mr-1 rounded text-white pointer category text-uppercase text-decoration-none'>
                            {category.name}
                          </a>
                        </Link>
                      );
                    })}
                    {this.state.postInfo.content_type ? (
                      <a className='px-1 py-1 mr-1 rounded text-white pointer content_type text-uppercase text-decoration-none'>
                        {this.state.postInfo.content_type}
                      </a>
                    ) : null}
                    <a className='px-1 py-1 mr-1 rounded read-time'>
                      {this.state.readTime}
                    </a>
                    <h1 className='my-3 post_title'>
                      {this.state.title}{' '}
                      {this.state.canEdit ? (
                        <Link
                          href={{
                            pathname: '/post/edit',
                            query: {
                              postData: JSON.stringify(this.state.postInfo),
                            },
                          }}
                          as='/post/edit'
                        >
                          <a>
                            <i
                              className='fa fa-pencil pointer'
                              style={{ fontSize: 21, marginLeft: 10 }}
                              title='Edit post'
                            ></i>
                          </a>
                        </Link>
                      ) : null}
                    </h1>
                    <Link as={this.state.asLink} href={this.state.href}>
                      <a className='author-card text-decoration-none'>
                        <img
                          src={this.state.image}
                          className='author-image'
                          alt={`${this.state.author}`}
                          title={`${this.state.author}`}
                          onError={(e) => {
                            Utils.imgLoadError(e, DefaultImg);
                          }}
                        />
                        <span className='author-link text-decoration-none'>
                          {this.state.author}
                        </span>
                      </a>
                    </Link>
                    {this.props.sootradhar ? null : (
                      <>
                        <a className='float-right date'>
                          {' '}
                          {moment(this.state.lastModifiedPublishStatus).format(
                            'LL'
                          )}
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className='container-fluid action-and-audio'>
                  <div className='row'>
                    <div className='col-6'>
                      {this.props.postInfo.audio_url ? (
                        <AudioPlayer
                          audio_url={this.props.postInfo.audio_url}
                        />
                      ) : null}
                    </div>
                    <div className='col-6'>
                      <div className='postActions'>
                        {this.state.postInfo.publish &&
                        this.state.postInfo.approved ? (
                          <>
                            <Share title={this.state.title} />
                            <span className='d-none d-sm-block'>Share</span>
                          </>
                        ) : null}
                        <i
                          className={`fa fa-bookmark pointer mr-1 ${
                            this.state.authorized
                              ? this.state.canBookmark
                                ? ''
                                : 'bookmarked'
                              : ''
                          }`}
                          onClick={() => {
                            this.performAction('bookmark');
                          }}
                        ></i>
                        <span>
                          {this.state.bookmarks}{' '}
                          <span className='d-none d-sm-inline'>Bookmarks</span>
                        </span>{' '}
                        <i className='fa fa-book mr-1'></i>
                        <span>
                          {this.state.viewed_by}{' '}
                          <span className='d-none d-sm-inline'>Reads</span>
                        </span>
                        <i
                          className={`fa fa-heart mr-1 pointer ${
                            this.state.authorized
                              ? this.state.canLike
                                ? ''
                                : 'liked'
                              : ''
                          }`}
                          onClick={() => {
                            this.performAction('like');
                          }}
                        ></i>
                        <span>
                          {this.state.likes}{' '}
                          <span className='d-none d-sm-inline'>Likes</span>{' '}
                        </span>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='container-fluid'>
              <div className='postBody row'>
                <div className='col-lg-8'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.content,
                    }}
                    className='post-content'
                  />
                  <div className='container-fluid'>
                    <div className='row tagContainer'>
                      {this.state.tag.map((tag) => {
                        return (
                          <Link
                            as={tag.url}
                            href={'/tags/[tagslug]'}
                            key={tag.name}
                          >
                            <a className='px-1 py-1 rounded bg-warning mr-1 text-white tag text-decoration-none'>
                              #{tag.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  {/* <AdBanner type="small" /> */}
                  <div className='show-mobile'>
                    <Suggestions
                      type='user'
                      data={this.getSlug()}
                      sootradhar={this.props.sootradhar}
                      postTitle={this.state.postInfo.title}
                    />
                  </div>
                  <CommentsContainer
                    postID={this.state.post_id}
                    authorSlug={this.props.author_slug}
                    titleSlug={this.state.titleSlug}
                    title={this.props.title}
                    postInfo={this.state.postInfo}
                    author={this.state.author}
                  />
                </div>
                <div className='col-lg-4'>
                  <div className='sidebanner d-lg-block d-none '>
                    <Carousel type='Sidebanner' />
                  </div>
                  <Suggestions
                    type='views'
                    postTitle={this.state.postInfo.title}
                  />
                  <Suggestions
                    type='category'
                    data={this.stringifyData(this.state.category)}
                    postTitle={this.state.postInfo.title}
                  />
                  <div className='hide-mobile'>
                    <Suggestions
                      type='user'
                      data={this.getSlug()}
                      sootradhar={this.props.sootradhar}
                      postTitle={this.state.postInfo.title}
                    />
                  </div>
                  <Suggestions
                    type='recent'
                    postTitle={this.state.postInfo.title}
                  />
                </div>
              </div>
            </div>
            <style jsx global>
              {`
                @media only screen and (max-width: 426px) {
                  .post-content img {
                    width: 100%;
                    height: 100%;
                  }
                }
              `}
            </style>
            <style jsx>{`
              .position-absolute {
                top: 2em;
                left: 3em;
                width: 100%;
              }
              .action-and-audio {
                padding: 1% 0% 0% 0%;
              }
              @media only screen and (max-width: 426px) {
                .position-absolute {
                  left: unset;
                }
                .action-and-audio {
                  padding: 8% 0% 0% 0%;
                }
              }
              .blur {
                background: rgba(0, 0, 0, 0.7);
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                position: absolute;
              }
              .post-image {
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .show-mobile {
                display: none;
              }
              .content_type {
                background: slategrey;
                font-size: 14px;
              }
              @media only screen and (max-width: 426px) {
                .show-mobile {
                  display: block;
                }
                .hide-mobile {
                  display: none;
                }
              }
            `}</style>
          </div>
        ) : null}
      </>
    );
  }
}
