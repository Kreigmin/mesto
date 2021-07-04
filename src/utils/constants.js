export const inputName = document.querySelector('.form__input_name_value');// Выбор поля ввода имени
export const inputJob = document.querySelector('.form__input_job_value');// Выбор поля ввода профессии
export const inputPlaceName = document.querySelector('.form__input_card-name_value');//выбор поля названия карточки
export const inputPlaceImage = document.querySelector('.form__input_card-link_value');//выбор поля ссылки карточки
export const addPopupSelector = '.popup_type_card';
export const editPopupSelector = '.popup_type_edit';
export const addFormSelector = '.addCardForm';
export const changeFormSelector = '.profileChangeForm';
export const changeForm = document.querySelector(changeFormSelector);
export const addForm = document.querySelector(addFormSelector);
export const confirmPopupSelector = '.popup_type_confirm';
export const confirmFormSelector = '.confirmDeleteCardForm';
export const changeAvatarPopupSelector = '.popup_type_avatar';
export const changeAvatarFormSelector = '.changeAvatarForm';
export const cardDeleteBtn = document.querySelector('.card__delete-btn');
export const changeAvatarForm = document.querySelector(changeAvatarFormSelector);
export const changeAvatarBtn = document.querySelector('.profile__change-avatar-btn');

export const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
export const addBtn = document.querySelector('.profile__add-btn');// Выбор кнопки добавления карточки

export const imagePopup = document.querySelector('.popup_type_image');//выбор popup показа полного изображения карточки
export const imageCaption = document.querySelector('.image-popup__caption');//выбор подписи изображения в popup полного изображения карточки
export const popupFullImage = document.querySelector('.image-popup__full-img');//выбор изображения в popup полного изображения карточки


export const validationConfig = {
  currentPopupSelector: '.popup_opened',
  formSelector: '.form',
  inputSelector: '.form__input',
  fieldsetSelector: '.form__fieldset',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

import closeIcon from '../images/close-icon.svg';
import closeIconSmall from '../images/close-icon320.svg';
import deleteIcon from '../images/delete-icon.svg';
import likeActive from '../images/like-active.svg';
import likeDisabled from '../images/like-disabled.svg';
import logo from '../images/logo.svg';
import pen from '../images/pen.svg';
import plus from '../images/plus.svg';

