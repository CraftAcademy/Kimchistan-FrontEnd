import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './service/product.service';
import { ShoppingCartService } from './service/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];
  lat: number = 59.334248;
  lng: number = 18.063829;

  constructor(private productService: ProductService,
              private cartSVC: ShoppingCartService) {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
      });
  }

  addProduct(p_id: string, p_name: string, p_price: number, i_id: string, i_name: string, i_price: number) {
    let price: number;
    if (i_price) {
      price = p_price + i_price;
    } else {
      price = p_price;
    }
    this.cartSVC.addToCart(p_id, p_name, price, i_id, i_name);

  }
}
