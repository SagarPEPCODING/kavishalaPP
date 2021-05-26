import React, { Component } from 'react';
import PostCreateEditForm from 'components/PostCreateEditForm';
import Utils from 'Utils';
import Api from 'Api/Api';
import Auth from 'Api/Auth';
import { Context } from 'Context/context';
import Router from 'next/router';
import SEO from 'components/SEO';

export default class PostCreate extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.createPost = (data, publish) => {
      this.context.ToggleLoader();
      Api.createPost(data).then((response) => {
        console.log(data);
        this.context.ToggleLoader();
        if (response.status === 201) {
          if (publish) {
            Utils.notify('Post created successfully !!!', 'success');
          } else {
            Utils.notify('Post in draft - saved successfully !!!', 'success');
          }
          Router.push(response.data.url);
        }
      });
    };
  }
  componentDidMount() {
    if (!Auth.isAuthenticated()) {
      this.context.ShowLoginForm();
    }
  }

  render() {
    return (
      <>
        <SEO title={'Create post'} og_url={'/post/create'} />
        {this.context.state.userInfo.is_writer ? (
          <PostCreateEditForm getData={this.createPost} edit={false} />
        ) : (
          <div className='jumbotron'>
            <h4 className='ml-3'>
              You are reading this due to one of the two statements mentioned
              below:
            </h4>
            <ol>
              <li>
                You have not raised a request to become a writer. If not please
                raise the request either by selecting the "becoming a writer"
                option (in the desktop version) or "submit a post" option (in
                the mobile version)
              </li>
              <li>
                You have raised the request and approval is still pending with
                admin. Please wait for some time. Your request will be approved
                shortly.
              </li>
            </ol>
          </div>
        )}
        <style jsx>
          {`
            .jumbotron {
              padding: 5%;
            }
          `}
        </style>
      </>
    );
  }
}
