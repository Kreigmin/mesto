import  Card  from './Card.js';
import initialCards from './initial-cards.js';


//Объявление переменных 4 спринт-----------------------------------------------------------------------------------------------
const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
const inputName = document.querySelector('.form__input_name_value');// Выбор поля ввода имени
const profileName = document.querySelector('.profile__name');// Выбор имени
const inputJob = document.querySelector('.form__input_job_value');// Выбор поля ввода профессии
const profileJob = document.querySelector('.profile__job');// Выбор профессии
const editPopup = document.querySelector('.popup_type_edit');// Выбор pop-up'a
const closeEditBtn = document.querySelector('.close-edit-popup');// Выбор кнопки закрытия popup
const profileFormElement = document.querySelector('.profileChangeForm');// Выбор формы изменения профиля

//Объявление переменных 5 спринт-----------------------------------------------------------------------------------------------
const cardList = document.querySelector('.cards__list');//выбор списка карточек
const cardPopup = document.querySelector('.popup_type_card');//выбор popup добавления карточки
const addBtn = document.querySelector('.profile__add-btn');//выбор кнопки открытия popup добавления карточки
const closeCardBtn = document.querySelector('.close-card-popup')//выбор кнопки закрытия popup добавления карточки
const inputPlaceName = document.querySelector('.form__input_card-name_value');//выбор поля названия карточки
const inputPlaceImage = document.querySelector('.form__input_card-link_value');//выбор поля ссылки карточки
const addCardForm = document.querySelector('.addCardForm');//выбор формы добавления карточки

// const cardTemplate = document.querySelector('.card-template').content;//выбор контента шаблона карточки

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

//Функция открытия popup--------------------------------------------------------------------------------------------------------
const openPopup = function(button) {
  button.classList.add('popup_opened');//добавление класса к popup
  document.addEventListener('keydown', closePopupOnPressKey);
}

//Функция закрытия popup--------------------------------------------------------------------------------------------------------
const closePopup = function(button) {//объявление переменной в которой функция с двумя аргументми: Имя popup и класс
  button.classList.remove('popup_opened');//удаление класса из popup
  document.removeEventListener('keydown', closePopupOnPressKey);
}

//Функция закрытия popup по кнопке Escape-------------------------------------------------------------------------------------
const closePopupOnPressKey = function(evt) {
  const currentPopup =  document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(currentPopup);
  }
}

//Функция закрытия popup по нажатию на overlay-------------------------------------------------------------------------------------
const closePopupOnOverlay = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  });
}

//Функция отправки формы изменения профиля-------------------------------------------------------------------------------------
const handleProfileFormSubmit =  function(evt) {//объявление переменной
  evt.preventDefault();//предовращение стандартного выполнения функции
  profileName.textContent = inputName.value;//запись текста в имя профиля из поля ввода имени в popup
  profileJob.textContent = inputJob.value;//запись текста в имя профиля из поля ввода профессии в popup
  closePopup(editPopup);//вызов функции закрытия popup
}



//Функция отправки формы добавления карточки---------------------------------------------------------------------------------
const handleCardFormSubmit = function(evt, {
  currentPopupSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass
}) {// Объявление перемнной
  evt.preventDefault();//предовращение стандартного выполнения функции
  const currentPopup = document.querySelector(currentPopupSelector);
  const inputList = Array.from(currentPopup.querySelectorAll(inputSelector));
  const buttonElement = currentPopup.querySelector(submitButtonSelector);
  const newCard = new Card(inputPlaceName.value, inputPlaceImage.value)
  renderCard(newCard, cardList);//вызов функции добавления карточки
  addCardForm.reset();//функция очистки формы
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  closePopup(cardPopup);//вызов функции закрытия popup добавления карточки
}



// включение валидации
enableValidation(validationConfig);

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  openPopup(editPopup);//вызов функции открытия popup
  inputName.value = profileName.textContent;// Добавить имя в input при открытии
  inputJob.value = profileJob.textContent; // Добавить профессию в input при открытии
  clearAllErrors(validationConfig);
});


addBtn.addEventListener('click', function() {
  openPopup(cardPopup);
  addCardForm.reset();//функция очистки формы.
  clearAllErrors(validationConfig);
});//Слушатель при нажании открыть popup добавления карточки

closeEditBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup изменения профиля
  closePopup(editPopup);//вызвать функцию закрытия popup
});

closeCardBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup добавления карточки
  closePopup(cardPopup);//вызвать функцию закрытия popup
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);//Слушатель при отправке формы выполнить функцию handleProfileFormSubmit

addCardForm.addEventListener('submit', function(evt) {
  handleCardFormSubmit(evt, validationConfig);
});//Слушатель при отправке формы выполнить функцию handleCardFormSubmit

closePopupOnOverlay();

//функция добавления карточки в контейнер---------------------------------------------------------------------
const renderCard = function(card, wrap) {
  wrap.prepend(card.generateCard());//вызвать метод prepend для записи карточки в контейнер
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  renderCard(card, cardList);
});
