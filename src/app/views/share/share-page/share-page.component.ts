import { ShareService } from './../../../_service/share.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileCard } from '../../../_ts/profile-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.css']
})
export class SharePageComponent implements OnInit {

  // public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  items: ProfileCard[];


  profileCardSub: Subscription;
  filter = null;

  constructor(private shareService: ShareService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const uid = params.get('uid');
      const folderName = params.get('folderName');
      console.log('uid : ' + uid + ', folderName: ' + folderName);

      this.profileCardSub = this.shareService.getCardFolder(uid, folderName).subscribe(
        (data) => {
          this.items = data;
          console.log('getProfileCards: ' + JSON.stringify(data));
        }
      );
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.profileCardSub.unsubscribe();
  }


  routeToEdit(i: number) {
    this.router.navigate([i], { relativeTo: this.route });
  }


  add() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
