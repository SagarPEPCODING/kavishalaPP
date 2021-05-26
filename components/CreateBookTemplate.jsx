import React, { Component } from 'react';
import Api from 'Api/Api';
import Utils from 'Utils';
import { Context } from 'Context/context';
import Random from 'components/Random';
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
import './createBookTemplate.css';

export class CreateBookTemplate extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      languages: null,
      fileNameFrontCover: null,
      fileNameLastCover: null,
      bookCategory: null,
      pageAdded: false,
      alreadyExist: false,
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
    };

    this.HTMLStripper = (html) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.innerText;
    };
    this.postImageFrontCover = (e) => {
      var file = e.target.files[0];
      console.log(file);
      this.setState({
        fileNameFrontCover: file.name,
      });
      this.setState({
        postData: { ...this.state.postData, imageFrontCover: file },
      });
      console.log(this.state.postData.imageFrontCover);
    };
    this.postImageLastCover = (e) => {
      var file = e.target.files[0];
      console.log(file);
      this.setState({
        fileNameLastCover: file.name,
      });
      this.setState({
        postData: { ...this.state.postData, imageLastCover: file },
      });
      console.log(this.state.postData.imageLastCover);
    };
    this.sendData = (publish = true) => {
      console.log(this.state.Pages);
      console.log('i am in sendData ' + publish);
      let data = this.state.postData;
      console.log(data);
      console.log(this.state.bookCategory);
      console.log(this.state.languages);

      let category = this.state.postData.category;
      let language = this.state.postData.language;

      let lengthOfLanguages = this.state.languages.length;
      if (this.state.postData.language !== null) {
        for (let i = 0; i < lengthOfLanguages; i++) {
          let languageObj = this.state.languages[i];
          console.log(languageObj.id);
          if (languageObj.id === language) {
            language = languageObj.name;
            console.log(language);
            break;
          }
        }
      } else {
        // show error message...
      }

      if (this.state.postData.category !== null) {
        let lengthOfBookCategory = this.state.bookCategory.length;
        for (let i = 0; i < lengthOfBookCategory; i++) {
          let categoryObj = this.state.bookCategory[i];
          console.log(categoryObj.id);
          if (categoryObj.id === category) {
            category = categoryObj.name;
            console.log(category);
            break;
          }
        }
      } else {
        // show error message...
      }

      if (
        this.state.postData.title !== null &&
        category !== null &&
        language !== null &&
        this.state.fileNameFrontCover !== null &&
        this.state.fileNameLastCover !== null
      ) {
        // send data to the book table
        let storage = localStorage.getItem('token_decoded');
        storage = JSON.parse(storage);
        console.log(storage);
        let userid = storage.id;
        let username = storage.username;

        // resulted object which is going to store at backend
        let resultObj = {
          userid: userid,
          userName: username,
          bookTitle: this.state.postData.title,
          category: category,
          language: language,
          frontCoverimage: this.state.postData.imageFrontCover,
          lastCoverimage: this.state.postData.imageLastCover,
        };
        let url = '/addbook/';
        console.log(resultObj);
        data = Utils.objToFormData(resultObj);
        console.log(data);

        Api.serachBookAlreadyExist(userid, username, this.state.postData.title)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              if (response.data.length > 0) {
                return Utils.notify(
                  'Please enter another book title!',
                  'error',
                  2000
                );
              } else {
                Api.setBooks(url, data)
                  .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                      console.log('done');
                    } else {
                      console.log('something wrong');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (this.state.postData.title === null) {
          // send error message
          return Utils.notify('Please enter valid book title!', 'error', 2000);
        } else if (category === null) {
          // send error
          return Utils.notify('Select a Category!', 'error', 2000);
        } else if (language === null) {
          // send error message
          return Utils.notify('Select a language!', 'error', 2000);
        } else if (this.state.fileNameFrontCover === null) {
          // send error message
          return Utils.notify('Select a Front Page Cover!', 'error', 2000);
        } else if (this.state.fileNameLastCover === null) {
          // send error message
          return Utils.notify('Select a Last Page Cover!', 'error', 2000);
        }
      }

      // check validation of title and content...
      let numberOfPages = this.state.Pages.length;
      for (let i = 0; i < numberOfPages && !this.state.alreadyExist; i++) {
        let myobj = this.state.Pages[i];
        let contentValidate = myobj.text;
        if (myobj.text) {
          contentValidate = this.HTMLStripper(myobj.text).trim();
          console.log(contentValidate);
        }
        let validTitle =
          myobj.title && /^(?=.*[\w\d\p{L}]).+/u.test(myobj.title);
        let validContent = contentValidate;

        let storage = localStorage.getItem('token_decoded');
        storage = JSON.parse(storage);
        console.log(storage);
        let userid = storage.id;
        let username = storage.username;

        if (validTitle && validContent) {
          // work for backend...
          // make object to send at backend...
          // first we need to take data of language and book category
          console.log('all good');
          let myurl = '/addChapter/';
          let myChapterobj = {
            userid: userid,
            userName: username,
            chapterTitle: myobj.title,
            chapterContent: myobj.text,
            bookTitle: this.state.postData.title,
          };

          Api.serachBookAlreadyExist(
            userid,
            username,
            this.state.postData.title
          ).then((response) => {
            if (response.status === 200) {
              if (response.data.length > 0) {
              } else {
                Api.setChapter(myurl, myChapterobj)
                  .then((response) => {
                    if (response.status === 201) {
                      console.log('done');
                    } else {
                      console.log('something wrong');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          });
        } else if (!validTitle && !validContent) {
          return Utils.notify(
            `Please enter valid title name and some content too in page ${
              i + 1
            } !`,
            'error',
            1000
          );
        } else if (!validTitle) {
          return Utils.notify(
            `Please enter valid title name in page ${i + 1}`,
            'error',
            1000
          );
        } else if (!validContent) {
          return Utils.notify(
            `Blank content of page ${i + 1} can not be published `,
            'error',
            1000
          );
        }
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
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
    if (this.context.state.bookCategory) {
      this.setState({ bookCategory: this.context.state.bookCategory });
    } else {
      Api.getBookCategories().then((response) => {
        this.setState({ bookCategory: response.data });
        this.context.setBookCategories(response.data);
      });
    }
  }

  addPage = () => {
    let pagesCount = this.state.Pages.length;
    let obj = {
      id: pagesCount + 1,
      title: 'Chapter Name',
      text: 'Add You Text Here',
      update: true,
      old: false,
    };
    this.state.Pages.push(obj);
    console.log(this.state.Pages);
    this.setState({ pageAdded: true });
  };

  pageUpdated = (value) => {
    console.log('i am in pageupdated');
    console.log(value);
    let id = value.value.id;
    this.state.Pages[id - 1].title = value.value.title;
    this.state.Pages[id - 1].text = value.value.text;
    this.state.Pages[id - 1].update = value.value.update;
    console.log(this.state.Pages);
  };

  render() {
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
            {this.state.Pages.map((value) => {
              return <Random value={value} updatedPage={this.pageUpdated} />;
            })}
            <div className='btnControls'>
              <Button
                className='editBtn'
                text={'Add Chapter'}
                stylingMode='outlined'
                type='default'
                onClick={this.addPage}
              />
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateBookTemplate;
