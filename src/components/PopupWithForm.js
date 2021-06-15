import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    const currentPopup = this._popup;
    const input = currentPopup.querySelectorAll('.form__input');
    input.forEach(element => {
      console.log(element.value);
    });
  }

  close() {
    super.close();
    const current =  this._popup;
    const currentForm = current.querySelector('.form');
    currentForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt);
    });
  }
}
