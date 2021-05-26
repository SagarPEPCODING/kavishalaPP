import React, { Component } from 'react';
import Auth from 'Api/Auth';
import { TabPanel } from 'devextreme-react';
import UserPosts from './UserPosts';
import BooksSaved from './BooksSaved';
export default class UserPostConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      draftPosts: [],
      isAuthorized: null,
      userSlug: null,
    };
    this.tabs = [
      {
        title: 'Most Recent',
      },
      {
        title: 'Most Liked',
      },
      {
        title: 'Drafts',
      },
      {
        title: 'Books',
      },
    ];
    this.tabsRender = () => {
      var tabs = this.tabs.filter((tab) => {
        if (tab.title === 'Drafts' && this.state.isAuthorized) {
          return tab;
        }
        return tab;
      });
      return tabs;
    };
    this.component = (e) => {
      switch (e.data.title) {
        case 'Most Liked':
          return <UserPosts user={this.props.slug} type='likes' />;
        case 'Most Recent':
          return <UserPosts user={this.props.slug} type='recent' />;
        case 'Drafts':
          return <UserPosts user={this.props.slug} type='draft' />;
        case 'Books':
          return <UserPosts user={this.props.slug} type='books' />;
        default:
          break;
      }
    };
  }
  componentDidMount() {
    var authorized = Auth.isAuthorized(this.props.slug);
    this.setState({ isAuthorized: authorized, userSlug: this.props.slug });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userSlug !== this.props.slug) {
      var authorized = Auth.isAuthorized(this.props.slug);
      this.setState({ isAuthorized: authorized, userSlug: this.props.slug });
    }
  }

  render() {
    return (
      <section className='posts container'>
        <TabPanel
          dataSource={this.tabs.filter((tab) => {
            if (tab.title === 'Drafts' && tab.title === 'Books') {
              if (this.state.isAuthorized) {
                return tab;
              } else {
                return false;
              }
            }
            return tab;
          })}
          itemComponent={this.component}
          swipeEnabled={false}
        />
      </section>
    );
  }
}
