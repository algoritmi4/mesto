import FormValidator from './FormValidator.js';

import Card from './Card.js';

const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('#profile-popup');

const profilePopupForm = document.querySelector('#profile-popup-form');

const cardPopup = document.querySelector('#card-popup');

const cardPopupForm = document.querySelector('#card-popup-form');

const userName = document.querySelector('.profile__text_type_name');

const userActivity = document.querySelector('.profile__text_type_activity');

const userInputName = document.querySelector('#popup__input_type_name');

const userInputActivity = document.querySelector('#popup__input_type_activity');

const userInputTitle = document.querySelector('#card-popup__input_type_title');

const userInputPicture = document.querySelector('#card-popup__input_type_picture');

const photoGrid = document.querySelector('.photo-grid');

const formElements = document.querySelectorAll('.popup__form');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(initialCard => {
  const card = new Card(initialCard, '#new-card');

  const cardElement = card.generateCard();

  photoGrid.prepend(cardElement);
});

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEscapePressed);
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupEscapePressed);
};

// Закрытие попапа при нажатии клавиши "Escape"
const closePopupEscapePressed = (e) => {
  if(e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
  };
};

profilePopupForm.addEventListener('submit', () => {
  closePopup(profilePopup);
  userName.textContent = userInputName.value;
  userActivity.textContent = userInputActivity.value;
});

cardPopupForm.addEventListener('submit', (e) => {
  closePopup(cardPopup);

  const card = new Card({
    name: userInputTitle.value,
    link: userInputPicture.value
  }, '#new-card');

  const cardElement = card.generateCard();

  photoGrid.prepend(cardElement);

  e.target.reset();
});

editButton.addEventListener('click', () => {
  const profilePopupButton = profilePopup.querySelector('#popup__button');

  openPopup(profilePopup);
  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;

  if(profilePopupButton.disabled) {
    profilePopupButton.disabled = false;
    profilePopupButton.classList.remove('popup__button_disabled');
    
    profilePopup.querySelectorAll('.popup__error').forEach(profilePopupError => {
      profilePopupError.textContent = '';
    });
    profilePopup.querySelectorAll('.popup__input_type_error').forEach(profilePopupInput => {
      profilePopupInput.classList.remove('popup__input_type_error');
    });
  };
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);

  const cardPopupInputTitle = cardPopup.querySelector('#card-popup__input_type_title');

  if(cardPopupInputTitle.value === '') {
    const cardPopupButton = cardPopup.querySelector('#card-popup__button');

    cardPopupButton.disabled = true;
    cardPopupButton.classList.add('popup__button_disabled');
  };
});

// Закрытие попапов при клике по оверлею
popups.forEach(popup => {
  popup.addEventListener('click', e => {
    const closeButton = popup.querySelector('.popup__cross')

    if(e.target === e.currentTarget || e.target === closeButton) {
      closePopup(popup);
    };
  });
});

formElements.forEach(formElement => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled'
  }, formElement);

  formValidator.enableValidation();
});