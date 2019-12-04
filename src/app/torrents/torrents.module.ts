import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorrentsRoutingModule } from './torrents-routing.module';
import { TorrentsComponent } from './torrents.component';
import { MatButtonModule, MatButton, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TorrentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TorrentsRoutingModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class TorrentsModule { }
