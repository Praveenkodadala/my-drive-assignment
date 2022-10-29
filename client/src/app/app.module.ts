import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthLayoutRoutingModule } from './layouts/auth-layout/auth-layout-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { OtpNewpasswordComponent } from './pages/otp-newpassword/otp-newpassword.component'
import { UserGuardGuard } from './guards/user-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordComponent,
    OtpNewpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AuthLayoutRoutingModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
   providers: [UserGuardGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
