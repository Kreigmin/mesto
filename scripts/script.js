import Card from './Card.js';//импорт класса Card
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
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
const addPopupSelector = '.popup_type_card';
const editPopupSelector = '.popup_type_edit';


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

const lala = new PopupWithForm(editPopupSelector,
(evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  lala.close();
});
lala.setEventListeners();

const lalal = new PopupWithForm(addPopupSelector,
(evt) => {
  evt.preventDefault();
  const aaa = [{name: inputPlaceName.value, link: inputPlaceImage.value}];
  const newCard = new Section({items: aaa,
    renderer: (item) => {
      const card = new Card({name: item.name, link: item.link, handleCardClick: handleCardClick}, '.card-template');
      const cardElement = card.generateCard();
      initialCardList.addItem(cardElement);
    }}, '.cards__list');
  newCard.renderItems();
  lalal.close();
});
lalal.setEventListeners();

// Функция колбэк для открытия превью карточки
const handleCardClick = (item) => {
  const fullImagePopup = new PopupWithImage('.popup_type_image', item);
  fullImagePopup.open();
  fullImagePopup.setEventListeners();
}

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  lala.open();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

addBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup добавления карточки
  lalal.open()
});

//Добавление начальных карточек карточек
const initialCardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card({name: item.name, link: item.link, handleCardClick: handleCardClick}, '.card-template');
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
