import React, { Component } from "react";
import "./UserCard.css";
import Link from "next/link";
var DefaultImg = "/images/Logo_K2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default class UserCard extends Component {
  render() {
    return (
      <Link as={this.props.link} href={this.props.nextLink}>
        <a className="user-card text-center hoverEffect">
          <img
            alt={`${this.props.username}'s image`}
            src={this.props.image || DefaultImg}
          />
          <div className="usercard-info">
            <h5
              className="text-capitalize trimmer1line"
              title={this.props.username}
            >
              {this.props.username}{" "}
              {this.props.featured ? (
                <i
                  className="fa fa-check-circle"
                  aria-hidden="true"
                  title="Featured writer"
                ></i>
              ) : null}
            </h5>
            <div
              className="trimmer2line"
              title={this.props.bio || "A Kavishala Author"}
              dangerouslySetInnerHTML={{
                __html: this.props.bio || "A Kavishala Author",
              }}
            />
          </div>
        </a>
      </Link>
    );
  }
}
