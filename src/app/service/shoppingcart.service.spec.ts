import { TestBed, inject } from '@angular/core/testing';

import { ShoppingCartService } from './shoppingcart.service';

describe('ShoppingCartService', () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ShoppingCartService]
  }));
  beforeEach(inject([ShoppingCartService], s => {
    service = s;
  }));

  it('addToCart: add items to cart', () => {
    expect(service.cart.length).toEqual(0);

    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');

    expect(service.cart.length).toEqual(1);
    expect(service.cart[0]).toEqual({
      product_id: 10,
      product_name: 'Bibimbap',
      price: 112,
      ingredient_id: 30,
      ingredient_name: 'Chicken',
      item_quantity: 1
    });

    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');

    expect(service.cart.length).toEqual(1);
    expect(service.cart[0]).toEqual({
      product_id: 10,
      product_name: 'Bibimbap',
      price: 112,
      ingredient_id: 30,
      ingredient_name: 'Chicken',
      item_quantity: 2
    });
  });

  it('showAll: returns all items in cart', () => {
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    let cart = service.showAll();
    expect(cart[0]).toEqual({
      product_id: 10,
      product_name: 'Bibimbap',
      price: 112,
      ingredient_id: 30,
      ingredient_name: 'Chicken',
      item_quantity: 2
    });
  });

  it('showTotal: returns total price', () => {
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    let total = service.showTotal();
    expect(total).toEqual(112);
  });

  it('showQuantity: shows how many items in cart', () => {
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    service.addToCart(11, 'Funchöza', 115, 31, 'Chicken');
    service.addToCart(16, 'Coca-Cola', 24);
    let quantity = service.showQuantity();

    expect(quantity).toEqual(4);
  });

  it('removeProduct: removes item from cart', () => {
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    service.addToCart(10, 'Bibimbap', 112, 30, 'Chicken');
    service.addToCart(11, 'Funchöza', 115, 31, 'Chicken');
    service.addToCart(16, 'Coca-Cola', 24);
    service.addToCart(16, 'Coca-Cola', 24);
    expect(service.cart.length).toEqual(3);
    service.removeProduct(10, 'Bibimbap', 112, 30, 'Chicken');
    service.removeProduct(11, 'Funchöza', 115, 31, 'Chicken');
    service.removeProduct(16, 'Coca-Cola', 24);

    expect(service.cart.length).toEqual(2);
  });

  it('clearCart: empties cart', () => {
    service.addToCart(11, 'Funchöza', 115, 31, 'Chicken');
    expect(service.cart.length).toEqual(1);
    service.clearCart();
    expect(service.cart.length).toEqual(0);
  });

  it('saveCart: saves cart, loadCart: retrieves cart', () => {
    service.addToCart(11, 'Funchöza', 115, 31, 'Chicken');
    service.addToCart(12, 'Bibimbap', 115, 31, 'Chicken');
    service.saveCart();
    expect(service.cart.length).toEqual(2);
    service.cart = [];
    expect(service.cart.length).toEqual(0);
    let today = new Date();
    service.loadCart(today.getDay());
    expect(service.cart.length).toEqual(2);
    today.setDate(today.getDate() - 1);
    service.cart = [];
    expect(service.loadCart(today.getDay())).toEqual ;
    expect(service.cart.length).toEqual(0);
  });
});
