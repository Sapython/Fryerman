import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'admin-new-orders',
  templateUrl: './admin-new-orders.component.html',
  styleUrls: ['./admin-new-orders.component.css'],
})
export class AdminNewOrdersComponent implements OnInit {
  location!: Location;

  @Input() products:any[]=[];
  @Input() price:any;
  @Input() personName:string="";
  @Input() address:string="";
  @Input() longitude:any;
  @Input() latitude:any; 
  @Input() date:any;
  @Input() otp:any;
  @Input() userId:any;
  constructor(public authService: AuthService,public afs: AngularFirestore,private toastr: ToastrService,) {}
  
  cancelOrder() {
    var userSideComplete:boolean=false;
    var adminSideComplete:boolean=false;
    const userOrder = this.afs.collection<any>('users').doc(this.userId).collection('orders').get();
    const userReason = document.getElementById('cancelArea') as HTMLInputElement;
    userOrder.subscribe((value)=>{
      console.log("User order data",value);
    })
    userOrder.toPromise().then((data)=>{
      data.forEach((doc)=>{
        console.log("Firebase data ",doc.data().orderDate," User data",this.date)
      if(doc.data().orderDate==this.date){
        console.log("Condtion os user is true")
          var userSpecficOrder=this.afs.collection<any>('users').doc(this.userId)
          .collection('orders')
          .doc(doc.id);
          var result = userSpecficOrder.update({'isCancelled':true,'isLive':false});
          console.log("User side request update data ",result);
          result = userSpecficOrder.set({cancelReason:userReason.value.toString()},{merge:true})
          console.log("User side request update data ",result);
          userSideComplete=true;
      }
      })
    });
    const adminOrder = this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders').get();
    adminOrder.toPromise().then((data)=>{
      data.forEach((doc)=>{
      if(doc.data().orderDate==this.date){
          var  adminSpecificOrder=this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders')
          .doc(doc.id);
          var result = adminSpecificOrder.update({'isCancelled':true,'isLive':false});
          console.log("Admin side request update data ",result);
          result = adminSpecificOrder.set({cancelReason:userReason.value.toString()},{merge:true})
          console.log("Admin side request update data ",result);
          adminSideComplete=true;
        }
      })
    });
    console.log(adminSideComplete);
    console.log(userSideComplete);
    if(adminSideComplete && userSideComplete){
      this.toastr.info('Completed','Order is cancelled and notified to user.');
    }
    
  }
  completeOrder(otp:any) {
    var userSideComplete:boolean=false;
    var adminSideComplete:boolean=false;
    const userOrder = this.afs.collection<any>('users').doc(this.userId).collection('orders').get();
    // const userReason = document.getElementById('otp') as HTMLInputElement;
    // alert(otp)
    if(otp==this.otp){
      alert("It's successful condtion is true");
      userOrder.subscribe((data)=>{
        console.log("just data ",data,`users/${this.userId}/orders`);
        data.forEach((doc)=>{
          console.log("doc data ",doc.data());
        if(doc.data().orderDate==this.date){
          alert("It's successful deep condtion is true");
            var userSpecficOrder=this.afs.collection<any>('users').doc(this.userId)
            .collection('orders')
            .doc(doc.id);
            userSpecficOrder.update({'isCancelled':false,'isLive':false,});
            userSideComplete=true;
            // userSpecficOrder.set({cancelReason:userReason.value.toString()},{merge:true})
        }
        })
      });
      const adminOrder = this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders').get();
      adminOrder.subscribe((data)=>{
        data.forEach((doc)=>{
        if(doc.data().orderDate==this.date){
            var  adminSpecificOrder=this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders')
            .doc(doc.id);
            adminSpecificOrder.update({'isCancelled':false,'isLive':false});
            adminSideComplete=true;
            // adminSpecificOrder.set({cancelReason:userReason.value.toString()},{merge:true})
          }
        })
      });
      if(adminSideComplete && userSideComplete){this.toastr.success('Completed','Order is completed and saved.');}
    }else{
      this.toastr.warning('Incorrect OTP', `The OTP ${otp} is incorrect, please try again.`);
    }
  }
  ngOnInit(): void {
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
