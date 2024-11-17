import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
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
