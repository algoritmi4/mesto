import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formInputs = this._popupForm.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__button');
  };

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  };

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._button.textContent = 'Сохранение...';

      this._submitFormCallback(this._getInputValues());

      this.close();
    })
  };

  close() {
    super.close();

    this._popupForm.reset();
  };
}