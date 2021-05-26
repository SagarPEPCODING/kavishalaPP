import React, { Component } from "react";
import Api from "Api/Api";
import moment from "moment";
import "./EventPage.css";
import Organizer from "components/Organizer";
import UserProfileCircle from "components/UserProfileCircle/UserProfileCircle";
import Utils from "Utils";
import SEO from "components/SEO";
import { Context } from "Context/context";
import Auth from "Api/Auth";
export default class EventPage extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event,
      isRegistered: this.props.isRegistered,
    };
    this.registerEvent = () => {
      if (this.state.isRegistered) {
        var method = "DELETE";
        var newState = { isRegistered: false };
      } else {
        var method = "POST";
        var newState = { isRegistered: true };
      }
      if (Auth.isAuthenticated()) {
        Api.registerEvent(this.state.event.slug, method).then((response) => {
          if (response.status === 200) {
            this.setState(newState);
            if (this.state.isRegistered) {
              Utils.notify("Successfully registered", "success");
            }
          }
        });
      } else {
        this.context.ShowLoginForm();
      }
    };
  }

  static getInitialProps(ctx) {
    return Api.getEventInfo(ctx.query.eventslug).then((response) => {
      if (response.status === 200) {
        console.log("event details====>", response.data[0]);
        return {
          event: response.data[0],
        };
      }
    });
  }

  componentDidMount() {
    Api.checkRegistration("event", this.props.event.slug).then((response) => {
      if (response.status === 200) {
        this.setState({
          isRegistered: response.data.registered,
        });
      }
    });
  }

  render() {
    return (
      <>
        <SEO
          title={`${this.state.event.title} | ${moment(
            this.state.event.scheduled
          ).fromNow()}`}
          og_url={this.state.event.url}
          og_type="article"
          og_title={this.state.event.title}
          og_description={`${this.state.event.raw_content.slice(0, 100)}...`}
          og_image={this.state.event.header_image}
        />
        <div className="event-page contentBody">
          <div className="event-header">
            <img
              src={this.state.event.header_image}
              alt={`${this.state.event.title}'s image`}
            />
            <div className="event-info-header">
              <h4>{this.state.event.title}</h4>
              {this.state.event.open ? (
                <button
                  className="btn btn-primary"
                  onClick={this.registerEvent}
                >
                  {this.state.isRegistered ? "Unregister" : "Register"}
                </button>
              ) : null}

              <div className="schedule">
                <p>
                  <i className="fa fa-calendar"></i>&nbsp;
                  {moment(this.state.event.scheduled).format("MMMM DD, YYYY")}
                </p>

                <p>
                  <i className="fa fa-clock-o"></i>&nbsp;
                  {moment(this.state.event.scheduled).format("hh:mm a")}
                </p>
                <p>
                  <i className="fa fa-history"></i>&nbsp;
                  {moment(this.state.event.scheduled).fromNow()}
                </p>
              </div>
            </div>
          </div>
          <div className="row" style={{ padding: "10px 0px" }}>
            <div className="col-lg-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.event.information,
                }}
              />
              <h4>Organizers</h4>
              {this.state.event.organizer.map((organizer) => {
                return <Organizer data={organizer} />;
              })}
            </div>
            <div className="col-lg-4">
              <h4>
                Venue <i className="fa fa-map-marker"></i>
              </h4>
              <p className="capitalize">{this.state.event.location}</p>
              <h4>Attendees</h4>
              <div className="attendees mb-1">
                {this.state.event.attendees.map((attendee) => {
                  return <UserProfileCircle data={attendee} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
