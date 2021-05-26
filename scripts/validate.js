const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
// -------------------------------------------------------------------------------------------------------------------------------
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
// -------------------------------------------------------------------------------------------------------------------------------
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// -------------------------------------------------------------------------------------------------------------------------------
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}
// -------------------------------------------------------------------------------------------------------------------------------
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
// -------------------------------------------------------------------------------------------------------------------------------
const setEventListeners = (formElement, submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}
// -------------------------------------------------------------------------------------------------------------------------------
const enableValidation = ({
  formSelector,
  inputSelector,
  fieldsetSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldList = Array.from(formElement.querySelectorAll(fieldsetSelector));
    fieldList.forEach((fieldset) => {
      setEventListeners(fieldset, submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass, errorClass)
    });
  });
}

//Функция скрытия ошибок при закрытии popup---------------------------------------------------------------------------------
const clearAllErrors = function({
  fieldsetSelector,
  inputSelector,
  inputErrorClass,
  errorClass}) {
  const fieldList = Array.from(document.querySelectorAll(fieldsetSelector));
  fieldList.forEach((field) => {
    const inputList = Array.from(field.querySelectorAll(inputSelector));
    inputList.forEach((item) => {
      hideInputError(field, item, inputErrorClass, errorClass)
    });
  });
}
