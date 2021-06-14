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
    this._errorClass = validationConfig.errorClass
  }

  //метод показа ошибки валидации-----------------------------------------------------------------------------------------
  _showInputError(fieldset, inputElement, errorMessage)  {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //метод скрытия ошибки валидации-----------------------------------------------------------------------------------------
  _hideInputError(fieldset, inputElement) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
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
  _checkInputValidity(fieldset, inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
    }
  }

  //метод преключения кнопки submit-----------------------------------------------------------------------------------------
  _toggleButtonState(
    inputList,
    buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
    }

    _handleClearErrorsAndToggleButton(fieldset, inputs, button) {
      this._clearAllInputs(fieldset, this._inputSelector, this._inputErrorClass, this._errorClass);
      this._toggleButtonState(inputs, button);
    }

  // метод добавления слушателей-----------------------------------------------------------------------------------------
  _setEventListeners(fieldset) {
      const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));
      const buttonElement = fieldset.querySelector(this._submitButtonSelector);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(fieldset, inputElement, this._inputErrorClass, this._errorClass);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
      editBtn.addEventListener('click', () => {
        this._handleClearErrorsAndToggleButton(fieldset, inputList, buttonElement);
      });
      addBtn.addEventListener('click', () => {
        this._handleClearErrorsAndToggleButton(fieldset, inputList, buttonElement);
      });
    }

  //метод очистки полей при открытии формы-----------------------------------------------------------------------------------------
  _clearAllInputs(fieldset) {
    const inputList = fieldset.querySelectorAll(this._inputSelector);
    inputList.forEach((item) => {
      this._hideInputError(fieldset, item);
    });
  }
  //метод включения валидации-----------------------------------------------------------------------------------------
  enableValidation() {
    const form = this._currentForm;
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldset = form.querySelector(this._fieldsetSelector);
    this._setEventListeners(fieldset);
  }
}




