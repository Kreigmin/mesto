import { editBtn, addBtn } from '../utils/constants.js';

export default class FormValidator {
  constructor(validationConfig, currentForm) {
    this._currentForm = currentForm;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._fieldsetSelector = validationConfig.fieldsetSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._fieldset = this._currentForm.querySelector(this._fieldsetSelector);
    this._inputList = Array.from(this._fieldset.querySelectorAll(this._inputSelector));
    this._buttonElement = this._fieldset.querySelector(this._submitButtonSelector);
  }

  //метод показа ошибки валидации-----------------------------------------------------------------------------------------
  _showInputError(inputElement, errorMessage)  {
    const errorElement = this._fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //метод скрытия ошибки валидации-----------------------------------------------------------------------------------------
  _hideInputError(inputElement) {
    const errorElement = this._fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // метод проверки полей на валидность-----------------------------------------------------------------------------------------
  _checkInputValidity(inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //метод преключения кнопки submit-----------------------------------------------------------------------------------------
  _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
    }

    // _handleClearErrorsAndToggleButton(fieldset, inputs, button) {
    //   this._clearAllInputs(fieldset, this._inputSelector, this._inputErrorClass, this._errorClass);
    //   this._toggleButtonState(inputs, button);
    // }

    clearValidation(button) {
      button.addEventListener('click', () => {
        this._clearAllInputs();
        this._toggleButtonState();
      });
    }

  // метод добавления слушателей-----------------------------------------------------------------------------------------
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //метод очистки полей при открытии формы-----------------------------------------------------------------------------------------
  _clearAllInputs() {
    this._inputList.forEach((item) => {
      this._hideInputError(item);
    });
  }
  //метод включения валидации-----------------------------------------------------------------------------------------
  enableValidation() {
    this._currentForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(this._fieldset);
  }
}




