import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    var a = document.getElementById('imageInput') as HTMLElement;
    a.addEventListener('click', () => {
      var b = document.querySelector('input[type="file"]') as HTMLInputElement;
      b.click();
    });
  }
  
}
