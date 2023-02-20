const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('#profile-popup');

const profilePopupForm = document.querySelector('#profile-popup-form');

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

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// Создание карточки и навешивание на нее всех слушателей
const createCard = (item) => {
  const cardTemplate = document.querySelector('#new-card').content.querySelector('.photo-grid__card');

  const cardElement = cardTemplate.cloneNode(true);

  const newCardLike = cardElement.querySelector('.photo-grid__heart');

  const newCardDelete = cardElement.querySelector('.photo-grid__trash');

  const cardElementImage = cardElement.querySelector('.photo-grid__image');

  const cardElementTitle = cardElement.querySelector('.photo-grid__card-title');

  const picturePopup = document.querySelector('#picture-popup');

  const picturePopupImage = document.querySelector('.popup__image');
  
  const picturePopupCaption = document.querySelector('.popup__caption');

  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElementTitle.textContent = item.name;

  newCardLike.addEventListener('click', () => newCardLike.classList.toggle('photo-grid__heart_active'));

  newCardDelete.addEventListener('click', () => cardElement.remove());

  cardElementImage.addEventListener('click', () => {
    openPopup(picturePopup);
    picturePopupImage.src = cardElementImage.src;
    picturePopupImage.alt = cardElementImage.alt;
    picturePopupCaption.textContent = cardElementTitle.textContent;

    setEscapeEventListener();
  });

  return cardElement;
};

// Добавление карточки на страницу
const addCard = (item) => {
  const photoGrid = document.querySelector('.photo-grid');

  const newCard = createCard(item);

  photoGrid.prepend(newCard);
};

// Закрытие попапа при нажатии клавиши "Escape"
const closePopupEscapePressed = (e) => {
  const popupOpened = document.querySelector('.popup_opened');
  
  if(e.key === 'Escape') {
    closePopup(popupOpened);

    document.removeEventListener('keydown', closePopupEscapePressed);
  };
};

// Добавление слушателя вынесено в отдельную ф-ию
// т.к. требуется в нескольких местах
const setEscapeEventListener = () => {
  document.addEventListener('keydown', closePopupEscapePressed);
};

const setEventListeners = () => {
  const cardPopup = document.querySelector('#card-popup');

  const cardPopupForm = document.querySelector('#card-popup-form');
  
  const userName = document.querySelector('.profile__text_type_name');
  
  const userActivity = document.querySelector('.profile__text_type_activity');
  
  const userInputName = document.querySelector('#popup__input_type_name');
  
  const userInputActivity = document.querySelector('#popup__input_type_activity');
  
  const userInputTitle = document.querySelector('#card-popup__input_type_title');
  
  const userInputPicture = document.querySelector('#card-popup__input_type_picture');

  profilePopupForm.addEventListener('submit', () => {
    closePopup(profilePopup);
    userName.textContent = userInputName.value;
    userActivity.textContent = userInputActivity.value;
  });
  
  cardPopupForm.addEventListener('submit', (e) => {
    closePopup(cardPopup);

    addCard({
      name: userInputTitle.value,
      link: userInputPicture.value
    });

    e.target.reset();
  });
  
  editButton.addEventListener('click', () => {
    openPopup(profilePopup);
    userInputName.value = userName.textContent;
    userInputActivity.value = userActivity.textContent;

    setEscapeEventListener();
  });
  
  addCardButton.addEventListener('click', () => {
    openPopup(cardPopup);

    setEscapeEventListener();
  });
};

initialCards.forEach(addCard);

popups.forEach(popup => {
  popup.addEventListener('click', e => {
    const closeButton = popup.querySelector('.popup__cross')

    if(e.target === e.currentTarget || e.target === closeButton) {
      closePopup(popup);

      document.removeEventListener('keydown', closePopupEscapePressed);
    };
  });
});

setEventListeners();