import React, { Component } from 'react';
import Api from 'Api/Api';
import Form, {
  Item,
  GroupItem,
  CustomRule,
  PatternRule,
} from 'devextreme-react/form';
import { Context } from 'Context/context';
import { Button, Popup } from 'devextreme-react';
import EditCollapsible from 'components/EditCollapsible';
import HtmlEditor from 'components/HtmlEditor/HtmlEditor';
import OData from 'devextreme/data/odata/store';
import { base_url } from 'Fetch';

export class edit extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      languages: null,
      fileNameFrontCover: null,
      fileNameLastCover: null,
      bookCategory: [],
      pageAdded: false,
      alreadyExist: false,
      categoryFound: false,
      postData: {
        imageFrontCover: null,
        imageLastCover: null,
        title: null,
        tag: null,
        category: null,
        publish: null,
        language: null,
        image: null,
        content_type: null,
      },
      Pages: [],
      data: {},
    };
  }

  static getInitialProps(ctx) {
    try {
      let propData = JSON.parse(ctx.query.postData);
      // console.log(propData);
      return { data: propData };
    } catch (err) {
      ctx.res.writeHead(301, {
        Location: '/404',
      });
      ctx.res.end();
      // console.log(err);
    }
  }

  componentDidMount = () => {
    // console.log('this is props :-  ');
    // console.log(this.props);
    // console.log('props printed');

    this.setState(
      {
        postData: {
          title: this.props.data.post.bookTitle,
          category: this.props.data.post.category,
          imageFrontCover: this.props.data.post.frontCoverimage,
          imageLastCover: this.props.data.post.lastCoverimage,
          language: this.props.data.post.language,
        },
      },
      this.updateCategoryLanguage
    );
    let resultFrontImageArrUrl =
      this.props.data.post.frontCoverimage.split('/');
    // console.log(resultFrontImageArrUrl);
    let filenameFrontCover =
      resultFrontImageArrUrl[resultFrontImageArrUrl.length - 1];
    // console.log('this is front cover image' + filenameFrontCover);
    this.setState({ fileNameFrontCover: filenameFrontCover });

    let resultLastImageArrUrl = this.props.data.post.lastCoverimage.split('/');
    // console.log(resultLastImageArrUrl);
    let filenameLastCover =
      resultLastImageArrUrl[resultLastImageArrUrl.length - 1];
    // console.log('this is last cover image :- ' + filenameLastCover);
    this.setState({ fileNameLastCover: filenameLastCover });

    // pages
    let id = this.props.data.id;
    let username = this.props.data.post.userName;
    let title = this.props.data.post.bookTitle;
    let slug = username + '/' + id + '/' + title;
    // console.log('slug is :- ');
    // console.log(slug);
    let encodedSlug = btoa(slug);
    // console.log(encodedSlug);
    let myurl = `/getChapters/${encodedSlug}/`;
    Api.getAllPages(myurl)
      .then((response) => {
        if (response.status === 200) {
          // console.log('this is my chapters !!!!');
          // console.log(response);
          // console.log('******************************************** !!!!');
          let pages = [];
          let data = response.data;
          data.map((obj) => {
            obj['update'] = false;
            pages.push(obj);
          });
          // console.log('these are pages');
          // console.log(pages);
          this.setState({ Pages: pages });
        } else {
          // console.log('something wrong');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateCategoryLanguage = () => {
    if (this.context.state.bookCategory) {
      // console.log('i am in context of category');
      this.setState({ bookCategory: this.context.state.bookCategory });
      this.bookCategoryHelper(this.context.state.bookCategory);
    } else {
      Api.getBookCategories().then((response) => {
        let data = response.data;
        this.setState({ bookCategory: data });
        this.context.setBookCategories(data);
        this.bookCategoryHelper(data);
      });
    }
    if (this.context.state.languages) {
      // console.log('i am in context of language');
      this.setState({ languages: this.context.state.languages });
      this.bookLanguageHelper(this.context.state.languages);
    } else {
      Api.getLanguages().then((response) => {
        if (response.status === 200) {
          this.setState({ languages: response.data });
          this.context.setLanguages(response.data);
          this.bookLanguageHelper(response.data);
        }
      });
    }
  };

  bookLanguageHelper = (data) => {
    // console.log('this is my bookLanguages...');
    // console.log(data);
    // console.log('this is my real data Languages');
    let array = data;
    if (array.length > 0) {
      array.forEach(this.searchBookLanguage);
    }
  };

  bookCategoryHelper = (data) => {
    // console.log('this is my bookCategory...');
    // console.log(data);
    // console.log('this is my real data');
    let array = data;
    if (array.length > 0) {
      array.forEach(this.searchBookCategory);
    }
  };

  searchBookLanguage = (obj) => {
    // console.log(this.state.postData.language);
    // console.log(this.props.data.post.language);
    // console.log('hello i am inn search book language');
    // console.log('before updation in language');
    // console.log(this.state.postData);
    if (obj.name === this.props.data.post.language) {
      console.log(obj.id);
      this.setState({
        postData: {
          ...this.state.postData,
          language: obj.id,
        },
      });
      // console.log('after updation language');
      // console.log(this.state.postData);
    }
    // console.log('this is my title ' + this.state.postData.title);
  };

  searchBookCategory = (obj) => {
    // console.log('hello i am inn search book category');
    // console.log(this.state.postData.category);
    // console.log(this.props.data.post.category);
    // console.log('before updation in category');
    // console.log(this.state.postData);
    if (obj.name === this.props.data.post.category) {
      this.setState({
        postData: {
          ...this.state.postData,
          category: obj.id,
        },
      });
      // console.log('after updation category');
      // console.log(this.state.postData);
      this.setState({ categoryFound: true });
    }
    // console.log('this is my title ' + this.state.postData.title);
  };

  pageUpdated = (value, index) => {
    // console.log('i am in pageupdated');
    // console.log(value);
    // console.log(index);
    this.state.Pages[index].chapterTitle = value.chapterTitle;
    this.state.Pages[index].chapterContent = value.chapterContent;
    this.state.Pages[index].update = value.update;
    console.log(this.state.Pages);
  };

  render() {
    // console.log('this is title in render' + this.state.postData.title);
    return (
      <div>
        <div className='contentBody'>
          <form>
            <Form
              formData={this.state.postData}
              labelLocation='top'
              showColonAfterLabel={false}
            >
              <GroupItem colCount={2}>
                <Item
                  dataField='title'
                  editorOptions={{
                    stylingMode: 'underlined',
                  }}
                  isRequired
                >
                  <PatternRule
                    pattern={/^(?=.*[\w\d\p{L}]).+/u}
                    message='Please enter valid title name.'
                  />
                </Item>
                <Item
                  dataField='category'
                  editorType='dxSelectBox'
                  editorOptions={{
                    stylingMode: 'underlined',
                    dataSource: this.state.bookCategory,
                    placeholder: 'Select Category Of Book',
                    displayExpr: 'name',
                    valueExpr: 'id',
                    searchEnabled: true,
                  }}
                />
              </GroupItem>
              <GroupItem colCount={3}>
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
                  label={{ text: 'Post Front Cover Image' }}
                  render={() => {
                    return (
                      <>
                        <Button
                          className='editBtn'
                          text={'Select file'}
                          stylingMode='outlined'
                          type='default'
                          onClick={() => {
                            document.getElementById('postimageFront').click();
                          }}
                        />
                        <span>
                          {this.state.fileNameFrontCover || 'No file selected'}
                        </span>
                        <input
                          type='file'
                          style={{ visibility: 'hidden' }}
                          id='postimageFront'
                          accept='image/*'
                          onChange={this.postImageFrontCover}
                        />
                      </>
                    );
                  }}
                />
                <Item
                  label={{ text: 'Post Last Cover Image' }}
                  render={() => {
                    return (
                      <>
                        <Button
                          className='editBtn'
                          text={'Select file'}
                          stylingMode='outlined'
                          type='default'
                          onClick={() => {
                            document.getElementById('postimageLast').click();
                          }}
                        />
                        <span>
                          {this.state.fileNameLastCover || 'No file selected'}
                        </span>
                        <input
                          type='file'
                          style={{ visibility: 'hidden' }}
                          id='postimageLast'
                          accept='image/*'
                          onChange={this.postImageLastCover}
                        />
                      </>
                    );
                  }}
                />
              </GroupItem>
            </Form>
            {this.state.Pages.map((value, index) => {
              return (
                <EditCollapsible
                  value={value}
                  index={index}
                  updatedPage={this.pageUpdated}
                />
              );
            })}
            <div className='btnControls'>
              <Button
                className='editBtn'
                text={'Add Chapter'}
                stylingMode='outlined'
                type='default'
                // onClick={this.addPage}
              />
              <Button
                className='editBtn'
                text={'Publish'}
                stylingMode='outlined'
                type='default'
                // onClick={() => this.sendData(true)}
              />
              <Button
                className='editBtn'
                text={'Save as draft'}
                stylingMode='outlined'
                type='default'
                // onClick={() => this.sendData(false)}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default edit;
