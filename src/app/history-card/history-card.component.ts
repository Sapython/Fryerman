import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {
  @Input() items:Array<any> = [];
  @Input() totalPrice:string = "213";
  @Input() isCancelled:boolean=false;
  @Input() reason:any;
  @Input() rspv:any;

  reorder(){
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(this.items);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/checkout'],navigationExtras);
  }
   
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
