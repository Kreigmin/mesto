import Card from './Card.js';//импорт класса Card
import Section from './Section.js';
import initialCards from './initial-cards.js';//импорт начального массива карточек
import { FormValidator, editBtn, addBtn } from './FormValidator.js'//импорт класса FormValidator и кнопок отрытия форм


//Объявление переменных 4 спринт-----------------------------------------------------------------------------------------------
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
const closeCardBtn = document.querySelector('.close-card-popup')//выбор кнопки закрытия popup добавления карточки
const inputPlaceName = document.querySelector('.form__input_card-name_value');//выбор поля названия карточки
const inputPlaceImage = document.querySelector('.form__input_card-link_value');//выбор поля ссылки карточки
const addCardForm = document.querySelector('.addCardForm');//выбор формы добавления карточки


//объект настроек для валидации с классами и селекторами
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
export const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnPressKey);
}

//Функция закрытия popup--------------------------------------------------------------------------------------------------------
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnPressKey);
}

//Функция закрытия popup по кнопке Escape-------------------------------------------------------------------------------------
const closePopupOnPressKey = function(evt) {
  const currentPopup =  document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(currentPopup);
  }
}

const closePopupOnOverlayAndButton = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

//Функция отправки формы изменения профиля-------------------------------------------------------------------------------------
const handleProfileFormSubmit =  function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(editPopup);
}

//Функция отправки формы добавления карточки---------------------------------------------------------------------------------
const handleCardFormSubmit = function(evt) {
  evt.preventDefault();
  const aaa = [{name: inputPlaceName.value, link: inputPlaceImage.value}];
  const newCard = new Section({items: aaa,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.card-template');
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }}, '.cards__list');
  newCard.renderItems();
  addCardForm.reset();
  closePopup(cardPopup);
}

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  openPopup(editPopup);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

addBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup добавления карточки
  openPopup(cardPopup);
  addCardForm.reset();
});

//Слушатель при отправке формы выполнить функцию handleProfileFormSubmit
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardForm.addEventListener('submit', function(evt) {
  handleCardFormSubmit(evt);
});//Слушатель при отправке формы выполнить функцию handleCardFormSubmit


//Вызов функции закрытия popup по нажатию на кнопку и оверлей
closePopupOnOverlayAndButton();

//Добавление начальных карточек карточек
const initialCardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.card-template');
    const cardElement = card.generateCard();
    initialCardList.addItem(cardElement);
  }}, '.cards__list');

//Включение валидации форм
const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((item) => {
  const formValidation = new FormValidator(validationConfig, item);
  formValidation.enableValidation();
});

initialCardList.renderItems();
