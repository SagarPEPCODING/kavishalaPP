import React, { Component } from "react";
import { Popup } from "devextreme-react";
import Api from "../../../Api/Api";
import Utils from "../../../Utils";
import Form, { Item, Label } from "devextreme-react/form";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formData: {
        email: null,
      },
    };
    this.toggleForm = () => {
      this.setState({ visible: !this.state.visible });
    };
    this.requestForChange = (e) => {
      Api.requsetPasswordChange(this.state.formData.email).then((response) => {
        if (response.status === 200) {
          Utils.notify(response.data.status, "success");
          this.toggleForm();
        } else {
          Utils.notify(response.data, "warning", 5000);
        }
      });
    };
  }
  render() {
    return (
      <>
        <div className="text-right forgot-link" style={{ color: "#1ba8b7" }}>
          <p>
            {" "}
            <span className="pointer" onClick={this.toggleForm}>
              Forgot Password?
            </span>
          </p>
          <Popup
            visible={this.state.visible}
            title="Forgot Password?"
            showCloseButton={true}
            onHiding={this.toggleForm}
            height={"auto"}
            width={"auto"}
            className="forgot-password"
          >
            <div className="forgetForm">
              <Form formData={this.state.formData} showColonAfterLabel={false}>
                <Item
                  dataField="email"
                  editorOptions={{
                    mode: "email",
                    stylingMode: "underlined",
                  }}
                >
                  <Label
                    text="Enter email ID registered with us"
                    location="top"
                  />
                </Item>
                <Item
                  editorType="dxButton"
                  editorOptions={{
                    onClick: this.requestForChange,
                    text: "Get Link",
                    stylingMode: "outlined",
                    type: "default",
                  }}
                />
              </Form>
            </div>
          </Popup>
        </div>
        <style jsx>{`
          .forgetForm .dx-button {
            border-radius: 0px;
          }
          .forgot-link:hover {
            font-weight: 500;
          }
        `}</style>
      </>
    );
  }
}
