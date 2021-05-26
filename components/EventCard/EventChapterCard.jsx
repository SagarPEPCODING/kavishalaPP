import React, { Component } from "react";
import Link from "next/link";
import moment from "moment";
import "./EventCard.css";
export default class EventChapterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data,
    };
  }
  render() {
    return (
      <Link as={this.state.event.url} href={this.props.hrefLink}>
        <a className="event-card flex customLink hoverEffect">
          <div className="date-box">
            <div className="month">
              {moment(this.state.event.scheduled).format("MMM")}
            </div>
            <div className="date">
              {moment(this.state.event.scheduled).format("DD")}
            </div>
          </div>
          <div className="event-info">
            <h4>{this.state.event.title}</h4>
            <div style={{ color: "#867d7d" }} className="event-time">
              <i className="fa fa-clock-o"></i>&nbsp;
              <span>
                {moment(this.state.event.scheduled).format("hh:mm a")}
              </span>
            </div>
            <div style={{ color: "#ffb52e" }} className="event-location">
              <i className="fa fa-map-marker"></i>&nbsp;
              <span>{this.state.event.location}</span>
            </div>
          </div>
        </a>
      </Link>
    );
  }
}
