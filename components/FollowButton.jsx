import React, { Component } from 'react';
import Auth from 'Api/Auth';
import Api from 'Api/Api';
import { Context } from 'Context/context';
import fetch from 'isomorphic-unfetch';
export default class FollowButton extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      follow_id: this.props.follow_id,
      followed: false,
    };
    this.clicked = () => {
      if (!this.state.authenticated) {
        this.context.ShowLoginForm();
      } else {
        let action = 'follow';
        if (this.state.followed) {
          action = 'unfollow';
        }
        Api.followAction(action, this.state.follow_id).then((response) => {
          if (response.status === 200) {
            this.setState({ followed: !this.state.followed });
            this.props.getFollowData(action);
          }
        });

        let storage = localStorage.getItem('token_decoded');
        if (storage === null) {
          this.context.ShowLoginForm();
        } else {
          storage = JSON.parse(storage);
          let id = storage.id;
          let fid = this.props.follow_id;
          let username = '';
          let fusername = '';
          Api.getUserId(id).then((response) => {
            console.log(response);
            console.log(response.data.username);
            username = storage.username;
            username = username.substring(1);
            if (response.status === 200) {
              console.log('fine now');
              Api.getUserId(fid).then((response) => {
                console.log(response);
                console.log(response.data.username);
                fusername = response.data.username;
                if (response.status === 200) {
                  console.log('its ohk now');
                  let obj = {
                    Action: action,
                    userid: id,
                    fuserid: fid,
                    username: username,
                    fusername: fusername,
                  };

                  console.log(obj);

                  let url = '/follow/setnotification/';
                  // fetch(url, {
                  //   method: 'post',
                  //   headers: {
                  //     'Content-Type': 'application/json',
                  //   },
                  //   body: JSON.stringify(obj),
                  // })
                  //   .then((response) => {
                  //     console.log(response);
                  //   })
                  //   .catch((error) => {
                  //     console.log(error);
                  //   });
                  Api.setFollowNotification(url, obj)
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
                } else {
                  console.log('there is some error');
                }
              });
            } else {
              console.log('there is some error');
            }
          });
        }
      }
    };
  }
  componentDidMount() {
    if (Auth.isAuthenticated()) {
      this.setState({ authenticated: true });
    }
    Api.checkFollow(this.props.follow_id).then((response) => {
      if (response.status === 200) {
        this.setState({ followed: response.data.followed });
      }
    });

    console.log(this.props.follow_id);
  }

  render() {
    return (
      <>
        <button className='btn btn-primary' onClick={this.clicked}>
          <i
            className={`fa ${
              this.state.followed ? 'fa-user-times' : 'fa-user-plus'
            }`}
          ></i>{' '}
          {this.state.followed ? 'Unfollow' : 'Follow'}
        </button>
        <style jsx>
          {`
            button,
            button:focus,
            button:active {
              background-color: white !important;
              border: unset;
              color: #00102c !important;
              box-shadow: unset;
            }
            button:hover {
              background-color: #00102c !important;
              color: white !important;
            }
          `}
        </style>
      </>
    );
  }
}
