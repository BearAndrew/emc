import { ProfileCard } from './../_ts/profile-card';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  uid;
  cardFolder;
  cardFolderSnapSub = new BehaviorSubject<any>('');
  profileCardsSnapSub = new BehaviorSubject<any>('');

  constructor(private firestore: AngularFirestore,
    private authenticationService: AuthenticationService) {

    this.uid = this.authenticationService.getCurrentUser()?.uid;
    if (this.uid) {
      this.getCardFolderDB();
    }

    // this.firestore.collection('users-folder').doc(this.uid)
    // .set({collectionList: [{collectionName: 'cards-folder', collectionId: 'cards-folder'},
    // {collectionName: 'emc', collectionId: 'emc'}]});
  }



  getCardFolderDB() {
    // const db = this.firestore.collection('users-folder').doc(this.uid)
    // .snapshotChanges().pipe(map(
    //   (a) => {
    //     const data = a.payload.data();
    //     return data;
    //   }
    // ));


    // db.subscribe((data) => {
    //   this.cardFolderSnapSub.next(data);
    //   this.cardFolder = data;
    // });


    const db = this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder', ref => ref.orderBy('createTime')).snapshotChanges().pipe(map(
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
      this.cardFolderSnapSub.next(data);
    });
  }

  getCardFolder(): Observable<any> {
    return this.cardFolderSnapSub.asObservable();
  }


  addCardFolder(newFolderName: string) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').add({folderName: newFolderName, createTime: firebase.firestore.FieldValue.serverTimestamp() }).then(() => {
      console.log('add new folder ' + newFolderName + '!!');
    });
  }


  setCardFolder(folderId: string, newFolderName: string) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').doc(folderId)
    .set({folderName: newFolderName}).then(() => {
      console.log('set folder ' + folderId + 'as new name: ' + newFolderName + '!!');
    });
  }


  deleteCardFolder(folderId: string) {
    this.getProfileCards(folderId).subscribe(
      (data) => {
        for (const cardDoc of data) {
          this.deleteProfileCard(folderId, cardDoc.id);
        }

        this.firestore.collection('users-folder').doc(this.uid)
        .collection('card-folder').doc(folderId).delete().then(() => {
          console.log('delete folder ' + folderId);
        });
    });

  }



  getProfileCards(folderId: string): Observable<any>  {
    return this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').doc(folderId).collection('card', ref => ref.orderBy('createTime')).snapshotChanges().pipe(map(
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


  addProfileCard(folderId: string, cardData: ProfileCard) {
    cardData.createTime = firebase.firestore.FieldValue.serverTimestamp();
    cardData.lastEditTime = firebase.firestore.FieldValue.serverTimestamp();
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').doc(folderId).collection('card').add({...cardData}).then(() => {
      console.log('add profile card to ' + folderId + '!!');
    });
  }


  setProfileCard(folderId: string, cardId: string, cardData: ProfileCard) {
    cardData.lastEditTime = firebase.firestore.FieldValue.serverTimestamp();
    console.log('setProfileCard: ' + JSON.stringify(cardData));
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').doc(folderId).collection('card').doc(cardId)
    .set({...cardData}).then(() => {
      console.log('set profile card ' + folderId + '!!');
    });
  }


  deleteProfileCard(folderId: string, cardId: string) {
    this.firestore.collection('users-folder').doc(this.uid)
    .collection('card-folder').doc(folderId).collection('card').doc(cardId).delete().then(() => {
      console.log('delete profile card');
    });
  }

}
