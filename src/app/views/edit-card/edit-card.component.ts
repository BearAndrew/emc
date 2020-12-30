import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../_service/firebase.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProfileCard, noteListName } from '../../_ts/profile-card';
import { colorList } from '../../_ts/color';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  providers: [MessageService]
})
export class EditCardComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('moveModal') public moveModal: ModalDirective;

  fg: FormGroup;
  urlId: string; // 第幾張卡片 card index
  urlFolderName: string; // 資料夾名稱
  uid: string;  // firebase user id
  docId: string;
  pCard: ProfileCard;
  folderList: any[];
  noteListName = noteListName;
  colorList = colorList;
  pTagColor = colorList[0];
  clipValue: string;
  domain = 'https://bearandrew.github.io'; // copy url domain

  editToggle = {
    title: false,
    job: false,
    department: false,
    noteList: [
      false, false, false, false, false
    ],
    comment: false,
    remark: false
  };

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [
    {name: 'Lemon', class: 'blue'},
    {name: 'Lime', class: 'blue'},
    {name: 'Apple', class: 'blue'},
    {name: '1', class: 'blue'},
    {name: '2', class: 'blue'},
    {name: '3', class: 'blue'},
    {name: '4', class: 'blue'},
    {name: '8', class: 'blue'},
  ];

  profileCardSub: Subscription;
  cardFolderSub: Subscription;

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder) {

    this.pCard = new ProfileCard();

    this.route.paramMap.subscribe(params => {
      this.urlFolderName = params.get('folder');
      this.urlId = params.get('id');

      if (this.urlId !== 'new') {
        this.profileCardSub = firebaseService.getProfileCards(this.urlFolderName).subscribe(
          (data) => {
            if (data) {
              console.log('edit-card getProfileCards: ' + JSON.stringify(data[this.urlId]));
              this.pCard = data[this.urlId];
              this.docId = data[this.urlId].id;

              // set clip url
              this.uid = this.firebaseService.uid;
              this.clipValue = 'https://' + window.location.host +
              '/profileCard/share/' + this.uid + '/' + this.urlFolderName + '/' + this.docId;
            }
        });
      }
    });

    this.cardFolderSub = this.firebaseService.getCardFolder().subscribe((data) => {
      if (data !== '') {
        this.folderList = data.collectionList;
      }
    });


    this.fg = fb.group({
      folder: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    if (this.profileCardSub) {this.profileCardSub.unsubscribe(); }
    if (this.cardFolderSub) {this.cardFolderSub.unsubscribe(); }
  }


  save() {
    console.log(this.pCard);
    if (this.urlId !== 'new') {
      this.firebaseService.setProfileCard(this.urlFolderName, this.docId, this.pCard);
    } else {
      this.firebaseService.addProfileCard(this.urlFolderName, this.pCard);
    }
    this.addToast('已儲存');
  }


  deleteCard() {
    this.firebaseService.deleteProfileCard(this.urlFolderName, this.docId);
    this.router.navigate(['../'] , {relativeTo: this.route});
  }


  moveCard(folderName: string) {
    this.firebaseService.setProfileCard(folderName, this.docId, this.pCard);
    this.firebaseService.deleteProfileCard(this.urlFolderName, this.docId);
    this.router.navigate(['../../' + folderName] , {relativeTo: this.route});
  }


  setColor(color: string) {
    console.log(this.pCard);
    for (const note of this.pCard.noteList) {
      const keywords = note.keywords;
      for (const keyword of keywords) {
        keyword.class = color;
      }
    }

    console.log(this.pCard.noteList[0].keywords);
  }


  addToast(detail: string) {
    // this.messageService.clear();
    this.messageService.add({key: 'bc', severity: 'success', summary: '成功', detail: detail});
  }


  add(array: any[] , cssClass: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      array.push({name: value.trim(), class: cssClass});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  remove(array: any[], item: any): void {
    const index = array.indexOf(item);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }


  drop(array: any[], event: CdkDragDrop<any[]>) {
    moveItemInArray(array, event.previousIndex, event.currentIndex);
  }

}
