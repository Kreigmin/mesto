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

let userId;

//create a sample of the Api class
const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6',
contentType: 'application/json'});

//get user info from the server and paste on the site on load
const setProfile =  api.getUserInfo();

//get initial cards and render them
const renderCards =  api.getCards();

Promise.all([setProfile, renderCards]).then((data) => {
  const profileData = data[0];
  const initialCards = data[1];
  userId = profileData._id;
  info.setUserInfo(profileData.name, profileData.about);
  info.setAvatar(profileData.avatar)
  cardList.renderInitialCards(initialCards);
}).catch((err) => {
  console.log(err);
});



//======================================start block where popups and logic for them are created========================================
//create a sapmple of the PopupWithForm for edit user information popup
const editPopup = new PopupWithForm(editPopupSelector, changeFormSelector, (data) => {
  editPopup.renderLoading(true, 'Сохранение...');
  const {profileName, profileJob} = data;
  api.sendProfileDataToServer(profileName, profileJob)
    .then((data) => {
      info.setUserInfo(data.name, data.about);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      editPopup.renderLoading(false, 'Сохранить')
    })


} );
editPopup.setEventListeners();

//create a sapmple of the PopupWithForm for create new card popup
const addPopup = new PopupWithForm(addPopupSelector, addFormSelector, (data) => {
  addPopup.renderLoading(true, 'Создание...');
  const {cardName, cardImage} = data
  api.addNewCardToServer(cardName, cardImage).then((card) => {
    cardList.renderCard(card);
    addPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    addPopup.renderLoading(false, 'Создать')
  });
});
addPopup.setEventListeners();

//create a sapmple of the PopupWithForm for change avatar popup
const changeAvatarPopup = new PopupWithForm(changeAvatarPopupSelector, changeAvatarFormSelector, (data) => {
  changeAvatarPopup.renderLoading(true, 'Сохранение...');
  const avatarLink = data.avatarImage;
  api.changeAvatar(avatarLink)
  .then((data) => {
    info.setAvatar(data.avatar);
    changeAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    changeAvatarPopup.renderLoading(false, 'Сохранить')
  });
});
changeAvatarPopup.setEventListeners();

//create a sapmple of the PopupWithForm for confirm the deletion of the card popup
const confirmPopup = new PopupWithFormSubmit(confirmPopupSelector, confirmFormSelector);
confirmPopup.setEventListeners();
//create a sapmple of the PopupWithForm for display full image of the card popup
const fullImagePopup = new PopupWithImage('.popup_type_image');
fullImagePopup.setEventListeners();
//======================================end block where popups and logic for them are created==========================================

//create a sample of the UserInfo class
const info = new UserInfo({profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
});

//====================================================start block where buttons gets listeners=========================================
// add listener for change profile information
editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  editPopup.open();
  const {name, job} =  info.getUserInformation();
  inputName.value = name;
  inputJob.value = job;
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
    const card = new Card({data: item, userId: userId, handleCardClick: () => {
      fullImagePopup.open(item.name, item.link);
    }, handleConfirmPopupClick: (cardid) => {
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(cardid).then(() => {
          cardElement.remove();
          confirmPopup.close();
        })
        .catch((err) => {
          console.log(err)
        });
      });
    }, sendLike: (idCard, likes) => {
      api.sendLikeToServer(idCard, likes)
      .then((data) => {
        card.updateLikes(data.likes.length);
      })
      .catch((err) => {
        console.log(err)
      })
    }, deleteLike: (idCard) => {
      api.deleteLike(idCard)
      .then((data) => {
        card.updateLikes(data.likes.length);
      })
      .catch((err) => {
        console.log(err)
      });
    }}, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.cards__list');




