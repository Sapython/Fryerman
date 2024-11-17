import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripe = Stripe(environment.stripeKey);

  constructor() { }
}
