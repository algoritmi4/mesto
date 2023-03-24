import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formInputs = this._popupForm.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._submitFormCallback(this._getInputValues());

      this.close();
    })
  };

  close() {
    super.close();

    this._popupForm.reset();
  };
}