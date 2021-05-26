import fetchRequests from 'Fetch';
import Auth from 'Api/Auth';
import Utils from 'Utils';
const Api = {
  loginUser: (email, password) => {
    console.log(email);
    console.log(password);
    return fetchRequests.post('/user/login/', {
      user: {
        email,
        password,
      },
    });
  },
  SocialLogin: (data) => {
    return fetchRequests.post('/user/sociallogin/', data);
  },
  registerUser: (data) => {
    return fetchRequests.post('/user/register/', data);
  },
  postNotification: (data) => {
    return fetchRequests.post('/setnotification/postnotification/', data);
  },
  postCommentNotification: (data) => {
    return fetchRequests.post('/notification/comment/', data);
  },
  getUserInfo: (username) => {
    return fetchRequests.get(`/${username}`);
  },
  getUserId: (id) => {
    return fetchRequests.get(`/getuser/${id}`);
  },
  getAllPosts: (filter, page) => {
    return fetchRequests.get(
      `/posts/get/?page=${page}&${Utils.objectToParams(filter)}`
    );
  },
  getSuggestedPosts: (filter, page) => {
    return fetchRequests.get(
      `/posts/suggested/?page=${page}&${Utils.objectToParams(filter)}`
    );
  },
  serachBookAlreadyExist: (id, username, title) => {
    console.log(id + '    ' + username + '    ' + title);
    return fetchRequests.get(`/books/exist/${id}/${username}/${title}`);
  },
  getSootradharSuggestedPosts: (filter, page) => {
    return fetchRequests.get(
      `/sootradhar/suggested/?page=${page}&${Utils.objectToParams(filter)}`
    );
  },
  getLatestPosts: () => {
    return fetchRequests.get(`/posts/latest/`);
  },
  getAllUsers: (filter, page) => {
    return fetchRequests.get(
      `/all-users/?page=${page}&${Utils.objectToParams(filter)}`
    );
  },
  getUserDrafts: (user_slug, page) => {
    return fetchRequests.secured(
      `/posts/drafts/?page=${page}&user=${user_slug}`
    );
  },
  getUserBooks: (id, user_slug, page) => {
    return fetchRequests.secured(
      `/books/drafts/?page=${page}&search=${user_slug}`
    );
  },
  updateUserInfo: (data) => {
    return fetchRequests.securedFormApi('/user/', 'PUT', data);
  },
  getUserPhone: (data) => {
    return fetchRequests.secured('/user/phone/');
  },
  userIsWriter: () => {
    return fetchRequests.secured('/user/iswriter/');
  },
  getCategories: (filtered = false) => {
    if (filtered) {
      return fetchRequests.secured(`/categories/?filtered=${filtered}`);
    }
    return fetchRequests.get(`/categories/`);
  },
  getPopularCategory: () => {
    return fetchRequests.get(`/categories/popluar/`);
  },
  getCategoryInfo: (slug) => {
    return fetchRequests.get(`/categories/${slug}/description`);
  },
  getCategoryPost: (categoryName) => {
    return fetchRequests.secured(`/categories/${categoryName}/`);
  },
  getTags: () => {
    return fetchRequests.get('/tags/');
  },
  getTagPost: (tagName) => {
    return fetchRequests.secured(`/tags/${tagName}/`);
  },
  createPost: (data) => {
    return fetchRequests.securedFormApi('/posts/create/', 'POST', data);
  },
  editPost: (username, title, data) => {
    return fetchRequests.securedFormApi(`/${username}/${title}/`, 'PUT', data);
  },
  deletePost: (username, title) => {
    return fetchRequests.secured(`/${username}/${title}/`, 'DELETE');
  },

  getPostByUsernameTitle: (username, title) => {
    var url = `/getpost/${username}/${title}`;
    console.log(url);
    return fetchRequests.get(url);
  },
  getPostByID: (postid) => {
    console.log(postid);
    return fetchRequests.get(`/postByid/get/${postid}/`);
  },
  getPostInfo: (username, title) => {
    return fetchRequests.get(`/${username}/${title}`);
  },
  likeDislikePost: (username, title, action, type) => {
    var method = action === 'like' ? 'POST' : 'DELETE';
    if (type === 'sootradhar') {
      var url = `/sootradhar/${username}/${title}/like/`;
    } else {
      var url = `/${username}/${title}/like/`;
    }
    return fetchRequests.secured(url, method);
  },

  bookmarkUnbookmarkPost: (username, title, action, type) => {
    var method = action === 'bookmark' ? 'POST' : 'DELETE';
    if (type === 'sootradhar') {
      var url = `/sootradhar/${username}/${title}/bookmark/`;
    } else {
      var url = `/${username}/${title}/bookmark/`;
    }
    return fetchRequests.secured(url, method);
  },
  commentOnPost: (data) => {
    return fetchRequests.secured(`/comment/`, 'POST', data);
  },
  getComments: (postID) => {
    return fetchRequests.get(`/comments/${postID}/`);
  },
  getAllLikeNotification: (id) => {
    return fetchRequests.get(`/getallNotifications/${id}`);
  },
  getAllLikeNotificationSec: (id) => {
    return fetchRequests.get(`/getAllLikeNotificationSec/${id}`);
  },
  getAllCommentNotification: (id) => {
    return fetchRequests.get(`/getallCommentNotifications/${id}`);
  },
  getAllCommentNotificationSec: (id) => {
    return fetchRequests.get(`/getallCommentNotificationspost/${id}`);
  },
  getAllFollowNotification: (id) => {
    return fetchRequests.get(`/getallFollowNotifications/${id}`);
  },
  getAllFollowNotificationSec: (id) => {
    return fetchRequests.get(`/getallFollowNotificationsfuserid/${id}`);
  },
  getCarouselImage: (source, type = null) => {
    if (type) {
      return fetchRequests.get(`/carousel/?source=${source}&type=${type}`);
    }
    return fetchRequests.get(`/carousel/?source=${source}`);
  },
  getSideSliderImage: (source) => {
    return fetchRequests.get(`/slidercarousel/?source=${source}`);
  },
  getAllEvents: () => {
    return fetchRequests.get(`/events/`);
  },
  getAllChapters: () => {
    return fetchRequests.get(`/chapters/`);
  },
  getAllCommunity: () => {
    return fetchRequests.get(`/community/`);
  },
  getEventInfo: (title) => {
    return fetchRequests.get(`/event/${title}/`);
  },
  getChapterInfo: (title) => {
    return fetchRequests.get(`/chapter/${title}/`);
  },
  getCommunityInfo: (title) => {
    return fetchRequests.get(`/community/${title}/`);
  },
  checkRegistration: (type, title) => {
    return fetchRequests.secured(`/${type}/${title}/checkregistration`);
  },
  registerEvent: (title, method) => {
    return fetchRequests.secured(`/event/${title}/register/`, method);
  },
  registerChapter: (title, method) => {
    return fetchRequests.secured(`/chapter/${title}/register/`, method);
  },
  registerCommunity: (title, method) => {
    return fetchRequests.secured(`/community/${title}/register/`, method);
  },
  getStaticPage: (slug) => {
    return fetchRequests.get(`/staticpage/${slug}/`);
  },
  requsetPasswordChange: (email) => {
    return fetchRequests.post(`/user/changepassrequest/`, { email });
  },
  getSootradharAuthors: (filter, page) => {
    return fetchRequests.get(
      `/sootradhar/authors/?page=${page}&${Utils.objectToParams(filter)}`
    );
  },
  getSootradharAuthorInfo: (slug) => {
    return fetchRequests.get(`/sootradhar/${slug}/`);
  },
  getSootradharAuthorPoems: (slug, page) => {
    return fetchRequests.get(`/sootradhar/${slug}/posts/?page=${page}`);
  },
  getSootradharAuthorPoemInfo: (username, title) => {
    return fetchRequests.get(`/sootradhar/${username}/${title}/`);
  },
  getLanguages: () => {
    return fetchRequests.get(`/languages/`);
  },
  getBookCategories: () => {
    return fetchRequests.get(`/bookcategories/`);
  },
  getLanguagesPost: (language) => {
    return fetchRequests.get(`/language/${language}/`);
  },
  followAction: (action, follow_id) => {
    var method = 'DELETE';
    if (action === 'follow') {
      method = 'POST';
    }
    return fetchRequests.secured(`/follow-unfollow/${follow_id}`, method);
  },
  checkFollow: (follow_id) => {
    return fetchRequests.secured(`/follow-unfollow/${follow_id}`);
  },
  getSpecialPosts: (slug) => {
    return fetchRequests.get(`/sootradhar/special/${slug}`);
  },
  uploadPostInlineImage: (data) => {
    return fetchRequests.securedFormApi(`/posts/upload/`, 'POST', data);
  },
  getHeaders: () => {
    return fetchRequests.get(`/header`);
  },
  getSootradharAuthorsStory: () => {
    return fetchRequests.get(`/sootradhar/authors/story`);
  },
  getAdBanner: (type) => {
    return fetchRequests.get(`/ads/${type}/`);
  },
  globalSearch: (query) => {
    return fetchRequests.get(`/search/?query=${query}`);
  },
  getYoutubeVideos: () => {
    return fetchRequests.get(`/youtubeVideos`);
  },
  getContenType: () => {
    return fetchRequests.get(`/posts/contentType/`);
  },
  setNotification: (idofLiker, idofPostedBy, LikerName, LikerEmailId, url) => {
    return fetchRequests.post(url);
  },
  updateIsreadLike: (url, data) => {
    return fetchRequests.put(url, data);
  },
  updateIsreadFollow: (url, data) => {
    return fetchRequests.put(url, data);
  },
  updateIsreadcomment: (url, data) => {
    return fetchRequests.put(url, data);
  },
  setFollowNotification: (url, data) => {
    return fetchRequests.post(url, data);
  },
  setBooks: (url, data) => {
    return fetchRequests.securedFormApi(url, 'POST', data);
  },
  setChapter: (url, data) => {
    return fetchRequests.post(url, data);
  },
  getAllPages: (url) => {
    return fetchRequests.get(url);
  },
};
export default Api;
