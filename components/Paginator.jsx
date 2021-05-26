import React, { Component } from "react";

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: null,
      countOnPage: null,
      activePage: 1,
    };
    this.getNumberOfPages = () => {
      let pages = this.state.count / this.state.countOnPage;
      if (this.state.count % this.state.countOnPage !== 0) {
        pages += 1;
      }
      return parseInt(pages);
    };
    this.pageChanged = (page = null, action) => {
      if (page) {
        this.props.pageChanged(page);
      } else {
        if (action === "previous") {
          this.props.pageChanged(this.state.activePage - 1);
        } else {
          this.props.pageChanged(this.state.activePage + 1);
        }
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (props.activePage) {
      newState.activePage = props.activePage;
    }
    if (props.count) {
      newState.count = props.count;
      newState.countOnPage = props.countOnPage;
    }
    return newState;
  }
  render() {
    if (this.state.count) {
      return (
        <ul className="pagination justify-content-center">
          <li
            className="page-item"
            onClick={() => this.pageChanged(null, "previous")}
          >
            <a className="page-link" href="javascript:void(0);">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
          </li>
          {[...Array(this.getNumberOfPages()).keys()].map((page) => {
            page = page += 1;
            return (
              <li
                className={`page-item ${
                  page === this.state.activePage ? "active" : null
                }`}
                onClick={() => this.pageChanged(page)}
              >
                <a className="page-link" href="javascript:void(0);">
                  {page}
                </a>
              </li>
            );
          })}
          <li
            className="page-item"
            onClick={() => this.pageChanged(null, "next")}
          >
            <a className="page-link" href="javascript:void(0);">
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      );
    }
    return null;
  }
}
