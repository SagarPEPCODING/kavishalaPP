import React, { Component } from 'react';
import { Popup } from 'devextreme-react';
import Authentication from 'components/Authentication/Authentication';
import Link from 'next/link';
import './navbar.css';
import { Context } from 'Context/context';
import ReadIndicator from 'components/ReadIndicator';
import Utils from 'Utils';
import Router from 'next/router';
var DefaultProfile = '/images/default-profile.png';
var logo = '/images/kavishala_logo.png';
import BecomeAWriter from 'components/BecomeAWriter';
import Search from 'components/Search';
import './navbar.css';
import Api from '../../Api/Api.js';
import NotificationsIcon from '@material-ui/icons/Notifications';
import fetch from 'isomorphic-unfetch';
import {
  FormatAlignLeftSharp,
  FormatListBulletedTwoTone,
} from 'node_modules/@material-ui/icons/index';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class MenuItems extends Component {
  static contextType = Context;
  render() {
    if (this.props.mobile) {
      return (
        <>
          {this.context.state.isAuthenticated ? (
            <Link
              href={{
                pathname: `/${this.context.state.userInfo.username}`,
                query: { edit: true },
              }}
            >
              <a class='dropdown-item'>Edit Profile</a>
            </Link>
          ) : null}
          <Link href='/post'>
            <a className='dropdown-item family'>Browse</a>
          </Link>
          <Link href='/events'>
            <a className='dropdown-item family'>Events</a>
          </Link>
          <Link href='/chapters'>
            <a className='dropdown-item family'>Chapters</a>
          </Link>
          <Link href='/authors'>
            <a className='dropdown-item family'>Authors</a>
          </Link>
          <a className='dropdown-item family' href='#'>
            Opportunities
          </a>
        </>
      );
    }
    return (
      <>
        <li className='nav-item'>
          <Link href='/post'>
            <a className='nav-link family'>Browse</a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/events'>
            <a className='nav-link family'>Events</a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/chapters'>
            <a className='nav-link family'>Chapters</a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/authors'>
            <a className='nav-link family'>Authors</a>
          </Link>
        </li>
        <li class='nav-item family dropdown'>
          <a
            class='nav-link dropdown-toggle'
            href='#'
            id='navbarDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            More
          </a>
          <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link href='/about'>
              <a class='dropdown-item'>About Us</a>
            </Link>
            <Link href='/Blog'>
              <a class='dropdown-item'>Blog</a>
            </Link>
            <Link href='/reviews'>
              <a class='dropdown-item'>Reviews</a>
            </Link>
            <Link href='/careers'>
              <a class='dropdown-item'>Careers</a>
            </Link>
            <Link href='/contact-us'>
              <a class='dropdown-item'>Contact Us</a>
            </Link>
            <Link href='/opportunities'>
              <a class='dropdown-item'>Opportunities</a>
            </Link>
            <Link href='/uae'>
              <a class='dropdown-item'>UAE</a>
            </Link>
          </div>
        </li>
      </>
    );
  }
}

export default class NavBar extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      headers: null,
      notificationclicked: false,
      finalNotificationArray: [],
      notidataF: false,
      notidataS: false,
      finalarrayLength: false,
      finalarraycomes: false,
      count: 0,
      likeNotificationArray: [],
      followNotificationArray: [],
      commentNotificationArray: [],
      Logined: false,
      moreVerticalIconClicked: false,
    };
    this.renderPopupComponent = () => {
      return <Authentication />;
    };
    this.imgLoadError = (e) => {
      e.target.src = DefaultProfile;
    };
    this.loginAction = () => {
      if (this.context.state.userAgent === 'mobile') {
        Router.push('/login');
      } else {
        this.context.ShowLoginForm();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  notificationClicked = () => {
    this.setState({ moreVerticalIconClicked: false });
    this.setState({ notificationclicked: !this.state.notificationclicked });
    if (this.state.likeNotificationArray.length > 0) {
      for (let i = 0; i < this.state.likeNotificationArray.length; i++) {
        let obj = this.state.likeNotificationArray[i];
        obj.isread = true;
        let url = `/is_read/like/update/${obj.id}`;
        // fetch(url, {
        //   method: 'put',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(obj),
        // });
        Api.updateIsreadLike(url, obj)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              console.log('done');
            } else {
              console.log('something error');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (this.state.followNotificationArray.length > 0) {
      for (let i = 0; i < this.state.followNotificationArray.length; i++) {
        let obj = this.state.followNotificationArray[i];
        obj.isread = true;
        let url = `/is_read/follow/update/${obj.id}`;
        // fetch(url, {
        //   method: 'put',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(obj),
        // });
        Api.updateIsreadFollow(url, obj)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              console.log('done');
            } else {
              console.log('something error');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    if (this.state.commentNotificationArray.length > 0) {
      for (let i = 0; i < this.state.commentNotificationArray.length; i++) {
        let obj = this.state.commentNotificationArray[i];
        obj.isread = true;
        let url = `/is_read/comment/update/${obj.id}`;
        // fetch(url, {
        //   method: 'put',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(obj),
        // });
        Api.updateIsreadcomment(url, obj)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              console.log('done');
            } else {
              console.log('something error');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    this.setState({ count: 0 });
  };

  componentDidMount = () => {
    let storage = localStorage.getItem('token_decoded');
    if (storage === null) {
    } else {
      this.setState({ Logined: true });
      storage = JSON.parse(storage);
      let id = storage.id;
      let url = 'https://admin.kavishala.in/getallNotifications/';
      let obj = {
        id: id,
      };

      let arrayOfLikeFirst = [];
      let arrayOfLikeSecond = [];
      let finalNotificationArray = [];
      Api.getAllLikeNotification(id).then((response) => {
        if (response.status === 200) {
          this.setState({ notidataF: true });
          arrayOfLikeFirst = response.data;

          Api.getAllLikeNotificationSec(id).then((response) => {
            if (response.status === 200) {
              this.setState({ notidataS: true });
              arrayOfLikeSecond = response.data;

              let likenotificationArray = [];
              for (let i = 0; i < arrayOfLikeFirst.length; i++) {
                let obj = arrayOfLikeFirst[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;

                let message = `you like the post ${obj.Title}`;
                obj['message'] = message;
                likenotificationArray.push(obj);
              }

              for (let i = 0; i < arrayOfLikeSecond.length; i++) {
                let obj = arrayOfLikeSecond[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;

                let message = `${obj.LikerName} liked your post ${obj.Title}`;

                obj['message'] = message;

                if (obj.idOfLiker == id && obj.idOfPostedBy == id) {
                  likenotificationArray.push(obj);
                } else {
                  if (obj.isread === false) {
                    console.log(obj.isread);
                    this.setState({ count: this.state.count + 1 });
                  }
                  likenotificationArray.push(obj);
                  finalNotificationArray.push(obj);
                }
              }

              this.setState({
                finalNotificationArray: [
                  ...this.state.finalNotificationArray,
                  finalNotificationArray,
                ],
              });
              this.setState({ likeNotificationArray: likenotificationArray });
            } else {
              console.log('some error');
            }
          });
        } else {
          console.log('some error');
        }
      });

      let arrofCommentFirst = [];
      let arrofCommentSecond = [];
      Api.getAllCommentNotification(id).then((response) => {
        if (response.status === 200) {
          this.setState({ notidataF: true });
          arrofCommentFirst = response.data;

          Api.getAllCommentNotificationSec(id).then((response) => {
            if (response.status === 200) {
              this.setState({ notidataS: true });
              arrofCommentSecond = response.data;

              let commentnotificationArray = [];
              for (let i = 0; i < arrofCommentFirst.length; i++) {
                let obj = arrofCommentFirst[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;

                let message = `you Comment on the post ${obj.Title}`;
                obj['message'] = message;
                commentnotificationArray.push(obj);
              }

              for (let i = 0; i < arrofCommentSecond.length; i++) {
                let obj = arrofCommentSecond[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;

                let message = `${obj.userName} Commented on your post ${obj.Title}`;
                obj['message'] = message;
                if (obj.userid == id && obj.postedby) {
                  commentnotificationArray.push(obj);
                } else {
                  if (obj.isread === false) {
                    console.log(obj.isread);
                    this.setState({ count: this.state.count + 1 });
                  }
                  commentnotificationArray.push(obj);
                  finalNotificationArray.push(obj);
                }
              }

              this.setState({
                finalNotificationArray: [
                  ...this.state.finalNotificationArray,
                  finalNotificationArray,
                ],
              });
              this.setState({
                commentNotificationArray: commentnotificationArray,
              });
            } else {
              console.log('some error');
            }
          });
        } else {
          console.log('some error');
        }
      });

      let arrofFollowFirst = [];
      let arrofFollowSecond = [];
      Api.getAllFollowNotification(id).then((response) => {
        if (response.status === 200) {
          this.setState({ notidataF: true });
          arrofFollowFirst = response.data;

          Api.getAllFollowNotificationSec(id).then((response) => {
            if (response.status === 200) {
              this.setState({ notidataS: true });
              arrofFollowSecond = response.data;

              let follownotificationArray = [];

              for (let i = 0; i < arrofFollowFirst.length; i++) {
                let obj = arrofFollowFirst[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;
                let message = `you ${obj.Action}  ${obj.username}`;
                obj['message'] = message;
                follownotificationArray.push(obj);
              }

              for (let i = 0; i < arrofFollowSecond.length; i++) {
                let obj = arrofFollowSecond[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;
                let message = '';
                if (obj.Action === 'follow') {
                  message = `${obj.username} started ${obj.Action}ing you`;
                } else {
                  message = `${obj.username} ${obj.Action}ed you`;
                }
                obj['message'] = message;
                if (obj.userid == id && obj.fuserid == id) {
                  follownotificationArray.push(obj);
                } else {
                  if (obj.isread === false) {
                    console.log(obj.isread);
                    this.setState({ count: this.state.count + 1 });
                  }
                  follownotificationArray.push(obj);
                  finalNotificationArray.push(obj);
                }
              }

              this.setState({
                finalNotificationArray: [
                  ...this.state.finalNotificationArray,
                  finalNotificationArray,
                ],
              });
              console.log(this.state.finalNotificationArray);
              this.setState({
                followNotificationArray: follownotificationArray,
              });

              let ArrayOfNotifications = [];
              if (this.state.finalNotificationArray.length > 0) {
                ArrayOfNotifications = this.state.finalNotificationArray[
                  this.state.finalNotificationArray.length - 1
                ];
              }
              this.setState({ finalarraycomes: true });
            } else {
              console.log('some error');
            }
          });
        } else {
          console.log('some error');
        }
      });
    }
  };

  faellipsisvClicked = () => {
    this.setState({ notificationclicked: false });
  };

  viewMoreClicked = () => {
    Router.push('/notifications');
    this.setState({ notificationclicked: false });
  };

  logoutClicked = () => {
    this.setState({ Login: false });
  };

  moreVerticalIconClicked = () => {
    this.setState({ notificationclicked: false });
    this.setState({
      moreVerticalIconClicked: !this.state.moreVerticalIconClicked,
    });
  };

  sinGleNotificationClicked = (event) => {
    console.log('single notification clicked');
    let attribute = event.target.getAttribute('value');
    console.log(attribute);
    let obj = JSON.parse(attribute);
    let storage = localStorage.getItem('token_decoded');
    storage = JSON.parse(storage);
    let storageId = storage.id;
    console.log(obj);
    console.log(obj.postedby);
    console.log(obj.idOfPostedBy);
    console.log(obj.fuserid);
    if (
      obj.postedby === undefined &&
      obj.idOfPostedBy === undefined &&
      obj.fuserid !== undefined
    ) {
      if (storageId == obj.fuserid) {
        let username = obj.username;
        console.log(username);
        let url = `/@${username}`;
        console.log(url);
        Router.push(`/@${username}`);
      }
    } else if (
      obj.postedby !== undefined &&
      obj.idOfPostedBy === undefined &&
      obj.fuserid === undefined
    ) {
      let postid = obj.postid;
      console.log(postid);
      // let url = `https://admin.kavishala.in/postByid/get/${postid}/`;
      // fetch(url, {
      //   method: 'get',
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      Api.getPostByID(postid)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            console.log('done');
          } else {
            console.log('something wrong');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    let notifications = [];
    if (this.state.finalarraycomes) {
      let notificationsArray = this.state.finalNotificationArray[
        this.state.finalNotificationArray.length - 1
      ];
      for (let i = 0; i < notificationsArray.length; i++) {
        let TimeStamp = notificationsArray[i].TimeStamp;
        var myDate = new Date(TimeStamp);
        var offset = myDate.getTimezoneOffset() * 60 * 1000;
        var withOffset = myDate.getTime();
        notificationsArray[i]['realTime'] = withOffset;
      }
      const sortedArray = notificationsArray.sort(
        (a, b) => b.realTime - a.realTime
      );
      console.log(sortedArray);
      console.log(notificationsArray);
      if (notificationsArray.length >= 12) {
        for (let i = 0; i < 12; i++) {
          notifications.push(notificationsArray[i]);
        }
      } else {
        notifications = notificationsArray;
      }
    } else {
      notifications = this.state.finalNotificationArray;
    }

    let visibility = '';
    if (this.state.count == 0) {
      visibility = 'hidden';
    } else {
      visibility = 'visible';
    }

    let display = '';
    if (this.state.count == 0) {
      display = 'none';
    } else {
      display = 'block';
    }

    console.log(this.state.count);

    return (
      <>
        <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
          <Link href='/'>
            <a className='navbar-brand'>
              <img
                src={logo}
                alt='Kavishala logo'
                style={{ height: '40px', width: '40px' }}
              />
            </a>
          </Link>

          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <MenuItems userInfo={this.context.state.userInfo.username} />
            </ul>
            <ul className='navbar-nav'>
              <Search />
              {this.context.state.isAuthenticated ? (
                <>
                  <li className='nav-item hide-mobile pt-2'>
                    <Link href='/post/create'>
                      {this.context.state.userInfo.is_writer ? (
                        <a className='nav-link family'>Submit a post</a>
                      ) : (
                        <BecomeAWriter />
                      )}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      href={`/[username]`}
                      as={`/${this.context.state.userInfo.username}`}
                    >
                      <a className='nav-link'>
                        <img
                          src={
                            this.context.state.userInfo.image || DefaultProfile
                          }
                          id='profilePicNavbar'
                          onError={(e) => {
                            Utils.imgLoadError(e, DefaultProfile);
                          }}
                        />
                        &nbsp;
                        <span className='d-lg-none'>Account</span>
                      </a>
                    </Link>
                  </li>
                  <li
                    className='nav-item pointer hide-mobile pt-2'
                    onClick={this.logoutClicked}
                  >
                    <a
                      className='nav-link family'
                      onClick={this.context.LogoutUser}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className='pt-2'>
                  <a
                    className='nav-link family pointer hide-mobile'
                    onClick={this.context.ShowLoginForm}
                  >
                    Login / Sign Up
                  </a>
                </li>
              )}
              {this.state.Logined && (
                <>
                  <li
                    className='notification-bell'
                    style={{
                      margin: 'auto',
                      color: 'red',
                    }}
                  >
                    <NotificationsIcon onClick={this.notificationClicked} />
                  </li>
                  <div
                    className='notificationCountContainer'
                    style={{
                      visibility: `${visibility}`,
                      display: `${display}`,
                    }}
                  >
                    {notifications.length > 0 && (
                      <li
                        className='notification-count'
                        style={{
                          margin: 'auto',
                          color: 'red',
                          fontSize: '10px',
                          visibility: `${visibility}`,
                        }}
                      >
                        {this.state.count}
                      </li>
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>

          {this.state.moreVerticalIconClicked && (
            <div
              className='mobile_dropDown'
              aria-labelledby='navbarDropdown'
              style={{
                position: 'absolute',
                background: 'white',
                top: '67px',
                right: 'calc(100% - 95%)',
              }}
            >
              <MenuItems mobile />
              {this.context.state.isAuthenticated ? (
                <>
                  {/* <div class='dropdown-divider'></div> */}
                  <li className='nav-item'>
                    <a
                      className='nav-link family'
                      onClick={this.context.LogoutUser}
                    >
                      Log Out
                    </a>
                  </li>
                </>
              ) : null}
            </div>
          )}

          {this.state.notificationclicked && (
            <>
              <div
                className='notificationDropDown'
                style={{
                  position: 'absolute',
                  top: '3.3rem',
                  background: ' white',
                  right: 'calc(100% - 98%)',
                  color: 'black',
                  width: '300px',
                  height: '300px',
                  borderRadius: '2px',
                  border: '0.1px solid #a97902a1',
                  overflow: 'scroll',
                }}
              >
                {notifications.map((value, index) => {
                  console.log(value);
                  let stringobj = JSON.stringify(value);
                  console.log(stringobj);
                  return (
                    <>
                      <div
                        className='cont'
                        key={index}
                        value={stringobj}
                        style={{
                          wordBreak: 'break-all',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                          padding: '0.1rem',
                          margin: '0.1rem',
                          border: '0.1px solid #80808021',
                          cursor: 'pointer',
                        }}
                        // onClick={this.sinGleNotificationClicked}
                      >
                        {value.message}
                      </div>
                    </>
                  );
                })}
                {notifications.length > 0 && (
                  <div className='viewMore' onClick={this.viewMoreClicked}>
                    View More
                  </div>
                )}
              </div>
            </>
          )}

          <div className='d-lg-none mobile-menu'>
            <ul className='navbar-nav mr-auto'>
              {/* <Languages mode="dropdown" /> */}
              {this.context.state.isAuthenticated ? (
                <>
                  <li className='nav-item pr-2 pt-2'>
                    <Link href='/post/create'>
                      {this.context.state.userInfo.is_writer ? (
                        <a className='nav-link family'>Submit a post</a>
                      ) : (
                        <BecomeAWriter />
                      )}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      href={`/[username]`}
                      as={`/${this.context.state.userInfo.username}`}
                    >
                      <a className='nav-link'>
                        <img
                          src={
                            this.context.state.userInfo.image || DefaultProfile
                          }
                          id='profilePicNavbar'
                          onError={(e) => {
                            Utils.imgLoadError(e, DefaultProfile);
                          }}
                        />
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                <div
                  className='pt-3 pr-3 login-signup-text'
                  onClick={this.loginAction}
                >
                  Login / Sign Up
                </div>
              )}
              <Search />

              {this.state.Logined && (
                <>
                  <li
                    className='notification-bell'
                    style={{
                      margin: 'auto',
                      color: 'red',
                    }}
                  >
                    <NotificationsIcon onClick={this.notificationClicked} />
                  </li>
                  <div
                    className='notificationCountContainer'
                    style={{
                      visibility: `${visibility}`,
                      display: `${display}`,
                    }}
                  >
                    {notifications.length > 0 && (
                      <li
                        className='notification-count'
                        style={{
                          margin: 'auto',
                          color: 'red',
                          fontSize: '10px',
                          visibility: `${visibility}`,
                        }}
                      >
                        {this.state.count}
                      </li>
                    )}
                  </div>
                </>
              )}

              {/* <div
                className='menuIcon'
                onClick={() => {
                  this.state.notificationclicked = false;
                }}
              > */}

              <div
                className='iconContainer'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MoreVertIcon onClick={this.moreVerticalIconClicked} />
              </div>

              {/* </div> */}
            </ul>
          </div>
        </nav>
        {this.context.state.showReadIndicator ? <ReadIndicator /> : null}
        <Popup
          visible={this.context.state.showLoginForm}
          closeOnOutsideClick={true}
          onHiding={() => {
            this.context.ShowLoginForm();
          }}
          contentComponent={this.renderPopupComponent}
          showCloseButton={true}
          showTitle={false}
          width={'25%'}
          height={'60%'}
          className={'authentication-popup'}
          focusStateEnabled={false}
        />
        <style jsx>
          {`
            nav {
              box-shadow: none;
              border-bottom: 0.1px solid lightgrey;
            }
            .bg-light {
              background-color: white !important;
            }
            @media (max-width: 426px) {
              .login-signup-text {
                font-size: 14px;
              }
            }
          `}
        </style>
      </>
    );
  }
}
