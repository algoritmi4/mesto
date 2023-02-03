const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const photoGrid = document.querySelector('.photo-grid');

const popupCloseButtons = document.querySelectorAll('.popup__cross');

const profilePopup = document.querySelector('#profile-popup');

const profilePopupForm = document.querySelector('#profile-popup-form');

const cardPopup = document.querySelector('#card-popup');

const cardPopupForm = document.querySelector('#card-popup-form');

const picturePopup = document.querySelector('#picture-popup');

const picturePopupImage = document.querySelector('.popup__image');

const picturePopupCaption = document.querySelector('.popup__caption');

const userName = document.querySelector('.profile__text_type_name');

const userActivity = document.querySelector('.profile__text_type_activity');

const userInputName = document.querySelector('#popup__input_type_name');

const userInputActivity = document.querySelector('#popup__input_type_activity');

const userInputTitle = document.querySelector('#card-popup__input_type_title');

const userInputPicture = document.querySelector('#card-popup__input_type_picture');

const cardTemplate = document.querySelector('#new-card').content.querySelector('.photo-grid__card');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);

  const newCardLike = cardElement.querySelector('.photo-grid__heart');

  const newCardDelete = cardElement.querySelector('.photo-grid__trash');

  const cardElementImage = cardElement.querySelector('.photo-grid__image');

  const cardElementTitle = cardElement.querySelector('.photo-grid__card-title');

  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElementTitle.textContent = item.name;

  newCardLike.addEventListener('click', () => newCardLike.classList.toggle('photo-grid__heart_active'));

  newCardDelete.addEventListener('click', () => cardElement.remove());

  cardElementImage.addEventListener('click', () => {
    openPopup(picturePopup);
    picturePopupImage.src = cardElementImage.src;
    picturePopupCaption.textContent = cardElementTitle.textContent;
  });

  return cardElement;
}

function addCard(item) {
  const newCard = createCard(item);

  photoGrid.prepend(newCard);
}

initialCards.forEach(addCard);

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

profilePopupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopup(profilePopup);
  userName.textContent = userInputName.value;
  userActivity.textContent = userInputActivity.value;
});

cardPopupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopup(cardPopup);
  addCard({
    name: userInputTitle.value,
    link: userInputPicture.value
  });
  userInputTitle.value = '';
  userInputPicture.value = '';
})

editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});