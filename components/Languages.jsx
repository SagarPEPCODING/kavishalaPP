import React, { Component } from "react";
import Api from "Api/Api";
import Link from "next/link";
import { Context } from "Context/context";
import Line from "components/Shimmer/Line";
import Utils from "Utils";
export default class Languages extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      languages: null,
    };
  }
  componentDidMount() {
    if (this.context.state.languages) {
      this.setState({ languages: this.context.state.languages });
    } else {
      Api.getLanguages().then((response) => {
        if (response.status === 200) {
          this.setState({ languages: response.data });
          this.context.setLanguages(response.data);
        }
      });
    }
  }

  render() {
    return (
      <>
        {this.props.mode === "dropdown" ? (
          <li className="nav-item family dropdown language-dropdown">
            <a
              className="nav-link dropdown-toggle pt-3 mr-2"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Lang
            </a>
            <div
              className="dropdown-menu mobile-nav-dropdown"
              aria-labelledby="navbarDropdown"
            >
              {this.state.languages
                ? this.state.languages.map((language) => {
                    return (
                      <Link href={`/languages/${language.name}`}>
                        <a className="dropdown-item">{language.name}</a>
                      </Link>
                    );
                  })
                : null}
            </div>
          </li>
        ) : (
          <div className="languages-container text-center">
            <div className="row">
              {this.state.languages
                ? this.state.languages.map((language) => {
                    return (
                      <div className="col-lg-2 col-6" key={language.name}>
                        <Link href={`/languages/${language.name}`}>
                          <a className="language-card">
                            <span className="initial">{language.initial}</span>
                            <span className="language-name">
                              {language.name}
                            </span>
                          </a>
                        </Link>
                      </div>
                    );
                  })
                : Utils.rangeGenerator(12).map((index) => {
                    return (
                      <div className="col-lg-2 col-6" key={index}>
                        <Line height="20px" width={"100px"} />
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
        <style jsx>
          {`
            .language-dropdown .mobile-nav-dropdown {
              left: -5em !important;
            }
            .language-dropdown a {
              font-size: 15px !important;
              font-weight: 500 !important;
            }
            .languages-container {
              font-size: 18px;
              margin: 1% 5%;
            }

            .language-card {
              border: 1px solid black;
              display: flex;
              color: black;
              width: 85%;
            }
            .language-card .initial {
              background: #00102c;
              color: white;
              width: 65px;
              padding: 10px 0px;
            }
            .language-card .language-name {
              padding: 10px 15px;
              font-weight: 300;
            }
            .language-card:hover {
              color: black;
              text-decoration: unset;
              box-shadow: 7px 6px 6px 0px #868686;
              transition: box-shadow 0.3s ease-in-out;
              border: 1px solid #bfbfbf;
            }
            .languages-container .col-lg-2 {
              padding: 10px;
            }
            @media (max-width: 426px) {
              .languages-container {
                margin: 42% 10% 0% 10% !important;
              }
              .language-name {
                padding: 10px 5px !important;
                font-size: 17px !important;
              }
              .language-card {
                width: 100%;
              }
              .initial {
                width: 45px !important;
              }
            }
            @media (max-width: 769px) {
              .languages-container {
                margin: 35% 20% 0% 20%;
              }
            }
          `}
        </style>
      </>
    );
  }
}
