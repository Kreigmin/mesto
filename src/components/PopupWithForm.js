import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleSubmitForm) {
    super(popupSelector, formSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formBtn = this._popup.querySelector('.form__submit-btn');
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


  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues(), this._formBtn)
    });
  }
}
