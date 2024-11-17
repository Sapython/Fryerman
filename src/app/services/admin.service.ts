import { InventoryService } from './inventory.service';
import { AuthService } from './auth.service';
import { Component, Injectable, NgZone } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../services/user';
import auth from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class adminService {
  userData: Observable<any>;
  constructor(
    private authService: AuthService,
    public afs: AngularFirestore,
    private storage: AngularFireStorage, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public inventoryService: InventoryService
  ) {
    this.userData = this.afs
      .collection<any>(`users`)
      .doc(this.authService.userId)
      .valueChanges();
  }
  get isAdmin(): boolean {
    this.getUserData().subscribe((userData) => {
      var isAdminValue: boolean;
      isAdminValue = userData.isAdmin;
    });
    return true;
  }
  getUserData() {
    return this.userData;
  }
}
