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
  selector: 'app-otp-newpassword',
  templateUrl: './otp-newpassword.component.html',
  styleUrls: ['./otp-newpassword.component.css']
})
export class OtpNewpasswordComponent implements OnInit {

  otpNewPassForm: any;
  userData = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.otpNewPassFormFunc();
  }
  otpNewPassFormFunc() {
    this.otpNewPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otpCode:['', [Validators.required]],
      newpassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('this.loginForm.value', this.otpNewPassForm.value);

    let data = {
      email: this.otpNewPassForm.value.email,
      otpCode:this.otpNewPassForm.value.otpCode,
      newpassword: this.otpNewPassForm.value.newpassword,
    };
    const request = {
      params: data,
      method: 'POST',
      action_url: 'user/change_password_by_otp',
    };
    console.log('request', request);

    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
         console.log(res.msg)
         alert(res.msg);
         this.router.navigate(["login"]);
        }else{
          alert(res.msg);
          this.otpNewPassForm.reset();
        }
      },
      (err) => {
        console.log('err', err);
        alert(err.error.msg);
        this.otpNewPassForm.reset();
      }
    );
  }

  goToRegisterPage() {
    let route = 'register';
    this.router.navigate([route]);
  }

  goToForgetPasswordPage(){
    this.router.navigate(["forgetpassword"]);

  }

}
