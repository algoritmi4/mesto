export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._element.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_active');
  };

  _removeCardElement() {
    this._element.remove();
  };

  _openPicturePopup() {
    document.querySelector('#picture-popup').classList.add('popup_opened');

    document.addEventListener('keydown', (e) => {
      this._closePopupEscapePressed(e);
    });
  };

  _closePicturePopup() {
    document.querySelector('#picture-popup').classList.remove('popup_opened');

    document.removeEventListener('keydown', (e) => {
      this._closePopupEscapePressed(e);
    });
  }

  _closePopupEscapePressed(e) {
    if(e.key === 'Escape') {
      this._closePicturePopup();
    };
  };

  _handleOpenPicturePopup() {
    const picturePopupImage = document.querySelector('.popup__image');

    const cardElementImage = this._element.querySelector('.photo-grid__image');

    this._openPicturePopup();

    picturePopupImage.src = cardElementImage.src;
    picturePopupImage.alt = cardElementImage.alt;
    document.querySelector('.popup__caption').textContent = this._element.querySelector('.photo-grid__card-title').textContent;
  };

  _setEventListeners() {
    this._element.querySelector('.photo-grid__heart').addEventListener('click', () => {
      this._toggleHeartState();
    });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => {
      this._removeCardElement();
    });

    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._handleOpenPicturePopup();
    });
  };

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners(this._element);

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = this._name;
    this._element.querySelector('.photo-grid__card-title').textContent = this._name;

    return this._element;
  };
};