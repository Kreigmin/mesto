import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithFormSubmit from '../components/PopupWithFormSubmit.js'
import {
  inputName,
  inputJob,
  addPopupSelector,
  editPopupSelector,
  addFormSelector,
  changeFormSelector,
  addForm,
  changeForm,
  validationConfig,
  editBtn,
  addBtn,
  confirmPopupSelector,
  confirmFormSelector,
  changeAvatarPopupSelector,
  changeAvatarFormSelector,
  changeAvatarForm,
  changeAvatarBtn
} from '../utils/constants.js'

const renderLoading = (isLoading, btn, btnText) => {
  if (isLoading) {
    btn.textContent = btnText;
  } else {
    btn.textContent = btnText;
  }
}

//======================================start block where popups and logic for them are created========================================
//create a sapmple of the PopupWithForm for edit user information popup
const editPopup = new PopupWithForm(editPopupSelector, changeFormSelector, (data, btn) => {
  renderLoading(true, btn, 'Сохранение...');
  const {profileName, profileJob} = data;
  api.sendProfileDataToServer(profileName, profileJob)
    .then((data) => {
      info.setUserInfo(data.name, data.about);
    })
    .finally(renderLoading(false, btn, 'Сохранить'))
  editPopup.close();
} );
editPopup.setEventListeners();

//create a sapmple of the PopupWithForm for create new card popup
const addPopup = new PopupWithForm(addPopupSelector, addFormSelector, (data, btn) => {
  renderLoading(true, btn, 'Создать');
  const {cardName, cardImage} = data
  api.addNewCardToServer(cardName, cardImage).then((card) => {
    cardList.renderCard(card);
  })
  .finally(renderLoading(false, btn, 'Создать'));
  addPopup.close();
});
addPopup.setEventListeners();

//create a sapmple of the PopupWithForm for change avatar popup
const changeAvatarPopup = new PopupWithForm(changeAvatarPopupSelector, changeAvatarFormSelector, (data, btn) => {
  renderLoading(true, btn, 'Сохранение...');
  const avatarLink = data.avatarImage;
  api.changeAvatar(avatarLink).finally(renderLoading(false, btn, 'Сохранить'));
  changeAvatarPopup.close();
})
changeAvatarPopup.setEventListeners();

//create a sapmple of the PopupWithForm for confirm the deletion of the card popup
const confirmPopup = new PopupWithFormSubmit(confirmPopupSelector, confirmFormSelector);
confirmPopup.setEventListeners();
//create a sapmple of the PopupWithForm for display full image of the card popup
const fullImagePopup = new PopupWithImage('.popup_type_image');
fullImagePopup.setEventListeners();
//======================================end block where popups and logic for them are created==========================================

//create a sample of the UserInfo class
const info = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__job'});

//====================================================start block where buttons gets listeners=========================================
// add listener for change profile information
editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  editPopup.open();
  const {name, job} =  info.getUserInfo();
  inputName.value = name.textContent;
  inputJob.value = job.textContent;
  changeFormValidation.clearValidation();
});

// add listener for create new card button
addBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup добавления карточки
  addPopup.open()
  addFormValidation.clearValidation();
});

// add listener for change avatar button
changeAvatarBtn.addEventListener('click', () => {
  changeAvatarPopup.open();
  changeAvatarValidation.clearValidation();
})
//=================================================end block where buttons gets listeners==============================================

//============================================start block where validation for forms are created=======================================
const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();
const changeFormValidation = new FormValidator(validationConfig, changeForm);
changeFormValidation.enableValidation();
const changeAvatarValidation = new FormValidator(validationConfig, changeAvatarForm);
changeAvatarValidation.enableValidation();
//============================================end block where validation for forms are created=======================================


//create a sapmple of the Section class
const cardList = new Section({items: [],
  renderer: (item) => {
    const card = new Card({data: item, handleCardClick: () => {
      fullImagePopup.open(item.name, item.link);
    }, handleConfirmPopupClick: (cardid) => {
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(cardid).then(() => {
          cardElement.remove();
          confirmPopup.close();
        })
      })
    }, sendLike: (idCard, likes) => {
      const cardLike = cardElement.querySelector('.card__like-number')
      api.sendLikeToServer(idCard, likes)
      .then((data) => {
        cardLike.textContent = data.likes.length;
      })
    }, deleteLike: (idCard) => {
      const cardLike = cardElement.querySelector('.card__like-number')
      api.deleteLike(idCard)
      .then((data) => {
        cardLike.textContent = data.likes.length;
      })
    }}, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.cards__list');

//create a sample of the Api class
const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6',
contentType: 'application/json'});

//get user info from the server and paste on the site on load
api.getUserInfo();


//get initial cards and render them
api.getCards().then((cards) => {
  cardList.renderInitialCards(cards);
});

