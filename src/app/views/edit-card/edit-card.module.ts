import { EditCardComponent } from './edit-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

import { EditCardRoutingModule } from './edit-card-routing.module';


@NgModule({
  declarations: [ EditCardComponent ],
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
    ToastModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CalendarModule
  ]
})
export class EditCardModule { }
