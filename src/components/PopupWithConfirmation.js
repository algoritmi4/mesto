import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSelector, handleCardDeletion) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._element = this._popup.querySelector(this._formSelector);
    this._handleCardDeletion = handleCardDeletion;
  }

  setSubmitAction(action) {
    this._handleCardDeletion = action;
  }

  setEventListeners() {
    this._element.addEventListener('submit', () => {
      this._handleCardDeletion();

      this.close();
    });

    super.setEventListeners();
  }
}