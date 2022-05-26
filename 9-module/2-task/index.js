import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.cartIcon = new CartIcon();
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    let productsGrid = [];
    let products = [];
    let json = await fetch('products.json');
    products = await json.json();
    productsGrid = new ProductsGrid(products);

    let carouselHolder = document.body.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);
    let ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);
    let sliderHolder = document.body.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);
    let cartIconHolder = document.body.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
    let productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
    productsGridHolder.removeChild(productsGridHolder.children[0]);
    productsGridHolder.append(productsGrid.elem);

    document.body.addEventListener('product-add', (event)=> {
      products.map((product)=> {
        if (product.id === event.detail) {
          this.cart.addProduct(product);
        }
      });
    });

    document.body.querySelector('.slider').addEventListener('slider-change', (event)=>{
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.querySelector('.ribbon').addEventListener('ribbon-select', (event)=>{
      productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.querySelector('#nuts-checkbox').addEventListener('change', ()=> {
      productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked
      }); 
    });

    document.querySelector('#vegeterian-checkbox').addEventListener('change', ()=> {
      productsGrid.updateFilter({
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
      }); 
    });

  }
}