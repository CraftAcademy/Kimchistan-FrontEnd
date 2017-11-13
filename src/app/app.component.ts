import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];
  lat: number = 59.334248;
  lng: number = 18.063829;

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
      });
  }
}
