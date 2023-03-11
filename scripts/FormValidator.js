export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._formElement = formElement;
  };

  // Отмена дефолтного поведения браузера
  // Вынесена в отдельную ф-ию, т.к. нужна в нескольких местах
  _handleFormSubmit(e) {
    e.preventDefault();
  };

  // Показать ошибку валидации
  _showInputError(inputElement) {
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };
  
  // Скрыть ошибку валидации
  _hideInputError(inputElement) {
    this._errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  };

// Провека валидации каждого отдельного инпута
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };

  // Выключение кнопки
  _disableButton() {
    this._submitButtonElement.disabled = true;
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
  };

  // Включение кнопки
  _enableButton() {
    this._submitButtonElement.disabled = false;
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
  };

  // Смена состояния кнопки в зависимости от валидности формы
  _toggleButtonState() {
    if(this._buttonState) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  // Ф-ия определяет, есть ли в форме хоть 1 невалидный инпут
  _hasInvalidInput(inputs) {
    return inputs.some(input => !input.validity.valid);
  };

  // Создание элемента с ошибкой, он нужен в двух местах.
  // Методы resetValidation и enableValidation не зависят друг от друга
  // и в каждом требуется создание элемента с ошибкой для собственного inputElement
  _createErrorElement(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
  };

  // Метод для установки всех обработчиков
  _installInputHandler() {
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
      });
    });
  };

  // Обработка инпутов
  _handleFormInput(inputElement) {
    this._createErrorElement(inputElement);
  
    this._buttonState = this._hasInvalidInput(this._inputs);
  
    this._checkInputValidity(inputElement);
  
    this._toggleButtonState();
  };

  // Отмена валидации при открытии попапов с формами
  resetValidation(trust) {
    if(trust) {
      this._enableButton();

      this._inputs.forEach(inputElement => {
        this._createErrorElement(inputElement);

        this._hideInputError(inputElement);
      });
    } else {
      this._disableButton();

      this._inputs.forEach(inputElement => {
        this._createErrorElement(inputElement);

        this._hideInputError(inputElement);
      });
    };
  };

  // Ф-ия валидации форм во всех попапах
  enableValidation() {
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._formElement.addEventListener('submit', this._handleFormSubmit);
  
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._installInputHandler();
  };
};