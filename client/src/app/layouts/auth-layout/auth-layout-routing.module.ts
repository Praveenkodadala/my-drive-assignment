import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { ForgetPasswordComponent } from 'src/app/pages/forget-password/forget-password.component';
import { OtpNewpasswordComponent } from 'src/app/pages/otp-newpassword/otp-newpassword.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        data: { title: 'login' },
        component: LoginComponent,
      },
      {
        path: 'register',
        data: { title: 'register' },
        component: RegisterComponent,
      },
      {
          path: 'forgetpassword',
          data: { title: 'forgetpassword' },
          component: ForgetPasswordComponent,
      },
      {
        path: 'newpassword',
        data: { title: 'newpassword' },
        component: OtpNewpasswordComponent,
    }
   
    ]

  },
]

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }

