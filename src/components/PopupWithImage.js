import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popup.querySelector('.image-popup__caption');
    this._popupFullImage = this._popup.querySelector('.image-popup__full-img');
  }

  open(name, link) {
    super.open();
    this._popupFullImage.src = link;
    this._popupFullImage.alt = name;
    this._imageCaption.textContent = name;
  }
}
