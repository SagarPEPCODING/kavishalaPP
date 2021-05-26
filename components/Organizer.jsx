import React, { Component } from "react";
import Link from "next/link";
var DefaultImg = "/images/Logo_K2.png";
export default class Organizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizer: this.props.data,
    };
  }

  render() {
    return (
      <>
        <Link href="/[username]" as={`/${this.state.organizer.slug}`}>
          <a className="Organizer my-card customLink hoverEffect">
            <img
              className="card-img"
              src={this.state.organizer.image || DefaultImg}
              alt={`${this.state.organizer.username}'s profile picture`}
            />
            <div className="my-card-body">
              <h4>@{this.state.organizer.username}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.organizer.bio || "A Kavishala Author",
                }}
              />
              <p>
                {this.state.organizer.phone ? (
                  <>
                    <i className="fa fa-phone"></i>&nbsp;
                    <a href={`tel:${this.state.organizer.phone}`}>
                      {this.state.organizer.phone}
                    </a>
                    &nbsp;&nbsp;
                  </>
                ) : null}
                {this.state.organizer.email ? (
                  <>
                    <i className="fa fa-envelope"></i>&nbsp;
                    <a href={`mailto:${this.state.organizer.email}`}>
                      {this.state.organizer.email}
                    </a>
                  </>
                ) : null}
              </p>
            </div>
          </a>
        </Link>
        <style jsx>
          {`
            .Organizer {
              padding: 5px;
              margin: 10px 0px;
            }
          `}
        </style>
      </>
    );
  }
}
