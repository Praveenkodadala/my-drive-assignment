import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VqComponent } from './vq.component';
import { VqDashComponent } from './vq-dash/vq-dash.component';
import { RouterModule, Routes } from '@angular/router'
import { MateralModule } from 'src/app/materal.module';
import { CreateVqComponent } from './create-vq/create-vq.component';


const routes: Routes = [
  {
    path: '',
    component: VqComponent,

    children: [
      {
        path: '',
        redirectTo: 'myDrive-dash',
        pathMatch: 'full',
      },
      {
        path: 'myDrive-dash',
        data: { title: 'myDrive-dash' },
        component: VqDashComponent,
      },
      {
        path: 'vqForm',
        data: { title: 'Create VQ' },
        component: CreateVqComponent,
      },
   
    ],
  },
]

@NgModule({
  declarations: [
    VqComponent,
    VqDashComponent,
    CreateVqComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MateralModule
  ]
})
export class VqModule { }
