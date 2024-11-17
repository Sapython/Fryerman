import { AuthService } from './auth.service';
import { Component, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
// import { ProductCatelogue } from '../home/home.component';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { User } from './user';

export interface ProductCatalogue {
  ID?: string;
  Name?: string;
  isVeg?: string;
  Description?: string;
  image?: string;
  Price?: string;
}
export interface UserCatalogue {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  uid: string;
  cartProducts: string[];
}
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  // productCollection: AngularFirestoreCollection<ProductCatelogue>;
  drinks: Observable<ProductCatalogue>;
  vegs: Observable<ProductCatalogue>;
  nonVegs: Observable<ProductCatalogue>;
  userTempData:Observable<any>;
  analytics:Observable<any>;
  userData: Observable<any>;
  allOrders:Observable<any>;
  allUserOrders:Observable<any>;
  downloadURL: Observable<string> | undefined;
  allProducts:any[]=[];
  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    this.analytics=this.afs.collection<any>('users').valueChanges();
    this.drinks = this.afs.collection<any>('Products').doc('Drinks').valueChanges();
    this.userTempData = this.afs.collection<any>('users').doc(this.authService.userId).valueChanges();
    this.vegs = this.afs.collection<any>('Products').doc('VegProducts').valueChanges();
    this.nonVegs = this.afs.collection<any>('Products').doc('NonVegProducts').valueChanges();
    this.userData = this.afs.collection<any>(`users`).doc(this.authService.userId).valueChanges();
    this.allOrders = this.afs.collection<any>('adminData').doc('Orders').collection('AllOrders').valueChanges();
    this.allUserOrders = this.afs.collection<any>('users').doc(this.authService.userId).collection('orders').valueChanges();
  }
  getAllUserCount(){
    return this.analytics;
  }
  getDrinks() {
    return this.drinks;
  }
  getVegProducts() {
    return this.vegs;
  }
  getNonVegProducts() {
    return this.nonVegs;
  }
  getUserData() {
    return this.userData;
  }
  getAllOrders(){
    return this.allOrders;
  }
  getAllUserOrder(){
    return this.allUserOrders;
  }
  saveCartItems(data: any) {
    const Data={
      cartItems:data
    }
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(this.authService.userId);
    userRef.set(Data,{merge:true});
  }
  saveCheckoutData(data:any){
    const adminRef=this.afs.firestore.collection('adminData').doc('Orders').collection('AllOrders');
    adminRef.add(data);
    let userDoc = this.afs.firestore.collection(`users/${this.authService.userId}/orders`);
    userDoc.add(data);
    // console.log("Saved the data ",data);
    return true;
  }
  addQuery(Data:any){
    const userRef = this.afs.firestore.collection('adminData').doc('clientQueries').collection('questions');
    var result = userRef.add(Data);
    // alert(result);
  }
  getTempCartData(){
    return this.userTempData;
  }
  removeTempData(){
    let cartRef = this.afs.firestore.collection(`users`).doc(this.authService.userId);
    cartRef.update({ tempOrderData:firebase.firestore.FieldValue.delete() });
    return true;
  }
  removeDataFromCart(){
    let cartRef = this.afs.firestore.collection(`users`).doc(this.authService.userId);
    cartRef.update({ cartItems:firebase.firestore.FieldValue.delete() });
    return true;
  }

  checkAdmin() {
    this.getUserData().subscribe((userData) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.isAdmin = userData.isAdmin;
    });
  }

  get isAdmin() {
    var dataList: [];
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.afs
      .doc(`users/${user.uid}/isAdmin`)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          return { isAdmin: data };
        })
      );
  }
  get isLocalAdmin(){
    return JSON.parse(localStorage.getItem('user') || '{}').isAdmin;
  }

  uploadFile(file: any, userName: string) {
    this.afs.firestore.app.storage;
    var n = Date.now();
    const filePath = userName + n.toString();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // url=this.downloadURL;
        })
      )
      .subscribe();
    return this.downloadURL;
  }
}
