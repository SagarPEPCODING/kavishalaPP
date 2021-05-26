import React, { Component } from "react";
import Api from "Api/Api";
import EventChapterCard from "components/EventCard/EventChapterCard";
import SEO from "components/SEO";
export default class Events extends Component {
  static getInitialProps(ctx) {
    return Api.getAllEvents().then((response) => {
      if (response.status === 200) {
        return { events: response.data };
      }
    });
  }

  render() {
    return (
      <>
        <SEO title={"Events | Kavishala"} og_url={`/events`} />
        <div className="events contentBody">
          {this.props.events.map((event) => {
            return (
              <EventChapterCard
                data={event}
                key={event.id}
                hrefLink={"/events/[eventslug]"}
              />
            );
          })}
        </div>
      </>
    );
  }
}
