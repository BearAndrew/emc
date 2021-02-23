import { FirebaseService } from './../../_service/firebase.service';
import {Component} from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../_service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  urlTreeString: string[] = ['首頁', '資料夾', '卡片'];
  urlTreeArray: any[] = [];

  constructor(private authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        console.log(event.url);
        const urlElementArray = event.url.split('/');
        urlElementArray.shift(); // remove first element, because it is empty
        console.log(urlElementArray[0]);
        let url = ''; // save parent url, ex. /dashboard,  /dashboard/card-folder
        this.urlTreeArray = [];
        if (urlElementArray[0] === '') {
          const urlTreeElement = {url: '/dashboard', data: '首頁'};
          this.urlTreeArray.push(urlTreeElement);
        } else {
          let isShare = false;
          if (urlElementArray[0] === 'share') {
            isShare = true;
            urlElementArray.shift();
            url = 'share';
          }
          urlElementArray.forEach((value, index) => {
            url = url + '/' + value;
            const urlTreeElement = {url: url, data: this.urlTreeString[index]};
            this.urlTreeArray.push(urlTreeElement);
          });
          if (isShare) {
            this.urlTreeArray.shift();
          }
        }

    }});

    this.navItems[2].url += '/' + this.firebaseService.uid + '/2Hzr0tqqza0jmchTB2NF';
    console.log(this.navItems[2]);
  }

  urlBread(event) {
    console.log(event.url);
    const urlElementArray = event.url.split('/');
    urlElementArray.shift(); // remove first element, because it is empty
    let url = ''; // save parent url, ex. /dashboard,  /dashboard/card-folder
    this.urlTreeArray = [];
    if (urlElementArray[0] === '') {
      const urlTreeElement = {url: '/dashboard', data: 'dashboard'};
      this.urlTreeArray.push(urlTreeElement);
    } else {
      for (const urlElement of urlElementArray) {
        url = url + '/' + urlElement;
        const urlTreeElement = {url: url, data: urlElement};
        this.urlTreeArray.push(urlTreeElement);
      }
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authenticationService.logout();
  }
}
