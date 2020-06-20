const {
  ipcRenderer
} = window;

const UserManager = {
  userInfoStruct : {
    access_token: '',
    login_token: ''
  },

  isLoggedIn: (data) => {
    if(!(!data.data.status) && data.data.status ==="0000") return true;
    else return false;
  }

}

export {
  UserManager
}