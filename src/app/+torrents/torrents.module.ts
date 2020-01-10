import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorrentsRoutingModule } from './torrents-routing.module';
import { TorrentsComponent } from './torrents.component';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		TorrentsComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		TorrentsRoutingModule,
		MatButtonModule,
		MatProgressSpinnerModule
	]
})
export class TorrentsModule {
}
