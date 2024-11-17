import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {
  name:string = "";
  image:string="";
  isLoggedIn:any;
  isJustLoggedIn:any;
  emailVerifiyed:boolean=false;
  selection:any;
  constructor(public authService: AuthService,public afs: AngularFirestore,public inventoryService:InventoryService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();
  }
  selectChanged(value:any){
    this.selection=value;
    if (value=="other"){
      var dc=document.getElementById("otherSpecify")!
      dc.style.display="block";
    } else {
      var dc=document.getElementById("otherSpecify")!
      dc.style.display="none";
    }
    
  }
  postRequest(){
    var message = document.getElementById('message') as HTMLInputElement;
    var name = document.getElementById('name') as HTMLInputElement;
    var email = document.getElementById('email') as HTMLInputElement;
    if(message.value==undefined || name.value==undefined || email.value==undefined || this.selection==undefined){
      alert("Please fill all the fields")
    }else{
      var Data={
        name:name.value.toString(),
        email:email.value.toString(),
        message:message.value.toString(),
        type:this.selection,
        isCompleted:false,
      }
      this.inventoryService.addQuery(Data);
    }
    
  }
}
