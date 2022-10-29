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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm:any
  userData = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}


  ngOnInit(): void {
    this.forgetPasswordFormFunc()
  }

  forgetPasswordFormFunc() {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    
    });
  }

  onSubmit() {
    console.log('this.loginForm.value', this.forgetPasswordForm.value);

    const request = {
      params: {email: this.forgetPasswordForm.value.email} ,
      method: 'POST',
      action_url: 'user/forget_password',
    };
    console.log('request', request);

    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
        console.log(res)
        alert(res.msg)
        this.router.navigate(["newpassword"]);
        }
      },
      (err) => {
        console.log('err', err);
        alert(err.error.msg);
        this.forgetPasswordForm.reset();
      }
    );
  }

  goToRegisterPage() {
    let route = 'register';
    this.router.navigate([route]);
  }

}
