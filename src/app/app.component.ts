import { Component } from '@angular/core';
import { Product } from './models/product';
import { Payment } from './models/payment';
import { ProductService } from './service/product.service';
import { PaymentService } from './service/payment.service';
import { ShoppingCartService } from './service/shoppingcart.service';
import { OrderService } from './service/order.service';
import swal from 'sweetalert2';

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
  is_restaurant_closed;
  today: any;

  constructor(private productService: ProductService,
              private cartSVC: ShoppingCartService,
              private paymentService: PaymentService,
              private orderService: OrderService) {
    this.getProducts();
    this.weekday();
    this.isRestaurantOpen();
    this.reAddProducts();
  }

  weekday() {
    this.today = new Date();
  }

  isRestaurantOpen() {
    this.is_restaurant_closed = ((0 == this.today.getDay())
      || (6 == this.today.getDay() && (12 > this.today.getHours() || this.today.getHours() >= 16))
      || (11 > this.today.getHours() || (this.today.getHours() + '.' + this.today.getMinutes()) >= '18.30') );
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
      });
  }

  openCheckout() {
    const amount = this.total_price * 100;

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_tzGL0gkTTfi6MspvJQhEo6Hq',
      locale: 'Sv',
      name: 'Kimchistan',
      currency: 'sek',
      amount: amount,
      token: (token: any) => {
        this.paymentService
          .createPayment(token, amount)
          .subscribe(
            (res) => {
              this.orderService.create(this.cart, res.charge.receipt_email)
              swal('Tack!', res.charge.description, 'success');
              this.cartSVC.clearCart();
              this.showProducts();
            },
            (error) => swal('Tyvärr', (JSON.parse(error._body).errors), 'error')
          );
      }
    });

    handler.open({
      name: 'Kimchistan',
      amount: amount
    });
  }

  addProduct(product_id: string,
             product_name: string,
             product_price: number,
             ingredient_id: string,
             ingredient_name: string,
             ingredient_price: number) {
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
  }

  reAddProducts() {
    if (localStorage.length > 0) {
      this.cartSVC.loadCart(this.today.getDay());
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
