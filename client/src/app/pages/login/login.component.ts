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

          this.userData = res.userData
          this.httpService.userData = this.userData
          this.httpService.setItem('userData', JSON.stringify(this.userData))
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


 


}
