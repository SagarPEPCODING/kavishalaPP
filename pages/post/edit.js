import React, { Component } from 'react';
import PostCreateEditForm from 'components/PostCreateEditForm';
import Utils from 'Utils';
import Api from 'Api/Api';
import Auth from 'Api/Auth';
import Router from 'next/router';
import { confirm } from 'devextreme/ui/dialog';
import { Context } from 'Context/context';
import SEO from 'components/SEO';

export default class PostEdit extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    console.log(props);
    this.editPost = (data, publish) => {
      this.context.ToggleLoader();
      Api.editPost(
        Auth.decodedToken().username,
        this.props.data.slug,
        data
      ).then((response) => {
        this.context.ToggleLoader();
        if (response.status === 200) {
          if (publish) {
            Utils.notify('Post edit successfully !!!', 'success');
          } else {
            Utils.notify('Post in draft - saved successfully !!!', 'success');
          }
          Router.push(response.data.url);
        }
      });
    };
    this.deletePost = () => {
      Api.deletePost(Auth.decodedToken().username, this.props.data.slug).then(
        (response) => {
          if (response.status === 200) {
            Utils.notify('Post deleted successfully !!!', 'success');
            Router.push(`/${Auth.decodedToken().username}`);
          }
        }
      );
      // let result = confirm("<p>Are you sure?</p>", "Confirm changes");
      // result.then((dialogResult) => {
      //   if (dialogResult) {
      //     Api.deletePost(
      //       Auth.decodedToken().username,
      //       this.props.data.slug
      //     ).then((response) => {
      //       if (response.status === 200) {
      //         Utils.notify("Post deleted successfully !!!", "success");
      //         Router.push(`/${Auth.decodedToken().username}`);
      //       }
      //     });
      //   }
      // });
    };
  }
  static getInitialProps(ctx) {
    try {
      return { data: JSON.parse(ctx.query.postData) };
    } catch (err) {
      ctx.res.writeHead(301, {
        Location: '/404',
      });
      ctx.res.end();
    }
  }

  render() {
    return (
      <>
        <SEO title={`Edit | ${this.props.data.title}`} og_url={'/post/edit'} />
        <PostCreateEditForm
          getData={this.editPost}
          data={this.props.data}
          deletePost={this.deletePost}
          edit={true}
        />
      </>
    );
  }
}
