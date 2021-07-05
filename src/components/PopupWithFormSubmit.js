import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
  }

  setSubmitAction(action) {
    this._handleSubmitCallBack = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallBack();
    })

  }
}
