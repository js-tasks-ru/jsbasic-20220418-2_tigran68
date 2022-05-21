import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.slider(this.value);
    this.span();
    this.move();
  }
  slider() {
    let slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
          <span class="slider__step-active"></span>
        </div>
      </div>
    `);
    return slider;
  }
  span() {
    const progress = this.slider.querySelector('.slider__progress');
    progress.style.width = "0%";
    for (let i = 0; i < this.steps - 1; i++) {
      let sliderStep = this.slider.querySelector('.slider__steps');
      sliderStep.insertAdjacentHTML('beforeend', `
      <span></span>
      `);
    }
  }

  get elem() {
    return this.slider;
  }

  move() {
    this.slider.addEventListener('click', (event) => {
      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let leftRelative = left / this.slider.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;
      let sliderStep = this.slider.querySelector('.slider__steps');
      let sliderSpan = sliderStep.querySelectorAll('span');
      for (let i = 0; i < sliderSpan.length; i++) {
        sliderSpan[i].classList.remove('slider__step-active');
        if (this.value === i) {
          sliderSpan[i].classList.add('slider__step-active');
        }
      }
      const thumb = this.slider.querySelector('.slider__thumb');
      const progress = this.slider.querySelector('.slider__progress');
      const sliderValue = this.slider.querySelector('.slider__value');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.textContent = this.value;

      let customEvent = new CustomEvent('slider-change', { 
        detail: this.value,
        bubbles: true 
      });
      this.slider.dispatchEvent(customEvent);
    });
  }
}
