import React, { Component } from "react";
import Link from "next/link";
import moment from "moment";
import "components/EventCard/EventCard.css";
export default class ChapterCommunityCard extends Component {
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
          <img src={this.state.event.header_image} />
          <h4 className="ml-3 text-capitalize">{this.state.event.title}</h4>
        </a>
      </Link>
    );
  }
}
