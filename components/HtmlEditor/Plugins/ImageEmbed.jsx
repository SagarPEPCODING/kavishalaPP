import React, { Component } from "react";
import Form, { Item, GroupItem } from "devextreme-react/form";
import Api from "Api/Api";
import Utils from "Utils";

export default class ImageEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageForm: {
        width: 50,
        height: 50,
        image: null,
      },
    };
    this.attachImage = (e) => {
      let image = document.querySelector("#postContentImage").files[0];
      let images = Utils.objToFormData({ image });
      let cursorPosition = this.props.editorInstance.getLength() - 1;
      if (image) {
        Api.uploadPostInlineImage(images).then((response) => {
          if (response.status === 200) {
            this.props.editorInstance.insertEmbed(
              cursorPosition,
              "extendedImage",
              {
                src: response.data[0],
                height: `${this.state.imageForm.width}px`,
                width: `${this.state.imageForm.height}px`,
              }
            );
            this.setState({
              imageForm: { width: null, height: null, image: null },
            });
            this.props.editorInstance.focus();
            this.props.hidePopup();
          }
        });
      } else {
        Utils.notify("Please upload an image", "warning", 1000);
      }
    };
  }
  render() {
    return (
      <div>
        <div>
          <Form formData={this.state.imageForm}>
            <Item
              dataField="image"
              render={() => {
                return (
                  <input type="file" id="postContentImage" accept="image/*" />
                );
              }}
            />
            <GroupItem colCount={2}>
              <Item
                dataField="width"
                editorType="dxNumberBox"
                label={{ visible: false }}
                editorOptions={{
                  stylingMode: "underlined",
                  placeholder: "Width (in px)",
                }}
              />
              <Item
                dataField="height"
                editorType="dxNumberBox"
                label={{ visible: false }}
                editorOptions={{
                  stylingMode: "underlined",
                  placeholder: "Height (in px)",
                }}
              />
            </GroupItem>

            <Item
              editorType="dxButton"
              editorOptions={{
                text: "Save",
                onClick: this.attachImage,
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
