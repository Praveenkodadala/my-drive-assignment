import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loginUserID;
  userInfo: any;
  userProfileForm: any;
  changePasswordForm:any

  constructor(private fb: FormBuilder,
     private httpService: HttpService,
     private modalService: NgbModal) {
    this.loginUserID = JSON.parse(this.httpService.userData)
    console.log('this.userData in profile', this.loginUserID);
  }

  ngOnInit(): void {
    this.getUserData();
    this.userProfileFormFunc();
    this.changePasswordFormFunc();
  }

  userProfileFormFunc() {
    this.userProfileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
    });
  }

  getUserData() {
    const request = {
      method: 'GET',
      action_url: 'user/get_user_profile',
    };

    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.userInfo = res.data;
        
          this.userProfileForm.patchValue({ firstName: this.userInfo.firstName, });
          this.userProfileForm.patchValue({ lastName: this.userInfo.lastName });
          this.userProfileForm.patchValue({ userName: this.userInfo.userName });
          this.userProfileForm.patchValue({ email: this.userInfo.email });
        } else {
          // localStorage.clear()
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  saveProfile() {
    console.log('this.userprofileform', this.userProfileForm.value);
    const request = {
      params:this.userProfileForm.value,
      method: 'POST',
      action_url: 'user/update_user_profile',
    };
    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.getUserData()
          alert(res.msg)
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
 
 
  changePasswordFormFunc() {
    this.changePasswordForm = this.fb.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
    });
  }

  updatePassword(){
    console.log("this.changePassword.value", this.changePasswordForm.value)
    const request = {
      params:this.changePasswordForm.value,
      method: 'POST',
      action_url: 'user/update_user_password',
    };
    this.httpService.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          alert(res.msg)
          this.changePasswordForm.reset()
        }
      },
      (error: any) => {
        console.log(error);
        alert(error.error.msg)
      }
    );


  }



}
