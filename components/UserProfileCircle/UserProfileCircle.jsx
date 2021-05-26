import React, { Component } from "react";
import Link from "next/link";
import "./UserProfileCircle.css";
var DefaultImg = "/images/Logo_K2.png";
export default class UserProfileCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
    };
  }
  render() {
    return (
      <Link href="/[username]" as={`/${this.state.user.slug}`}>
        <a className="userCircleProfile customLink">
          <img
            src={this.state.user.image || DefaultImg}
            alt={`${this.state.user.username}'s pic`}
          />
          <p>{this.state.user.username}</p>
        </a>
      </Link>
    );
  }
}
