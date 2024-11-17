import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-live-order',
  templateUrl: './live-order.component.html',
  styleUrls: ['./live-order.component.css'],
})

export class LiveOrderComponent implements OnInit {
  @Input() title: string = 'Chicken Lava Bucket';
  @Input() price: string = '231';
  @Input() image: string = '/assets/1.jpg';
  @Input() status: string = '';
  @Input() time: any;
  @Input() deliveryPersonName: string = 'Abdul Kumar';
  @Input() currentOtp: any;
  @Input() longitude: any;
  @Input() latitude: any;
  @Input() products:any;
  @Input() date: number = 0;
  @Input() rspv:any;
  @Input() userId:any;
  timeInterval: any;
  remainingTime: any;
  location!: Location;
  selectedMarker!: Marker;
  comparer: any;
  isLoggedIn:any;
  isJustLoggedIn:any;
  // status="Cooking";
  // time="25 Minutes";

  constructor(public afs: AngularFirestore,public authService: AuthService,){}

  cancelOrder() {
    alert("cancelled order triggered");
    const userOrder = this.afs.collection<any>('users').doc(this.authService.userId).collection('orders').get();
    const userReason = document.getElementById('cancelArea') as HTMLInputElement;
    userOrder.subscribe((data)=>{
      alert('subscription started')
      data.forEach((doc)=>{
        console.log("doc data",doc.data())
      if(doc.data().orderDate==this.date){
        alert("condition true")
          var userSpecficOrder=this.afs.collection<any>('users').doc(this.authService.userId)
          .collection('orders')
          .doc(doc.id);
          userSpecficOrder.update({'isCancelled':true,'isLive':false});
          userSpecficOrder.set({cancelReason:userReason.value.toString()},{merge:true})
      }
      })
    });
    const adminOrder = this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders').get();
    adminOrder.subscribe((data)=>{
      alert('admin subscription started')
      data.forEach((doc)=>{
        console.log("order date ",doc.data().orderDate,"this date",this.date)
      if(doc.data().orderDate==this.date){
        console.log("order date ",doc.data().orderDate,"this date",this.date)
          alert("admin condition true")
          var  adminSpecificOrder=this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders')
          .doc(doc.id);
          var a = adminSpecificOrder.update({'isCancelled':true,'isLive':false});
          var b = adminSpecificOrder.set({cancelReason:userReason.value.toString()},{merge:true})
          alert('this is admin completed')
          console.log("a",a,"b",b)
        }
      })
    });
  }

  ngOnInit() {

    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.timeInterval = setInterval(() => {
      var dt = parseInt(this.date.toString().substring(0, 10));
      var cd = parseInt(Date.now().toString().substring(0, 10));
      this.comparer = Math.floor(600 - (cd - dt));
      var dts = new Date(this.comparer * 1000).toISOString().substr(11, 8);
      this.remainingTime = dts;
    }, 1000);

    if (window.innerWidth > 400 && window.innerWidth < 850) {
      var mainContainer = document.getElementById('mainContainer');
      mainContainer?.classList.add('uk-flex-column');
      mainContainer?.classList.add('uk-flex-center');
    } else if (window.innerWidth < 400) {
      var mainContainer = document.getElementById('mainContainer');
      mainContainer?.classList.add('uk-flex-column');
      mainContainer?.classList.add('uk-flex-center');
    } else {
      var mainContainer = document.getElementById('mainContainer');
      mainContainer?.classList.add('uk-flex');
      var orderContainer = document.getElementById('orderContainer');
      orderContainer?.classList.add('uk-margin-left');
    }

    this.location = {
      latitude: this.latitude,
      longitude: this.longitude,
      markers: [
        {
          lat: this.latitude,
          lng: this.longitude,
          label: 'Location',
        },
      ],
    };
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
