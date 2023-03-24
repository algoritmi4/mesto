export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  };

  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  };

  renderItem() {
    this._renderer(this._renderedItems);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    })
  };
}