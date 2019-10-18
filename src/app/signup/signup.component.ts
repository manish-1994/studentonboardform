import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Data} from '../model/model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {AngularFireAuth} from '@angular/fire/auth';


export interface Food {
  value: string;
  viewvalue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  foods: Food[] = [
    {value: '0', viewvalue: 'class 1'},
    {value: '0', viewvalue: 'class 2'},
    {value: '0', viewvalue: 'class 3'},
    {value: '0', viewvalue: 'class 4'},
    {value: '0', viewvalue: 'class 5'},
    {value: '0', viewvalue: 'class 6'},
    {value: '0', viewvalue: 'class 7'},
    {value: '0', viewvalue: 'class 8'},
    {value: '0', viewvalue: 'class 9'},
    {value: '0', viewvalue: 'class 10'}
  ];
  filecollectionref: AngularFirestoreCollection<Data>;
  file: Observable<Data[]>;
  name: Data['name'];
  adress: Data['adress'];
  gender: Data['gender'];
  phonenumber: Data['phonenumber'];
  email: Data['email'];
  dob: Data['dob'];
  class: Data['class'];

  uid: string;
  pnum: string;

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
