import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../_service/firebase.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProfileCard, noteListName } from '../../_ts/profile-card';
import { colorList, markList } from '../../_ts/variable';
import { COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  providers: [
    MessageService,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-tw'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class EditCardComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('moveModal') public moveModal: ModalDirective;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  //#region ====================== variable ======================
  fg: FormGroup;
  urlDocId: string; // 第幾張卡片 card index
  urlFolderId: string; // 資料夾名稱
  uid: string;  // firebase user id
  cardId: string; // firebase card id
  pCard: ProfileCard;
  folderList: any[]; // 取得所有資料夾名稱
  noteListName = noteListName; // 筆記 親情 友情 愛情 工作
  colorList = colorList; // 卡片顏色
  pTagColor = colorList[0]; // Tag顏色
  markList = markList;
  clipValue: string; // 剪貼簿暫存值
  domain = 'https://bearandrew.github.io'; // copy url domain
  isLoading = true;

  // 編輯按鈕判斷
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

  profileCardSub: Subscription;
  cardFolderSub: Subscription;

  //#region ====================== calendar variable ======================
  birthday: Date;
  zh: any; // 語言:中文
  calendarTouch: boolean; // 手機模式
  today: Date;
  moment: moment.Moment; // calendar 用 moment 而不是用 Date
  birthAge: number; // 生日計算年紀
  birthConstellation: string; // 生日計算星座
  //#endregion ====================== calendar ======================
  //#endregion ====================== variable ======================

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder) {

    this.pCard = new ProfileCard();

    this.route.paramMap.subscribe(params => {
      this.urlFolderId = params.get('folder');
      this.urlDocId = params.get('id');

      if (this.urlDocId !== 'new') {
        this.profileCardSub = firebaseService.getProfileCards(this.urlFolderId).subscribe(
          (data) => {
            if (data) {
              this.isLoading = false;
              console.log('edit-card getProfileCards: ' + JSON.stringify(data[this.urlDocId]));
              this.cardId = data[this.urlDocId].id;
              delete data[this.urlDocId].id;
              data[this.urlDocId].birthday = (data[this.urlDocId].birthday) ?
              new Date(data[this.urlDocId].birthday?.seconds * 1000) : null;
              data[this.urlDocId].lastEditTime = new Date(data[this.urlDocId].lastEditTime?.seconds * 1000);
              this.pCard = data[this.urlDocId];

              // set clip url
              this.uid = this.firebaseService.uid;
              this.clipValue = 'https://' + window.location.host +
              '/profileCard/share/' + this.uid + '/' + this.urlFolderId + '/' + this.cardId;
            }
        });
      }
    });

    this.cardFolderSub = this.firebaseService.getCardFolder().subscribe((data) => {
      if (data !== '') {
        console.log('getCardFolder: ' + data);
        this.folderList = data;
      }
    });


    // share folder radio
    this.fg = fb.group({
      folder: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //#region ====================== calendar init ======================
    this.calendarTouch = (window.innerWidth < 576) ? true : false;
    this.today = new Date();
    this.zh = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
      today: '今天',
      clear: '清除',
      dateFormat: 'yy.mm.dd',
      weekHeader: 'Week'
    };
    //#endregion ====================== calendar init ======================
  }


  ngOnDestroy() {
    if (this.profileCardSub) {this.profileCardSub.unsubscribe(); }
    if (this.cardFolderSub) {this.cardFolderSub.unsubscribe(); }
  }

  //#region ====================== firebase ======================
  save() {
    console.log(this.pCard);
    if (this.urlDocId !== 'new') {
      this.firebaseService.setProfileCard(this.urlFolderId, this.cardId, this.pCard);
    } else {
      this.firebaseService.addProfileCard(this.urlFolderId, this.pCard);
    }
    this.addToast('已儲存');
  }


  deleteCard() {
    this.firebaseService.deleteProfileCard(this.urlFolderId, this.cardId);
    this.router.navigate(['../'] , {relativeTo: this.route});
  }


  moveCard(folderId: string) {
    this.firebaseService.setProfileCard(folderId, this.cardId, this.pCard);
    this.firebaseService.deleteProfileCard(this.urlFolderId, this.cardId);
    this.router.navigate(['../../' + folderId] , {relativeTo: this.route});
  }
  //#endregion ====================== firebase ======================

  //#region ====================== chip ======================
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
  //#endregion ====================== chip ======================

  //#region ====================== birthday to age and constellation ======================
  setBirthday(moment: moment.Moment) {
    this.pCard.birthday = moment.toDate();
    console.log(this.pCard.birthday);

    this.birthAge = this.getAge(this.pCard.birthday);
    this.birthConstellation = this.getConstellation(this.pCard.birthday);
    this.pCard.age = this.birthAge;
    this.pCard.constellation = this.birthConstellation;
  }


  getConstellation(birthday: Date): string {
    const month = birthday.getMonth() + 1;
    const day = birthday.getDate();
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) {
      return '摩羯座';
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 19)) {
      return '水瓶座';
    } else if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) {
      return '雙魚座';
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return '牡羊座';
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 21)) {
      return '金牛座';
    } else if ((month === 5 && day >= 22) || (month === 6 && day <= 21)) {
      return '雙子座';
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return '巨蠍座';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
      return '獅子座';
    } else if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
      return '處女座';
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
      return '天秤座';
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
      return '天蠍座';
    } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
      return '射手座';
    } else {
      return '';
    }
  }

  getAge(birthday: Date): number { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  //#endregion ====================== birthday to age and constellation ======================

  //#region ====================== other ======================
  setAllTagColor(color: string) {
    console.log(this.pCard);
    for (const note of this.pCard.noteList) {
      const keywords = note.keywords;
      for (const keyword of keywords) {
        keyword.class = color;
      }
    }
  }

  addToast(detail: string) {
    // this.messageService.clear();
    this.messageService.add({key: 'bc', severity: 'success', summary: '成功', detail: detail});
  }

  closeEditToggle(key: string, value: boolean, index?: number) {
    this.editToggle.title = false;
    this.editToggle.job = false;
    this.editToggle.department = false;
    this.editToggle.comment = false;
    this.editToggle.remark = false;
    for (let i = 0 ; i < this.editToggle.noteList.length ; i++) {
      this.editToggle.noteList[i] = false;
    }
    if (index !== undefined) {
      this.editToggle[key][index] = !value;
    } else {
      this.editToggle[key] = !value;
    }
  }
  //#endregion ====================== other ======================

  // drop(array: any[], event: CdkDragDrop<any[]>) {
  //   moveItemInArray(array, event.previousIndex, event.currentIndex);
  // }
}
