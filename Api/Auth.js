import jwt_decode from "jwt-decode";
const Auth = {
  isAuthenticated: () => {
    /**
     * To check if the user is authenticated or not
     */

    console.log(localStorage.getItem('token'));
    return localStorage.getItem("token") ? true : false;
  },
  isAuthorized: (user_data) => {
    if (user_data && Auth.isAuthenticated()) {
      if (Number.isInteger(user_data)) {
        return user_data === Auth.decodedToken().id;
      } else {
        return user_data === Auth.decodedToken().username;
      }
    }
    return false;
  },
  LogoutUser: () => {
    ["token", "token_decoded"].forEach((i) => {
      localStorage.removeItem(i);
    });
  },
  saveLocal: (key, value) => {
    localStorage.setItem(key, value);
  },
  LoginUser: (token) => {
    var decoded = jwt_decode(token);
    Auth.saveLocal("token", token);
    Auth.saveLocal("token_decoded", JSON.stringify(decoded));
  },
  decodedToken: () => {
    return JSON.parse(localStorage.getItem("token_decoded"));
  },
  getLoginSuccessUrl: () => {
    let path = window.location.pathname;
    let domain = window.location.origin;
    if (["/", "/login"].includes(path)) {
      return domain;
    }
    return `${domain}${window.location.pathname}`;
  },
};
export default Auth;
