import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StreamComponent} from './stream.component';

const routes: Routes = [
  {path: '', component: StreamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class streamRoutingModule { }
