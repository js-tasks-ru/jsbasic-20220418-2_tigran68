import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.slider();
    this.span();
    this.move();
  }

  slider() {
    let slider = createElement(`
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress">
    </div>
    <div class="slider__steps">
      <span class='slider__step-active'></span>
    </div>
  </div>
    `);
    return slider;
  }

  get elem() {
    return this.slider;
  }

  span() {
    const progress = this.slider.querySelector('.slider__progress');
    progress.style.width = "0%";
    for (let i = 0; i < this.steps - 1 ; i++) {
      const sliderSteps = this.slider.querySelector('.slider__steps');
      sliderSteps.insertAdjacentHTML('beforeend', `
      <span></span>
      `);
    }
  }
  
  move() {
    this.slider.addEventListener('click', (event) => {
      let thumb = this.slider.querySelector('.slider__thumb');
      const sliderStep = this.slider.querySelector('.slider__steps');
      let sliderSpan = sliderStep.querySelectorAll('span');
      const progress = this.slider.querySelector('.slider__progress');
      const sliderValue = this.slider.querySelector('.slider__value');

      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let leftRelative = left / this.slider.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;
      for (let i = 0; i < sliderSpan.length; i++) {
        sliderSpan[i].classList.remove('slider__step-active');
        if (this.value === i) {
          sliderSpan[i].classList.add('slider__step-active');
        }
      }
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.textContent = this.value;

      let customEvent = new CustomEvent('slider-change', { 
        detail: this.value,
        bubbles: true 
      });
      this.slider.dispatchEvent(customEvent);
    });
    const thumb = this.slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', () => {
      this.pointerDown();
    });
  }


  pointerDown() {
    const pointerMove = (event) => {
      this.slider.classList.add('slider_dragging');

      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let leftRelative = left / this.slider.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }    
      if (leftRelative > 1) {
        leftRelative = 1;
      } 

      let valuePercents = leftRelative * 100;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      const thumb = this.slider.querySelector('.slider__thumb');
      const sliderStep = this.slider.querySelector('.slider__steps');
      let sliderSpan = sliderStep.querySelectorAll('span');
      const progress = this.slider.querySelector('.slider__progress');
      const sliderValue = this.slider.querySelector('.slider__value');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.textContent = this.value;

      for (let i = 0; i < sliderSpan.length; i++) {
        sliderSpan[i].classList.remove('slider__step-active');
        if (this.value === i) {
          sliderSpan[i].classList.add('slider__step-active');
        }
      }
    };

    document.addEventListener('pointermove', pointerMove);

    document.addEventListener('pointerup', () => {
      let customEvent = new CustomEvent('slider-change', { 
        detail: this.value,
        bubbles: true 
      });
      this.slider.dispatchEvent(customEvent);
      
      this.slider.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', pointerMove);

    });
  }
   
}
