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
  validationConfig,
  editBtn,
  addBtn,
  initialCards
} from '../utils/constants.js'

const editPopup = new PopupWithForm(editPopupSelector,
(evt) => {
  evt.preventDefault();
  info.setUserInfo(inputName.value, inputJob.value)
  editPopup.close();
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(addPopupSelector,
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
