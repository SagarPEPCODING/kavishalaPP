import React, { Component } from "react";
import { Button, Popup, ScrollView } from "devextreme-react";
import Form, {
  Item,
  GroupItem,
  RequiredRule,
  PatternRule,
} from "devextreme-react/form";
import Api from "Api/Api";
import { countryList } from "formFields";
import Utils from "Utils";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      is_writer: false,
      categoryList: null,
      languageList: null,
      formData: {
        phone: null,
        bio: null,
        facebook: null,
        twitter: null,
        instagram: null,
        youtube: null,
        city: null,
        country: null,
        categories: [],
        languages: [],
      },
    };
    this.togglePopup = () => {
      this.setState({ visible: !this.state.visible });
    };
    this.formInstance = null;
    this.formInitialized = (e) => {
      this.formInstance = e.component;
    };
    this.updateUser = (e) => {
      e.preventDefault();
      var data = this.state.formData;
      if (Array.isArray(data.categories)) {
        data.categories = data.categories.join(",");
      }
      if (Array.isArray(data.languages)) {
        data.languages = data.languages.join(",");
      }
      let formValidate = this.formInstance.validate().isValid;
      let validateBio =
        this.state.formData.bio && this.state.formData.bio.trim();
      if (formValidate) {
        if (validateBio) {
          let form = Utils.objToFormData(data);
          Api.updateUserInfo(form).then((response) => {
            if (response.status === 200) {
              this.props.getUpdateInfo(response.data);
              Utils.notify("Profile updated!", "success", 1000);
              this.togglePopup();
            }
          });
        } else {
          Utils.notify("Bio can't be left blank", "warning", 1000);
        }
      } else {
        Utils.notify("Enter valid data", "warning", 1000);
      }
    };
  }
  componentDidMount() {
    Api.getPopularCategory(true).then((response) => {
      if (response.status === 200) {
        this.setState({ categoryList: response.data[0] });
      }
    });
    Api.getLanguages().then((response) => {
      if (response.status === 200) {
        this.setState({ languageList: response.data });
      }
    });
    this.setState({
      is_writer: this.props.userData.is_writer,
      formData: {
        phone: this.props.userData.phone && parseInt(this.props.userData.phone),
        bio: this.props.userData.bio,
        facebook: this.props.userData.facebook,
        twitter: this.props.userData.twitter,
        instagram: this.props.userData.instagram,
        youtube: this.props.userData.youtube,
        city: this.props.userData.city,
        country: this.props.userData.country,
        categories: this.props.userData.categories.split(","),
        languages: this.props.userData.languages.split(","),
      },
    });
  }

  render() {
    return (
      <>
        <Button
          onClick={this.togglePopup}
          stylingMode={"text"}
          icon={"edit"}
          hoverStateEnabled={false}
          className="user-edit-btn"
        />
        <Popup
          visible={this.state.visible}
          onHiding={this.togglePopup}
          closeOnOutsideClick={true}
          className={"userform-popup"}
        >
          <ScrollView width="100%" height="100%">
            <form onSubmit={this.updateUser}>
              <Form
                formData={this.state.formData}
                onInitialized={this.formInitialized}
              >
                <GroupItem caption="Personal details" colCount={2}>
                  <Item
                    dataField="phone"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/\d{10,15}/u}
                      message="Please enter valid phone number"
                    />
                  </Item>
                  <Item
                    dataField="city"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/[a-zA-Z_ -]+/u}
                      message="Please enter valid city name"
                    />
                  </Item>
                  <Item
                    dataField="country"
                    editorType="dxSelectBox"
                    editorOptions={{
                      stylingMode: "underlined",
                      dataSource: countryList,
                      searchEnabled: true,
                    }}
                  />
                </GroupItem>
                <Item
                  dataField="bio"
                  editorType="dxHtmlEditor"
                  editorOptions={{
                    toolbar: {
                      items: [
                        "bold",
                        "italic",
                        "strike",
                        "underline",
                        "link",
                        {
                          formatName: "header",
                          formatValues: [1, 2, 3, false],
                        },
                      ],
                    },
                    height: "120px",
                  }}
                  isRequired
                />
                {this.state.is_writer ? (
                  <GroupItem caption="Writer details" colCount={2}>
                    <Item
                      dataField="categories"
                      editorType="dxTagBox"
                      editorOptions={{
                        stylingMode: "underlined",
                        dataSource: this.state.categoryList,
                        searchEnabled: true,
                        valueExpr: "slug",
                        displayExpr: "name",
                      }}
                    />
                    <Item
                      dataField="languages"
                      editorType="dxTagBox"
                      editorOptions={{
                        stylingMode: "underlined",
                        dataSource: this.state.languageList,
                        searchEnabled: true,
                        valueExpr: "name",
                        displayExpr: "name",
                      }}
                    >
                      <RequiredRule message="Atleast one language is required" />
                    </Item>
                  </GroupItem>
                ) : null}

                <GroupItem caption="Social details" colCount={2}>
                  <Item
                    dataField="facebook"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/^(http|https):\/\/[^ "]+$/u}
                      message="Please enter valid URL"
                    />
                  </Item>
                  <Item
                    dataField="twitter"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/^(http|https):\/\/[^ "]+$/u}
                      message="Please enter valid URL"
                    />
                  </Item>
                  <Item
                    dataField="instagram"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/^(http|https):\/\/[^ "]+$/u}
                      message="Please enter valid URL"
                    />
                  </Item>
                  <Item
                    dataField="youtube"
                    editorOptions={{ stylingMode: "underlined" }}
                  >
                    <PatternRule
                      pattern={/^(http|https):\/\/[^ "]+$/u}
                      message="Please enter valid URL"
                    />
                  </Item>
                </GroupItem>
                <Item
                  editorType="dxButton"
                  editorOptions={{ text: "Save", useSubmitBehavior: true }}
                />
              </Form>
            </form>
          </ScrollView>
        </Popup>
      </>
    );
  }
}
