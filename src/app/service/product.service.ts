import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DatastoreService } from './datastore.service';
import { Product } from '../models/product';


@Injectable()
export class ProductService {

  constructor(private datastore: DatastoreService) {
  }

  getAll(): Observable<Product[]> {
    return this.datastore.findAll(Product, {}).map(res => res.getModels());
  }

  show(id): Observable<Product> {
    return this.datastore.findRecord(Product, id);
  }
}
