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
import { OtpNewpasswordComponent } from './pages/otp-newpassword/otp-newpassword.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n'

registerLocaleData(en);



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
   providers: [{ provide: NZ_I18N, useValue: en_US }],

  bootstrap: [AppComponent]
})
export class AppModule { }
