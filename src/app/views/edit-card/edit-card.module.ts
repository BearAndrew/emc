import { EditCardComponent } from './edit-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastModule } from 'primeng/toast';

import { EditCardRoutingModule } from './edit-card-routing.module';


@NgModule({
  declarations: [ EditCardComponent],
  imports: [
    CommonModule,
    EditCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    DragDropModule,
    ModalModule,
    ClipboardModule,
    ToastModule
  ]
})
export class EditCardModule { }
