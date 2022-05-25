export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }


  addProduct(product) {
    let cartItem = {
      product:{},
      count:0,
    };
    if (product !== null && product !== undefined) {
      let cart = this.cartItems.find((cart) => cart.product.id === product.id);
      if (cart) {
        this.cartItems.map((item) => {
          if (item.product.id === cart.product.id) {
            item.count = item.count + 1;
            cartItem = item;
          }
        });
      } else {
        cartItem = {
          product: product,
          count: 1
        };

        this.cartItems.push(cartItem);
      }
    } else {
      return;
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((item => {
      if (item.product.id === productId) {
        item.count = item.count + amount;
        this.cartItem = item;
        if (item.count === 0) {
          this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
        }
      }
    }));

    this.onProductUpdate(this.cartItem);
  }
  
  isEmpty() {
    return this.cartItems.length === 0;
  }


  getTotalCount() {
    let count = 0;
    this.cartItems.map(item => count = count + item.count);
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.map(item => price = price + item.product.price * item.count);
    return price;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
