import React, { Component } from 'react';
import moment from 'moment';
import './postcard.css';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default class PostCard extends Component {
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
    console.log(props);
    console.log(state);
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
    return (
      <>
        <Link as={this.state.link} href={this.props.nextLink}>
          <a className='flex flex-column hoverEffect'>
            <div className='post-pic'>
              <LazyLoadImage
                alt={`${this.state.title}'s image`}
                src={this.state.image}
              />
            </div>
            <div className='postInfo'>
              <span>
                {moment(this.state.lastModifiedPublishStatus).format(
                  'Do MMM YYYY'
                )}
              </span>
            </div>
            <h3 className='text-capitalize trimmer1line'>{this.state.title}</h3>
            {/* <span className="text-capitalize author-name">
              {this.props.event ? "Location : " : "Author : "}
              {this.state.author_name}
            </span> */}
            {/* <div className="category">
              {this.state.category.map((cat) => {
                return <span>{cat.name}</span>;
              })}
            </div> */}
          </a>
        </Link>
        <style jsx>
          {`
            a {
              text-decoration: none;
              border: 1px solid #b9b9b9;
              max-width: 98%;
              padding: 5px;
              border-radius: 5px;
              height: 14em;
              text-align: initial;
              margin: 10% 0%;
              margin-top: 0px;
            }
            @media only screen and (min-width: 427px) {
              a {
                max-width: 200px;
              }
            }
            .post-pic {
              object-fit: cover;
              height: 8em;
            }
            .postInfo,
            .author-name {
              font-size: 12px !important;
              padding: 5px 0px;
              color: #373e44;
            }
            a:hover h3 {
              font-weight: 700;
            }
            .postInfo span {
              color: red;
            }
            h3 {
              font-size: 1rem;
              padding-top: 3px;
              height: 40px;
              white-space: break-spaces;
              overflow: hidden !important;
              text-overflow: ellipsis;
              color: #373e44;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .category span {
              font-size: 10px;
              background-color: var(--main-color);
              color: white;
              padding: 5px;
              border-radius: 5px;
            }
            .author-name {
              font-weight: 700;
            }
          `}
        </style>
      </>
    );
  }
}
