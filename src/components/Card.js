export default class Card {
  constructor({data, handleCardClick, handleConfirmPopupClick, sendLike, deleteLike},
    templateSelector) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._LikeNumber = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleConfirmPopupClick = handleConfirmPopupClick;
    this._sendLike = sendLike;
    this._deleteLike = deleteLike;

    // this._deleteCardSubmit = deleteCardSubmit
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
    this._element.querySelector('.card__like-number').textContent = this._LikeNumber.length;
    this._setEventListeners();
    this._createDeleteCardBtn();
    if (this._element.querySelector('.card__delete-btn')) {
      this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
        this._handleConfirmPopupClick(this._cardId);
      })
    }
    this._checkUserlike();
    return this._element;
  }

  _handleLikeClick(evt) {
    if (!this._element.querySelector('.card__like').classList.contains('card__like_active')) {
      evt.target.classList.toggle('card__like_active');
      this._sendLike(this._cardId, this._LikeNumber)
    } else {
      evt.target.classList.toggle('card__like_active');
      this._deleteLike(this._cardId)
    }
  }

  _createDeleteCardBtn() {
    if (this._ownerId === 'b5da1543032b73988ff80ae9') {
      const cardDeleteBtn = document.createElement('button');
      cardDeleteBtn.classList.add('card__delete-btn');
      cardDeleteBtn.type = 'button';
      cardDeleteBtn.ariaLabel = 'Удалить';
      this._element.append(cardDeleteBtn);
    }
  }

  _checkUserlike() {
    this._LikeNumber.forEach((item) => {
      if (item._id === 'b5da1543032b73988ff80ae9') {
        this._element.querySelector('.card__like').classList.add('card__like_active')
      }
    })
  }


  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._element.querySelector('.card__full-img-btn').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
