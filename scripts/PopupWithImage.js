import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  };

  open() {
    super.open();

    const picturePopupImage = document.querySelector('#picture-popup__image');

    picturePopupImage.src = this._link;
    picturePopupImage.alt = this._name;
    document.querySelector('#picture-popup__caption').textContent = this._name;
  };
}