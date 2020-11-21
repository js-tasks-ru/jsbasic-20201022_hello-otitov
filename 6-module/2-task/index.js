import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor({
    name = '',
    price = 0,
    category = '',
    image = false,
    id = false
  } = {}) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.id = id;

    this.render();
    this.addEventListener();
  }

  get template() {
    return `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
          <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  render() {
    this.elem = createElement(this.template);
  }

  addEventListener() {
    const addButton = this.elem.querySelector('.card__button');

    addButton.addEventListener('click', () => {
      const customEvent = new CustomEvent('product-add', {
        detail: this.id,
        bubbles: true
      });
      
      this.elem.dispatchEvent(customEvent);
    });
  }
}
