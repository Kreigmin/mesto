import {openPopup} from './script.js';

export const imagePopup = document.querySelector('.popup_type_image');//выбор popup показа полного изображения карточки
const imageCaption = document.querySelector('.image-popup__caption');//выбор подписи изображения в popup полного изображения карточки
const popupFullImage = document.querySelector('.image-popup__full-img');//выбор изображения в popup полного изображения карточки
export const closeImgPopupBtn = document.querySelector('.close-image-popup');//выбор кнопки закрытия popup полного изображения карточки

export class Card {
  constructor(name, link, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = name;
    this._image = link
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._image;
    cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteCardClick() {
    const listItem = this._element.querySelector('.card__delete-btn').closest('.card');
    listItem.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleDeleteCardClick();
    });

    this._element.querySelector('.card__full-img-btn').addEventListener('click', () => {
      const cardTitle = this._element.querySelector('.card__title');
      openPopup(imagePopup);
      popupFullImage.src = this._element.querySelector('.card__image').src;
      popupFullImage.alt = cardTitle.textContent;
      imageCaption.textContent = cardTitle.textContent;
    });
  }
}

