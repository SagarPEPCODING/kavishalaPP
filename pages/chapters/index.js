import React, { Component } from "react";
import Api from "Api/Api";
import EventChapterCard from "components/EventCard/EventChapterCard";
import ChapterCommunityCard from "components/ChapterCommunityCard";
import SEO from "components/SEO";
export default class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
    };
  }
  componentDidMount() {
    Api.getAllChapters().then((response) => {
      if (response.status === 200) {
        this.setState({ chapters: response.data });
      }
    });
  }

  render() {
    return (
      <>
        <SEO title={"Chapters | Kavishala"} og_url={"/chapters"} />
        <div className="events contentBody">
          {this.state.chapters.map((event) => {
            return (
              <ChapterCommunityCard
                data={event}
                hrefLink={"/chapters/[chapterslug]"}
              />
            );
          })}
        </div>
      </>
    );
  }
}
