export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._profileNameSelector = profileNameSelector;
    this._profileJobSelector = profileJobSelector;
  }

  getUserInfo() {
    const name = document.querySelector(this._profileNameSelector);
    const job = document.querySelector(this._profileJobSelector);
    const data = {name, job};
    return data;
  }

  setUserInfo(newName, newJob) {
    const data = this.getUserInfo();
    const {name, job} = data;
    name.textContent = newName;
    job.textContent = newJob;
  }
}
