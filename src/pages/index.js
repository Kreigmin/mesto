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

const changeAvatarPopup = new PopupWithForm(changeAvatarPopupSelector, changeAvatarFormSelector, (data, btn) => {
  renderLoading(true, btn, 'Сохранение...');
  const avatarLink = Object.values(data)[0];
  api.changeAvatar(avatarLink).finally(renderLoading(false, btn, 'Сохранить'));
  changeAvatarPopup.close();
})
changeAvatarPopup.setEventListeners();

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

changeAvatarBtn.addEventListener('click', () => {
  changeAvatarPopup.open();
  changeAvatarValidation.clearValidation();
})


//Включение валидации форм
const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();
const changeFormValidation = new FormValidator(validationConfig, changeForm);
changeFormValidation.enableValidation();
const changeAvatarValidation = new FormValidator(validationConfig, changeAvatarForm);
changeAvatarValidation.enableValidation();
//======================================================================================================================================

const confirmPopup = new PopupWithFormSubmit(confirmPopupSelector, confirmFormSelector);
confirmPopup.setEventListeners();

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


const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6',
contentType: 'application/json'});

api.getUserInfo();

api.getCards().then((cards) => {
  cardList.renderInitialCards(cards);
});

