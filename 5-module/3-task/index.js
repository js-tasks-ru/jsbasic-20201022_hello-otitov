function initCarousel() {
  const carousel = {
    navNext: document.querySelector('.carousel__arrow_right'),
    navPrev: document.querySelector('.carousel__arrow_left'),
    el: document.querySelector('.carousel__inner'),
    getTotal() {
      return this.el.children.length-1;
    },
    get index() {
      // тут так же можно добавить логику на "круговое" переключение
      this.navPrev.style.display = (!this._index || this._index <= 0) ? 'none' : '';
      this.navNext.style.display = this._index >= this.getTotal() ? 'none' : '';

      return this._index || 0;
    },
    set index(index) {
      this._index = index;
      return this._index;
    },
    getSlideWidth() {
      return this.el.children[this.index].offsetWidth;
    },
    next() {
      this.index++;
      this.run();
    },
    prev() {
      this.index--;
      this.run();
    },
    run() {
      const transform = this.index*this.getSlideWidth();
      this.el.style.transform = `translateX(-${transform}px)`;
    }
  };

  carousel.navPrev.addEventListener('click', event => {
    carousel.prev();
  });
  carousel.navNext.addEventListener('click', event => {
    carousel.next();
  });
  carousel.run();
}
