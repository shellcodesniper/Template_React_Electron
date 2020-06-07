const UserManager = {
  userInfoStruct : {
    access_token: '',
    login_token: ''
  },

  isLoggedIn: () => {
    let userInfo = localStorage.getItem('userinfo');
    return !(!userInfo) ? true : false;
  }

}

export {
  UserManager
}