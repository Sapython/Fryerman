import { HomePageProvider } from './../providers/homePageData.provider';

import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import auth  from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NavigationExtras, Router } from "@angular/router";
import 'firebase/auth';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { async, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  previousTotalUsers:number=0;
  userFireData:Observable<any>;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone,
    private homeDataProvider: HomePageProvider,
     // NgZone service to remove outside scope warning
  ) {
    this.userFireData = this.afs
      .collection<any>(`users`)
      .doc(this.userId)
      .valueChanges();
    this.userFireData.subscribe(user=>{
        user.isAdmin;
        localStorage.setItem('fireUser',JSON.stringify(user.isAdmin));
        // alert("this is current status of admin "+isAdmin);
      }
    );
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // alert("This is data user "+JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }
  userFireDataReturn(){
    return this.userFireData;
  };
  // Sign in with email/password
  SignIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
          window.alert("Sign in complete")
        });
        this.SetUserData(result.user);
      }).catch((error:any) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email:string, password:string,name:string,photo:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result:any) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        // let photoUrl = await this.inventory.uploadFile(photo,name);
        this.SetUserData(result.user,name,"");
        const queryParams: any = {};
        queryParams.settings = JSON.stringify({"reloadRequired":true});
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        // window.alert('You need to refresh the home page to load your profile.');
        this.homeDataProvider.data={refresh:true};
        this.router.navigate(['']);
      }).catch((error:any) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => {
      if (u!=null){
        u.sendEmailVerification();
      }else {
        console.error("An error occured");
      }
    })
    .then(() => {
      window.alert("Verification email sent");
      this.router.navigate(['verifyEmail']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  get userId():string{
    let a = JSON.parse(localStorage.getItem('user') || '{}').uid;
    return a;
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  get isJustLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.email!== undefined) ? true : false;
  }
  get isUserAdmin():boolean{
    if(JSON.parse(localStorage.getItem('fireUser')|| '{}')==true){
      return true;
    }else{
      return false;
    }
  }
  
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  getUserEmail(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.email !== false) ? user.email : "";
  }

  getUserName(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.displayName !== "") ? user.displayName : "Anonymous";
  }

  getUserPhoto(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.photoURL !== "") ? user.photoURL : "";
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
       this.ngZone.run(() => {
        const queryParams: any = {};
        queryParams.settings = JSON.stringify({"reloadRequired":true});
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        // window.alert('You need to refresh the home page to load your profile.');
        this.homeDataProvider.data={refresh:true};
        this.router.navigate(['']);
        })
      this.SetUserData(result.user);
      // window.alert("Auhtorisation successful ");
    }).catch((error:any) => {
      window.alert(error);
    })
  }

  SetUserData(user:any,displayName?: string,photo?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    if (user.displayName===undefined || user.photoURL===undefined){
      var userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: displayName!,
        photoURL: photo!,
        emailVerified: user.emailVerified,
        cartItems:[],
        orders:[],
        isAdmin:false,
        totalCancelled:[],
      }
    }else{
      var userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        cartItems:[],
        orders:[],
        isAdmin:false,
        totalCancelled:user.totalCancelled || [],
      }
    }
    const analyticsRef = this.afs.firestore.collection('adminData').doc('AnalyticsData');
    var analyticsRefData = analyticsRef.get().then((data)=>{
      var dts = data.data()!
      this.previousTotalUsers=dts.totalUsers;
      analyticsRef.update({'totalUsers':this.previousTotalUsers+=1});
    });
    return userRef.set(userData, {
      merge: true
    })
    
  }

  // Sign out 
  SignOut() {
    // window.alert("Signing Out")
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('fireUser')
      this.router.navigate(['login']);
    })  
  }

}