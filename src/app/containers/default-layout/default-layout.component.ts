import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../_service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private authenticationService: AuthenticationService) {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authenticationService.logout();
  }
}
