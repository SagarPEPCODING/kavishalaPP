import React, { Component } from 'react';
import { HtmlEditor } from 'devextreme-react';
import { minimalConfig } from 'components/editorConfig';
import Api from 'Api/Api';
import CommentCard from 'components/CommentCard';
import { Context } from 'Context/context';
import fetch from 'isomorphic-unfetch';

export default class CommentsContainer extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      postID: this.props.postID,
      comments: [],
      commentPost: false,
      postid: 0,
      userid: 0,
      username: '',
      postedbyid: 0,
      comment: '',
      posttitle: '',
    };
    this.commentOnPost = (e) => {
      e.preventDefault();
      var data = {
        post: this.state.postID,
        content: e.target.commentContent.value,
      };
      this.setState({ comment: e.target.commentContent.value });
      var target = e.target;
      Api.commentOnPost(data).then((response) => {
        if (response.status === 201) {
          this.setState({ comments: [...this.state.comments, response.data] });
          target.commentContent.value = '';
          this.setState({ commentPost: true });

          Api.getPostByUsernameTitle(
            this.props.authorSlug,
            this.props.titleSlug
          ).then((response) => {
            let postid = response.data[0].id;
            let postedby = response.data[0].user;
            this.setState({ posttitle: response.data[0].title });
            this.setState({ postid: postid });
            this.setState({ postedbyid: postedby });

            let storage = localStorage.getItem('token_decoded');
            if (storage === null) {
              this.context.ShowLoginForm();
            } else {
              storage = JSON.parse(storage);
              Api.getUserId(storage.id).then((response) => {
                let userid = storage.id;
                let username = storage.username;
                username = username.substring(1);
                
                this.setState({ userid: userid });
                this.setState({ username: username });

                // console.log(
                //   this.state.postid + '********************' + this.props.postID
                // );
                // console.log(
                //   this.state.postedbyid +
                //     '******************' +
                //     this.props.author
                // );
                // console.log(
                //   this.state.title + '*****************' + this.props.title
                // );
                let obj = {
                  postid: this.state.postid,
                  postedby: this.state.postedbyid,
                  userid: this.state.userid,
                  userName: this.state.username,
                  comment: this.state.comment,
                  Title: this.props.title,
                };
                // let url = 'https://admin.kavishala.in/notification/comment/';

                // fetch(url, {
                //   method: 'post',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify(obj),
                // });

                Api.postCommentNotification(obj)
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

                if (response.status === 201) {
                  console.log('done');
                } else if (response.status === 403) {
                  this.context.ShowLoginForm();
                }
              });
            }
            if (response.status === 201) {
              console.log('done');
            } else if (response.status === 403) {
              this.context.ShowLoginForm();
            }
          });
        } else if (response.status === 403) {
          this.context.ShowLoginForm();
        }
      });
    };
  }
  componentDidMount() {
    Api.getComments(this.state.postID).then((response) => {
      if (response.status === 200) {
        this.setState({ comments: response.data });
      }
    });
  }

  render() {
    let { postID, authorSlug, titleSlug } = this.props;
    return (
      <div className='post-comments'>
        <h5>Comments</h5>
        <form name='comment-form' onSubmit={this.commentOnPost}>
          <HtmlEditor
            toolbar={{ items: minimalConfig }}
            name='commentContent'
            onValueChanged={this.editorChanged}
          />
          <button className='btn btn-primary'>Comment</button>
        </form>
        <div className='comments-view'>
          {this.state.comments.map((comment) => {
            return <CommentCard comment={comment} />;
          })}
        </div>
        <style jsx>
          {`
            .post-comments {
              margin: 10px 0px;
            }
            .post-comments .btn {
              margin: 10px 0px;
            }
            .comments-view {
              padding: 10px 0px;
            }
            .post-comments .dx-quill-container {
              height: 150px;
            }
          `}
        </style>
      </div>
    );
  }
}
