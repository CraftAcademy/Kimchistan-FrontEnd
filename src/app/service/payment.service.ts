import { Injectable } from '@angular/core';import { Observable } from 'rxjs/Observable';
import { DatastoreService } from './datastore.service';
import { Payment } from '../models/payment';


@Injectable()
export class PaymentService {

  constructor(private datastore: DatastoreService) {
  }

  create(token: any) {
    let payment = this.datastore.createRecord(Payment, {
      email: token.email,
      token: token.id,
      amount: token.amount
    })

    payment.save().subscribe(
    );
  }

}
