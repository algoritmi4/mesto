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
  _showInputError(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };
  
  // Скрыть ошибку валидации
  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  };

// Провека валидации каждого отдельного инпута
  _checkInputValidity(inputElement, errorElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    };
  };

  // Выключение кнопки
  _disableButton(submitButtonElement) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(this._inactiveButtonClass);
  };

  // Включение кнопки
  _enableButton(submitButtonElement) {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(this._inactiveButtonClass);
  };

  // Смена состояния кнопки в зависимости от валидности формы
  _toggleButtonState(buttonState, submitButtonElement) {
    if(buttonState) {
      this._disableButton(submitButtonElement);
    } else {
      this._enableButton(submitButtonElement);
    }
  };

  // Ф-ия определяет, есть ли в форме хоть 1 невалидный инпут
  _hasInvalidInput(inputs) {
    return inputs.some(input => !input.validity.valid);
  };

  // Обработка инпутов
  _handleFormInput(inputElement, inputs) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
  
    const buttonState = this._hasInvalidInput(inputs);
  
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  
    this._checkInputValidity(inputElement, errorElement);
  
    this._toggleButtonState(buttonState, submitButtonElement);
  };

  // Ф-ия валидации форм во всех попапах
  enableValidation() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement, inputs);
      });
    });
  };
};