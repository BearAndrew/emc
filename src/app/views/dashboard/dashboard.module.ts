import { EditCardComponent } from './../edit-card/edit-card.component';
import { CardFolderComponent } from './../card-folder/card-folder.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    DragDropModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ModalModule,
    ClipboardModule,
    ToastModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
