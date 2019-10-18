import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Data} from './model/model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import actions from '@angular/fire/schematics/deploy/actions';
import {AngularFireAuth} from '@angular/fire/auth';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private pnum: string;
  private uid: string;


  constructor(public afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
        console.log('Uid:', this.uid);
        this.pnum = auth.phoneNumber;
      }
    });

  }
  logout() {
    this.afauth.auth.signOut();
  }
}
