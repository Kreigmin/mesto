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
  addForm,
  changeForm,
  validationConfig,
  editBtn,
  addBtn,
  initialCards
} from '../utils/constants.js'

const editPopup = new PopupWithForm(editPopupSelector, changeFormSelector,
(data) => {
  const {profileName, profileJob} = data;
  info.setUserInfo(profileName, profileJob);
  editPopup.close();
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(addPopupSelector, addFormSelector,
  (data) => {
    const {cardName, cardImage} = data;
    const card = new Card({name: cardName, link: cardImage, handleCardClick: () =>
      {
        fullImagePopup.open(cardName, cardImage);
      }},
      '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPopup.close();
  });
addPopup.setEventListeners();

const fullImagePopup = new PopupWithImage('.popup_type_image');
fullImagePopup.setEventListeners();



const info = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__job'});

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  editPopup.open();
  const {name, job} =  info.getUserInfo();
  inputName.value = name.textContent;
  inputJob.value = job.textContent;
  changeFormValidation.clearValidation();
});

addBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup добавления карточки
  addPopup.open()
  addFormValidation.clearValidation();
});

//Добавление начальных карточек карточек
const cardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card({name: item.name, link: item.link, handleCardClick: () => {
      fullImagePopup.open(item.name, item.link);
    }}, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }}, '.cards__list');


cardList.renderItems();

//Включение валидации форм
const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();
const changeFormValidation = new FormValidator(validationConfig, changeForm)
changeFormValidation.enableValidation();


