import FormValidator from './FormValidator.js';

import Card from './Card.js';

import Section from './Section.js';

import PopupWithImage from './PopupWithImage.js';

import PopupWithForm from './PopupWithForm.js';

import UserInfo from './UserInfo.js';

const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('#profile-popup');

const profilePopupForm = document.querySelector('#profile-popup-form');

const profilePopupButton = profilePopup.querySelector('#popup__button');

const cardPopup = document.querySelector('#card-popup');

const cardPopupForm = document.querySelector('#card-popup-form');

const cardPopupInputTitle = cardPopup.querySelector('#card-popup__input_type_title');

const cardPopupInputPicture = cardPopup.querySelector('#card-popup__input_type_picture');

const cardPopupButton = cardPopup.querySelector('.popup__button');

const picturePopup = document.querySelector('#picture-popup');

const picturePopupImage = document.querySelector('#picture-popup__image');

const picturePopupCaption = document.querySelector('#picture-popup__caption');

const userName = document.querySelector('.profile__text_type_name');

const userActivity = document.querySelector('.profile__text_type_activity');

const userInputName = document.querySelector('#popup__input_type_name');

const userInputActivity = document.querySelector('#popup__input_type_activity');

const userInputTitle = document.querySelector('#card-popup__input_type_title');

const userInputPicture = document.querySelector('#card-popup__input_type_picture');

const photoGrid = document.querySelector('.photo-grid');

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
  const popup = new PopupWithImage('#picture-popup', name, link);

  popup.open();
};

const newCard = new Section({
  items: initialCards,
  renderer: (initialCard) => {
    const card = new Card(initialCard, '#new-card', handleCardClick);
  
    const cardElement = card.generateCard();
  
    newCard.addItem(cardElement);
  }
}, '.photo-grid');

newCard.renderItems();


cardPopupForm.addEventListener('submit', (e) => {
  closePopup(cardPopup);

  const newCard = new Section({
    items: [{
      name: userInputTitle.value,
      link: userInputPicture.value
    }],
    renderer: (initialCard) => {
      const card = new Card(initialCard, '#new-card', handleCardClick);
    
      const cardElement = card.generateCard();
    
      newCard.addItem(cardElement);
    }
  }, '.photo-grid');
  
  newCard.renderItems();

  e.target.reset();
});

const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_activity');

const submitFormCallbackProfile = ({ name, activity }) => {
  userName.textContent = name;
  userActivity.textContent = activity;
}

editButton.addEventListener('click', () => {
  const popupProfile = new PopupWithForm('#profile-popup', { submitFormCallback: submitFormCallbackProfile });

  popupProfile.open();
  popupProfile.setEventListeners();

  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;

  if(profilePopupButton.disabled) {
    formValidators['profile-popup__form'].resetValidation(true);
  };
});

const submitFormCallbackCard = () => {}

addCardButton.addEventListener('click', () => {
  const popupCard = new PopupWithForm('#card-popup', { submitFormCallback: submitFormCallbackCard });

  popupCard.open();

  if((cardPopupInputTitle.value === '' && cardPopupInputPicture.value === '') || cardPopupButton.disabled) {
    formValidators['card-popup__form'].resetValidation(false);
  };
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