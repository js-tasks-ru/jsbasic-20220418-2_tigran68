
import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.card = this.card();
    this.list = this.cardsList(this.products);
  }

  card() {
    let card = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"> 
      </div>
    </div>
`);
    return card;
  }

  cardsList(products) {
    this.gridInner = this.card.querySelector('.products-grid__inner');
    products.map((product) => {
      const card = new ProductCard(product);
      this.gridInner.append(card.elem);
    });

    return this.card;
  }

  updateFilter(filters) {
    this.filProduct = this.products;
    const filter = this.filters;

    Object.keys(filters)
    .map(key => { 
      filter[key] = filters[key];
    });

    if (filter.noNuts) {
      this.filProduct = this.filProduct.filter((product) => product.nuts === false || product.nuts === undefined);
    }

    if (filter.vegeterianOnly) {
      this.filProduct = this.filProduct.filter((product) => product.vegeterian === true);
    }

    if (filter.maxSpiciness) {
      this.filProduct = this.filProduct.filter((product) => product.spiciness <= filter.maxSpiciness);
    }

    if (filter.category) {
      this.filProduct = this.filProduct.filter((product) => product.category === filter.category);
    }

    this.gridInner.innerHTML = '';
    this.cardsList(this.filProduct);
  }

  get elem() {
    return this.list;
  }
}


