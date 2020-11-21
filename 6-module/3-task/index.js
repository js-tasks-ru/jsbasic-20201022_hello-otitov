import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  navPrev;
  navNext;
  inner;

  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addEventListener();
  }

  get template() {
    const slides = this.slides.map( elem => {
      return this.slideRender(elem);
    }).join('');
    
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slides}
        </div>
      </div>
    `;
  }

  slideRender(elem) {
    return `
      <div class="carousel__slide" data-id="${elem.id}">
        <img src="/assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${elem.price.toFixed(2)}</span>
          <div class="carousel__title">${elem.name}</div>
          <button type="button" class="carousel__button" data-id="${elem.id}">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  render() {
    this.elem = createElement(this.template);

    this.navPrev = this.elem.querySelector('.carousel__arrow_left');
    this.navNext = this.elem.querySelector('.carousel__arrow_right');
    this.inner = this.elem.querySelector('.carousel__inner');

    this.run();
  }

  addEventListener() {
    this.navPrev.addEventListener('click', event => {
      this.prev();
    });
    this.navNext.addEventListener('click', event => {
      this.next();
    });

    const addButtons = this.elem.querySelectorAll('.carousel__button');
    addButtons.forEach( button => {
      button.addEventListener('click', (event) => {
        const customEvent = new CustomEvent('product-add', {
          detail: button.dataset.id,
          bubbles: true
        });

        this.elem.dispatchEvent(customEvent);
      });
    });
  }

  getTotal() {
    return this.slides.length - 1;
  }

  get index() {
    this.navPrev.style.display = (!this._index || this._index <= 0) ? 'none' : '';
    this.navNext.style.display = this._index >= this.getTotal() ? 'none' : '';

    return this._index || 0;
  }

  set index(index) {
    this._index = index;
    return this._index;
  }

  getSlideWidth() {
    return this.inner.children[this.index].offsetWidth;
  }

  next() {
    this.index++;
    this.run();
  }

  prev() {
    this.index--;
    this.run();
  }

  run() {
    const transform = this.index * this.getSlideWidth();
    this.inner.style.transform = `translateX(-${transform}px)`;
  }

  remove() {
    this.elem.remove();
  }

  destroy() {
    this.remove();
    
    this.elem = null;
    this.navNext = null;
    this.navPrev = null;
    this.inner = null;
  }
}
