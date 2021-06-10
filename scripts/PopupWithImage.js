import Popup from "./Popup.js";
// import {imageCaption, popupFullImage} from './Card';
export const imagePopup = document.querySelector('.popup_type_image');//выбор popup показа полного изображения карточки
export const imageCaption = document.querySelector('.image-popup__caption');//выбор подписи изображения в popup полного изображения карточки
export const popupFullImage = document.querySelector('.image-popup__full-img');//выбор изображения в popup полного изображения карточки


export default class PopupWithImage extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._card = card;
  }

  open() {
    super.open();
    console.log(this._card);
    const cardTitle = this._card.querySelector('.card__title');
    popupFullImage.src = this._card.querySelector('.card__image').src;
    popupFullImage.alt = cardTitle.textContent;
    imageCaption.textContent = cardTitle.textContent;
  }
}
