

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
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
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

  _handleOpenPopup() {
    imagePopup.classList.add('popup_opened');
    popupFullImage.src = this._element.querySelector('.card__image').src;
    popupFullImage.alt = this._element.querySelector('.card__title').textContent;
    imageCaption.textContent = this._element.querySelector('.card__title').textContent;
    document.addEventListener('keydown', (evt) => {
      this._handleClosePopupOnPressKey(evt);
    });
  }

  _handleClosePopup() {
    imagePopup.classList.remove('popup_opened');
  }

  _handleClosePopupOnPressKey(evt) {
    if (evt.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleDeleteCardClick();
    });

    this._element.querySelector('.card__full-img-btn').addEventListener('click', () => {
      this._handleOpenPopup();

    });

    closeImgPopupBtn.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }
}

