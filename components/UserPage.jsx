import React, { Component } from "react";
import Auth from "Api/Auth";
import Api from "Api/Api";
import Router from "next/router";
import "./userprofile.css";
import UserPostConatiner from "components/UserPostConatiner";
import Utils from "Utils";
var DefaultImg = "/images/Logo_K2.png";
var loadingImg = "/images/loading.gif";
import UserForm from "components/UserForm";
import FollowButton from "components/FollowButton";
import Share from "components/Share";
import { Context } from "Context/context";
import ReadMore from "components/ReadMore";
export default class UserPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.data,
      canEdit: false,
      image: null,
    };

    this.uploadProfilePic = () => {
      var form = new FormData();
      form.append("image", document.getElementById("profile-pic").files[0]);
      this.setState({
        image: loadingImg,
      });
      Api.updateUserInfo(form).then((response) => {
        if (response.status === 200) {
          this.setState({ image: response.data.image });
        }
      });
    };
    this.changeProfilePic = () => {
      // open the file picker
      var picker = document.querySelector("#profile-pic");
      picker.click();
    };
    this.updateUserInfo = (data) => {
      this.setState({ userInfo: data });
    };
    this.followAction = (action) => {
      let follow = this.state.userInfo.followers_count;
      switch (action) {
        case "follow":
          follow += 1;
          break;
        case "unfollow":
          follow -= 1;
          break;
      }
      this.setState({
        userInfo: { ...this.state.userInfo, followers_count: follow },
      });
    };
    this.renderAbout = () => {
      let limit = 0;
      if (this.context.state.userAgent === "mobile") {
        limit = 107;
      } else {
        limit = 500;
      }
      if (
        this.state.userInfo.raw_bio &&
        this.state.userInfo.raw_bio.length > limit
      ) {
        return <ReadMore about={this.state.userInfo.bio} />;
      }
      return (
        <div
          className="userAbout"
          dangerouslySetInnerHTML={{
            __html: this.state.userInfo.bio || "A kavishala writer",
          }}
        />
      );
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.userInfo.slug !== props.data.slug) {
      return {
        canEdit: Auth.isAuthorized(props.data.slug),
        userInfo: props.data,
        image: props.data.image || DefaultImg,
      };
    }
  }

  componentDidMount() {
    this.setState(
      {
        canEdit: Auth.isAuthorized(this.props.data.slug),
        userInfo: this.props.data,
        image: this.props.data.image || DefaultImg,
      },
      () => {
        if (this.props.edit) {
          document.querySelector(".user-edit-btn").click();
        }
      }
    );
    console.log(this.props.data);
  }

  render() {
    return (
      <>
        {this.state.userInfo ? (
          <>
            <div className="user-profile">
              <section className="text-white text-center">
                <div className="userData">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="profile-img position-relative mx-auto">
                        <img
                          onClick={
                            this.state.canEdit ? this.changeProfilePic : null
                          }
                          alt={`${this.state.userInfo.username}'s Profile Pic`}
                          className={`w-100 h-100 ${
                            this.state.canEdit ? "pointer" : ""
                          }`}
                          src={this.state.image}
                          onError={(e) => {
                            Utils.imgLoadError(e, DefaultImg);
                          }}
                        />
                        <input
                          type="file"
                          name="profile-pic"
                          id="profile-pic"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={this.uploadProfilePic}
                        />
                        {this.state.canEdit ? (
                          <div
                            className="position-absolute rounded-circle camera-icon pointer"
                            onClick={this.changeProfilePic}
                          >
                            <i className="fa fa-camera"></i>
                          </div>
                        ) : null}
                        <div className="row social position-absolute">
                          <div className="col-3 col-lg-3">
                            <a href={this.state.userInfo.twitter}>
                              <i className="fa fa-twitter"></i>
                            </a>
                          </div>
                          <div className="col-3 col-lg-3">
                            <a href={this.state.userInfo.facebook}>
                              <i className="fa fa-facebook"></i>
                            </a>
                          </div>
                          <div className="col-3 col-lg-3">
                            <a href={this.state.userInfo.instagram}>
                              <i className="fa fa-instagram"></i>
                            </a>
                          </div>
                          <div className="col-3 col-lg-3">
                            <a href={this.state.userInfo.youtube}>
                              <i className="fa fa-youtube-play"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="font mb-0">
                    <span>{this.state.userInfo.username}</span>{" "}
                    {this.state.userInfo.featured ? (
                      <i
                        className="fa fa-check-circle"
                        title="Featured writer"
                      ></i>
                    ) : null}
                    {this.state.canEdit ? (
                      <UserForm
                        userData={this.state.userInfo}
                        getUpdateInfo={this.updateUserInfo}
                      />
                    ) : null}
                  </h1>
                  <div className="userStats">
                    {this.state.userInfo.city || this.state.userInfo.country ? (
                      <p className="text-capitalize">
                        {this.state.userInfo.city &&
                          `${this.state.userInfo.city}`}
                        {this.state.userInfo.country &&
                          `, ${this.state.userInfo.country}`}
                      </p>
                    ) : null}
                    <div className="container-fluid userInfo">
                      <div className="row">
                        <div className="col-lg-12 col-12">
                          <span className="">
                            <b>{this.state.userInfo.followers_count}</b>{" "}
                            Followers
                          </span>
                          <span className="dotDividerBefore">
                            <b>{this.state.userInfo.following_count}</b>{" "}
                            Followings
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid userInfo">
                      <div className="row">
                        <div className="col-4">
                          <p className="mb-0">
                            {this.state.userInfo.posts_count}
                          </p>
                          <p className="mb-0">Posts</p>
                        </div>
                        <div className="col-4">
                          <p className="mb-0">
                            {this.state.userInfo.post_likes}
                          </p>
                          <p className="mb-0">Likes</p>
                        </div>
                        <div className="col-4">
                          <p className="mb-0">
                            {this.state.userInfo.post_views}
                          </p>
                          <p className="mb-0">Reads</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="mr-2">
                        <FollowButton
                          follow_id={this.state.userInfo.id}
                          getFollowData={this.followAction}
                        />
                      </span>
                      <Share
                        title={this.state.userInfo.username}
                        type="button"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="advanced container">
                <div className="row">
                  <div className="col-lg-12">
                    <h3
                      style={{
                        display: "inline-block",
                        marginRight: 20,
                      }}
                    >
                      About
                    </h3>
                    {this.renderAbout()}
                  </div>
                </div>
              </section>
              <UserPostConatiner slug={this.state.userInfo.slug} />
            </div>
          </>
        ) : null}
      </>
    );
  }
}
