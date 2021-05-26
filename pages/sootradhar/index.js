import React, { Component } from "react";
import Api from "Api/Api";
import UserCard from "components/UserCard/UserCard";
import SEO from "components/SEO";
import LoadMore from "components/LoadMore";
import Filters from "components/Filters/Filters";

export default class Sootradhar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sootradhar: null,
      count: null,
      countOnPage: null,
      filters: null,
      description: null,
      image: null,
    };
    this.loadData = (page = 1) => {
      Api.getSootradharAuthors(this.state.filters, page).then((response) => {
        if (response.status === 200) {
          if (page === 1) {
            this.setState({
              sootradhar: response.data.results,
              count: response.data.count,
              countOnPage: response.data.results.length,
              description: response.data.description,
              image: response.data.image,
            });
          } else {
            this.setState({
              sootradhar: [...this.state.sootradhar, ...response.data.results],
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
    this.renderSootradhar = () => {
      if (this.state.sootradhar) {
        if (this.state.sootradhar.length !== 0) {
          return this.state.sootradhar.map((author) => {
            return (
              <div className="col-lg-3 col-6 col-sm-4">
                <UserCard
                  username={author.name}
                  image={author.image}
                  link={author.url}
                  bio={author.raw_bio}
                  nextLink="/sootradhar/[profile]"
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
        return null;
      }
    };
  }
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="contentBody">
        <SEO
          title="Sootradhar | Kavishala"
          og_title="Sootradhar | Kavishala"
          og_description={this.state.description}
          og_url={"/sootradhar"}
        />
        {this.state.description ? (
          <div
            className={`my-2 ${this.state.image ? "description_img" : ""}`}
            dangerouslySetInnerHTML={{
              __html: this.state.description,
            }}
          />
        ) : null}

        <Filters
          getFilterValue={this.filterPosts}
          clearFilterValue={this.clearFilter}
          fields={["name", "dob", "language"]}
          sort={[
            { name: "Alphabetical", field: "alphabetical", param: "sort" },
          ]}
        />
        <div className="row">{this.renderSootradhar()}</div>
        <LoadMore
          totalRecords={this.state.count}
          recordOnPage={this.state.countOnPage}
          pageChanged={this.pageChanged}
        />
        <style jsx>
          {`
            .description_img {
              background-image: url(${this.state.image});
              min-height: 150px;
              color: white;
              padding: 10px;
            }
          `}
        </style>
      </div>
    );
  }
}
