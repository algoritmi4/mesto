import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };

  open(name, link) {
    super.open();

    const picturePopupImage = document.querySelector('#picture-popup__image');

    picturePopupImage.src = link;
    picturePopupImage.alt = name;
    document.querySelector('#picture-popup__caption').textContent = name;
  };
}