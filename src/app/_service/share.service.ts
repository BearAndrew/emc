import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private firestore: AngularFirestore) { }


  getProfileCardsDB(uid: string, folderName: string, docId: string): Observable<any> {
    return this.firestore.collection('users-folder').doc(uid)
    .collection(folderName).doc(docId).valueChanges();
  }

  getCardFolder(uid: string, folderName: string): Observable<any>  {
    // return this.profileCardsSnapSub.asObservable();
    return this.firestore.collection('users-folder').doc(uid)
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

}
