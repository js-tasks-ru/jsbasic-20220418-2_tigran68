import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal = this.createModal();
    this.otherClose();
  }
  createModal() {
    let modal = createElement(`
      <div class="container">
        <div class="modal">
          <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title">
              </h3>
            </div>
            <div class="modal__body">
            </div>
          </div>
        </div>
      </div>
    `);
    return modal;
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.createModal);
  }

  setTitle(title) {
    let titleM = this.createModal.querySelector('.modal__title');
    titleM.textContent = '';
    titleM.append(title);
  }

  setBody(text) {
    let textBody = this.createModal.querySelector('.modal__body');
    textBody.textContent = '';
    textBody.append(text);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.body.removeChild(document.body.lastChild);
  }

  otherClose() {
    let closeBut = this.createModal.querySelector('.modal__close');
    closeBut.addEventListener('click', () => {
      document.body.classList.remove('is-modal-open');
      document.body.removeChild(document.body.lastChild);
    });
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        document.body.classList.remove('is-modal-open');
        document.body.removeChild(document.body.lastChild);
      }
    });

  }
}
