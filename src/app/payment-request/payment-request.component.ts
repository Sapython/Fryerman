import { element } from 'protractor';
import { PaymentService } from './../services/payment.service';
import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {
  @Input() amount:number=0;
  @Input() label:string="";
  elements:any;
  paymentRequest:any;
  prButton:any;
  data:any;

  @ViewChild('payElement') payElement:any;
  constructor(private pmt: PaymentService,private activatedRoute: ActivatedRoute,) {
    const myArray = this.activatedRoute.snapshot.queryParamMap.get('paymentArray');
    if (myArray === null) {
      this.data = {};
    } else {
      this.data = JSON.parse(myArray);
    }
  }
  stripePromise = loadStripe(environment.stripeKey);
  async ngOnInit(){
    const stripe = await this.stripePromise || Stripe;
      const { error } = await stripe.redirectToCheckout({
        mode: "payment",
        lineItems: [{ price: (this.data.totalPrice*100).toString(), quantity: this.data.totalItems }],
        successUrl: `${window.location.href}/success`,
        cancelUrl: `${window.location.href}/failure`,
      }) || '';
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        console.error(error);
      }
  }
  async mountButton(){
    const result = await this.paymentRequest.canMakePayment();
    if (result) {
      this.prButton.mount(this.payElement.nativeElement);
    } else {
      console.error('Yoru browser is old and does not supports our website.')
      
    }

  }
}
