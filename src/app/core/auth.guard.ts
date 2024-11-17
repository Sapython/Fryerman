import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { InventoryService } from '../services/inventory.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private authService:AuthService,private router: Router,private auth: AngularFireAuth,public inventoryService:InventoryService,){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let routeUrl = route.data["route"] as string;
    if(this.authService.isJustLoggedIn){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
    // if (this.authService.isJustLoggedIn && routeUrl!="/admin" ){
    //   this.router.navigate(["/login"]);
    //   return true;
    // }else if (routeUrl=="/admin" && this.authService.isJustLoggedIn && this.authService.isUserAdmin==true){
    //   this.router.navigate(['/admin'])
    //   return false;
    // }else{
    //   this.router.navigate(['/login'])
    //   return false;
    // }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
