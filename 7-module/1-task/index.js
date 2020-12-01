import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  activeClassNav = 'ribbon__arrow_visible';
  activeClassLink = 'ribbon__item_active';
  activeElementLink = null;

  constructor(categories = []) {
    this.categories = categories;

    this.render();
    this.addEventListener();
  }

  get template() {
    const categories = this.categories.map(item => {
      return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
    }).join('');

    return `
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">${categories}</nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  render() {
    this.elem = createElement(this.template);

    this.navPrev = this.elem.querySelector('.ribbon__arrow_left');
    this.navNext = this.elem.querySelector('.ribbon__arrow_right');
    this.inner = this.elem.querySelector('.ribbon__inner');

    this.run();
  }

  run(direction = 0) {
    return direction === 1 ?
      this.inner.scrollBy(350, 0) :
      this.inner.scrollBy(-350, 0);
  }

  updateNav() {
    this.navPrev.classList.remove(this.activeClassNav);
    this.navNext.classList.remove(this.activeClassNav);

    if (this.inner.scrollLeft > 0) {
      this.navPrev.classList.add(this.activeClassNav);
    }
    if (this.inner.scrollWidth - this.inner.scrollLeft - this.inner.clientWidth > 0) {
      this.navNext.classList.add(this.activeClassNav);
    }
  }

  addEventListener() {
    this.navPrev.addEventListener('click', () => {
      this.run(-1);
    });

    this.navNext.addEventListener('click', () => {
      this.run(1);
    });

    this.inner.addEventListener('scroll', () => {
      this.updateNav();
    });

    this.inner.addEventListener('click', event => {
      const elementLink = event.target.classList.contains('ribbon__item');
      
      if (elementLink) {
        if (this.activeElementLink) {
          this.activeElementLink.classList.remove(this.activeClassLink);
        }

        this.activeElementLink = event.target;
        event.target.classList.add(this.activeClassLink);

        const customEvent = new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);
      }
    });
  }
}
