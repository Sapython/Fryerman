import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
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
