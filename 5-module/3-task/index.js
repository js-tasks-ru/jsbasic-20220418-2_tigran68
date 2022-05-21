function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let currentWidth = carouselInner.offsetWidth;
  let result = 0;
  let currentSlide = 1;
  carouselArrowLeft.style.display = 'none';
  
  carouselArrowRight.addEventListener('click', function() {
    if (currentSlide != 4) {
      carouselInner.style.transform = `translateX(-${result = currentWidth * currentSlide}px)`;
      currentSlide++;
      carouselArrowLeft.style.display = '';
    }
    if (currentSlide === 4) {
      carouselArrowRight.style.display = 'none';
    }
  });
  carouselArrowLeft.addEventListener('click', function() {
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
