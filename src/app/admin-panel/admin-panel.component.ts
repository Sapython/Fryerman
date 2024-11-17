import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  analyticsData:Observable<any>;
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public inventoryService: InventoryService
  ) {
    this.analyticsData = this.afs.collection<any>('adminData').doc('AnalyticsData').valueChanges();
  }
  location!: Location;
  name: string = '';
  image: string = '';
  emailVerifiyed: boolean = false;
  userRegistered:any;
  totalOrder: string = '';
  totalSale: number = 0;
  totalCancelled: number = 0;
  bestSelling: string = 'Lemon Ice Tea';
  liveOrders: any = [];
  oldOrders: any = [];
  allOrdersName:any=[];
  previousTotalUsers:number=0;
  isLoggedIn:any;
  isJustLoggedIn:any;
  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.inventoryService.getAllUserCount().subscribe((value)=>{

      this.userRegistered= value.length;
    })
    this.inventoryService.getAllOrders().subscribe((data) => {
      this.totalSale=0;
      this.liveOrders=[];
      this.oldOrders=[];
      this.totalCancelled=0;
      this.totalOrder = data.length;
      for (let item in data) {
        var dts: any = data[item];
        if (dts.isLive) {
          this.liveOrders.push(dts);
        } else {
          this.oldOrders.push(dts);
        }
        if (dts.isCancelled == true) {
          this.totalCancelled += 1;
        }
        for(let itemName of dts.products){
          this.allOrdersName.push(itemName.name);
        }
        if(dts.isLive==false && dts.isCancelled==false){
          this.totalSale = this.totalSale + parseInt(dts.totalPrice);
        }
        
      }
      this.bestSelling=this.count(this.allOrdersName);
    });
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();
  }
  count(array_elements:string[]) {
    array_elements.sort();
    // var value=0;
    var item="";
    var current = "";
    var cnt = 0;
    for(let single of array_elements){
      var value=0;
      for(let one of array_elements){
        if(one==single){
          value+=1;
        }
      }
      if(cnt<value){
        item=single;
      }
    }
    return item;
  }
}
