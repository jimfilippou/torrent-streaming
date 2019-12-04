import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorrentsRoutingModule } from './torrents-routing.module';
import { TorrentsComponent } from './torrents.component';


@NgModule({
  declarations: [
    TorrentsComponent
  ],
  imports: [
    CommonModule,
    TorrentsRoutingModule
  ]
})
export class TorrentsModule { }
