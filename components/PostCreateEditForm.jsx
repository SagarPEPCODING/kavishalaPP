import React, { Component } from 'react';
import './postcreateedit.css';
import Api from 'Api/Api';
import Utils from 'Utils';
import { Context } from 'Context/context';
import Form, {
  Item,
  GroupItem,
  CustomRule,
  PatternRule,
} from 'devextreme-react/form';
import { Button, Popup } from 'devextreme-react';
import HtmlEditor from 'components/HtmlEditor/HtmlEditor';
import OData from 'devextreme/data/odata/store';
import { base_url } from 'Fetch';

export default class PostCreateEditForm extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      categories_choices: [],
      editMode: this.props.edit,
      languages: null,
      fileName: null,
      visible: false,
      contentTypeOptions: null,
      postData: {
        title: null,
        tag: null,
        category: null,
        publish: null,
        language: null,
        image: null,
        content_type: null,
      },
      inlineImages: null,
    };
    this.categories_choices = new OData({
      url: `${base_url}/categories/autocomplete`,
      key: 'slug',
      keyType: 'Int32',
      beforeSend: Utils.customizeRequest,
    });

    this.content = null;
    this.togglePopup = () => {
      this.setState({ visible: !this.state.visible });
    };

    this.HTMLStripper = (html) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.innerText;
    };

    this.getIdFromContentName = (name) => {
      return this.state.contentTypeOptions.filter((record) => {
        return record.name === name;
      })[0].id;
    };

    this.sendData = (publish = true) => {
      let data = this.state.postData;
      console.log(data);
      data.title = data.title;
      console.log(data);
      if (data.title) {
        data.title = data.title.trim();
      }
      let contentValidate = this.content;
      if (this.content) {
        contentValidate = this.HTMLStripper(this.content).trim();
      }
      data.publish = publish;
      data.content = this.content;
      data.content_type = this.getIdFromContentName(data.content_type);

      data = Utils.objToFormData(data);
      // Checking for validation
      let validTitle =
        this.state.postData.title &&
        /^(?=.*[\w\d\p{L}]).+/u.test(this.state.postData.title);
      let validContent = contentValidate;
      if (validTitle && validContent) {
        this.props.getData(data, publish);
      } else if (!validTitle && !validContent) {
        Utils.notify(
          'Please enter valid title name and some content too!',
          'error',
          1000
        );
      } else if (!validTitle) {
        Utils.notify('Please enter valid title name', 'error', 1000);
      } else if (!validContent) {
        Utils.notify('Blank content can not be published', 'error', 1000);
      }
    };
    this.getHtmlContent = (content) => {
      this.content = content;
    };
    this.postImage = (e) => {
      var file = e.target.files[0];
      this.setState({
        postData: { ...this.state.postData, image: file },
        fileName: file.name,
      });
    };
    this.validateTags = ({ value }) => {
      let tagArray = value.split(',');
      let validTags = tagArray.filter((tag) => {
        return !tag.replace('#', '').includes('#');
      });
      return validTags.length === tagArray.length;
    };
  }
  componentDidMount() {
    this.context.ToggleLoader();
    Api.getCategories(true).then((response) => {
      this.context.ToggleLoader();
      if (response.status === 200) {
        this.setState({ categories_choices: response.data });
      }
    });
    if ('data' in this.props) {
      let categores_name = this.props.data.category.map((category) => {
        return category.name;
      });
      this.setState({
        postData: {
          title: this.props.data.title,
          category: categores_name[0],
          language: this.props.data.language,
          content_type: this.props.data.content_type,
          // publish: this.props.data.publish,
          tag: Utils.tagToHashConverter(this.props.data.tag),
        },
      });
      console.log(this.state.postData);
      this.content = this.props.data.content;
    }
    if (this.context.state.languages) {
      this.setState({ languages: this.context.state.languages });
    } else {
      Api.getLanguages().then((response) => {
        if (response.status === 200) {
          this.setState({ languages: response.data });
          this.context.setLanguages(response.data);
        }
      });
    }
    Api.getContenType().then((response) => {
      if (response.status === 200) {
        let defaultValue = response.data.filter((rec) => {
          return rec.default;
        })[0].name;
        let newState = { contentTypeOptions: response.data };
        if (this.props.edit && !this.props.data.content_type) {
          newState['postData'] = {
            ...this.state.postData,
            content_type: defaultValue,
          };
        } else if (!this.props.edit) {
          newState['postData'] = {
            ...this.state.postData,
            content_type: defaultValue,
          };
        }
        this.setState(newState);
      }
    });
  }
  render() {
    return (
      <>
        <div className='contentBody'>
          <form onSubmit={this.sendData}>
            <Form
              formData={this.state.postData}
              labelLocation='top'
              showColonAfterLabel={false}
            >
              <Item
                dataField='title'
                editorOptions={{
                  stylingMode: 'underlined',
                  placeholder: 'Write title of your book here',
                }}
                isRequired
              >
                <PatternRule
                  pattern={/^(?=.*[\w\d\p{L}]).+/u}
                  message='Please enter valid title name.'
                />
              </Item>
              <GroupItem colCount={3}>
                <Item
                  dataField='tag'
                  editorOptions={{
                    stylingMode: 'underlined',
                    placeholder: 'Like:- #news,#tech,#poetry',
                  }}
                >
                  <CustomRule
                    ignoreEmptyValue={true}
                    message='Please follow correct tag pattern. Tags should be comma separated.'
                    validationCallback={this.validateTags}
                  />
                </Item>
                <Item
                  dataField='category'
                  editorType='dxSelectBox'
                  editorOptions={{
                    stylingMode: 'underlined',
                    dataSource: this.categories_choices,
                    displayExpr: 'name',
                    placeholder: 'Start typing for autocomplete',
                    valueExpr: 'name',
                    searchEnabled: true,
                  }}
                />
                <Item
                  dataField='content_type'
                  editorType='dxSelectBox'
                  editorOptions={{
                    stylingMode: 'underlined',
                    dataSource: this.state.contentTypeOptions,
                    displayExpr: 'name',
                    placeholder: 'Start typing for autocomplete',
                    valueExpr: 'name',
                    searchEnabled: true,
                  }}
                />
              </GroupItem>
              <GroupItem colCount={2}>
                <Item
                  dataField='language'
                  editorType='dxSelectBox'
                  editorOptions={{
                    stylingMode: 'underlined',
                    dataSource: this.state.languages,
                    placeholder: 'Select language',
                    displayExpr: 'name',
                    valueExpr: 'id',
                    searchEnabled: true,
                  }}
                />
                <Item
                  label={{ text: 'Post Image' }}
                  render={() => {
                    return (
                      <>
                        <Button
                          className='editBtn'
                          text={'Select file'}
                          stylingMode='outlined'
                          type='default'
                          onClick={() => {
                            document.getElementById('postimage').click();
                          }}
                        />
                        <span>{this.state.fileName || 'No file selected'}</span>
                        <input
                          type='file'
                          style={{ visibility: 'hidden' }}
                          id='postimage'
                          accept='image/*'
                          onChange={this.postImage}
                        />
                      </>
                    );
                  }}
                />
              </GroupItem>
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
            <div className='btnControls'>
              <Button
                className='editBtn'
                text={'Publish'}
                stylingMode='outlined'
                type='default'
                onClick={() => this.sendData(true)}
              />
              <Button
                className='editBtn'
                text={'Save as draft'}
                stylingMode='outlined'
                type='default'
                onClick={() => this.sendData(false)}
              />
              {this.state.editMode ? (
                <Button
                  text={'Delete'}
                  stylingMode='outlined'
                  type='danger'
                  // onClick={this.props.deletePost}
                  onClick={this.togglePopup}
                />
              ) : null}
            </div>
          </form>
          {this.state.editMode ? (
            <Popup
              visible={this.state.visible}
              closeOnOutsideClick={true}
              onHiding={this.togglePopup}
              showCloseButton={false}
              showTitle={false}
              width={'auto'}
              height={'auto'}
              className={'category-popup'}
              focusStateEnabled={false}
            >
              <div className='text-center'>
                <h6 className='mb-3 px-5'>
                  <i>Are you sure?</i>
                </h6>
                <Button
                  text='Yes'
                  className='mr-2'
                  stylingMode='outlined'
                  type='default'
                  onClick={() => {
                    this.props.deletePost();
                    this.togglePopup();
                  }}
                />
                <Button
                  text='No'
                  onClick={this.togglePopup}
                  stylingMode='outlined'
                  type='danger'
                />
              </div>
            </Popup>
          ) : null}
        </div>
        <style jsx global>{`
          .dx-field-item-label-text {
            font-size: 1rem;
            font-weight: 400;
          }
          .editBtn {
            margin-right: 15px;
          }
          .btnControls {
            margin-top: 10px;
          }
          .btnControls .dx-button {
            border-radius: 0px;
          }
        `}</style>
      </>
    );
  }
}
