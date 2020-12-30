import { CardFolderModule } from './../card-folder/card-folder.module';
import { EditCardComponent } from './../edit-card/edit-card.component';
import { CardFolderComponent } from './../card-folder/card-folder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: ':folder',
    loadChildren: () => import('../card-folder/card-folder.module').then(m => m.CardFolderModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
