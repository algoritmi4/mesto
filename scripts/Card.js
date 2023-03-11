export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__card')
    .cloneNode(true);

    return cardElement;
  };

  _toggleHeartState() {
    this._cardLikeImage.classList.toggle('photo-grid__heart_active');
  };

  _removeCardElement() {
    this._element.remove();
  };

  _setEventListeners() {
    this._cardLikeImage = this._element.querySelector('.photo-grid__heart');

    this._cardLikeImage.addEventListener('click', () => {
      this._toggleHeartState();
    });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => {
      this._removeCardElement();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.photo-grid__image');

    this._cardTitle = this._element.querySelector('.photo-grid__card-title');

    this._picturePopupImage = document.querySelector('.popup__image');

    this._setEventListeners(this._element);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  };
};