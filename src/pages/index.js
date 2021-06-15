import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'
import {
  inputName,
  inputJob,
  inputPlaceName,
  inputPlaceImage,
  addPopupSelector,
  editPopupSelector,
  addFormSelector,
  changeFormSelector,
  validationConfig,
  editBtn,
  addBtn,
  initialCards
} from '../utils/constants.js'

const editPopup = new PopupWithForm(editPopupSelector, changeFormSelector,
(evt) => {
  evt.preventDefault();
  info.setUserInfo(inputName.value, inputJob.value)
  editPopup.close();
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(addPopupSelector, addFormSelector,
  (evt) => {
    evt.preventDefault();
    const card = new Card({name: inputPlaceName.value,
      link: inputPlaceImage.value,
      handleCardClick: handleCardClick},
      '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPopup.close();
  });


addPopup.setEventListeners();


const info = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__job'});



// Функция колбэк для открытия превью карточки
const handleCardClick = (item) => {
  const fullImagePopup = new PopupWithImage('.popup_type_image', item);
  fullImagePopup.open();
  fullImagePopup.setEventListeners();
}

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  editPopup.open();
  const {name, job} =  info.getUserInfo();
  inputName.value = name.textContent;
  inputJob.value = job.textContent;
});

addBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup добавления карточки
  addPopup.open()
});

//Добавление начальных карточек карточек
const cardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card({name: item.name, link: item.link, handleCardClick: handleCardClick}, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }}, '.cards__list');

//Включение валидации форм
const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((item) => {
  const formValidation = new FormValidator(validationConfig, item);
  formValidation.enableValidation();
});

cardList.renderItems();
