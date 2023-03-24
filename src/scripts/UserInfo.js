export default class UserInfo {
  constructor(userNameSelector, userActivitySelector) {
    this._userNameSelector = userNameSelector;
    this._userActivitySelector = userActivitySelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userActivity = document.querySelector(this._userActivitySelector);
  };

  getUserInfo() {
    const userInfo = {};

    userInfo['userName'] = this._userName.textContent;
    userInfo['userActivity'] = this._userActivity.textContent;

    return userInfo;
  };

  setUserInfo({ name, activity }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  };
}