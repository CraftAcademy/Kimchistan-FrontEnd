import {Injectable} from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];

  addToCart(p_id: number, p_name: string, price: number, i_id: string, i_name: string) {
  if (this.cart.length != 0) {
    this.cart.forEach(function(obj) {
        if (p_id === obj.product_id) {
          obj.item_quantity = (obj.item_quantity || 0) + 1;
          console.log(obj.item_quantity);
        } else {
          console.log("hello");
          this.addItemToCart(p_id, p_name, price, i_id, i_name);
          console.log(this.cart);
        }
      }
    } else {
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
    this.cart.forEach(function(obj){
      total_price += obj.price;
    });
    return total_price;
  }

  addItemToCart(p_id: number, p_name: string, price: number, i_id: string, i_name: string) {
    this.cart.push({
      'product_id': p_id,
      'product_name': p_name,
      'price': Number(price),
      'ingredient_id': i_id,
      'ingredient_name': i_name,
      'item_quantity': 1
    });
  }
}
