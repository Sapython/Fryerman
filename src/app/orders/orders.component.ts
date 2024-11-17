import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  liveOrders:any=[];
  oldOrders:any=[];
  totalPrice:string="450";
  name:string = "";
  image:string="";
  emailVerifiyed:boolean=false;
  crWidth=400;
  crHeight=400;
  producted={};
  isJustLoggedIn:any;
  isLoggedIn:any;
  isOrderAvailable:boolean=false;
  isLiveOrderAvailable:boolean=true;
  isOldOrdersAvailable:boolean=true;
  rspv:any;
  constructor(public authService: AuthService,public inventoryService:InventoryService) { }
  ngOnInit(): void {
    if(window.innerWidth<460){
      this.rspv=false;
    }
    else{
      this.rspv=true;
    }
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.inventoryService.getAllUserOrder().subscribe(
      (data)=>{
        this.liveOrders=[];
        this.oldOrders=[];
        for(let single of data){
          if(single.isLive){
            this.liveOrders.push(single);
          }else{
            this.oldOrders.push(single)
          }
        }
        if(this.liveOrders.length==0 && this.oldOrders.length==0){
          this.isOrderAvailable=false;
        }else{
          this.isOrderAvailable=true;
        }
        if(this.liveOrders.length==0){
          this.isLiveOrderAvailable=false;
        }
        if(this.oldOrders.length==0){
          this.isOldOrdersAvailable=false;
        }
      }
    )
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();
  }

}
