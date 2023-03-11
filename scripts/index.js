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

const formValidators = {};

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

const handleCardClick = (name, link) => {
  const picturePopupImage = document.querySelector('#picture-popup__image');

  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  document.querySelector('#picture-popup__caption').textContent = name;

  openPopup(document.querySelector('#picture-popup'));
};

const createCard = (initialCard) => {
  const card = new Card(initialCard, '#new-card', handleCardClick);

  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach(initialCard => {
  const newCard = createCard(initialCard);

  photoGrid.prepend(newCard);
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

  const newCard = createCard({
    name: userInputTitle.value,
    link: userInputPicture.value
  });

  photoGrid.prepend(newCard);

  e.target.reset();
});

editButton.addEventListener('click', () => {
  const profilePopupButton = profilePopup.querySelector('#popup__button');

  openPopup(profilePopup);
  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;

  if(profilePopupButton.disabled) {
    formValidators['profile-popup__form'].resetValidation(true);
  };
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);

  const cardPopupInputTitle = cardPopup.querySelector('#card-popup__input_type_title');

  const cardPopupInputPicture = cardPopup.querySelector('#card-popup__input_type_picture');

  const cardPopupButton = cardPopup.querySelector('.popup__button');

  if((cardPopupInputTitle.value === '' && cardPopupInputPicture.value === '') || cardPopupButton.disabled) {
    formValidators['card-popup__form'].resetValidation(false);
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

const enableValidation = (config) => {
  const formList = document.querySelectorAll('.popup__form'); 

  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

enableValidation({
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});