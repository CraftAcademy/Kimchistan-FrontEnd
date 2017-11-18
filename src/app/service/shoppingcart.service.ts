import { Injectable } from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];
  today = new Date

  addToCart(product_id: string, product_name: string, price: number, ingredient_id: string, ingredient_name: string) {
    let itemFound = false;
    let self = this;
    this.cart.forEach(function (obj) {
      if (self.isSameProduct(product_id, ingredient_id, obj)) {
        obj.item_quantity += 1;
        itemFound = true;
      }
    });
    if (!itemFound) {
      this.cart.push({
        'product_id': product_id,
        'product_name': product_name,
        'price': Number(price),
        'ingredient_id': ingredient_id,
        'ingredient_name': ingredient_name,
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

  showQuantity() {
    let quantity = 0;
    this.cart.forEach(function (obj) {
      quantity += obj.item_quantity;
    });
    return quantity;
  };

  saveCart() {
    let day_added = this.today.getDay().toString();
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('date', day_added);
  }

  loadCart(today) {
    let compare_date = localStorage.getItem('date');
    if (compare_date == today) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else if (compare_date != today) {
      localStorage.removeItem('cart');
      localStorage.removeItem('date');
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  removeProduct(product_id: string, product_name: string, price: number, ingredient_id: string, ingredient_name: string) {
    let itemFound = false;
    let self = this;
    this.cart.forEach(function (obj) {
      if (self.isSameProduct(product_id, ingredient_id, obj) && obj.item_quantity > 1) {
        obj.item_quantity -= 1;
        itemFound = true;
      }
    });
    if (!itemFound) {
      this.cart = this.cart.filter(item => !this.isSameProduct(product_id, ingredient_id, item));

      this.saveCart();
    }
  }

  isSameProduct(product_id, ingredient_id, item) {
    return item.product_id === product_id && (item.ingredient_id === null || ingredient_id === item.ingredient_id);
  }
}
