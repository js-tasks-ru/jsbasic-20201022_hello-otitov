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

    const percents = (value / this.steps) * 100;

    this.subElements.thumb.style.left = `${percents}%`;
    this.subElements.progress.style.width = `${percents}%`;
    
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

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      const left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      this.value = Math.round(this.steps * left);

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    });
  }

  destroy() {
    this.elem.remove();
  }
}
