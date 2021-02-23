import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private firestore: AngularFirestore) { }


  getProfileCardsDB(uid: string, folderId: string, cardId: string): Observable<any> {
    return this.firestore.collection('users-folder').doc(uid)
    .collection('card-folder').doc(folderId).collection('card').doc(cardId).valueChanges();
  }

  getCardFolder(uid: string, folderId: string): Observable<any>  {
    // return this.profileCardsSnapSub.asObservable();
    return this.firestore.collection('users-folder').doc(uid)
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

}
