import { Router } from '@angular/router';
import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  isCompleted:boolean=false;
  constructor(private _Activatedroute:ActivatedRoute,private inventoryService:InventoryService,private route:Router){
  }
  routeToHome(){
    
  }
  ngOnInit(): void {
    console.log("This is data ");
    var value= this.inventoryService.getTempCartData().pipe(take(1));
    console.log(value);
    value.subscribe((value)=>{
      var a = this.inventoryService.saveCheckoutData(value.tempOrderData);
      var b = this.inventoryService.removeDataFromCart();
      var c = this.inventoryService.removeTempData();
      if(a==true && b==true && c==true){
        this.isCompleted=true;
        setTimeout(function(){},2000);
        this.route.navigate([''])
      }
      // this.route.navigate(['']);
    })
    // alert(value.tempOrderData)
    
    // this.inventoryService.getTempCartData().pipe(
    // )
    // )
    // (value:any)=>{
    // }
  }
  

}
