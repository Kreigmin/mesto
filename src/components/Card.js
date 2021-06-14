export default class Card {
  constructor({name, link, handleCardClick}, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = name;
    this._image = link;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._element);
    });
  }
}

