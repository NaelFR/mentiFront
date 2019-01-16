import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  },
  {
    path: 'session/:id',
    component: SessionComponent,
  },
  {
    path: 'admin/:id',
    component: AdminComponent,
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
