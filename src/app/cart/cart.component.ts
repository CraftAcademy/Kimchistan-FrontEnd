import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShoppingCartService } from '../service/shoppingcart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  myCart: any[];
  cartTotal: number;

  constructor( private cartSVC: ShoppingCartService ) { }

  ngOnInit() {
    this.cartSVC.getCart()
      .then(theCart => this.myCart = theCart)
      .then(cart => this.sumCart(cart))
      .then(sum => this.cartTotal = sum);
  }

  sumCart(cart: any) {
    return Promise.resolve(cart.reduce((total: number, item: any) => total + item.price, 0));
  }

  removeCart(id: string) {
    this.cartSVC.removeCart(id);
    this.sumCart(this.myCart).then(sum => this.cartTotal = sum);
  }

}
