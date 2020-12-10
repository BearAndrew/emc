import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private firestore: AngularFirestore) { }


  getProfileCardsDB(uid: string, docId: string): Observable<any> {
    return this.firestore.collection('users-folder').doc(uid)
    .collection('cards-folder').doc(docId).valueChanges();
  }

}
