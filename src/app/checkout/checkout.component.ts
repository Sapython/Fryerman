import { AngularFireFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { recommendor } from './../services/recommendation.engine.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { DataProvider } from '../providers/checkoutData.provider';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // private stripe:Stripe;
  name: string = '';
  image: string = '';
  emailVerifiyed: boolean = false;
  location!: Location;
  selectedMarker!: Marker;
  cartProducts: any;
  recommendedProducts: any[][] = [];
  totalPrice = 0;
  totalItems = 0;
  sgst = '0%';
  gst = '0%';
  items = ['a'];
  lat: any;
  lng: any;
  isLoggedIn: any;
  isJustLoggedIn: any;
  rspv: any;
  token: any;
  stripePromise = Stripe(environment.stripeKey);
  // arrayOfValues: Array<string>;
  
  constructor(
    public authService: AuthService,
    public inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private afFun:AngularFireFunctions,
    public ref: ChangeDetectorRef,
    private router: Router,
    private rcd:recommendor,
    private dataProvider: DataProvider,
  ) {
    // const myArray = this.activatedRoute.snapshot.queryParamMap.get('myArray');
    // if (myArray === null) {
    //   this.cartProducts = [];
    // } else {
    //   this.cartProducts = JSON.parse(myArray);
    // }
    this.cartProducts=this.dataProvider.data;
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          markers: [
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              label: 'Location',
            },
          ],
        };
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  updateCart(
    title: any,
    regPrice: any,
    lgPrice: any,
    image: any,
    hasDifferentSize:any,
  ) {
    this.cartProducts.push({
      name: title,
      regPrice: regPrice,
      lgPrice: lgPrice,
      image: image,
      isregular: 'true',
      quantity: 1,
      hasDifferentSize:hasDifferentSize,
    });
    // this.getRecommend();
  }
  async continuePayment() {
    var fullname = document.getElementById('fullname') as HTMLInputElement;
    var phonenumber = document.getElementById(
      'phoneNumber'
    ) as HTMLInputElement;
    var address = document.getElementById('streetAddress') as HTMLInputElement;
    var landmark = document.getElementById('landmark') as HTMLInputElement;
    // var overlay = document.getElementById('overlay')!.style.display='block';
    if (
      fullname.value.length < 4 ||
      phonenumber.value.length != 10 ||
      address.value.length < 4 ||
      landmark.value.length < 4
    ) {
      window.alert(
        'Please check your payment information. The name should be full name, the phonenumber should be a 10 chracter long and, address and landmark should be greater than 4 keywords.'
      );
    } else {
      console.log("It is true")
      
      console.log("it is done");
      var productName='Fryer Man'
      const Data={
        fullname:fullname.value,
        phoneNumber:phonenumber.value,
        address:address.value,
        landmark:landmark.value,
        location:{latitude:this.location.latitude,longitude:this.location.longitude},
        totalPrice:this.totalPrice,
        totalItems:this.totalItems,
        products:this.cartProducts,
        isLive:true,
        isCancelled:false,
        orderDate:Date.now(),
        otp:this.genOtp(),
        userId:this.authService.userId,
      }
      var DataProducts=[];
      for(let singleProduct of this.cartProducts){
        if(singleProduct.isRegular=='true' || singleProduct.isRegular==undefined){
          var Product={
            name:singleProduct.name,
            // description:singleProduct.discription || "",
            images:[singleProduct.image],
            amount:singleProduct.regPrice*100,
            currency:'inr',
            quantity:singleProduct.quantity,
          }
        }else{
          var Product={
            name:singleProduct.name,
            // description:singleProduct.discription || "",
            images:[singleProduct.image],
            amount:singleProduct.lgPrice*100,
            currency:'inr',
            quantity:singleProduct.quantity,
          }
        }
        DataProducts.push(Product);
      }
      this.afFun.httpsCallable('stripeCheckoutWithoutDbQueries')(
        {
          productName:productName,
          price:this.totalPrice,
          images:[this.cartProducts[0].image],
          quantity:this.totalItems,
          data:Data,
          userId:this.authService.userId,
          products:DataProducts,
        })
        .subscribe(result => {
          this.stripePromise.redirectToCheckout({
            sessionId:result,
          }).then(function (response:any){
            console.error(response);
          });
        });
    }
  }
  invokeStripe(){
    if(!window.document.getElementById('stripe-script')){
      const script = window.document.createElement('script');
      script.id='stripe-script';
      script.type='text/javascript';
      script.src=''
      window.document.body.appendChild(script);
    }
  }
  genOtp() {
    var otp: string = '';
    for (let i = 0; i < 5; i++) {
      otp += (Math.floor(Math.random() * 10) + 1).toString();
    }
    return otp;
  }
  get calcPrice(): number {
    this.totalPrice = 0;
    this.totalItems = 0;
    for (let price of this.cartProducts) {
      var ab = parseInt(price.quantity);
      var type = price.isregular;
      if (type === 'true') {
        this.totalPrice += parseInt(price.regPrice) * ab;
      } else {
        this.totalPrice += parseInt(price.lgPrice) * ab;
      }
      this.totalItems += 1;
    }
    return this.totalPrice;
  }

  calculatePrice() {
    this.totalPrice = 0;
    this.totalItems = 0;
    for (let price of this.cartProducts) {
      var ab = parseInt(price.quantity);
      var type = price.isregular;
      if (type == 'true') {
        this.totalPrice += parseInt(price.regPrice) * ab;
      } else {
        this.totalPrice += parseInt(price.lgPrice) * ab;
      }
      this.totalItems += 1;
    }
    this.totalPrice = this.totalPrice;
  }
  getRecommend() {
    var inCartitems = [];
    for (let single of this.cartProducts) {
      inCartitems.push(single.name);
    }
    this.recommendedProducts = this.rcd.getRecommendations(5, inCartitems);
  }
  removeItem(id: any) {
    this.cartProducts.forEach((element: any, index: any) => {
      if (element.name == id) this.cartProducts.splice(index, 1);
    });
    this.ref.markForCheck();
    // this.calculatePrice()
  }
  ngOnInit() {
    this.invokeStripe()
    // this.inventoryService.getAllUsers();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isJustLoggedIn = this.authService.isJustLoggedIn;
    this.setCurrentLocation();
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();

    // this.totalPrice=this.calcPrice;
    this.getRecommend();
    if (window.innerWidth > 400 && window.innerWidth < 850) {
      var main = document.getElementById('mainCard')!;
      main?.classList.add('uk-flex-column');
    } else if (window.innerWidth < 400) {
      this.rspv = false;
      var main = document.getElementById('mainCard')!;
      main?.classList.add('uk-flex-column');
    } else if (window.innerWidth > 850) {
      this.rspv = true;
      var main = document.getElementById('mainCard')!;
      main?.classList.add('uk-flex');
      main?.classList.add('uk-flex-around');
      var form = document.getElementById('form')!;
      form?.classList.add('uk-margin-medium-left');
      var map = document.getElementById('map')!;
      map?.classList.add('uk-margin-medium-right');
    }
  }

  addMarker(lat: number, lng: number) {
    this.location.markers.push({
      lat,
      lng,
      label: 'Location',
    });
  }

  selectMarker(event: any) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      label: 'Location',
    };
  }

  markerDragEnd(event: any) {
    this.location.latitude = event.latLng.lat();
    this.location.longitude = event.latLng.lng();
  }
}
interface Marker {
  lat: number;
  lng: number;
  label: string;
}

interface Location {
  latitude: number;
  longitude: number;
  markers: Array<Marker>;
}
