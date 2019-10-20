import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pnum: string;
  uid: string;


  constructor(public afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
        console.log('Uid:', this.uid);
        this.pnum = auth.phoneNumber;
      }
    });

  }

}
