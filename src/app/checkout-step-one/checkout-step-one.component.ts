import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MapDataProvider } from '../providers/mapData.provider';
import { DataProvider } from '../providers/checkoutData.provider';

@Component({
  selector: 'app-checkout-step-one',
  templateUrl: './checkout-step-one.component.html',
  styleUrls: ['./checkout-step-one.component.css']
})
export class CheckoutStepOneComponent implements OnInit {
  rspv: any;
  name: string = '';
  image: string = '';
  emailVerifiyed: boolean = false;
  location!: Location;
  selectedMarker!: Marker;
  cartProducts: any;
  lat: any;
  lng: any;
  isLoggedIn: any;
  isJustLoggedIn: any;
  mapLoaded:boolean=false;
  constructor(
    public authService: AuthService,
    private mapDataProvider:MapDataProvider,
    private dataProvider: DataProvider,
    private router:Router) {
      this.cartProducts=this.dataProvider.data;
      console.log("Cart products ",this.cartProducts)
    }
  
  private setCurrentLocation() {
    console.log("Get Location triggered")
    if ('geolocation' in navigator) {
      console.log("Geo location is true")
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
        console.log(position.coords.latitude,position.coords.longitude,position.coords.altitude,position.coords.speed)
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        if(this.lng!=undefined && this.lat!=undefined){
          this.mapLoaded=true;
        }
      });
    }
  }
  
  ngOnInit() {
    // this.inventoryService.getAllUsers();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isJustLoggedIn = this.authService.isJustLoggedIn;
    this.setCurrentLocation();
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();

    // this.totalPrice=this.calcPrice;
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
  continue(){
    this.mapDataProvider.mapData={latitude:this.location.latitude,longitude:this.location.longitude};
    this.dataProvider.data=this.cartProducts;
    console.log("before pay info ",this.dataProvider.data)
    this.router.navigate(['/steptwocheckout']);

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
