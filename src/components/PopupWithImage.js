import Popup from "./Popup.js";
import { imageCaption, popupFullImage} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._card = card;
  }

  open() {
    super.open();
    const cardTitle = this._card.querySelector('.card__title');
    popupFullImage.src = this._card.querySelector('.card__image').src;
    popupFullImage.alt = cardTitle.textContent;
    imageCaption.textContent = cardTitle.textContent;
  }
}
