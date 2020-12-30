import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CardFolderComponent } from './card-folder.component';


const routes: Routes = [
  {
    path: '',
    component: CardFolderComponent,
    data: {
      title: '卡片資料夾'
    }
  },
  {
    path: '',
    loadChildren: () => import('../edit-card/edit-card.module').then(m => m.EditCardModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardFolderRoutingModule { }
