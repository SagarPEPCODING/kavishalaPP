import React, { Component } from "react";
import { Popup, Button } from "devextreme-react";
import Api from "Api/Api";
import Utils from "Utils";
import { Context } from "Context/context";
import Router from "next/router";

export default class BecomeAWriter extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      categories_choices: [],
      language_choices: [],
      showCat: true,
      category: [],
      language: [],
      clicked: null,
    };
    this.togglePopup = () => {
      if (this.state.visible) {
        this.props.hiding && this.props.hiding();
      }
      this.setState({ visible: !this.state.visible });
    };
    this.notify = () => {
      return Utils.notify(
        "Your request for writer access has been received! Our admin will approve it in 30 minutes or less!",
        "success",
        5000
      );
    };
    this.checkWriterStatus = () => {
      Api.userIsWriter().then((response) => {
        if (response.status === 200) {
          let { filled, is_writer } = response.data;
          if (!filled) {
            this.togglePopup();
          } else if (filled && !is_writer) {
            this.notify();
          } else if (filled && is_writer) {
            Router.push("/post/create");
            this.context.makeUserWriter();
          }
        }
      });
    };
    this.doOperation = () => {
      this.checkWriterStatus();
    };

    this.saveValue = (type, value) => {
      let oldValues = this.state[type];
      let updatedState = [];
      if (oldValues.includes(value)) {
        updatedState = oldValues.filter((val) => {
          return val !== value;
        });
      } else {
        updatedState = [...oldValues, value];
      }
      this.setState({ [type]: updatedState });
    };
    this.updateUserInfo = () => {
      let data = {
        categories: this.state.category.join(","),
        languages: this.state.language.join(","),
      };
      data = Utils.objToFormData(data);
      Api.updateUserInfo(data).then((response) => {
        if (response.status === 200) {
          this.notify();
          this.togglePopup();
        }
      });
    };
  }
  componentDidMount() {
    Api.getPopularCategory(true).then((response) => {
      if (response.status === 200) {
        this.setState({ categories_choices: response.data[0] });
      }
    });
    Api.getLanguages().then((response) => {
      if (response.status === 200) {
        this.setState({ language_choices: response.data });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.clicked) {
      if (this.props.clicked !== this.state.clicked) {
        this.setState({ clicked: this.props.clicked });
        this.checkWriterStatus();
      }
    }
  }

  render() {
    return (
      <>
        {this.props.mode === "hidden" ? null : (
          <a className="nav-link family pointer" onClick={this.doOperation}>
            Becomer A Writer
          </a>
        )}
        {this.state.visible ? (
          <Popup
            visible={this.state.visible}
            closeOnOutsideClick={true}
            onHiding={this.togglePopup}
            showCloseButton={false}
            showTitle={false}
            width={"40%"}
            height={"auto"}
            className={"category-popup"}
            focusStateEnabled={false}
          >
            <div className="p-3">
              {this.state.showCat ? (
                <>
                  <h5>Categories</h5>
                  <p>Select at least 3 categories</p>
                  <div className="categories-options">
                    {this.state.categories_choices.map((category) => {
                      return (
                        <span
                          className={`category-card pointer ${
                            this.state.category.includes(category.slug)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            this.saveValue("category", category.slug)
                          }
                        >
                          {category.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="text-center my-3">
                    <Button
                      stylingMode="outlined"
                      type="default"
                      icon={"arrowright"}
                      disabled={this.state.category.length < 3}
                      onClick={() => this.setState({ showCat: false })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h5>Languages</h5>
                  <p>Select a languages</p>
                  <div className="categories-options">
                    {this.state.language_choices.map((lang) => {
                      return (
                        <span
                          className={`category-card pointer ${
                            this.state.language.includes(lang.name)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => this.saveValue("language", lang.name)}
                        >
                          {lang.initial} {lang.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="text-center my-3">
                    <Button
                      icon="arrowleft"
                      stylingMode="outlined"
                      className="mr-2"
                      type="back"
                      onClick={() => this.setState({ showCat: true })}
                    />{" "}
                    <Button
                      text="Save"
                      disabled={this.state.language.length < 1}
                      type="success"
                      stylingMode="outlined"
                      onClick={this.updateUserInfo}
                    />
                  </div>
                </>
              )}
              <style jsx>{`
                .category-card {
                  border: 1px solid black;
                  border-radius: 5px;
                  padding: 3px;
                  display: inline-block;
                  margin: 5px;
                }
                @media (max-width: 426px) {
                  .category-card {
                    font-size: 11px;
                    width: 45%;
                    text-align: center;
                    height: 35px;
                  }
                }
                .category-card:hover {
                  background-color: rgb(205, 205, 205);
                }
                .selected {
                  background-color: var(--main-color);
                  color: white;
                }
              `}</style>
            </div>
          </Popup>
        ) : null}
      </>
    );
  }
}
