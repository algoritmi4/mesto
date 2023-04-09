export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(this._containerSelector);
  };

  addItem(element) {
    this._containerElement.prepend(element);
  };

  renderItem(cardItems, userId) {
    this._renderer(cardItems, userId);
  }

  renderItems(items, userId) {
    items.forEach(item => {
      this._renderer(item, userId);
    })
  };
}