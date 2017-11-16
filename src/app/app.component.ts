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
  total_cart_items: number;
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

  addProduct(product_id: string, product_name: string, product_price: number, ingredient_id: string, ingredient_name: string, ingredient_price: number) {
    let price: number;
    if (ingredient_price) {
      price = product_price + ingredient_price;
    } else {
      price = product_price;
    }
    this.cartSVC.addToCart(product_id, product_name, price, ingredient_id, ingredient_name);
    this.showProducts();
  }

  showProducts() {
    this.cart = this.cartSVC.showAll();
    this.total_price = this.cartSVC.showTotal();
    this.total_cart_items = this.cartSVC.showQuantity();
    console.log(this.total_cart_items);
  }

  reAddProducts() {
    if (localStorage.length > 0) {
      this.cartSVC.loadCart();
      this.showProducts();
    }
  }

  clearCart() {
    this.cartSVC.clearCart();
    this.showProducts();
  }

  removeProduct(product_id: string, product_name: string, product_price: number, ingredient_id: string, ingredient_name: string) {
    this.cartSVC.removeProduct(product_id, product_name, product_price, ingredient_id, ingredient_name);
    this.showProducts();
    this.cartSVC.showTotal();
  }
}
