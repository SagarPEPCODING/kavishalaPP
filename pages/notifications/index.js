import React, { Component } from 'react';
import Api from '../../Api/Api.js';
import SEO from 'components/SEO';
import './notification.css';

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notidataF: false,
      notidataS: false,
      count: 0,
      finalNotificationArray: [],
      likeNotificationArray: [],
      commentNotificationArray: [],
      followNotificationArray: [],
      finalarraycomes: false,
      notifications: [],
    };
  }
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

      // ******************8 Finding the notification of like... (((())))
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
                console.log(obj);
                if (obj.isread === false) {
                  // this.setState({ count: this.state.count + 1 });
                }
                likenotificationArray.push(obj);
                // finalNotificationArray.push(obj);
              }

              for (let i = 0; i < arrayOfLikeSecond.length; i++) {
                let obj = arrayOfLikeSecond[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;
                let message = `${obj.LikerName} liked your post ${obj.Title}`;
                obj['message'] = message;
                if (obj.isread === false) {
                  this.setState({ count: this.state.count + 1 });
                }
                likenotificationArray.push(obj);
                finalNotificationArray.push(obj);
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

      // ****************************************************************

      let arrofCommentFirst = [];
      let arrofCommentSecond = [];
      // ****************** Finding the notification of Comments... (((())))
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
                console.log(obj);
                obj['message'] = message;
                // array.push(message);
                if (obj.isread === false) {
                  // this.setState({ count: this.state.count + 1 });
                }
                commentnotificationArray.push(obj);
                // finalNotificationArray.push(obj);
              }

              for (let i = 0; i < arrofCommentSecond.length; i++) {
                let obj = arrofCommentSecond[i];
                let array = [];
                array.push(obj);
                let timedate = new Date(obj.TimeStamp);
                obj['timedate'] = timedate;
                let message = `${obj.userName} Commented on your post ${obj.Title}`;
                obj['message'] = message;
                console.log(obj);
                // array.push(message);
                if (obj.isread === false) {
                  this.setState({ count: this.state.count + 1 });
                }
                commentnotificationArray.push(obj);
                finalNotificationArray.push(obj);
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

      // ****************************************************************

      let arrofFollowFirst = [];
      let arrofFollowSecond = [];
      // ****************** Finding the notification of Follows... (((())))
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
                console.log(obj);
                obj['message'] = message;
                // array.push(message);
                if (obj.isread === false) {
                  // this.setState({ count: this.state.count + 1 });
                }
                follownotificationArray.push(obj);
                // finalNotificationArray.push(obj);
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
                console.log(obj);
                obj['message'] = message;
                if (obj.isread === false) {
                  this.setState({ count: this.state.count + 1 });
                }
                follownotificationArray.push(obj);
                finalNotificationArray.push(obj);
              }

              this.setState({
                finalNotificationArray: [
                  ...this.state.finalNotificationArray,
                  finalNotificationArray,
                ],
              });
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

      // ****************************************************************
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
        // console.log(typeof notificationsArray[i].realTime);
      }
      const sortedArray = notificationsArray.sort(
        (a, b) => b.realTime - a.realTime
      );
      // console.log(sortedArray);
      // console.log(notificationsArray);
      if (notificationsArray.length >= 12) {
        for (let i = 0; i < 12; i++) {
          notifications.push(notificationsArray[i]);
        }
      } else {
        notifications = notificationsArray;
      }
      // console.log(this.state.count);
    } else {
      notifications = this.state.finalNotificationArray;
    }

    return (
      <>
        <div className='contentBody'>
          <SEO
            title='Sootradhar | Kavishala'
            og_title='Sootradhar | Kavishala'
            og_description={this.state.description}
            og_url={'/sootradhar'}
          />
          <div
            className='notificationContainer'
            style={{
              color: 'black',
              background: '#f4f3f3d6',
              borderRadius: '2px',
            }}
          >
            {notifications.map((value, index) => {
              return (
                <div
                  className='content'
                  key={index}
                  style={{
                    fontSize: '18px',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                    margin: '1px',
                    padding: '9px',
                  }}
                >
                  {value.message}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default index;
