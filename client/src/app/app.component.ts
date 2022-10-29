import { Component } from '@angular/core';
import { HttpService } from './services/http/http.service';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  decodedToken: any;

  constructor(private router: Router, private httpService: HttpService) {
    let token = localStorage.getItem('auth-token');
    let menudata = localStorage.getItem('menuData');
    if (token) {
     this.httpService.token = localStorage.getItem('auth-token');
      if (localStorage.getItem('userData')) {
        this.httpService.userData = localStorage.getItem('userData');
      }
     
    
    } 
    if(token == null){
      this.router.navigate(["login"])
    }
  }




  
}
