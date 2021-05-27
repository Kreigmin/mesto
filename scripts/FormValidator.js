export const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
export const addBtn = document.querySelector('.profile__add-btn');// Выбор кнопки добавления карточки

export class FormValidator {
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
  _showInputError(fieldset, inputElement, errorMessage, inputErrorClass, errorClass)  {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
  //метод скрытия ошибки валидации-----------------------------------------------------------------------------------------
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
  // метод проверки полей на валидность-----------------------------------------------------------------------------------------
  _checkInputValidity(fieldset, inputElement, inputErrorClass, errorClass)  {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(fieldset, inputElement, inputErrorClass, errorClass);
    }
  }

  //метод преключения кнопки submit-----------------------------------------------------------------------------------------
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
  // метод добавления слушателей-----------------------------------------------------------------------------------------
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
      editBtn.addEventListener('click', () => {
        this._clearAllInputs(fieldset,inputSelector, inputErrorClass, errorClass);
      });
      addBtn.addEventListener('click', () => {
        this._clearAllInputs(fieldset,inputSelector, inputErrorClass, errorClass);
      });
    }

  //метод очистки полей при открытии формы-----------------------------------------------------------------------------------------
  _clearAllInputs(fieldset, inputSelector, inputErrorClass, errorClass) {
    const inputList = fieldset.querySelectorAll(inputSelector);
    inputList.forEach((item) => {
      this._hideInputError(fieldset, item, inputErrorClass, errorClass);
    });
  }
  //метод включения валидации-----------------------------------------------------------------------------------------
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
      this._errorClass);
  }
}




