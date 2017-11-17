import { Injectable } from '@angular/core';
import { DatastoreService } from './datastore.service';
import { Order } from '../models/order';
import { ShoppingCartService } from './shoppingcart.service';


@Injectable()
export class OrderService {

  constructor(
    private datastore: DatastoreService,
    private cartSVC: ShoppingCartService
  ) {}

  create(cart: any, email: string) {
    const order = this.datastore.createRecord(Order, {
      email: email,
      cart: cart,
    });

    order.save().subscribe();
  }
}
