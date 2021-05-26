import React, { Component } from "react";
import Api from "Api/Api";
import UserCard from "components/UserCard/UserCard";
import SEO from "components/SEO";
import LoadMore from "components/LoadMore";
import UsercardShimmer from "components/Shimmer/UsercardShimmer";
import Utils from "Utils";
import Filter from "components/Filters/Filters";

export default class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      count: null,
      countOnPage: null,
      filters: null,
    };
    this.loadData = (page = 1) => {
      Api.getAllUsers(this.state.filters, page).then((response) => {
        if (response.status === 200) {
          if (page === 1) {
            this.setState({
              users: response.data.results,
              count: response.data.count,
              countOnPage: response.data.results.length,
            });
          } else {
            this.setState({
              users: [...this.state.users, ...response.data.results],
            });
          }
        }
      });
    };
    this.pageChanged = (page) => {
      this.loadData(page);
    };
    this.filterPosts = (filters) => {
      this.setState({ filters: filters }, () => {
        this.loadData();
      });
    };
    this.clearFilter = () => {
      this.setState({ filters: null }, () => {
        this.loadData();
      });
    };
    this.renderUsers = () => {
      if (this.state.users) {
        if (this.state.users.length !== 0) {
          return this.state.users.map((user) => {
            return (
              <div kwy={user.id} className="col-lg-3 col-6 col-sm-4">
                <UserCard
                  image={user.image}
                  bio={user.raw_bio}
                  featured={user.featured}
                  username={user.username}
                  link={`/${user.slug}`}
                  nextLink="/[username]"
                />
              </div>
            );
          });
        } else {
          return (
            <h4 className="ml-4">
              No Author found for the selected search criteria
            </h4>
          );
        }
      } else {
        return Utils.rangeGenerator(12).map((index) => {
          return (
            <div kwy={index} className="col-lg-3 col-6 col-sm-4">
              <UsercardShimmer />
            </div>
          );
        });
      }
    };
  }
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="contentBody">
        <SEO title="Authors" og_url={"/authors"} />
        <Filter
          fields={["username"]}
          getFilterValue={this.filterPosts}
          clearFilterValue={this.clearFilter}
          sort={[
            { name: "Alphabetical", field: "alphabetical", param: "sort" },
            { name: "Most Views", field: "views", param: "sort" },
          ]}
        />
        <div className="row">{this.renderUsers()}</div>
        <LoadMore
          totalRecords={this.state.count}
          recordOnPage={this.state.countOnPage}
          pageChanged={this.pageChanged}
        />
      </div>
    );
  }
}
