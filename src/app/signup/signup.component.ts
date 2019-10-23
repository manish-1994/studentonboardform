import {Component, Input} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Data} from '../model/model';
import {Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

export interface Food {
  value: string;
  viewvalue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
@Input('matRippleColor')


export class SignupComponent {
  foods: Food[] = [
    {value: 'class 1', viewvalue: 'class 1'},
    {value: 'class 2', viewvalue: 'class 2'},
    {value: 'class 3', viewvalue: 'class 3'},
    {value: 'class 4', viewvalue: 'class 4'},
    {value: 'class 5', viewvalue: 'class 5'},
    {value: 'class 6', viewvalue: 'class 6'},
    {value: 'class 7', viewvalue: 'class 7'},
    {value: 'class 8', viewvalue: 'class 8'},
    {value: 'class 9', viewvalue: 'class 9'},
    {value: 'class 10', viewvalue: 'class 10'}
  ];
  filecollectionref: AngularFirestoreCollection<Data>;
  file: Observable<Data[]>;
  name: Data['name'];
  adress: Data['adress'];
  gender: Data['gender'];
  email: Data['email'];
  dob: Data['dob'];
  class: Data['class'];
  profilepic: Data['profilepic'];
/*
  mid: string;
*/
  mpnum: Data['phonenumber'];
  myColor = '#00ff00';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  img: any;
  snapshot: Observable<any>;
  downloadurl: string;
  downloadurldoc: string;
  documents: Data['doc'];

  // tslint:disable-next-line:max-line-length
  constructor(public afs: AngularFirestore, public mainAppcomonent: AppComponent, public afauth: AngularFireAuth, public afStorage: AngularFireStorage) {
    this.filecollectionref = this.afs.collection<Data>('student');
    this.file = this.filecollectionref.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Data;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
    /*this.mid = this.mainAppcomonent.uid;
    this.mpnum = this.mainAppcomonent.pnum;*/
    this.mpnum = this.mainAppcomonent.pnum;
    console.log('Uid:' + this.mainAppcomonent.uid + 'mpnum' + this.mainAppcomonent.pnum);
  }

  addRecord() {

    this.afs.collection('student/').doc(this.mainAppcomonent.uid).set({
      name: this.name,
      adress: this.adress,
      gender: this.gender,
      phonenumber: this.mainAppcomonent.pnum,
      email: this.email,
      dob: this.dob,
      class: this.class,
      profilepic: this.downloadurl,
      documents: this.downloadurldoc
    });
    this.name = '';
    this.adress = '';
    this.gender = '';
    this.mpnum = '';
    this.class = '';
    this.email = '';
    this.dob = '';
    this.profilepic = '';
    this.documents = '';
    this.logout();
  }

  logout() {
    this.afauth.auth.signOut();
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadurl = await this.ref.getDownloadURL().toPromise();
        console.log(this.downloadurl);
        this.profilepic = this.downloadurl;
      })
    );

  }

  uploaddoc(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadurldoc = await this.ref.getDownloadURL().toPromise();
        console.log(this.downloadurldoc);
        this.documents = this.downloadurldoc;
      })
    );

  }
}
