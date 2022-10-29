import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'





const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
]

@NgModule({
  declarations: [
    UserProfileComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
 
  ]
})
export class UserProfileModule { }
