import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http/http.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  decodedToken:any
  token:any

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('auth-token')) {
      this.token = localStorage.getItem('auth-token')
     if(this.token){
       console.log("user has access to this route")
      return true
     }else{
       return false
     }
    } else {
      return false
    }
  }
  
}
