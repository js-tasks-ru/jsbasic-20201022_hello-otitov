import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  static activeModal;
  classActiveBody = 'is-modal-open';

  constructor() {
    if (Modal.activeModal) {
      Modal.activeModal.remove();
    }

    this.render();
    this.addEventListener();
  }

  get template() {
    return `
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `;
  }

  setTitle(title) {
    this.elemTitle.innerHTML = title;
  }

  setBody(body) {
    this.elemBody.append(body);
  }

  render() {
    this.elem = createElement(this.template);
    this.elemClose = this.elem.querySelector('.modal__close');
    this.elemTitle = this.elem.querySelector('.modal__title');
    this.elemBody = this.elem.querySelector('.modal__body');

    Modal.activeModal = this.elem;
  }

  addEventListener() {
    this.elemClose.addEventListener('click', () => {
      return this.close();
    });

    document.addEventListener('keydown', this.keyDown);
  }

  keyDown = (event) => {
    return event.code === 'Escape' ? this.close() : false;
  }

  open() {
    document.body.classList.add(this.classActiveBody);
    document.body.append(this.elem);
  }

  close() {
    this.elem.remove();
    document.removeEventListener('keydown', this.keyDown);
    document.body.classList.remove(this.classActiveBody);
  }
}
