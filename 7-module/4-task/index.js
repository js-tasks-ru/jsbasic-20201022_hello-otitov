import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  subElements = {};

  constructor({ steps = 1, value = 0 } = {}) {
    this.steps = steps - 1;

    this.render();
    this.value = value;

    this.addEventListeners();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value) {
      this.subElements.steps.children[this._value].classList.remove('slider__step-active');
    }

    this._value = value;

    this.subElements.value.innerHTML = this._value;
    this.subElements.steps.children[this._value].classList.add('slider__step-active');
  }

  get template() {
    return `
      <div class="slider">
        <div class="slider__thumb" data-element="thumb">
          <span class="slider__value" data-element="value"></span>
        </div>
        <div class="slider__progress" data-element="progress"></div>
        <div class="slider__steps" data-element="steps">
          ${'<span></span>'.repeat(this.steps + 1)}
        </div>
      </div>
    `;
  }

  render() {
    this.elem = createElement(this.template);

    // "закешируем" доступ к запрашиваемым элементам, которые нужны при изменинии value
    this.elem.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  setEvent() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  setPosition(event, click = false) {
    let left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    if (left < 0) { left = 0; }
    if (left > 1) { left = 1; }

    if (click) {
      this.value = Math.round(this.steps * left);
      this.setEvent();

      left = (this.value / this.steps);
    }

    this.subElements.thumb.style.left = `${left * 100}%`;
    this.subElements.progress.style.width = `${left * 100}%`;
  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      this.setPosition(event, true);
    });

    let isDown = false;
    
    this.elem.onpointerdown = event => {
      event.preventDefault();
      isDown = true;

      this.elem.classList.add('slider_dragging');
    };

    this.elem.onpointerup = event => {
      event.preventDefault();
      isDown = false;

      this.elem.classList.remove('slider_dragging');

      this.setPosition(event, true);
    };

    this.elem.onpointermove = event => {
      if (!isDown) {
        return false;
      }

      this.setPosition(event);
    };

    this.elem.ondragstart = () => false;
  }

  destroy() {
    this.elem.remove();
  }
}
