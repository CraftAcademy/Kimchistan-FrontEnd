import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../service/product.service';
import {ShoppingCartService} from '../service/shoppingcart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  products: Product[];
  lat: number = 59.334248;
  lng: number = 18.063829;

  constructor(private productService: ProductService,
              private cartSVC: ShoppingCartService) {
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
      });
  }

  addProduct(p_id: string, p_name: string, p_price: number, i_id: string, i_name: string, i_price: number) {
    if (i_price) {
      let price = p_price + i_price;
      this.cartSVC.addToCart(p_id, p_name, price, i_id, i_name);
    } else {
      let price = p_price;
      this.cartSVC.addToCart(p_id, p_name, price);
    }

  }

}
