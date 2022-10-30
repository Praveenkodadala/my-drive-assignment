import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { Action } from 'rxjs/internal/scheduler/Action';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  public baseUrl: any = '/api/apiv1/';
  
  constructor(private http: HttpClient, private router: Router) {}

  //new format
  public token: any = false;
  public userData: any = false;
 

  public doHttp(request:any) {
    console.log('request in http ', request);
    let options;
    if (this.token) {
     // console.log('req with token', this.token);
      options = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set(
          'cache-control',
          'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        )
        .set('pragma', 'no-cache')
        .set('Authorization', this.token)
     
    } else {
      options = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('pragma', 'no-cache')
        .set('Access-Control-Allow-Origin', '*')
        .set(
          'cache-control',
          'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        );
    }

    if (request.method === 'GET') {
      console.log('GET url', this.baseUrl);
      const params = '';
      return this.http.get(this.baseUrl + request.action_url + params, {
        headers: options,
      });
    } else if (request.method === 'POST') {
      console.log('POST url', this.baseUrl);

      return this.http.post(this.baseUrl + request.action_url, request.params, {
        headers: options,
      });
    } else if (request.method === 'PUT') {
      return this.http.put(
        this.baseUrl + request.action_url,
        JSON.stringify(request.params),
        {
          headers: options,
        }
      );
    } else if (request.method === 'DELETE') {
      return this.http.delete(this.baseUrl + request.action_url, {
        headers: options,
      });
    }
  }

  public doHttp1(request:any) {
    console.log('request in http1 ', request);
    let options;
    if (this.token) {
      options = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set(
          'cache-control',
          'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        )
        .set('pragma', 'no-cache')
        .set('Authorization', this.token)
     
    } else {
      options = new HttpHeaders()
        .set('pragma', 'no-cache')
        .set('Access-Control-Allow-Origin', '*')
        .set(
          'cache-control',
          'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        );
    }

    if (request.method === 'GET') {
      const params = '';
      return this.http.get(this.baseUrl + request.action_url + params, {
        headers: options,
      });
    } else if (request.method === 'POST') {
      return this.http.post(this.baseUrl + request.action_url, request.params, {
        headers: options,
      });
    } else if (request.method === 'PUT') {
      return this.http.put(this.baseUrl + request.action_url, request.params, {
        headers: options,
      });
    } else if (request.method === 'DELETE') {
      return this.http.delete(this.baseUrl + request.action_url, {
        headers: options,
      });
    }
  }


   /* set key value from local storage */
   public setItem(key:any, item:any) {
    console.log(key, item)
    window.localStorage.setItem(key, item)
  }

    /* get key value from local storage */
    public getItem(key:any) {
      console.log("get item key", key)
      const temp = window.localStorage.getItem(key)
      return temp
    }

 

}
