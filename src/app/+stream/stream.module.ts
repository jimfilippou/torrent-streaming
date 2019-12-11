import {StreamComponent} from './stream.component'
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {streamRoutingModule} from './stream-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
	declarations: [StreamComponent],
	imports: [
		CommonModule,
		streamRoutingModule,
		FormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatRadioModule,
		MatSnackBarModule
	]
})
export class StreamModule {
}
