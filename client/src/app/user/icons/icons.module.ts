import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { IconsDashComponent } from './icons-dash/icons-dash.component';
import { RouterModule, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
const routes: Routes = [
  {
    path: '',
    component: IconsComponent,

    children: [
      {
        path: '',
        redirectTo: 'icons-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'icons-dashboard',
        data: { title: 'icons-dashboard' },
        component: IconsDashComponent,
      },
   
    ],
  },
]

@NgModule({
  declarations: [
    IconsComponent,
    IconsDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ClipboardModule
  ]
})
export class IconsModule { }
