import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataProvider } from '../providers/checkoutData.provider';

import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productsAvailable:boolean = false;
  name:string = "";
  image:string="";
  emailVerifiyed:boolean=false;
  isLoggedIn:any;
  isJustLoggedIn:any;
  public cartProducts:any = [];
  constructor(
    public authService: AuthService,
    public inventoryService:InventoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dataProvider: DataProvider,
    ) {

    this.cartProducts=dataProvider.data;
  }
  checkCartState(){
    if(this.cartProducts.length>=1 && this.cartProducts!=undefined){
      this.productsAvailable=true;
    } else{
      this.productsAvailable=false;
    }
  }
  updateCart(name:string,regPrice:string,lgPrice:string,image:string){
    this.toastr.success("Product "+name+" added to cart.")
    // this.toastr.success('Hello world!', 'Toastr fun!');
    this.cartProducts.push({'name':name,'image':image,'regPrice':regPrice,'lgPrice':lgPrice,'isregular':'true',"quantity":'1'});
    this.inventoryService.saveCartItems(this.cartProducts);
    // this.inventoryService.saveCartItems([name,image,regPrice,lgPrice,type,quantity])
  }
  setNewQuantity(name:any){
    var alpha =document.getElementById(name+'quantity') as HTMLInputElement;
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==name){
        this.cartProducts[index].quantity=alpha.value;
      }
    });
    this.inventoryService.saveCartItems(this.cartProducts); 
  }
  removeItem(id:any){
    this.toastr.error("Item removed from cart.")
    var item = document.getElementById(id[0])!
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==id) this.cartProducts.splice(index,1);
   });
   this.inventoryService.saveCartItems(this.cartProducts);
   item.style.display="none";
  }
  sizeChanged(name:any){
    var alpha =document.getElementById(name+'select') as HTMLInputElement;
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==name){
        this.cartProducts[index].isregular=alpha.value.toString();
      }
    });
    this.inventoryService.saveCartItems(this.cartProducts);
    alpha.value='true';
  }
  moveToCheckout(){
    // const queryParams: any = {};
    // queryParams.myArray = JSON.stringify(this.cartProducts);
    // const navigationExtras: NavigationExtras = {
    //   queryParams
    // };
    this.dataProvider.data=this.cartProducts;
    this.router.navigate(['/steponecheckout']);
  }
  ngOnInit(): void {
    this.checkCartState();
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.name = this.authService.getUserName();
    this.image = this.authService.getUserPhoto();
  }

}
