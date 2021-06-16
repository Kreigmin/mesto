export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._profileNameSelector = profileNameSelector;
    this._profileJobSelector = profileJobSelector;
    this._name = document.querySelector(this._profileNameSelector);
    this._job = document.querySelector(this._profileJobSelector);
  }

  getUserInfo() {
    const name = this._name;
    const job = this._job;
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
