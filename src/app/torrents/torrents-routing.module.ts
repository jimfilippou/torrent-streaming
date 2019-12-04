import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TorrentsComponent } from './torrents.component';

const routes: Routes = [
  {path: '', component: TorrentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TorrentsRoutingModule { }
