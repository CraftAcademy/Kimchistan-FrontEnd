import { TestBed, inject } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { MockBackend } from '@angular/http/testing';
import { DatastoreService } from './datastore.service';
import { HttpModule, XHRBackend } from '@angular/http';




describe('MockBackend: PaymentService', () => {
  let mockBackend, service, payments;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        DatastoreService,
        MockBackend,
        PaymentService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([MockBackend, PaymentService], (_mockBackend, _paymentService) => {
    mockBackend = _mockBackend;
    service = _paymentService;
  }));

  beforeEach(() => {
    payments = [{
      "type": "payments",
      "email": "olofvi89@gmail.com",
      "token": "tok_1BO9zFCiJmOu5UHgpZLpxCM4"}
    ]
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
