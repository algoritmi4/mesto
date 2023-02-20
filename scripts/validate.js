// Отмена дефолтного поведения браузера
// Вынесена в отдельную ф-ию, т.к. нужна в нескольких местах
const handleFormSubmit = (e) => {
  e.preventDefault();
};

// Показать ошибку валидации
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
};

// Скрыть ошибку валидации
const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};

// Провека валидации каждого отдельного инпута
const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if(!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass);
  };
};

// Ф-ия определяет, есть ли в форме хоть 1 невалидный инпут
const hasInvalidInput = (inputs) => {
  return inputs.some(input => !input.validity.valid);
};

// Смена состояния кнопки в зависимости от валидности формы
const toggleButtonState = (buttonState, submitButtonElement, inactiveButtonClass) => {
  if(buttonState) {
    disableButton(submitButtonElement, inactiveButtonClass);
  } else {
    enableButton(submitButtonElement, inactiveButtonClass);
  }
};

// Выключение кнопки
const disableButton = (submitButtonElement, inactiveButtonClass) => {
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add(inactiveButtonClass);
};

// Включение кнопки
const enableButton = (submitButtonElement, inactiveButtonClass) => {
  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove(inactiveButtonClass);
};

// Обработка инпутов
const handleFormInput = (inputElement, formElement, inputErrorClass, inputs, submitButtonSelector, inactiveButtonClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  const buttonState = hasInvalidInput(inputs);

  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  checkInputValidity(inputElement, errorElement, inputErrorClass);

  toggleButtonState(buttonState, submitButtonElement, inactiveButtonClass);
};

// Ф-ия валидации форм во всех попапах
const enableValidation = ({formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass}) => {
  const formElements = document.querySelectorAll(formSelector);

  formElements.forEach(formElement => {
    formElement.addEventListener('submit', handleFormSubmit);

    const inputs = Array.from(formElement.querySelectorAll(inputSelector));

    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        handleFormInput(inputElement, formElement, inputErrorClass, inputs, submitButtonSelector, inactiveButtonClass);
      });
    });
  });
};

// Обьявление ф-ии с переменными
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});