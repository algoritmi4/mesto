export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  };

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      const closeButton = this._popup.querySelector('.popup__cross');
  
      if(e.target === e.currentTarget || e.target === closeButton) {
        this.close();
      };
    });
  };
}