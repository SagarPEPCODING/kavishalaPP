import React, { Component } from "react";
import moment from "moment";
import "./commentcard.css";
var DefaultImg = "/images/default_profile_pic.jpg";
export default class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment
    };
  }
  render() {
    return (
      <div className="comment-card hoverEffect">
        <img
          className="comment-pic img-raised float-left"
          src={this.state.comment.author_profile_img || DefaultImg}
          alt="User profile pic"
        />
        <div className="comment-content">
          <div
            className="comment-body"
            dangerouslySetInnerHTML={{
              __html: this.state.comment.content
            }}
          />
          <span className="commentInfo">
            <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
            {moment(this.state.comment.created_at).fromNow()}
          </span>
        </div>
      </div>
    );
  }
}
