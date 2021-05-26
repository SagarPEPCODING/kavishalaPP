import React, { Component } from "react";

export default class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalRecords: null,
      pages: null,
    };
    this.changePage = () => {
      let newPage = this.state.activePage + 1;
      let newState = { activePage: newPage };
      this.setState(newState);
      this.props.pageChanged(newPage);
    };
  }
  static calculatePageCount = (total, recordOnPage) => {
    let pages = total / recordOnPage;
    if (total % recordOnPage !== 0) {
      pages += 1;
    }
    return parseInt(pages);
  };
  static getDerivedStateFromProps(props, state) {
    let newState = { totalRecords: props.totalRecords };
    if (props.totalRecords) {
      let pages = LoadMore.calculatePageCount(
        props.totalRecords,
        props.recordOnPage
      );
      newState["pages"] = pages;
    }
    return newState;
  }

  render() {
    if (this.state.totalRecords) {
      if (this.state.activePage !== this.state.pages) {
        return (
          <div className="text-center my-3">
            <button className="btn btn-primary" onClick={this.changePage}>
              Load more
            </button>
          </div>
        );
      }
    }
    return null;
  }
}
