import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.registrationFormFunc();
  }

  registrationFormFunc() {
    this.registerForm = this.fb.group({
      firstName:["", Validators.required],
      lastName:["",Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    console.log('this.registerForm.value', this.registerForm.value);
    // const formData = new FormData()
    // formData.append("username", this.registerForm.value.username)
    // formData.append("email", this.registerForm.value.email)
    // formData.append("password", this.registerForm.value.password)
    let data =  {
      firstName:this.registerForm.value.firstName,
      lastName:this.registerForm.value.lastName,
      userName:this.registerForm.value.userName,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password

      }
    const request = {
      params: data,
      method: 'POST',
      action_url: 'user/user_register'
    }
    console.log("request", request)
    this.httpService.doHttp(request)?.subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert(res.msg)
        setTimeout(()=>{
          let route = 'login'
          this.router.navigate([route])
        },1000)
      }
    },
    (err)=>{
      console.log("err",err)
      alert(err.error.msg)
      this.registerForm.reset()
    })
  }


  goToLoginPage(){
  this.router.navigate(["login"])
  }





}
