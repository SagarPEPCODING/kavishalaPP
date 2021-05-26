import React, { Component } from "react";
import Api from "Api/Api";
import moment from "moment";
import "../events/EventPage.css";
import Organizer from "components/Organizer";
import UserProfileCircle from "components/UserProfileCircle/UserProfileCircle";
import EventChapterCard from "components/EventCard/EventChapterCard";
import Utils from "Utils";
import SEO from "components/SEO";
import { Context } from "Context/context";
import Auth from "Api/Auth";
export default class EventPage extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      chapter: this.props.chapter,
      isRegistered: this.props.isRegistered,
    };
    this.registerChapter = () => {
      if (this.state.isRegistered) {
        var method = "DELETE";
        var newState = { isRegistered: false };
      } else {
        var method = "POST";
        var newState = { isRegistered: true };
      }
      if (Auth.isAuthenticated()) {
        Api.registerCommunity(this.state.chapter.slug, method).then(
          (response) => {
            if (response.status === 200) {
              this.setState(newState);
              if (this.state.isRegistered) {
                Utils.notify("Successfully registered", "success");
              }
            }
          }
        );
      } else {
        this.context.ShowLoginForm();
      }
    };
  }

  static getInitialProps(ctx) {
    return Api.getCommunityInfo(ctx.query.communityslug).then((response) => {
      if (response.status === 200) {
        return {
          chapter: response.data[0],
        };
      }
    });
  }

  componentDidMount() {
    Api.checkRegistration("community", this.props.chapter.slug).then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            isRegistered: response.data.registered,
          });
        }
      }
    );
  }

  render() {
    return (
      <>
        <SEO
          title={`${this.state.chapter.title} | ${moment(
            this.state.chapter.scheduled
          ).fromNow()}`}
          og_type="article"
          og_title={this.state.chapter.title}
          og_description={`${this.state.chapter.raw_content.slice(0, 100)}...`}
          og_image={this.state.chapter.header_image}
          og_url={this.state.chapter.url}
        />
        <div className="event-page contentBody">
          <div className="event-header">
            <img
              src={this.state.chapter.header_image}
              alt={`${this.state.chapter.title}'s image`}
            />
            <div className="event-info-header">
              <h4>{this.state.chapter.title}</h4>
              <button
                className="btn btn-primary"
                onClick={this.registerChapter}
              >
                {this.state.isRegistered ? "Leave" : "Join"}
              </button>
            </div>
          </div>
          {this.state.chapter.annoucement ? (
            <div className="container-fluid">
              <div className="row announcements">
                <div className="col-lg-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.chapter.annoucement,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div className="row" style={{ padding: "10px 0px" }}>
            <div className="col-lg-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.chapter.information,
                }}
              />
              <h4>Events</h4>
              {this.state.chapter.events.map((event) => {
                return (
                  <EventChapterCard
                    data={event}
                    hrefLink={"/events/[eventslug]"}
                  />
                );
              })}
              <h4>Community Leader</h4>
              {this.state.chapter.organizer.map((organizer) => {
                return <Organizer data={organizer} />;
              })}
            </div>
            <div className="col-lg-4">
              <h4>Members</h4>
              <div className="">
                {this.state.chapter.members.map((member) => {
                  return <UserProfileCircle data={member} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
