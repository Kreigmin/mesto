const validationConfig = {
  currentPopupSelector: '.popup_opened',
  formSelector: '.form',
  inputSelector: '.form__input',
  fieldsetSelector: '.form__fieldset',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

class FormValidator {
  constructor(validationConfig, currentForm) {
    this._currentForm = currentForm;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._fieldsetSelector = validationConfig.fieldsetSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass
  }


  _showInputError(fieldset, inputElement, errorMessage, inputErrorClass, errorClass)  {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(fieldset, inputElement, inputErrorClass, errorClass) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(fieldset, inputElement, inputErrorClass, errorClass)  {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(fieldset, inputElement, inputErrorClass, errorClass);
    }
  }

  _toggleButtonState(
    inputList,
    buttonElement,
    inactiveButtonClass) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
      } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
    }

  _setEventListeners(fieldset,
    submitButtonSelector,
    inputSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass) {
      const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
      const buttonElement = fieldset.querySelector(submitButtonSelector);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(fieldset, inputElement, inputErrorClass, errorClass);
          this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
      });
    }



  enableValidation() {
    const form = this._currentForm;
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldset = form.querySelector(this._fieldsetSelector);
      this._setEventListeners(
        fieldset,
        this._submitButtonSelector,
        this._inputSelector,
        this._inactiveButtonClass,
        this._inputErrorClass,
        this._errorClass)

  }

}

export { validationConfig, FormValidator };



