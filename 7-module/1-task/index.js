import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.menu = this.menu();
    this.buttons = this.buttons();
    this.choose = this.choose();
  }
  menu() {
    const menu = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      <nav class="ribbon__inner">
        ${this.categories.map((categori) => `
          <a href="#" class="ribbon__item" data-id=${categori.id}>${categori.name}</a>
        `).join('')}
      </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    return menu;
  }
  get elem() {
    return this.menu;
  }
  buttons() {
    const RigthArrow = this.menu.querySelector('.ribbon__arrow_right');
    const LeftArrow = this.menu.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.menu.querySelector('.ribbon__inner');
    let scrollLeft = 0;

    if (scrollLeft === 0) {
      LeftArrow.classList.remove('ribbon__arrow_visible');
    }

    RigthArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    LeftArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 0) {
        LeftArrow.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        Rigth.classList.remove('ribbon__arrow_visible');
      }
      if (scrollLeft < 1) {
        LeftArrow.classList.remove('ribbon__arrow_visible');
      }
    });
  }
  choose() {
    this.menu.addEventListener('click', (event) => {
      event.preventDefault();
      let customEvent = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true 
      });
      this.menu.dispatchEvent(customEvent);
    });
  }
}
