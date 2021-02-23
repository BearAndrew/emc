import { ShareService } from './../../_service/share.service';
import { Component, OnInit } from '@angular/core';
import { noteListName, ProfileCard } from '../../_ts/profile-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  pCard: ProfileCard;
  noteListName = noteListName;
  isGetDB = false;

  constructor(private route: ActivatedRoute, private shareService: ShareService ) {
    this.pCard = new ProfileCard();
    this.route.paramMap.subscribe(params => {
      const uid = params.get('uid');
      const folderId = params.get('folderId');
      const cardId = params.get('cardId');

      shareService.getProfileCardsDB(uid, folderId, cardId).subscribe(
        (data) => {
          console.log(data);
          this.pCard = data;
          this.isGetDB = true;
      });
    });
  }

  ngOnInit(): void {
  }

}
