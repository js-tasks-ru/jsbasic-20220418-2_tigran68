import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slide = this.slide();
    this.buttons = this.buttons();
    this.productAdd();
  }

  slide() {
    const slide = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides.map((slide) => `
        <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `).join('')}
      </div>
    </div>
    `);  
    return slide;
  }
  get elem() {
    return this.slide;
  }
  buttons() {
    let carouselInner = this.slide.querySelector('.carousel__inner');
    let carouselArrowRight = this.slide.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.slide.querySelector('.carousel__arrow_left');
    let carouselSlide = this.slide.querySelectorAll('.carousel__slide');
    let result = 0;
    let currentSlide = 1;
    carouselArrowLeft.style.display = 'none';
    
    carouselArrowRight.addEventListener('click', function() {
      let currentWidth = carouselInner.offsetWidth;

      if (currentSlide != carouselSlide.length) {
        carouselInner.style.transform = `translateX(-${result = result + currentWidth}px)`;
        currentSlide++;
        carouselArrowLeft.style.display = '';
      }
      if (currentSlide === carouselSlide.length) {
        carouselArrowRight.style.display = 'none';
      }
    });
    carouselArrowLeft.addEventListener('click', function() {
      let currentWidth = carouselInner.offsetWidth;
      if (currentSlide != 1) {
        carouselInner.style.transform = `translateX(-${result = result - currentWidth}px)`;
        currentSlide--;
        carouselArrowRight.style.display = '';
      }
      if (currentSlide === 1) {
        carouselArrowLeft.style.display = 'none';
      }
    });
  }
  productAdd() {
    this.slide.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        let curslide = event.target.closest('.carousel__slide');
        let customEvent = new CustomEvent('product-add', {
          detail: curslide.dataset.id,
          bubbles: true,
        });
        this.slide.dispatchEvent(customEvent);
      }
    });
  }
}
