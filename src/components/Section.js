export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderInitialCards(cardsData) {
    cardsData.forEach((item) => {
      this._renderer(item);
    });
  }

  renderCard(cardData) {
    this._renderer(cardData);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
