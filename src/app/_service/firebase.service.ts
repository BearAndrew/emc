import { ProfileCard } from './../_ts/profile-card';
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
  cardFolderSnapSub = new BehaviorSubject<any>('');
  profileCardsSnapSub = new BehaviorSubject<any>('');

  constructor(private firestore: AngularFirestore,
    private authenticationService: AuthenticationService) {

    this.uid = this.authenticationService.getCurrentUser()?.uid;
    if (this.uid) {
      this.getCardFolderDB();
    }
  }



  getCardFolderDB() {
    // const db = this.firestore.collection('users-folder').doc(this.uid)
    // .set({collectionList: [{collectionName: 'cards-folder'}, {collectionName: 'emc'}]});
    const db = this.firestore.collection('users-folder').doc(this.uid)
    .snapshotChanges().pipe(map(
      (a) => {
        const data = a.payload.data();
        return data;
      }
    ));

    db.subscribe((data) => {
      this.cardFolderSnapSub.next(data);
    });
  }

  getCardFolder(): Observable<any> {
    return this.cardFolderSnapSub.asObservable();
  }



  getProfileCards(folderName: string): Observable<any>  {
    // return this.profileCardsSnapSub.asObservable();
    return this.firestore.collection('users-folder').doc(this.uid)
    .collection(folderName).snapshotChanges().pipe(map(
      (action) => {
        return action.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const res = {id: id, ...data};
          return res;
        });
      }
    ));
  }


  addProfileCard(folderName: string, cardData: ProfileCard) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection(folderName).add({...cardData}).then(() => {
      console.log('add profile card to ' + folderName + '!!');
    });
  }


  setProfileCard(folderName: string, docId: string, cardData: ProfileCard) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection(folderName).doc(docId).set({...cardData}).then(() => {
      console.log('add profile card to ' + folderName + '!!');
    });
  }


  deleteProfileCard(folderName: string, docId: string) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection(folderName).doc(docId).delete().then(() => {
      console.log('delete profile card');
    });
  }
}
