import { ProfileCard } from './../_interface/profile-card';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  uid;
  profileCardsSnapSub = new BehaviorSubject<any>('');

  constructor(private firestore: AngularFirestore,
    private authenticationService: AuthenticationService) {

    this.uid = this.authenticationService.getCurrentUser().uid;
    if (this.uid) {this.getProfileCardsDB();}
  }



  private getProfileCardsDB() {
    const db = this.firestore.collection('users-folder').doc(this.uid)
    .collection('cards-folder').snapshotChanges().pipe(map(
      (action) => {
        return action.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const res = {id: id, ...data};
          return res;
        });
      }
    ));
    db.subscribe((data) => {
      console.log('db: ' + JSON.stringify(data));
      this.profileCardsSnapSub.next(data);
    });


    // this.firestore.collection('users-folder').doc(this.uid)
    // .collection('cards-folder').snapshotChanges().subscribe((data) => {
    //   console.log(data);
    // });
  }


  getProfileCards(): Observable<any>  {
    return this.profileCardsSnapSub.asObservable();
  }


  addProfileCard(cardData: ProfileCard) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('cards-folder').add({...cardData}).then(() => {
      console.log('add profile card');
    });
  }


  setProfileCard(docId: string, cardData: ProfileCard) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('cards-folder').doc(docId).set({...cardData}).then(() => {
      console.log('set profile card');
    });
  }


  deleteProfileCard(docId: string) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('cards-folder').doc(docId).delete().then(() => {
      console.log('delete profile card');
    });
  }
}
