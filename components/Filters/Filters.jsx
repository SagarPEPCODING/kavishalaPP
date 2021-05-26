import React, { Component } from "react";
import Api from "Api/Api";
import Form, { Item } from "devextreme-react/form";
import { DropDownButton, Button } from "devextreme-react";
import OData from "devextreme/data/odata/store";
import { base_url } from "Fetch";
import Utils from "Utils";

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { tags: ["hahahahahaha"] },
      categories: [],
      tags: [],
      languages: [],
      visible: false,
    };
    this.tags = new OData({
      url: `${base_url}/tags/autocomplete`,
      key: "slug",
      keyType: "Int32",
      beforeSend: Utils.customizeRequest,
    });
    this.categories = new OData({
      url: `${base_url}/categories/autocomplete`,
      key: "slug",
      keyType: "Int32",
      beforeSend: Utils.customizeRequest,
    });
    this.applyFilter = () => {
      var data = {};
      Object.entries(this.state.filters).map(([key, value]) => {
        if (value) {
          switch (key) {
            case "tag":
            case "category":
            case "language":
              data[key] = value.join(",");
              break;
            default:
              data[key] = value;
              break;
          }
        }
      });
      this.props.getFilterValue(data);
    };

    this.createFilter = () => {
      let filterFields = {};
      this.props.fields.forEach((field) => {
        filterFields[field] = null;
      });
      this.setState({ filters: filterFields });
    };
    this.clearFilter = () => {
      this.createFilter();
      this.props.clearFilterValue();
    };
    this.selectionChanged = (e) => {
      this.setState({
        filters: { ...this.state.filters, [e.item.param]: e.item.field },
      });
      this.props.getFilterValue({ [e.item.param]: e.item.field });
    };
  }
  componentDidMount() {
    this.createFilter();
    if (this.props.fields.includes("tag")) {
      Api.getTags().then((response) => {
        if (response.status === 200) {
          this.setState({ tags: response.data });
        }
      });
    }
    if (this.props.fields.includes("category")) {
      Api.getCategories().then((response) => {
        if (response.status === 200) {
          this.setState({ categories: response.data });
        }
      });
    }
    if (this.props.fields.includes("language")) {
      Api.getLanguages().then((response) => {
        if (response.status === 200) {
          this.setState({ languages: response.data });
        }
      });
    }
  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ visible: !this.state.visible })}
          className={`btn flex ${this.state.visible ? "active" : ""}`}
        >
          <i className="fa fa-filter"></i>
          <span>Filters</span>
          <div className="ripple-container"></div>
        </button>
        {this.state.visible ? (
          <div className="container-fluid">
            <div className="row">
              <div style={{ marginBottom: 10 }} className="col-lg-12">
                <Form formData={this.state.filters} colCount={2}>
                  {"title" in this.state.filters ? (
                    <Item
                      dataField="title"
                      label={{ visible: false }}
                      editorOptions={{
                        placeholder: "Title",
                        stylingMode: "underlined",
                      }}
                    />
                  ) : null}
                  {"name" in this.state.filters ? (
                    <Item
                      dataField="name"
                      label={{ visible: false }}
                      editorOptions={{
                        placeholder: "Name",
                        stylingMode: "underlined",
                      }}
                    />
                  ) : null}
                  {"username" in this.state.filters ? (
                    <Item
                      dataField="username"
                      label={{ visible: false }}
                      editorOptions={{
                        placeholder: "Name",
                        stylingMode: "underlined",
                      }}
                    />
                  ) : null}
                  {"dob" in this.state.filters ? (
                    <Item
                      dataField="dob"
                      label={{ visible: false }}
                      editorType="dxDateBox"
                      editorOptions={{
                        placeholder: "DOB (Ex. 01-jan)",
                        stylingMode: "underlined",
                        acceptCustomValue: true,
                        useMaskBehavior: true,
                        dateSerializationFormat: "yyyy-MM-dd",
                        displayFormat: "dd MMM",
                        zoomLevel: "year",
                        showDropDownButton: false,
                      }}
                    />
                  ) : null}
                  {"featured" in this.state.filters ? (
                    <Item
                      dataField="featured"
                      label={{ visible: true }}
                      editorType="dxCheckBox"
                    />
                  ) : null}
                  {"category" in this.state.filters ? (
                    <Item
                      dataField="category"
                      label={{ visible: false }}
                      editorType="dxTagBox"
                      editorOptions={{
                        placeholder: "Category",
                        stylingMode: "underlined",
                        dataSource: this.categories,
                        displayExpr: "name",
                        valueExpr: "name",
                        searchEnabled: "true",
                        searchTimeout: 1000,
                      }}
                    />
                  ) : null}
                  {"tag" in this.state.filters ? (
                    <Item
                      dataField="tag"
                      label={{ visible: false }}
                      editorType="dxTagBox"
                      editorOptions={{
                        placeholder: "Tag",
                        stylingMode: "underlined",
                        dataSource: this.tags,
                        displayExpr: "name",
                        valueExpr: "name",
                        searchEnabled: "true",
                        searchTimeout: 1000,
                      }}
                    />
                  ) : null}
                  {"language" in this.state.filters ? (
                    <Item
                      dataField="language"
                      label={{ visible: false }}
                      editorType="dxTagBox"
                      editorOptions={{
                        placeholder: "Language",
                        stylingMode: "underlined",
                        dataSource: this.state.languages,
                        displayExpr: "name",
                        valueExpr: "name",
                        searchEnabled: "true",
                      }}
                    />
                  ) : null}
                  {this.props.sort ? (
                    <Item
                      editorType="dxDropDownButton"
                      render={() => {
                        return (
                          <>
                            <DropDownButton
                              text={"Sort"}
                              items={this.props.sort}
                              icon={"fa fa-sort"}
                              onSelectionChanged={this.selectionChanged}
                              displayExpr={"name"}
                              activeStateEnabled={true}
                              className="mr-2"
                              width={125}
                            />
                            <Button
                              className="mr-2"
                              stylingMode="outlined"
                              type="default"
                              onClick={this.applyFilter}
                              text="Search"
                            />
                            <Button
                              stylingMode="outlined"
                              type="danger"
                              onClick={this.clearFilter}
                              text="Clear"
                            />
                          </>
                        );
                      }}
                    />
                  ) : null}
                </Form>
              </div>
            </div>
          </div>
        ) : null}
        <style jsx>
          {`
            button {
              margin-bottom: 10px;
              background-color: white;
              border-radius: 50px;
              box-shadow: 0px 2px 6px 6px #eee;
              margin-left: 91%;
            }
            button i {
              padding-top: 3px;
              margin-right: 5px;
            }
            button.active {
              color: white;
              background-color: var(--main-color);
            }
            @media (max-width: 426px) {
              button {
                margin-left: 75%;
                font-size: 13px;
              }
            }
          `}
        </style>
      </div>
    );
  }
}
