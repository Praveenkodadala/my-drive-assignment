import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMydriveHeadComponent } from './common-mydrive-head/common-mydrive-head.component';
import { MydriveDashboardComponent } from './mydrive-dashboard/mydrive-dashboard.component';
import { MydriveFolderViewComponent } from './mydrive-folder-view/mydrive-folder-view.component';
import { RouterModule, Routes } from '@angular/router'
import { MyDriveComponent } from './my-drive.component'

const routes: Routes = [
  {
    path: '',
    component: MyDriveComponent,

    children: [
      {
        path: '',
        redirectTo: 'mydrive-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'mydrive-dashboard',
        data: { title: 'mydrive Dashboard' },
        component: MydriveDashboardComponent,
      },
      {
        path: 'folder',
        data: { title: 'Folder View' },
        component: MydriveFolderViewComponent,
      },
    ],
  },
]

@NgModule({
  declarations: [
    MyDriveComponent,
    CommonMydriveHeadComponent,
    MydriveDashboardComponent,
    MydriveFolderViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MyDriveModule { }
