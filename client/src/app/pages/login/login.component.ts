import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  //userData = false;

  userInfo: any = false
  userData: any = {}
  user_disabled: boolean = false
  fullUserData: any


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.loginFormFunc();
  }
  loginFormFunc() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
   // console.log('this.loginForm.value', this.loginForm.value);
    // const formData = new FormData();
    // formData.append('email', this.loginForm.value.email);
    // formData.append('password', this.loginForm.value.password);

    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    const request = {
      params: data,
      method: 'POST',
      action_url: 'user/user_login',
    };

    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log("res in login", res)
          //console.log(res.token);
          localStorage.setItem('auth-token', res.token);
          this.httpService.token = res.token;
          this.httpService.userData = res.userId;

          this.router.navigate(['user']);

       
        }
      },
      (err) => {
        console.log('err', err);
        alert(err.error.msg);
        this.loginForm.reset();
      }
    );
  }

  goToRegisterPage() {
    let route = 'register';
    this.router.navigate([route]);
  }

  goToForgetPasswordPage() {
    this.router.navigate(["forgetpassword"]);

  }


 
  getUserData() {
    const request = {
      method: 'GET',
      action_url: 'user/get_user_profile',
    }
    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log("get user data at login cmpnt", res.data)
          this.userInfo = true
          this.userData = res.data
          this.httpService.userData = this.userData
          this.httpService.setItem('userData', JSON.stringify(this.userData))


          if (this.userData.role.length == 1) {
            this.goTo(this.userData.role[0])
          }
        } else {
          if (res.data.user_disabled) {
            this.user_disabled = true
            localStorage.clear()
            this.fullUserData = res.data.fullUserData
            // console.log('this.fullUserData', this.fullUserData)
          }
        }
      },
      (error: any) => {
        console.log('error here', error)
      },
    )
  }



  goTo(type: any) {
    console.log("type", type)
    this.httpService.playingRole = type
    this.httpService.setItem('playingRole', type)
    const request = {
      method: 'GET',
      action_url: 'user/get_user_module_permissions',
    }
    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
         // console.log("res of module permision", res.data)
          this.httpService.menuData = res['data']
          this.httpService.setItem('menuData', JSON.stringify(res['data']))
          this.router.navigate(['user/dashboard'])
        }
      },
      error => { },
    )
  }

}
