import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  name:string = "";
  image:string="";
  emailVerifiyed:boolean=false;
  isLoggedIn:any;
  isJustLoggedIn:any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();
  }

}
