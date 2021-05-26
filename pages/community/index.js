import React, { Component } from "react";
import Api from "Api/Api";
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
    Api.getAllCommunity().then((response) => {
      if (response.status === 200) {
        this.setState({ chapters: response.data });
      }
    });
  }

  render() {
    return (
      <>
        <SEO title={"Community | Kavishala"} og_url={"/community"} />
        <div className="events contentBody">
          {this.state.chapters.map((event) => {
            return (
              <ChapterCommunityCard
                data={event}
                hrefLink={"/community/[communityslug]"}
              />
            );
          })}
        </div>
      </>
    );
  }
}
