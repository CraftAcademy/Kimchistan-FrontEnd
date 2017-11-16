import { Component } from '@angular/core';
import { Product } from './models/product';
import { Payment} from "./models/payment";
import { ProductService } from './service/product.service';
import { PaymentService} from "./service/payment.service";
import { ShoppingCartService } from './service/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];
  payments: Payment[];
  lat: number = 59.334248;
  lng: number = 18.063829;
  cart: any = [];
  total_price: number;
  today: any;

  constructor(private productService: ProductService,
              private cartSVC: ShoppingCartService,
              private paymentService: PaymentService) {
    this.getProducts();
    this.reAddProducts();
    this.weekday();
  }

  weekday() {
    this.today = new Date;
    console.log(this.today.getDay());
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
      });
  }


  openCheckout() {
    let amount = this.total_price * 100;
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_tzGL0gkTTfi6MspvJQhEo6Hq',
      locale: 'Sv',
      name: 'Kimchistan',
      currency: 'sek',
      amount: amount,
      token: (token: any) => {
        this.paymentService.create(token, amount );
      }
    });

    handler.open({
      name: 'Kimchistan',
      amount: amount
    });
  };

  addProduct(p_id: string, p_name: string, p_price: number, i_id: string, i_name: string, i_price: number) {
    let price: number;
    if (i_price) {
      price = p_price + i_price;
    } else {
      price = p_price;
    }
    this.cartSVC.addToCart(p_id, p_name, price, i_id, i_name);
    this.showProducts();
  }

  showProducts() {
    this.cart = this.cartSVC.showAll();
    this.total_price = this.cartSVC.showTotal();
  }

  reAddProducts() {
    if (localStorage.length > 0) {
      this.cartSVC.loadCart();
      this.showProducts();
    }
  }
}
