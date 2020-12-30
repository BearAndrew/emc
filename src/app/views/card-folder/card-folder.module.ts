import { CardFolderComponent } from './card-folder.component';
import { EditCardComponent } from './../edit-card/edit-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardFolderRoutingModule } from './card-folder-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastModule } from 'primeng/toast';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ CardFolderComponent ],
  imports: [
    CommonModule,
    CardFolderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    DragDropModule,
    ModalModule,
    ClipboardModule,
    ToastModule,
    Ng2SearchPipeModule
  ]
})
export class CardFolderModule { }
