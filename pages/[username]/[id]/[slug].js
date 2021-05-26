import React, { Component } from "react";

export default class PostPage extends Component {
  static getInitialProps(ctx) {
    ctx.res.writeHead(301, {
      Location: `/${ctx.query.username}`,
    });
    ctx.res.end();
  }
}
