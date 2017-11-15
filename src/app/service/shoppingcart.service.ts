import {Injectable} from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];

  addToCart(p_id: string, p_name: string, price: number, i_id: string, i_name: string) {
    let itemFound = false;
    let self = this;
    this.cart.forEach(function (obj) {
      if (self.isSameProduct(p_id, i_id, obj)) {
        obj.item_quantity += 1;
        itemFound = true;
      }
    });
    if (!itemFound) {
      this.cart.push({
        'product_id': p_id,
        'product_name': p_name,
        'price': Number(price),
        'ingredient_id': i_id,
        'ingredient_name': i_name,
        'item_quantity': 1
      });
      this.saveCart();
    }
  }

  showAll() {
    return this.cart;
  }

  showTotal() {
    let total_price = 0;
    this.cart.forEach(function (obj) {
      total_price += obj.price * obj.item_quantity;
    });
    return total_price;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  removeProduct(p_id: string, p_name: string, price: number, i_id: string, i_name: string) {
    let itemFound = false;
    let self = this;
    this.cart.forEach(function (obj) {
      if (self.isSameProduct(p_id, i_id, obj) && obj.item_quantity > 1) {
        obj.item_quantity -= 1;
        itemFound = true;
      }
    });
    if (!itemFound) {
      this.cart = this.cart.filter(item => !this.isSameProduct(p_id, i_id, item));

      this.saveCart();
    }
  }

  isSameProduct(p_id, i_id, item) {
    return item.product_id === p_id && (item.ingredient_id === null || i_id === item.ingredient_id);
  }
}
