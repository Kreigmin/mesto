export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
    this._profileNameSelector = profileNameSelector;
    this._profileJobSelector = profileJobSelector;
    this._profileAvatarSelector = profileAvatarSelector;
    this._name = document.querySelector(this._profileNameSelector);
    this._job = document.querySelector(this._profileJobSelector);
    this._avatar = document.querySelector(this._profileAvatarSelector)
  }

  getUserInformation() {
    const name = this._name.textContent;
    const job = this._job.textContent;
    const data = {name, job};
    return data;
  }

  setUserInfo(newName, newJob, newAvatar) {
    this._name.textContent = newName;
    this._job.textContent = newJob;

  }

  setAvatar(newAvatar) {
    this._avatar.style.backgroundImage = `url(${newAvatar})`;
  }
}
