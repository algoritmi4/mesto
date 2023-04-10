export default class UserInfo {
  constructor(userNameSelector, userActivitySelector, userAvatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userActivitySelector = userActivitySelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userAvatar = document.querySelector(this._userAvatarSelector);
    this._userName = document.querySelector(this._userNameSelector);
    this._userActivity = document.querySelector(this._userActivitySelector);
  };

  setUserAvatar(picture) {
    this._userAvatar.src = picture;
  }

  getUserInfo() {
    const userInfo = {};

    userInfo['name'] = this._userName.textContent;
    userInfo['activity'] = this._userActivity.textContent;

    return userInfo;
  };

  setUserInfo({ name, activity }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  };
}