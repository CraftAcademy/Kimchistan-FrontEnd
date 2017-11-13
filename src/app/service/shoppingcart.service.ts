import {Injectable} from '@angular/core';

@Injectable()

export class ShoppingCartService {
  cart: any = [];

  getCart() {
    return Promise.resolve(this.cart);
  }

  addToCart(p_id: string, p_name: string, price: number, i_id?: string, i_name?: string) {

    this.cart.push({
      'product id': p_id,
      'product name': p_name,
      'price': Number(price),
      'ingredient id': i_id,
      'ingredient name': i_name
    });
    console.log(this.cart);
  }

  removeCart(searchId: string) {
    let tmp = this.cart.map(x => x.id).indexOf(searchId);

    if (tmp > 1) {
      this.cart.splice(tmp, 1);
    }
  }
}
