import React, { Component } from 'react';
import Api from 'Api/Api';
import Auth from 'Api/Auth';
import SEO from 'components/SEO';
import UserPage from 'components/UserPage';
import StaticPage from 'components/StaticPage';
import Utils from 'Utils';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: null,
    };
  }
  static getInitialProps(ctx) {
    if (Utils.isValidUserSlug(ctx.query.username)) {
      return Api.getUserInfo(ctx.query.username).then((response) => {
        if (response !== undefined && response.status === 200) {
          return {
            data: response.data,
            page: 'user',
            edit: ctx.query.edit,
            query: ctx.query.username,
          };
        } else if (response.status === 404) {
          ctx.res.writeHead(301, {
            Location: '/404',
          });
          ctx.res.end();
        }
      });
    } else {
      return Api.getStaticPage(ctx.query.username).then((response) => {
        if (response !== undefined && response.status === 200) {
          return { data: response.data, page: 'static' };
        } else if (response.status === 404) {
          ctx.res.writeHead(301, {
            Location: '/404',
          });
          ctx.res.end();
        }
      });
    }
  }
  componentDidMount() {
    this.setState({ data: this.props.data });
    if (this.props.page === 'user') {
      if (this.props.query === Auth.decodedToken().username) {
        console.log('call the API');
        Api.getUserPhone().then((response) => {
          if (response !== undefined && response.status === 200) {
            this.setState({
              data: { ...this.state.data, phone: response.data.phone },
            });
          }
        });
      }
    }
  }

  render() {
    if (this.state.data) {
      if (this.props.page === 'user') {
        return (
          <>
            <SEO
              title={this.state.data.username}
              og_title={this.state.data.username}
              og_url={`/${this.state.data.slug}`}
              og_description={this.state.data.raw_bio}
              og_image={this.state.data.image}
              author={this.state.data.username}
              author_facebook={this.state.data.facebook}
              author_twitter={this.state.data.twitter}
            />
            <UserPage data={this.state.data} edit={this.props.edit} />
          </>
        );
      } else {
        return (
          <>
            <SEO
              title={this.state.data.title}
              og_title={this.state.data.title}
              og_image={this.state.data.image}
              category={this.state.data.tags}
              og_url={`/${this.state.data.slug}`}
              og_description={`/${this.state.data.description}`}
            />
            <StaticPage data={this.state.data} />
          </>
        );
      }
    }
    return null;
  }
}
