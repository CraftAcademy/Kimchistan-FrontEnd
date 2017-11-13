import { TestBed, inject } from '@angular/core/testing';

import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonApiModule } from 'angular2-jsonapi';

import { DatastoreService } from './datastore.service';
import { ProductService } from './product.service';

describe('MockBackend: ProductService', () => {
  let mockBackend, service, products;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        DatastoreService,
        MockBackend,
        ProductService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([MockBackend, ProductService], (_mockBackend, _productService) => {
    mockBackend = _mockBackend;
    service = _productService;
  }));

  beforeEach(() => {
    products = [{
      "id": "1",
      "type": "products",
      "attributes": {
        "name": "coke",
        "price": 10,
        "description": "refreshing",
        "image": "image",
        "available": true,
        "type": "drink"
      }
    }];
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll: should return a list of products', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({
        body: JSON.stringify(products)
      }))
    })

    service.getAll().subscribe(_products => {
      expect(_products[0]).toEqual(products);
      expect(_products.length).toBe(1);
    })
  })

  it('show: returns a single product given its id', () => {
    let response = products[0];

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({
        body: JSON.stringify(response)
      }))
    })

    service.show(1).subscribe(product => {
      expect(product).toEqual(response);
    })
  })
});
