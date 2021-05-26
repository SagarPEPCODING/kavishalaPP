import React, { Component } from "react";
import Api from "Api/Api";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: null,
      active: null,
    };
    this.headerClicked = (link) => {
      this.setState(
        {
          active: link,
        },
        () => {
          window.location.href = link;
        }
      );
    };
  }
  componentDidMount() {
    Api.getHeaders().then((response) => {
      if (response.status === 200) {
        this.setState({ headers: response.data, active: window.location.href });
      }
    });
  }

  render() {
    return (
      <>
        {this.state.headers && this.state.headers.length ? (
          <nav className="navbar navbar-expand-sm navbar-light bg-light pb-1 scrollmenu">
            <ul className="navbar-nav customized-scroll">
              {this.state.headers.map((header) => {
                return (
                  <li
                    className={`nav-item mr-3 pointer ${
                      this.state.active === header.link ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link color_change py-1"
                      onClick={() => this.headerClicked(header.link)}
                    >
                      {header.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <style jsx>{`
          nav {
            z-index: 99;
            box-shadow: unset;
            background-color: #f7f7f7 !important;
          }
          li {
            white-space: nowrap;
          }
          .active {
            background-color: var(--main-color);
            border-radius: 5px;
          }
          a {
            color: rgb(68, 68, 68) !important;
          }
          .active a {
            color: white !important;
          }
          .nav-item a:hover,
          .nav-item a:focus {
            color: white !important;
            background: #00102c;
            border-radius: 5px;
          }
          @media only screen and (max-width: 426px) {
            a:hover,
            a:focus,
            .active a {
              padding-left: 5px;
              padding-right: 5px;
            }
          }
          ul {
            overflow-x: auto;
          }
          div.scrollmenu {
            background-color: #333;
            overflow: auto;
            white-space: nowrap;
          }

          div.scrollmenu a {
            display: inline-block;
            color: white;
            text-align: center;
            padding: 14px;
            text-decoration: none;
          }

          .color_change {
            color: #333;
          }
        `}</style>
      </>
    );
  }
}
