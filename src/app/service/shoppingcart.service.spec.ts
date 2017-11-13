import { TestBed, inject } from '@angular/core/testing';

import { ShoppingCartService } from './shoppingcart.service';

describe('ShoppingCartService', () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ ShoppingCartService ]
  }));
  beforeEach(inject([ShoppingCartService], s => {
    service = s;
  }));

  it('addToCart: add items to cart', () => {
    expect(service.cart.length).toEqual(0);

    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');

    expect(service.cart.length).toEqual(1);
    expect(service.cart[0]).toEqual({product_id: 10, product_name: 'Bibimbap', price: 112, ingredient_id: 30, ingredient_name: 'Chicken'});
  });

});
