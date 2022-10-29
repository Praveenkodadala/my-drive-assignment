import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSubsComponent } from './list-subs/list-subs.component';
import { AddSubsComponent } from './add-subs/add-subs.component';
import { SubscriberComponent } from './subscriber.component';
import { RouterModule, Routes } from '@angular/router';
import { MateralModule } from 'src/app/materal.module';


const routes: Routes = [
  {
    path: '',
    component: SubscriberComponent,
   
    children: [
      {
        path: '',
        redirectTo: 'list-subs',
        pathMatch: 'full',
      },
      {
        path: 'add-sub',
        data: { title: 'Add Subscriber' },
        component: AddSubsComponent,
      },
      {
        path: 'list-subs',
        data: { title: 'List Subscriber' },
        component: ListSubsComponent,
      },
  
   
    ],
  },
]


@NgModule({
  declarations: [
    ListSubsComponent,
    AddSubsComponent,
    SubscriberComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MateralModule,

  ]
})
export class SubscriberModule { }
