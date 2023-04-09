export default class Card {
  constructor(data, templateSelector, handleCardClick, { openPopupWithConfirmation, increaseLikesQuantity, decreaseLikesQuantity }, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupWithConfirmation = openPopupWithConfirmation;
    this._increaseLikesQuantity = increaseLikesQuantity;
    this._decreaseLikesQuantity = decreaseLikesQuantity;
    this._userId = userId;
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

      if(this._cardLikeImage.classList.contains('photo-grid__heart_active')) {
        this._increaseLikesQuantity(this._cardId)
        .then(likesObject => {
          this._handleLikesQuantity(likesObject.likes);
        })
      } else {
        this._decreaseLikesQuantity(this._cardId)
        .then(likesObject => {
          this._handleLikesQuantity(likesObject.likes);
        })
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  _handleLikesQuantity(likesObject) {
    this._likesQuantity.textContent = String(likesObject.length);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._photoGridTrash = this._element.querySelector('.photo-grid__trash');

    if(this._ownerId !== this._userId) {
      this._photoGridTrash.remove();
    } else {
      this._photoGridTrash.addEventListener('click', () => {
        this._openPopupWithConfirmation(this);
      });
    }

    this._cardImage = this._element.querySelector('.photo-grid__image');

    this._cardTitle = this._element.querySelector('.photo-grid__card-title');

    this._likesQuantity = this._element.querySelector('.photo-grid__hearts-quantity');

    this._setEventListeners(this._element);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._handleLikesQuantity(this._likes);

    return this._element;
  };
};