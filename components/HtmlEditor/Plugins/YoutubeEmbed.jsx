import React, { Component } from "react";
import Form, { Item, GroupItem } from "devextreme-react/form";
import Utils from "Utils";

export default class YoutubeEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        width: null,
        height: null,
        link: null,
      },
    };
    this.embedYoutubeLink = () => {
      let { width, height, link } = this.state.formData;
      let editorData = this.props.editorInstance
        .element()
        .getElementsByClassName("dx-htmleditor-content")[0];
      var iframe = document.createElement("iframe");
      if (link) {
        link = link.split("=").slice(-1)[0];
        iframe.src = `https://www.youtube.com/embed/${link}`;
        iframe.height = height;
        iframe.width = width;
        editorData.appendChild(iframe);
        this.setState({
          imageForm: { width: null, height: null, link: null },
        });
        this.props.editorInstance.focus();
      } else {
        Utils.notify("Please put a youtube URL", "warning", 1000);
      }
    };
  }
  render() {
    return (
      <div>
        <Form formData={this.state.formData}>
          <Item
            dataField="link"
            editorType="dxTextBox"
            label={{ visible: false }}
            editorOptions={{
              stylingMode: "underlined",
              placeholder: "Youtube video URL",
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
              onClick: this.embedYoutubeLink,
            }}
          />
        </Form>
      </div>
    );
  }
}
