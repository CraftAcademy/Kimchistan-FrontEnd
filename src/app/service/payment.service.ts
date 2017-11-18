import { Injectable } from '@angular/core';
import { DatastoreService } from './datastore.service';
import { Payment } from '../models/payment';
import { Http } from '@angular/http';


@Injectable()
export class PaymentService {

  constructor(private datastore: DatastoreService, private http: Http) {
  }

  createPayment(token: any, amount: any) {
    const apiUrl = 'https://kimchistan-api.herokuapp.com/api/v1';
    const payload = {
      data: {
        attributes: {
          email: token.email,
          token: token.id,
          amount: amount
        }
      }
    };

    return this.http.post(`${apiUrl}/payments`, payload)
      .map(res => res.json());
  }
}

