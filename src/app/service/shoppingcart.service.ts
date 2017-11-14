import {Injectable} from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];

  addToCart(p_id: string, p_name: string, price: number, i_id: string, i_name: string) {
    let itemFound = false;
    this.cart.forEach(function (obj) {
      if (p_id === obj.product_id) {
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
      console.log(this.cart);
    }
  }

  showAll() {
    return this.cart;
  }

  showTotal() {
    let total_price = 0;
    this.cart.forEach(function (obj) {
      total_price += obj.price;
    });
    return total_price;
  }
}
