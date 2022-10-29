import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
