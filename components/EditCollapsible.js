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

export class EditCollapsible extends Component {
  constructor(props) {
    console.log(props);
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
      console.log(chapterTitle);
      console.log(this.props.value);
      this.props.value.chapterTitle = chapterTitle;
      this.props.value.chapterContent = this.content;
      this.props.value.update = true;
      console.log(this.props.value);
      // call to the parent to change the data into updated data
      this.props.updatedPage(this.props);
    };
  }
  componentDidMount() {
    // console.log('line 36');
    // console.log(this.props);
    let value = this.props.value;
    this.content = this.props.value.chapterContent;
    this.setState({
      postData: {
        ...this.state.postData,
        Chapter_Title: this.props.value.chapterTitle,
      },
    });
    // console.log('46');
    // console.log(this.props);
  }
  formFieldDataChanged = (val) => {
    // console.log(val.value);
    let chaptertitle = val.value;
    // console.log('55');
    // console.log(this.props);
    // console.log(this.content);
    // console.log(chaptertitle);
    // this.props.value.chapterTitle = chaptertitle;
    // this.props.value.chapterContent = this.content;
    // this.props.value.update = true;
    let obj = this.props.value;
    let index = this.props.index;
    // console.log(obj);
    obj.chapterTitle = chaptertitle;
    obj.chapterContent = this.content;
    obj.update = true;
    // console.log(this.content);
    // console.log(this.props);
    // console.log('63');
    // call to the parent to change the data into updated data
    this.props.updatedPage(obj, index);
    this.setState({
      postData: { ...this.state.postData, Chapter_Title: chaptertitle },
    });
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
                  height={'400px'}
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

export default EditCollapsible;
