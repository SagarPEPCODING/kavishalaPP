import React, { Component } from 'react';
import moment from 'moment';
import './postcard.css';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default class PostCardLarge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      // canLike: true,
      liked_by: [],
      link: '',
      image: '/images/post_og.png',
      tag: [],
      category: [],
      title: '',
      content: '',
      lastModifiedPublishStatus: new Date(),
      viewed_by: 0,
      shared_by: [],
      comment_count: 0,
      readtime: null,
      author_name: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        liked_by: props.liked_by || [],
        link: props.link,
        readtime: props.readtime,
        author_name: props.author_name,
        image: props.image || '/images/post_og.png',
        tag: props.tag || [],
        category: props.category || [],
        title: props.title,
        content: props.content,
        lastModifiedPublishStatus: props.lastModifiedPublishStatus,
        viewed_by: props.viewed_by,
        shared_by: props.shared_by || [],
        comment_count: props.comment_count || 0,
      };
    }
    return null;
  }

  render() {
    console.log(this.props.nextLink);
    return (
      // <Link as={this.state.link} href={`/[username]/[posttitle]`}>
      <Link as={this.state.link} href={this.props.nextLink}>
        <a className='post-link'>
          <div className='postCardLarge hoverEffect'>
            <div className='my-card'>
              <LazyLoadImage
                className='post-pic-large'
                alt={`${this.state.title}'s image`}
                src={this.state.image}
              />
              <div className='postInfoLarge my-card-body'>
                <div className='flex'>
                  {/* <span className="tags">
                  {this.state.tag.map(tag => {
                    return (
                      <Link to={tag.url}>
                        <span
                          class="badge badge-pill badge-primary"
                          style={{ marginRight: 5 }}
                        >
                          #{tag.name}
                        </span>
                      </Link>
                    );
                  })}
                </span>
                <span className="categories">
                  {this.state.category.map(category => {
                    return (
                      <Link to={category.url}>
                        <span
                          class="badge badge-pill badge-success"
                          style={{ marginRight: 5 }}
                        >
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
                </span> */}
                </div>
                <h3 className='text-capitalize trimmer1line'>
                  {this.state.title}
                </h3>
                <p className='post-body-large font-weight-light trimmer1line'>
                  {this.state.content.substr(0, 50) + '...'}
                </p>

                <div className='font-weight-lighter'>
                  <span className='postInfo text-capitalize'>
                    {this.state.author_name}
                  </span>

                  {/* <span className="dotDivider"></span>
                <span className="postInfo">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  {this.state.viewed_by}
                </span>
                <span className="postInfo">
                  <i
                    className={`fa fa-thumbs-o-up ${
                      this.state.canLike ? "" : "liked"
                    }`}
                    aria-hidden="true"
                  ></i>
                  {this.state.liked_by.length}
                </span>
                <span className="postInfo">
                  <i class="fa fa-comment-o" aria-hidden="true"></i>
                  {this.state.comment_count}
                </span> */}
                  {this.props.nextLink.includes('sootradhar') ? null : (
                    <span className='dotDividerBefore'>
                      <span className='postInfo'>
                        {moment(this.state.lastModifiedPublishStatus).format(
                          'll'
                        )}
                      </span>
                    </span>
                  )}
                  {this.state.readtime ? (
                    <>
                      <span className='dotDividerBefore'>
                        <span className='postInfo'>{this.state.readtime}</span>
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }
}
