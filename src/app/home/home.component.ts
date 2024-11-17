import { AuthService } from './../services/auth.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service'; 
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HomePageProvider } from '../providers/homePageData.provider';
import { DataProvider } from '../providers/checkoutData.provider';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'FryerMan';
  liveOrders:any[]=[];
  productsAvailable:boolean = true;
  vegProducts:any;
  vegProductsKeys:any;
  nonVegProducts:any;
  nonVegProductsKeys:any;
  Drinks:any;
  DrinksKeys:any;
  isAdmin:any;
  name:string = "";
  image:string="";
  emailVerifiyed:boolean=false;
  crWidth=400;
  crHeight=400;
  rx:number=500;
  ry:number=500;
  isLoggedIn:any;
  isJustLoggedIn:any;
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    centeredSlides: true,
    loop: true,
    autoplay:true,
    spaceBetween: 0,
    speed:500,
    effect:'fade'
  };
  public cartProducts:any = [];
  constructor(
    public authService: AuthService,
    public inventoryService:InventoryService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private homeDataProvider: HomePageProvider,
    private dataProvider: DataProvider,
    ){
      if(homeDataProvider.data!=undefined){
        if(homeDataProvider.data.refresh==true){
          homeDataProvider.data.refresh=false;
          window.location.reload()
        }
      }
    setInterval(() => {
      this.checkCartState();
    },200);

  }
  
  removeItem(id:any) {
    this.toastr.error("Item removed from cart.")
    var item = document.getElementById(id[0])!
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==id) this.cartProducts.splice(index,1);
   });
   this.inventoryService.saveCartItems(this.cartProducts);
   item.style.display="none";
  }
  
  checkCartState() {
    if( this.cartProducts.length>=1){
      this.productsAvailable=true;
    } else{
      this.productsAvailable=false;
    }
  }
  setNewQuantity(name:any) {
    var alpha =document.getElementById(name+'quantity') as HTMLInputElement;
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==name){
        this.cartProducts[index].quantity=alpha.value;
      }
    });
    this.inventoryService.saveCartItems(this.cartProducts); 
  }
  updateCart(name:string,regPrice:string,lgPrice:string,image:string,hasDifferentSize:any) {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    var exists=false;
    for(let oneProduct of this.cartProducts){
      if(oneProduct.name==name){
        this.toastr.warning('Item already exists')
        exists=true;
        break;
      }
    }
    if(exists!=true){
      this.cartProducts.push({'name':name,'image':image,'regPrice':regPrice,'lgPrice':lgPrice,'isregular':'true',"quantity":'1',"hasDifferentSize":hasDifferentSize});
      this.inventoryService.saveCartItems(this.cartProducts);
      this.toastr.success("Product "+name+" added to cart.")
    }
    // this.inventoryService.saveCartItems([name,image,regPrice,lgPrice,type,quantity])
  }
  moveToCart() {
    const queryParams: any = {};
    queryParams.cartArray = JSON.stringify(this.cartProducts);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.dataProvider.data=this.cartProducts;
    this.router.navigate(['/cart'],navigationExtras);
  }
  sizeChanged(name:any) {
    var alpha =document.getElementById(name+'select') as HTMLInputElement;
    this.cartProducts.forEach((element:any,index:any)=>{
      if(element.name==name){
        this.cartProducts[index].isregular=alpha.value.toString();
      }
    });
    this.inventoryService.saveCartItems(this.cartProducts);
    alpha.value='true';
  }

  moveToCheckout() {
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(this.cartProducts);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.dataProvider.data=this.cartProducts;
    // this.router.navigate(['/checkout'],navigationExtras);
    this.router.navigate(['/checkout']);
  }
  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLoggedIn;
    this.isJustLoggedIn=this.authService.isJustLoggedIn;
    this.inventoryService.getUserData().subscribe(
      user=>{
        this.isAdmin=user.isAdmin;
        this.cartProducts=[];
        if(user.cartItems!=undefined){
          for(let cartItem of user.cartItems){
            this.cartProducts.push(cartItem);
          }
        }
      }
    )
    // this.inventoryService.getAllUsers();
    this.inventoryService.getAllUserOrder().subscribe(products=>{
      console.log("OrderHear",products)
      this.liveOrders=[]
      for(let order of products){
        this.liveOrders.push(order)
        // console.log("Order, ",order)
      }
    })
    this.inventoryService.getDrinks().subscribe(products => {
      this.DrinksKeys = Object.keys(products);
      this.Drinks=products;
    });
    this.inventoryService.getVegProducts().subscribe(products=>{
      this.vegProductsKeys=Object.keys(products)
      this.vegProducts=products;
    })
    this.inventoryService.getNonVegProducts().subscribe(products => {
      this.nonVegProductsKeys=Object.keys(products)
      this.nonVegProducts=products;
    })
    if (window.innerWidth>400 && window.innerWidth < 850){
      this.crWidth=window.innerWidth-100;
      var body = document.querySelector('body')
      document.getElementById('footer')!.style.bottom = `-2000px`;
      // this.crHeight=400;
    } else if(window.innerWidth<400) {
      this.crHeight=window.innerWidth;
      this.crWidth=window.innerWidth;
    } else if(window.innerWidth>=1350 && window.innerWidth <=1390) {
      this.crHeight=400;
      this.crWidth=400;
    } else {
      this.crHeight=580;
      this.crWidth=580;
    }
    console.log('This is user data');
    if(this.authService.isLoggedIn){
      this.name = this.authService.getUserName();
      console.log('UserData ended')
      this.image = this.authService.getUserPhoto();
    }
    if( this.cartProducts.length>=1){
      this.productsAvailable=true;
    } else{
      this.productsAvailable=false;
    }
  }

}
