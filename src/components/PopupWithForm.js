import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector, formSelector);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  close() {
    super.close();
    const current =  this._popup;
    const currentForm = current.querySelector('.form');
    currentForm.reset();
  }

  deleteCardOnSubmit(cardid,handleDeleteCard) {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      handleDeleteCard(cardid);
    })
  }

  submitFormWithInputs(handleSubmitForm) {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      handleSubmitForm(this._getInputValues())
    });
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
