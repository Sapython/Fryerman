import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements AfterViewInit{
  title="Fryer Man";
  constructor(private elRef:ElementRef){}
  ngAfterViewInit(){
    let loader = this.elRef.nativeElement.querySelector('#loader')
    loader.style.display='none';
  }
}
