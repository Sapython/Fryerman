import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.css']
})
export class ProductSummaryCardComponent implements OnInit {
  @Input() name:string="";
  @Input() regPrice:string="";
  @Input() lgPrice:string="";
  @Input() description:string="";
  @Input() quantity:string="0";
  @Input() command:any;
  @Input() isRegular:any;
  @Input() cartProducts:any;
  @Input() totalPrice:number=0;
  @Input() totalItems:number=0;
  @Input() ref:any;
  @Input() caculator:any;
  @Input() rspv:any;
  @Input() hasdifferentSize:boolean=true;

  constructor() {
  }
  checkState(){
    this.command(this.name);
  }
  quantityChanged(){
    const inputElement = document.getElementById(this.name+"quantity") as HTMLInputElement;
    var value = inputElement.value;
    for (let alpha of this.cartProducts){
      if(alpha.name==this.name){
        alpha.quantity=value;
      }
    }
    this.caculator()
  }
  sizeChanged(){
    const inputElement = document.getElementById(this.name+"select") as HTMLInputElement;
    for (let alpha of this.cartProducts){
      if(alpha.name==this.name){
        alpha.isregular=inputElement.value;
      }
    }
    this.caculator()
  }

  ngOnInit(): void {

  }

}
