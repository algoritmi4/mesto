import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormCallback }) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
  };

  _getInputValues() {
    const inputValues = {};

    this._formInputs = this._popupForm.querySelectorAll('.popup__input');

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    console.log(this._formInputs);

    return inputValues;
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this.close();

      this._submitFormCallback(this._getInputValues());

      console.log(this._getInputValues());
    })
  };

  close() {
    super.close();

    this._popupForm.reset();
  };
}