import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './random.css';
import Form, {
  Item,
  GroupItem,
  CustomRule,
  PatternRule,
} from 'devextreme-react/form';
import HtmlEditor from 'components/HtmlEditor/HtmlEditor';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: 'Chapter Name',
      postData: {
        Chapter_Title: null,
      },
    };
    this.content = '';
    this.getHtmlContent = (content) => {
      let chapterTitle = this.state.postData.Chapter_Title;
      this.content = content;
      this.props.value.title = chapterTitle;
      this.props.value.text = this.content;
      this.props.value.update = true;
      // call to the parent to change the data into updated data
      this.props.updatedPage(this.props);
    };
  }
  componentDidMount() {
    console.log(this.props);
    let value = this.props.value;
    this.content = this.props.value.text;
    this.setState({
      postData: {
        ...this.state.postData,
        Chapter_Title: this.props.value.title,
      },
    });
  }
  formFieldDataChanged = () => {
    let chapterTitle = this.state.postData.Chapter_Title;
    this.setState({
      postData: { ...this.state.postData, Chapter_Title: chapterTitle },
    });
    console.log(this.props);
    this.props.value.title = chapterTitle;
    this.props.value.text = this.content;
    this.props.value.update = true;
    console.log(this.props);
    // call to the parent to change the data into updated data
    this.props.updatedPage(this.props);
  };
  render() {
    return (
      <Collapsible trigger={this.state.postData.Chapter_Title}>
        <Form
          formData={this.state.postData}
          labelLocation='top'
          showColonAfterLabel={false}
          onFieldDataChanged={this.formFieldDataChanged}
        >
          <Item
            dataField='Chapter_Title'
            editorOptions={{
              stylingMode: 'underlined',
              placeholder: 'Write title of your Chapter here',
            }}
            onChange={this.chapterTitleChanged}
            isRequired
          >
            <PatternRule
              pattern={/^(?=.*[\w\d\p{L}]).+/u}
              message='Please enter valid title name.'
            />
          </Item>
          <Item
            label={{ text: 'Content' }}
            render={() => {
              return (
                <HtmlEditor
                  getContent={this.getHtmlContent}
                  value={this.content}
                  height={'500px'}
                />
              );
            }}
            isRequired
          />
        </Form>
      </Collapsible>
    );
  }
}

export default Random;
