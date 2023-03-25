export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(this._containerSelector);
  };

  addItem(element) {
    this._containerElement.prepend(element);
  };

  renderItem(cardItems) {
    this._renderer(cardItems);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    })
  };
}