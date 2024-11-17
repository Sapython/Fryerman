import { InventoryService } from './../services/inventory.service';
import { HomeComponent } from './../home/home.component';

import { Component, Input, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// const myCompOneObj = new HomeComponent();

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() image: string = "https://via.placeholder.com/150";
  @Input() title: string = "alpha";
  @Input() regPrice: any = "0";
  @Input() lgPrice:any = "0";
  @Input() isLoggedIn:any;
  @Input() function: any;
  @Input() differentSize:boolean=true;
  @Input() cartProducts:any;
  @Input() productsAvailable:any; 
  @Input() checkCartState:any;
  @Input() description:any;
  @Input() showTooltip:boolean=true;
  constructor(public inventoryService:InventoryService,private toastr: ToastrService,){}
  myRadio:boolean=true;
  updateCart(){
    if(this.differentSize){
      this.function(this.title,this.regPrice,this.lgPrice,this.image,true);
    }else{
      this.function(this.title,this.regPrice,this.lgPrice,this.image,false);
    }
  }
  setNewValue(){
    var value = document.getElementById(this.title)
  }
  ngOnInit(): void {

  }
  
}
