import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    const cartItem = this.cartItems.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.count++;
    }
    else {
      this.cartItems.push({
        product,
        count: 1
      });
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id == productId);
    if (!cartItem) {
      return;
    }

    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => {
      return sum += item.product.price * item.count;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    if (this.modal) {
      this.modal.elem.remove();
    }

    this.modal = new Modal();
    
    const modalBody = document.createElement(`div`);
    
    this.cartItems.forEach(({product, count}) => {
      modalBody.append(this.renderProduct(product, count));
    });

    modalBody.append(this.renderOrderForm());

    this.modal.setBody(modalBody);
    this.modal.setTitle('Your order');

    this.modal.elem.querySelector('.cart-form').addEventListener('submit', event => {
      event.preventDefault();
      this.onSubmit(event);
    });

    this.modal.elem.addEventListener('click', event => {
      // с подобной идеей не прошли тесты, даже с повешенным onsubmit => false у формы
      // const btnSubmit = event.target.closest('.cart-buttons__button');
      // if (btnSubmit) {
      //   this.onSubmit(event);
      //   return;
      // }

      const btnCountUpdate = event.target.closest('.cart-counter__button');
      
      if (!btnCountUpdate) {
        return;
      }

      const productId = event.target.closest('[data-product-id]').dataset.productId;

      this.updateProductCount(
        productId,
        btnCountUpdate.classList.contains('cart-counter__button_plus') ? 1 : -1
      );
    });

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!this.modal) { return; }

    if (!this.cartItems.length) {
      this.modal.close();
      return;
    }

    if (cartItem.count > 0) {
      this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count;
      this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
    }
    else {
      this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
    }

    this.modal.elem.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
  }

  async onSubmit(event) {
    const btnSubmit = event.target.querySelector('.cart-buttons__button');
    btnSubmit.classList.add('is-loading');

    const form = this.modal.elem.querySelector('.cart-form');
    const formData = new FormData(form);

    try {
      await fetch('https://httpbin.org/post', { method: 'POST', body: formData });
      
      this.modal.setTitle('Success!');
      this.modal.elem.querySelector('.modal__body').innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `;
      
      this.cartItems = [];
      this.cartIcon.update(this);
    } catch (e) {
      this.modal.setTitle('Error!');
      btnSubmit.classList.remove('is-loading');
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

