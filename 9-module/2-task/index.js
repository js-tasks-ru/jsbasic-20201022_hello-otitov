import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.subElements = {
      'ribbonMenu': document.querySelector('[data-ribbon-holder]'),
      'carousel': document.querySelector('[data-carousel-holder]'),
      'stepSlider': document.querySelector('[data-slider-holder]'),
      'cartIcon': document.querySelector('[data-cart-icon-holder]'),
      'products': document.querySelector('[data-products-grid-holder]')
    };
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.subElements.carousel.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    this.subElements.ribbonMenu.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.subElements.stepSlider.append(this.stepSlider.elem);

    this.cartIcon  = new CartIcon();
    this.subElements.cartIcon.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    const products = await fetch('products.json').then(response => response.json());
    
    this.productsGrid = new ProductsGrid(products);
    this.subElements.products.innerHTML = '';
    this.subElements.products.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListener();
  }

  addEventListener() {
    document.body.addEventListener('product-add', event => {
      const product = this.productsGrid.products.find( item => item.id === event.detail);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => { 
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.querySelector('input#nuts-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.querySelector('input#vegeterian-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}
