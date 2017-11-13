import {Injectable} from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];

  addToCart(p_id: string, p_name: string, price: number, i_id: string, i_name: string) {

    this.cart.push({
      'product_id': p_id,
      'product_name': p_name,
      'price': Number(price),
      'ingredient_id': i_id,
      'ingredient_name': i_name
    });
    console.log(this.cart);
  };
}
