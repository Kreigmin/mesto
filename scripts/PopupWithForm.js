import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    const currentPopup = document.querySelector(this._popupSelector);
    const input = currentPopup.querySelectorAll('.form__input');
    input.forEach(element => {
      console.log(element.value);
    });
  }

  close() {
    super.close();
    const current =  document.querySelector(this._popupSelector);
    const currentForm = current.querySelector('.form');
    currentForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    document.querySelector(this._popupSelector).addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt);
    });
  }
}
