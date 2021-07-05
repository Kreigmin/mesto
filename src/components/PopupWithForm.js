import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = document.querySelector(formSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formBtn = this._popup.querySelector('.form__submit-btn');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    // this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading = (isLoading, btnText) => {
    if (isLoading) {
      this._formBtn.textContent = btnText;
    } else {
      this._formBtn.textContent = btnText;
    }
  }


  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues(), this._formBtn)
    });
  }
}
