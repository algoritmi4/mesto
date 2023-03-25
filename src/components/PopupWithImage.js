import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picturePopupImage = document.querySelector('#picture-popup__image');
    this._picturePopupCaption = document.querySelector('#picture-popup__caption');
  };

  open(name, link) {
    super.open();

    this._picturePopupImage.src = link;
    this._picturePopupImage.alt = name;
    this._picturePopupCaption.textContent = name;
  };
}