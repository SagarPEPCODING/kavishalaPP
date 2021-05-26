import React, { Component } from 'react';
import moment from 'moment';
import './postcard.css';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './postcardlargebook.css';
import { Language } from 'node_modules/@material-ui/icons/index';
import Router from 'next/router';
export default class PostCardLarge extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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

      key: null,
      imageLastCover: null,
    };
  }

  bookClicked = () => {
    let storage = localStorage.getItem('token_decoded');
    storage = JSON.parse(storage);
    let username = storage.username;
    console.log('book is clicked');
    console.log(this.props);
    Router.push({
      pathname: `/writer/${username}`,
      data: this.props,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        author_name: props.author_name,
        image: props.image || '/images/post_og.png',
        category: props.category || [],
        title: props.title,
      };
    }
    return null;
  }
  render() {
    return (
      // <Link as={this.state.link} href={`/[username]/[posttitle]`}>
      <Link
        href={{
          pathname: '/writer/edit',
          query: {
            postData: JSON.stringify(this.props),
          },
        }}
        as='/writer/edit'
      >
        <a className='post-link'>
          <div className='postCardLarge hoverEffect'>
            <div className='my-card'>
              <LazyLoadImage
                className='post-pic-large'
                alt={`${this.state.title}'s image`}
                src={this.state.image}
              />
              <div className='postInfoLarge my-card-body'>
                <div className='flex'></div>
                <h3 className='text-capitalize trimmer1line'>
                  {this.state.title}
                </h3>
                <p className='post-body-large font-weight-light trimmer1line'>
                  {this.state.category}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }
}
