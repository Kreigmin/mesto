import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector, formSelector);
  }

  setSubmitAction(action) {
    this._handleSubmitCallBack = action
  }

  _handleSubmitCallBack() {
    this._handlerSubmit();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallBack();
    })

  }
}
