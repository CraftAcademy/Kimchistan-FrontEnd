import { Injectable } from '@angular/core';import { Observable } from 'rxjs/Observable';
import { DatastoreService } from './datastore.service';
import { Payment } from '../models/payment';


@Injectable()
export class PaymentService {

  constructor(private datastore: DatastoreService) {
  }

  create(token: any, amount: any) {
    let payment = this.datastore.createRecord(Payment, {
      email: token.email,
      token: token.id,
      amount: amount,
    });

    payment.save().subscribe();
  }
}
