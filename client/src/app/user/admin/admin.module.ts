import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ListAdminComponent } from './list-admin/list-admin.component'
import { MateralModule } from 'src/app/materal.module';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: '',
        redirectTo: 'list-admin',
        pathMatch: 'full',
      },
      {
        path: 'list-admin',
        data: { title: 'List Admin' },
        component: ListAdminComponent,
      },
      {
        path: 'add-admin',
        data: { title: 'vq-dash' },
        component: AddAdminComponent,
      },
   
   
    ],
  },
]


@NgModule({
  declarations: [
    AdminComponent,
    AddAdminComponent,
    ListAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MateralModule
  ]
})
export class AdminModule { }
