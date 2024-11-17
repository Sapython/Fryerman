import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-old-orders',
  templateUrl: './admin-old-orders.component.html',
  styleUrls: ['./admin-old-orders.component.css']
})
export class AdminOldOrdersComponent implements OnInit {
  location!: Location;
  constructor() {}
  @Input() products:any[]=[];
  @Input() price:any;
  @Input() personName:string="";
  @Input() address:string="";
  @Input() longitude:any;
  @Input() latitude:any; 
  @Input() isCancelled:any;
  @Input() reason:any;
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
