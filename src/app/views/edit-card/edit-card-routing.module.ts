import { EditCardComponent } from './edit-card.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EditCardComponent,
    data: {
      title: '卡片'
    }
  },
  {
    path: ':cardId',
    component: EditCardComponent,
    data: {
      title: '卡片'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCardRoutingModule { }
